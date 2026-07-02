import type { Metadata } from "next";
import { site } from "@/data/site";
import { db } from "@/lib/db";
import { Section, SectionHeading } from "@/components/shared/section";
import { ProgramCard } from "@/components/shared/program-card";
import { CTAButton } from "@/components/shared/cta-button";

export const metadata: Metadata = {
  title: "Boxing Programs & Classes",
  description: `Beginner to advanced boxing programs at ${site.name} in ${site.city} — group classes, personal training, youth and women's boxing.`,
};

export default async function ProgramsPage() {
  const programs = await db.program.findMany({
    where: { isActive: true },
    orderBy: { order: "asc" },
  });

  return (
    <Section>
      <SectionHeading
        eyebrow="Programs"
        title="Find your fight"
        subtitle="From your first jab to sparring rounds — structured, coached, and beginner-friendly. All you need is shoes to work out in."
      />

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {programs.map((p) => (
          <ProgramCard key={p.slug} program={p} />
        ))}
      </div>

      <div className="mt-12">
        <CTAButton size="lg">Book Your Free Trial</CTAButton>
      </div>
    </Section>
  );
}
