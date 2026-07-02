import { site } from "@/data/site";

/**
 * Google Maps embed + directions link (FR-5). Uses the keyless query-embed
 * endpoint, so no API key is required (docs/ARCHITECTURE.md §5).
 */
export function MapEmbed({ className }: { className?: string }) {
  const src = `https://maps.google.com/maps?q=${encodeURIComponent(
    site.maps.embedQuery,
  )}&output=embed`;

  return (
    <div className={className}>
      <div className="border-border overflow-hidden rounded-lg border">
        <iframe
          title={`Map to ${site.name}`}
          src={src}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="h-72 w-full border-0 grayscale-[30%]"
          allowFullScreen
        />
      </div>
      <a
        href={site.maps.directionsUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="text-accent-text hover:text-fg mt-3 inline-block text-sm font-semibold"
      >
        Get Directions →
      </a>
    </div>
  );
}
