import Link from "next/link";

interface ButtonProps {
  variant?: "primary" | "secondary" | "ghost";
  size?: "default" | "large";
  href?: string;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  type?: "button" | "submit";
}

const variants = {
  primary:
    "bg-gold text-charcoal hover:bg-gold-light",
  secondary:
    "border border-gold text-gold hover:bg-gold hover:text-charcoal",
  ghost:
    "border border-charcoal text-charcoal hover:bg-charcoal hover:text-cream",
};

const sizes = {
  default: "px-8 py-3.5 text-sm",
  large: "px-10 py-4 text-base",
};

export default function Button({
  variant = "primary",
  size = "default",
  href,
  children,
  className = "",
  onClick,
  type = "button",
}: ButtonProps) {
  const classes = `inline-block font-sans font-medium uppercase tracking-luxury transition-all duration-300 hover:-translate-y-0.5 text-center ${variants[variant]} ${sizes[size]} ${className}`;

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} className={classes}>
      {children}
    </button>
  );
}
