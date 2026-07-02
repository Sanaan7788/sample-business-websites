# CHANGELOG

Running log of completed work. Most recent first. Update after every working session.

---

## 2026-06-30 — Phase 1, CI + Accessibility + Lighthouse (quality pass)
**Type:** CI/CD + quality gates.

Completed:
- **CI workflow** `.github/workflows/boxing-academy-ci.yml` (repo root, path-scoped
  to `boxing-academy/**`, `working-directory` set; matches the existing deploy.yml
  convention). `test` job: Postgres 16 service → install → migrate+seed → lint →
  typecheck → unit/integration → format check → build → Playwright E2E (uploads
  report). `lighthouse` job (needs test): build → Lighthouse CI.
- **Accessibility tests** (`tests/e2e/accessibility.spec.ts`) — axe on 7 key pages,
  fails on any serious/critical WCAG 2.1 A/AA violation. **These caught real
  issues**, now fixed:
  - Red accent text failed AA contrast → added `--color-accent-text` (#ff4d5a,
    ≥4.5:1 on all dark surfaces) for red *text*; kept #e11d2a for button fills.
    Migrated all `text-accent` → `text-accent-text`; link hovers go to white.
  - Inline links distinguished only by color → added underline to in-text links.
  - Low-contrast decorative coach initials → `text-muted`.
- **Lighthouse CI** (`lighthouserc.json`, desktop preset, 7 pages): A11y ≥95 + SEO
  ≥95 as errors, Perf + Best-practices ≥90 as warnings.

**Verified locally**: full suite green — **33 Vitest + 16 Playwright** (9 functional
+ 7 a11y). Lighthouse local run **passed all assertions**; scores: Perf 97–100,
A11y 98–100, SEO 100, Best-practices 100 across all 7 pages (meets NFR-3). `tsc`,
`eslint`, `prettier`, `build` ✓.

Deps added: @axe-core/playwright. Ignored `.lighthouseci`.
Files Created: `.github/workflows/boxing-academy-ci.yml` (repo root),
`boxing-academy/lighthouserc.json`, `tests/e2e/accessibility.spec.ts`.
Files Modified: `globals.css` (+accent-text token), all components/pages using the
accent color, `.gitignore`.

---

## 2026-06-30 — Phase 1, Test Suite (Section 1.6)
**Type:** Testing infrastructure.

Completed:
- Tooling: **Vitest 4** (+ @vitejs/plugin-react, jsdom, native tsconfig paths) for
  unit/integration/component; **Playwright 1.61** (Chromium) for E2E. Configs:
  `vitest.config.ts`, `tests/setup.ts`, `playwright.config.ts`. Scripts: `test`,
  `test:watch`, `test:e2e`.
- **Unit (24)**: `validation` (lead/contact schemas, honeypot, trim, fieldErrors),
  `seo` (HealthClub + FAQPage builders), `rate-limit` (limit/reset/isolation).
- **Component (4)**: `LeadForm` — renders fields + program options, blocks invalid
  submit, posts + success state, surfaces server error (fetch mocked).
- **Integration (9)**: `/api/leads` + `/api/contact` — 201/422/400/429/500 +
  honeypot + CONTACT source (service mocked, no DB/email).
- **E2E (9, Playwright)**: book-trial happy path (route-intercepted, no DB write),
  empty-submit validation, header CTA nav; primary nav resolves; programs/pricing
  render seeded data; FAQ accordion; schedule renders + day filter narrows results.

**Verified**: `npm test` → **33 passed** (6 files); `npx playwright test` →
**9 passed**. `tsc` ✓, `eslint` ✓, `prettier` ✓, `next build` ✓. Added
test-results/playwright-report/coverage to git + prettier ignores.

Files Created: `vitest.config.ts`, `playwright.config.ts`, `tests/setup.ts`,
`tests/unit/{validation,seo,rate-limit,lead-form}.test.ts(x)`,
`tests/integration/{leads,contact}-route.test.ts`,
`tests/e2e/{book-trial,navigation,schedule}.spec.ts`.

---

