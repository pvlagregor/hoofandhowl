"use client";

import { useState, useRef } from "react";
import Button from "@/components/ui/Button";
import { trackEvent, generateEventId } from "@/lib/tracking";

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const hasTrackedFormStart = useRef(false);

  function handleFirstInteraction() {
    if (hasTrackedFormStart.current) return;
    hasTrackedFormStart.current = true;
    trackEvent("lead_form_start", {
      form_name: "contact_form",
      page_path: window.location.pathname,
    });
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      const eventId = generateEventId();

      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...Object.fromEntries(formData), event_id: eventId }),
      });

      if (res.ok) {
        trackEvent("generate_lead", {
          lead_type: "contact_inquiry",
          form_name: "contact_form",
          service: "general",
          page_path: window.location.pathname,
          page_title: document.title,
          lead_source_ui: "contact_page",
          event_id: eventId,
        });
        setSubmitted(true);
        form.reset();
      }
    } catch {
      // Silently handle — form stays visible for retry
    }
  }

  if (submitted) {
    return (
      <div className="py-12 text-center">
        <div className="w-16 h-px bg-gold mx-auto mb-6" />
        <h3 className="font-serif text-2xl text-charcoal mb-3">
          Thank You
        </h3>
        <p className="text-base font-light text-charcoal">
          Your message has been sent. I&apos;ll be in touch within 24 hours.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div>
        <label className="block font-sans text-xs font-medium uppercase tracking-luxury text-charcoal mb-2">
          Name <span className="text-gold">*</span>
        </label>
        <input
          type="text"
          name="name"
          required
          onFocus={handleFirstInteraction}
          className="w-full bg-transparent border-b border-taupe/30 py-3 text-base font-light text-charcoal placeholder:text-taupe/85 focus:border-gold focus:outline-none transition-colors duration-300"
          placeholder="Your name"
        />
      </div>

      <div>
        <label className="block font-sans text-xs font-medium uppercase tracking-luxury text-charcoal mb-2">
          Email <span className="text-gold">*</span>
        </label>
        <input
          type="email"
          name="email"
          required
          className="w-full bg-transparent border-b border-taupe/30 py-3 text-base font-light text-charcoal placeholder:text-taupe/85 focus:border-gold focus:outline-none transition-colors duration-300"
          placeholder="your@email.com"
        />
      </div>

      <div>
        <label className="block font-sans text-xs font-medium uppercase tracking-luxury text-charcoal mb-2">
          Phone
        </label>
        <input
          type="tel"
          name="phone"
          className="w-full bg-transparent border-b border-taupe/30 py-3 text-base font-light text-charcoal placeholder:text-taupe/85 focus:border-gold focus:outline-none transition-colors duration-300"
          placeholder="(000) 000-0000"
        />
      </div>

      <div>
        <label className="block font-sans text-xs font-medium uppercase tracking-luxury text-charcoal mb-2">
          Tell Us About Your Animal
        </label>
        <textarea
          name="message"
          rows={4}
          className="w-full bg-transparent border-b border-taupe/30 py-3 text-base font-light text-charcoal placeholder:text-taupe/85 focus:border-gold focus:outline-none transition-colors duration-300 resize-none"
          placeholder="What's their name? What are they like? What are you hoping to capture?"
        />
      </div>

      <div>
        <label className="block font-sans text-xs font-medium uppercase tracking-luxury text-charcoal mb-2">
          How Did You Hear About Us?
        </label>
        <select
          name="source"
          className="w-full bg-transparent border-b border-taupe/30 py-3 text-base font-light text-charcoal focus:border-gold focus:outline-none transition-colors duration-300"
        >
          <option value="">Select one...</option>
          <option value="google">Google</option>
          <option value="instagram">Instagram</option>
          <option value="referral">Referral</option>
          <option value="other">Other</option>
        </select>
      </div>

      <div className="pt-4">
        <Button type="submit" size="large">
          Send Your Message
        </Button>
      </div>
    </form>
  );
}
