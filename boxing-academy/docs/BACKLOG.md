# BACKLOG

Deferred features — everything **not** in the MVP. These come from
`business-requirements.md` non-goals and `research-website.md` advanced
recommendations, intentionally parked per `ORCHESTRATOR.md` priority order. Each
item notes the target phase and a one-line "promotion trigger" (when to reconsider).

---

## P3 — Future (Phase 4: Advanced)

| ID | Item | Trigger to promote |
| :--- | :--- | :--- |
| BK-1 | **E-commerce store** (merch, gloves, wraps, supplements) + inventory + Stripe. | Stable trial volume + demand for retail revenue. |
| BK-2 | **Gated digital / on-demand (VOD) training library** (shadowboxing, conditioning). | Member base wants remote training; media production ready. |

## P3 — Future (Phase 5: Premium)

| ID | Item | Trigger to promote |
| :--- | :--- | :--- |
| BK-3 | **Members-only portal / proprietary mobile app** (progress, community, membership mgmt). | Need for retention tooling + identity/auth investment justified. |
| BK-4 | **Real booking + capacity management + recurring billing** (Mindbody/Glofox/Stripe). | Manual lead handling becomes the bottleneck; payments in scope. |
| BK-5 | **Clinical / recovery service scheduling** (massage, physio — BXR-style). | Facility adds recovery services. |
| BK-6 | **Drop-in / class-pack online purchase.** | Online payments adopted (depends on BK-4). |

---

## Deferred Non-Goals (explicit, from business-requirements.md)
- NG-1 Merchandise store → BK-1.
- NG-2 Online / on-demand classes → BK-2.
- NG-3 Member portal → BK-3.
- NG-4 Complex payment system → BK-4 / BK-6.

---

## Lower-priority enhancements (P2 — scheduled in Phase 3, not "deferred", listed for visibility)
These are in the roadmap (Phase 3) rather than the backlog, but recorded here so
nothing is lost: photo gallery, hero video, Instagram feed, trust counters, press
logos, multi-location/location pages, Event schema, glossary, discount display,
admin analytics, exit-intent capture. See `FEATURE_ROADMAP.md` §§6–8 and
`PHASE_PLAN.md` Phase 3.

---

## Promotion Process
1. Confirm the trigger condition is met.
2. Re-validate against `business-requirements.md` non-goals (still deferred?).
3. Record the decision in `DECISIONS.md`.
4. Move the item into the relevant phase in `PHASE_PLAN.md` + `IMPLEMENTATION_PLAN.md`.
