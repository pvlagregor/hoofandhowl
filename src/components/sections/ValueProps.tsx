import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import FadeIn from "@/components/animations/FadeIn";
import StaggerChildren from "@/components/animations/StaggerChildren";

const props = [
  {
    title: "Portraits That Outlast Memory",
    text: "Memory softens over time. The exact way they tilted their head, the color of their eyes in afternoon light\u2009\u2014\u2009those details fade. A Hoof & Howl portrait preserves them with the clarity and permanence they deserve.",
  },
  {
    title: "Your Home, Transformed",
    text: "We don\u2019t sell files that sit on a hard drive. We create museum-quality wall art\u2009\u2014\u2009framed, finished, and installed in your home. Every piece is crafted to become the room\u2019s centerpiece.",
  },
  {
    title: "An Experience, Not Just a Session",
    text: "From our first conversation to the moment your portrait is hung, every step is personal. This is not a twenty-minute mini session. This is an afternoon dedicated to your animal and the art we\u2019ll make together.",
  },
];

export default function ValueProps() {
  return (
    <section className="py-20 md:py-28 bg-cream">
      <Container>
        <FadeIn>
          <SectionHeading
            label="What We Create"
            heading="More Than Photography"
          />
        </FadeIn>

        <StaggerChildren className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-12">
          {props.map((prop) => (
            <div key={prop.title} className="text-center">
              <div className="w-12 h-px bg-gold mx-auto mb-6" />
              <h3 className="font-serif text-xl md:text-2xl text-charcoal mb-4">
                {prop.title}
              </h3>
              <p className="text-sm md:text-base font-light text-charcoal leading-relaxed">
                {prop.text}
              </p>
            </div>
          ))}
        </StaggerChildren>
      </Container>
    </section>
  );
}
