import type { Metadata } from "next";
import { site } from "@/data/site";
import { db } from "@/lib/db";
import { Section, SectionHeading } from "@/components/shared/section";
import { PricingTable } from "@/components/shared/pricing-table";

export const metadata: Metadata = {
  title: "Membership & Pricing",
  description: `Transparent boxing membership pricing at ${site.name} in ${site.city}. Drop-in, monthly unlimited, and personal training.`,
};

export default async function PricingPage() {
  const tiers = await db.pricingTier.findMany({ orderBy: { order: "asc" } });

  return (
    <Section>
      <SectionHeading
        eyebrow="Membership"
        title="Simple, honest pricing"
        subtitle="No contracts to decode. Start with a free trial, then pick what fits."
      />

      <PricingTable tiers={tiers} />

      <p className="text-muted mt-10 text-sm">
        Not sure which is right? Book a free trial and we&apos;ll help you choose — or call{" "}
        <a
          href={site.phoneHref}
          className="text-accent-text hover:text-fg underline underline-offset-2"
        >
          {site.phone}
        </a>
        .
      </p>
    </Section>
  );
}
