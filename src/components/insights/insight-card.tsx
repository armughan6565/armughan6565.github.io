import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Insight } from "@/content/insights";
import { img, insightImages } from "@/content/media";

export const formatDate = (iso: string) =>
  new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" });

export function SampleBadge() {
  return (
    <span className="inline-flex items-center rounded-xs border border-warning/30 bg-warning-soft px-1.5 py-0.5 font-mono text-[10px] uppercase tracking-[0.08em] text-warning">
      Editorial sample
    </span>
  );
}

export function InsightCard({ insight, headingLevel = "h3" }: { insight: Insight; headingLevel?: "h2" | "h3" }) {
  const H = headingLevel;
  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-lg border border-line bg-white shadow-sm transition-shadow duration-[var(--dur-base)] hover:shadow-lg">
      <div className="aspect-[16/9] overflow-hidden bg-canvas">
        {/* eslint-disable-next-line @next/next/no-img-element -- static export, no optimizer */}
        <img
          src={img(insightImages[insight.category], 800)}
          alt=""
          loading="lazy"
          className="size-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
      </div>
      <div className="flex flex-1 flex-col p-6">
      <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
        <span className="eyebrow !text-teal">{insight.category}</span>
        <span className="eyebrow">{insight.format}</span>
        {insight.sample && <SampleBadge />}
      </div>
      <H className="mt-5 text-h4 !text-[1.3125rem] !leading-snug transition-colors group-hover:text-teal">
        <Link href={`/insights/${insight.slug}`} className="after:absolute after:inset-0">
          {insight.title}
        </Link>
      </H>
      <p className="mt-3 flex-1 text-small text-muted">{insight.dek}</p>
      <div className="mt-6 flex items-center justify-between text-caption text-subtle">
        <span>
          <time dateTime={insight.published}>{formatDate(insight.published)}</time> · {insight.readingMinutes} min read
        </span>
        <ArrowUpRight
          aria-hidden="true"
          strokeWidth={1.5}
          className="size-5 text-ink transition-transform duration-[var(--dur-base)] group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-teal"
        />
      </div>
      </div>
    </article>
  );
}
