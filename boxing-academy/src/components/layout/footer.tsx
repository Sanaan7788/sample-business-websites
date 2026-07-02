import Link from "next/link";
import { site, navLinks } from "@/data/site";

/** Global footer: NAP, hours, social, secondary nav. */
export function Footer() {
  return (
    <footer className="border-border bg-charcoal mt-auto border-t">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-4">
        {/* Brand + NAP */}
        <div className="md:col-span-2">
          <span className="font-display text-xl font-bold tracking-tight uppercase">
            Cactus<span className="text-accent-text">Boxing</span>
          </span>
          <address className="text-muted mt-4 text-sm leading-relaxed not-italic">
            {site.address.street}
            <br />
            {site.address.city}, {site.address.region} {site.address.postalCode}
            <br />
            <a href={site.phoneHref} className="hover:text-fg">
              {site.phone}
            </a>
            <br />
            <a href={`mailto:${site.email}`} className="hover:text-fg">
              {site.email}
            </a>
          </address>
          <a
            href={site.maps.directionsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent-text hover:text-fg mt-4 inline-block text-sm font-medium"
          >
            Get Directions →
          </a>
        </div>

        {/* Nav */}
        <div>
          <h2 className="font-display text-sm font-semibold tracking-wide uppercase">Explore</h2>
          <ul className="mt-4 space-y-2 text-sm">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="text-muted hover:text-fg">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Hours + social */}
        <div>
          <h2 className="font-display text-sm font-semibold tracking-wide uppercase">Hours</h2>
          <ul className="text-muted mt-4 space-y-1 text-sm">
            {site.hours.map((h) => (
              <li key={h.day} className="flex justify-between gap-4">
                <span>{h.day.slice(0, 3)}</span>
                <span className="text-right">{h.value}</span>
              </li>
            ))}
          </ul>
          <div className="mt-4 flex gap-4 text-sm">
            <a
              href={site.social.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted hover:text-fg"
            >
              Instagram
            </a>
            <a
              href={site.social.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted hover:text-fg"
            >
              Facebook
            </a>
          </div>
        </div>
      </div>

      <div className="border-border border-t">
        <div className="text-muted mx-auto max-w-7xl px-4 py-6 text-xs sm:px-6">
          © {new Date().getFullYear()} {site.name}. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
