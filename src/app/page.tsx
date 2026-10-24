import Link from "next/link";
import { ArrowRight, ArrowUpRight, Layers, Users, FileCheck2, KeyRound, Sparkles } from "lucide-react";
import { ButtonLink } from "@/components/ui/button";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/motion/reveal";
import { NumberTicker, Marquee } from "@/components/motion/magic";
import { CTASection } from "@/components/sections/cta-section";
import { industries } from "@/content/industries";
import { domainOrder, domains, services } from "@/content/services";
import { domainColor, img, industryImages, photos, serviceImages } from "@/content/media";
import { site } from "@/config/site";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Stats />
      <ServicesSection />
      <WhySection />
      <IndustriesSection />
      <CTASection
        label="Start a conversation"
        title="Discuss your requirements."
        body="Tell us about your project and we will respond with a proposed scope."
        primary={{ href: "/contact", label: "Discuss a Project" }}
        secondary={{ href: "/services", label: "Explore Our Services" }}
      />
    </>
  );
}

/* ---------------------------------------------------------------- Hero */

function Hero() {
  return (
    <section aria-labelledby="hero-title" className="relative overflow-hidden bg-navy pt-[var(--header-h)] text-white">
      {/* eslint-disable-next-line @next/next/no-img-element -- static export, no optimizer */}
      <img
        src={img(photos.skyline, 2000)}
        alt=""
        aria-hidden="true"
        fetchPriority="high"
        className="absolute inset-0 size-full object-cover"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[linear-gradient(100deg,rgb(6_20_43/0.97)_20%,rgb(6_20_43/0.7)_60%,rgb(15_118_110/0.5))]"
      />
      <div className="container-x relative flex min-h-[min(82vh,760px)] flex-col justify-center py-20">
        <Reveal>
          <p className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-4 py-1.5 text-caption text-mint backdrop-blur">
            <Sparkles aria-hidden="true" strokeWidth={1.75} className="size-3.5" />
            <span className="shiny-text">Technology · Data · Risk · Finance</span>
          </p>
          <h1 id="hero-title" className="mt-8 max-w-[16ch] text-display">
            Audit, risk and data <span className="text-gradient">advisory.</span>
          </h1>
          <p className="mt-6 max-w-lg text-lead text-white/75">IT audit, cyber, data, AI, tax, accounting and ERP services from one team.</p>
          <div className="mt-10 flex flex-wrap gap-3">
            <ButtonLink href="/contact" variant="inverse">
              Discuss a Project
            </ButtonLink>
            <ButtonLink href="/services" variant="ghost">
              Explore Our Services
            </ButtonLink>
          </div>
        </Reveal>
      </div>
      <div aria-hidden="true" className="relative h-1 bg-gradient-to-r from-mint via-sky to-amber" />
    </section>
  );
}

/* --------------------------------------------------------------- Stats */

const stats = [
  { value: services.length, label: "Service lines" },
  { value: domainOrder.length, label: "Disciplines, one team" },
  { value: industries.length, label: "Industries supported" },
  { value: site.founded, label: `Founded in ${site.headquarters.city}`, static: true },
];

function Stats() {
  return (
    <section aria-label="Data Fold at a glance" className="border-b border-line">
      <dl className="container-x grid grid-cols-2 lg:grid-cols-4">
        {stats.map((s, i) => (
          <Reveal
            key={s.label}
            delay={i * 80}
            className={`py-10 lg:py-14 ${i % 2 ? "pl-6 sm:pl-10" : ""} ${i > 0 ? "lg:border-l lg:border-line lg:pl-10" : ""}`}
          >
            <dd className="text-h1 text-ink">
              {"static" in s ? s.value : <NumberTicker value={s.value} />}
            </dd>
            <dt className="mt-2 text-small text-muted">{s.label}</dt>
          </Reveal>
        ))}
      </dl>
    </section>
  );
}

/* ------------------------------------------------------------- Services */

