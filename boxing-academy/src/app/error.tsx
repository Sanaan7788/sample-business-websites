"use client";

import { useEffect } from "react";
import { CTAButton } from "@/components/shared/cta-button";

// Root error boundary (docs/IMPLEMENTATION_PLAN.md 1.1.2).
export default function Error({ reset }: { error: Error; reset: () => void }) {
  useEffect(() => {
    // Client-side errors surface here; server logs capture the detail.
  }, []);

  return (
    <section className="mx-auto flex max-w-2xl flex-col items-center gap-6 px-4 py-32 text-center sm:px-6">
      <h1 className="text-3xl font-bold uppercase">Something went wrong</h1>
      <p className="text-muted">
        We hit an unexpected error. Try again, or call us and we&apos;ll help.
      </p>
      <div className="flex flex-col gap-3 sm:flex-row">
        <button
          onClick={reset}
          className="bg-accent font-display text-fg hover:bg-accent-hover flex h-12 items-center justify-center rounded-md px-6 text-sm font-semibold tracking-wide uppercase transition-colors"
        >
          Try Again
        </button>
        <CTAButton href="/" variant="secondary" size="md">
          Back to Home
        </CTAButton>
      </div>
    </section>
  );
}
