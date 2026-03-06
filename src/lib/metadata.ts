import { Metadata } from "next";
import { SITE } from "./constants";

export function createMetadata(params: {
  title: string;
  description: string;
  path: string;
}): Metadata {
  const fullTitle =
    params.path === "/"
      ? `${SITE.name} | Luxury Pet Portraiture in New Jersey`
      : `${params.title} | ${SITE.name}`;

  return {
    title: fullTitle,
    description: params.description,
    openGraph: {
      title: params.title,
      description: params.description,
      url: `${SITE.url}${params.path}`,
      siteName: SITE.name,
      locale: "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: params.title,
      description: params.description,
    },
    alternates: { canonical: `${SITE.url}${params.path}` },
  };
}
