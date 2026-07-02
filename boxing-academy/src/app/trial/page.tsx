import type { Metadata } from "next";
import { site } from "@/data/site";
import { db } from "@/lib/db";
import { LeadForm } from "@/components/shared/lead-form";

export const metadata: Metadata = {
  title: "Book a Free Trial Class",
  description: `Book your free trial boxing class at ${site.name} in ${site.city}.`,
};

// Distraction-free conversion page (docs/IMPLEMENTATION_PLAN.md 1.4.3).
// Server component: loads active programs to populate the form's select.
export default async function TrialPage() {
  const programs = await db.program.findMany({
    where: { isActive: true },
    orderBy: { order: "asc" },
    select: { slug: true, name: true },
  });

  return (
    <section className="mx-auto max-w-2xl px-4 py-20 sm:px-6 md:py-24">
      <h1 className="text-4xl font-bold uppercase sm:text-5xl">Book your free trial</h1>
      <p className="text-muted mt-4 text-lg">
        {site.trialOffer}. Drop your details and we&apos;ll get you set up — all you need is shoes
        to work out in.
      </p>

      <div className="mt-10">
        <LeadForm source="TRIAL" programs={programs} />
      </div>

      <p className="text-muted mt-8 text-center text-sm">
        Prefer to talk? Call{" "}
        <a
          href={site.phoneHref}
          className="text-accent-text hover:text-fg underline underline-offset-2"
        >
          {site.phone}
        </a>
        .
      </p>
    </section>
  );
}