## 2026-06-30 — Phase 1, Contact + FAQ + Home AIDA + SEO baseline (completes P0)
**Type:** Implementation (remaining Phase 1 pages + SEO).

Completed:
- **Contact**: `MapEmbed` (keyless Google Maps iframe + directions), `ContactForm`
  + `POST /api/contact` (reuses `contactSchema` + `leadService`, source=CONTACT),
  `/contact` page (NAP + hours + map + form).
- **FAQ**: `src/data/faq.ts`, accessible `FAQAccordion` (native `<details>`),
  `/faq` page with FAQPage JSON-LD.
- **Home AIDA**: `Hero`, `TrustBanner`, `WhyUs`, `FinalCTA` (static sections) +
  DB-driven Programs/Schedule-preview/Coaches; full home replaces the placeholder.
- **SEO baseline (1.5)**: `src/lib/seo.ts` (HealthClub + FAQPage builders),
  `JsonLd` component, HealthClub injected site-wide via root layout, FAQPage on
  /faq, `sitemap.ts` (9 URLs), `robots.ts` (disallow /admin + /api).
- **States (1.1.2)**: `not-found.tsx`, `error.tsx`.

**Verified** (live + build): all pages 200 with content; HealthClub JSON-LD on
every page; FAQPage on /faq; home renders all AIDA sections from DB; sitemap.xml
(9 urls) + robots.txt correct; `POST /api/contact` → 201 (test lead cleaned up);
`tsc` ✓, `eslint` ✓, `prettier` ✓, `next build` ✓ — **16 routes** (pages static,
APIs dynamic, sitemap/robots generated).

This **completes Phase 1 (MVP) P0 scope**: marketing site + lead funnel + contact +
FAQ + SEO baseline, all mobile-first with the dark/red design system.

Files Created: `src/components/shared/{map-embed,contact-form,faq-accordion,json-ld}.tsx`,
`src/components/sections/home-sections.tsx`, `src/lib/seo.ts`, `src/data/faq.ts`,
`src/app/{contact,faq}/page.tsx`, `src/app/api/contact/route.ts`,
`src/app/{sitemap.ts,robots.ts,not-found.tsx,error.tsx}`.
Files Modified: `src/app/{layout,page}.tsx`.

Pending for go-live: real content/photos, Resend key + verified domain, Lighthouse/
a11y audit pass, deploy to Railway.

---

## 2026-06-30 — Phase 1, Read-Only Pages (Section 1.4)
**Type:** Implementation (DB-driven marketing pages).

