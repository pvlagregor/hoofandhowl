import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import FadeIn from "@/components/animations/FadeIn";

export default function WhyWallArt() {
  return (
    <section className="py-20 md:py-28 bg-cream">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center">
          {/* Image placeholder */}
          <FadeIn>
            <img
              src="/images/homepage/Floating_PRO_Mockup_15_114C801.jpg"
              alt="Wall Art Mockup"
              className="aspect-[3/4] w-full object-cover order-2 md:order-1"
            />
          </FadeIn>

          {/* Text */}
          <FadeIn delay={200} className="order-1 md:order-2">
            <p className="font-sans text-sm font-medium uppercase tracking-luxury text-gold mb-4">
              Why Wall Art
            </p>
            <div className="w-16 h-px bg-gold mb-6" />
            <h2 className="font-serif text-3xl md:text-4xl text-charcoal mb-6 leading-tight">
              Your Phone Has Thousands of Photos. How Many Are on Your Walls?
            </h2>
            <div className="space-y-4 text-base font-light text-charcoal leading-relaxed">
              <p>
                There&apos;s a difference between taking a picture and creating
                a portrait.
              </p>
              <p>
                A phone snapshot lives in your camera roll for a week before
                it&apos;s buried. A Hoof & Howl portrait lives in your hallway,
                your living room, or your bedroom and it&apos;s the first thing you see when you walk in the
                door.
              </p>
              <p>
                We work with the finest labs in the world to produce
                heirloom-quality canvas, framed prints, and albums that will
                look as striking in twenty years as the day it you received it.
              </p>
              <p className="font-bold text-charcoal">
                This is art. Made for your walls. Made for your family.
              </p>
            </div>
            <div className="mt-8">
              <Button href="/wall-art">Explore Our Wall Art</Button>
            </div>
          </FadeIn>
        </div>
      </Container>
    </section>
  );
}
