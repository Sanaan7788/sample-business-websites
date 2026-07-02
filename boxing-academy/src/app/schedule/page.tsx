import type { Metadata } from "next";
import { site } from "@/data/site";
import { db } from "@/lib/db";
import { Section, SectionHeading } from "@/components/shared/section";
import { ScheduleTable, type ScheduleSession } from "@/components/shared/schedule-table";
import { CTAButton } from "@/components/shared/cta-button";

export const metadata: Metadata = {
  title: "Class Schedule",
  description: `View the weekly boxing class schedule at ${site.name} in ${site.city}. Filter by day and program.`,
};

export default async function SchedulePage() {
  const rows = await db.classSession.findMany({
    include: { program: true, coach: true },
    orderBy: [{ dayOfWeek: "asc" }, { startTime: "asc" }],
  });

  const sessions: ScheduleSession[] = rows.map((r) => ({
    id: r.id,
    day: r.dayOfWeek,
    start: r.startTime,
    end: r.endTime,
    program: { name: r.program.name, slug: r.program.slug, level: r.program.level },
    coach: r.coach?.name ?? null,
  }));

  return (
    <Section>
      <SectionHeading
        eyebrow="Schedule"
        title="When we train"
        subtitle="Group classes Monday through Friday, morning and evening. Filter to find a time that fits."
      />

      <ScheduleTable sessions={sessions} />

      <div className="mt-12">
        <CTAButton size="lg">Book Your Free Trial</CTAButton>
      </div>
    </Section>
  );
}
