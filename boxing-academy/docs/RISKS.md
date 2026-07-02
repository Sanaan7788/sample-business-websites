# RISKS

Likelihood × Impact: Low / Med / High. Each risk has an owner action / mitigation.
Reviewed at the start of each phase.

---

## Business / Content Risks

| ID | Risk | Likelihood | Impact | Mitigation |
| :--- | :--- | :--- | :--- | :--- |
| RB-1 | **Authentic media not ready** (no real coach/facility photos). Research stresses no stock photography; placeholders hurt trust. | High | High | Seed with tasteful placeholders; flag in `NEXT_STEPS`; gym commissions a shoot before launch. Build is decoupled from final assets. |
| RB-2 | **Content gaps** — pricing, coach records, program details, NAP not finalized. | High | Med | Capture required content checklist early; drive from `src/data/site.ts` + seed so swaps are trivial. |
| RB-3 | **Scope creep from research doc** (Mindbody, Stripe, e-commerce, member app pulled into MVP). | Med | High | ORCHESTRATOR priority order enforced: those are P3 in `BACKLOG.md`. Re-confirm before promoting any to MVP. |
| RB-4 | **Local SEO depends on off-site work** (GBP, reviews, NAP across directories) outside the codebase. | Med | Med | Document GBP/NAP tasks in `SEO_STRATEGY.md`; provide schema + review widget hooks. |
| RB-5 | **Single-city assumption** wrong (multi-location needed sooner). | Low | Med | Schema/components allow location pages (P2) without rework. |

## Technical Risks

| ID | Risk | Likelihood | Impact | Mitigation |
| :--- | :--- | :--- | :--- | :--- |
| RT-1 | **Lead-form spam** (public POST). | High | Med | Honeypot + rate limiting (P0); add CAPTCHA only if abuse appears. |
| RT-2 | **Email deliverability** (Resend domain/SPF/DKIM not set → leads silently lost). | Med | High | Verify sending domain; lead persists in DB even if email fails; log + alert on email errors. |
| RT-3 | **Performance regression** from media (hero video, galleries) breaking CWV. | Med | High | `next/image`, lazy loading, video deferred to P2; Lighthouse budget gate in CI. |
| RT-4 | **Railway/PostgreSQL misconfig** (env, migrations, cold starts). | Med | Med | `.env.example` + `DEPLOYMENT_GUIDE.md`; run migrations + seed in deploy; smoke-test lead flow post-deploy. |
| RT-5 | **Admin auth security** (P1) — weak auth exposes CMS. | Med | High | Hashed passwords, httpOnly secure cookies, `/admin` disallowed in robots, authz on all admin routes. |
| RT-6 | **Accessibility gaps** failing WCAG AA. | Med | Med | A11y built into components; axe/Lighthouse checks in CI; manual keyboard pass. |
| RT-7 | **Third-party embed risk** (Maps/Reviews/Instagram) hurting performance or privacy. | Low | Med | Lazy-load embeds; defer non-critical; review CSP. |
| RT-8 | **Schema/booking lock-in** if a real booking provider is added later. | Low | Med | Lead/schedule model kept provider-agnostic (see `DATABASE_SCHEMA.md`). |

## Process Risks

| ID | Risk | Likelihood | Impact | Mitigation |
| :--- | :--- | :--- | :--- | :--- |
| RP-1 | **Session interruption** (context/limits) loses progress. | Med | Med | Small tasks; update `CHANGELOG.md` + `NEXT_STEPS.md` every session; "Continue from NEXT_STEPS.md" resumes. |
| RP-2 | **Docs drift from code.** | Med | Med | Update docs before & after each phase; treat as part of "done". |
| RP-3 | **Conflicting source-doc guidance.** | Low | Med | Resolve via ORCHESTRATOR priority order; record in `DECISIONS.md`. |

---

## Top Risks to Watch (Phase 1)
1. **RB-1 / RB-2** — content & media readiness (highest combined exposure).
2. **RT-2** — email deliverability (lead loss).
3. **RB-3** — scope creep from research doc.
