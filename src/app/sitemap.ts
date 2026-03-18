import { MetadataRoute } from "next";
import { client } from "@/sanity/client";
import { getAllPostSlugsQuery } from "@/sanity/queries";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = "https://hoofandhowl.com";

  let postRoutes: MetadataRoute.Sitemap = [];

  if (client) {
    const postSlugs = await client.fetch<{ slug: string }[]>(
      getAllPostSlugsQuery
    );
    postRoutes = postSlugs.map(({ slug }) => ({
      url: `${base}/blog/${slug}`,
      lastModified: new Date(),
      priority: 0.6 as const,
    }));
  }

  return [
    { url: base, lastModified: new Date(), priority: 1.0 },
    { url: `${base}/about`, lastModified: new Date(), priority: 0.8 },
    { url: `${base}/wall-art`, lastModified: new Date(), priority: 0.9 },
    { url: `${base}/experience`, lastModified: new Date(), priority: 0.8 },
    { url: `${base}/contact`, lastModified: new Date(), priority: 0.7 },
    { url: `${base}/blog`, lastModified: new Date(), priority: 0.7 },
    ...postRoutes,
  ];
}
