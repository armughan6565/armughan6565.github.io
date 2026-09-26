import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ButtonLink } from "@/components/ui/button";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/motion/reveal";
import { FoldVisualization } from "@/components/visuals/fold-visualization";
import { ServiceEcosystem } from "@/components/visuals/service-ecosystem";
import { EvidenceLens } from "@/components/visuals/evidence-lens";
import { InsightCard } from "@/components/insights/insight-card";
import { CTASection } from "@/components/sections/cta-section";
import { industries } from "@/content/industries";
import { getAllInsights } from "@/content/insights";
import { getService, type ServiceSlug } from "@/content/services";
import { site } from "@/config/site";
import { approach } from "@/content/company";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Positioning />
      <EcosystemSection />
      <WhySection />
      <EvidenceSection />
      <IndustriesSection />
      <ApproachSection />
      <CapabilitiesSection />
      <InsightsSection />
      <CTASection
        label="Start a conversation"
        title="Bring us the problem that crosses departments."
        body="Tell us what you are trying to decide, fix or build. We will tell you honestly how we can help — and where we can't."
        primary={{ href: "/contact", label: "Discuss a Project" }}
        secondary={{ href: "/services", label: "Explore Our Services" }}
      />
    </>
  );
}

/* ---------------------------------------------------------------- Hero */

