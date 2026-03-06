"use client";

import { useState } from "react";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import Button from "@/components/ui/Button";
import GalleryImage from "./GalleryImage";
import Lightbox from "./Lightbox";
import FadeIn from "@/components/animations/FadeIn";

const GALLERY_IMAGES = [
  {
    id: 1,
    src: "/images/homepage/gallery/_8500267-Edit-2.jpg",
    alt: "Pet portrait 1",
    aspectRatio: 3 / 4,
  },
  {
    id: 2,
    src: "/images/homepage/gallery/_8500279-Edit-2.jpg",
    alt: "Pet portrait 2",
    aspectRatio: 4 / 5,
  },
  {
    id: 3,
    src: "/images/homepage/gallery/_8500325.jpg",
    alt: "Pet portrait 3",
    aspectRatio: 1,
  },
  {
    id: 4,
    src: "/images/homepage/gallery/_8509486-2.jpg",
    alt: "Pet portrait 4",
    aspectRatio: 4 / 3,
  },
  {
    id: 5,
    src: "/images/homepage/gallery/_A740565-Edit.jpg",
    alt: "Pet portrait 5",
    aspectRatio: 3 / 4,
  },
  {
    id: 6,
    src: "/images/homepage/gallery/_DSC0081-Edit.jpg",
    alt: "Pet portrait 6",
    aspectRatio: 5 / 4,
  },
  {
    id: 7,
    src: "/images/homepage/gallery/_DSC0036-Edit.jpg",
    alt: "Pet portrait 7",
    aspectRatio: 5 / 4,
  },
  {
    id: 8,
    src: "/images/homepage/gallery/_8509284.jpg",
    alt: "Pet portrait 8",
    aspectRatio: 5 / 4,
  },
  {
    id: 9,
    src: "/images/homepage/gallery/_DSC0078-Edit-Edit.jpg",
    alt: "Pet portrait 9",
    aspectRatio: 5 / 4,
  },
];

export default function GalleryGrid() {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  return (
    <section className="py-20 md:py-28 bg-charcoal">
      <Container wide>
        <FadeIn>
          <SectionHeading
            label="Portfolio"
            heading="A Gallery of Those Who Matter Most"
            subtext="Each portrait is a collaboration between photographer, animal, and the people who love them."
            dark
          />
        </FadeIn>

        <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 md:gap-6">
          {GALLERY_IMAGES.map((img, index) => (
            <GalleryImage
              key={img.id}
              index={index}
              aspectRatio={img.aspectRatio}
              alt={img.alt}
              src={img.src}
              onClick={() => setLightboxIndex(index)}
            />
          ))}
        </div>

        <FadeIn>
          <div className="text-center mt-16">
            <Button href="/contact" variant="secondary">
              See Your Beloved Pet Here
            </Button>
          </div>
        </FadeIn>
      </Container>

      {lightboxIndex !== null && (
        <Lightbox
          images={GALLERY_IMAGES}
          currentIndex={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          onPrev={() =>
            setLightboxIndex(
              (lightboxIndex - 1 + GALLERY_IMAGES.length) %
                GALLERY_IMAGES.length
            )
          }
          onNext={() =>
            setLightboxIndex((lightboxIndex + 1) % GALLERY_IMAGES.length)
          }
        />
      )}
    </section>
  );
}
