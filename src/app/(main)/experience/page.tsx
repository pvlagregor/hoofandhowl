import { createMetadata } from "@/lib/metadata";
import Hero from "@/components/sections/Hero";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import CtaBanner from "@/components/sections/CtaBanner";
import FadeIn from "@/components/animations/FadeIn";
import StaggerChildren from "@/components/animations/StaggerChildren";

export const metadata = createMetadata({
  title: "The Portrait Experience",
  description:
    "From consultation to installation: how a Hoof & Howl portrait session works. A white-glove luxury pet photography experience in New Jersey.",
  path: "/experience",
});

const steps = [
  {
    number: "01",
    title: "The Consultation",
    text: "Before we pick up a camera, we talk. I want to know about your animal\u2009\u2014\u2009their personality, their quirks, the things about them that make you smile when you think about them. We\u2019ll talk about where the art will hang, what style speaks to you, and what this portrait should feel like when you see it every day.\n\nThis conversation is complimentary and comes with no obligation. It\u2019s simply how great portraits begin.",
  },
  {
    number: "02",
    title: "The Session",
    text: "On the day of your session, I come to you. I bring professional studio lighting to your home, or we meet at an outdoor location that feels right for your animal. Sessions are relaxed and unhurried\u2009\u2014\u2009typically takes 60 to 90 minutes but we reserve a half day for each client in case your pet needs more time. Your pet sets the pace. If they need a break, we take a break. If they need a treat, we have treats.\n\nThe goal is not a hundred photos. The goal is a handful of extraordinary ones.",
  },
  {
    number: "03",
    title: "The Reveal",
    text: "About two weeks after your session, we meet again for a private viewing of your portraits either in person or virtually for your convenience. I\u2019ll show you a curated selection of the best images already placed into artwork digitally so you can see exactly how they\u2019ll look on your walls.\n\nThis is the moment clients tell me they cry (in the best way). Seeing your animal portrayed with this level of artistry and intention\u2009\u2014\u2009it hits different.\n\nTogether, we\u2019ll choose which portraits to produce and which wall art format is right for your space.",
  },
  {
    number: "04",
    title: "Delivery & Installation",
    text: "Your finished art arrives in approximately four to six weeks. And I don\u2019t just ship it to your door\u2009\u2014\u2009I have it delivered and installed personally and professionally. We will bring the hardware, measure the wall, and hang the art. You stand back and see your animal looking out at you from a portrait that will be there for decades.\n\nThat\u2019s the moment this whole experience is for.",
  },
];

const faqs = [
  {
    q: "What if my animal won\u2019t sit still?",
    a: "They don\u2019t need to. Some of the best portraits come from movement, from a turned head, from a moment of curiosity. I work with your animal\u2019s energy, not against it. And I bring treats.",
  },
  {
    q: "Do you shoot outdoors?",
    a: "Absolutely. I bring professional lighting to any location\u2009\u2014\u2009your backyard, a barn, a field, a park that means something to you. We can also work indoors in your home with studio lighting and backdrops for that classic studio portrait look in the comfort of home.",
  },
  {
    q: "Can I be in the portrait with my animal?",
    a: "Yes. Many clients choose to include themselves or their family. These are some of the most meaningful pieces I create.",
  },
  {
    q: "Do you sell digital files?",
    a: "My focus is on creating physical wall art\u2009\u2014\u2009that\u2019s where the real impact lives. I do offer digital files as an add-on for clients who want them, but the heart of this work is producing something tangible for your home.",
  },
  {
    q: "What is the investment?",
    a: "Initial consultation is complimentary. Portrait sessions with Hoof & Howl are $295 to book and include a $150 credit towards your wall art or album purchase. Our typical client invests between $2,000 and $4,000, on wall art depending on their needs.",
  },
];

