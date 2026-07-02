import { site } from "@/data/site";

/**
 * JSON-LD builders (docs/SEO_STRATEGY.md §3). Centralized so schema stays
 * consistent and is injected via <JsonLd>.
 */

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

/** LocalBusiness → HealthClub for home/contact (FR-26). */
export function healthClubSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "HealthClub",
    name: site.name,
    description: site.description,
    url: siteUrl,
    telephone: site.phone,
    email: site.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: site.address.street,
      addressLocality: site.address.city,
      addressRegion: site.address.region,
      postalCode: site.address.postalCode,
      addressCountry: site.address.country,
    },
    // priceRange is an estimate until pricing is confirmed (BUSINESS_PROFILE.md).
    priceRange: "$$",
    sameAs: [site.social.instagram, site.social.facebook],
    // Confirmed class times; expand once full hours are verified.
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "07:30",
        closes: "19:00",
      },
    ],
  };
}

/** FAQPage schema for the FAQ section (FR-26). */
export function faqPageSchema(faqs: readonly { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };
}
