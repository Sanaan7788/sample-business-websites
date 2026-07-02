import Link from "next/link";
import { site } from "@/data/site";

/**
 * Persistent bottom CTA bar, mobile only — keeps the conversion funnel one tap
 * away at all times (docs/UI_UX_GUIDELINES.md §7, FR-4).
 */
export function StickyMobileCTA() {
  return (
    <div className="border-border bg-ink/95 fixed inset-x-0 bottom-0 z-50 border-t p-3 backdrop-blur md:hidden">
      <div className="flex gap-3">
        <a
          href={site.phoneHref}
          className="border-border font-display text-fg flex h-12 flex-1 items-center justify-center rounded-md border text-sm font-semibold tracking-wide uppercase"
        >
          Call
        </a>
        <Link
          href="/trial"
          className="bg-accent font-display text-fg hover:bg-accent-hover flex h-12 flex-[2] items-center justify-center rounded-md text-sm font-semibold tracking-wide uppercase transition-colors duration-200"
        >
          Book Free Trial
        </Link>
      </div>
    </div>
  );
}
