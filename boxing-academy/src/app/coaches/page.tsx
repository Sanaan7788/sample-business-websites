import type { Metadata } from "next";
import { site } from "@/data/site";
import { db } from "@/lib/db";
import { Section, SectionHeading } from "@/components/shared/section";
import { CoachCard } from "@/components/shared/coach-card";
import { CTAButton } from "@/components/shared/cta-button";

export const metadata: Metadata = {
  title: "Our Coaches",
  description: `Meet the coaching team at ${site.name} in ${site.city} — real boxing experience, beginner-friendly instruction.`,
};

export default async function CoachesPage() {
  const coaches = await db.coach.findMany({ orderBy: { order: "asc" } });

  return (
    <Section>
      <SectionHeading
        eyebrow="Coaches"
        title="Learn from real fighters"
        subtitle="Technical, patient coaching that meets you where you are — whether it's day one or your hundredth round."
      />

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {coaches.map((c) => (
          <CoachCard key={c.slug} coach={c} />
        ))}
      </div>

      <div className="mt-12">
        <CTAButton size="lg">Train With Us — Free Trial</CTAButton>
      </div>
    </Section>
  );
}
