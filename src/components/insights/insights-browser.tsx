"use client";

import { useState } from "react";
import { InsightCard } from "./insight-card";
import type { Insight, InsightCategory } from "@/content/insights";

export function InsightsBrowser({ insights, categories }: { insights: Insight[]; categories: InsightCategory[] }) {
  const [filter, setFilter] = useState<InsightCategory | "All">("All");
  const shown = filter === "All" ? insights : insights.filter((i) => i.category === filter);

  return (
    <>
      <div role="group" aria-label="Filter by topic" className="flex flex-wrap gap-2">
        {(["All", ...categories] as const).map((c) => {
          const count = c === "All" ? insights.length : insights.filter((i) => i.category === c).length;
          return (
            <button
              key={c}
              type="button"
              aria-pressed={filter === c}
              onClick={() => setFilter(c)}
              className="inline-flex items-center gap-2 rounded-sm border border-line px-3.5 py-2 text-small text-muted transition-colors hover:border-ink hover:text-ink aria-pressed:border-ink aria-pressed:bg-ink aria-pressed:text-white"
            >
              {c}
              <span className="font-mono text-[11px] opacity-60">{count}</span>
            </button>
          );
        })}
      </div>
      <p className="sr-only" aria-live="polite">
        {shown.length} {shown.length === 1 ? "article" : "articles"} shown
      </p>
      <div className="mt-12 grid gap-x-8 gap-y-14 md:grid-cols-2 lg:grid-cols-3">
        {shown.map((ins) => (
          <InsightCard key={ins.slug} insight={ins} headingLevel="h2" />
        ))}
        {shown.length === 0 && <p className="text-body text-muted">No articles in this topic yet.</p>}
      </div>
    </>
  );
}
