"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import Button from "@/components/ui/Button";
import { trackEvent, generateEventId } from "@/lib/tracking";
import { getStoredUTM } from "./UTMCapture";

const CONTACT_METHODS = ["Phone", "Email", "Either"] as const;

const inputClasses =
  "w-full bg-transparent border-b border-taupe/30 py-3 text-base font-light text-charcoal placeholder:text-taupe/85 focus:border-gold focus:outline-none transition-colors duration-300";
const labelClasses =
  "block font-sans text-xs font-medium uppercase tracking-luxury text-charcoal mb-2";

export default function BookingForm() {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const hasTrackedStart = useRef(false);

  function handleFirstInteraction() {
    if (hasTrackedStart.current) return;
    hasTrackedStart.current = true;
    trackEvent("lead_form_start", {
      form_name: "dog_portraits_booking",
      page_path: "/dog-portraits/book",
    });
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    setError("");

    const form = e.currentTarget;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);

    const utm = getStoredUTM();

    try {
      const eventId = generateEventId();

      const res = await fetch("/api/dog-portraits", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          utm_source: utm.utm_source || undefined,
          utm_medium: utm.utm_medium || undefined,
          utm_campaign: utm.utm_campaign || undefined,
          event_id: eventId,
        }),
      });

      if (res.ok) {
        trackEvent("generate_lead", {
          lead_type: "dog_portrait_consultation",
          form_name: "dog_portraits_booking",
          service: "dog_portraits",
          page_path: "/dog-portraits/book",
          page_title: document.title,
          lead_source_ui: "landing_page",
          utm_source: utm.utm_source || "direct",
          event_id: eventId,
        });
        router.push("/dog-portraits/thank-you");
      } else {
        setError("Something went wrong. Please try again or call us directly.");
      }
    } catch {
      setError("Something went wrong. Please try again or call us directly.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div>
        <label className={labelClasses}>
          Your Name <span className="text-gold">*</span>
        </label>
        <input
          type="text"
          name="name"
          required
          onFocus={handleFirstInteraction}
          className={inputClasses}
          placeholder="Your name"
        />
      </div>

      <div>
        <label className={labelClasses}>
          Email Address <span className="text-gold">*</span>
        </label>
        <input
          type="email"
          name="email"
          required
          className={inputClasses}
          placeholder="your@email.com"
        />
      </div>

      <div>
        <label className={labelClasses}>
          Phone Number <span className="text-gold">*</span>
        </label>
        <input
          type="tel"
          name="phone"
          required
          className={inputClasses}
          placeholder="(000) 000-0000"
        />
      </div>

      <div>
        <label className={labelClasses}>
          Your Dog&apos;s Name <span className="text-gold">*</span>
        </label>
        <input
          type="text"
          name="dogName"
          required
          className={inputClasses}
          placeholder="Your dog's name"
        />
      </div>

      <div>
        <label className={labelClasses}>Tell Us About Your Dog</label>
        <textarea
          name="dogInfo"
          rows={4}
          className={`${inputClasses} resize-none`}
          placeholder="Their personality, their quirks, what makes them special..."
        />
      </div>

      <div>
        <label className={labelClasses}>
          Preferred Contact Method <span className="text-gold">*</span>
        </label>
        <div className="flex gap-6 pt-2">
          {CONTACT_METHODS.map((method) => (
            <label key={method} className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="contactMethod"
                value={method}
                required
                defaultChecked={method === "Either"}
                className="accent-gold w-4 h-4"
              />
              <span className="text-base font-light text-charcoal">{method}</span>
            </label>
          ))}
        </div>
      </div>

      {error && (
        <p className="text-sm text-red-600">{error}</p>
      )}

      <div className="pt-4">
        <Button type="submit" size="large" className={submitting ? "opacity-60 pointer-events-none" : ""}>
          {submitting ? "Sending..." : "Send My Consultation Request"}
        </Button>
      </div>
    </form>
  );
}
