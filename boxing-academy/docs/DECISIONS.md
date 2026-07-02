# DECISIONS (ADR Log)

Architecture Decision Records. Format: Context → Decision → Consequences. Conflicts
between source documents are resolved per `ORCHESTRATOR.md` priority order:
`business-requirements.md` > `master-prompt.md` > `design-inspiration.md` > `research-website.md`.

---

## ADR-001 — Free-trial booking is a lead-capture form (no payments/Mindbody) for MVP
**Status:** Accepted (confirmed with stakeholder).
**Context:** `business-requirements.md` lists "Book Free Trial" as the #1 action but
explicitly names "no complex payment system" and "no member portal" as non-goals.
`research-website.md` recommends Mindbody/Glofox + Stripe. Priority order favors
business requirements.
**Decision:** "Book Free Trial" and "Become a Member" submit a **lead-capture form**
→ persisted to PostgreSQL → email to gym + auto-reply to lead (Resend). No real-time
calendar, no payment in MVP.
**Consequences:** Fastest path to the core KPI (lead generation); no SaaS cost/lock-in;
no PCI scope. Real booking/billing is deferred to P3 (`BACKLOG.md`). Schedule/lead
model kept provider-agnostic so a booking provider can be added without re-architecting.

## ADR-002 — Single Next.js full-stack app (Route Handlers) over a split NestJS backend
**Status:** Accepted (confirmed).
**Context:** `master-prompt.md` defaults to Next.js frontend + Node/Express or NestJS
backend. The MVP is a marketing site + small lead API + (later) CMS.
**Decision:** One Next.js (App Router) app: SSG/ISR pages + Route Handlers for the API.
No separate backend service. Business logic isolated in `src/server/*`, infra in
`src/lib/*` to preserve clean layering.
**Consequences:** One deployable, one pipeline, less boilerplate, shared types
client↔server. Honors the stack's intent while avoiding two-service overhead. If the
API outgrows this (P4/P5 commerce/booking), services can be extracted later.

## ADR-003 — DB-backed CMS with protected `/admin` over an external headless CMS
**Status:** Accepted (confirmed).
**Context:** `business-requirements.md` requires "CMS for content management." Options:
DB-backed admin, hosted headless CMS (Sanity/Payload), or MDX/config files.
**Decision:** Content (programs, schedule, coaches, pricing, testimonials, blog,
leads) lives in PostgreSQL via Prisma, edited through an auth-protected `/admin` CRUD
(Phase 2). MVP renders from DB + seed.
**Consequences:** Owned content, no external SaaS cost/lock-in, unified data model and
auth. More admin UI to build (deferred to P1) — acceptable given the lean MVP.

## ADR-004 — PostgreSQL + Prisma on Railway
**Status:** Accepted.
**Context:** `master-prompt.md` sets Railway + PostgreSQL as defaults; do not default
to Vercel/Supabase.
**Decision:** PostgreSQL on Railway, accessed via Prisma; deploy the Next.js app to
Railway. Provide `.env.example` + Railway config.
**Consequences:** Type-safe data access + migrations; single platform for app + DB.
SSR/ISR runs on a Node server (not edge) — fine for this workload.

## ADR-005 — Resend for transactional email
**Status:** Accepted.
**Context:** Lead funnel needs gym notification + lead auto-reply; master-prompt names
Resend "if required."
**Decision:** Use Resend for transactional email; helpers in `src/lib/email.ts`.
**Consequences:** Simple API; requires verified sending domain (SPF/DKIM). Email
failures are logged and **never block** lead persistence (see `RISKS.md` RT-2).

## ADR-006 — Tailwind + shadcn/ui for the design system
**Status:** Accepted.
**Context:** master-prompt names Tailwind + shadcn/ui; design wants a premium dark/red
athletic look.
**Decision:** Tailwind tokens (dark + red) + shadcn/ui primitives; condensed display
font + readable body; subtle 150–250ms motion (`UI_UX_GUIDELINES.md`).
**Consequences:** Fast, consistent, accessible UI; easy theming via tokens.

## ADR-008 — Prisma 7 driver adapter + generated-client path
**Status:** Accepted.
**Context:** Prisma 7 (7.8) changed defaults vs. v6: the `prisma-client` generator
outputs to a path (`src/generated/prisma`) instead of `node_modules`, and the
client **requires a driver adapter** (no implicit `DATABASE_URL` connection).
**Decision:** Use `@prisma/adapter-pg` (node-postgres). `src/lib/db.ts` constructs
`new PrismaClient({ adapter: new PrismaPg({ connectionString: DATABASE_URL }) })`.
Generated client lives in `src/generated/prisma` (git-ignored; regenerated via
`postinstall`/`build`) and is excluded from lint/format. Seed loads `dotenv/config`.
**Consequences:** Slightly more setup than v6, but adapter-based access is the
supported Prisma 7 path and works the same locally and on Railway. `DEPLOYMENT_GUIDE.md`
build/start steps already run `prisma generate` + `migrate deploy`, so no deploy change.

## ADR-007 — Produce the union of both required-docs lists (18 files)
**Status:** Accepted.
**Context:** ORCHESTRATOR's "Required Initial Output" and master-prompt's
"Automatic Documentation" lists differ slightly.
**Decision:** Generate the **union** so nothing is omitted (adds `TESTING_PLAN.md`,
`DEPLOYMENT_GUIDE.md`, `CHANGELOG.md` beyond the 15 named in the task).
**Consequences:** Complete planning coverage; minor extra upkeep.

---

## Decision Log Index
| ADR | Decision | Status |
| :--- | :--- | :--- |
| 001 | Lead-capture form (no payments) | Accepted |
| 002 | Single Next.js app | Accepted |
| 003 | DB-backed CMS + `/admin` | Accepted |
| 004 | PostgreSQL + Prisma on Railway | Accepted |
| 005 | Resend email | Accepted |
| 006 | Tailwind + shadcn/ui design system | Accepted |
| 007 | Union of doc lists (18 files) | Accepted |
| 008 | Prisma 7 driver adapter + generated-client path | Accepted |