export default function ExperiencePage() {
  return (
    <>
      <Hero
        label="The Experience"
        heading="This Is Not a Photo Shoot. This Is a Portrait Experience."
        subtext="From our first conversation to the moment your art is on the wall, every step is personal, unhurried, and designed around you and your animal."
        height="medium"
      />

      {/* Process Steps */}
      <section className="py-20 md:py-28 bg-cream">
        <Container>
          <div className="max-w-3xl mx-auto">
            {steps.map((step, index) => (
              <FadeIn key={step.number}>
                <div className="relative pl-16 md:pl-24 pb-16 md:pb-20 last:pb-0">
                  {/* Vertical line */}
                  {index < steps.length - 1 && (
                    <div className="absolute left-5 md:left-8 top-14 bottom-0 w-px bg-gold/30" />
                  )}

                  {/* Step number */}
                  <span className="absolute left-0 top-0 font-serif text-4xl md:text-5xl text-gold/70 font-normal">
                    {step.number}
                  </span>

                  <h3 className="font-serif text-2xl md:text-3xl text-charcoal mb-4 mt-[50px]">
                    {step.title}
                  </h3>
                  <div className="space-y-4 text-base font-light text-charcoal leading-relaxed">
                    {step.text.split("\n\n").map((para, i) => (
                      <p key={i}>{para}</p>
                    ))}
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </Container>
      </section>

      {/* At a Glance */}
      <section className="py-20 md:py-28 bg-cream-dark">
        <Container>
          <FadeIn>
            <div className="max-w-3xl mx-auto">
              <p className="font-sans text-sm font-medium uppercase tracking-luxury text-gold mb-4">
                At a Glance
              </p>
              <div className="w-16 h-px bg-gold mb-8" />

              <StaggerChildren className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {[
                  ["Session length", "As long as it needs to be to get the images you want"],
                  [
                    "Location",
                    "Your home or outdoor location of your choice",
                  ],
                  [
                    "Turnaround",
                    "8-10 weeks from session to artwork installation",
                  ],
                  ["Investment", "$295 to book a session"],
                  [
                    "Animals",
                    "All animals welcome (we specialize in dogs and horses)",
                  ],
                  [
                    "Humans welcome too",
                    "Family portraits with your animal are always an option",
                  ],
                ].map(([label, value]) => (
                  <div key={label} className="flex gap-3">
                    <div className="w-1 bg-gold/40 shrink-0" />
                    <div>
                      <p className="font-sans text-xs font-medium uppercase tracking-wide text-charcoal mb-1">
                        {label}
                      </p>
                      <p className="text-sm font-light text-charcoal">
                        {value}
                      </p>
                    </div>
                  </div>
                ))}
              </StaggerChildren>
            </div>
          </FadeIn>
        </Container>
      </section>

      {/* FAQ */}
      <section className="py-20 md:py-28 bg-cream">
        <Container>
          <FadeIn>
            <div className="max-w-3xl mx-auto">
              <p className="font-sans text-sm font-medium uppercase tracking-luxury text-gold mb-4">
                Frequently Asked Questions
              </p>
              <div className="w-16 h-px bg-gold mb-10" />

              <FaqList faqs={faqs} />
            </div>
          </FadeIn>
        </Container>
      </section>

      <CtaBanner
        heading="Ready to Begin?"
        subtext="Your consultation is complimentary and comes with absolutely no obligation. Let's talk about your animal."
        ctaText="Schedule Your Consultation"
      />
    </>
  );
}

function FaqList({
  faqs,
}: {
  faqs: { q: string; a: string }[];
}) {
  return (
    <div className="divide-y divide-taupe/20">
      {faqs.map((faq) => (
        <FaqItem key={faq.q} question={faq.q} answer={faq.a} />
      ))}
    </div>
  );
}

function FaqItem({ question, answer }: { question: string; answer: string }) {
  return <FaqItemClient question={question} answer={answer} />;
}

import FaqItemClient from "@/components/sections/FaqItemClient";
