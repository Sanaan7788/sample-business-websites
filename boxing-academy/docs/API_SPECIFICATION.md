# API_SPECIFICATION (high-level)

API is implemented as **Next.js Route Handlers** under `src/app/api/*`. All write
endpoints: **zod-validated**, structured JSON errors, structured logging. JSON over
HTTPS. Phase labels: P0 = MVP, P1 = Growth.

Conventions:
- Success: `200/201` with `{ data }`. Validation error: `422` with `{ error, fields }`.
- Rate limited: `429`. Auth required (admin): `401/403`.
- Public POST endpoints include a **honeypot** field + basic **rate limiting**.

---

## 1. Leads — `POST /api/leads` (P0)
Primary conversion endpoint (free-trial / membership enquiry).

**Request**
```json
{
  "name": "Jane Doe",
  "email": "jane@example.com",
  "phone": "+15551234567",
  "preferredProgram": "beginner-fundamentals",
  "message": "New to boxing, want to try.",
  "source": "TRIAL",
  "company": ""   // honeypot — must be empty
}
```
**Validation:** name (1–100), email (valid), phone (required), preferredProgram
(optional, known slug), message (≤1000), source ∈ {TRIAL, CONTACT, MEMBERSHIP}.

**Behavior:** insert `Lead` → send gym notification + lead auto-reply (Resend).
Email failure is logged but does not fail the request (lead is persisted).

**Responses:** `201 { data: { id } }` · `422 { error, fields }` · `429`.

---

## 2. Contact — `POST /api/contact` (P0)
General enquiry. Same shape as leads with `source: "CONTACT"`; persists a `Lead`
(source=CONTACT) and emails the gym. (Implemented via the same service.)

---

## 3. Schedule — `GET /api/schedule` (P0)
Returns class sessions for the schedule UI (also consumable server-side at
ISR/build).

**Query:** `?day=MON&discipline=boxing` (optional filters).
**Response**
```json
{ "data": [
  { "id": "...", "day": "MON", "start": "06:00", "end": "07:00",
    "program": { "name": "Beginner Fundamentals", "slug": "beginner-fundamentals", "level": "BEGINNER" },
    "coach": { "name": "Coach A", "slug": "coach-a" } }
] }
```

---

## 4. Admin Auth — `POST /api/admin/auth` (P1)
Session/JWT login for `/admin`. `{ email, password }` → sets secure, httpOnly
cookie. Passwords hashed (bcrypt/argon2). Subsequent admin routes require auth.

## 5. Admin CRUD (P1) — auth required
RESTful handlers for content management:

| Resource | Endpoints |
| :--- | :--- |
| Programs | `GET/POST /api/admin/programs`, `GET/PUT/DELETE /api/admin/programs/[id]` |
| Schedule | `GET/POST /api/admin/sessions`, `PUT/DELETE /api/admin/sessions/[id]` |
| Coaches | `GET/POST /api/admin/coaches`, `PUT/DELETE /api/admin/coaches/[id]` |
| Pricing | `GET/POST /api/admin/pricing`, `PUT/DELETE /api/admin/pricing/[id]` |
| Testimonials | `GET/POST /api/admin/testimonials`, `PUT/DELETE /api/admin/testimonials/[id]` |
| Blog | `GET/POST /api/admin/posts`, `PUT/DELETE /api/admin/posts/[id]` |
| Leads | `GET /api/admin/leads`, `PATCH /api/admin/leads/[id]` (status) |

All admin writes: zod-validated, authorized, logged.

## 6. Blog (public, P1)
- `GET /api/blog` — list published posts (paginated).
- `GET /api/blog/[slug]` — single post.
(Or rendered directly via server components with ISR; endpoints optional.)

---

## 7. Validation & Errors
- Shared zod schemas in `src/lib/validation.ts` (client + server).
- Error envelope: `{ error: string, fields?: Record<string,string> }`.
- Never leak internal errors; log full detail server-side, return safe messages.

## 8. Security
- Honeypot + rate limit on public POSTs.
- Admin routes behind auth middleware; httpOnly secure cookies.
- Secrets via env (`RESEND_API_KEY`, `DATABASE_URL`, admin secret).
- Security headers (CSP/HSTS as feasible) configured in `next.config.ts`.

## 9. Future (P3 — see `BACKLOG.md`)
Real booking/payment endpoints (capacity, checkout via Stripe/Mindbody),
e-commerce, member portal, and VOD access — not in MVP/P1.
