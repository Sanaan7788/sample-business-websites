/**
 * Injects a JSON-LD <script> for structured data (docs/COMPONENT_LIBRARY.md).
 * Content is built by src/lib/seo.ts.
 */
export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      // JSON-LD is trusted, server-generated structured data.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
