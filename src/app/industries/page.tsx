import Link from "next/link";
import { Check } from "lucide-react";
import { PageHero } from "@/components/sections/page-hero";
import { Reveal } from "@/components/motion/reveal";
import { CTASection } from "@/components/sections/cta-section";
import { industries } from "@/content/industries";
import { getService } from "@/content/services";
import { pageMetadata } from "@/lib/seo";
import { img, industryImages } from "@/content/media";

export const metadata = pageMetadata({
  title: "Industries — How Data Fold Supports Organizations Across Sectors",
  description:
    "How Data Fold can support financial services, banking, insurance, manufacturing, retail, healthcare, technology, professional services and the public sector.",
  path: "/industries",
});

export default function IndustriesPage() {
  return (
    <>
      <PageHero
        label="Industries"
        title="Industries"
        intro="How our services apply in each sector."
        image="1444653614773-995cb1ef9efa"
      />

      <section aria-label="Industries" className="section-y bg-canvas">
        <ul className="container-x grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {industries.map((ind, i) => (
            <Reveal
              as="li"
              key={ind.slug}
              delay={(i % 3) * 80}
              className="group flex flex-col overflow-hidden rounded-lg bg-white shadow-sm transition-shadow hover:shadow-lg"
            >
              <article id={ind.slug} className="flex flex-1 scroll-mt-28 flex-col">
                <header className="relative h-48 overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element -- static export, no optimizer */}
                  <img
                    src={img(industryImages[ind.slug], 800)}
                    alt=""
                    loading="lazy"
                    className="size-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  <span aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-navy/90 via-navy/20 to-transparent" />
                  <h2 className="absolute inset-x-6 bottom-5 text-h3 text-white">{ind.name}</h2>
                </header>
                <div className="flex flex-1 flex-col p-6">
                  <ul className="flex-1 space-y-2.5">
                    {ind.support.map((s) => (
                      <li key={s} className="flex gap-3 text-small text-ink">
                        <Check aria-hidden="true" strokeWidth={2} className="mt-0.5 size-4 shrink-0 text-teal" />
                        {s}
                      </li>
                    ))}
                  </ul>
                  <ul className="mt-6 flex flex-wrap gap-2" aria-label="Relevant services">
                    {ind.services.map((slug) => (
                      <li key={slug}>
                        <Link
                          href={`/services/${slug}`}
                          className="inline-block rounded-full bg-teal-soft px-3 py-1 text-caption text-teal transition-colors hover:bg-teal hover:text-white"
                        >
                          {getService(slug)?.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            </Reveal>
          ))}
        </ul>
      </section>

      <CTASection
        label="Your sector"
        title="Discuss your sector."
        body="Tell us about your organization and the support you need."
        primary={{ href: "/contact", label: "Request a Consultation" }}
        secondary={{ href: "/services", label: "Explore Our Services" }}
      />
    </>
  );
}
