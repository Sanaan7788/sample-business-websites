# PHASE_PLAN

Five phases, MVP → Premium. Each phase lists deliverables, dependencies, and exit
criteria. The project is **resumable**: `CHANGELOG.md` and `NEXT_STEPS.md` are
updated after every working session so development can pause/resume at any point.

Status legend: ⬜ not started · 🟨 in progress · ✅ done.

---

## Phase 1 — MVP (Marketing Site + Lead Capture + SEO baseline)  🟨
**Goal:** A fast, premium, mobile-first site that converts local traffic into
free-trial leads.

**Status (2026-06-30):** P0 build essentially complete — all pages (Home AIDA,
About, Programs, Schedule, Pricing, Coaches, Trial, Contact, FAQ), lead +
contact funnels (DB + stub-safe email), and SEO baseline (metadata, sitemap,
robots, HealthClub + FAQPage JSON-LD) are built and build-verified locally.
**Remaining before "done":** real content/photos, Resend key + verified domain,
automated tests (TESTING_PLAN), Lighthouse/a11y audit, and Railway deploy.

**Deliverables**
- Project scaffold: Next.js + TS + Tailwind + shadcn/ui + Prisma + PostgreSQL.
- Design system (dark + red), global layout (header/footer), sticky mobile CTA.
- Pages: Home (AIDA), About, Programs, Schedule, Pricing, Coaches, Trial, Contact, FAQ.
- Free-trial **lead-capture form** → DB + Resend (notify + auto-reply), validation, spam guard.
- Contact form (same pattern).
- DB seed: programs, schedule, coaches, pricing.
- Filterable schedule (DB-sourced) + homepage preview.
- Technical/local SEO baseline: metadata, OG, sitemap, robots, LocalBusiness/HealthClub + FAQPage JSON-LD.
- Google Maps embed, click-to-call, Get Directions.
- Deploy to Railway with PostgreSQL.

**Dependencies:** content from gym (copy, pricing, coach records, imagery) — see `RISKS.md`.
**Exit criteria:** Lighthouse Perf ≥ 90 / A11y ≥ 95 / SEO ≥ 95; lead submit creates DB row + sends both emails; Rich Results valid; deployed and reachable.

---

## Phase 2 — Growth (CMS + Content + Social Proof)  ⬜
**Goal:** Make content editable and amplify trust + organic reach.

**Deliverables**
- DB-backed CMS: protected `/admin` with auth.
- Admin CRUD: programs, schedule, coaches, pricing, testimonials, blog, lead review/status.
- Blog / Learn Hub (DB posts) + Article JSON-LD.
- Testimonials (written + video) + before/after success galleries.
- Google Reviews widget.
- SEO landing pages: Youth Boxing, Women's-Only, Personal Training.
- Lead-magnet (free PDF) capture + nurture hook.
- Per-program detail pages; personal-training enquiry routing.

**Dependencies:** Phase 1 schema + services; admin auth.
**Exit criteria:** Non-dev can edit all content via `/admin`; blog publishes without redeploy; reviews/testimonials live; landing pages indexed.

---

## Phase 3 — Operational (Media + Reach + Insight)  ⬜
**Goal:** Richer media, broader local reach, basic operational insight.

**Deliverables**
- Lazy-loaded authentic photo gallery; hero background video; Instagram embed.
- Statistical trust counters; press/partner logos.
- Multi-location / location landing pages; Event JSON-LD for seminars.
- Glossary / educational hub.
- Student/first-responder discount display.
- Admin analytics dashboard (lead counts, sources, conversion).
- Exit-intent / popup lead capture.

**Dependencies:** Phase 2 CMS + lead data.
**Exit criteria:** Media performant (no CWV regression); analytics visible in admin; location/event pages live.

---

## Phase 4 — Advanced (Commerce & Gated Content)  ⬜
**Goal:** Secondary revenue streams. (Non-goals from MVP, now in scope.)

**Deliverables**
- E-commerce store (merch, gloves, wraps) with inventory + Stripe.
- Gated digital / on-demand (VOD) training library.

**Dependencies:** Stripe/payment integration; storage/CDN for media.
**Exit criteria:** Secure checkout; gated content access control.

---

## Phase 5 — Premium (Membership Platform)  ⬜
**Goal:** Full member experience and real booking/billing.

**Deliverables**
- Members-only portal / proprietary mobile app (progress, community, membership mgmt).
- Real booking + capacity management + recurring billing (Mindbody/Glofox/Stripe).
- Clinical / recovery service scheduling (BXR-style).

**Dependencies:** Auth/identity, payment + booking provider, member data model.
**Exit criteria:** Members can book/pay/manage; recovery services schedulable.

---

## Phasing Rules
- Every feature in `FEATURE_ROADMAP.md` maps to exactly one phase.
- Phases ship incrementally; **wait for approval** between major steps.
- Documentation is updated **before and after** each phase's work.
