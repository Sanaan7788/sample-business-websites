"use client";

import { useState } from "react";
import { contactSchema, fieldErrors, type ContactInput } from "@/lib/validation";

type FieldErrors = Partial<Record<keyof ContactInput, string>>;

const inputClass =
  "w-full rounded-md border border-border bg-surface px-4 py-3 text-fg placeholder:text-muted focus:border-accent focus:outline-none";

/** General contact form. Posts to /api/contact (source=CONTACT). */
export function ContactForm() {
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
      message: String(fd.get("message") ?? ""),
      company: String(fd.get("company") ?? ""), // honeypot
      source: "CONTACT" as const,
    };

    const parsed = contactSchema.safeParse(payload);
    if (!parsed.success) {
      setErrors(fieldErrors(parsed.error) as FieldErrors);
      return;
    }

    setStatus("submitting");
    try {
      const res = await fetch("/api/contact", {
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
        <p className="font-display text-xl font-bold uppercase">Message sent ✅</p>
        <p className="text-muted mt-2">
          Thanks for reaching out — we&apos;ll get back to you soon.
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
      <Field label="Message" name="message" error={errors.message}>
        <textarea id="message" name="message" rows={4} className={inputClass} />
      </Field>

      {/* Honeypot */}
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
        {status === "submitting" ? "Sending…" : "Send Message"}
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
        <p id={`${name}-error`} role="alert" className="text-error mt-1 text-sm">
          {error}
        </p>
      )}
    </div>
  );
}
