"use client";

import { useEffect } from "react";
import Link from "next/link";
import { NAV_LINKS, SITE } from "@/lib/constants";

interface MobileMenuProps {
  open: boolean;
  onClose: () => void;
}

export default function MobileMenu({ open, onClose }: MobileMenuProps) {
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <div
      className={`fixed inset-0 z-[100] transition-all duration-500 ${
        open
          ? "opacity-100 pointer-events-auto"
          : "opacity-0 pointer-events-none"
      }`}
    >
      <div className="absolute inset-0 bg-charcoal/98" />

      <div className="relative h-full flex flex-col items-center justify-center">
        <button
          onClick={onClose}
          className="absolute top-6 right-6 text-cream/80 hover:text-cream transition-colors"
          aria-label="Close menu"
        >
          <svg
            width="28"
            height="28"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
          >
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>

        <nav className="flex flex-col items-center gap-8">
          <Link
            href="/"
            onClick={onClose}
            className="font-serif text-3xl text-cream mb-4"
          >
            {SITE.name}
          </Link>

          {NAV_LINKS.map((link, i) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={onClose}
              className="font-serif text-2xl text-cream/80 hover:text-gold transition-colors duration-300"
              style={{
                transitionDelay: open ? `${(i + 1) * 100}ms` : "0ms",
                opacity: open ? 1 : 0,
                transform: open ? "translateY(0)" : "translateY(16px)",
                transition: `opacity 500ms ${(i + 1) * 100}ms, transform 500ms ${(i + 1) * 100}ms, color 300ms`,
              }}
            >
              {link.label}
            </Link>
          ))}

          <div
            className="mt-4"
            style={{
              opacity: open ? 1 : 0,
              transform: open ? "translateY(0)" : "translateY(16px)",
              transition: `opacity 500ms ${(NAV_LINKS.length + 1) * 100}ms, transform 500ms ${(NAV_LINKS.length + 1) * 100}ms`,
            }}
          >
            <Link
              href="/contact"
              onClick={onClose}
              className="inline-block px-8 py-3.5 bg-gold text-charcoal font-sans text-sm font-medium uppercase tracking-luxury hover:bg-gold-light transition-colors duration-300"
            >
              Book Now
            </Link>
          </div>
        </nav>
      </div>
    </div>
  );
}
