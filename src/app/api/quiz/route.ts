import { NextRequest, NextResponse } from "next/server";

const GHL_API_KEY = process.env.GHL_API_KEY;
const GHL_LOCATION_ID = process.env.GHL_LOCATION_ID;
const GHL_BASE_URL = "https://services.leadconnectorhq.com";

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
    const {
      first_name,
      email,
      pet_name,
      animal_type,
      portrait_style,
      portrait_style_slug,
      emotional_memory,
      pet_life_stage,
    } = body;

    if (!first_name || !email) {
      return NextResponse.json(
        { error: "Name and email are required." },
        { status: 400 }
      );
    }

    // If GHL is not configured, log and return success
    if (!GHL_API_KEY || !GHL_LOCATION_ID) {
      console.warn("GHL env vars not set — quiz lead not forwarded:", {
        first_name,
        email,
        portrait_style,
      });
      return NextResponse.json({ success: true });
    }

    const tags = ["quiz-lead", `quiz-${portrait_style_slug}`];

    // Add conditional tags
    if (pet_life_stage === "getting older" || pet_life_stage === "senior") {
      tags.push("senior-pet");
    }
    if (animal_type === "My dog") {
      tags.push("dog-owner");
    }
    if (animal_type === "My horse") {
      tags.push("horse-owner");
    }

    const contactRes = await ghlFetch("/contacts/upsert", {
      locationId: GHL_LOCATION_ID,
      firstName: first_name,
      email,
      source: "Portrait Style Quiz",
      tags,
      customFields: [
        { key: "pet_name", value: pet_name || "" },
        { key: "animal_type", value: animal_type || "" },
        { key: "portrait_style", value: portrait_style || "" },
        { key: "emotional_memory", value: emotional_memory || "" },
        { key: "pet_life_stage", value: pet_life_stage || "" },
      ],
    });

    const contactId = contactRes.contact?.id;

    if (contactId) {
      const noteLines = [
        `Portrait Style Quiz Result: ${portrait_style}`,
        pet_name ? `Pet's Name: ${pet_name}` : null,
        `Animal Type: ${animal_type}`,
        `Emotional Memory: ${emotional_memory}`,
        `Life Stage: ${pet_life_stage}`,
      ].filter(Boolean);

      await ghlFetch(`/contacts/${contactId}/notes`, {
        body: noteLines.join("\n"),
      });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Quiz submission error:", error);
    return NextResponse.json(
      { error: "Something went wrong." },
      { status: 500 }
    );
  }
}
