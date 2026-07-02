import { describe, it, expect } from "vitest";
import { rateLimit } from "@/lib/rate-limit";

describe("rateLimit", () => {
  it("allows requests under the limit", () => {
    const key = `t-${Math.random()}`;
    expect(rateLimit(key, { limit: 3 }).ok).toBe(true);
    expect(rateLimit(key, { limit: 3 }).ok).toBe(true);
    expect(rateLimit(key, { limit: 3 }).ok).toBe(true);
  });

  it("blocks once the limit is exceeded", () => {
    const key = `t-${Math.random()}`;
    rateLimit(key, { limit: 2 });
    rateLimit(key, { limit: 2 });
    const blocked = rateLimit(key, { limit: 2 });
    expect(blocked.ok).toBe(false);
    expect(blocked.retryAfterSec).toBeGreaterThan(0);
  });

  it("decrements remaining count", () => {
    const key = `t-${Math.random()}`;
    expect(rateLimit(key, { limit: 5 }).remaining).toBe(4);
    expect(rateLimit(key, { limit: 5 }).remaining).toBe(3);
  });

  it("resets after the window elapses", () => {
    const key = `t-${Math.random()}`;
    rateLimit(key, { limit: 1, windowMs: 1 });
    // window of 1ms has elapsed by the next tick
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        expect(rateLimit(key, { limit: 1, windowMs: 1 }).ok).toBe(true);
        resolve();
      }, 5);
    });
  });

  it("isolates separate keys", () => {
    const a = `a-${Math.random()}`;
    const b = `b-${Math.random()}`;
    rateLimit(a, { limit: 1 });
    expect(rateLimit(a, { limit: 1 }).ok).toBe(false);
    expect(rateLimit(b, { limit: 1 }).ok).toBe(true);
  });
});
