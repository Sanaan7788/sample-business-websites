import { cn } from "@/lib/utils";

/** Full-width section with consistent vertical rhythm (docs/UI_UX_GUIDELINES.md §4). */
export function Section({
  id,
  alt,
  className,
  children,
}: {
  id?: string;
  alt?: boolean; // charcoal alternate background
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className={cn(alt && "bg-charcoal", className)}>
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 md:py-24">{children}</div>
    </section>
  );
}

/** Eyebrow + title + optional subtitle. */
export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "left",
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
}) {
  return (
    <div className={cn("mb-10 max-w-2xl", align === "center" && "mx-auto text-center")}>
      {eyebrow && (
        <p className="font-display text-accent-text text-sm font-semibold tracking-widest uppercase">
          {eyebrow}
        </p>
      )}
      <h1 className="mt-2 text-3xl font-bold uppercase sm:text-4xl md:text-5xl">{title}</h1>
      {subtitle && <p className="text-muted mt-4 text-lg">{subtitle}</p>}
    </div>
  );
}
