import { site } from "@/data/site";
import { CTAButton } from "@/components/shared/cta-button";
import { Section } from "@/components/shared/section";

/**
 * Static homepage sections following the AIDA layout
 * (docs/research-website.md §8, docs/COMPONENT_LIBRARY.md).
 * DB-driven sections (Programs, Schedule, Coaches) live in the home page itself.
 */

export function Hero() {
  return (
    <section className="border-border bg-ink relative overflow-hidden border-b">
      <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 md:py-36">
        <p className="font-display text-accent-text text-sm font-semibold tracking-widest uppercase">
          {site.city}, {site.region} · Boxing Gym
        </p>
        <h1 className="mt-3 max-w-3xl text-4xl leading-[1.05] font-bold uppercase sm:text-6xl md:text-7xl">
          Step in. <span className="text-accent-text">Throw down.</span> Find your fight.
        </h1>
        <p className="text-muted mt-5 max-w-xl text-lg">{site.description}</p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <CTAButton size="lg">Book Free Trial</CTAButton>
          <CTAButton href="/schedule" variant="secondary" size="lg">
            View Schedule
          </CTAButton>
        </div>
      </div>
    </section>
  );
}

export function TrustBanner() {
  const stats = [
    { value: "Mon–Fri", label: "AM & PM classes" },
    { value: "All levels", label: "Beginner to fighter" },
    { value: "1-on-1", label: "Personal training" },
    { value: "Gulfton", label: "Houston, TX" },
  ];
  return (
    <section className="border-border bg-charcoal border-b">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-6 px-4 py-8 sm:px-6 md:grid-cols-4">
        {stats.map((s) => (
          <div key={s.label} className="text-center">
            <p className="font-display text-accent-text text-2xl font-bold uppercase">{s.value}</p>
            <p className="text-muted mt-1 text-sm">{s.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export function WhyUs() {
  const reasons = [
    {
      title: "Real coaching",
      body: "Technical, hands-on instruction from people who actually box — not a follow-along workout.",
    },
    {
      title: "Ego-free room",
      body: "Beginners and fighters train side by side. No intimidation, no judgment — just work.",
    },
    {
      title: "Easy to start",
      body: "All you need is shoes to work out in. Book a free trial and we'll handle the rest.",
    },
  ];
  return (
    <Section>
      <div className="grid gap-8 md:grid-cols-3">
        {reasons.map((r) => (
          <div key={r.title}>
            <h2 className="font-display text-accent-text text-xl font-bold uppercase">{r.title}</h2>
            <p className="text-muted mt-2">{r.body}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}

export function FinalCTA() {
  return (
    <section className="border-border bg-charcoal border-t">
      <div className="mx-auto max-w-7xl px-4 py-20 text-center sm:px-6">
        <h2 className="text-3xl font-bold uppercase sm:text-4xl">
          Your first class is <span className="text-accent-text">free</span>
        </h2>
        <p className="text-muted mx-auto mt-3 max-w-xl">
          Come see what a real boxing gym feels like. No pressure, no commitment.
        </p>
        <div className="mt-8 flex justify-center">
          <CTAButton size="lg">Book Free Trial</CTAButton>
        </div>
      </div>
    </section>
  );
}
