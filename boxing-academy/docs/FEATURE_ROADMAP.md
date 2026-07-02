# FEATURE_ROADMAP

Complete, no-omission feature list. Every feature discovered across all four
source documents appears here with **exactly one priority** (P0–P3) and **one
phase**. Categories mirror the research doc's "Feature Category Map" (§4).

Legend — Priority: **P0** Critical · **P1** Important · **P2** Nice to Have ·
**P3** Future. Phase: 1 MVP · 2 Growth · 3 Operational · 4 Advanced · 5 Premium.

---

## 1. Core Website Features
| # | Feature | Priority | Phase |
| :--- | :--- | :--- | :--- |
| C1 | Mobile-responsive DOM, mobile-first layout | P0 | 1 |
| C2 | Persistent global navigation (header) | P0 | 1 |
| C3 | Comprehensive footer (NAP, hours, social, map link) | P0 | 1 |
| C4 | Google Maps embed + "Get Directions" | P0 | 1 |
| C5 | Click-to-call phone link | P0 | 1 |
| C6 | Secure contact form (DB + email) | P0 | 1 |
| C7 | FAQ section with accordion UI | P0 | 1 |
| C8 | Sticky mobile "Book Free Trial" CTA | P0 | 1 |
| C9 | 404 / error states, loading states | P0 | 1 |

## 2. Boxing Academy Features
| # | Feature | Priority | Phase |
| :--- | :--- | :--- | :--- |
| B1 | Programs taxonomy (Beginner, Sparring/Advanced, Youth, Women's, S&C) | P0 | 1 |
| B2 | Dynamic class schedule, filterable (day/time/discipline) | P0 | 1 |
| B3 | Mobile schedule collapses to list/accordion | P0 | 1 |
| B4 | Homepage truncated schedule preview | P0 | 1 |
| B5 | Open-gym hours display | P1 | 2 |
| B6 | Per-program detail pages | P1 | 2 |

## 3. Membership / Pricing Features
| # | Feature | Priority | Phase |
| :--- | :--- | :--- | :--- |
| M1 | Transparent pricing tiers + visual comparison | P0 | 1 |
| M2 | Cancellation policy documentation | P0 | 1 |
| M3 | "Become a Member" → pricing + enquiry (lead form) | P0 | 1 |
| M4 | Student / first-responder discount display | P2 | 3 |
| M5 | Secure payment gateway (Stripe) for memberships | P3 | 5 |
| M6 | Drop-in / class-pack purchase | P3 | 5 |

## 4. Booking / Lead-Generation Features
| # | Feature | Priority | Phase |
| :--- | :--- | :--- | :--- |
| L1 | Free-trial **lead-capture form** (DB persist) | P0 | 1 |
| L2 | Lead notification email to gym + auto-reply (Resend) | P0 | 1 |
| L3 | Form validation (zod, client+server) + success state | P0 | 1 |
| L4 | Spam protection (honeypot + rate limit) | P0 | 1 |
| L5 | Lead-magnet email capture (free PDF guide) | P1 | 2 |
| L6 | Lead-capture popup / exit-intent | P2 | 3 |
| L7 | Third-party booking API (Mindbody/Glofox), real-time calendar | P3 | 5 |
| L8 | Member portal authentication | P3 | 5 |

## 5. Trainer / Team Features
| # | Feature | Priority | Phase |
| :--- | :--- | :--- | :--- |
| T1 | Coaches page: bios, records, certifications, headshots | P0 | 1 |
| T2 | Personal-training enquiry routing | P1 | 2 |
| T3 | Individual coach profile pages | P2 | 3 |

## 6. Trust-Building Features
| # | Feature | Priority | Phase |
| :--- | :--- | :--- | :--- |
| R1 | Trust banner (stats / reviews strip) | P0 | 1 |
| R2 | Testimonials (written) | P1 | 2 |
| R3 | Video testimonials | P1 | 2 |
| R4 | Before/after success-story gallery | P1 | 2 |
| R5 | Google Reviews widget | P1 | 2 |
| R6 | Statistical counters (fighters trained, years) | P2 | 3 |
| R7 | Press / partner logos strip | P2 | 3 |

## 7. Content / SEO Features
| # | Feature | Priority | Phase |
| :--- | :--- | :--- | :--- |
| S1 | Per-page metadata, OG/Twitter cards, canonicals | P0 | 1 |
| S2 | sitemap.xml + robots.txt | P0 | 1 |
| S3 | JSON-LD LocalBusiness→HealthClub | P0 | 1 |
| S4 | JSON-LD FAQPage | P0 | 1 |
| S5 | DB-backed CMS (admin CRUD) | P1 | 2 |
| S6 | Blog / Learn Hub (DB posts) | P1 | 2 |
| S7 | JSON-LD Article on posts | P1 | 2 |
| S8 | SEO landing pages (Youth, Women's, Personal Training) | P1 | 2 |
| S9 | Glossary / educational hub | P2 | 3 |
| S10 | Location-specific landing pages (multi-area) | P2 | 3 |
| S11 | JSON-LD Event (seminars/fight nights) | P2 | 3 |

## 8. Media / Branding Features
| # | Feature | Priority | Phase |
| :--- | :--- | :--- | :--- |
| D1 | Premium dark theme + red accent design system | P0 | 1 |
| D2 | Strong typography (condensed display + readable body) | P0 | 1 |
| D3 | Large hero section, full-width imagery | P0 | 1 |
| D4 | Subtle animations (150–250ms ease-in-out) | P0 | 1 |
| D5 | Authentic photo gallery (lazy-loaded) | P2 | 3 |
| D6 | Hero background video loop | P2 | 3 |
| D7 | Instagram feed embed | P2 | 3 |

## 9. Advanced Features (deferred — see `BACKLOG.md`)
| # | Feature | Priority | Phase |
| :--- | :--- | :--- | :--- |
| A1 | E-commerce store (merch, gloves, wraps) | P3 | 4 |
| A2 | Gated digital / on-demand (VOD) training library | P3 | 4 |
| A3 | Proprietary members-only mobile app / portal | P3 | 5 |
| A4 | Clinical / recovery service scheduling | P3 | 5 |
| A5 | Real booking + capacity management + recurring billing | P3 | 5 |

---

## Coverage Check (traceability)

- All **business-requirements.md** important features are P0/P1 in Phases 1–2.
- All **business-requirements.md** non-goals (store, online classes, member
  portal, complex payments) appear as **P3** (A1–A5, M5–M6, L7–L8) — never MVP.
- **design-inspiration.md** style requirements → D1–D4 (P0).
- **research-website.md** heavy recommendations (Mindbody/Glofox, Stripe,
  e-commerce, member app, recovery scheduling) → P3, honoring ORCHESTRATOR
  priority order.

Every discovered feature belongs to exactly one phase. No feature omitted.
