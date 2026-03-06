interface ContainerProps {
  children: React.ReactNode;
  className?: string;
  wide?: boolean;
}

export default function Container({
  children,
  className = "",
  wide = false,
}: ContainerProps) {
  return (
    <div
      className={`mx-auto px-6 sm:px-8 ${wide ? "max-w-7xl" : "max-w-6xl"} ${className}`}
    >
      {children}
    </div>
  );
}
