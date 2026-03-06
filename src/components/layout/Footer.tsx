import Link from "next/link";
import { NAV_LINKS, SITE } from "@/lib/constants";

export default function Footer() {
  return (
    <footer className="bg-deep-brown text-cream/70 pt-8">
      <div className="w-16 h-px bg-gold mx-auto" />

      <div className="mx-auto max-w-6xl px-6 sm:px-8 py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
          {/* Brand */}
          <div>
            <Link href="/" className="font-serif text-2xl text-cream">
              {SITE.name}
            </Link>
            <p className="mt-3 text-sm font-light leading-relaxed">
              {SITE.tagline}
              <br />
              Serving all of {SITE.location}
            </p>
          </div>

          {/* Navigation */}
          <div>
            <p className="font-sans text-sm font-medium uppercase tracking-luxury text-gold mb-4">
              Explore
            </p>
            <nav className="flex flex-col gap-3">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm hover:text-gold transition-colors duration-300"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Contact */}
          <div>
            <p className="font-sans text-sm font-medium uppercase tracking-luxury text-gold mb-4">
              Get in Touch
            </p>
            <div className="flex flex-col gap-3 text-sm">
              <a
                href={SITE.phoneHref}
                className="hover:text-gold transition-colors duration-300"
              >
                {SITE.phone}
              </a>
              <a
                href={`mailto:${SITE.email}`}
                className="hover:text-gold transition-colors duration-300"
              >
                {SITE.email}
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-cream/10 py-6">
        <p className="text-center text-xs text-cream/40">
          &copy; {new Date().getFullYear()} {SITE.name}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
