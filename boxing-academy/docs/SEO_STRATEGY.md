# SEO_STRATEGY

Goal (per `business-requirements.md`): **dominate local search** for the target
city. Strategy = technical SEO baseline + local SEO + structured data + intent-based
content. Phase labels: P0 = MVP baseline, P1/P2 = Growth/Operational.

---

## 1. Target Keywords

**Primary local (transactional) — optimize service pages (P0):**
- Boxing Gym `<City>`
- Boxing Classes `<City>`
- Beginner Boxing `<City>`
- Kids / Youth Boxing `<City>`
- Personal Boxing Training `<City>`
- "boxing gym near me", "boxing classes near me"

**Secondary / segment (P1 landing pages):**
- Women's Boxing `<City>`, Boxing for Fitness `<City>`, Boxing for Weight Loss `<City>`.

**Informational (top-of-funnel) — drive blog/Learn Hub (P1):**
- how to start boxing, benefits of heavy bag workouts, boxing vs kickboxing,
  what to wear to first boxing class, boxing for beginners.

Map: each primary keyword → one canonical page (Home, Programs, Schedule, Pricing,
Coaches, plus segment landing pages). Avoid cannibalization by giving each intent
a single best target.

---

## 2. Technical SEO (P0)
- **Metadata:** unique `<title>` + meta description per page; templated via Next.js
  `metadata`. Open Graph + Twitter cards; per-page OG images.
- **Canonical URLs** on every page.
- **Sitemap:** dynamic `sitemap.ts` listing all indexable routes (incl. blog/landing in P1).
- **robots.txt:** allow site, disallow `/admin` and API; reference sitemap.
- **Performance = ranking:** pass Core Web Vitals (LCP/CLS/INP) on mobile; SSG/ISR,
  `next/image`, lazy loading, font optimization. Target Lighthouse SEO ≥ 95.
- **Crawlability:** shallow, logical hierarchy; semantic HTML; descriptive internal links.
- **Mobile-first** indexing readiness (already mobile-first per design).

---

## 3. Structured Data (JSON-LD)
Centralized builders in `src/lib/seo.ts`; injected via `<JsonLd>`.

| Schema | Where | Phase |
| :--- | :--- | :--- |
| `LocalBusiness` → **HealthClub** subtype | Home + Contact | P0 |
| `FAQPage` | FAQ page (drives "People Also Ask") | P0 |
| `BreadcrumbList` | nested pages | P1 |
| `Article` | blog posts | P1 |
| `Event` | seminars / fight nights | P2 |

**HealthClub must include:** name, address (NAP), geo coordinates,
`openingHoursSpecification`, `telephone`, `url`, `priceRange` (e.g. `"$$"`),
`image`, `sameAs` (social), and `aggregateRating` when available. Validate with
Google Rich Results Test.

---

## 4. Local SEO
- **NAP consistency:** Name/Address/Phone identical across site, GBP, and
  directories. Single source: `src/data/site.ts`.
- **Google Business Profile (cornerstone):** keep updated with geotagged photos;
  solicit + respond to reviews using local keywords (operational, off-site).
- **Google Reviews widget** on site (P1) for social proof.
- **Location pages (P1/P2):** dedicated pages for adjacent suburbs/areas
  ("Boxing training accessible from `<Suburb>`") to expand radius without
  cannibalizing the main city page.
- **Embedded map** + directions on Contact/footer.

---

## 5. Content Strategy (P1)
- **Blog / Learn Hub** targeting informational keywords; each post = `Article`
  schema, internal links to service pages, clear CTA to the trial.
- **Segment landing pages** (Youth, Women's, Personal Training) optimized for
  their secondary keywords with tailored copy + lead form.
- **Glossary / educational hub (P2)** to capture long-tail terms.

---

## 6. Measurement
- Google Search Console (coverage, queries, CWV) + GBP insights.
- Track: local pack presence, target-keyword rankings, organic sessions,
  trial-form conversions from organic.
- Lighthouse/PSI in CI as a budget gate (see `TESTING_PLAN.md`).

---

## 7. SEO Checklist (per page)
- [ ] Unique title + meta description (intent-matched keyword).
- [ ] Canonical + OG/Twitter tags + OG image.
- [ ] One H1; logical heading order.
- [ ] Descriptive alt text on images.
- [ ] Appropriate JSON-LD present + valid.
- [ ] Internal links to/from related pages.
- [ ] Passes CWV on mobile.
