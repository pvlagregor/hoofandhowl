import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { client, getClient } from "@/sanity/client";
import { getPostBySlugQuery, getAllPostSlugsQuery } from "@/sanity/queries";
import { urlFor } from "@/sanity/image";
import { SITE } from "@/lib/constants";
import type { Post } from "@/sanity/types";
import Container from "@/components/ui/Container";
import { PostBody } from "@/components/blog/PostBody";
import CtaBanner from "@/components/sections/CtaBanner";

export const revalidate = 3600;

export async function generateStaticParams() {
  if (!client) return [];
  const slugs = await client.fetch<{ slug: string }[]>(getAllPostSlugsQuery);
  return slugs.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getClient().fetch<Post | null>(getPostBySlugQuery, { slug });

  if (!post) return {};

  const title = post.seoTitle ?? post.title;
  const description = post.seoDescription ?? post.excerpt;
  const imageUrl = post.featuredImage?.asset
    ? urlFor(post.featuredImage).width(1200).height(630).url()
    : undefined;

  return {
    title: `${title} | ${SITE.name}`,
    description,
    openGraph: {
      title,
      description,
      url: `${SITE.url}/blog/${post.slug.current}`,
      siteName: SITE.name,
      type: "article",
      publishedTime: post.publishedAt,
      ...(imageUrl && { images: [{ url: imageUrl, width: 1200, height: 630 }] }),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
    alternates: { canonical: `${SITE.url}/blog/${post.slug.current}` },
  };
}

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getClient().fetch<Post | null>(getPostBySlugQuery, { slug });

  if (!post) notFound();

  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 pb-16 md:pt-40 md:pb-20 bg-charcoal overflow-hidden">
        {post.featuredImage?.asset && (
          <Image
            src={urlFor(post.featuredImage).width(1600).height(600).url()}
            alt={post.featuredImage.alt ?? post.title}
            fill
            className="object-cover opacity-30"
            priority
            sizes="100vw"
          />
        )}
        <div className="relative z-10">
          <Container>
            <Link
              href="/blog"
              className="inline-block font-sans text-sm uppercase tracking-luxury text-gold mb-8 hover:text-gold-light transition-colors"
            >
              &larr; Back to Blog
            </Link>
            <div className="max-w-3xl">
              {post.categories?.length > 0 && (
                <p className="font-sans text-xs font-medium uppercase tracking-luxury text-gold-light mb-4">
                  {post.categories.map((c) => c.title).join(" / ")}
                </p>
              )}
              <h1 className="font-serif text-3xl md:text-5xl text-cream font-normal leading-tight">
                {post.title}
              </h1>
              <p className="mt-4 text-sm text-cream/50">
                {formatDate(post.publishedAt)}
                {post.author && ` · ${post.author}`}
              </p>
            </div>
          </Container>
        </div>
      </section>

      {/* Article Body */}
      <section className="py-16 md:py-24 bg-cream">
        <div className="mx-auto max-w-3xl px-6 sm:px-8">
          <article>
            <PostBody body={post.body} />
          </article>
        </div>
      </section>

      <CtaBanner />
    </>
  );
}
