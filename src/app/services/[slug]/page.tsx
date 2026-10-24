import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowUpRight, CircleCheck } from "lucide-react";
import { PageHero } from "@/components/sections/page-hero";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/motion/reveal";
import { CTASection } from "@/components/sections/cta-section";
import { domainOrder, domains, getService, services, servicesByDomain, type Service } from "@/content/services";
import { JsonLd, breadcrumbJsonLd, pageMetadata } from "@/lib/seo";
import { absoluteUrl } from "@/config/site";
import { domainColor, img, serviceImages } from "@/content/media";

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
    <figure className="rounded-lg bg-white p-6 text-ink shadow-lg">
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
        image={serviceImages[s.slug]}
      />

      {/* 01 Problem + what we do */}
      <section aria-labelledby="what" className="section-y">
        <div className="container-x">
          <SectionHeading
            index="01"
            label="What we do"
            id="what"
            title={s.problem.heading}
            intro={s.approach}
            split
          />
          <ul className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {s.capabilities.map((c, i) => (
              <Reveal
                as="li"
                key={c.title}
                delay={(i % 3) * 60}
                className="relative overflow-hidden rounded-lg border border-line p-7 transition-colors hover:border-teal hover:bg-teal-soft/40"
              >
                <span aria-hidden="true" className={`absolute inset-y-0 left-0 w-1 ${domainColor[s.domain].bg}`} />
                <span className="font-mono text-label text-subtle">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="mt-3 text-h4">{c.title}</h3>
                <p className="mt-1 text-small text-muted">{c.detail}</p>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* 02 Outcomes */}
      <section aria-labelledby="outcomes" className="section-y bg-canvas">
        <div className="container-x grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
          <Reveal className="overflow-hidden rounded-lg shadow-lg">
            {/* eslint-disable-next-line @next/next/no-img-element -- static export, no optimizer */}
            <img src={img(serviceImages[s.slug], 1200)} alt="" loading="lazy" className="aspect-[4/3] w-full object-cover" />
          </Reveal>
          <div>
            <SectionHeading index="02" label="Business outcomes" id="outcomes" title="What changes for you." />
            <ul className="mt-10 space-y-4">
              {s.outcomes.map((o, i) => (
                <Reveal as="li" key={o} delay={i * 60} className="flex gap-4 rounded-lg bg-white p-5 shadow-sm">
                  <CircleCheck aria-hidden="true" strokeWidth={1.75} className="size-6 shrink-0 text-teal" />
                  <span className="text-body text-ink">{o}</span>
                </Reveal>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* 03 Methodology */}
      <section aria-labelledby="method" className="section-y bg-navy text-white">
        <div className="container-x">
          <Reveal>
            <p className="eyebrow !text-white/60">
              <span className="text-mint">03</span> — Methodology
            </p>
            <h2 id="method" className="mt-5 max-w-3xl text-h2">
              {s.name}, step by step.
            </h2>
          </Reveal>
          <ol className="mt-14 grid gap-10 md:grid-cols-2 lg:grid-cols-4 lg:gap-0">
            {s.method.map((step, i) => (
              <Reveal as="li" key={step.title} delay={i * 100} className="lg:pr-10">
                <div className="flex items-center gap-4">
                  <span className="grid size-10 place-items-center rounded-full bg-mint font-mono text-label text-navy">
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

      {/* 04 Related */}
      <section aria-labelledby="related" className="section-y">
        <div className="container-x">
          <SectionHeading index="04" label="Related services" id="related" title="Often combined with." />
          <ul className="mt-12 grid gap-6 md:grid-cols-3">
            {related.map((r, i) => (
              <Reveal as="li" key={r.slug} delay={i * 70}>
                <Link
                  href={`/services/${r.slug}`}
                  className="border-beam group relative flex h-64 flex-col justify-end overflow-hidden rounded-lg bg-navy p-6 text-white shadow-md"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element -- static export, no optimizer */}
                  <img
                    src={img(serviceImages[r.slug], 800)}
                    alt=""
                    loading="lazy"
                    className="absolute inset-0 size-full object-cover opacity-70 transition-transform duration-700 ease-out group-hover:scale-110"
                  />
                  <span aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-navy via-navy/60 to-transparent" />
                  <span className={`relative font-mono text-label uppercase tracking-[0.08em] ${domainColor[r.domain].text}`}>
                    {domains[r.domain].name}
                  </span>
                  <span className="relative mt-2 flex items-center justify-between gap-4 text-h3">
                    {r.name}
                    <ArrowUpRight aria-hidden="true" strokeWidth={1.5} className="size-6 shrink-0 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" />
                  </span>
                </Link>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <CTASection
        label={s.name}
        title={`Talk to us about ${s.name}.`}
        body="Share what you're facing — we'll suggest where to start."
        primary={{ href: `/contact?service=${s.slug}`, label: "Request a Consultation" }}
        secondary={{ href: "/services", label: "All services" }}
      />
    </>
  );
}
