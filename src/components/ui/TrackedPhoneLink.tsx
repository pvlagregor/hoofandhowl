"use client";

import { trackEvent, generateEventId } from "@/lib/tracking";

interface TrackedPhoneLinkProps {
  href: string;
  placement: string;
  className?: string;
  children: React.ReactNode;
}

export default function TrackedPhoneLink({
  href,
  placement,
  className,
  children,
}: TrackedPhoneLinkProps) {
  return (
    <a
      href={href}
      className={className}
      onClick={() => {
        const eventId = generateEventId();
        trackEvent("phone_click", {
          contact_method: "phone",
          placement,
          page_path: window.location.pathname,
          page_title: document.title,
          event_id: eventId,
        });
      }}
    >
      {children}
    </a>
  );
}
