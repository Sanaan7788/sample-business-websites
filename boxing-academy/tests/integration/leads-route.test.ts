import { describe, it, expect, vi, beforeEach } from "vitest";
import { NextRequest } from "next/server";

// Mock the service layer so the route is tested in isolation (no DB/email).
const createLead = vi.fn();
vi.mock("@/server/leadService", () => ({ createLead: (...a: unknown[]) => createLead(...a) }));

import { POST } from "@/app/api/leads/route";

function post(body: unknown, ip = `1.2.3.${Math.floor(Math.random() * 250)}`) {
  return new NextRequest("http://localhost/api/leads", {
    method: "POST",
    headers: { "content-type": "application/json", "x-forwarded-for": ip },
    body: JSON.stringify(body),
  });
}

const valid = {
  name: "Jane Doe",
  email: "jane@example.com",
  phone: "832-555-0100",
  source: "TRIAL",
};

beforeEach(() => {
  createLead.mockReset();
  createLead.mockResolvedValue({ id: "lead-123" });
});

describe("POST /api/leads", () => {
  it("creates a lead and returns 201 with id", async () => {
    const res = await POST(post(valid));
    expect(res.status).toBe(201);
    expect(await res.json()).toEqual({ data: { id: "lead-123" } });
    expect(createLead).toHaveBeenCalledOnce();
  });

  it("returns 422 with field errors for invalid input", async () => {
    const res = await POST(post({ name: "", email: "bad", phone: "" }));
    expect(res.status).toBe(422);
    const body = await res.json();
    expect(body.fields).toHaveProperty("email");
    expect(createLead).not.toHaveBeenCalled();
  });

  it("silently accepts a honeypot hit without persisting", async () => {
    const res = await POST(post({ ...valid, company: "SpamCorp" }));
    expect(res.status).toBe(201);
    expect(createLead).not.toHaveBeenCalled();
  });

  it("returns 400 on malformed JSON", async () => {
    const req = new NextRequest("http://localhost/api/leads", {
      method: "POST",
      headers: { "content-type": "application/json", "x-forwarded-for": "9.9.9.9" },
      body: "{not json",
    });
    const res = await POST(req);
    expect(res.status).toBe(400);
  });

  it("rate-limits after 5 requests from the same IP", async () => {
    const ip = "5.5.5.5";
    for (let i = 0; i < 5; i++) {
      const ok = await POST(post(valid, ip));
      expect(ok.status).toBe(201);
    }
    const sixth = await POST(post(valid, ip));
    expect(sixth.status).toBe(429);
    expect(sixth.headers.get("Retry-After")).toBeTruthy();
  });

  it("returns 500 if the service throws", async () => {
    createLead.mockRejectedValueOnce(new Error("db down"));
    const res = await POST(post(valid));
    expect(res.status).toBe(500);
  });
});
