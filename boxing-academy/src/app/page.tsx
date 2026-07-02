import Link from "next/link";
import { db } from "@/lib/db";
import { Hero, TrustBanner, WhyUs, FinalCTA } from "@/components/sections/home-sections";
import { Section, SectionHeading } from "@/components/shared/section";
import { ProgramCard } from "@/components/shared/program-card";
import { CoachCard } from "@/components/shared/coach-card";
import { ScheduleTable, type ScheduleSession } from "@/components/shared/schedule-table";

// Home — full AIDA layout (docs/research-website.md §8):
// Hero → Trust → Why Us → Programs → Schedule preview → Coaches → Final CTA.
export default async function Home() {
  const [programs, coaches, sessionRows] = await Promise.all([
    db.program.findMany({ where: { isActive: true }, orderBy: { order: "asc" }, take: 3 }),
    db.coach.findMany({ orderBy: { order: "asc" }, take: 3 }),
    db.classSession.findMany({
      include: { program: true, coach: true },
      orderBy: [{ dayOfWeek: "asc" }, { startTime: "asc" }],
    }),
  ]);

  const sessions: ScheduleSession[] = sessionRows.map((r) => ({
    id: r.id,
    day: r.dayOfWeek,
    start: r.startTime,
    end: r.endTime,
    program: { name: r.program.name, slug: r.program.slug, level: r.program.level },
    coach: r.coach?.name ?? null,
  }));

  return (
    <>
      <Hero />
      <TrustBanner />
      <WhyUs />

      {/* Programs */}
      <Section alt>
        <SectionHeading eyebrow="Programs" title="Ways to train" />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {programs.map((p) => (
            <ProgramCard key={p.slug} program={p} />
          ))}
        </div>
        <Link
          href="/programs"
          className="text-accent-text hover:text-fg mt-8 inline-block font-semibold"
        >
          See all programs →
        </Link>
      </Section>

      {/* Schedule preview */}
      <Section>
        <SectionHeading eyebrow="Schedule" title="This week" />
        <ScheduleTable sessions={sessions} preview />
        <Link
          href="/schedule"
          className="text-accent-text hover:text-fg mt-8 inline-block font-semibold"
        >
          View full schedule →
        </Link>
      </Section>

      {/* Coaches */}
      <Section alt>
        <SectionHeading eyebrow="Coaches" title="Meet your corner" />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {coaches.map((c) => (
            <CoachCard key={c.slug} coach={c} />
          ))}
        </div>
        <Link
          href="/coaches"
          className="text-accent-text hover:text-fg mt-8 inline-block font-semibold"
        >
          Meet the team →
        </Link>
      </Section>

      <FinalCTA />
    </>
  );
}
