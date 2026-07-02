import { z } from "zod";

/**
 * Shared validation schemas (client + server) — keeps rules DRY.
 * See docs/API_SPECIFICATION.md §1 and docs/REQUIREMENTS.md FR-6..FR-11.
 */

export const LEAD_SOURCES = ["TRIAL", "CONTACT", "MEMBERSHIP"] as const;

/**
 * Lead capture (free trial / membership enquiry).
 * `company` is a honeypot: real users never see/fill it, bots do (FR-10).
 */
export const leadSchema = z.object({
  name: z.string().trim().min(1, "Please enter your name").max(100),
  email: z.string().trim().email("Enter a valid email address").max(200),
  phone: z
    .string()
    .trim()
    .min(7, "Enter a valid phone number")
    .max(30)
    .regex(/^[0-9+()\-.\s]+$/, "Enter a valid phone number"),
  preferredProgram: z.string().trim().max(100).optional().or(z.literal("")),
  message: z.string().trim().max(1000).optional().or(z.literal("")),
  source: z.enum(LEAD_SOURCES).default("TRIAL"),
  // Honeypot — accepted by the schema, but the API rejects any non-empty value.
  // Kept lax here so a bot-tripped submission can be handled (silently) by the
  // route rather than surfacing a validation error.
  company: z.string().optional(),
});

export type LeadInput = z.infer<typeof leadSchema>;

/** Contact form reuses the lead shape with source pinned to CONTACT. */
export const contactSchema = leadSchema.extend({
  source: z.literal("CONTACT").default("CONTACT"),
  message: z.string().trim().min(1, "Please enter a message").max(1000),
});

export type ContactInput = z.infer<typeof contactSchema>;

/** Flatten a ZodError into `{ field: message }` for API responses + UI. */
export function fieldErrors(error: z.ZodError): Record<string, string> {
  const out: Record<string, string> = {};
  for (const issue of error.issues) {
    const key = issue.path[0];
    if (typeof key === "string" && !out[key]) out[key] = issue.message;
  }
  return out;
}
