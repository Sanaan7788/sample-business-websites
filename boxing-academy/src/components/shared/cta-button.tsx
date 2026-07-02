import Link from "next/link";
import { cn } from "@/lib/utils";

type CTAButtonProps = {
  href?: string;
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
  fullWidth?: boolean;
  className?: string;
  children: React.ReactNode;
};

const base =
  "inline-flex items-center justify-center rounded-md font-display font-semibold uppercase tracking-wide transition-colors duration-200 ease-[var(--ease-brand)] focus-visible:outline-none disabled:opacity-50";

const variants: Record<NonNullable<CTAButtonProps["variant"]>, string> = {
  primary: "bg-accent text-fg hover:bg-accent-hover",
  secondary: "border border-border bg-transparent text-fg hover:bg-surface",
  ghost: "bg-transparent text-fg hover:text-accent-text",
};

// Minimum 44px height for touch targets (docs/UI_UX_GUIDELINES.md §7).
const sizes: Record<NonNullable<CTAButtonProps["size"]>, string> = {
  sm: "h-11 px-4 text-sm",
  md: "h-12 px-6 text-base",
  lg: "h-14 px-8 text-lg",
};

/** Primary conversion button. See docs/COMPONENT_LIBRARY.md. */
export function CTAButton({
  href = "/trial",
  variant = "primary",
  size = "md",
  fullWidth,
  className,
  children,
}: CTAButtonProps) {
  return (
    <Link
      href={href}
      className={cn(base, variants[variant], sizes[size], fullWidth && "w-full", className)}
    >
      {children}
    </Link>
  );
}
