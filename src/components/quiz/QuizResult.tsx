import FadeIn from "@/components/animations/FadeIn";
import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import Divider from "@/components/ui/Divider";
import {
  STYLE_RESULTS,
  getLifeStageClosing,
  type StyleKey,
} from "./quizData";

interface QuizResultProps {
  styleKey: StyleKey;
  lifeStageAnswerId: string;
  petName?: string;
}

export default function QuizResult({
  styleKey,
  lifeStageAnswerId,
  petName,
}: QuizResultProps) {
  const result = STYLE_RESULTS[styleKey];
  const lifeStage = getLifeStageClosing(lifeStageAnswerId);

  return (
    <div>
      {/* Style Reveal */}
      <section className="py-20 md:py-28">
        <Container>
          <FadeIn>
            <div className="text-center max-w-2xl mx-auto">
              <p className="font-sans text-sm font-medium uppercase tracking-luxury text-gold mb-4">
                Your Portrait Style
              </p>
              <Divider className="mx-auto mb-8" />
              <h1 className="font-serif text-4xl md:text-5xl text-cream font-normal leading-tight">
                {result.name}
              </h1>
              <p className="text-base md:text-lg font-light text-taupe leading-relaxed mt-6">
                {result.description}
              </p>
            </div>
          </FadeIn>
        </Container>
      </section>

      {/* Image Placeholders */}
      <section className="py-16 bg-deep-brown">
        <Container>
          <FadeIn>
            <h2 className="font-serif text-2xl md:text-3xl text-cream font-normal text-center mb-10">
              What Your Style Looks Like on Real Walls
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[1, 2, 3].map((n) => (
                <div
                  key={n}
                  className="aspect-[4/3] bg-charcoal/50 border border-taupe/20 rounded flex items-center justify-center"
                >
                  <span className="text-taupe/40 text-sm uppercase tracking-luxury">
                    Portrait Example {n}
                  </span>
                </div>
              ))}
            </div>
          </FadeIn>
        </Container>
      </section>

      {/* Best Products */}
      <section className="py-16">
        <Container>
          <FadeIn>
            <div className="text-center max-w-xl mx-auto">
              <p className="font-sans text-sm font-medium uppercase tracking-luxury text-gold mb-4">
                Best Match
              </p>
              <Divider className="mx-auto mb-8" />
              <p className="font-serif text-xl md:text-2xl text-cream font-normal mb-8">
                {result.bestMatch}
              </p>
              <ul className="space-y-3">
                {result.bestProducts.map((product) => (
                  <li
                    key={product}
                    className="text-base font-light text-taupe"
                  >
                    {product}
                  </li>
                ))}
              </ul>
            </div>
          </FadeIn>
        </Container>
      </section>

      {/* Closing Line + CTA */}
      <section className="py-20 md:py-28">
        <Container>
          <FadeIn>
            <div className="text-center max-w-xl mx-auto">
              {lifeStage && (
                <p className="font-serif text-xl md:text-2xl text-cream/90 italic leading-relaxed mb-10">
                  {lifeStage.closingLine}
                </p>
              )}
              <Divider className="mx-auto mb-10" />
              <p className="font-sans text-sm font-medium uppercase tracking-luxury text-gold mb-4">
                Your Next Step
              </p>
              <p className="text-base font-light text-taupe mb-8 max-w-md mx-auto">
                Book your complimentary consultation. No obligation &mdash; just
                a conversation about {petName || "your pet"} and the artwork
                you&apos;ve been imagining.
              </p>
              <Button href="/contact" size="large">
                Book Your Complimentary Consultation
              </Button>
            </div>
          </FadeIn>
        </Container>
      </section>
    </div>
  );
}
