import { createMetadata } from "@/lib/metadata";
import Container from "@/components/ui/Container";
import { SITE } from "@/lib/constants";
import FadeIn from "@/components/animations/FadeIn";
import ContactForm from "@/components/forms/ContactForm";

export const metadata = createMetadata({
  title: "Contact",
  description: `Schedule your complimentary consultation with Hoof & Howl. Luxury pet portrait photography serving New Jersey. Call ${SITE.phone}.`,
  path: "/contact",
});

export default function ContactPage() {
  return (
    <>
      {/* Header */}
      <section className="relative min-h-[40vh] flex items-end overflow-hidden bg-charcoal">
        <div className="absolute inset-0 bg-gradient-to-br from-deep-brown via-charcoal to-deep-brown opacity-80" />
        <div className="relative z-10 mx-auto max-w-6xl px-6 sm:px-8 pb-16 md:pb-20 w-full">
          <p className="font-sans text-sm font-medium uppercase tracking-luxury text-gold-light mb-4">
            Contact
          </p>
          <div className="w-16 h-px bg-gold mb-6" />
          <h1 className="font-serif text-4xl md:text-5xl text-cream font-normal max-w-2xl">
            Tell Us About Your Animal
          </h1>
          <p className="mt-4 text-base font-light text-cream/60 max-w-xl">
            Whether you&apos;re ready to book or just have questions, we&apos;d
            love to hear from you.
          </p>
        </div>
      </section>

      {/* Form + Contact Info */}
      <section className="py-20 md:py-28 bg-cream">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-12 md:gap-16">
            {/* Form */}
            <FadeIn className="md:col-span-3">
              <ContactForm />
            </FadeIn>

            {/* Contact Details */}
            <FadeIn delay={200} className="md:col-span-2">
              <div className="md:pl-8 md:border-l border-taupe/20">
                <h2 className="font-serif text-2xl text-charcoal mb-6">
                  Get in Touch
                </h2>
                <div className="space-y-4 text-base font-light text-charcoal">
                  <p className="font-normal text-charcoal">
                    {SITE.owner}
                  </p>
                  <p className="text-sm text-taupe">
                    Hoof & Howl Fine Art Pet Portraiture
                  </p>

                  <div className="w-12 h-px bg-gold/40 my-6" />

                  <div className="space-y-3">
                    <a
                      href={SITE.phoneHref}
                      className="flex items-center gap-3 hover:text-gold transition-colors"
                    >
                      <svg
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        className="text-gold shrink-0"
                      >
                        <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
                      </svg>
                      {SITE.phone}
                    </a>
                    <a
                      href={`mailto:${SITE.email}`}
                      className="flex items-center gap-3 hover:text-gold transition-colors"
                    >
                      <svg
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        className="text-gold shrink-0"
                      >
                        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                        <polyline points="22,6 12,13 2,6" />
                      </svg>
                      {SITE.email}
                    </a>
                    <div className="flex items-center gap-3 text-charcoal">
                      <svg
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        className="text-gold shrink-0"
                      >
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                        <circle cx="12" cy="10" r="3" />
                      </svg>
                      Serving all of New Jersey
                    </div>
                  </div>

                  <div className="w-12 h-px bg-gold/40 my-6" />

                  <p className="text-sm text-taupe">
                    Consultations are complimentary. I typically respond within
                    24 hours.
                  </p>
                </div>
              </div>
            </FadeIn>
          </div>
        </Container>
      </section>
    </>
  );
}
