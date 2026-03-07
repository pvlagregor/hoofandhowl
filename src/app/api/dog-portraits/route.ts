import { NextRequest, NextResponse } from "next/server";

const GHL_API_KEY = process.env.GHL_API_KEY!;
const GHL_LOCATION_ID = process.env.GHL_LOCATION_ID!;
const GHL_BASE_URL = "https://services.leadconnectorhq.com";

function splitName(fullName: string) {
  const trimmed = fullName.trim();
  const lastSpace = trimmed.lastIndexOf(" ");
  if (lastSpace === -1) return { firstName: trimmed, lastName: "" };
  return {
    firstName: trimmed.slice(0, lastSpace),
    lastName: trimmed.slice(lastSpace + 1),
  };
}

async function ghlFetch(path: string, body: Record<string, unknown>) {
  const res = await fetch(`${GHL_BASE_URL}${path}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${GHL_API_KEY}`,
      "Content-Type": "application/json",
      Version: "2021-07-28",
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`GHL API error ${res.status}: ${text}`);
  }

  return res.json();
}

function deriveSourceTag(utmSource: string | undefined): string {
  switch (utmSource) {
    case "google":
      return "google-ad";
    case "facebook":
      return "facebook-ad";
    case "instagram":
      return "instagram-ad";
    default:
      return "ad";
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      name,
      email,
      phone,
      dogName,
      dogInfo,
      contactMethod,
      utm_source,
      utm_medium,
      utm_campaign,
    } = body;

    if (!name || !email || !phone || !dogName) {
      return NextResponse.json(
        { error: "Name, email, phone, and dog name are required." },
        { status: 400 }
      );
    }

    const { firstName, lastName } = splitName(name);
    const sourceTag = deriveSourceTag(utm_source);

    const contactRes = await ghlFetch("/contacts/upsert", {
      locationId: GHL_LOCATION_ID,
      firstName,
      lastName,
      email,
      phone,
      source: sourceTag,
      tags: ["Dog Portrait Inquiry", `Source: ${sourceTag}`],
      customFields: [
        ...(utm_medium ? [{ key: "utm_medium", value: utm_medium }] : []),
        ...(utm_campaign ? [{ key: "utm_campaign", value: utm_campaign }] : []),
      ],
    });

    const contactId = contactRes.contact?.id;

    if (contactId) {
      const noteLines = [
        `Dog's Name: ${dogName}`,
        dogInfo ? `About the dog: ${dogInfo}` : null,
        `Preferred contact method: ${contactMethod || "Either"}`,
        `Source: ${sourceTag}`,
        utm_medium ? `UTM Medium: ${utm_medium}` : null,
        utm_campaign ? `UTM Campaign: ${utm_campaign}` : null,
      ]
        .filter(Boolean)
        .join("\n");

      await ghlFetch(`/contacts/${contactId}/notes`, {
        body: noteLines,
      });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Dog portraits booking form error:", error);
    return NextResponse.json(
      { error: "Something went wrong." },
      { status: 500 }
    );
  }
}
