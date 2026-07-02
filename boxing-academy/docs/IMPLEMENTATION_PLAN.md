# IMPLEMENTATION_PLAN

Breakdown: **Phase → Section → Sub-section → Task**. Tasks are small enough that
development can pause and resume at any point. This document details **Phase 1
(MVP)** in full; Phases 2–5 are outlined at section level (expanded when reached).

Checkbox legend: `[ ]` todo · `[~]` in progress · `[x]` done.

---

## Phase 1 — MVP

### 1.0 Section: Project Scaffold & Tooling
- 1.0.1 Foundation
  - [x] Init Next.js (App Router, TS, ESLint) + `src/` structure.
  - [x] Add Tailwind + base config. (shadcn/ui primitives added as needed in 1.2.)
  - [x] Add Prettier + ESLint rules; configure path aliases (`@/*`).
  - [x] Create `.env.example` (DATABASE_URL, RESEND_API_KEY, EMAIL_FROM, GYM_EMAIL, SITE_URL).
- 1.0.2 Data layer
  - [x] Add Prisma 7; configure PostgreSQL datasource (`prisma.config.ts`, `.env`).
  - [x] Define schema (see `DATABASE_SCHEMA.md`): Lead, Program, ClassSession, Coach, PricingTier.
  - [x] First migration (`…_init`); `src/lib/db.ts` (singleton + pg driver adapter, see ADR-008).
  - [x] Write `prisma/seed.ts` (programs, coaches, pricing, schedule) — seeded & verified.
- 1.0.3 Shared libs
  - [x] `src/lib/email.ts` (Resend client + send helpers; stub-safe, non-throwing).
  - [x] `src/lib/logger.ts`; [x] `src/lib/utils.ts` (`cn`); [x] `src/lib/rate-limit.ts`.
  - [x] `src/lib/validation.ts` (shared zod schemas: lead, contact + honeypot).
  - [x] `src/data/site.ts` (NAP, hours, social, phone, map URL) — real Cactus Boxing Gym data.

### 1.1 Section: Design System & Global Shell
- 1.1.1 Tokens & type
  - [x] Tailwind theme: colors (black/charcoal/red) via `@theme` in `globals.css`.
  - [x] Fonts: Oswald (display) + Inter (body); `globals.css`.
  - [x] Motion: `--ease-brand`; reduced-motion + focus-visible a11y rules.
- 1.1.2 Layout
  - [x] Root `layout.tsx`: fonts, metadata defaults, header, footer. (JSON-LD slot in 1.5.)
  - [x] `Header` (nav + primary CTA + mobile drawer), `Footer` (NAP, hours, social, directions).
  - [x] `StickyMobileCTA`.
  - [x] Loading / error / not-found states (`error.tsx`, `not-found.tsx`).

### 1.2 Section: Reusable Components
(See `COMPONENT_LIBRARY.md` for props.)
- 1.2.1 Primitives
  - [ ] `CTAButton`, `SectionHeading`, `Container`.
- 1.2.2 Domain components
  - [x] `ProgramCard`, `CoachCard`, `PricingTable`, `ScheduleTable` (+ filters), `Section`/`SectionHeading`.
  - [x] `FAQAccordion`, `MapEmbed`, `JsonLd`. [ ] `TestimonialSlider` (P2).
- 1.2.3 Forms
  - [x] `LeadForm` (used by Trial + "Become a Member").
  - [x] `ContactForm`.

### 1.3 Section: API (Route Handlers)
(See `API_SPECIFICATION.md`.)
- 1.3.1 Leads
  - [x] `src/server/leadService.ts` (create + email orchestration).
  - [x] `POST /api/leads` (zod validate, honeypot, rate limit, log).
- 1.3.2 Contact
  - [x] `POST /api/contact`.
- 1.3.3 Schedule
  - [x] Schedule server-rendered from DB at ISR (no separate endpoint needed).

### 1.4 Section: Pages
- 1.4.1 Home (AIDA)
  - [x] Hero, Trust banner, Why Us (3 cols), Programs overview, Schedule preview, Meet the Coaches, Final CTA. ([ ] Social proof slider — P2.)
- 1.4.2 Core pages
  - [x] About, Programs, Schedule (filterable), Pricing, Coaches — all DB-driven, metadata added.
- 1.4.3 Conversion pages
  - [x] Trial (dedicated, distraction-free + `LeadForm`, DB-loaded programs).
  - [x] Contact (NAP + Maps embed + `ContactForm`).
  - [x] FAQ (accordion + FAQPage schema).

### 1.5 Section: SEO Baseline
(See `SEO_STRATEGY.md`.)
- 1.5.1 Metadata
  - [x] Per-page `metadata` + OG defaults (layout). ([ ] per-page OG images, canonicals — polish.)
- 1.5.2 Structured data
  - [x] `src/lib/seo.ts` builders: LocalBusiness→HealthClub, FAQPage.
  - [x] Inject JSON-LD: HealthClub site-wide (layout), FAQPage on /faq.
- 1.5.3 Crawl
  - [x] `sitemap.ts`, `robots.ts`.

### 1.6 Section: Testing (Phase-1 scope)
- 1.6.1 Unit
  - [x] Validation schemas, seo builders, rate-limit + `LeadForm` component (Vitest/RTL).
- 1.6.2 Integration
  - [x] `/api/leads` + `/api/contact` (service mocked; status codes + honeypot).
- 1.6.3 E2E (Playwright)
  - [x] Book-free-trial happy path; nav; schedule filter; programs/pricing/FAQ.
- Result: 33 Vitest + 16 Playwright (incl. 7 axe a11y) green.
- 1.6.4 Quality gates
  - [x] axe a11y on 7 pages (drove contrast/link fixes); Lighthouse CI budgets
    (A11y/SEO ≥95 error, Perf/BP ≥90 warn) — local run 97–100 across the board.
  - [x] CI workflow (`.github/workflows/boxing-academy-ci.yml`) runs all of the above.

### 1.7 Section: Deployment
(See `DEPLOYMENT_GUIDE.md`.)
- 1.7.1 Railway
  - [ ] Provision PostgreSQL; set env vars.
  - [ ] Deploy; run migrations + seed; verify lead flow in prod.

---

## Phase 2 — Growth (section outline)
- 2.0 Admin auth + `/admin` shell.
- 2.1 CMS CRUD: programs, schedule, coaches, pricing, testimonials, leads.
- 2.2 Blog + Article JSON-LD.
- 2.3 Testimonials/success galleries + Google Reviews widget.
- 2.4 SEO landing pages (Youth, Women's, Personal Training).
- 2.5 Lead-magnet + nurture hook.

## Phase 3 — Operational (section outline)
- 3.0 Media (gallery, hero video, Instagram).
- 3.1 Trust counters + logos.
- 3.2 Locations + Event schema + glossary.
- 3.3 Admin analytics; exit-intent capture.

## Phase 4 — Advanced (section outline)
- 4.0 E-commerce + inventory + Stripe.
- 4.1 Gated VOD library.

## Phase 5 — Premium (section outline)
- 5.0 Member portal / app.
- 5.1 Real booking + billing.
- 5.2 Recovery scheduling.

---

> After each task/section, update `CHANGELOG.md`, `NEXT_STEPS.md`, and the
> checkboxes here so the project stays resumable.
