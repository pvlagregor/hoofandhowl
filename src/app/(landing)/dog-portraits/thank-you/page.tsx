import { Metadata } from "next";
import Container from "@/components/ui/Container";
import FadeIn from "@/components/animations/FadeIn";
import TrackedPhoneLink from "@/components/ui/TrackedPhoneLink";
import { SITE } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Thank You | Hoof & Howl",
  description: "Your consultation request has been received.",
  robots: { index: false, follow: false },
};

export default function ThankYouPage() {
  return (
    <section className="bg-cream min-h-screen pt-32 pb-20 md:pb-28">
      <Container>
        <FadeIn>
          <div className="max-w-2xl mx-auto text-center">
            <div className="w-16 h-px bg-gold mx-auto mb-6" />
            <h1 className="font-serif text-3xl md:text-5xl text-charcoal font-normal mb-6">
              Thank You. We Will Be in Touch Soon.
            </h1>
            <p className="text-base md:text-lg font-light text-charcoal leading-relaxed">
              I have received your consultation request and will reach out within one to two business days. In the meantime, feel free to browse the gallery at{" "}
              <a
                href={SITE.url}
                className="text-gold hover:text-gold-light transition-colors duration-300"
              >
                hoofandhowl.com
              </a>
              {" "}or call{" "}
              <TrackedPhoneLink
                href={SITE.phoneHref}
                placement="landing-thank-you"
                className="text-gold hover:text-gold-light transition-colors duration-300"
              >
                {SITE.phone}
              </TrackedPhoneLink>
              {" "}if you would like to talk sooner.
            </p>
          </div>
        </FadeIn>
      </Container>
    </section>
  );
}
