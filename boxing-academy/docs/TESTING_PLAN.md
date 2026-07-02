# TESTING_PLAN

Pragmatic testing pyramid scaled to the MVP: most coverage on the **lead funnel**
(the core KPI) and validation, with E2E on the critical conversion path. Phase
labels: P0 = MVP must-have, P1 = added with CMS/Growth.

Tooling: **Vitest** (unit/integration), **React Testing Library** (components),
**Playwright** (E2E), **axe** + **Lighthouse CI** (a11y/perf budgets).

> **Status (2026-06-30):** Vitest + Playwright + axe + Lighthouse CI all set up
> and green — **33 Vitest** (unit: validation/seo/rate-limit; component: LeadForm;
> integration: leads/contact routes) + **16 Playwright** (9 functional + 7 axe a11y
> on key pages). **Lighthouse** (desktop, 7 pages) passes: Perf 97–100, A11y 98–100,
> SEO 100, BP 100. **CI** wired: `.github/workflows/boxing-academy-ci.yml`
> (lint→typecheck→unit/integration→build→E2E + a separate Lighthouse job, Postgres
> service). Run locally: `npm test`, `npm run test:e2e`, `npx @lhci/cli autorun`.
> Still TODO: contact-form component test; visual regression (optional).

---

## 1. Unit Tests (P0)
- **Validation schemas** (`src/lib/validation.ts`): lead/contact zod schemas —
  valid/invalid email, missing required fields, message length, honeypot.
- **Utils** (`src/lib/utils.ts`): formatting, slug helpers, schedule sorting/filtering.
- **SEO builders** (`src/lib/seo.ts`): LocalBusiness/HealthClub + FAQPage objects
  contain required fields.

## 2. Component Tests (P0/P1)
- `LeadForm` / `ContactForm`: renders fields, shows inline validation errors,
  disables on submit, shows success state (mock fetch).
- `ScheduleTable`: filters by day/time/discipline; mobile list rendering.
- `FAQAccordion`: expand/collapse, keyboard operable, ARIA correct.
- `PricingTable`, `ProgramCard`, `CoachCard`: render given data; highlighted tier.

## 3. Integration Tests (P0)
- `POST /api/leads`: valid → creates `Lead` row + triggers email (mocked Resend);
  invalid → `422` with field errors; honeypot filled → rejected; rate limit → `429`.
- `POST /api/contact`: persists Lead(source=CONTACT) + emails gym.
- `GET /api/schedule`: returns sessions; respects filters.
- Email failure path: lead still persists; error logged (RT-2).
- (P1) Admin CRUD: authz enforced; create/update/delete round-trips; lead status patch.

Use a disposable test PostgreSQL (or transaction rollback per test).

## 4. End-to-End Tests — Playwright (P0)
Critical flows:
- **Book Free Trial (happy path):** Home → CTA → Trial → fill form → submit →
  success message. (Most important test.)
- **Navigation:** header/footer links resolve; mobile drawer + sticky CTA visible.
- **Schedule:** open Schedule, apply a filter, see filtered results.
- **Contact:** map present, form submits.
- (P1) Blog renders; admin login gates `/admin`.

## 5. Accessibility Tests (P0)
- axe checks on key pages (Home, Trial, Schedule, Contact, FAQ) — no critical violations.
- Manual keyboard pass: tab order, focus visible, forms operable, accordion/slider.
- Verify color contrast (red-on-dark CTAs, muted text) meets AA.
- Respect `prefers-reduced-motion`.

## 6. Performance Budgets (P0)
- Lighthouse CI thresholds (mobile): Performance ≥ 90, Accessibility ≥ 95, SEO ≥ 95.
- Core Web Vitals: LCP, CLS, INP within "good" thresholds.
- Fail CI if budgets regress.

## 7. CI Gates
- On PR: typecheck + lint + unit/integration + component tests.
- On main / pre-deploy: E2E (Playwright) + Lighthouse CI + axe.
- Block merge/deploy on failure.

## 8. Test Data
- Reuse `prisma/seed.ts` content for deterministic E2E.
- Mock Resend in unit/integration; never send real email in tests.

## 9. Definition of Done (per feature)
- Unit/component tests for new logic/components.
- Integration test for any new API route.
- E2E updated if a critical flow changed.
- A11y + perf budgets still green.
- Docs updated (`CHANGELOG.md`, relevant doc).
