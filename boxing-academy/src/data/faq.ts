import { site } from "@/data/site";

/**
 * FAQ content — single source for both the FAQ page and FAQPage JSON-LD
 * (docs/SEO_STRATEGY.md §3). Addresses common beginner objections.
 *
 * Some answers reference placeholder details (pricing, gear policy) — VERIFY
 * with the owner (see docs/BUSINESS_PROFILE.md).
 */
export const faqs = [
  {
    question: "I've never boxed before — can I still join?",
    answer:
      "Absolutely. Our group classes are beginner-friendly and coached for all levels. You'll learn stance, footwork, and the basics in a no-pressure, ego-free environment.",
  },
  {
    question: "What do I need to bring to my first class?",
    answer:
      "Just shoes to work out in and water. We'll guide you through everything else on day one. (Gear/glove specifics — confirm with the gym.)",
  },
  {
    question: "How do I book a free trial?",
    answer:
      "Use the “Book Free Trial” button anywhere on the site to send your details, and we'll get you set up. Prefer to talk? Call us at " +
      site.phone +
      ".",
  },
  {
    question: "When are classes?",
    answer:
      "Group classes run Monday through Friday at 7:30 AM and 6:00 PM. See the Schedule page for the full week.",
  },
  {
    question: "Do you offer personal training?",
    answer:
      "Yes — one-on-one coaching tailored to your goals and pace. Mention it when you book a trial or contact us and we'll arrange a session.",
  },
  {
    question: "Where are you located?",
    answer: `We're at ${site.address.full}, in Houston's Gulfton neighborhood. The Contact page has a map and directions.`,
  },
] as const;
