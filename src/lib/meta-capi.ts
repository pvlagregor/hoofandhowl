import { createHash } from "crypto";

const META_PIXEL_ID = process.env.META_PIXEL_ID;
const META_ACCESS_TOKEN = process.env.META_ACCESS_TOKEN;
const META_API_VERSION = "v21.0";

function sha256(value: string): string {
  return createHash("sha256").update(value).digest("hex");
}

function normalizeEmail(email: string): string {
  return email.trim().toLowerCase();
}

function normalizePhone(phone: string): string {
  // Strip everything except digits, ensure country code
  const digits = phone.replace(/\D/g, "");
  // Add US country code if not present
  return digits.startsWith("1") ? digits : `1${digits}`;
}

function normalizeName(name: string): string {
  return name.trim().toLowerCase();
}

interface MetaEventParams {
  eventName: string;
  eventId: string;
  url: string;
  userData: {
    email: string;
    phone?: string;
    firstName?: string;
    lastName?: string;
  };
  ipAddress: string;
  userAgent: string;
}

export async function sendMetaEvent({
  eventName,
  eventId,
  url,
  userData,
  ipAddress,
  userAgent,
}: MetaEventParams): Promise<void> {
  if (!META_PIXEL_ID || !META_ACCESS_TOKEN) {
    console.warn("Meta CAPI env vars not set — skipping event:", eventName);
    return;
  }

  const hashedUserData: Record<string, string> = {
    em: sha256(normalizeEmail(userData.email)),
    country: sha256("us"),
  };

  if (userData.phone) {
    hashedUserData.ph = sha256(normalizePhone(userData.phone));
  }
  if (userData.firstName) {
    hashedUserData.fn = sha256(normalizeName(userData.firstName));
  }
  if (userData.lastName) {
    hashedUserData.ln = sha256(normalizeName(userData.lastName));
  }
  if (ipAddress) {
    hashedUserData.client_ip_address = ipAddress;
  }
  if (userAgent) {
    hashedUserData.client_user_agent = userAgent;
  }

  const payload = {
    data: [
      {
        event_name: eventName,
        event_time: Math.floor(Date.now() / 1000),
        event_id: eventId,
        event_source_url: url,
        action_source: "website",
        user_data: hashedUserData,
      },
    ],
  };

  try {
    const res = await fetch(
      `https://graph.facebook.com/${META_API_VERSION}/${META_PIXEL_ID}/events?access_token=${META_ACCESS_TOKEN}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      }
    );

    if (!res.ok) {
      const text = await res.text();
      console.error(`Meta CAPI error ${res.status}:`, text);
    }
  } catch (error) {
    console.error("Meta CAPI request failed:", error);
  }
}
