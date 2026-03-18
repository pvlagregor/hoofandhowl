import { createImageUrlBuilder } from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url";
import { getClient } from "./client";

export function urlFor(source: SanityImageSource) {
  const builder = createImageUrlBuilder(getClient());
  return builder.image(source);
}
