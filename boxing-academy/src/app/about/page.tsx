import type { Metadata } from "next";
import { site } from "@/data/site";
import { Section, SectionHeading } from "@/components/shared/section";
import { CTAButton } from "@/components/shared/cta-button";

export const metadata: Metadata = {
  title: "About Us",
  description: `About ${site.name} — a boxing gym in ${site.city}'s Gulfton neighborhood built on real coaching and an ego-free environment.`,
};

const values = [
  {
    title: "Ego-free",
    body: "Everyone starts somewhere. Beginners and fighters train side by side — no intimidation, no judgment.",
  },
  {
    title: "Real coaching",
    body: "Hands-on, technical instruction. We care about your fundamentals, not just making you sweat.",
  },
  {
    title: "All you need is shoes",
    body: "We keep it simple. Show up ready to work and we'll handle the rest.",
  },
];

export default function AboutPage() {
  return (
    <>
      <Section>
        <SectionHeading
          eyebrow="About"
          title="Boxing, done right, in Houston"
          subtitle={`${site.name} is a boxing gym in ${site.city}'s Gulfton neighborhood. We blend authentic fight training with a welcoming, beginner-friendly environment — whether you're chasing fitness, technique, or competition.`}
        />
        <p className="text-muted max-w-2xl">
          Find us at {site.address.full}. Group classes run Monday through Friday, morning and
          evening, with personal training available for focused, one-on-one progress.
        </p>
      </Section>

      <Section alt>
        <div className="grid gap-8 md:grid-cols-3">
          {values.map((v) => (
            <div key={v.title}>
              <h2 className="font-display text-accent-text text-xl font-bold uppercase">
                {v.title}
              </h2>
              <p className="text-muted mt-2">{v.body}</p>
            </div>
          ))}
        </div>
        <div className="mt-12">
          <CTAButton size="lg">Book Your Free Trial</CTAButton>
        </div>
      </Section>
    </>
  );
}
