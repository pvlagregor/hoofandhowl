"use client";

import { useState, useRef } from "react";
import Button from "@/components/ui/Button";
import { trackEvent } from "@/lib/tracking";

interface QuizLeadFormProps {
  onSubmit: (data: { firstName: string; email: string; petName: string }) => void;
  isSubmitting: boolean;
}

export default function QuizLeadForm({ onSubmit, isSubmitting }: QuizLeadFormProps) {
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [petName, setPetName] = useState("");
  const hasTrackedFormStart = useRef(false);

  function handleFirstInteraction() {
    if (hasTrackedFormStart.current) return;
    hasTrackedFormStart.current = true;
    trackEvent("lead_form_start", {
      form_name: "quiz_lead_form",
      page_path: window.location.pathname,
    });
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!firstName.trim() || !email.trim()) return;
    onSubmit({ firstName: firstName.trim(), email: email.trim(), petName: petName.trim() });
  }

  const inputClasses =
    "w-full bg-transparent border-b border-taupe/30 py-3 text-base font-light text-cream placeholder:text-taupe/60 focus:border-gold focus:outline-none transition-colors duration-300";
  const labelClasses =
    "block font-sans text-xs font-medium uppercase tracking-luxury text-cream/70 mb-2";

  return (
    <div className="text-center">
      <h2 className="font-serif text-2xl md:text-3xl text-cream font-normal mb-4 leading-snug">
        You&apos;re one step away from discovering your pet&apos;s signature portrait style.
      </h2>
      <p className="text-base font-light text-taupe max-w-lg mx-auto mb-10">
        Enter your name and email to see your result &mdash; plus a look at what your style
        looks like on real walls.
      </p>

      <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-8 text-left">
        <div>
          <label className={labelClasses}>
            First Name <span className="text-gold">*</span>
          </label>
          <input
            type="text"
            required
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            onFocus={handleFirstInteraction}
            className={inputClasses}
            placeholder="Your first name"
          />
        </div>

        <div>
          <label className={labelClasses}>
            Email <span className="text-gold">*</span>
          </label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={inputClasses}
            placeholder="your@email.com"
          />
        </div>

        <div>
          <label className={labelClasses}>
            Pet&apos;s Name
          </label>
          <input
            type="text"
            value={petName}
            onChange={(e) => setPetName(e.target.value)}
            className={inputClasses}
            placeholder="What's their name?"
          />
        </div>

        <div className="pt-4 text-center">
          <Button type="submit" size="large" className={isSubmitting ? "opacity-70 pointer-events-none" : ""}>
            {isSubmitting ? "Discovering Your Style\u2026" : "Show Me My Style"}
          </Button>
        </div>
      </form>
    </div>
  );
}
