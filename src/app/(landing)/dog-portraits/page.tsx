import { Metadata } from "next";
import Image from "next/image";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import SectionHeading from "@/components/ui/SectionHeading";
import FadeIn from "@/components/animations/FadeIn";
import StaggerChildren from "@/components/animations/StaggerChildren";
import { SITE } from "@/lib/constants";
import TrackedPhoneLink from "@/components/ui/TrackedPhoneLink";

export const metadata: Metadata = {
  title: "Fine Art Dog Portraits | Hoof & Howl | New Jersey",
  description:
    "Gallery-quality portraits of your dog, made for your walls. Unhurried, on-location sessions across New Jersey. Book your complimentary consultation.",
  openGraph: {
    title: "Fine Art Dog Portraits | Hoof & Howl",
    description:
      "Gallery-quality portraits of your dog, made for your walls. Unhurried, on-location sessions across New Jersey. Book your complimentary consultation.",
    url: `${SITE.url}/dog-portraits`,
    siteName: SITE.name,
    locale: "en_US",
    type: "website",
  },
  alternates: { canonical: `${SITE.url}/dog-portraits` },
  robots: { index: false, follow: false },
};

const STEPS = [
  {
    number: "01",
    title: "The Consultation",
    body: "We start with a conversation \u2014 not a sales pitch. Tell me about your dog. Their personality, their quirks, the way they carry themselves. We\u2019ll talk about where the portrait will hang, what size feels right, and what you want it to feel like. Complimentary, no obligation.",
  },
  {
    number: "02",
    title: "The Session",
    body: "I come to you. Your home, your yard, your dog\u2019s favorite place. I bring professional studio lighting and everything we need. Sessions run sixty to ninety minutes, but I reserve the half day \u2014 because the best portraits happen when no one is in a hurry. Your dog sets the pace.",
  },
  {
    number: "03",
    title: "The Reveal",
    body: "About two weeks after the session, we meet again. I show you a curated collection of portraits \u2014 not hundreds of images, but a handful of extraordinary ones \u2014 presented as artwork on your walls. We choose your favorites and select formats together.",
  },
  {
    number: "04",
    title: "Delivery & Installation",
    body: "Four to six weeks later, your finished portraits arrive. I deliver and install them personally \u2014 hardware, measurement, hanging, everything. You don\u2019t lift a finger. You just walk into the room and see your dog on the wall, exactly where they belong.",
  },
];

const PORTFOLIO_IMAGES = [
  { src: "/images/homepage/gallery/_8500267-Edit-2.jpg", alt: "Pet portrait", aspect: "aspect-[3/4]" },
  { src: "/images/homepage/gallery/_8500279-Edit-2.jpg", alt: "Pet portrait", aspect: "aspect-[4/5]" },
  { src: "/images/homepage/gallery/_8500325.jpg", alt: "Pet portrait", aspect: "aspect-square" },
  { src: "/images/homepage/gallery/_8509284.jpg", alt: "Pet portrait", aspect: "aspect-[5/4]" },
  { src: "/images/homepage/gallery/_A740565-Edit.jpg", alt: "Pet portrait", aspect: "aspect-[3/4]" },
  { src: "/images/homepage/gallery/_DSC0036-Edit.jpg", alt: "Pet portrait", aspect: "aspect-[5/4]" },
];

