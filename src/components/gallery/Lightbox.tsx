"use client";

import { useEffect, useCallback } from "react";

interface LightboxImage {
  id: number;
  alt: string;
  aspectRatio: number;
  src?: string;
}

interface LightboxProps {
  images: LightboxImage[];
  currentIndex: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}

export default function Lightbox({
  images,
  currentIndex,
  onClose,
  onPrev,
  onNext,
}: LightboxProps) {
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "ArrowRight") onNext();
    },
    [onClose, onPrev, onNext]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [handleKeyDown]);

  const current = images[currentIndex];

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center bg-charcoal/95"
      onClick={onClose}
    >
      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-6 right-6 text-cream/60 hover:text-cream transition-colors z-10"
        aria-label="Close lightbox"
      >
        <svg
          width="32"
          height="32"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <line x1="18" y1="6" x2="6" y2="18" />
          <line x1="6" y1="6" x2="18" y2="18" />
        </svg>
      </button>

      {/* Previous */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onPrev();
        }}
        className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 text-cream/40 hover:text-cream transition-colors z-10"
        aria-label="Previous image"
      >
        <svg
          width="40"
          height="40"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
        >
          <polyline points="15 18 9 12 15 6" />
        </svg>
      </button>

      {/* Image placeholder */}
      <div
        className="max-w-4xl max-h-[80vh] w-full mx-16"
        onClick={(e) => e.stopPropagation()}
      >
        <div
          className="bg-taupe/20 mx-auto"
          style={{
            aspectRatio: current.aspectRatio,
            maxHeight: "80vh",
            width: "auto",
            height: "auto",
          }}
        >
          {current.src ? (
            <img
              src={current.src}
              alt={current.alt}
              className="w-full h-full object-contain"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-taupe/30 via-deep-brown/20 to-charcoal/30 flex items-center justify-center">
              <p className="text-cream/30 font-sans text-sm uppercase tracking-luxury">
                {current.alt}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Next */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onNext();
        }}
        className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 text-cream/40 hover:text-cream transition-colors z-10"
        aria-label="Next image"
      >
        <svg
          width="40"
          height="40"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
        >
          <polyline points="9 18 15 12 9 6" />
        </svg>
      </button>

      {/* Counter */}
      <p className="absolute bottom-6 left-1/2 -translate-x-1/2 text-cream/30 font-sans text-xs uppercase tracking-luxury">
        {currentIndex + 1} / {images.length}
      </p>
    </div>
  );
}
