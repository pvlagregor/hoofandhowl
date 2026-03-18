import { groq } from "next-sanity";

export const postSummaryFields = groq`
  _id,
  title,
  slug,
  publishedAt,
  excerpt,
  categories[]->{ _id, title, slug },
  featuredImage { ..., asset->{ _id, url } }
`;

export const getAllPostsQuery = groq`
  *[_type == "post"] | order(publishedAt desc) {
    ${postSummaryFields}
  }
`;

export const getPostsByCategoryQuery = groq`
  *[_type == "post" && $categorySlug in categories[]->slug.current] | order(publishedAt desc) {
    ${postSummaryFields}
  }
`;

export const getPostBySlugQuery = groq`
  *[_type == "post" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    author,
    publishedAt,
    excerpt,
    categories[]->{ _id, title, slug },
    featuredImage { ..., asset->{ _id, url } },
    body,
    seoTitle,
    seoDescription
  }
`;

export const getAllPostSlugsQuery = groq`
  *[_type == "post"] { "slug": slug.current }
`;

export const getAllCategoriesQuery = groq`
  *[_type == "category"] | order(title asc) {
    _id,
    title,
    slug
  }
`;