export default function DogPortraitsPage() {
  return (
    <>
      {/* Section 1: Hero */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/homepage/_A740559.jpg"
            alt="Fine art dog portrait"
            fill
            priority
            className="object-cover"
            style={{ animation: "kenBurns 20s ease-in-out infinite alternate" }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-charcoal/40 to-charcoal/20" />
        </div>

        <div className="relative z-10 text-center px-6 pt-32 pb-20 md:pb-28 max-w-4xl mx-auto">
          <FadeIn>
            <p className="font-sans text-sm font-medium uppercase tracking-luxury text-gold mb-4">
              Fine Art Dog Portraiture
            </p>
            <div className="w-16 h-px bg-gold mx-auto mb-8" />
            <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl text-cream font-normal leading-tight mb-6">
              They Won&apos;t Be Here Forever.
              <br className="hidden md:block" /> But Their Portrait Will.
            </h1>
            <p className="text-lg md:text-xl font-light text-cream/80 max-w-2xl mx-auto mb-10 leading-relaxed">
              Gallery-quality wall art of your dog, created on location across New Jersey. No snapshots. No digital files. Real art, made for your walls and made to last.
            </p>
            <Button href="/dog-portraits/book" size="large">
              Book Your Complimentary Consultation
            </Button>
            <p className="mt-4 text-sm font-light text-taupe">
              No obligation. No pressure. Just a conversation about your dog.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Section 2: The Honest Truth */}
      <section className="bg-cream py-20 md:py-28">
        <Container>
          <div className="w-16 h-px bg-gold mx-auto mb-16" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center">
            <FadeIn>
              <div>
                <p className="font-sans text-sm font-medium uppercase tracking-luxury text-gold mb-4">
                  The Honest Truth
                </p>
                <div className="w-16 h-px bg-gold mb-6" />
                <h2 className="font-serif text-3xl md:text-5xl text-charcoal font-normal mb-8">
                  Your Phone Has Thousands of Photos. How Many Are on Your Walls?
                </h2>
                <div className="space-y-5 text-base font-light text-charcoal leading-relaxed">
                  <p>
                    You photograph them every day. The morning stretch. The head tilt. The way they lean into you on the couch.
                  </p>
                  <p>
                    Your camera roll is full of them. And yet, when you look at your walls, they are nowhere to be found.
                  </p>
                  <p>
                    Phone photos are wonderful for what they are. But they are not portraits. They get buried beneath screenshots and grocery lists. They live on a screen, not in a room. They do not stop someone in a doorway and make them say, <em>that is a beautiful dog.</em>
                  </p>
                  <p>
                    A portrait does that. A portrait gives them the presence they deserve &mdash; not in your pocket, but on your wall, in the room where your family lives.
                  </p>
                </div>
              </div>
            </FadeIn>
            <FadeIn delay={200}>
              <div className="relative aspect-[4/3] w-full">
                <Image
                  src="/images/wall-art/frames-mockups.jpg"
                  alt="Dog portrait displayed as wall art in a styled living room"
                  fill
                  className="object-cover"
                />
              </div>
            </FadeIn>
          </div>
        </Container>
      </section>

      {/* Section 3: Portfolio */}
      <section className="bg-cream-dark py-20 md:py-28">
        <Container>
          <FadeIn>
            <SectionHeading
              label="The Work"
              heading="Portraits Worth Living With"
              subtext="Every dog is different. Every portrait should be, too. These are not templates or poses — they are portraits created to capture who your dog is, in the way only you know them."
            />
          </FadeIn>
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 md:gap-6">
            {PORTFOLIO_IMAGES.map((img) => (
              <div key={img.src} className="relative w-full overflow-hidden break-inside-avoid mb-4 md:mb-6">
                <Image
                  src={img.src}
                  alt={img.alt}
                  width={400}
                  height={300}
                  className="w-full h-auto"
                />
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Section 4: The Experience */}
      <section className="bg-cream py-20 md:py-28">
        <Container>
          <FadeIn>
            <SectionHeading
              label="The Experience"
              heading="From Conversation to Wall Art"
            />
          </FadeIn>
          <StaggerChildren className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10">
            {STEPS.map((step) => (
              <div key={step.number}>
                <p className="font-serif text-3xl text-gold mb-3">{step.number}</p>
                <h3 className="font-serif text-xl text-charcoal mb-3">{step.title}</h3>
                <div className="w-12 h-px bg-gold mb-4" />
                <p className="text-sm font-light text-charcoal leading-relaxed">
                  {step.body}
                </p>
              </div>
            ))}
          </StaggerChildren>
        </Container>
      </section>

      {/* Section 5: About Kristin */}
      <section className="bg-cream-dark py-20 md:py-28">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center">
            <FadeIn>
              <div className="relative aspect-[4/5] w-full max-w-md mx-auto md:mx-0">
                <Image
                  src="/images/kristin_headshot_1000px.jpg"
                  alt="Kristin Chiaramonte, photographer and founder of Hoof & Howl"
                  fill
                  className="object-cover"
                />
              </div>
            </FadeIn>
            <FadeIn delay={200}>
              <div>
                <p className="font-sans text-sm font-medium uppercase tracking-luxury text-gold mb-4">
                  The Photographer
                </p>
                <div className="w-16 h-px bg-gold mb-6" />
                <h2 className="font-serif text-3xl md:text-4xl text-charcoal font-normal mb-6">
                  Why This Work Exists
                </h2>
                <div className="space-y-5 text-base font-light text-charcoal leading-relaxed">
                  <p>
                    I lost my dog Jordan after thirteen years together. He was my constant. And when he was gone, I realized I did not have a single portrait that did justice to who he was. Thousands of phone photos, but nothing for my walls. Nothing that honored what he meant to me.
                  </p>
                  <p>
                    I never want another person to feel that kind of regret.
                  </p>
                  <p>
                    That is why I created Hoof &amp; Howl &mdash; to make the portraits I wish had existed for me. Gallery-quality, archival, made for the wall. Made to last longer than any of us.
                  </p>
                </div>
                <p className="mt-6 text-sm font-medium text-taupe-dark">
                  &mdash; Kristin Chiaramonte, Photographer &amp; Founder
                </p>
              </div>
            </FadeIn>
          </div>
        </Container>
      </section>

      {/* Section 6: Testimonial */}
      <section className="bg-cream py-20 md:py-28">
        <Container>
          <FadeIn>
            <div className="max-w-3xl mx-auto text-center">
              <p className="font-serif text-8xl text-gold leading-none mb-4">&ldquo;</p>
              <blockquote className="font-serif text-xl md:text-2xl text-charcoal italic font-normal leading-relaxed mb-8">
                Our dog, Parker, is very high energy and we thought she&apos;d never sit still for a photoshoot but Kristin knew exactly how to work with her energy to capture beautiful images that will be hanging in our home forever.
              </blockquote>
              <div className="w-12 h-px bg-gold mx-auto mb-4" />
              <p className="font-sans text-sm font-medium uppercase tracking-luxury text-taupe-dark">
                Sydnee, East Windsor, NJ
              </p>
            </div>
          </FadeIn>
        </Container>
      </section>

      {/* Section 7: Common Questions */}
      <section className="bg-cream-dark py-20 md:py-28">
        <Container>
          <FadeIn>
            <SectionHeading
              label="Common Questions"
              heading="Two Things I Hear All the Time"
            />
          </FadeIn>
          <StaggerChildren className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-warm-white p-8 md:p-10 shadow-sm border-t-2 border-gold">
              <h3 className="font-serif text-xl md:text-2xl text-charcoal mb-4">
                &ldquo;My dog will never sit still for a portrait.&rdquo;
              </h3>
              <p className="text-base font-light text-charcoal leading-relaxed">
                Most dogs will not sit still, and that is perfectly fine. I do not need them to. Some of the best portraits come from movement &mdash; from the way a dog turns their head, or the alert posture they hold for just a moment. I work with your dog&apos;s energy, not against it. I bring treats, I bring patience, and I reserve the entire half day so we are never rushing. The session is designed around your dog, not the other way around.
              </p>
            </div>
            <div className="bg-warm-white p-8 md:p-10 shadow-sm border-t-2 border-gold">
              <h3 className="font-serif text-xl md:text-2xl text-charcoal mb-4">
                &ldquo;I&apos;m not really sure what I want.&rdquo;
              </h3>
              <p className="text-base font-light text-charcoal leading-relaxed">
                That is exactly what the consultation is for. You do not need to walk in with a plan. Most clients have a feeling &mdash; they know they want something on their walls, but they are not sure what format, what size, or what style. That is my job to help figure out. We talk through it together, with no pressure and no obligation. By the time we are done, you will know exactly what you want.
              </p>
            </div>
          </StaggerChildren>
        </Container>
      </section>

      {/* Section 8: Final CTA */}
      <section className="bg-charcoal py-20 md:py-28 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-charcoal via-charcoal to-deep-brown" />
        <Container className="relative z-10">
          <FadeIn>
            <div className="max-w-3xl mx-auto text-center">
              <p className="font-sans text-sm font-medium uppercase tracking-luxury text-gold-light mb-4">
                Ready to Begin?
              </p>
              <div className="w-16 h-px bg-gold mx-auto mb-6" />
              <h2 className="font-serif text-3xl md:text-5xl text-cream font-normal mb-6">
                Every Portrait Begins With a Conversation
              </h2>
              <div className="space-y-5 text-base md:text-lg font-light text-cream/70 leading-relaxed mb-10">
                <p>
                  Tell me about your dog. Their name, their personality, the thing they do that no one else&apos;s dog does. I would love to hear it.
                </p>
                <p>
                  Your consultation is complimentary and comes with no obligation. It is simply a conversation about your dog and what a portrait could look like in your home.
                </p>
              </div>
              <Button href="/dog-portraits/book" size="large">
                Book Your Complimentary Consultation
              </Button>
              <p className="mt-4 text-sm font-light text-taupe">
                Or call{" "}
                <TrackedPhoneLink
                  href={SITE.phoneHref}
                  placement="landing-cta"
                  className="text-gold hover:text-gold-light transition-colors duration-300"
                >
                  {SITE.phone}
                </TrackedPhoneLink>
                {" "}to schedule by phone.
              </p>
            </div>
          </FadeIn>
        </Container>
      </section>
    </>
  );
}
