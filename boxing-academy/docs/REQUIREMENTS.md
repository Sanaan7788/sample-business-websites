# REQUIREMENTS

Requirements use traceable IDs: **FR-x** (functional), **NFR-x** (non-functional),
**NG-x** (non-goal). Each maps to features in `FEATURE_ROADMAP.md` and a priority
(P0–P3). Conflicts between source docs are resolved per `ORCHESTRATOR.md` priority:
`business-requirements.md` > `master-prompt.md` > `design-inspiration.md` > `research-website.md`.

---

## 1. Functional Requirements

### 1.1 Marketing Site & Navigation
| ID | Requirement | Priority |
| :--- | :--- | :--- |
| FR-1 | Public pages: Home, About, Programs, Schedule, Pricing, Coaches, Trial, Contact, FAQ. | P0 |
| FR-2 | Persistent global header navigation + comprehensive footer (NAP, hours, social, map link). | P0 |
| FR-3 | Home page follows AIDA layout (Hero → Trust → Why Us → Programs → Schedule preview → Coaches → Social proof → Final CTA → Footer). | P0 |
| FR-4 | Persistent sticky mobile "Book Free Trial" CTA anchored to viewport bottom. | P0 |
| FR-5 | Click-to-call phone link and "Get Directions" Google Maps link/embed. | P0 |

### 1.2 Lead Capture & Free Trial (primary conversion)
| ID | Requirement | Priority |
| :--- | :--- | :--- |
| FR-6 | Free-trial booking is a **lead-capture form** (name, email, phone, preferred program, optional message). | P0 |
| FR-7 | On submit, persist the lead to PostgreSQL. | P0 |
| FR-8 | On submit, send a notification email to the gym + an auto-reply to the lead (Resend). | P0 |
| FR-9 | Form is validated (client + server, zod), with inline errors and a clear success state. | P0 |
| FR-10 | Form has spam protection (honeypot + basic rate limiting). | P0 |
| FR-11 | General contact form on the Contact page (same persistence + email pattern). | P0 |

### 1.3 Programs & Schedule
| ID | Requirement | Priority |
| :--- | :--- | :--- |
| FR-12 | Programs taxonomy with categorized offerings (Beginner Fundamentals, Advanced/Sparring, Youth, Women's, Strength & Conditioning). | P0 |
| FR-13 | Dynamic class schedule, filterable by day, time, and discipline; collapses to list/accordion on mobile. | P0 |
| FR-14 | Schedule data sourced from the database (no static PDF/image). | P0 |
| FR-15 | Truncated schedule preview on the homepage. | P0 |

### 1.4 Pricing & Membership
| ID | Requirement | Priority |
| :--- | :--- | :--- |
| FR-16 | Transparent pricing/membership tiers with visual comparison and clear cancellation note. | P0 |
| FR-17 | "Become a Member" routes to pricing + enquiry (lead form), not online payment. | P0 |

### 1.5 Trust & Social Proof
| ID | Requirement | Priority |
| :--- | :--- | :--- |
| FR-18 | Coaches page: bios, professional records, certifications, headshots. | P0 |
| FR-19 | Testimonials + success-story galleries. | P1 |
| FR-20 | Google Reviews integration/widget. | P1 |
| FR-21 | Statistical trust counters (e.g. fighters trained, years active). | P2 |

### 1.6 Content Management
| ID | Requirement | Priority |
| :--- | :--- | :--- |
| FR-22 | DB-backed CMS with a protected `/admin` area for CRUD of programs, schedule, coaches, pricing, testimonials, blog posts, and lead review. | P1 |
| FR-23 | Blog / "Learn Hub" with DB-backed posts. | P1 |

### 1.7 SEO & Discoverability
| ID | Requirement | Priority |
| :--- | :--- | :--- |
| FR-24 | Per-page metadata, Open Graph/Twitter cards, canonical URLs. | P0 |
| FR-25 | `sitemap.xml` and `robots.txt`. | P0 |
| FR-26 | JSON-LD: LocalBusiness→HealthClub on home/contact; FAQPage on FAQ. | P0 |
| FR-27 | JSON-LD: Article on blog posts; Event for seminars/fight nights. | P1/P2 |
| FR-28 | Dedicated local SEO landing pages (Youth, Women's, Personal Training). | P1 |
| FR-29 | FAQ section using accordion UI. | P0 |

### 1.8 Media
| ID | Requirement | Priority |
| :--- | :--- | :--- |
| FR-30 | Image gallery with lazy loading; authentic (non-stock) imagery. | P2 |
| FR-31 | Hero background video loop. | P2 |
| FR-32 | Instagram feed embed. | P2 |

---

## 2. Non-Functional Requirements

| ID | Requirement | Priority |
| :--- | :--- | :--- |
| NFR-1 | **Mobile-first**, fully responsive across breakpoints. | P0 |
| NFR-2 | **Accessibility**: WCAG 2.1 AA; ≥44×44px touch targets; keyboard nav; visible focus; semantic HTML; alt text. | P0 |
| NFR-3 | **Performance**: pass Core Web Vitals on mobile; Lighthouse Perf ≥ 90. Use SSG/ISR, image optimization, lazy loading. | P0 |
| NFR-4 | **Type safety**: TypeScript end to end; zod-validated boundaries. | P0 |
| NFR-5 | **Code quality**: Clean Architecture, SOLID, DRY, KISS, separation of concerns, reusable components/hooks/services. | P0 |
| NFR-6 | **Security**: input validation, rate limiting, secrets via env, hashed admin passwords, security headers. | P0 |
| NFR-7 | **Maintainability/scalability**: modular folder structure; documentation kept in sync with code. | P0 |
| NFR-8 | **Observability**: structured logging + error handling on API routes. | P1 |
| NFR-9 | **Design system**: dark theme + red accent, condensed display + readable body type, subtle 150–250ms ease-in-out motion. | P0 |
| NFR-10 | **Deployability**: runs on Railway with PostgreSQL; `.env.example` provided; reproducible build. | P0 |
| NFR-11 | **Resumability**: work split into small tasks; `CHANGELOG.md` + `NEXT_STEPS.md` kept current. | P0 |
| NFR-12 | **Testing**: unit, integration, and E2E coverage where appropriate. | P1 |

---

## 3. Non-Goals (MVP) — parked as P3 in `BACKLOG.md`

| ID | Non-goal (per business-requirements.md) |
| :--- | :--- |
| NG-1 | No merchandise / e-commerce store initially. |
| NG-2 | No online / on-demand classes initially. |
| NG-3 | No member portal initially. |
| NG-4 | No complex payment system initially (no Stripe/Mindbody booking+billing in MVP). |

> The research document's recommendations to integrate Mindbody/Glofox booking
> APIs, Stripe checkout, e-commerce, and a member app are **deliberately
> deferred** under these non-goals. The schedule/lead model is designed so a real
> booking provider can be added later without re-architecting pages.

---

## 4. Assumptions

- A single primary location/city for the MVP (multi-location is P2).
- The gym will supply authentic photography, coach records, program details, and
  pricing before launch (tracked as a risk in `RISKS.md`).
- Google Business Profile exists or will be created for local SEO/NAP consistency.
