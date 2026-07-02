import { Resend } from "resend";
import { site } from "@/data/site";
import { logger } from "@/lib/logger";

/**
 * Transactional email via Resend (docs/DECISIONS.md ADR-005).
 *
 * Stub-safe: with no RESEND_API_KEY the helpers LOG the email instead of sending,
 * so the lead funnel works end-to-end before the sending domain is verified
 * (docs/RISKS.md RT-2). Email failures never throw to the caller — the lead is
 * the asset and must persist regardless.
 */

const apiKey = process.env.RESEND_API_KEY;
const from = process.env.EMAIL_FROM ?? `${site.name} <onboarding@resend.dev>`;
const gymInbox = process.env.GYM_NOTIFY_EMAIL ?? site.email;

const resend = apiKey ? new Resend(apiKey) : null;

type LeadEmailData = {
  name: string;
  email: string;
  phone: string;
  preferredProgram?: string | null;
  message?: string | null;
  source: string;
};

async function send(args: { to: string; subject: string; html: string; replyTo?: string }) {
  if (!resend) {
    logger.warn("email.stubbed", { to: args.to, subject: args.subject });
    return { stubbed: true as const };
  }
  try {
    const { data, error } = await resend.emails.send({
      from,
      to: args.to,
      subject: args.subject,
      html: args.html,
      replyTo: args.replyTo,
    });
    if (error) {
      logger.error("email.send_failed", { to: args.to, error: error.message });
      return { error };
    }
    logger.info("email.sent", { to: args.to, id: data?.id });
    return { id: data?.id };
  } catch (err) {
    logger.error("email.send_threw", { to: args.to, error: String(err) });
    return { error: err };
  }
}

/** Notify the gym of a new lead. */
export function sendLeadNotification(lead: LeadEmailData) {
  const rows = [
    ["Name", lead.name],
    ["Email", lead.email],
    ["Phone", lead.phone],
    ["Program", lead.preferredProgram || "—"],
    ["Source", lead.source],
    ["Message", lead.message || "—"],
  ]
    .map(([k, v]) => `<tr><td><strong>${k}</strong></td><td>${v}</td></tr>`)
    .join("");

  return send({
    to: gymInbox,
    replyTo: lead.email,
    subject: `New ${lead.source.toLowerCase()} lead: ${lead.name}`,
    html: `<h2>New lead — ${site.name}</h2><table cellpadding="6">${rows}</table>`,
  });
}

/** Auto-reply to the prospect so they know we received it. */
export function sendLeadAutoReply(lead: LeadEmailData) {
  return send({
    to: lead.email,
    subject: `Thanks for reaching out to ${site.name}`,
    html: `
      <h2>You're in, ${lead.name.split(" ")[0]} 🥊</h2>
      <p>Thanks for your interest in ${site.name}. We received your request and will
      reach out shortly to get you booked in.</p>
      <p>Can't wait? Call us at <a href="${site.phoneHref}">${site.phone}</a>.</p>
      <p>— Team ${site.name}<br/>${site.address.full}</p>`,
  });
}
