# COMPONENT_LIBRARY

Reusable, typed React components built on **shadcn/ui** primitives + Tailwind,
following `UI_UX_GUIDELINES.md`. Organized as:
- `components/ui` — shadcn primitives (Button, Input, Accordion, Dialog, …).
- `components/shared` — cross-page building blocks.
- `components/sections` — homepage/page sections composed from shared components.

Conventions: TypeScript props (no `any`), accessible by default, mobile-first,
server components where possible (client only for interactivity). Phase: P0 unless
noted.

---

## Shared Components

### `CTAButton`
Primary conversion button (solid red) used everywhere.
```ts
type CTAButtonProps = {
  href?: string;            // link target (e.g. /trial)
  onClick?: () => void;
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
  fullWidth?: boolean;
  children: React.ReactNode;
};
```
Usage: `<CTAButton href="/trial" size="lg">Book Free Trial</CTAButton>`

### `StickyMobileCTA`
Fixed bottom "Book Free Trial" bar, mobile only, always visible.
```ts
type StickyMobileCTAProps = { label?: string; href?: string };
```

### `Container` / `Section`
Layout wrappers enforcing max-width, gutters, and vertical rhythm.
```ts
type SectionProps = { id?: string; alt?: boolean; children: React.ReactNode }; // alt = charcoal bg
```

### `SectionHeading`
Eyebrow + title + optional subtitle with consistent type scale.
```ts
type SectionHeadingProps = { eyebrow?: string; title: string; subtitle?: string; align?: "left" | "center" };
```

### `LeadForm`
Free-trial / membership enquiry form. Posts to `/api/leads`.
```ts
type LeadFormProps = {
  source: "TRIAL" | "MEMBERSHIP";
  programs?: { slug: string; name: string }[]; // for preferredProgram select
  compact?: boolean;
};
```
Behavior: client zod validation, honeypot field, inline errors, success state,
disabled-while-submitting. Accessible labels + error announcements.

### `ContactForm`
General enquiry; posts to `/api/contact` (source=CONTACT). Same UX patterns.

### `ProgramCard`
Card linking to a program (level/age badge, blurb, CTA).
```ts
type ProgramCardProps = { program: { slug: string; name: string; description: string; level: string; ageGroup: string } };
```

### `CoachCard`
Coach headshot, name, record badge, short bio, certifications.
```ts
type CoachCardProps = { coach: { slug: string; name: string; record?: string; bio: string; headshotUrl: string; certifications: string[] } };
```

### `PricingTable`
Tier comparison with highlighted "most popular" + enquiry CTA (no checkout).
```ts
type PricingTableProps = { tiers: { name: string; price: number; interval: string; features: string[]; isHighlighted?: boolean }[] };
```

### `ScheduleTable`
Filterable schedule. Desktop table; mobile list/accordion. Filters: day, time,
discipline. (Client component for filtering.)
```ts
type ScheduleTableProps = {
  sessions: { id: string; day: string; start: string; end: string; program: { name: string; slug: string; level: string }; coach?: { name: string } }[];
  preview?: boolean; // homepage truncated view
};
```

### `FAQAccordion`
Accessible accordion; also the source for FAQPage JSON-LD.
```ts
type FAQAccordionProps = { items: { question: string; answer: string }[] };
```

### `TestimonialSlider` (P1)
Carousel of written/video testimonials.
```ts
type TestimonialSliderProps = { testimonials: { author: string; quote: string; rating?: number; mediaUrl?: string; isVideo?: boolean }[] };
```

### `MapEmbed`
Google Maps embed + "Get Directions" link.
```ts
type MapEmbedProps = { query: string; lat?: number; lng?: number; zoom?: number };
```

### `JsonLd`
Injects a JSON-LD `<script>` (built via `src/lib/seo.ts`).
```ts
type JsonLdProps = { data: Record<string, unknown> };
```

---

## Layout Components

### `Header`
Sticky global nav + primary `CTAButton`. Mobile drawer.

### `Footer`
NAP, hours, social links, map link, secondary nav, legal.

---

## Section Components (homepage, composed)
Built per the AIDA layout in `research-website.md` §8:

| Component | Composition |
| :--- | :--- |
| `Hero` | Full-width media + H1 + primary CTA (+ optional video, P2). |
| `TrustBanner` | Stats / reviews strip. |
| `WhyUs` | 3-column value props. |
| `ProgramsGrid` | `ProgramCard` grid. |
| `SchedulePreview` | `ScheduleTable preview` + link to full schedule. |
| `CoachesStrip` | `CoachCard` highlights + link to Coaches. |
| `SocialProof` | `TestimonialSlider` (P1) / placeholder (P0). |
| `FinalCTA` | Full-width banner reiterating the trial offer. |

---

## Component Standards
- Props typed; sensible defaults; no `any`.
- Accessible: labels, roles, focus management, keyboard support, AA contrast.
- Server components by default; `"use client"` only for interactivity (forms,
  filters, accordions, sliders).
- Styling via Tailwind tokens; no inline magic values.
- Each component is independently testable; key components covered by tests
  (see `TESTING_PLAN.md`).
