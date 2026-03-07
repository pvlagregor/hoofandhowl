import Hero from "@/components/sections/Hero";
import ValueProps from "@/components/sections/ValueProps";
import GalleryGrid from "@/components/gallery/GalleryGrid";
import WhyWallArt from "@/components/sections/WhyWallArt";
import OwnerStory from "@/components/sections/OwnerStory";
import TestimonialSection from "@/components/sections/TestimonialSection";
import CtaBanner from "@/components/sections/CtaBanner";

export default function Home() {
  return (
    <>
      <Hero
        label="New Jersey Pet Portraiture"
        heading="They won't be here forever. But their portrait will."
        subtext="Fine art wall portraits of the animals you love most. Crafted in your home. Hung on your walls. Kept in your family."
        ctaText="Schedule Your Consultation"
        ctaHref="/contact"
        backgroundImage="/images/homepage/_A740559.jpg"
      />
      <ValueProps />
      <GalleryGrid />
      <WhyWallArt />
      <OwnerStory />
      <TestimonialSection />
      <CtaBanner />
    </>
  );
}
