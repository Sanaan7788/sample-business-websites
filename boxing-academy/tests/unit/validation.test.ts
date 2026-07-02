import { describe, it, expect } from "vitest";
import { leadSchema, contactSchema, fieldErrors } from "@/lib/validation";

const validLead = {
  name: "Jane Doe",
  email: "jane@example.com",
  phone: "832-555-0100",
  source: "TRIAL" as const,
};

describe("leadSchema", () => {
  it("accepts a valid lead", () => {
    const r = leadSchema.safeParse(validLead);
    expect(r.success).toBe(true);
  });

  it("rejects a missing name", () => {
    const r = leadSchema.safeParse({ ...validLead, name: "" });
    expect(r.success).toBe(false);
    if (!r.success) expect(fieldErrors(r.error).name).toMatch(/name/i);
  });

  it("rejects an invalid email", () => {
    const r = leadSchema.safeParse({ ...validLead, email: "not-an-email" });
    expect(r.success).toBe(false);
    if (!r.success) expect(fieldErrors(r.error).email).toMatch(/valid email/i);
  });

  it("rejects a too-short phone", () => {
    const r = leadSchema.safeParse({ ...validLead, phone: "12" });
    expect(r.success).toBe(false);
  });

  it("defaults source to TRIAL", () => {
    const { source, ...noSource } = validLead;
    void source;
    const r = leadSchema.safeParse(noSource);
    expect(r.success).toBe(true);
    if (r.success) expect(r.data.source).toBe("TRIAL");
  });

  it("trims whitespace from name", () => {
    const r = leadSchema.safeParse({ ...validLead, name: "  Jane  " });
    expect(r.success).toBe(true);
    if (r.success) expect(r.data.name).toBe("Jane");
  });

  it("allows an empty honeypot but keeps the value for the route to inspect", () => {
    const r = leadSchema.safeParse({ ...validLead, company: "" });
    expect(r.success).toBe(true);
  });

  it("does not reject a filled honeypot at the schema level (route handles it)", () => {
    const r = leadSchema.safeParse({ ...validLead, company: "SpamCorp" });
    expect(r.success).toBe(true);
    if (r.success) expect(r.data.company).toBe("SpamCorp");
  });
});

describe("contactSchema", () => {
  it("requires a message", () => {
    const r = contactSchema.safeParse({ ...validLead, source: "CONTACT", message: "" });
    expect(r.success).toBe(false);
    if (!r.success) expect(fieldErrors(r.error).message).toMatch(/message/i);
  });

  it("accepts a valid contact with a message", () => {
    const r = contactSchema.safeParse({
      ...validLead,
      source: "CONTACT",
      message: "Hi, I'd like to try a class.",
    });
    expect(r.success).toBe(true);
  });
});

describe("fieldErrors", () => {
  it("flattens to first error per field", () => {
    const r = leadSchema.safeParse({ name: "", email: "bad", phone: "" });
    expect(r.success).toBe(false);
    if (!r.success) {
      const errs = fieldErrors(r.error);
      expect(Object.keys(errs)).toEqual(expect.arrayContaining(["name", "email", "phone"]));
    }
  });
});
