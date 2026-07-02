# DEPLOYMENT_GUIDE

Target: **Railway** (app + PostgreSQL), per `master-prompt.md` defaults. Single
Next.js service. This guide covers env, database, build/start, migrations, and CI/CD.

---

## 0. Railway from GitHub — this repo (quick path)

**Monorepo note:** `boxing-academy/` is a **subdirectory** of the
`Sanaan7788/sample-business-websites` repo. Railway must be told the app lives in
that subfolder.

`railway.json` (in `boxing-academy/`) already configures build (Nixpacks) + start
(`npm run start`) and a **preDeploy** step (`npm run db:migrate:deploy`) that
applies migrations automatically on every deploy.

Steps (dashboard):
1. **New Project → Deploy from GitHub repo** → pick `sample-business-websites`.
2. Service **Settings → Root Directory = `boxing-academy`** (critical — this is
   why Railway finds `package.json` + `railway.json`).
3. **+ New → Database → PostgreSQL** in the same project.
4. On the app service, **Variables** → add (see §1): reference the PG plugin's
   `DATABASE_URL`, plus `RESEND_API_KEY`, `EMAIL_FROM`, `GYM_NOTIFY_EMAIL`,
   `NEXT_PUBLIC_SITE_URL`.
5. Deploy runs automatically: build → `preDeploy` (migrate) → start.
6. **One-time seed** (see §4): after the first successful deploy, run `npm run
   db:seed` once via `railway run` (CLI) or a temporary service shell — it's
   idempotent (upserts), so it's safe but only needed once.
7. Add a custom domain (§9) and update `NEXT_PUBLIC_SITE_URL`.

CI (`.github/workflows/boxing-academy-ci.yml`) already lints/tests/builds on every
push; Railway deploys independently from `main`.

---

## 1. Environment Variables

`.env.example` (committed; real values never committed):

```env
# Database (Railway PostgreSQL)
DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DB"

# Email (Resend)
RESEND_API_KEY="re_xxx"
EMAIL_FROM="Boxing Academy <hello@yourdomain.com>"
GYM_NOTIFY_EMAIL="owner@yourdomain.com"

# Site
NEXT_PUBLIC_SITE_URL="https://your-domain.com"

# Maps (if using JS API; embed iframe needs none)
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=""

# Admin (Phase 2)
ADMIN_SESSION_SECRET="change-me-long-random"
```

Set these in Railway → Service → Variables. Keep `DATABASE_URL` referencing the
Railway PostgreSQL plugin.

---

## 2. Provision PostgreSQL (Railway)
1. Create a Railway project.
2. Add the **PostgreSQL** plugin → Railway injects `DATABASE_URL`.
3. Confirm the app service can read `DATABASE_URL` (reference variable).

---

## 3. Build & Start
- **Install:** `npm ci`
- **Generate Prisma client:** `npx prisma generate` (run in build).
- **Build:** `npm run build` (Next.js production build).
- **Start:** `npm run start` (Next.js server; Railway sets `PORT`).

Recommended `package.json` scripts:
```json
{
  "scripts": {
    "build": "prisma generate && next build",
    "start": "next start -p ${PORT:-3000}",
    "db:migrate:deploy": "prisma migrate deploy",
    "db:seed": "tsx prisma/seed.ts"
  }
}
```

Railway config (`railway.json` or dashboard): build = `npm run build`,
start = `npm run start`. A `Dockerfile` is optional (only if Nixpacks defaults are
insufficient).

---

## 4. Database Migrations & Seed
- **Migrations (prod):** `npx prisma migrate deploy` — run on release, before start.
  Configure as a Railway "deploy" / release step so schema is applied automatically.
- **Seed (first deploy only):** `npm run db:seed` to load programs, coaches,
  pricing, and a week of schedule. Guard the seed to be idempotent (upserts) so
  re-runs are safe.

Release order: `prisma migrate deploy` → (first time) `db:seed` → `next start`.

---

## 5. Resend (Email) Setup
1. Create a Resend account + API key → `RESEND_API_KEY`.
2. **Verify the sending domain** (SPF/DKIM) so lead emails aren't spam-filtered
   (mitigates `RISKS.md` RT-2).
3. Set `EMAIL_FROM` to a verified-domain address; `GYM_NOTIFY_EMAIL` to the owner.

---

## 6. Post-Deploy Smoke Test
- [ ] Site loads over HTTPS; mobile sticky CTA visible.
- [ ] Submit the trial form → `Lead` row created (check DB) → gym email + auto-reply received.
- [ ] Schedule renders from DB and filters work.
- [ ] `sitemap.xml` + `robots.txt` reachable; `/admin` disallowed.
- [ ] Lighthouse (mobile) meets budgets (Perf ≥ 90, A11y ≥ 95, SEO ≥ 95).
- [ ] Rich Results test: LocalBusiness/HealthClub + FAQPage valid.

---

## 7. CI/CD Recommendation
- **CI (GitHub Actions):** on PR → typecheck, lint, unit/integration/component
  tests; on main → E2E (Playwright) + Lighthouse CI + axe (see `TESTING_PLAN.md`).
- **CD:** Railway auto-deploys on push to `main` (or via Railway GitHub integration).
  Run `prisma migrate deploy` as a release step. Use a staging environment/branch
  before production where possible.
- **Secrets:** stored in Railway + GitHub Actions secrets; never in the repo.

---

## 8. Rollback
- Railway: redeploy a previous successful deployment.
- DB: migrations are additive (see `DATABASE_SCHEMA.md`); avoid destructive
  changes. Keep backups enabled on the PostgreSQL plugin.

---

## 9. Domains & HTTPS
- Add the custom domain in Railway; configure DNS (CNAME).
- Railway provisions TLS automatically.
- Update `NEXT_PUBLIC_SITE_URL` + GBP/NAP to the final domain.
