"use client";

import { useEffect, useId, useRef, useState, type FormEvent, type ReactNode } from "react";
import { useSearchParams } from "next/navigation";
import { Check, ChevronDown, CircleAlert, LoaderCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { contactSchema, serviceOptions, type ContactField } from "@/lib/contact-schema";
import { site } from "@/config/site";

type Status = "idle" | "submitting" | "success" | "error" | "unavailable";

// Static hosting (GitHub Pages) has no server routes, so online submission is off unless
// a POST endpoint is supplied at build time, e.g. NEXT_PUBLIC_CONTACT_ENDPOINT=/api/contact on a Node host.
const contactEndpoint = process.env.NEXT_PUBLIC_CONTACT_ENDPOINT;

type Errors = Partial<Record<ContactField, string>>;

const intents = [
  { value: "consultation", label: "Request a Consultation", hint: "An initial conversation about a question or challenge." },
  { value: "project", label: "Discuss a Project", hint: "You have a defined scope, timeline or outcome in mind." },
] as const;

const fieldOrder: ContactField[] = ["name", "company", "email", "phone", "country", "service", "message"];

const inputClass =
  "peer block w-full rounded-sm border border-line-strong bg-white px-4 py-3 text-body text-ink transition-[border-color,box-shadow] duration-[var(--dur-fast)] placeholder:text-subtle hover:border-ink/50 focus:border-teal focus:outline-none focus:ring-3 focus:ring-teal/15 aria-invalid:border-error aria-invalid:focus:ring-error/15";

const selectClass = `${inputClass} appearance-none pr-10`;

function Field({
  id,
  label,
  optional,
  error,
  children,
  className = "",
}: {
  id: string;
  label: string;
  optional?: boolean;
  error?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={className}>
      <label htmlFor={id} className="mb-2 flex items-baseline justify-between text-small font-medium text-ink">
        {label}
        {optional && <span className="text-caption font-normal text-subtle">Optional</span>}
      </label>
      {children}
      {error && (
        <p id={`${id}-error`} className="mt-2 flex items-start gap-1.5 text-caption text-error">
          <CircleAlert aria-hidden="true" className="mt-px size-3.5 shrink-0" strokeWidth={2} />
          {error}
        </p>
      )}
    </div>
  );
}

export function ContactForm({ countries }: { countries: string[] }) {
  const uid = useId();
  const formRef = useRef<HTMLFormElement>(null);
  // Pre-select from links such as /contact?service=it-audit&intent=project
  const query = useSearchParams();
  const [intent, setIntent] = useState<"consultation" | "project">(
    query.get("intent") === "project" ? "project" : "consultation",
  );
  const [service, setService] = useState(() => {
    const s = query.get("service");
    return s && serviceOptions.some((o) => o.value === s) ? s : "";
  });
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<Status>("idle");
  const [serverError, setServerError] = useState("");
  const startedAt = useRef(0);

  useEffect(() => {
    startedAt.current = Date.now();
  }, []);

  const id = (f: string) => `${uid}-${f}`;
  const describedBy = (f: ContactField) => (errors[f] ? `${id(f)}-error` : undefined);

  function collect() {
    const fd = new FormData(formRef.current!);
    // Unselected <select>s are absent from FormData; default to "" so the schema's friendly messages apply
    const blanks = Object.fromEntries(fieldOrder.map((f) => [f, ""]));
    return { ...blanks, ...Object.fromEntries(fd), intent, startedAt: startedAt.current };
  }

  function validate() {
    const result = contactSchema.safeParse(collect());
    if (result.success) {
      setErrors({});
      return result.data;
    }
    const next: Errors = {};
    for (const issue of result.error.issues) {
      const key = issue.path[0] as ContactField;
      if (!next[key]) next[key] = issue.message;
    }
    setErrors(next);
    const first = fieldOrder.find((f) => next[f]);
    if (first) document.getElementById(id(first))?.focus();
    return null;
  }

  // After a failed submit, re-validate as the user corrects fields
  function onChange() {
    if (Object.keys(errors).length) {
      const result = contactSchema.safeParse(collect());
      const next: Errors = {};
      if (!result.success)
        for (const issue of result.error.issues) {
          const key = issue.path[0] as ContactField;
          if (errors[key] && !next[key]) next[key] = issue.message;
        }
      setErrors(next);
    }
  }

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (status === "submitting") return;
    setServerError("");
    const data = validate();
    if (!data) return;
    if (!contactEndpoint) {
      setStatus("unavailable");
      return;
    }

    setStatus("submitting");
    try {
      const res = await fetch(contactEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const body = (await res.json().catch(() => ({}))) as { ok?: boolean; error?: string; fields?: Record<string, string[]> };
      if (!res.ok || !body.ok) {
        if (body.fields) {
          setErrors(Object.fromEntries(Object.entries(body.fields).map(([k, v]) => [k, v[0]])) as Errors);
        }
        throw new Error(body.error || "Something went wrong.");
      }
      setStatus("success");
    } catch (err) {
      setServerError(err instanceof Error ? err.message : "Something went wrong.");
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div role="status" className="border border-line bg-white p-8 sm:p-12">
        <span className="grid size-12 place-items-center rounded-full bg-teal-soft text-teal">
          <Check aria-hidden="true" className="size-6" strokeWidth={1.75} />
        </span>
        <h2 className="mt-6 text-h3">Thank you — your message has been received.</h2>
        <p className="mt-4 max-w-lg text-body text-muted">
          A member of the team will review it and reply to the email address you provided. If your enquiry is urgent,
          you can also reach us at{" "}
          <a className="text-teal underline underline-offset-4" href={`mailto:${site.contact.email}`}>
            {site.contact.email}
          </a>
          .
        </p>
      </div>
    );
  }

  const current = intents.find((i) => i.value === intent)!;

  function mailtoHref() {
    const d = collect() as Record<string, unknown>;
    const serviceLabel = serviceOptions.find((o) => o.value === d.service)?.label ?? "";
    const body = [
      `Name: ${d.name}`,
      `Company: ${d.company}`,
      `Email: ${d.email}`,
      ...(d.phone ? [`Phone: ${d.phone}`] : []),
      `Country: ${d.country}`,
      `Service: ${serviceLabel}`,
      "",
      String(d.message ?? ""),
    ].join("\n");
    return `mailto:${site.contact.email}?subject=${encodeURIComponent(`${current.label} — ${d.company}`)}&body=${encodeURIComponent(body)}`;
  }

  return (
    <form ref={formRef} noValidate onSubmit={onSubmit} onChange={onChange} className="border border-line bg-white p-6 sm:p-10">
      <fieldset>
        <legend className="eyebrow">I would like to</legend>
        <div className="mt-3 grid gap-2 sm:grid-cols-2">
          {intents.map((opt) => (
            <label
              key={opt.value}
              className="relative flex cursor-pointer items-center gap-3 rounded-sm border border-line px-4 py-3.5 text-small font-medium transition-colors hover:border-ink/50 has-checked:border-ink has-checked:bg-ink has-checked:text-white has-focus-visible:outline-2 has-focus-visible:outline-offset-2 has-focus-visible:outline-blue"
            >
              <input
                type="radio"
                name="intent-choice"
                value={opt.value}
                checked={intent === opt.value}
                onChange={() => setIntent(opt.value)}
                className="sr-only"
              />
              <span
                aria-hidden="true"
                className={`grid size-4 place-items-center rounded-full border ${intent === opt.value ? "border-white" : "border-line-strong"}`}
              >
                {intent === opt.value && <span className="size-1.5 rounded-full bg-white" />}
              </span>
              {opt.label}
            </label>
          ))}
        </div>
        <p className="mt-3 text-caption text-muted">{current.hint}</p>
      </fieldset>

      <div className="mt-10 grid gap-6 sm:grid-cols-2">
        <Field id={id("name")} label="Name" error={errors.name}>
          <input id={id("name")} name="name" autoComplete="name" required className={inputClass}
            aria-invalid={!!errors.name} aria-describedby={describedBy("name")} />
        </Field>
        <Field id={id("company")} label="Company" error={errors.company}>
          <input id={id("company")} name="company" autoComplete="organization" required className={inputClass}
            aria-invalid={!!errors.company} aria-describedby={describedBy("company")} />
        </Field>
        <Field id={id("email")} label="Work email" error={errors.email}>
          <input id={id("email")} name="email" type="email" autoComplete="email" required className={inputClass}
            aria-invalid={!!errors.email} aria-describedby={describedBy("email")} />
        </Field>
        <Field id={id("phone")} label="Phone" optional error={errors.phone}>
          <input id={id("phone")} name="phone" type="tel" autoComplete="tel" className={inputClass}
            aria-invalid={!!errors.phone} aria-describedby={describedBy("phone")} />
        </Field>
        <Field id={id("country")} label="Country" error={errors.country}>
          <div className="relative">
          <select id={id("country")} name="country" required defaultValue="" autoComplete="country-name"
            className={selectClass}
            aria-invalid={!!errors.country} aria-describedby={describedBy("country")}>
            <option value="" disabled>Select country</option>
            {countries.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
            <ChevronDown aria-hidden="true" strokeWidth={1.75} className="pointer-events-none absolute right-4 top-1/2 size-4 -translate-y-1/2 text-muted" />
          </div>
        </Field>
        <Field id={id("service")} label="Service of interest" error={errors.service}>
          <div className="relative">
          <select id={id("service")} name="service" required value={service} onChange={(e) => setService(e.target.value)}
            className={selectClass}
            aria-invalid={!!errors.service} aria-describedby={describedBy("service")}>
            <option value="" disabled>Select a service</option>
            {serviceOptions.map((o) => (
              <option key={o.value} value={o.value}>{o.label}</option>
            ))}
          </select>
            <ChevronDown aria-hidden="true" strokeWidth={1.75} className="pointer-events-none absolute right-4 top-1/2 size-4 -translate-y-1/2 text-muted" />
          </div>
        </Field>
        <Field id={id("message")} label={intent === "project" ? "Tell us about the project" : "How can we help?"} error={errors.message} className="sm:col-span-2">
          <textarea id={id("message")} name="message" rows={6} required className={`${inputClass} resize-y`}
            placeholder={intent === "project" ? "Scope, systems involved, timeline and the outcome you need." : "The question or challenge you are facing."}
            aria-invalid={!!errors.message} aria-describedby={describedBy("message")} />
        </Field>

        {/* Honeypot: hidden from people and assistive tech; bots tend to fill it */}
        <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
          <label htmlFor={id("website")}>Website</label>
          <input id={id("website")} name="website" tabIndex={-1} autoComplete="off" />
        </div>
      </div>

      {status === "unavailable" && (
        <div role="alert" className="mt-8 flex items-start gap-3 rounded-sm border border-error/30 bg-error-soft p-4 text-small text-error">
          <CircleAlert aria-hidden="true" className="mt-0.5 size-4 shrink-0" strokeWidth={2} />
          <p>
            Online submission isn&rsquo;t available on this site yet, so your enquiry has not been sent. Please email it to{" "}
            <a
              className="underline underline-offset-4"
              href={`mailto:${site.contact.email}`}
              onClick={(e) => (e.currentTarget.href = mailtoHref())}
            >
              {site.contact.email}
            </a>{" "}
            — the link opens your email app with your details filled in.
          </p>
        </div>
      )}

      {status === "error" && serverError && (
        <div role="alert" className="mt-8 flex items-start gap-3 rounded-sm border border-error/30 bg-error-soft p-4 text-small text-error">
          <CircleAlert aria-hidden="true" className="mt-0.5 size-4 shrink-0" strokeWidth={2} />
          {serverError}
        </div>
      )}

      <div className="mt-10 flex flex-col gap-5 border-t border-line pt-8 sm:flex-row sm:items-center sm:justify-between">
        <p className="max-w-sm text-caption text-subtle">
          We use your details only to respond to this enquiry. See our{" "}
          <a href="/privacy" className="underline underline-offset-4 hover:text-ink">Privacy Policy</a>.
        </p>
        <Button type="submit" arrow={status !== "submitting"} disabled={status === "submitting"} aria-busy={status === "submitting"}>
          {status === "submitting" ? (
            <span className="flex items-center gap-2">
              <LoaderCircle aria-hidden="true" className="size-4 animate-spin" /> Sending…
            </span>
          ) : (
            current.label
          )}
        </Button>
      </div>
    </form>
  );
}
