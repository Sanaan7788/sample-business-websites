"use client";

import { useState } from "react";
import Link from "next/link";
import { site, navLinks } from "@/data/site";
import { CTAButton } from "@/components/shared/cta-button";
import { cn } from "@/lib/utils";

/** Sticky global navigation with a primary CTA + mobile drawer. */
export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="border-border bg-ink/90 sticky top-0 z-40 border-b backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
        <Link href="/" className="font-display text-xl font-bold tracking-tight uppercase">
          Cactus<span className="text-accent-text">Boxing</span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-8 md:flex" aria-label="Primary">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-muted hover:text-fg text-sm font-medium transition-colors duration-200"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:block">
          <CTAButton size="sm">Book Free Trial</CTAButton>
        </div>

        {/* Mobile toggle */}
        <button
          type="button"
          className="flex h-11 w-11 items-center justify-center md:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <span className="relative block h-4 w-6">
            <span
              className={cn(
                "bg-fg absolute top-0 left-0 h-0.5 w-6 transition-transform duration-200",
                open && "translate-y-[7px] rotate-45",
              )}
            />
            <span
              className={cn(
                "bg-fg absolute top-[7px] left-0 h-0.5 w-6 transition-opacity duration-200",
                open && "opacity-0",
              )}
            />
            <span
              className={cn(
                "bg-fg absolute bottom-0 left-0 h-0.5 w-6 transition-transform duration-200",
                open && "-translate-y-[7px] -rotate-45",
              )}
            />
          </span>
        </button>
      </div>

      {/* Mobile drawer */}
      {open && (
        <nav className="border-border bg-ink border-t px-4 py-4 md:hidden" aria-label="Mobile">
          <ul className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-muted hover:bg-surface hover:text-fg block rounded-md px-3 py-3 text-base font-medium"
                  onClick={() => setOpen(false)}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-4">
            <CTAButton fullWidth size="md">
              Book Free Trial
            </CTAButton>
          </div>
          <a
            href={site.phoneHref}
            className="text-muted hover:text-fg mt-3 block text-center text-sm"
          >
            Call {site.phone}
          </a>
        </nav>
      )}
    </header>
  );
}
