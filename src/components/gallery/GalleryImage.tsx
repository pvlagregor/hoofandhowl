"use client";

import { useEffect, useRef, useState } from "react";

interface GalleryImageProps {
  index: number;
  aspectRatio: number;
  alt: string;
  src?: string;
  onClick: () => void;
}

export default function GalleryImage({
  index,
  aspectRatio,
  alt,
  src,
  onClick,
}: GalleryImageProps) {
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
    <div
      ref={ref}
      className="mb-4 md:mb-6 break-inside-avoid cursor-pointer group"
      onClick={onClick}
      role="button"
      tabIndex={0}
      aria-label={`View ${alt}`}
      onKeyDown={(e) => e.key === "Enter" && onClick()}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateY(0)" : "translateY(24px)",
        transition: `opacity 700ms cubic-bezier(0.25,0.1,0.25,1) ${(index % 6) * 100}ms, transform 700ms cubic-bezier(0.25,0.1,0.25,1) ${(index % 6) * 100}ms`,
      }}
    >
      <div
        className="relative overflow-hidden bg-taupe/20 transition-all duration-300 group-hover:scale-[1.02] group-hover:shadow-lg"
        style={{ aspectRatio }}
      >
        {src ? (
          <img
            src={src}
            alt={alt}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-taupe/30 via-deep-brown/20 to-charcoal/30" />
        )}
        {/* Hover gold border */}
        <div className="absolute inset-0 border-2 border-gold/0 group-hover:border-gold/40 transition-all duration-300" />
      </div>
    </div>
  );
}
