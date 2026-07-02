# NEXT_STEPS

> Resume instruction: say **"Continue from NEXT_STEPS.md"** and work resumes here.

---

## Current Phase
**Phase 1 — MVP, IN PROGRESS.** Steps 1.0.1 (scaffold + tooling), global layout
shell, and **1.0.2 (data layer)** are done and build-verified. Business identity
recorded in `docs/BUSINESS_PROFILE.md` (Cactus Boxing Gym, Houston).

Done so far: Next.js 16 + TS + Tailwind v4 + ESLint/Prettier; design tokens +
fonts; Header/Footer/StickyMobileCTA/CTAButton; `src/data/site.ts`; placeholder
Home + `/trial`. **Prisma 7 + PostgreSQL**: schema (Lead, Program, ClassSession,
Coach, PricingTier), `src/lib/db.ts` (pg adapter), migration applied + seeded
(5 programs, 1 coach, 3 tiers, 10 sessions) against a local Docker Postgres.
`tsc`, `next build`, `eslint`, `prettier` all green.

### Local DB (dev)
Data is in Docker container **`cactus-pg`** (host port 5433); `DATABASE_URL` in
git-ignored `.env`. If the container is gone, recreate:
`docker run -d --name cactus-pg -e POSTGRES_PASSWORD=postgres -e POSTGRES_USER=postgres -e POSTGRES_DB=cactus_boxing -p 5433:5432 postgres:16`
then `npm run db:migrate && npm run db:seed`.

### Done & verified — Phase 1 P0 build complete
All pages built and DB-driven: Home (full AIDA), About, Programs, Schedule
(filterable), Pricing, Coaches, Trial, Contact (NAP + map + form), FAQ. Lead +
contact funnels (zod + honeypot + rate-limit → DB + stub-safe Resend). SEO
baseline: per-page metadata, HealthClub JSON-LD site-wide, FAQPage on /faq,
sitemap.xml, robots.txt. Error/not-found states. **16 routes**; `tsc`/`lint`/
`prettier`/`build` all green; live smoke-tested.

### Test suite + quality gates — DONE
- **33 Vitest** + **16 Playwright** (9 functional + 7 axe a11y) green.
- **Lighthouse** (7 pages, desktop): Perf 97–100, A11y 98–100, SEO 100, BP 100 —
  meets NFR-3. axe drove real contrast/link fixes (new `--accent-text` token).
- **CI**: `.github/workflows/boxing-academy-ci.yml` (path-scoped to boxing-academy/**)
  runs lint→typecheck→unit/integration→build→E2E + a Lighthouse job, with a Postgres
  service. Runs on PRs/pushes touching the app.

## Exact Next Step — toward go-live
Phase 1 build + tests + CI + quality gates are complete. Remaining = real-world wiring:

1. **Deploy to Railway** (DEPLOYMENT_GUIDE.md) — provision Postgres, set env vars,
   `migrate deploy` + seed, deploy, run the §6 post-deploy smoke test. **Biggest
   next milestone** (gets a live URL). Needs the repo pushed + Railway account.
2. **Email delivery** — add `RESEND_API_KEY` + verify sending domain (RT-2); then
   leads actually email instead of logging.
3. **Real content** — replace placeholders (coach bio/record/headshot, pricing,
   Youth/Women's/Beginner programs, full hours, email) per BUSINESS_PROFILE.md
   once the owner confirms; add authentic photography. Optional: per-page OG images.

Then **Phase 2 (Growth)**: `/admin` CMS, blog, testimonials/reviews, SEO landing
pages (see PHASE_PLAN.md).

Local dev DB: Docker `cactus-pg` (port 5433); recreate cmd + `db:migrate`/`db:seed`
above if gone. Note: nothing has been committed/pushed yet — all work is local.

## Definition of "Phase 1 done"
Per `PHASE_PLAN.md` exit criteria: all P0 pages live; trial form creates a `Lead`
+ sends gym notification + auto-reply; schedule filters from DB; SEO baseline
(metadata, sitemap, robots, LocalBusiness/HealthClub + FAQPage JSON-LD) valid;
Lighthouse Perf ≥ 90 / A11y ≥ 95 / SEO ≥ 95; deployed to Railway.

## Pending Decisions / Inputs Needed (before or during Phase 1)
- **Content & media** from gym: copy, pricing, coach bios + records, program
  details, NAP, and **authentic photography** (no stock). Placeholders used until
  supplied. (See `RISKS.md` RB-1, RB-2.)
- **Target city** for SEO keyword substitution (`SEO_STRATEGY.md`).
- **Resend sending domain** to verify (SPF/DKIM) for deliverability (RT-2).
- Confirm single-location for MVP (multi-location is P2).

## Resume Pointers
- What/why/scope → `PROJECT_OVERVIEW.md`, `REQUIREMENTS.md`
- How it's built → `ARCHITECTURE.md`, `DECISIONS.md`
- What to build & order → `FEATURE_ROADMAP.md`, `PHASE_PLAN.md`, `IMPLEMENTATION_PLAN.md`
- Data/API/UI specs → `DATABASE_SCHEMA.md`, `API_SPECIFICATION.md`,
  `COMPONENT_LIBRARY.md`, `UI_UX_GUIDELINES.md`
- Quality/ship → `TESTING_PLAN.md`, `SEO_STRATEGY.md`, `DEPLOYMENT_GUIDE.md`
- Deferred work → `BACKLOG.md`; progress log → `CHANGELOG.md`

## After Each Future Session, Update
- `CHANGELOG.md` (what was completed)
- `NEXT_STEPS.md` (this file — new "Exact Next Step")
- `PHASE_PLAN.md` + `IMPLEMENTATION_PLAN.md` (checkboxes/status)
