import { PortableText } from "@portabletext/react";
import type { PortableTextBlock } from "@portabletext/react";
import Image from "next/image";
import { urlFor } from "@/sanity/image";
import type { SanityImage } from "@/sanity/types";

interface ImageValue extends SanityImage {
  caption?: string;
}

const components = {
  types: {
    image: ({ value }: { value: ImageValue }) => {
      if (!value?.asset) return null;
      return (
        <figure className="my-10">
          <div className="relative w-full aspect-video overflow-hidden">
            <Image
              src={urlFor(value).width(900).url()}
              alt={value.alt ?? "Article image"}
              fill
              className="object-cover"
              sizes="(max-width: 900px) 100vw, 900px"
            />
          </div>
          {value.caption && (
            <figcaption className="text-center text-sm text-taupe mt-3">
              {value.caption}
            </figcaption>
          )}
        </figure>
      );
    },
  },
  block: {
    normal: ({ children }: { children?: React.ReactNode }) => (
      <p className="text-base font-light text-charcoal leading-relaxed mb-5">
        {children}
      </p>
    ),
    h2: ({ children }: { children?: React.ReactNode }) => (
      <h2 className="font-serif text-2xl md:text-3xl text-charcoal mt-12 mb-4">
        {children}
      </h2>
    ),
    h3: ({ children }: { children?: React.ReactNode }) => (
      <h3 className="font-serif text-xl md:text-2xl text-charcoal mt-10 mb-3">
        {children}
      </h3>
    ),
    blockquote: ({ children }: { children?: React.ReactNode }) => (
      <blockquote className="border-l-2 border-gold pl-6 my-8 italic font-serif text-lg text-charcoal leading-relaxed">
        {children}
      </blockquote>
    ),
  },
  marks: {
    link: ({
      value,
      children,
    }: {
      value?: { href: string; blank?: boolean };
      children?: React.ReactNode;
    }) => (
      <a
        href={value?.href}
        target={value?.blank ? "_blank" : undefined}
        rel={value?.blank ? "noopener noreferrer" : undefined}
        className="text-gold hover:text-gold-light underline transition-colors"
      >
        {children}
      </a>
    ),
    strong: ({ children }: { children?: React.ReactNode }) => (
      <strong className="font-semibold text-charcoal">{children}</strong>
    ),
    em: ({ children }: { children?: React.ReactNode }) => (
      <em>{children}</em>
    ),
  },
  list: {
    bullet: ({ children }: { children?: React.ReactNode }) => (
      <ul className="list-disc list-outside pl-6 mb-5 space-y-2 text-base font-light text-charcoal leading-relaxed">
        {children}
      </ul>
    ),
    number: ({ children }: { children?: React.ReactNode }) => (
      <ol className="list-decimal list-outside pl-6 mb-5 space-y-2 text-base font-light text-charcoal leading-relaxed">
        {children}
      </ol>
    ),
  },
};

export function PostBody({ body }: { body: PortableTextBlock[] }) {
  return (
    <div className="prose-container">
      <PortableText value={body} components={components} />
    </div>
  );
}
