interface DividerProps {
  className?: string;
}

export default function Divider({ className = "" }: DividerProps) {
  return <div className={`w-16 h-px bg-gold ${className}`} />;
}
