import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/sections/page-hero";
import { CTASection } from "@/components/sections/cta-section";
import { caseStudies, getCaseStudy } from "@/content/case-studies";
import { getService } from "@/content/services";
import { pageMetadata } from "@/lib/seo";

/**
 * Case-study template. Not linked from navigation while only the layout sample exists.
 * Samples are noindex and excluded from the sitemap.
 */
export const dynamicParams = false;

export function generateStaticParams() {
  return caseStudies.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: PageProps<"/case-studies/[slug]">) {
  const { slug } = await params;
  const c = getCaseStudy(slug);
  if (!c) return {};
  return pageMetadata({ title: c.title, description: c.challenge.slice(0, 155), path: `/case-studies/${c.slug}`, noindex: c.sample });
}

function Block({ index, title, children }: { index: string; title: string; children: React.ReactNode }) {
  return (
    <section className="grid gap-6 border-t border-line py-10 md:grid-cols-12">
      <h2 className="md:col-span-4">
        <span className="font-mono text-label text-teal">{index}</span>
        <span className="mt-2 block text-h3">{title}</span>
      </h2>
      <div className="text-body text-muted md:col-span-8">{children}</div>
    </section>
  );
}

export default async function CaseStudyPage({ params }: PageProps<"/case-studies/[slug]">) {
  const { slug } = await params;
  const c = getCaseStudy(slug);
  if (!c) notFound();

  return (
    <>
      <PageHero label="Case study" title={c.title} intro={`${c.client} · ${c.sector}`}>
        {c.sample && (
          <p className="mt-8 inline-block rounded-sm border border-warning/30 bg-warning-soft px-4 py-3 text-small text-warning">
            Sample content — replace before launch. No client, figures or dates are real.
          </p>
        )}
      </PageHero>
      <div className="container-x pb-20">
        <Block index="01" title="Challenge"><p>{c.challenge}</p></Block>
        <Block index="02" title="Approach">
          <ol className="list-decimal space-y-2 pl-5">{c.approach.map((a) => <li key={a}>{a}</li>)}</ol>
        </Block>
        <Block index="03" title="Solution"><p>{c.solution}</p></Block>
        <Block index="04" title="Technology">
          <ul className="flex flex-wrap gap-2">
            {c.technology.map((t) => (
              <li key={t} className="rounded-xs border border-line px-2 py-1 font-mono text-[11px] uppercase">{t}</li>
            ))}
          </ul>
        </Block>
        <Block index="05" title="Outcome"><p>{c.outcome}</p></Block>
        <Block index="06" title="Key insights">
          <ul className="space-y-2">{c.insights.map((i) => <li key={i}>{i}</li>)}</ul>
          <p className="mt-6 text-small">
            Services:{" "}
            {c.services.map((s, i) => (
              <span key={s}>
                {i > 0 && ", "}
                <Link href={`/services/${s}`} className="text-teal underline underline-offset-4">{getService(s)?.name}</Link>
              </span>
            ))}
          </p>
        </Block>
      </div>
      <CTASection
        title="Facing a similar challenge?"
        body="Tell us about your situation and we will outline how we would approach it."
        primary={{ href: "/contact?intent=project", label: "Discuss a Project" }}
      />
    </>
  );
}
