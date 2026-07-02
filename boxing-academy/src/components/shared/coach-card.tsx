import Image from "next/image";

type Coach = {
  slug: string;
  name: string;
  bio: string;
  record: string | null;
  certifications: string[];
  headshotUrl: string | null;
};

/** Coach profile card. Falls back to an initials avatar when no headshot is set. */
export function CoachCard({ coach }: { coach: Coach }) {
  const initials = coach.name
    .split(" ")
    .map((w) => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <article className="border-border bg-surface overflow-hidden rounded-lg border">
      <div className="bg-charcoal relative aspect-[4/5]">
        {coach.headshotUrl ? (
          <Image
            src={coach.headshotUrl}
            alt={`${coach.name}, coach at the gym`}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover"
          />
        ) : (
          <div
            aria-hidden
            className="font-display text-muted flex h-full w-full items-center justify-center text-6xl font-bold"
          >
            {initials}
          </div>
        )}
        {coach.record && (
          <span className="bg-accent text-fg absolute bottom-3 left-3 rounded-full px-3 py-1 text-xs font-semibold tracking-wide uppercase">
            {coach.record}
          </span>
        )}
      </div>
      <div className="p-5">
        <h2 className="font-display text-xl font-bold uppercase">{coach.name}</h2>
        <p className="text-muted mt-2 text-sm leading-relaxed">{coach.bio}</p>
        {coach.certifications.length > 0 && (
          <ul className="mt-3 flex flex-wrap gap-2">
            {coach.certifications.map((c) => (
              <li
                key={c}
                className="border-border text-muted rounded-full border px-2.5 py-0.5 text-xs"
              >
                {c}
              </li>
            ))}
          </ul>
        )}
      </div>
    </article>
  );
}
