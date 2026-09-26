import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { PageHero } from "@/components/sections/page-hero";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/motion/reveal";
import { CTASection } from "@/components/sections/cta-section";
import { domainOrder, domains, getService, services, servicesByDomain, type Service } from "@/content/services";
import { JsonLd, breadcrumbJsonLd, pageMetadata } from "@/lib/seo";
import { absoluteUrl } from "@/config/site";

export const dynamicParams = false;

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: PageProps<"/services/[slug]">) {
  const { slug } = await params;
  const s = getService(slug);
  if (!s) return {};
  return pageMetadata({ title: s.seo.title, description: s.seo.description, path: `/services/${s.slug}` });
}

/** Where this service sits in the practice: 3 disciplines × 3 services */
function PracticeMap({ current }: { current: Service }) {
  return (
    <figure className="border border-line bg-white p-6">
      <figcaption className="eyebrow">Position in the practice</figcaption>
      <ul className="mt-5 space-y-4">
        {domainOrder.map((d) => (
          <li key={d} className="grid grid-cols-[6.5rem_1fr] items-center gap-3">
            <span className={`text-caption ${d === current.domain ? "font-medium text-ink" : "text-subtle"}`}>
              {domains[d].name}
            </span>
            <span className="flex gap-1.5">
              {servicesByDomain(d).map((s) => (
                <Link
                  key={s.slug}
                  href={`/services/${s.slug}`}
                  title={s.name}
                  aria-label={s.name}
                  aria-current={s.slug === current.slug ? "page" : undefined}
                  className={`h-6 flex-1 rounded-xs transition-colors ${
                    s.slug === current.slug
                      ? "bg-teal"
                      : d === current.domain
                        ? "bg-teal-soft hover:bg-teal/40"
                        : "bg-canvas hover:bg-line-strong"
                  }`}
                />
              ))}
            </span>
          </li>
        ))}
      </ul>
      <p className="mt-5 border-t border-line pt-4 text-caption text-muted">
        <span className="font-mono text-teal">{current.number}</span> · {domains[current.domain].line}
      </p>
    </figure>
  );
}

