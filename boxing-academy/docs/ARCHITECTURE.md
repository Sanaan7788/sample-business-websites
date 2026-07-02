# ARCHITECTURE

## 1. Overview

A **single Next.js (App Router) full-stack application** deployed on **Railway**
with **PostgreSQL** (Prisma ORM). Marketing pages are statically generated (SSG)
or incrementally revalidated (ISR) for speed and SEO; a small set of **Route
Handlers** provides the API surface (lead capture, contact, and — in Phase 2 —
admin CMS CRUD and blog). Transactional email is sent via **Resend**.

This is intentionally **one deployable unit**, not a split frontend/backend. See
`DECISIONS.md` (ADR-002) for the rationale.

## 2. System Diagram

```txt
                         ┌──────────────────────────────────────────┐
                         │                Visitor                   │
                         │        (mobile-first browser)            │
                         └───────────────┬──────────────────────────┘
                                         │ HTTPS
                                         ▼
        ┌───────────────────────────────────────────────────────────────┐
        │                 Next.js App (App Router) — Railway             │
        │                                                                │
        │   ┌─────────────────────────┐    ┌──────────────────────────┐  │
        │   │  (marketing) routes      │    │  /api Route Handlers     │  │
        │   │  SSG / ISR pages         │    │  POST /api/leads         │  │
        │   │  Home, Programs, Pricing │    │  POST /api/contact       │  │
        │   │  Schedule, Coaches, FAQ  │    │  GET  /api/schedule      │  │
        │   │  About, Trial, Contact   │    │  (P2) /api/admin/* /blog │  │
        │   └─────────────┬───────────┘    └────────────┬─────────────┘  │
        │                 │  server components / services             │  │
        │                 ▼                              ▼              │
        │            ┌────────────────────────────────────────────┐   │
        │            │  src/server/* services + src/lib/* (db,     │   │
        │            │  email, seo, validation, logging)           │   │
        │            └───────┬───────────────────────┬─────────────┘   │
        └────────────────────┼───────────────────────┼─────────────────┘
                             │ Prisma                 │ Resend SDK
                             ▼                        ▼
                   ┌───────────────────┐     ┌──────────────────┐
                   │  PostgreSQL       │     │  Resend (email)  │
                   │  (Railway)        │     │  notify + reply  │
                   └───────────────────┘     └──────────────────┘

   External (client-side embeds): Google Maps embed, Google Reviews widget,
   (P2) Instagram feed.
```

## 3. Lead-Capture Data Flow (primary funnel)

```txt
1. Visitor taps "Book Free Trial" (header CTA / sticky mobile CTA / hero / page).
2. Lead form (client component) → client-side zod validation.
3. POST /api/leads  ─ honeypot + rate-limit check
                    ─ server-side zod validation
                    ─ leadService.create() → Prisma → INSERT Lead
                    ─ emailService.sendLeadNotification() (to gym)
                    ─ emailService.sendLeadAutoReply()    (to lead)
4. Structured JSON response → UI shows success state.
5. (Phase 2) Lead appears in /admin for follow-up; status tracked.
```

Failure handling: validation errors return `422` with field details; email
failures are logged but do **not** block lead persistence (the lead is the
asset). All write handlers log structured events.

## 4. Layering (Clean Architecture / separation of concerns)

| Layer | Location | Responsibility |
| :--- | :--- | :--- |
| Presentation | `src/app/(marketing)`, `src/components` | Pages, sections, UI; no business logic. |
| API boundary | `src/app/api/*/route.ts` | HTTP, validation, auth, status codes, logging. |
| Domain/services | `src/server/*` | Business logic (leads, content, blog). Framework-agnostic. |
| Infrastructure | `src/lib/*` | Prisma client, Resend client, SEO/JSON-LD builders, utils. |
| Data | `prisma/schema.prisma` | Schema + migrations. |

Validation schemas (zod) are shared between client and server to keep types and
rules DRY.

