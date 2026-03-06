"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { NAV_LINKS, SITE } from "@/lib/constants";
import Button from "@/components/ui/Button";
import MobileMenu from "./MobileMenu";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-cream/95 backdrop-blur-sm shadow-sm"
            : "bg-transparent"
        }`}
      >
        <div className="mx-auto max-w-7xl px-6 sm:px-8 flex items-center justify-between h-20">
          <Link
            href="/"
            className={`font-serif text-2xl font-medium transition-colors duration-300 ${
              scrolled ? "text-charcoal" : "text-cream"
            }`}
          >
            {SITE.name}
          </Link>

          <nav className="hidden lg:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`font-sans text-sm font-normal uppercase tracking-luxury transition-colors duration-300 relative after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-[1px] after:bg-gold after:transition-all after:duration-300 hover:after:w-full ${
                  scrolled
                    ? "text-charcoal hover:text-gold"
                    : "text-cream/80 hover:text-cream"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Button href="/contact" size="default" className="ml-4">
              Book Now
            </Button>
          </nav>

          <button
            onClick={() => setMobileOpen(true)}
            className={`lg:hidden transition-colors duration-300 ${
              scrolled ? "text-charcoal" : "text-cream"
            }`}
            aria-label="Open menu"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          </button>
        </div>
      </header>

      <MobileMenu open={mobileOpen} onClose={() => setMobileOpen(false)} />
    </>
  );
}
