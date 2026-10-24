import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { InsightCard, SampleBadge, formatDate } from "@/components/insights/insight-card";
import { CTASection } from "@/components/sections/cta-section";
import { getAllInsights, getInsight, type Block } from "@/content/insights";
import { JsonLd, breadcrumbJsonLd, pageMetadata } from "@/lib/seo";
import { absoluteUrl, site } from "@/config/site";
import { img, insightImages } from "@/content/media";

export const dynamicParams = false;

export function generateStaticParams() {
  return getAllInsights().map((i) => ({ slug: i.slug }));
}

export async function generateMetadata({ params }: PageProps<"/insights/[slug]">) {
  const { slug } = await params;
  const a = getInsight(slug);
  if (!a) return {};
  return {
    ...pageMetadata({ title: a.title, description: a.dek, path: `/insights/${a.slug}`, type: "article" }),
    // Editorial samples stay out of search results until replaced or approved
    ...(a.sample && { robots: { index: false, follow: true } }),
  };
}

function RenderBlock({ block }: { block: Block }) {
  switch (block.type) {
    case "h2":
      return <h2 className="mt-12 text-h3">{block.text}</h2>;
    case "list":
      return (
        <ul className="mt-6 space-y-3">
          {block.items.map((item) => (
            <li key={item} className="flex gap-4">
              <span aria-hidden="true" className="mt-[0.8em] h-px w-4 shrink-0 bg-teal" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      );
    case "quote":
      return (
        <blockquote className="my-12 border-l-2 border-teal pl-6 text-h3 !font-normal text-ink">{block.text}</blockquote>
      );
    default:
      return <p className="mt-6">{block.text}</p>;
  }
}

export default async function InsightPage({ params }: PageProps<"/insights/[slug]">) {
  const { slug } = await params;
  const a = getInsight(slug);
  if (!a) notFound();

  const more = getAllInsights()
    .filter((i) => i.slug !== a.slug)
    .sort((x, y) => Number(y.category === a.category) - Number(x.category === a.category))
    .slice(0, 3);

  return (
    <>
      <JsonLd
        data={[
          {
            "@context": "https://schema.org",
            "@type": "Article",
            headline: a.title,
            description: a.dek,
            datePublished: a.published,
            articleSection: a.category,
            mainEntityOfPage: absoluteUrl(`/insights/${a.slug}`),
            author: { "@type": "Organization", name: site.name },
            publisher: { "@id": absoluteUrl("/#organization") },
          },
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Insights", path: "/insights" },
            { name: a.title, path: `/insights/${a.slug}` },
          ]),
        ]}
      />

      <article>
        <header className="relative overflow-hidden bg-navy pt-[var(--header-h)] text-white">
          {/* eslint-disable-next-line @next/next/no-img-element -- static export, no optimizer */}
          <img src={img(insightImages[a.category], 1800)} alt="" aria-hidden="true" className="absolute inset-0 size-full object-cover" />
          <div aria-hidden="true" className="absolute inset-0 bg-[linear-gradient(100deg,rgb(6_20_43/0.96)_20%,rgb(6_20_43/0.8)_60%,rgb(15_118_110/0.5))]" />
          <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-mint via-sky to-amber" />
          <div className="container-x relative pb-14 pt-12 md:pb-20 md:pt-16">
            <Link href="/insights" className="group eyebrow inline-flex items-center gap-2 !text-white/70 hover:!text-white">
              <ArrowLeft aria-hidden="true" className="size-3.5 transition-transform group-hover:-translate-x-0.5" />
              Insights
            </Link>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <span className="eyebrow !text-mint">{a.category}</span>
              <span className="eyebrow !text-white/60">{a.format}</span>
              {a.sample && <SampleBadge />}
            </div>
            <h1 className="mt-5 max-w-4xl text-h1">{a.title}</h1>
            <p className="mt-6 max-w-2xl text-lead text-white/75">{a.dek}</p>
            <p className="mt-8 text-caption text-white/60">
              <time dateTime={a.published}>{formatDate(a.published)}</time> · {a.readingMinutes} min read · {site.name}
            </p>
          </div>
        </header>

        <div className="container-x grid gap-10 py-16 lg:grid-cols-12 lg:py-24">
          <div className="max-w-[68ch] text-[1.0625rem] leading-[1.75] text-ink/90 lg:col-span-7 lg:col-start-3">
            {a.sample && (
              <p className="mb-10 rounded-sm border border-warning/30 bg-warning-soft p-4 text-small text-warning">
                This is an editorial sample written to demonstrate the Insights layout. Review and approve or replace
                before launch.
              </p>
            )}
            {a.body.map((b, i) => (
              <RenderBlock key={i} block={b} />
            ))}
          </div>
        </div>
      </article>

      <section aria-labelledby="more" className="border-t border-line py-20 lg:py-28">
        <div className="container-x">
          <h2 id="more" className="text-h2">
            More perspectives
          </h2>
          <div className="mt-12 grid gap-10 md:grid-cols-3 md:gap-8">
            {more.map((i) => (
              <InsightCard key={i.slug} insight={i} />
            ))}
          </div>
        </div>
      </section>

      <CTASection
        label="Continue the conversation"
        title="Facing this question in your organization?"
        body="We can help you work out what it means for your systems, data and controls."
        primary={{ href: "/contact", label: "Talk to an Advisor" }}
        secondary={{ href: "/insights", label: "More insights" }}
      />
    </>
  );
}
