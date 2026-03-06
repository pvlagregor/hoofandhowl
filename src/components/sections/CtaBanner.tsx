import Button from "@/components/ui/Button";
import { SITE } from "@/lib/constants";
import FadeIn from "@/components/animations/FadeIn";

interface CtaBannerProps {
  heading?: string;
  subtext?: string;
  ctaText?: string;
  ctaHref?: string;
  showPhone?: boolean;
}

export default function CtaBanner({
  heading = "Every Portrait Begins With a Conversation",
  subtext = "Tell us about your animal. We\u2019ll tell you how we can honor them.",
  ctaText = "Book Your Complimentary Consultation",
  ctaHref = "/contact",
  showPhone = true,
}: CtaBannerProps) {
  return (
    <section className="relative py-24 md:py-32 bg-charcoal overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-deep-brown via-charcoal to-deep-brown opacity-80" />

      <div className="relative z-10 mx-auto max-w-3xl px-6 sm:px-8 text-center">
        <FadeIn>
          <h2 className="font-serif text-3xl md:text-5xl text-cream font-normal leading-tight">
            {heading}
          </h2>
          <p className="mt-6 text-base md:text-lg font-light text-cream/60 leading-relaxed">
            {subtext}
          </p>
          <div className="mt-10">
            <Button href={ctaHref} size="large">
              {ctaText}
            </Button>
          </div>
          {showPhone && (
            <p className="mt-6 text-sm text-cream/40">
              or call{" "}
              <a
                href={SITE.phoneHref}
                className="text-cream/60 hover:text-gold transition-colors"
              >
                {SITE.phone}
              </a>
            </p>
          )}
        </FadeIn>
      </div>
    </section>
  );
}
