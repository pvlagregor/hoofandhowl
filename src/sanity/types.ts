import type { PortableTextBlock } from "@portabletext/react";

export interface SanityImage {
  _type: "image";
  asset: { _ref: string; _type: "reference"; _id?: string; url?: string };
  alt?: string;
  hotspot?: { x: number; y: number; height: number; width: number };
  crop?: { top: number; bottom: number; left: number; right: number };
}

export interface Category {
  _id: string;
  title: string;
  slug: { current: string };
}

export interface PostSummary {
  _id: string;
  title: string;
  slug: { current: string };
  excerpt: string;
  featuredImage: SanityImage;
  publishedAt: string;
  categories: Category[];
}

export interface Post extends PostSummary {
  body: PortableTextBlock[];
  author: string;
  seoTitle?: string;
  seoDescription?: string;
}
