import { Suspense } from "react";
import { Mail, MapPin, Phone } from "lucide-react";
import { PageHero } from "@/components/sections/page-hero";
import { photos } from "@/content/media";
import { ContactForm } from "@/components/contact/contact-form";
import { site } from "@/config/site";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Contact — Request a Consultation or Discuss a Project",
  description:
    "Talk to Data Fold about IT audit, risk, cybersecurity, data analytics, AI, tax, finance or ERP. Request a consultation or discuss a project.",
  path: "/contact",
});

/** Country names from the runtime's ICU data — no bundled list to maintain. */
function countryNames() {
  const names = new Intl.DisplayNames(["en"], { type: "region" });
  const out = new Set<string>();
  for (let a = 65; a <= 90; a++)
    for (let b = 65; b <= 90; b++) {
      const code = String.fromCharCode(a, b);
      // Skip private-use / grouping codes (EU, UN, QO, XA…)
      if (/^(Q[M-Z]|X[A-JL-Z]|AA|ZZ|EU|EZ|UN)$/.test(code)) continue;
      const name = names.of(code);
      if (name && name !== code) out.add(name);
    }
  return [...out].sort((x, y) => x.localeCompare(y));
}

const steps = [
  "We read every enquiry and reply by email.",
  "If there is a fit, we arrange a short call to understand the context.",
  "You receive a clear proposal: scope, approach, team and timing.",
];

/** Same footprint as the form, so nothing shifts when it hydrates */
function FormSkeleton() {
  return (
    <div aria-hidden="true" className="animate-pulse border border-line bg-white p-6 sm:p-10">
      <div className="h-3 w-28 rounded-xs bg-canvas" />
      <div className="mt-3 grid gap-2 sm:grid-cols-2">
        <div className="h-[50px] rounded-sm bg-canvas" />
        <div className="h-[50px] rounded-sm bg-canvas" />
      </div>
      <div className="mt-[4.5rem] grid gap-6 sm:grid-cols-2">
        {Array.from({ length: 6 }, (_, i) => (
          <div key={i}>
            <div className="h-3 w-24 rounded-xs bg-canvas" />
            <div className="mt-3 h-[50px] rounded-sm bg-canvas" />
          </div>
        ))}
        <div className="h-[170px] rounded-sm bg-canvas sm:col-span-2" />
      </div>
    </div>
  );
}

export default function ContactPage() {
  return (
    <>
      <PageHero
        label="Contact"
        title="Start a conversation."
        intro="Tell us what you need to decide, fix or build."
        image={photos.office}
      />
      <section aria-label="Contact form" className="bg-canvas py-16 lg:py-24">
        <div className="container-x grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <Suspense fallback={<FormSkeleton />}>
              <ContactForm countries={countryNames()} />
            </Suspense>
          </div>
          <aside className="space-y-10 lg:col-span-4">
            <div>
              <h2 className="eyebrow">What happens next</h2>
              <ol className="mt-5 space-y-5 border-l border-line pl-6">
                {steps.map((s, i) => (
                  <li key={s} className="relative text-small text-ink">
                    <span className="absolute -left-[31px] top-0 grid size-2.5 place-items-center rounded-full border border-teal bg-canvas" />
                    <span className="font-mono text-label text-teal">0{i + 1}</span>
                    <p className="mt-1">{s}</p>
                  </li>
                ))}
              </ol>
            </div>
            {/* PLACEHOLDER contact details — edit in src/config/site.ts */}
            <div className="border-t border-line pt-8">
              <h2 className="eyebrow">Direct</h2>
              <ul className="mt-5 space-y-4 text-small">
                <li className="flex items-center gap-3">
                  <Mail aria-hidden="true" className="size-4 text-subtle" strokeWidth={1.5} />
                  <a href={`mailto:${site.contact.email}`} className="link-underline">{site.contact.email}</a>
                </li>
                <li className="flex items-center gap-3">
                  <Phone aria-hidden="true" className="size-4 text-subtle" strokeWidth={1.5} />
                  <span>{site.contact.phone}</span>
                </li>
                <li className="flex items-center gap-3">
                  <MapPin aria-hidden="true" className="size-4 text-subtle" strokeWidth={1.5} />
                  <span>{site.contact.address} · Serving clients globally</span>
                </li>
              </ul>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
