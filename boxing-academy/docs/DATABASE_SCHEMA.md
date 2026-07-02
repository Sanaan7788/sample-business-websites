# DATABASE_SCHEMA (high-level)

Database: **PostgreSQL** (Railway). ORM: **Prisma**. This is the high-level model;
the authoritative source once built is `prisma/schema.prisma`. Phase labels mark
when each table is introduced (P0 = MVP; P1 = CMS/Growth).

---

## 1. ER Diagram (ASCII)

```txt
        ┌──────────────┐         ┌───────────────┐
        │   Program    │ 1     * │ ClassSession  │ *     1 ┌──────────┐
        │ (P0)         │─────────│  (P0)         │─────────│  Coach   │
        │              │         │               │         │  (P0)    │
        └──────────────┘         └───────────────┘         └──────────┘

   ┌──────────────┐   ┌──────────────┐   ┌──────────────┐
   │     Lead     │   │ PricingTier  │   │ Testimonial  │
   │   (P0)       │   │   (P0)       │   │   (P1)       │
   └──────────────┘   └──────────────┘   └──────────────┘

   ┌──────────────┐   ┌──────────────┐
   │  BlogPost    │   │  AdminUser   │
   │   (P1)       │   │   (P1)       │
   └──────────────┘   └──────────────┘
```

Relationships:
- `Program 1—* ClassSession` (a program has many scheduled sessions).
- `Coach 1—* ClassSession` (a coach teaches many sessions).
- `Lead`, `PricingTier`, `Testimonial`, `BlogPost`, `AdminUser` are standalone.

---

## 2. Tables

### Lead (P0) — primary conversion asset
| Field | Type | Notes |
| :--- | :--- | :--- |
| id | uuid (pk) | |
| name | string | required |
| email | string | required, validated |
| phone | string | required |
| preferredProgram | string? | links by program slug/name |
| message | text? | optional |
| source | enum | `TRIAL` \| `CONTACT` \| `MEMBERSHIP` |
| status | enum | `NEW` \| `CONTACTED` \| `CONVERTED` \| `CLOSED` (default `NEW`) |
| createdAt | datetime | default now |

### Program (P0 read / P1 CMS)
| Field | Type | Notes |
| :--- | :--- | :--- |
| id | uuid (pk) | |
| slug | string (unique) | |
| name | string | |
| description | text | |
| level | enum | `BEGINNER` \| `INTERMEDIATE` \| `ADVANCED` \| `ALL` |
| ageGroup | enum | `YOUTH` \| `ADULT` \| `ALL` |
| isWomensOnly | boolean | default false |
| order | int | display order |
| isActive | boolean | default true |

### ClassSession (P0)
| Field | Type | Notes |
| :--- | :--- | :--- |
| id | uuid (pk) | |
| programId | fk → Program | |
| coachId | fk → Coach? | nullable |
| dayOfWeek | enum | MON…SUN |
| startTime | string/time | "06:00" |
| endTime | string/time | "07:00" |
| capacity | int? | informational |

### Coach (P0 read / P1 CMS)
| Field | Type | Notes |
| :--- | :--- | :--- |
| id | uuid (pk) | |
| slug | string (unique) | |
| name | string | |
| bio | text | |
| record | string? | e.g. "12-1 Pro" |
| certifications | string[] | |
| headshotUrl | string | |
| order | int | |

### PricingTier (P0 read / P1 CMS)
| Field | Type | Notes |
| :--- | :--- | :--- |
| id | uuid (pk) | |
| name | string | e.g. "Unlimited" |
| price | int | minor units or whole |
| interval | enum | `MONTH` \| `WEEK` \| `DROP_IN` |
| features | string[] | |
| isHighlighted | boolean | "most popular" |
| cancellationNote | string? | |
| order | int | |

### Testimonial (P1)
| Field | Type | Notes |
| :--- | :--- | :--- |
| id | uuid (pk) | |
| author | string | |
| quote | text | |
| rating | int? | 1–5 |
| mediaUrl | string? | image/video |
| isVideo | boolean | default false |
| isFeatured | boolean | default false |

### BlogPost (P1)
| Field | Type | Notes |
| :--- | :--- | :--- |
| id | uuid (pk) | |
| slug | string (unique) | |
| title | string | |
| excerpt | string | |
| body | text | MDX / rich text |
| coverUrl | string? | |
| tags | string[] | |
| publishedAt | datetime? | null = draft |
| createdAt | datetime | |

### AdminUser (P1)
| Field | Type | Notes |
| :--- | :--- | :--- |
| id | uuid (pk) | |
| email | string (unique) | |
| passwordHash | string | bcrypt/argon2 |
| role | enum | `ADMIN` \| `EDITOR` |
| createdAt | datetime | |

---

## 3. Indexes
- `Program.slug` unique; `Coach.slug` unique; `BlogPost.slug` unique; `AdminUser.email` unique.
- `Lead.createdAt` (lead list ordering), `Lead.status` (filtering).
- `ClassSession.dayOfWeek` (+ composite `(dayOfWeek, startTime)` for schedule ordering).
- `BlogPost.publishedAt` (published feed).

## 4. Seed Data (Phase 1)
`prisma/seed.ts` seeds: Programs (Beginner, Sparring/Advanced, Youth, Women's,
S&C), Coaches (with records), PricingTiers, and a week of ClassSessions — so the
site renders real content before the CMS exists.

## 5. Migration Notes
- Prisma Migrate; one initial migration for P0 tables (Lead, Program,
  ClassSession, Coach, PricingTier).
- P1 migration adds Testimonial, BlogPost, AdminUser.
- Enums defined in Prisma; keep additive to avoid destructive migrations.
- The schedule/lead model is provider-agnostic so a real booking system can be
  layered later (P3) without breaking these tables.