Completed:
- Shared primitives: `Section`, `SectionHeading` (`src/components/shared/section.tsx`).
- `ProgramCard` + `/programs` — grid from `db.program` (level/age/women's badges).
- `ScheduleTable` (client, filter by day + program, mobile list) + `/schedule`
  from `db.classSession` (program + coach joined).
- `PricingTable` (enquiry-only, ADR-001) + `/pricing` from `db.pricingTier`.
- `CoachCard` (initials-avatar fallback when no headshot) + `/coaches` from `db.coach`.
- `/about` — static narrative + values.
- Per-page `metadata` (title/description) on all five.

**Verified**: all pages 200 with seeded content (Group Boxing, 07:30 Monday,
Unlimited Monthly "Most popular", Head Coach, etc.); `tsc` ✓, `eslint` ✓,
`prettier` ✓, `next build` ✓ — programs/schedule/pricing/coaches/about prerendered
static (DB queried at build), `/trial` + `/api/leads` dynamic. 11 routes total.

Nav links now all resolve. Placeholder coach/pricing/extra-program content still
shows pending owner confirmation (BUSINESS_PROFILE.md).

Files Created: `src/components/shared/{section,program-card,schedule-table,pricing-table,coach-card}.tsx`,
`src/app/{programs,schedule,pricing,coaches,about}/page.tsx`.

Next: Contact page + `/api/contact` + Maps embed; FAQ accordion; flesh out Home
AIDA sections (1.4.1); SEO baseline (1.5: sitemap, robots, JSON-LD).

---

## 2026-06-30 — Phase 1, Lead Funnel (Steps 1.0.3 + 1.3 + 1.2.3)
**Type:** Implementation (core conversion funnel — the #1 business KPI).

Completed:
- `src/lib/validation.ts` — shared zod schemas (lead + contact) with honeypot;
  `fieldErrors()` flattener (client + server reuse).
- `src/lib/logger.ts` — structured JSON logger.
- `src/lib/email.ts` — Resend helpers (lead notification + auto-reply). **Stub-safe**:
  with no `RESEND_API_KEY` it logs instead of sending; email failures never throw
  (lead always persists — RT-2).
- `src/lib/rate-limit.ts` — in-memory fixed-window limiter (5/min/IP for the MVP).
- `src/server/leadService.ts` — persists lead, then fires emails via `allSettled`
  (non-blocking).
- `POST /api/leads` route handler — rate-limit → parse → zod validate → honeypot →
  service. Returns 201 / 400 / 422 / 429 / 500 with structured errors + logging.
- `LeadForm` client component — client-side zod, honeypot, submitting/success/error
  states, accessible labels + `role=alert`/`role=status`.
- `/trial` page now a server component: loads active programs from DB → renders
  `LeadForm` with a program select.

**Verified end-to-end** against dev server + Docker Postgres:
- GET /trial → 200, form + seeded program option render.
- POST valid → 201 `{id}`, exactly one `Lead` row (status NEW); logs show
  `lead.created` + two `email.stubbed`.
- POST invalid → 422 with field errors (name, email).
- POST honeypot → 201 silently, **no** DB row; logs `leads.honeypot_tripped`.
- Test leads cleaned up. `tsc` ✓, `eslint` ✓, `prettier` ✓, `next build` ✓
  (`ƒ /api/leads` dynamic; /trial server-rendered).

Deps added: zod, resend.
Files Created: `src/lib/{validation,logger,email,rate-limit}.ts`,
`src/server/leadService.ts`, `src/app/api/leads/route.ts`,
`src/components/shared/lead-form.tsx`. Files Modified: `src/app/trial/page.tsx`.

Next: read-only pages from seeded DB (Programs/Schedule/Pricing/Coaches, Section 1.4),
or `/api/contact` + Contact page. Resend key + verified domain still pending to
actually send mail.

---

## 2026-06-30 — Phase 1, Step 1.0.2 (Data Layer)
**Type:** Implementation (Prisma + PostgreSQL).

Completed:
- Installed Prisma 7.8 (`prisma`, `@prisma/client`, `@prisma/adapter-pg`, `tsx`, `dotenv`).
- `prisma/schema.prisma`: P0 models per `DATABASE_SCHEMA.md` — Lead, Program,
  Coach, ClassSession, PricingTier + enums + indexes.
- `src/lib/db.ts`: Prisma singleton using the **node-postgres driver adapter**
  (Prisma 7 requires an adapter; client generated to `src/generated/prisma`).
- `prisma/seed.ts`: idempotent seed — confirmed content (Group Boxing + Personal
  Training, Mon–Fri 7:30 AM & 6:00 PM) plus `// PLACEHOLDER` programs/coach/pricing.
- Provisioned a **throwaway Docker Postgres** (`cactus-pg`, host port 5433) for
  local dev; `DATABASE_URL` in git-ignored `.env`.
- Ran `prisma migrate dev --name init` (migration `…_init` applied) + `prisma db seed`
  (5 programs, 1 coach, 3 tiers, 10 sessions).
- package.json scripts: `db:migrate`, `db:migrate:deploy`, `db:seed`, `db:studio`,
  `postinstall: prisma generate`, `build: prisma generate && next build`.
- Excluded `src/generated/**` from ESLint + Prettier.
- **Verified:** queried seeded data via the app's `db` client (program+coach join
  returns correct rows); `tsc` ✓, `next build` ✓, `eslint` ✓, `prettier --check` ✓.

New decision recorded: ADR-008 (Prisma 7 driver adapter + generated-client path).

Files Created: `prisma/{schema.prisma,seed.ts,migrations/…}`, `prisma.config.ts`,
`src/lib/db.ts`, `src/generated/prisma/*` (generated, git-ignored), `.env` (git-ignored).
Files Modified: `package.json`, `eslint.config.mjs`, `.prettierignore`, `.gitignore`.

DB note: local data lives in the Docker container `cactus-pg`. Stop/remove with
`docker rm -f cactus-pg`. Re-create + re-seed: `docker run … && npm run db:migrate && npm run db:seed`.

---

## 2026-06-29 — Phase 1, Step 1.0.1 + Global Shell + Business Profile
**Type:** Implementation (scaffold + tooling + layout shell).

Completed:
- Looked up the real business (Cactus Boxing Gym, Houston) from public sources;
  recorded all fields with confidence levels in `docs/BUSINESS_PROFILE.md`
  (unverified items flagged). Mirrored into `src/data/site.ts`.
- Scaffolded Next.js 16 (App Router, TS, Tailwind v4, `src/`, `@/*` alias).
- Tooling: ESLint (clean), Prettier + tailwind plugin (clean), `.env.example`,
  `.gitignore` un-ignores `.env.example`. Added deploy scripts to `package.json`.
- Design tokens (dark + red) in `globals.css` via `@theme`; reduced-motion +
  focus-visible a11y rules. Fonts: Oswald (display) + Inter (body).
- Global shell: `Header` (sticky nav + mobile drawer), `Footer` (NAP/hours/social),
  `StickyMobileCTA`, `CTAButton`, `cn` util. Placeholder Home + `/trial` stub.
- **Verified:** `tsc --noEmit` ✓, `next build` ✓ (Home + /trial prerendered),
  `eslint` ✓, `prettier --check` ✓.

Files Created: `src/data/site.ts`, `src/lib/utils.ts`,
`src/components/shared/{cta-button,sticky-mobile-cta}.tsx`,
`src/components/layout/{header,footer}.tsx`, `src/app/trial/page.tsx`,
`.env.example`, `.prettierrc.json`, `.prettierignore`, `docs/BUSINESS_PROFILE.md`,
plus the Next.js scaffold (config files, `public/`, `node_modules/`).
Files Modified: `src/app/{layout,page}.tsx`, `src/app/globals.css`,
`package.json`, `.gitignore`.

Deps added: prettier, prettier-plugin-tailwindcss, clsx, tailwind-merge.

Not yet done (next): Prisma + PostgreSQL data layer (Step 1.0.2), then pages.

---

## 2026-06-29 — Planning Phase (Phase 0)
**Type:** Documentation / Planning. **No application code written.**

Completed:
- Read and analyzed all source documents: `orchestrator.md`, `master-prompt.md`,
  `research-website.md`, `business-requirements.md`, `design-inspiration.md`.
- Extracted all requirements; discovered and categorized every feature into
  P0–P3 and mapped each to a phase (1–5).
- Resolved 3 key ambiguities with the stakeholder and recorded them as ADRs:
  - ADR-001: Free-trial = lead-capture form (no payments/Mindbody) in MVP.
  - ADR-002: Single Next.js full-stack app (Route Handlers), not split NestJS.
  - ADR-003: DB-backed CMS with protected `/admin` (not external headless CMS).
- Proposed full folder structure and architecture (Next.js + Prisma + PostgreSQL
  on Railway + Resend).

Files Created (18 planning docs under `docs/`):
- PROJECT_OVERVIEW.md, REQUIREMENTS.md, ARCHITECTURE.md, FEATURE_ROADMAP.md,
  PHASE_PLAN.md, IMPLEMENTATION_PLAN.md, UI_UX_GUIDELINES.md, DATABASE_SCHEMA.md,
  API_SPECIFICATION.md, COMPONENT_LIBRARY.md, SEO_STRATEGY.md, RISKS.md,
  DECISIONS.md, BACKLOG.md, TESTING_PLAN.md, DEPLOYMENT_GUIDE.md, CHANGELOG.md,
  NEXT_STEPS.md.

Files Modified: none (greenfield).

Status: **Planning complete — awaiting approval to begin Phase 1 implementation.**
