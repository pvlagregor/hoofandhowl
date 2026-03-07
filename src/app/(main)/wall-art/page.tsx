import { createMetadata } from "@/lib/metadata";
import Hero from "@/components/sections/Hero";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import CtaBanner from "@/components/sections/CtaBanner";
import FadeIn from "@/components/animations/FadeIn";

export const metadata = createMetadata({
  title: "Wall Art & Products",
  description:
    "Museum-quality canvas, framed prints, metal art, and legacy albums. Heirloom pet portraits made for your walls, built to last generations.",
  path: "/wall-art",
});

const products = [
  {
    title: "Gallery-Wrapped Canvas",
    description:
      "The classic fine art presentation. Your portrait is printed on premium archival canvas and stretched over solid wood bars, with edges wrapped for a clean, frameless look.\n\nThe texture of canvas adds warmth and depth that you simply cannot get from a screen. Colors are rich, detail is sharp, and the surface has a hand-painted quality that draws people in.",
    sizes: "Available in sizes from 16\u00d720 to 40\u00d760",
    specs: ["Archival-rated 100+ years", "Ready to hang", "No frame needed"],
  },
  {
    title: "Heirloom Framed Prints",
    description:
      "For a more traditional presentation, your portrait is printed on fine art paper and set in a hand-selected frame with museum-quality glass. We offer a curated selection of frames in styles from modern minimal to classic ornate\u2009\u2014\u2009each one chosen to complement the portrait and your home\u2019s aesthetic.\n\nWe\u2019ll help you choose. Bring photos of your room, and we\u2019ll make a recommendation that feels like it was always meant to be there.",
    sizes: "Available in sizes from 11\u00d714 to 30\u00d740",
    specs: [
      "Archival paper & inks",
      "UV-protective glass",
      "Custom framing included",
    ],
  },
  {
    title: "Painter Portraits",
    description:
      "Artists start with your favorite photo we captures and digitally brushstroke every pixel to create a stunning Painter Portrait. These combine the realism of a photograph with the beauty, style, and feel of a freehand painting, giving you a unique and beautiful heirloom art piece for your home.\n\nOur artists tailor the style to match your preferences or the look and feel of the original photograph. Once you approve the painting, it's printed directly onto Fine Art Giclée canvas. For added realism, we can apply contour brush strokes and oil enhancements upon request. As a result, you have a final piece that rivals traditional oil paintings.",
    sizes: "Custom Sizes Available",
    specs: [
      "Timless Elegance",
      "Archival-rated 100+ years",
      "Add Frames For Luxury Look",
    ],
  },
  {
    title: "Legacy Albums",
    description:
      "A complete record of your session, hand-bound in Italian leather or fine linen. Thick, lay-flat pages with your favorite portraits from the day\u2009\u2014\u2009printed on the same fine art paper used in museum collections.\n\nThis is the book you\u2019ll leave on your coffee table. The one your family picks up again and again. The one that will still look and feel this way in fifty years.",
    sizes: "Available in 10\u00d710 and 12\u00d712",
    specs: ["Hand-bound", "Lay-flat pages", "20\u201340 pages per album"],
  },
];

