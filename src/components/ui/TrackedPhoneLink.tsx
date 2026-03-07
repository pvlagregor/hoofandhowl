"use client";

import { trackEvent } from "@/lib/tracking";

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
      onClick={() =>
        trackEvent("phone_click", {
          contact_method: "phone",
          placement,
          page_path: window.location.pathname,
          page_title: document.title,
        })
      }
    >
      {children}
    </a>
  );
}