## 5. Integrations

| Integration | Use | Phase |
| :--- | :--- | :--- |
| **Resend** | Lead notification + auto-reply, contact emails. | P0 |
| **Google Maps** | Embed + "Get Directions" link on Contact/footer. | P0 |
| **Google Business Profile** | NAP consistency, local SEO (external). | P0 |
| **Google Reviews widget** | Social proof on home/testimonials. | P1 |
| **Instagram Graph/embed** | Media feed. | P2 |
| Booking/payment SaaS (Mindbody/Glofox/Stripe) | Deferred (see `BACKLOG.md`). | P3 |

## 6. Folder Structure

```txt
boxing-academy/
├── docs/                       # planning docs (this phase)
├── prisma/
│   ├── schema.prisma
│   └── seed.ts                 # seed programs/coaches/pricing/schedule
├── public/                     # images, og images, favicon, robots assets
├── src/
│   ├── app/
│   │   ├── (marketing)/        # home, about, programs, schedule, pricing,
│   │   │                       #   coaches, trial, testimonials, gallery,
│   │   │                       #   blog, contact, faq
│   │   ├── admin/              # protected CMS (Phase 2)
│   │   ├── api/                # route handlers (leads, contact, schedule,
│   │   │                       #   admin/*, blog)
│   │   ├── layout.tsx          # root layout, fonts, header/footer, JSON-LD
│   │   ├── sitemap.ts
│   │   └── robots.ts
│   ├── components/
│   │   ├── ui/                 # shadcn primitives
│   │   ├── sections/           # Hero, WhyUs, ProgramsGrid, SchedulePreview,
│   │   │                       #   CoachesStrip, SocialProof, FinalCTA
│   │   └── shared/             # CTAButton, StickyMobileCTA, LeadForm,
│   │                           #   ScheduleTable, PricingTable, FAQAccordion,
│   │                           #   CoachCard, ProgramCard, TestimonialSlider
│   ├── lib/                    # db.ts, email.ts, seo.ts, logger.ts, utils.ts
│   ├── server/                 # leadService, contentService, blogService
│   ├── data/                   # seed content / constants (site config, NAP)
│   └── styles/                 # globals.css, theme tokens
├── tests/                      # unit, integration, e2e (Playwright)
├── .env.example
├── railway.json                # (or Dockerfile if beneficial)
├── tailwind.config.ts
├── tsconfig.json
├── next.config.ts
└── package.json
```

## 7. Rendering Strategy

| Page | Strategy | Reason |
| :--- | :--- | :--- |
| Home, About, Programs, Pricing, Coaches, FAQ | SSG/ISR | Mostly static, SEO-critical, fast. |
| Schedule | ISR (revalidate) or server render from DB | Reflects DB edits without full rebuild. |
| Blog index/post | ISR | New posts without redeploy. |
| Trial, Contact | Static shell + client form → API | Interactive forms. |
| `/admin` | Dynamic, auth-gated | Editing UI, never indexed. |

## 8. Cross-Cutting Concerns

- **Validation:** zod schemas in `src/lib` shared client/server.
- **Errors:** typed error responses; user-friendly UI messages.
- **Logging:** structured logger in `src/lib/logger.ts` on all API routes.
- **Config/secrets:** `.env` (documented in `.env.example`); never committed.
- **SEO:** centralized metadata + JSON-LD builders in `src/lib/seo.ts`.
- **Accessibility:** enforced via semantic components + lint/test checks.

## 9. Key Design Decisions (summary; full ADRs in `DECISIONS.md`)

- **ADR-001** Booking = lead-capture form (no payments/Mindbody) for MVP.
- **ADR-002** Single Next.js app (Route Handlers) over split NestJS backend.
- **ADR-003** DB-backed CMS with `/admin` over external headless SaaS.
- **ADR-004** PostgreSQL + Prisma on Railway (per master-prompt defaults).
- **ADR-005** Resend for transactional email.
