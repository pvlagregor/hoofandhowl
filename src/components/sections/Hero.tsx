import Image from "next/image";
import Button from "@/components/ui/Button";

interface HeroProps {
  label: string;
  heading: string;
  subtext?: string;
  ctaText?: string;
  ctaHref?: string;
  height?: "full" | "medium" | "short";
  backgroundImage?: string;
}

export default function Hero({
  label,
  heading,
  subtext,
  ctaText,
  ctaHref,
  height = "full",
  backgroundImage,
}: HeroProps) {
  const heightClass = {
    full: "min-h-screen",
    medium: "min-h-[60vh]",
    short: "min-h-[40vh]",
  }[height];

  return (
    <section className={`relative ${heightClass} flex items-end overflow-hidden`}>
      {/* Background */}
      <div
        className="absolute inset-0 bg-charcoal"
        style={{ animation: "kenBurns 20s alternate infinite ease-in-out" }}
      >
        {backgroundImage ? (
          <Image
            src={backgroundImage}
            alt=""
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-charcoal via-deep-brown to-charcoal opacity-90" />
        )}
      </div>

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-charcoal/70 via-charcoal/20 to-transparent" />

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-6xl px-6 sm:px-8 pt-32 pb-20 md:pb-28 w-full">
        <p className="font-sans text-sm font-medium uppercase tracking-luxury text-gold-light mb-4">
          {label}
        </p>
        <div className="w-16 h-px bg-gold mb-6" />
        <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl font-normal text-white max-w-3xl leading-[1.1]">
          {heading}
        </h1>
        {subtext && (
          <p className="mt-6 text-base md:text-lg font-light text-cream/70 max-w-xl leading-relaxed">
            {subtext}
          </p>
        )}
        {ctaText && ctaHref && (
          <div className="mt-10">
            <Button href={ctaHref} size="large">
              {ctaText}
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}
