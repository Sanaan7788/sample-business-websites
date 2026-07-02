type FaqItem = { question: string; answer: string };

/**
 * Accessible FAQ accordion using native <details>/<summary> — keyboard- and
 * screen-reader-friendly with no JS. Drives FAQPage schema via the same data
 * (docs/SEO_STRATEGY.md §3).
 */
export function FAQAccordion({ items }: { items: readonly FaqItem[] }) {
  return (
    <div className="divide-border border-border divide-y overflow-hidden rounded-lg border">
      {items.map((item) => (
        <details key={item.question} className="group bg-surface">
          <summary className="font-display hover:text-accent-text flex cursor-pointer list-none items-center justify-between gap-4 p-5 font-semibold uppercase transition-colors">
            {item.question}
            <span
              aria-hidden
              className="text-accent-text transition-transform duration-200 group-open:rotate-45"
            >
              +
            </span>
          </summary>
          <p className="text-muted px-5 pb-5">{item.answer}</p>
        </details>
      ))}
    </div>
  );
}
