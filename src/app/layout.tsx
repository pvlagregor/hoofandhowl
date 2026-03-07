import type { Metadata } from "next";
import { GoogleTagManager } from "@next/third-parties/google";
import { dmSerif, raleway } from "@/lib/fonts";
import { SITE } from "@/lib/constants";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import "./globals.css";

export const metadata: Metadata = {
  title: `${SITE.name} | Luxury Pet Portraiture in New Jersey`,
  description: `Fine art wall portraits of the animals you love. Studio-quality pet photography by ${SITE.owner}, serving all of New Jersey. Sessions from $1,500.`,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "Hoof & Howl Fine Art Pet Portraiture",
    description:
      "Luxury fine art pet portrait photography in New Jersey. Museum-quality wall art of dogs, horses, and all animals.",
    url: SITE.url,
    telephone: "+1-848-358-7288",
    email: SITE.email,
    address: {
      "@type": "PostalAddress",
      addressRegion: "NJ",
      addressCountry: "US",
    },
    areaServed: {
      "@type": "State",
      name: "New Jersey",
    },
    priceRange: "$1500-$3000",
    founder: {
      "@type": "Person",
      name: SITE.owner,
    },
  };

  return (
    <html lang="en" className={`${dmSerif.variable} ${raleway.variable}`}>
      <body className="antialiased">
        {process.env.NEXT_PUBLIC_GTM_ID && (
          <GoogleTagManager gtmId={process.env.NEXT_PUBLIC_GTM_ID} />
        )}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
