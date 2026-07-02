/**
 * Single source of truth for the gym's real-world details (NAP, hours, socials).
 * Mirrors docs/BUSINESS_PROFILE.md. Confidence is tracked there.
 *
 * ⚠️ UNVERIFIED values are marked with `// VERIFY` — confirm with the owner
 * before launch. Looked up 2026-06-29 from public sources.
 */

export const site = {
  name: "Cactus Boxing Gym",
  shortName: "Cactus Boxing",
  tagline: "Real boxing. Real coaching. Houston.",
  description:
    "Cactus Boxing Gym in Houston (Gulfton) offers beginner-friendly group boxing classes and personal training. Book your free trial today.",

  // City used across SEO copy/keywords.
  city: "Houston",
  region: "TX",

  // NAP — keep identical to Google Business Profile.
  address: {
    street: "5320 Gulfton St, Suite 12",
    city: "Houston",
    region: "TX",
    postalCode: "77081",
    country: "US",
    full: "5320 Gulfton St, Suite 12, Houston, TX 77081",
  },

  // Google Maps (from the owner-provided Maps link).
  maps: {
    placeId: "0x8640c14abb56e511:0x7281c311b8236d65",
    // Embed/directions use the address query; no API key required.
    directionsUrl:
      "https://www.google.com/maps/dir/?api=1&destination=Cactus+Boxing+Gym%2C+5320+Gulfton+St+Suite+12%2C+Houston%2C+TX+77081",
    embedQuery: "Cactus Boxing Gym, 5320 Gulfton St Suite 12, Houston, TX 77081",
  },

  phone: "(832) 817-2763", // VERIFY: from business listings, not gym-confirmed
  phoneHref: "tel:+18328172763", // VERIFY
  email: "hello@cactusboxinggym.com", // VERIFY: placeholder — no public email found, domain may not exist

  // Hours — only class times are confirmed (Mon–Fri 7:30am & 6pm).
  // VERIFY: full open/close hours + weekends unknown.
  hours: [
    { day: "Monday", value: "Classes 7:30 AM & 6:00 PM" },
    { day: "Tuesday", value: "Classes 7:30 AM & 6:00 PM" },
    { day: "Wednesday", value: "Classes 7:30 AM & 6:00 PM" },
    { day: "Thursday", value: "Classes 7:30 AM & 6:00 PM" },
    { day: "Friday", value: "Classes 7:30 AM & 6:00 PM" },
    { day: "Saturday", value: "Closed" }, // VERIFY
    { day: "Sunday", value: "Closed" }, // VERIFY
  ],

  social: {
    instagram: "https://www.instagram.com/cactusboxinggym/",
    facebook: "https://www.facebook.com/61584912783845/",
  },

  // Default offer copy (VERIFY actual trial terms with owner).
  trialOffer: "Book your first class free", // VERIFY
} as const;

export type Site = typeof site;

/** Primary navigation — pages built across Phase 1. */
export const navLinks = [
  { href: "/", label: "Home" },
  { href: "/programs", label: "Programs" },
  { href: "/schedule", label: "Schedule" },
  { href: "/pricing", label: "Pricing" },
  { href: "/coaches", label: "Coaches" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
] as const;
