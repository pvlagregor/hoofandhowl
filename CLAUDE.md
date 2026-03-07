# Website — Project Instructions

Next.js 16 site for Hoof & Howl Fine Art Pet Portraiture.

## Brand Reference

For brand voice and audience context when writing any copy or UI text:

- `../shared/brand-voice.md` — Complete voice guide and design system
- `../shared/audience.md` — Target audience profile

---

## Tech Stack

- Next.js 16 with App Router
- React 19
- Tailwind CSS v4 (`@theme inline` in globals.css)
- TypeScript

---

## Critical Patterns

### Font Variables on `<html>`, Not `<body>`
Tailwind v4's `@theme` defines CSS vars on `:root` (`<html>`). Next.js font `variable` classes MUST go on `<html>` so the CSS vars resolve at the same level. Putting them on `<body>` causes fonts to silently fall back to generic fallbacks.

### Cache Clearing After Font Changes
Delete `.next/` cache and hard refresh (`Ctrl+Shift+R`) after any font changes. Turbopack caches fonts aggressively on Windows.

### Design Tokens
All colors and font stacks are defined in `src/app/globals.css` via `@theme inline`. Use Tailwind utility classes with these tokens (e.g., `text-charcoal`, `bg-cream`, `text-gold`). Never hardcode hex values in components.

---

## Key Files

- `src/lib/constants.ts` — Site name, contact info, nav links
- `src/lib/fonts.ts` — Font definitions (DM Serif Display + Raleway)
- `src/lib/metadata.ts` — SEO metadata helper
- `src/app/globals.css` — Design tokens, base styles
- `src/app/layout.tsx` — Root layout

---

## Component Conventions

- **Sections:** `src/components/sections/` (Hero, CtaBanner, ValueProps, WhyWallArt, OwnerStory, TestimonialSection)
- **UI primitives:** `src/components/ui/` (Button, Container, Divider, SectionHeading)
- **Animations:** `src/components/animations/` (FadeIn, StaggerChildren)
- **Layout:** `src/components/layout/` (Header, Footer, MobileMenu)
- **Forms:** `src/components/forms/`
- **Gallery:** `src/components/gallery/`

---

## Visual Patterns

- Gold horizontal rules: `w-16 h-px bg-gold` as section dividers
- Uppercase small labels: `font-sans text-sm font-medium uppercase tracking-luxury text-gold`
- Body text: `text-base font-light text-charcoal leading-relaxed`
- Section padding: `py-20 md:py-28`
- Alternating section backgrounds: `bg-cream` / `bg-cream-dark`
- Dark CTA sections: `bg-charcoal` with cream text

---

## Hidden Sections

Legacy Albums section in `wall-art/page.tsx` is currently hidden via conditional at line 97 (`if (index === 3) return null`). To restore: remove that check.

---

## Commands

- `npm run dev` — Start dev server
- `npm run build` — Production build
- `npm run lint` — ESLint
