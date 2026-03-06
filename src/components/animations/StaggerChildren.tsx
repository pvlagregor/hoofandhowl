"use client";

import { useEffect, useRef, useState, Children } from "react";

interface StaggerChildrenProps {
  children: React.ReactNode;
  className?: string;
  staggerDelay?: number;
}

export default function StaggerChildren({
  children,
  className = "",
  staggerDelay = 150,
}: StaggerChildrenProps) {
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
      { threshold: 0.1 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className={className}>
      {Children.map(children, (child, index) => (
        <div
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "translateY(0)" : "translateY(24px)",
            transition: `opacity 700ms cubic-bezier(0.25, 0.1, 0.25, 1) ${index * staggerDelay}ms, transform 700ms cubic-bezier(0.25, 0.1, 0.25, 1) ${index * staggerDelay}ms`,
          }}
        >
          {child}
        </div>
      ))}
    </div>
  );
}
