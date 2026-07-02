import type { Metadata } from "next";
import { site } from "@/data/site";
import { faqs } from "@/data/faq";
import { Section, SectionHeading } from "@/components/shared/section";
import { FAQAccordion } from "@/components/shared/faq-accordion";
import { JsonLd } from "@/components/shared/json-ld";
import { faqPageSchema } from "@/lib/seo";
import { CTAButton } from "@/components/shared/cta-button";

export const metadata: Metadata = {
  title: "FAQ",
  description: `Common questions about boxing classes, booking a free trial, and getting started at ${site.name} in ${site.city}.`,
};

export default function FaqPage() {
  return (
    <Section>
      <JsonLd data={faqPageSchema(faqs)} />
      <SectionHeading
        eyebrow="FAQ"
        title="Questions, answered"
        subtitle="New to boxing? Here's what most people want to know before their first class."
      />

      <div className="max-w-3xl">
        <FAQAccordion items={faqs} />
      </div>

      <div className="mt-12">
        <CTAButton size="lg">Book Your Free Trial</CTAButton>
      </div>
    </Section>
  );
}
