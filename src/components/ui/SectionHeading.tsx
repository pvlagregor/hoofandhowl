interface SectionHeadingProps {
  label?: string;
  heading: string;
  subtext?: string;
  align?: "center" | "left";
  dark?: boolean;
}

export default function SectionHeading({
  label,
  heading,
  subtext,
  align = "center",
  dark = false,
}: SectionHeadingProps) {
  const alignClass = align === "center" ? "text-center" : "text-left";
  const dividerAlign = align === "center" ? "mx-auto" : "";

  return (
    <div className={`${alignClass} mb-12 md:mb-16`}>
      {label && (
        <p
          className={`font-sans text-sm font-medium uppercase tracking-luxury mb-4 ${
            dark ? "text-gold-light" : "text-gold"
          }`}
        >
          {label}
        </p>
      )}
      <div className={`w-16 h-px bg-gold mb-6 ${dividerAlign}`} />
      <h2
        className={`font-serif text-3xl md:text-5xl font-normal ${
          dark ? "text-cream" : "text-charcoal"
        }`}
      >
        {heading}
      </h2>
      {subtext && (
        <p
          className={`mt-6 text-base md:text-lg font-light max-w-2xl leading-relaxed ${
            align === "center" ? "mx-auto" : ""
          } ${dark ? "text-taupe" : "text-charcoal"}`}
        >
          {subtext}
        </p>
      )}
    </div>
  );
}
