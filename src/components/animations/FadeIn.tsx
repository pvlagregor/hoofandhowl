"use client";

import { useEffect, useRef, useState } from "react";

interface FadeInProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "none";
}

export default function FadeIn({
  children,
  className = "",
  delay = 0,
  direction = "up",
}: FadeInProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible
          ? "translateY(0)"
          : direction === "up"
            ? "translateY(24px)"
            : "none",
        transition: `opacity 700ms cubic-bezier(0.25, 0.1, 0.25, 1) ${delay}ms, transform 700ms cubic-bezier(0.25, 0.1, 0.25, 1) ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}
