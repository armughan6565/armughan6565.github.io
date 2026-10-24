import Link from "next/link";
import { ArrowUpRight, ClipboardCheck, PackageCheck, UsersRound, Compass } from "lucide-react";
import { PageHero } from "@/components/sections/page-hero";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/motion/reveal";
import { CTASection } from "@/components/sections/cta-section";
import { domainOrder, domains, servicesByDomain } from "@/content/services";
import { pageMetadata } from "@/lib/seo";
import { domainColor, img, photos, serviceImages } from "@/content/media";

export const metadata = pageMetadata({
  title: "Services — IT Audit, Risk, Cyber, Data, AI, Tax, Finance & ERP",
  description:
    "Nine connected service lines across data, technology and business: IT audit, IT risk advisory, cyber advisory, data analytics, AI and automation, data science, tax, financial accounting, and BPR & ERP.",
  path: "/services",
});

const models = [
  { icon: ClipboardCheck, title: "Assessment", body: "Where you stand, what to prioritise." },
  { icon: PackageCheck, title: "Project delivery", body: "A defined outcome, end to end." },
  { icon: UsersRound, title: "Co-sourced support", body: "Specialists alongside your team." },
  { icon: Compass, title: "Ongoing advisory", body: "An independent view as decisions arise." },
];

export default function ServicesPage() {
  return (
    <>
      <PageHero
        label="Services"
        title="Services"
        intro="Nine service lines across data, technology and business, available individually or combined."
        image={photos.dashboard}
      />

      <section aria-labelledby="by-domain" className="section-y bg-canvas">
        <div className="container-x">
          <SectionHeading index="01" label="By discipline" id="by-domain" title="Services by discipline" />
          <div className="mt-14 space-y-16">
            {domainOrder.map((d) => (
              <Reveal key={d}>
                <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
                  <span aria-hidden="true" className={`size-3 rounded-full ${domainColor[d].bg}`} />
                  <h3 className="text-h3">{domains[d].name}</h3>
                  <p className="text-body text-muted">{domains[d].line}</p>
                </div>
                <ul className="mt-6 grid gap-6 md:grid-cols-3">
                  {servicesByDomain(d).map((s) => (
                    <li key={s.slug}>
                      <Link
                        href={`/services/${s.slug}`}
                        className="border-beam group flex h-full flex-col overflow-hidden rounded-lg bg-white shadow-sm transition-shadow hover:shadow-lg"
                      >
                        <span className="relative block aspect-[16/10] overflow-hidden">
                          {/* eslint-disable-next-line @next/next/no-img-element -- static export, no optimizer */}
                          <img
                            src={img(serviceImages[s.slug], 800)}
                            alt=""
                            loading="lazy"
                            className="size-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                          />
                          <span aria-hidden="true" className={`absolute inset-x-0 bottom-0 h-1 ${domainColor[d].bg}`} />
                        </span>
                        <span className="flex flex-1 flex-col p-6">
                          <span className="flex items-center justify-between gap-4 text-h4">
                            {s.name}
                            <ArrowUpRight
                              aria-hidden="true"
                              strokeWidth={1.5}
                              className="size-5 shrink-0 text-subtle transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-teal"
                            />
                          </span>
                          <span className="mt-2 text-small text-muted">{s.summary}</span>
                        </span>
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
            title="Engagement models"
          />
          <ol className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {models.map((mo, i) => (
              <Reveal as="li" key={mo.title} delay={i * 70} className="rounded-lg border border-line p-7 transition-colors hover:border-teal hover:bg-teal-soft/40">
                <span className="grid size-11 place-items-center rounded-md bg-teal-soft text-teal">
                  <mo.icon aria-hidden="true" strokeWidth={1.75} className="size-5" />
                </span>
                <h3 className="mt-5 text-h4">{mo.title}</h3>
                <p className="mt-3 text-small text-muted">{mo.body}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <CTASection
        label="Not sure where to start?"
        title="Not sure which service you need?"
        body="Describe your situation and we will recommend a starting point."
        primary={{ href: "/contact", label: "Talk to an Advisor" }}
      />
    </>
  );
}
