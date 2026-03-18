"use client";

import { useRouter, useSearchParams } from "next/navigation";
import type { Category } from "@/sanity/types";

export default function CategoryFilter({
  categories,
}: {
  categories: Category[];
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const activeCategory = searchParams.get("category");

  function handleFilter(slug: string | null) {
    if (slug) {
      router.push(`/blog?category=${slug}`, { scroll: false });
    } else {
      router.push("/blog", { scroll: false });
    }
  }

  return (
    <div className="flex flex-wrap gap-x-6 gap-y-2 justify-center mb-12 md:mb-16">
      <button
        onClick={() => handleFilter(null)}
        className={`font-sans text-sm uppercase tracking-luxury pb-1 transition-colors duration-300 ${
          !activeCategory
            ? "text-gold border-b border-gold"
            : "text-taupe hover:text-charcoal"
        }`}
      >
        All
      </button>
      {categories.map((cat) => (
        <button
          key={cat._id}
          onClick={() => handleFilter(cat.slug.current)}
          className={`font-sans text-sm uppercase tracking-luxury pb-1 transition-colors duration-300 ${
            activeCategory === cat.slug.current
              ? "text-gold border-b border-gold"
              : "text-taupe hover:text-charcoal"
          }`}
        >
          {cat.title}
        </button>
      ))}
    </div>
  );
}
