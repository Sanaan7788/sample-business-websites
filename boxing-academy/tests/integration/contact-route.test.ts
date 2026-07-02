import { describe, it, expect, vi, beforeEach } from "vitest";
import { NextRequest } from "next/server";

const createLead = vi.fn();
vi.mock("@/server/leadService", () => ({ createLead: (...a: unknown[]) => createLead(...a) }));

import { POST } from "@/app/api/contact/route";

function post(body: unknown, ip = `2.3.4.${Math.floor(Math.random() * 250)}`) {
  return new NextRequest("http://localhost/api/contact", {
    method: "POST",
    headers: { "content-type": "application/json", "x-forwarded-for": ip },
    body: JSON.stringify(body),
  });
}

const valid = {
  name: "John Smith",
  email: "john@example.com",
  phone: "832-555-0177",
  message: "I'd like to know more about classes.",
  source: "CONTACT",
};

beforeEach(() => {
  createLead.mockReset();
  createLead.mockResolvedValue({ id: "contact-1" });
});

describe("POST /api/contact", () => {
  it("creates a CONTACT lead and returns 201", async () => {
    const res = await POST(post(valid));
    expect(res.status).toBe(201);
    expect(createLead).toHaveBeenCalledOnce();
    expect(createLead.mock.calls[0][0]).toMatchObject({ source: "CONTACT" });
  });

  it("requires a message (422)", async () => {
    const res = await POST(post({ ...valid, message: "" }));
    expect(res.status).toBe(422);
    const body = await res.json();
    expect(body.fields).toHaveProperty("message");
    expect(createLead).not.toHaveBeenCalled();
  });

  it("silently drops a honeypot hit", async () => {
    const res = await POST(post({ ...valid, company: "Bot Inc" }));
    expect(res.status).toBe(201);
    expect(createLead).not.toHaveBeenCalled();
  });
});
