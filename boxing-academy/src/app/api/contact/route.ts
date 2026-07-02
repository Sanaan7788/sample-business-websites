import { NextRequest, NextResponse } from "next/server";
import { contactSchema, fieldErrors } from "@/lib/validation";
import { createLead } from "@/server/leadService";
import { rateLimit } from "@/lib/rate-limit";
import { logger } from "@/lib/logger";

/**
 * POST /api/contact — general enquiry (docs/API_SPECIFICATION.md §2).
 * Persists a Lead with source=CONTACT (same service as the trial form) and emails
 * the gym. Rate-limited + honeypot. Returns 201 / 400 / 422 / 429 / 500.
 */
export async function POST(req: NextRequest) {
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    req.headers.get("x-real-ip") ??
    "unknown";

  const limit = rateLimit(`contact:${ip}`, { limit: 5, windowMs: 60_000 });
  if (!limit.ok) {
    logger.warn("contact.rate_limited", { ip });
    return NextResponse.json(
      { error: "Too many requests. Please try again shortly." },
      { status: 429, headers: { "Retry-After": String(limit.retryAfterSec) } },
    );
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Please fix the highlighted fields.", fields: fieldErrors(parsed.error) },
      { status: 422 },
    );
  }

  // Honeypot filled → silently accept, don't persist.
  if (parsed.data.company) {
    logger.warn("contact.honeypot_tripped", { ip });
    return NextResponse.json({ data: { ok: true } }, { status: 201 });
  }

  try {
    const lead = await createLead(parsed.data);
    return NextResponse.json({ data: { id: lead.id } }, { status: 201 });
  } catch (err) {
    logger.error("contact.create_failed", { ip, error: String(err) });
    return NextResponse.json(
      { error: "Something went wrong. Please try again or call us." },
      { status: 500 },
    );
  }
}
