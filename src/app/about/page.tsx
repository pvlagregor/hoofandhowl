import { createMetadata } from "@/lib/metadata";
import Hero from "@/components/sections/Hero";
import Container from "@/components/ui/Container";
import CtaBanner from "@/components/sections/CtaBanner";
import FadeIn from "@/components/animations/FadeIn";
import StaggerChildren from "@/components/animations/StaggerChildren";

export const metadata = createMetadata({
  title: "About Kristin",
  description:
    "Meet Kristin Chiaramonte, the fine art pet portrait photographer behind Hoof & Howl. Learn the story of how one dog inspired a studio.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <>
      <Hero
        label="About Hoof & Howl"
        heading="The Story Behind the Studio"
        height="medium"
      />

      {/* Full Story */}
      <section className="py-20 md:py-28 bg-cream">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-start">
            <FadeIn>
              <img
                src="/images/kristin_headshot_1000px.jpg"
                alt="Kristin Chiaramonte"
                className="aspect-[4/5] w-full sticky top-28 object-cover rounded-lg"
              />
            </FadeIn>

            <FadeIn delay={200}>
              <h2 className="font-serif text-3xl md:text-4xl text-charcoal mb-8 leading-tight">
                I Know What It Feels Like to Wish You Had One More Photo
              </h2>
              <div className="space-y-5 text-base font-light text-charcoal leading-relaxed">
                <p>
                  When my dog Jordan died, I went looking for a photograph that
                  felt like him. Not a snapshot from a walk. Not a blurry image
                  from across the yard. Something that captured who he
                  was&thinsp;&mdash;&thinsp;the way he watched me from across
                  the room, the particular warmth of his expression when he knew
                  we were about to go somewhere together.
                </p>
                <p>I couldn&apos;t find one. And that absence stayed with me in a way I wasn&apos;t expecting.</p>
                <p>
                  Hoof & Howl was born from that feeling. I trained in fine art
                  portraiture not because I wanted to be a &ldquo;pet
                  photographer,&rdquo; but because I wanted to make something
                  that I wished had existed for me&thinsp;&mdash;&thinsp;a real
                  portrait, gallery-quality, made for the wall, made to last.
                </p>
              </div>

              <div className="mt-12">
                <h3 className="font-serif text-2xl text-charcoal mb-4">
                  What I Believe
                </h3>
                <div className="space-y-5 text-base font-light text-charcoal leading-relaxed">
                  <p>
                    I believe the animals in our lives deserve the same artistic
                    attention we give to any portrait that hangs in a gallery or
                    a home. I believe a portrait should make you stop when you
                    walk past it. I believe the work should be
                    tangible&thinsp;&mdash;&thinsp;something you can touch,
                    something that fills a room, not a file that sits on a
                    screen.
                  </p>
                  <p>
                    I bring professional studio lighting to your home or meet you
                    at a location that means something to you and your animal. I
                    work slowly. I pay attention. And I don&apos;t leave until
                    we&apos;ve created something that will matter to you for a
                    very long time.
                  </p>
                </div>
              </div>

              <div className="mt-12">
                <h3 className="font-serif text-2xl text-charcoal mb-4">
                  Dogs, Horses, and Everything In Between
                </h3>
                <p className="text-base font-light text-charcoal leading-relaxed">
                  My specialty is dogs and horses&thinsp;&mdash;&thinsp;the two
                  animals I loved growing up. But I work with all animals. If
                  they matter to you, they matter to me.
                </p>
              </div>
            </FadeIn>
          </div>
        </Container>
      </section>

      {/* Credentials */}
      <section className="py-20 md:py-28 bg-cream-dark">
        <Container>
          <StaggerChildren className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Professional Photography",
                text: "I've shot family portraits for years and every session uses professional studio equipment\u2009\u2014\u2009even on location.",
              },
              {
                title: "Heirloom Quality",
                text: "Partnerships with the top fine art print labs in the world. Every piece is hand-inspected before delivery.",
              },
              {
                title: "White-Glove Service",
                text: "From consultation to installation, every detail is handled. You simply enjoy the experience and the finished art.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="border border-gold/30 p-8 md:p-10"
              >
                <div className="w-12 h-px bg-gold mb-6" />
                <h3 className="font-serif text-xl text-charcoal mb-3">
                  {item.title}
                </h3>
                <p className="text-sm font-light text-charcoal leading-relaxed">
                  {item.text}
                </p>
              </div>
            ))}
          </StaggerChildren>
        </Container>
      </section>

      <CtaBanner />
    </>
  );
}
