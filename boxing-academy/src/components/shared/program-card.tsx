import Link from "next/link";

type Program = {
  slug: string;
  name: string;
  description: string;
  level: string;
  ageGroup: string;
  isWomensOnly: boolean;
};

const levelLabel: Record<string, string> = {
  BEGINNER: "Beginner",
  INTERMEDIATE: "Intermediate",
  ADVANCED: "Advanced",
  ALL: "All levels",
};

const ageLabel: Record<string, string> = {
  YOUTH: "Youth",
  ADULT: "Adult",
  ALL: "All ages",
};

/** Program summary card linking to the trial CTA. See docs/COMPONENT_LIBRARY.md. */
export function ProgramCard({ program }: { program: Program }) {
  const badges = [levelLabel[program.level], ageLabel[program.ageGroup]];
  if (program.isWomensOnly) badges.push("Women's only");

  return (
    <article className="border-border bg-surface hover:border-accent flex flex-col rounded-lg border p-6 transition-colors duration-200">
      <div className="mb-3 flex flex-wrap gap-2">
        {badges.map((b) => (
          <span
            key={b}
            className="border-border text-muted rounded-full border px-2.5 py-0.5 text-xs font-medium"
          >
            {b}
          </span>
        ))}
      </div>
      <h2 className="font-display text-xl font-bold uppercase">{program.name}</h2>
      <p className="text-muted mt-2 flex-1 text-sm leading-relaxed">{program.description}</p>
      <Link href="/trial" className="text-accent-text hover:text-fg mt-4 text-sm font-semibold">
        Try this program →
      </Link>
    </article>
  );
}