function ServicesSection() {
  return (
    <section aria-labelledby="svc" className="section-y bg-canvas">
      <div className="container-x">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading index="01" label="Services" id="svc" title="Our services" />
          <div className="mb-2 flex flex-wrap gap-4">
            {domainOrder.map((d) => (
              <span key={d} className="inline-flex items-center gap-2 text-small text-muted">
                <span aria-hidden="true" className={`size-2.5 rounded-full ${domainColor[d].bg}`} />
                {domains[d].name}
              </span>
            ))}
          </div>
        </div>
        <ul className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => (
            <Reveal as="li" key={s.slug} delay={(i % 3) * 80}>
              <Link
                href={`/services/${s.slug}`}
                className="border-beam group relative flex h-72 flex-col justify-end overflow-hidden rounded-lg bg-navy p-6 text-white shadow-md"
              >
                {/* eslint-disable-next-line @next/next/no-img-element -- static export, no optimizer */}
                <img
                  src={img(serviceImages[s.slug], 800)}
                  alt=""
                  loading="lazy"
                  className="absolute inset-0 size-full object-cover opacity-70 transition-transform duration-700 ease-out group-hover:scale-110"
                />
                <span aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-navy via-navy/60 to-transparent" />
                <span className="relative flex items-center gap-2 font-mono text-label uppercase tracking-[0.08em]">
                  <span aria-hidden="true" className={`size-2 rounded-full ${domainColor[s.domain].bg}`} />
                  <span className={domainColor[s.domain].text}>{domains[s.domain].name}</span>
                </span>
                <span className="relative mt-3 flex items-center justify-between gap-4 text-h3">
                  {s.name}
                  <ArrowUpRight
                    aria-hidden="true"
                    strokeWidth={1.5}
                    className="size-6 shrink-0 transition-transform duration-[var(--dur-base)] group-hover:-translate-y-1 group-hover:translate-x-1"
                  />
                </span>
                <span className="relative mt-2 line-clamp-2 text-small text-white/70">{s.summary}</span>
              </Link>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ Why */

const principles = [
  { icon: Layers, title: "Multidisciplinary", body: "Risk, data, technology and finance specialists on one team." },
  { icon: Users, title: "Focused teams", body: "Small teams, with the same people from scoping to delivery." },
  { icon: FileCheck2, title: "Evidence-led", body: "Findings are supported by testing and data." },
  { icon: KeyRound, title: "Built to hand over", body: "Documentation and training are included in scope." },
];

function WhySection() {
  return (
    <section aria-labelledby="why" className="section-y">
      <div className="container-x grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
        <Reveal className="relative">
          <div className="overflow-hidden rounded-lg shadow-lg">
            {/* eslint-disable-next-line @next/next/no-img-element -- static export, no optimizer */}
            <img
              src={img(photos.team, 1200)}
              alt="Consultants collaborating around a laptop"
              loading="lazy"
              className="aspect-[4/3] w-full object-cover"
            />
          </div>
          <div className="absolute -bottom-6 -right-2 hidden rounded-lg bg-teal p-6 text-white shadow-lg sm:block lg:-right-8">
            <p className="text-h3">Vendor-independent</p>
            <p className="mt-1 text-caption text-white/80">Advice not tied to any platform</p>
          </div>
        </Reveal>
        <div>
          <SectionHeading index="02" label="Why Data Fold" id="why" title="How we are different" />
          <ul className="mt-10 grid gap-4 sm:grid-cols-2">
            {principles.map((p, i) => (
              <Reveal
                as="li"
                key={p.title}
                delay={i * 80}
                className="rounded-lg border border-line p-6 transition-colors duration-[var(--dur-base)] hover:border-teal hover:bg-teal-soft/40"
              >
                <span className="grid size-11 place-items-center rounded-md bg-teal-soft text-teal">
                  <p.icon aria-hidden="true" strokeWidth={1.75} className="size-5" />
                </span>
                <h3 className="mt-4 text-h4">{p.title}</h3>
                <p className="mt-1 text-small text-muted">{p.body}</p>
              </Reveal>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------ Industries */

function IndustriesSection() {
  return (
    <section aria-labelledby="ind" className="section-y overflow-hidden bg-navy text-white">
      <div className="container-x flex flex-wrap items-end justify-between gap-6">
        <Reveal>
          <p className="eyebrow !text-mint">03 — Industries</p>
          <h2 id="ind" className="mt-5 text-h2">
            Industries we serve
          </h2>
        </Reveal>
        <ButtonLink href="/industries" variant="ghost">
          All industries
        </ButtonLink>
      </div>
      <Marquee className="mt-14">
        {industries.map((ind) => (
          <Link
            key={ind.slug}
            href={`/industries#${ind.slug}`}
            className="group relative block h-80 w-64 shrink-0 overflow-hidden rounded-lg"
          >
            {/* eslint-disable-next-line @next/next/no-img-element -- static export, no optimizer */}
            <img
              src={img(industryImages[ind.slug], 600)}
              alt=""
              loading="lazy"
              className="absolute inset-0 size-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
            />
            <span aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-navy via-navy/30 to-transparent" />
            <span className="absolute inset-x-5 bottom-5 flex items-center justify-between text-h4">
              {ind.name}
              <ArrowRight aria-hidden="true" strokeWidth={1.75} className="size-5 text-mint transition-transform group-hover:translate-x-1" />
            </span>
          </Link>
        ))}
      </Marquee>
    </section>
  );
}
