import Link from "next/link";
import { cn } from "@/lib/utils";

type Tier = {
  id: string;
  name: string;
  price: number;
  interval: string;
  features: string[];
  isHighlighted: boolean;
  cancellationNote: string | null;
};

const intervalLabel: Record<string, string> = {
  MONTH: "/mo",
  WEEK: "/wk",
  DROP_IN: " drop-in",
};

/**
 * Pricing tiers — enquiry only, no checkout (docs/DECISIONS.md ADR-001).
 * Each CTA routes to the trial/lead form.
 */
export function PricingTable({ tiers }: { tiers: Tier[] }) {
  return (
    <div className="grid gap-6 md:grid-cols-3">
      {tiers.map((tier) => (
        <div
          key={tier.id}
          className={cn(
            "bg-surface flex flex-col rounded-lg border p-6",
            tier.isHighlighted ? "border-accent" : "border-border",
          )}
        >
          {tier.isHighlighted && (
            <span className="bg-accent text-fg mb-3 inline-block w-fit rounded-full px-3 py-0.5 text-xs font-semibold tracking-wide uppercase">
              Most popular
            </span>
          )}
          <h2 className="font-display text-xl font-bold uppercase">{tier.name}</h2>
          <p className="mt-3">
            <span className="font-display text-4xl font-bold">${tier.price}</span>
            <span className="text-muted">{intervalLabel[tier.interval] ?? ""}</span>
          </p>
          <ul className="text-muted mt-4 flex-1 space-y-2 text-sm">
            {tier.features.map((f) => (
              <li key={f} className="flex gap-2">
                <span aria-hidden className="text-accent-text">
                  ✓
                </span>
                {f}
              </li>
            ))}
          </ul>
          {tier.cancellationNote && (
            <p className="text-muted mt-4 text-xs">{tier.cancellationNote}</p>
          )}
          <Link
            href="/trial"
            className={cn(
              "font-display mt-6 flex h-12 items-center justify-center rounded-md text-sm font-semibold tracking-wide uppercase transition-colors duration-200",
              tier.isHighlighted
                ? "bg-accent text-fg hover:bg-accent-hover"
                : "border-border text-fg hover:bg-charcoal border",
            )}
          >
            Get Started
          </Link>
        </div>
      ))}
    </div>
  );
}
