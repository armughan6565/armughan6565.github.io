import Link from "next/link";
import { PageHero } from "@/components/sections/page-hero";
import { Reveal } from "@/components/motion/reveal";
import { CTASection } from "@/components/sections/cta-section";
import { industries } from "@/content/industries";
import { getService } from "@/content/services";
import { pageMetadata } from "@/lib/seo";

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
        title="Different sectors. The same need for clarity."
        intro="Pressures differ by sector, but the underlying questions — can we trust our systems, our data and our numbers? — are remarkably consistent. Here is how Data Fold can support organizations in each."
      />

      <section aria-label="Industries" className="border-t border-line pb-24 lg:pb-32">
        <div className="container-x grid gap-12 lg:grid-cols-12">
          {/* Sticky index (desktop) */}
          <nav aria-label="Industries index" className="hidden lg:col-span-3 lg:block">
            <ol className="sticky top-[calc(var(--header-h)+2rem)] space-y-1 pt-12">
              {industries.map((ind, i) => (
                <li key={ind.slug}>
                  <a
                    href={`#${ind.slug}`}
                    className="group flex items-baseline gap-3 py-1.5 text-small text-muted transition-colors hover:text-ink"
                  >
                    <span className="font-mono text-label text-subtle group-hover:text-teal">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="link-underline">{ind.name}</span>
                  </a>
                </li>
              ))}
            </ol>
          </nav>

          <div className="lg:col-span-9">
            {industries.map((ind, i) => (
              <Reveal
                as="article"
                key={ind.slug}
                className="grid scroll-mt-28 gap-8 border-b border-line py-12 md:grid-cols-9 lg:py-14"
              >
                <header id={ind.slug} className="scroll-mt-28 md:col-span-4">
                  <span className="font-mono text-label text-teal">{String(i + 1).padStart(2, "0")}</span>
                  <h2 className="mt-3 text-h3">{ind.name}</h2>
                  <p className="mt-4 text-small text-muted">{ind.pressure}</p>
                </header>
                <div className="md:col-span-5">
                  <h3 className="eyebrow">How Data Fold can support</h3>
                  <ul className="mt-4 space-y-3">
                    {ind.support.map((s) => (
                      <li key={s} className="flex gap-3 text-body text-ink">
                        <span aria-hidden="true" className="mt-[0.7em] h-px w-4 shrink-0 bg-teal" />
                        {s}
                      </li>
                    ))}
                  </ul>
                  <ul className="mt-6 flex flex-wrap gap-2" aria-label="Relevant services">
                    {ind.services.map((slug) => (
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
          </div>
        </div>
      </section>

      <CTASection
        label="Your sector"
        title="Tell us about the pressures in your organization."
        body="We will be clear about where our capabilities apply to your context and where they don't."
        primary={{ href: "/contact", label: "Request a Consultation" }}
        secondary={{ href: "/services", label: "Explore Our Services" }}
      />
    </>
  );
}
