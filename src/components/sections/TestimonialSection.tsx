import Container from "@/components/ui/Container";
import FadeIn from "@/components/animations/FadeIn";

export default function TestimonialSection() {
  return (
    <section className="py-20 md:py-28 bg-cream">
      <Container>
        <FadeIn>
          <div className="max-w-3xl mx-auto text-center">
            {/* Client portrait */}
            <div className="mb-12 flex justify-center">
              <img
                src="/images/homepage/_A740565-Edit.jpg"
                alt="Client"
                className="w-32 h-32 md:w-40 md:h-40 rounded-full object-cover border-4 border-gold/20"
              />
            </div>
            {/* Decorative quotation mark */}
            <span className="font-serif text-8xl text-gold leading-none block mb-4">
              &ldquo;
            </span>
            <blockquote className="font-serif text-2xl md:text-3xl text-charcoal font-normal leading-relaxed italic">
              Our dog, Parker, is very high energy and we thought she&rsquo;d never sit still for a photoshoot but Kristin knew exactly how to work with her energy to capture beautiful images that will be hanging in our home forever.
            </blockquote>
            <div className="w-12 h-px bg-gold mx-auto mt-8 mb-4" />
            <p className="font-sans text-sm uppercase tracking-luxury text-taupe">
              Sydnee, East Windsor, NJ
            </p>
          </div>
        </FadeIn>
      </Container>
    </section>
  );
}
