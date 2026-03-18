import { Suspense } from "react";
import { createMetadata } from "@/lib/metadata";
import { getClient } from "@/sanity/client";
import {
  getAllPostsQuery,
  getPostsByCategoryQuery,
  getAllCategoriesQuery,
} from "@/sanity/queries";
import type { PostSummary, Category } from "@/sanity/types";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import PostCard from "@/components/blog/PostCard";
import CategoryFilter from "@/components/blog/CategoryFilter";

export const revalidate = 3600;

export const metadata = createMetadata({
  title: "Blog",
  description:
    "Stories, insights, and inspiration from the studio — thoughts on pet portraiture, the animals we photograph, and why wall art matters.",
  path: "/blog",
});

export default async function BlogPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const params = await searchParams;
  const categorySlug = params.category;

  const sanity = getClient();
  const [posts, categories] = await Promise.all([
    categorySlug
      ? sanity.fetch<PostSummary[]>(getPostsByCategoryQuery, { categorySlug })
      : sanity.fetch<PostSummary[]>(getAllPostsQuery),
    sanity.fetch<Category[]>(getAllCategoriesQuery),
  ]);

  return (
    <>
      <section className="pt-32 pb-16 md:pt-40 md:pb-20 bg-cream">
        <Container>
          <SectionHeading
            label="From the Studio"
            heading="Stories, Insights & Inspiration"
            subtext="Thoughts on pet portraiture, the animals we photograph, and why wall art matters."
          />
        </Container>
      </section>

      <section className="py-16 md:py-24 bg-cream-dark">
        <Container>
          <Suspense>
            <CategoryFilter categories={categories} />
          </Suspense>

          {posts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post) => (
                <PostCard key={post._id} post={post} />
              ))}
            </div>
          ) : (
            <p className="text-center text-taupe text-base font-light">
              No posts yet — check back soon.
            </p>
          )}
        </Container>
      </section>
    </>
  );
}
