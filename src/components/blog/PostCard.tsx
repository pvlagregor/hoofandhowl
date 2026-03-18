import Image from "next/image";
import Link from "next/link";
import { urlFor } from "@/sanity/image";
import type { PostSummary } from "@/sanity/types";

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function PostCard({ post }: { post: PostSummary }) {
  const firstCategory = post.categories?.[0];

  return (
    <Link
      href={`/blog/${post.slug.current}`}
      className="group block bg-warm-white overflow-hidden transition-all duration-300 hover:-translate-y-0.5"
    >
      {post.featuredImage?.asset && (
        <div className="relative aspect-[16/10] overflow-hidden">
          <Image
            src={urlFor(post.featuredImage).width(600).height(375).url()}
            alt={post.featuredImage.alt ?? post.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        </div>
      )}
      <div className="p-6">
        {firstCategory && (
          <p className="font-sans text-xs font-medium uppercase tracking-luxury text-gold mb-3">
            {firstCategory.title}
          </p>
        )}
        <h3 className="font-serif text-xl text-charcoal leading-snug group-hover:text-gold transition-colors duration-300">
          {post.title}
        </h3>
        {post.excerpt && (
          <p className="mt-3 text-sm font-light text-charcoal leading-relaxed line-clamp-3">
            {post.excerpt}
          </p>
        )}
        <p className="mt-4 text-xs text-taupe">
          {formatDate(post.publishedAt)}
        </p>
      </div>
    </Link>
  );
}
