import { NextRequest, NextResponse } from "next/server";
import { sendMetaEvent } from "@/lib/meta-capi";

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

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, phone, message, source, event_id } = body;

    if (!name || !email) {
      return NextResponse.json(
        { error: "Name and email are required." },
        { status: 400 }
      );
    }

    const { firstName, lastName } = splitName(name);

    // Upsert contact in GoHighLevel (creates or updates by email)
    const contactRes = await ghlFetch("/contacts/upsert", {
      locationId: GHL_LOCATION_ID,
      firstName,
      lastName,
      email,
      phone: phone || undefined,
      source: source || undefined,
      tags: ["Website Inquiry"],
    });

    const contactId = contactRes.contact?.id;

    // Add the message as a note on the contact
    if (contactId && message) {
      await ghlFetch(`/contacts/${contactId}/notes`, {
        body: message,
      });
    }

    // Fire Meta CAPI event (non-blocking)
    if (event_id) {
      sendMetaEvent({
        eventName: "Lead",
        eventId: event_id,
        url: request.headers.get("referer") || "https://hoofandhowl.com/contact",
        userData: { email, phone, firstName, lastName },
        ipAddress: request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "",
        userAgent: request.headers.get("user-agent") || "",
      }).catch((err) => console.error("Meta CAPI error:", err));
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { error: "Something went wrong." },
      { status: 500 }
    );
  }
}
