import { describe, it, expect } from "vitest";
import { healthClubSchema, faqPageSchema } from "@/lib/seo";
import { site } from "@/data/site";

describe("healthClubSchema", () => {
  const schema = healthClubSchema();

  it("is a HealthClub with required local-business fields", () => {
    expect(schema["@type"]).toBe("HealthClub");
    expect(schema.name).toBe(site.name);
    expect(schema.telephone).toBe(site.phone);
    expect(schema.priceRange).toBeTruthy();
  });

  it("includes a structured postal address (NAP)", () => {
    const addr = schema.address as Record<string, string>;
    expect(addr["@type"]).toBe("PostalAddress");
    expect(addr.addressLocality).toBe(site.address.city);
    expect(addr.postalCode).toBe(site.address.postalCode);
  });

  it("includes opening hours and social profiles", () => {
    expect(Array.isArray(schema.openingHoursSpecification)).toBe(true);
    expect(schema.sameAs).toContain(site.social.instagram);
  });
});

describe("faqPageSchema", () => {
  it("maps FAQs into Question/Answer entities", () => {
    const faqs = [{ question: "Q1?", answer: "A1." }];
    const schema = faqPageSchema(faqs);
    expect(schema["@type"]).toBe("FAQPage");
    const entity = (schema.mainEntity as Array<Record<string, unknown>>)[0];
    expect(entity["@type"]).toBe("Question");
    expect(entity.name).toBe("Q1?");
    expect((entity.acceptedAnswer as Record<string, string>).text).toBe("A1.");
  });
});
