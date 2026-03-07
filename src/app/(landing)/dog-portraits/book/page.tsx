import { Metadata } from "next";
import Container from "@/components/ui/Container";
import FadeIn from "@/components/animations/FadeIn";
import BookingForm from "@/components/landing/BookingForm";
import { SITE } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Book Your Consultation | Hoof & Howl",
  description:
    "Tell us about your dog and book a complimentary consultation with Hoof & Howl Fine Art Pet Portraiture.",
  robots: { index: false, follow: false },
  alternates: { canonical: `${SITE.url}/dog-portraits/book` },
};

export default function BookPage() {
  return (
    <section className="bg-cream min-h-screen pt-32 pb-20 md:pb-28">
      <Container>
        <FadeIn>
          <div className="max-w-xl mx-auto">
            <div className="text-center mb-12">
              <div className="w-16 h-px bg-gold mx-auto mb-6" />
              <h1 className="font-serif text-3xl md:text-5xl text-charcoal font-normal mb-4">
                Tell Us About Your Dog
              </h1>
              <p className="text-base font-light text-charcoal leading-relaxed">
                This is where it starts. A short form, a quick conversation, and then we will take it from there. No obligation, no pressure &mdash; just a first step.
              </p>
            </div>
            <BookingForm />
          </div>
        </FadeIn>
      </Container>
    </section>
  );
}