function Hero() {
  return (
    <section aria-labelledby="hero-title" className="relative overflow-hidden pt-[var(--header-h)]">
      <div
        aria-hidden="true"
        className="grid-paper absolute inset-0 [mask-image:linear-gradient(to_bottom,black,transparent_85%)]"
      />
      <div className="container-x relative grid items-center gap-12 pb-16 pt-12 md:pt-16 lg:grid-cols-12 lg:gap-8 lg:pb-24 lg:pt-16">
        <div className="lg:col-span-7">
          <p className="eyebrow">Technology · Data · Risk · Finance</p>
          <h1 id="hero-title" className="mt-6 max-w-[14ch] text-display">
            Where technology, data and risk become <span className="text-teal">decisions.</span>
          </h1>
          <p className="mt-8 max-w-xl text-lead text-muted">
            Data Fold is a multidisciplinary consultancy. We help organizations understand risk, transform data,
            modernize processes and adopt technology — then act on what they learn with confidence.
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            <ButtonLink href="/contact">Discuss a Project</ButtonLink>
            <ButtonLink href="/services" variant="secondary">
              Explore Our Services
            </ButtonLink>
          </div>
        </div>
        <div className="lg:col-span-5">
          <div className="border border-line bg-white/80 p-4 shadow-sm backdrop-blur-[2px] sm:p-6">
            <div className="flex items-center justify-between border-b border-line pb-3">
              <span className="eyebrow">The Fold</span>
              <span className="eyebrow hidden sm:inline lg:hidden xl:inline">Complexity → Insight → Action</span>
            </div>
            <FoldVisualization className="pt-4" />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------- Positioning */

const facts = [
  { k: "Founded", v: String(site.founded) },
  { k: "Headquarters", v: `${site.headquarters.city}, ${site.headquarters.country}` },
  { k: "Reach", v: "Global engagements" },
  { k: "Practice", v: "9 service lines" },
];

function Positioning() {
  return (
    <section aria-label="Positioning" className="border-y border-line">
      <div className="container-x grid gap-12 py-16 md:py-20 lg:grid-cols-12">
        <Reveal className="lg:col-span-7">
          <p className="text-h3 !font-normal text-ink">
            Most organizations don&rsquo;t lack data, controls or technology. They lack a clear line from those things to
            a decision. <span className="text-muted">That line is what we build.</span>
          </p>
        </Reveal>
        <dl className="grid grid-cols-2 gap-x-8 gap-y-8 lg:col-span-4 lg:col-start-9">
          {facts.map((f, i) => (
            <Reveal key={f.k} delay={i * 60}>
              <dt className="eyebrow">{f.k}</dt>
              <dd className="mt-2 text-body text-ink">{f.v}</dd>
            </Reveal>
          ))}
        </dl>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------ Ecosystem */

function EcosystemSection() {
  return (
    <section aria-labelledby="eco" className="section-y">
      <div className="container-x">
        <SectionHeading
          index="01"
          label="Services"
          id="eco" title="Nine service lines. One connected view of the problem."
          intro="Risk, data and finance questions rarely arrive separately. Select a service to see what it covers and the capabilities that connect it to the rest of the practice."
          split
        />
        <div className="mt-16 lg:mt-20">
          <ServiceEcosystem />
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ Why */

const principles = [
  {
    title: "Multidisciplinary by design",
    body: "Risk, data, technology and finance specialists work as one team — so a control gap, a data problem and a broken process are solved together, not in three separate reports.",
  },
  {
    title: "Focused teams",
    body: "We keep engagement teams small and close to the work. Context isn't lost between the people who scope an engagement and the people who deliver it.",
  },
  {
    title: "Evidence over assertion",
    body: "Recommendations come with the testing, analysis and data behind them. If we can't show it, we don't claim it.",
  },
  {
    title: "Built to hand over",
    body: "Documentation, training and clear ownership are part of the scope. The goal is capability you keep, not dependency on us.",
  },
];

function WhySection() {
  return (
    <section aria-labelledby="why" className="section-y border-t border-line">
      <div className="container-x grid gap-14 lg:grid-cols-12">
        <div className="lg:col-span-5 lg:pr-8">
          <SectionHeading index="02" label="Why Data Fold" id="why" title="Built for problems that cross boundaries." />
        </div>
        <ol className="grid border-t border-line sm:grid-cols-2 lg:col-span-7">
          {principles.map((p, i) => (
            <Reveal
              as="li"
              key={p.title}
              delay={i * 70}
              className={`border-b border-line py-8 sm:py-10 ${i % 2 === 0 ? "sm:border-r sm:pr-10" : "sm:pl-10"}`}
            >
              <span className="font-mono text-label text-teal">0{i + 1}</span>
              <h3 className="mt-4 text-h4">{p.title}</h3>
              <p className="mt-3 text-small text-muted">{p.body}</p>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------- Evidence */

function EvidenceSection() {
  return (
    <section aria-labelledby="evidence" className="section-y bg-canvas">
      <div className="container-x grid items-center gap-14 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <SectionHeading
            index="03"
            label="How we think"
            id="evidence" title="Evidence changes the decision."
            intro="Initiatives are often prioritised on assumption. Testing controls, analysing the data and mapping the process narrows the uncertainty — and sometimes moves an initiative into a different category altogether."
          />
          <Reveal delay={120}>
            <ul className="mt-10 space-y-4 border-t border-line pt-8">
              {[
                "Assumed positions carry wide, often unstated, uncertainty.",
                "Evidence tightens the estimate and exposes hidden risk.",
                "Priorities become defensible to boards, auditors and regulators.",
              ].map((t) => (
                <li key={t} className="flex gap-3 text-small text-ink">
                  <span aria-hidden="true" className="mt-[0.6em] h-px w-4 shrink-0 bg-teal" />
                  {t}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
        <Reveal className="lg:col-span-6 lg:col-start-7" delay={100}>
          <div className="border border-line bg-white p-5 sm:p-8">
            <EvidenceLens />
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------ Industries */

function IndustriesSection() {
  return (
    <section aria-labelledby="ind" className="section-y">
      <div className="container-x">
        <SectionHeading
          index="04"
          label="Industries"
          id="ind" title="Different sectors. The same underlying questions."
          intro="Every organization now runs on systems, data and controls. Here is how Data Fold can support organizations across sectors."
          split
        />
        <ul className="mt-14 border-t border-ink">
          {industries.map((ind, i) => (
            <Reveal as="li" key={ind.slug} delay={Math.min(i, 5) * 40} className="border-b border-line">
              <Link
                href={`/industries#${ind.slug}`}
                className="group grid items-baseline gap-2 py-5 transition-colors hover:bg-canvas md:grid-cols-12 md:gap-6 md:px-2"
              >
                <span className="font-mono text-label text-subtle md:col-span-1">{String(i + 1).padStart(2, "0")}</span>
                <span className="text-h4 !text-[1.25rem] text-ink transition-transform duration-[var(--dur-base)] group-hover:translate-x-1 md:col-span-4">
                  {ind.name}
                </span>
                <span className="text-small text-muted md:col-span-6">{ind.pressure}</span>
                <ArrowRight
                  aria-hidden="true"
                  strokeWidth={1.5}
                  className="hidden size-5 justify-self-end text-subtle transition-all group-hover:translate-x-1 group-hover:text-teal md:col-span-1 md:block"
                />
              </Link>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------- Approach */

function ApproachSection() {
  return (
    <section aria-labelledby="approach" className="section-y bg-ink text-white">
      <div className="container-x">
        <Reveal className="grid gap-6 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <p className="eyebrow !text-white/60">
              <span className="text-[#5eead4]">05</span> — Approach
            </p>
            <h2 id="approach" className="mt-5 text-h2">
              From the decision you need to make, back to the evidence it needs.
            </h2>
          </div>
          <p className="text-lead text-white/70 lg:col-span-5 lg:self-end">
            Every engagement follows the same four movements, whether it is a control review, a dashboard or an ERP
            programme.
          </p>
        </Reveal>
        <ol className="relative mt-16 grid gap-10 md:grid-cols-2 lg:mt-20 lg:grid-cols-4 lg:gap-0">
          {approach.map((s, i) => (
            <Reveal as="li" key={s.title} delay={i * 110} className="relative lg:pr-10">
              <div className="flex items-center gap-4">
                <span className="grid size-9 place-items-center rounded-full border border-white/25 font-mono text-label">
                  0{i + 1}
                </span>
                <span aria-hidden="true" className="hidden h-px flex-1 bg-white/15 lg:block" />
              </div>
              <h3 className="mt-6 text-h3">{s.title}</h3>
              <p className="mt-3 text-small text-white/70">{s.body}</p>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------- Capabilities */

const capabilities: { title: string; body: string; services: ServiceSlug[] }[] = [
  { title: "Controls that hold up to audit", body: "Designed, documented and tested so evidence exists before anyone asks for it.", services: ["it-audit", "it-risk-advisory"] },
  { title: "Reporting leadership trusts", body: "Metrics with agreed definitions, reconciled to source and refreshed without manual effort.", services: ["data-analytics", "financial-accounting"] },
  { title: "Automation with governance", body: "AI and automation that remove work while keeping accountability and control intact.", services: ["ai-process-automation", "cyber-advisory"] },
  { title: "ERP that fits the process", body: "Processes agreed first, systems configured to match, controls designed in.", services: ["bpr-erp", "it-audit"] },
  { title: "Security posture you can explain", body: "Exposure described in business terms, with a funded plan to reduce it.", services: ["cyber-advisory", "it-risk-advisory"] },
  { title: "Forecasts you can defend", body: "Transparent models and assumptions, with the uncertainty stated honestly.", services: ["data-science", "financial-accounting"] },
];

function CapabilitiesSection() {
  return (
    <section aria-labelledby="caps" className="section-y">
      <div className="container-x">
        <SectionHeading
          index="06"
          label="Selected capabilities"
          id="caps" title="What clients can expect to have at the end."
          split
          intro="Outcomes cut across service lines. These are the capabilities we most often help organizations build."
        />
        <ul className="mt-14 grid border-l border-t border-line sm:grid-cols-2 lg:grid-cols-3">
          {capabilities.map((c, i) => (
            <Reveal as="li" key={c.title} delay={(i % 3) * 70} className="border-b border-r border-line">
              <div className="flex h-full flex-col p-7 lg:p-9">
                <span aria-hidden="true" className="block h-0.5 w-8 bg-teal" />
                <h3 className="mt-6 text-h4">{c.title}</h3>
                <p className="mt-3 flex-1 text-small text-muted">{c.body}</p>
                <ul className="mt-6 flex flex-wrap gap-2">
                  {c.services.map((slug) => (
                    <li key={slug}>
                      <Link
                        href={`/services/${slug}`}
                        className="inline-block rounded-xs border border-line px-2 py-1 font-mono text-[11px] uppercase tracking-[0.06em] text-muted transition-colors hover:border-teal hover:text-teal"
                      >
                        {getService(slug)?.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------- Insights */

function InsightsSection() {
  const latest = getAllInsights().slice(0, 3);
  return (
    <section aria-labelledby="ins" className="section-y border-t border-line">
      <div className="container-x">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading index="07" label="Insights" id="ins" title="Perspectives from the practice." />
          <ButtonLink href="/insights" variant="text" className="mb-2">
            Explore Our Insights
          </ButtonLink>
        </div>
        <div className="mt-14 grid gap-10 md:grid-cols-3 md:gap-8">
          {latest.map((ins, i) => (
            <Reveal key={ins.slug} delay={i * 80}>
              <InsightCard insight={ins} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
