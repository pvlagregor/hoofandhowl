import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://hoofandhowl.com";

  return [
    { url: base, lastModified: new Date(), priority: 1.0 },
    { url: `${base}/about`, lastModified: new Date(), priority: 0.8 },
    { url: `${base}/wall-art`, lastModified: new Date(), priority: 0.9 },
    { url: `${base}/experience`, lastModified: new Date(), priority: 0.8 },
    { url: `${base}/contact`, lastModified: new Date(), priority: 0.7 },
  ];
}
