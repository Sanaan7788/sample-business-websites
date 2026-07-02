"use client";

import { useState } from "react";
import { leadSchema, fieldErrors, type LeadInput } from "@/lib/validation";
import { cn } from "@/lib/utils";

type ProgramOption = { slug: string; name: string };

type LeadFormProps = {
  source?: "TRIAL" | "MEMBERSHIP";
  programs?: ProgramOption[];
};

type FieldErrors = Partial<Record<keyof LeadInput, string>>;

const inputClass =
  "w-full rounded-md border border-border bg-surface px-4 py-3 text-fg placeholder:text-muted focus:border-accent focus:outline-none";

/** Free-trial / membership lead form. Posts to /api/leads. See docs/COMPONENT_LIBRARY.md. */
export function LeadForm({ source = "TRIAL", programs = [] }: LeadFormProps) {
  const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [serverError, setServerError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setServerError(null);
    setErrors({});

    const form = e.currentTarget;
    const fd = new FormData(form);
    const payload = {
      name: String(fd.get("name") ?? ""),
      email: String(fd.get("email") ?? ""),
      phone: String(fd.get("phone") ?? ""),
      preferredProgram: String(fd.get("preferredProgram") ?? ""),
      message: String(fd.get("message") ?? ""),
      company: String(fd.get("company") ?? ""), // honeypot
      source,
    };

    const parsed = leadSchema.safeParse(payload);
    if (!parsed.success) {
      setErrors(fieldErrors(parsed.error) as FieldErrors);
      return;
    }

    setStatus("submitting");
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed.data),
      });
      if (res.ok) {
        setStatus("success");
        form.reset();
        return;
      }
      const data = await res.json().catch(() => ({}));
      if (res.status === 422 && data.fields) setErrors(data.fields as FieldErrors);
      setServerError(data.error ?? "Something went wrong. Please try again.");
      setStatus("error");
    } catch {
      setServerError("Network error. Please try again or call us.");
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div
        role="status"
        className="border-success/40 bg-success/10 rounded-md border p-6 text-center"
      >
        <p className="font-display text-xl font-bold uppercase">You&apos;re in! 🥊</p>
        <p className="text-muted mt-2">
          Thanks — we&apos;ve got your details and will reach out shortly to get you booked.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-4">
      <Field label="Name" name="name" error={errors.name}>
        <input id="name" name="name" type="text" autoComplete="name" className={inputClass} />
      </Field>

      <Field label="Email" name="email" error={errors.email}>
        <input id="email" name="email" type="email" autoComplete="email" className={inputClass} />
      </Field>

      <Field label="Phone" name="phone" error={errors.phone}>
        <input id="phone" name="phone" type="tel" autoComplete="tel" className={inputClass} />
      </Field>

      {programs.length > 0 && (
        <Field label="Which program?" name="preferredProgram" error={errors.preferredProgram}>
          <select
            id="preferredProgram"
            name="preferredProgram"
            className={inputClass}
            defaultValue=""
          >
            <option value="">No preference</option>
            {programs.map((p) => (
              <option key={p.slug} value={p.slug}>
                {p.name}
              </option>
            ))}
          </select>
        </Field>
      )}

      <Field label="Anything we should know? (optional)" name="message" error={errors.message}>
        <textarea id="message" name="message" rows={3} className={inputClass} />
      </Field>

      {/* Honeypot — visually hidden, not announced to AT. */}
      <div aria-hidden="true" className="absolute left-[-9999px] h-0 w-0 overflow-hidden">
        <label htmlFor="company">Company</label>
        <input id="company" name="company" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      {serverError && (
        <p role="alert" className="text-error text-sm">
          {serverError}
        </p>
      )}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="bg-accent font-display text-fg hover:bg-accent-hover flex h-14 w-full items-center justify-center rounded-md text-lg font-semibold tracking-wide uppercase transition-colors duration-200 disabled:opacity-60"
      >
        {status === "submitting" ? "Sending…" : "Book My Free Trial"}
      </button>
    </form>
  );
}

function Field({
  label,
  name,
  error,
  children,
}: {
  label: string;
  name: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={name} className="text-fg mb-1 block text-sm font-medium">
        {label}
      </label>
      {children}
      {error && (
        <p id={`${name}-error`} role="alert" className={cn("text-error mt-1 text-sm")}>
          {error}
        </p>
      )}
    </div>
  );
}
