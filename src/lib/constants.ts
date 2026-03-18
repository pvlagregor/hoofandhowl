export const SITE = {
  name: "Hoof & Howl",
  tagline: "Fine Art Pet Portraiture",
  url: "https://hoofandhowl.com",
  phone: "848-358-7288",
  phoneHref: "tel:+18483587288",
  email: "kristin@hoofandhowl.com",
  owner: "Kristin Chiaramonte",
  location: "New Jersey",
  priceRange: "$1,500–$3,000",
} as const;

export const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Wall Art", href: "/wall-art" },
  { label: "The Experience", href: "/experience" },
  { label: "Blog", href: "/blog" },
] as const;
