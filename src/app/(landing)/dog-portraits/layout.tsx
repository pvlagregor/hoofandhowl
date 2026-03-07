"use client";

import { Suspense, useState, useEffect } from "react";
import Link from "next/link";
import { SITE } from "@/lib/constants";
import TrackedPhoneLink from "@/components/ui/TrackedPhoneLink";
import Button from "@/components/ui/Button";
import UTMCapture from "@/components/landing/UTMCapture";

function LandingHeader() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-cream/95 backdrop-blur-sm shadow-sm"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto max-w-7xl px-6 sm:px-8 flex items-center justify-between h-20">
        <Link
          href="/dog-portraits"
          className={`font-serif text-2xl font-medium transition-colors duration-300 ${
            scrolled ? "text-charcoal" : "text-cream"
          }`}
        >
          {SITE.name}
        </Link>

        <div className="flex items-center gap-6">
          <TrackedPhoneLink
            href={SITE.phoneHref}
            placement="landing-header"
            className={`hidden sm:inline font-sans text-sm font-light transition-colors duration-300 ${
              scrolled ? "text-charcoal hover:text-gold" : "text-cream/80 hover:text-cream"
            }`}
          >
            {SITE.phone}
          </TrackedPhoneLink>
          <Button href="/dog-portraits/book" size="default">
            Book Your Consultation
          </Button>
        </div>
      </div>
    </header>
  );
}

function LandingFooter() {
  return (
    <footer className="bg-deep-brown text-cream/70 py-12">
      <div className="mx-auto max-w-6xl px-6 sm:px-8 text-center">
        <p className="font-serif text-xl text-cream mb-4">
          {SITE.name} Fine Art Pet Portraiture
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-sm mb-4">
          <a
            href={`mailto:${SITE.email}`}
            className="hover:text-gold transition-colors duration-300"
          >
            {SITE.email}
          </a>
          <span className="hidden sm:inline text-cream/30">|</span>
          <TrackedPhoneLink
            href={SITE.phoneHref}
            placement="landing-footer"
            className="hover:text-gold transition-colors duration-300"
          >
            {SITE.phone}
          </TrackedPhoneLink>
          <span className="hidden sm:inline text-cream/30">|</span>
          <span>Serving all of {SITE.location}</span>
        </div>
        <a
          href={SITE.url}
          className="text-sm hover:text-gold transition-colors duration-300"
        >
          hoofandhowl.com
        </a>
        <div className="mt-8 border-t border-cream/10 pt-6">
          <p className="text-xs text-cream/40">
            &copy; {new Date().getFullYear()} {SITE.name} Fine Art Pet Portraiture
          </p>
        </div>
      </div>
    </footer>
  );
}

export default function DogPortraitsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Suspense><UTMCapture /></Suspense>
      <LandingHeader />
      {children}
      <LandingFooter />
    </>
  );
}
