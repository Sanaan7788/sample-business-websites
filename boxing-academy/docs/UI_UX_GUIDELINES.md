# UI_UX_GUIDELINES

Design target (per `master-prompt.md` + `design-inspiration.md`): the polish of
**Apple / Stripe / Linear** applied to the **premium, athletic, high-energy**
combat-sports brands of **Nike / Equinox / BXR London / UFC Gym / FightCamp**.
Premium, motivating, trustworthy. Minimal clutter, high conversion focus.

---

## 1. Brand Direction
- **Visual style:** premium, athletic, energetic, high-end fitness.
- **Feel:** professional, premium, motivating, trustworthy, athletic, high energy.
- **Imagery:** authentic only — real coaches, wrapped hands, motion blur on bag
  work. **No stock photography.** Full-width, high-contrast.

## 2. Color System
Dark theme with a single aggressive accent. Define as CSS variables / Tailwind tokens.

| Token | Value (suggested) | Use |
| :--- | :--- | :--- |
| `--bg` / black | `#0A0A0A` | Primary background |
| `--charcoal` | `#161616` | Section alt background |
| `--surface` / dark-gray | `#1F1F1F` | Cards, inputs |
| `--accent` / red | `#E11D2A` | Primary CTA / fills (white text sits ON it) |
| `--accent-hover` | `#B91622` | Button hover/active |
| `--accent-text` | `#FF4D5A` | Red **text** on dark — meets AA 4.5:1 (verified by axe) |
| `--fg` / white | `#FFFFFF` | Primary text |
| `--muted` | `#A1A1A1` | Secondary text |
| `--border` | `#2A2A2A` | Dividers, card borders |
| `--success` | `#16A34A` | Form success |
| `--error` | `#DC2626` | Form errors |

Rules: red is the **only** vibrant color — reserved for primary actions and key
highlights. Avoid excessive colors. Maintain WCAG AA contrast (≥4.5:1 body,
≥3:1 large text); verify red-on-dark for buttons/links.

## 3. Typography
- **Display/headings:** bold condensed sans-serif (e.g. Oswald / Teko / Anton-style)
  — projects strength. Uppercase or tight tracking for hero/section titles.
- **Body:** clean geometric sans (Inter / Montserrat) for readability.

| Element | Size (desktop → mobile) | Weight |
| :--- | :--- | :--- |
| Hero H1 | 64–80px → 36–44px | 700–800 |
| H2 | 40–48px → 28–32px | 700 |
| H3 | 24–28px → 20px | 600–700 |
| Body | 16–18px → 16px | 400 |
| Small/caption | 13–14px | 400–500 |

Line-height: 1.1–1.2 headings, 1.5–1.7 body. Max body measure ~70ch.

## 4. Spacing & Layout
- **Spacing scale (4px base):** 4, 8, 12, 16, 24, 32, 48, 64, 96, 128.
- **Section vertical rhythm:** 96–128px desktop, 48–64px mobile.
- **Container:** max-width ~1200–1280px, generous gutters.
- **Whitespace:** large negative space around CTAs to reduce cognitive load.
- **Layout patterns:** F/Z reading flow; card-based design; optional asymmetric
  grids for energy. One **primary action per screen**; obvious navigation.

## 5. Components & Interaction
- **Buttons:** primary = solid red; secondary = outline/ghost on dark. Min height
  44px. Clear hover/active/focus/disabled states.
- **Cards:** charcoal surface, subtle border, slight elevation on hover.
- **Forms:** large touch-friendly inputs, visible labels, inline validation,
  explicit success state. Lead form is short (name, email, phone, program).
- **Schedule:** table on desktop; collapses to list/accordion on mobile; filters
  for day/time/discipline.
- **FAQ:** accordion (also drives FAQPage schema).

## 6. Motion / Animation
- **Subtle only.** Duration **150–250ms**, **ease-in-out**.
- Use for: hover, fade/slide-in on scroll (small offset), accordion expand.
- Avoid excessive motion; respect `prefers-reduced-motion` (disable non-essential).

## 7. Mobile-First & Responsive
- Design for mobile first; enhance upward.
- **Breakpoints:** sm 640 · md 768 · lg 1024 · xl 1280.
- **Touch targets ≥ 44×44px.**
- **Sticky mobile CTA** ("Book Free Trial") anchored bottom, always visible.
- Schedule + nav adapt gracefully to small viewports.

## 8. Accessibility (WCAG 2.1 AA)
- Semantic HTML landmarks; logical heading order.
- Full keyboard operability; visible focus rings (don't rely on color alone).
- Alt text on all meaningful images; decorative images marked empty alt.
- Labels + `aria-describedby` for form errors; announce success.
- Color contrast verified; reduced-motion honored.
- Test with axe / Lighthouse; target A11y ≥ 95.

## 9. Per-Screen Checklist
Every screen must have: one primary action, obvious navigation, minimal clutter,
mobile-first responsive behavior, and AA accessibility. Avoid dense layouts,
unnecessary info, excessive colors, and unnecessary animation.
