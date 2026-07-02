import { db } from "@/lib/db";
import { sendLeadNotification, sendLeadAutoReply } from "@/lib/email";
import { logger } from "@/lib/logger";
import type { LeadInput } from "@/lib/validation";

/**
 * Lead domain logic (docs/ARCHITECTURE.md §4). Persists the lead first — the lead
 * is the asset — then fires emails. Email failures are logged, never thrown, so a
 * delivery problem can't lose a lead (docs/RISKS.md RT-2).
 */
export async function createLead(input: LeadInput) {
  const lead = await db.lead.create({
    data: {
      name: input.name,
      email: input.email,
      phone: input.phone,
      preferredProgram: input.preferredProgram || null,
      message: input.message || null,
      source: input.source,
    },
  });

  logger.info("lead.created", { id: lead.id, source: lead.source });

  // Fire-and-forget emails (do not block or fail the request).
  void Promise.allSettled([sendLeadNotification(lead), sendLeadAutoReply(lead)]);

  return lead;
}
