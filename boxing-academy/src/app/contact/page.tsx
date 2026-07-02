import type { Metadata } from "next";
import { site } from "@/data/site";
import { Section, SectionHeading } from "@/components/shared/section";
import { ContactForm } from "@/components/shared/contact-form";
import { MapEmbed } from "@/components/shared/map-embed";

export const metadata: Metadata = {
  title: "Contact & Location",
  description: `Visit ${site.name} at ${site.address.full}. Call ${site.phone}, get directions, or send us a message.`,
};

export default function ContactPage() {
  return (
    <Section>
      <SectionHeading
        eyebrow="Contact"
        title="Come train with us"
        subtitle="Questions, or ready to book? Drop a message, call, or just stop by the gym."
      />

      <div className="grid gap-12 lg:grid-cols-2">
        {/* Details + map */}
        <div className="space-y-8">
          <div>
            <h2 className="font-display text-lg font-bold uppercase">Find us</h2>
            <address className="text-muted mt-3 not-italic">
              {site.address.street}
              <br />
              {site.address.city}, {site.address.region} {site.address.postalCode}
            </address>
            <p className="text-muted mt-3">
              <a
                href={site.phoneHref}
                className="text-accent-text hover:text-fg underline underline-offset-2"
              >
                {site.phone}
              </a>
              <br />
              <a href={`mailto:${site.email}`} className="hover:text-fg">
                {site.email}
              </a>
            </p>
          </div>

          <div>
            <h2 className="font-display text-lg font-bold uppercase">Hours</h2>
            <ul className="text-muted mt-3 space-y-1 text-sm">
              {site.hours.map((h) => (
                <li key={h.day} className="border-border flex justify-between gap-4 border-b py-1">
                  <span>{h.day}</span>
                  <span className="text-right">{h.value}</span>
                </li>
              ))}
            </ul>
          </div>

          <MapEmbed />
        </div>

        {/* Form */}
        <div>
          <h2 className="font-display mb-4 text-lg font-bold uppercase">Send a message</h2>
          <ContactForm />
        </div>
      </div>
    </Section>
  );
}