export default function WallArtPage() {
  return (
    <>
      <Hero
        label="Wall Art & Products"
        heading="Art That Lives Where You Live"
        subtext="Every Hoof & Howl portrait is produced as museum-quality wall art designed for your space, built to last generations."
        height="medium"
      />

      {/* Philosophy */}
      <section className="py-20 md:py-28 bg-cream">
        <Container>
          <FadeIn>
            <div className="max-w-2xl mx-auto text-center">
              <div className="w-16 h-px bg-gold mx-auto mb-8" />
              <div className="space-y-5 text-base md:text-lg font-light text-charcoal leading-relaxed">
                <p className="font-normal text-charcoal text-lg md:text-xl">
                  We don&apos;t sell digital files.
                </p>
                <p>
                  We create physical art&thinsp;&mdash;&thinsp;tangible,
                  permanent, and made to be the first thing someone notices when
                  they walk into your home.
                </p>
                <p>
                  Every piece is printed by master craftsmen at the finest fine
                  art labs in the country, using archival materials rated to last
                  100+ years without fading.
                </p>
                <p className="font-normal text-charcoal">
                  This is not a print from a drugstore. This is a portrait built
                  for your wall and built for your family.
                </p>
              </div>
              <div className="w-16 h-px bg-gold mx-auto mt-8" />
            </div>
          </FadeIn>
        </Container>
      </section>

      {/* Product Showcase */}
      {products.map((product, index) => {
        if (index === 3) return null;
        return (
        <section
          key={product.title}
          className={`py-20 md:py-24 ${index % 2 === 0 ? "bg-cream-dark" : "bg-cream"}`}
        >
          <Container>
            <FadeIn>
              <div
                className={`grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center ${
                  index % 2 !== 0 ? "md:[direction:rtl] md:*:[direction:ltr]" : ""
                }`}
              >
                {/* Image placeholder */}
                {index === 0 ? (
                  <img
                    src="/images/wall-art/Canvas_Pro_01-Mockup.png"
                    alt={product.title}
                    className="aspect-[4/3] w-full object-cover"
                  />
                ) : index === 1 ? (
                  <img
                    src="/images/wall-art/frames-mockups.jpg"
                    alt={product.title}
                    className="aspect-[4/3] w-full object-cover"
                  />
                ) : index === 2 ? (
                  <img
                    src="/images/wall-art/Kuhlman sample-New Crop v2.jpeg"
                    alt={product.title}
                    className="aspect-[4/3] w-full object-cover"
                  />
                ) : (
                  <div className="aspect-[4/3] bg-taupe/15 w-full" />
                )}

                {/* Details */}
                <div>
                  <div className="w-12 h-px bg-gold mb-6" />
                  <h2 className="font-serif text-3xl md:text-4xl text-charcoal mb-6">
                    {product.title}
                  </h2>
                  <div className="space-y-4 text-base font-light text-charcoal leading-relaxed">
                    {product.description.split("\n\n").map((para, i) => (
                      <p key={i}>{para}</p>
                    ))}
                  </div>
                  <p className="mt-4 text-sm text-taupe italic">
                    {product.sizes}
                  </p>
                  <div className="mt-6 flex flex-wrap gap-3">
                    {product.specs.map((spec) => (
                      <span
                        key={spec}
                        className="px-3 py-1.5 border border-gold/30 text-xs font-sans uppercase tracking-wide text-charcoal"
                      >
                        {spec}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </FadeIn>
          </Container>
        </section>
        );
      })}

      {/* Investment */}
      <section className="py-20 md:py-28 bg-cream">
        <Container>
          <FadeIn>
            <div className="max-w-2xl mx-auto text-center">
              <p className="font-sans text-sm font-medium uppercase tracking-luxury text-gold mb-4">
                Investment
              </p>
              <div className="w-16 h-px bg-gold mx-auto mb-8" />
              <div className="space-y-5 text-base font-light text-charcoal leading-relaxed">
                <p>
                  Portrait sessions with Hoof &amp; Howl are $295 to book
                  and include a $150 credit towards your wall art or album
                  purchase. Our typical client invests between $2,000 and
                  $4,000, on wall art depending on their needs. Every session
                  includes a personal consultation, a dedicated portrait
                  session, a private reveal and ordering appointment, and
                  professional installation of your finished art.
                </p>
                <p>
                  There is no pressure, no upselling, and no surprise fees.
                  We&apos;ll talk about everything before a single photo is
                  taken.
                </p>
              </div>
              <div className="mt-10">
                <Button href="/contact" size="large">
                  Let&apos;s Talk About Your Vision
                </Button>
              </div>
            </div>
          </FadeIn>
        </Container>
      </section>

      <CtaBanner
        heading="The Walls Are Waiting"
        subtext="Tell us about your animal and your home. We'll take it from there."
      />
    </>
  );
}
