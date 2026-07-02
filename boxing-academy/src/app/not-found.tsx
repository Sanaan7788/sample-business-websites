import { CTAButton } from "@/components/shared/cta-button";

export default function NotFound() {
  return (
    <section className="mx-auto flex max-w-2xl flex-col items-center gap-6 px-4 py-32 text-center sm:px-6">
      <p className="font-display text-accent-text text-6xl font-bold uppercase">404</p>
      <h1 className="text-3xl font-bold uppercase">Down for the count</h1>
      <p className="text-muted">That page took one too many and isn&apos;t here anymore.</p>
      <CTAButton href="/" variant="secondary" size="lg">
        Back to Home
      </CTAButton>
    </section>
  );
}
