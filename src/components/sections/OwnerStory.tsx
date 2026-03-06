import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import FadeIn from "@/components/animations/FadeIn";

export default function OwnerStory() {
  return (
    <section className="py-20 md:py-28 bg-cream-dark">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center">
          {/* Portrait placeholder */}
          <FadeIn>
            <img
              src="/images/kristin_headshot_1000px.jpg"
              alt="Kristin Chiaramonte"
              className="aspect-[4/5] w-full max-w-md mx-auto md:mx-0 object-cover rounded-lg"
            />
          </FadeIn>

          {/* Story */}
          <FadeIn delay={200}>
            <p className="font-sans text-sm font-medium uppercase tracking-luxury text-gold mb-4">
              Meet Kristin
            </p>
            <div className="w-16 h-px bg-gold mb-6" />
            <h2 className="font-serif text-3xl md:text-4xl text-charcoal mb-6">
              This Work Began With Loss
            </h2>
            <div className="space-y-4 text-base font-light text-charcoal leading-relaxed">
              <p>
                I started Hoof & Howl after I lost my dog, Jordan. He was my
                constant for thirteen years, and when he was gone, I realized I
                didn&apos;t have a single portrait of him that did justice to who
                he was.
              </p>
              <p>
                I had snapshots. I had phone photos. But nothing that captured
                the weight of what he meant to me. I had shot hundreds of family portraits for others but too few photos of Jordan.
              </p>
              <p>
                That absence is why I do this work. I never want another person
                to feel that specific kind of regret.
              </p>
            </div>
            <p className="mt-6 font-serif text-lg text-charcoal italic">
              &mdash; Kristin Chiaramonte, Photographer &amp; Founder
            </p>
            <div className="mt-8">
              <Button href="/about" variant="secondary">
                Read My Full Story
              </Button>
            </div>
          </FadeIn>
        </div>
      </Container>
    </section>
  );
}
