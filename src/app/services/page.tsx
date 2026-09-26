import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PageHero } from "@/components/sections/page-hero";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/motion/reveal";
import { ServiceEcosystem } from "@/components/visuals/service-ecosystem";
import { CTASection } from "@/components/sections/cta-section";
import { domainOrder, domains, servicesByDomain } from "@/content/services";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Services — IT Audit, Risk, Cyber, Data, AI, Tax, Finance & ERP",
  description:
    "Nine connected service lines across data, technology and business: IT audit, IT risk advisory, cyber advisory, data analytics, AI and automation, data science, tax, financial accounting, and BPR & ERP.",
  path: "/services",
});

const models = [
  { title: "Assessment", body: "A fixed-scope diagnostic that tells you where you stand and what to prioritise." },
  { title: "Project delivery", body: "A defined outcome — a framework, a dashboard, a redesigned process — delivered end to end." },
  { title: "Co-sourced support", body: "Specialist capacity alongside your internal audit, finance or technology team." },
  { title: "Ongoing advisory", body: "A standing relationship for leadership that wants an independent view as decisions arise." },
];

export default function ServicesPage() {
  return (
    <>
      <PageHero
        label="Services"
        title="Nine service lines. Three disciplines. One team."
        intro="Our services are organized around three disciplines — data, technology and business — and designed to be combined. Most meaningful problems need more than one."
      />

      <section aria-labelledby="eco" className="section-y !pt-8">
        <div className="container-x">
          <h2 id="eco" className="sr-only">Service ecosystem</h2>
          <ServiceEcosystem />
        </div>
      </section>

      <section aria-labelledby="by-domain" className="section-y border-t border-line bg-canvas">
        <div className="container-x">
          <SectionHeading index="01" label="By discipline" id="by-domain" title="Every service, in context." />
          <div className="mt-14 space-y-16">
            {domainOrder.map((d) => (
              <Reveal key={d} className="grid gap-8 border-t border-ink pt-8 lg:grid-cols-12">
                <div className="lg:col-span-4">
                  <h3 className="text-h3">{domains[d].name}</h3>
                  <p className="mt-2 text-body font-medium text-teal">{domains[d].line}</p>
                  <p className="mt-3 max-w-sm text-small text-muted">{domains[d].description}</p>
                </div>
                <ul className="divide-y divide-line border-y border-line lg:col-span-8">
                  {servicesByDomain(d).map((s) => (
                    <li key={s.slug}>
                      <Link
                        href={`/services/${s.slug}`}
                        className="group grid items-baseline gap-2 bg-white px-5 py-6 transition-colors hover:bg-teal-soft/50 sm:grid-cols-12 sm:gap-6"
                      >
                        <span className="font-mono text-label text-subtle group-hover:text-teal sm:col-span-1">{s.number}</span>
                        <span className="text-h4 sm:col-span-4">{s.name}</span>
                        <span className="text-small text-muted sm:col-span-6">{s.summary}</span>
                        <ArrowRight
                          aria-hidden="true"
                          strokeWidth={1.5}
                          className="hidden size-5 justify-self-end text-subtle transition-transform group-hover:translate-x-1 group-hover:text-teal sm:col-span-1 sm:block"
                        />
                      </Link>
                    </li>
                  ))}
                </ul>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section aria-labelledby="models" className="section-y">
        <div className="container-x">
          <SectionHeading
            index="02"
            label="Ways to work together"
            id="models"
            title="Engagements shaped around the problem."
            intro="We agree scope, deliverables and team before work starts. Engagements typically take one of four forms."
            split
          />
          <ol className="mt-14 grid border-t border-line sm:grid-cols-2 lg:grid-cols-4">
            {models.map((mo, i) => (
              <Reveal as="li" key={mo.title} delay={i * 70} className="border-b border-line py-8 sm:pr-8 lg:border-b-0">
                <span className="font-mono text-label text-teal">0{i + 1}</span>
                <h3 className="mt-4 text-h4">{mo.title}</h3>
                <p className="mt-3 text-small text-muted">{mo.body}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <CTASection
        label="Not sure where to start?"
        title="Talk to an advisor about the problem, not the service line."
        body="Describe the situation. We will suggest the right combination of services — or tell you if a smaller first step makes more sense."
        primary={{ href: "/contact", label: "Talk to an Advisor" }}
      />
    </>
  );
}