export default async function ServicePage({ params }: PageProps<"/services/[slug]">) {
  const { slug } = await params;
  const s = getService(slug);
  if (!s) notFound();

  const related = s.related.map((r) => getService(r)!);

  return (
    <>
      <JsonLd
        data={[
          {
            "@context": "https://schema.org",
            "@type": "Service",
            name: s.name,
            serviceType: s.name,
            description: s.seo.description,
            url: absoluteUrl(`/services/${s.slug}`),
            provider: { "@id": absoluteUrl("/#organization") },
            areaServed: "Worldwide",
          },
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Services", path: "/services" },
            { name: s.name, path: `/services/${s.slug}` },
          ]),
        ]}
      />

      <PageHero
        crumbs={[{ href: "/services", label: "Services" }]}
        label={s.name}
        title={s.hero.headline}
        intro={s.hero.intro}
        aside={<PracticeMap current={s} />}
      />

      {/* 01 Problem */}
      <section aria-labelledby="problem" className="section-y border-t border-line">
        <div className="container-x grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionHeading index="01" label="The problem" id="problem" title={s.problem.heading} />
          </div>
          <Reveal className="space-y-5 lg:col-span-6 lg:col-start-7 lg:pt-12" delay={100}>
            {s.problem.body.map((p) => (
              <p key={p} className="text-lead text-muted">
                {p}
              </p>
            ))}
          </Reveal>
        </div>
      </section>

      {/* 02 What we do + capabilities */}
      <section aria-labelledby="what" className="section-y bg-canvas">
        <div className="container-x">
          <SectionHeading index="02" label="What we do" id="what" title={s.approach} className="[&_h2]:!text-h3 [&_h2]:max-w-4xl" />
          <ul className="mt-14 grid border-l border-t border-line bg-white sm:grid-cols-2 lg:grid-cols-3">
            {s.capabilities.map((c, i) => (
              <Reveal as="li" key={c.title} delay={(i % 3) * 60} className="border-b border-r border-line p-7 lg:p-8">
                <span className="font-mono text-label text-subtle">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="mt-4 text-h4">{c.title}</h3>
                <p className="mt-2 text-small text-muted">{c.detail}</p>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* 03 Outcomes + 04 Engagement areas */}
      <section aria-label="Outcomes and engagements" className="section-y">
        <div className="container-x grid gap-16 lg:grid-cols-2 lg:gap-20">
          <div>
            <SectionHeading index="03" label="Business outcomes" id="outcomes" title="What changes for you." />
            <ul className="mt-10 border-t border-ink">
              {s.outcomes.map((o, i) => (
                <Reveal as="li" key={o} delay={i * 60} className="flex gap-5 border-b border-line py-5">
                  <span aria-hidden="true" className="mt-2.5 h-0.5 w-5 shrink-0 bg-teal" />
                  <span className="text-body text-ink">{o}</span>
                </Reveal>
              ))}
            </ul>
          </div>
          <div>
            <SectionHeading index="04" label="Typical engagements" id="engagements" title="Where we are usually asked to help." />
            <ul className="mt-10 border-t border-ink">
              {s.engagements.map((e, i) => (
                <Reveal as="li" key={e} delay={i * 60} className="flex items-baseline gap-5 border-b border-line py-5">
                  <span className="font-mono text-label text-subtle">{String(i + 1).padStart(2, "0")}</span>
                  <span className="text-body text-ink">{e}</span>
                </Reveal>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* 05 Methodology */}
      <section aria-labelledby="method" className="section-y bg-ink text-white">
        <div className="container-x">
          <Reveal>
            <p className="eyebrow !text-white/60">
              <span className="text-[#5eead4]">05</span> — Methodology
            </p>
            <h2 id="method" className="mt-5 max-w-3xl text-h2">
              {s.name}, step by step.
            </h2>
          </Reveal>
          <ol className="mt-14 grid gap-10 md:grid-cols-2 lg:grid-cols-4 lg:gap-0">
            {s.method.map((step, i) => (
              <Reveal as="li" key={step.title} delay={i * 100} className="lg:pr-10">
                <div className="flex items-center gap-4">
                  <span className="grid size-9 place-items-center rounded-full border border-white/25 font-mono text-label">
                    0{i + 1}
                  </span>
                  <span aria-hidden="true" className="hidden h-px flex-1 bg-white/15 lg:block" />
                </div>
                <h3 className="mt-6 text-h3">{step.title}</h3>
                <p className="mt-3 text-small text-white/70">{step.detail}</p>
              </Reveal>
            ))}
          </ol>
          {s.disclaimer && (
            <p className="mt-16 max-w-3xl border-t border-white/15 pt-6 text-caption text-white/60">{s.disclaimer}</p>
          )}
        </div>
      </section>

      {/* 06 Related */}
      <section aria-labelledby="related" className="section-y">
        <div className="container-x">
          <SectionHeading index="06" label="Related services" id="related" title="Often combined with." />
          <ul className="mt-12 grid gap-6 md:grid-cols-3">
            {related.map((r, i) => (
              <Reveal as="li" key={r.slug} delay={i * 70}>
                <Link
                  href={`/services/${r.slug}`}
                  className="group flex h-full flex-col border-t border-ink pt-6 transition-colors"
                >
                  <span className="eyebrow">
                    <span className="text-teal">{r.number}</span> · {domains[r.domain].name}
                  </span>
                  <span className="mt-4 text-h3 transition-colors group-hover:text-teal">{r.name}</span>
                  <span className="mt-3 flex-1 text-small text-muted">{r.summary}</span>
                  <ArrowRight
                    aria-hidden="true"
                    strokeWidth={1.5}
                    className="mt-6 size-5 transition-transform group-hover:translate-x-1 group-hover:text-teal"
                  />
                </Link>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <CTASection
        label={s.name}
        title={`Talk to us about ${s.name}.`}
        body="Share what you are facing. We will respond with a practical view of scope, approach and where to start."
        primary={{ href: `/contact?service=${s.slug}`, label: "Request a Consultation" }}
        secondary={{ href: "/services", label: "All services" }}
      />
    </>
  );
}
