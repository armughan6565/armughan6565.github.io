"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Evidence lens: illustrative initiatives plotted by value and risk.
 * "Assumption" — positions are guesses with wide uncertainty.
 * "Evidence"   — after assessment, positions sharpen and some move quadrant.
 * No real data: every point is labelled as illustrative in the UI.
 */

type Item = { label: string; guess: [number, number]; evidence: [number, number]; spread: number };

// Coordinates are 0–100 (x = value, y = risk; y is flipped when drawn)
const items: Item[] = [
  { label: "ERP upgrade", guess: [58, 44], evidence: [74, 68], spread: 20 },
  { label: "AI assistant", guess: [70, 40], evidence: [66, 28], spread: 24 },
  { label: "Report automation", guess: [44, 38], evidence: [80, 20], spread: 18 },
  { label: "Legacy platform", guess: [40, 56], evidence: [26, 82], spread: 22 },
  { label: "Vendor migration", guess: [52, 58], evidence: [36, 60], spread: 20 },
  { label: "Access clean-up", guess: [34, 34], evidence: [58, 14], spread: 16 },
];

const quadrants = [
  { x: 75, y: 25, label: "Act now" },
  { x: 75, y: 75, label: "Act with controls" },
  { x: 25, y: 25, label: "Monitor" },
  { x: 25, y: 75, label: "Redesign or stop" },
];

// Plot area inside a 400 × 400 viewBox
const P = { x: 40, y: 16, w: 344, h: 344 };
const toX = (v: number) => P.x + (v / 100) * P.w;
const toY = (v: number) => P.y + P.h - (v / 100) * P.h;

export function EvidenceLens() {
  const [mode, setMode] = useState<"assumption" | "evidence">("assumption");
  const touched = useRef(false);
  const ref = useRef<HTMLDivElement>(null);

  // Play the change once when the chart is first seen, unless the user already chose
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let t: ReturnType<typeof setTimeout>;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          t = setTimeout(() => !touched.current && setMode("evidence"), 1400);
          io.disconnect();
        }
      },
      { threshold: 0.5 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      clearTimeout(t);
    };
  }, []);

  const choose = (m: typeof mode) => {
    touched.current = true;
    setMode(m);
  };
  const ev = mode === "evidence";

  return (
    <div ref={ref}>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div role="group" aria-label="View" className="inline-flex rounded-sm border border-line p-1">
          {(["assumption", "evidence"] as const).map((m) => (
            <button
              key={m}
              type="button"
              aria-pressed={mode === m}
              onClick={() => choose(m)}
              className="rounded-xs px-4 py-2 text-small capitalize text-muted transition-colors aria-pressed:bg-ink aria-pressed:text-white"
            >
              {m === "assumption" ? "Before: assumption" : "After: evidence"}
            </button>
          ))}
        </div>
        <span className="eyebrow">Illustrative — not client data</span>
      </div>

      <svg
        viewBox="0 0 400 400"
        className="mt-6 block h-auto w-full"
        role="img"
        aria-label={`Illustrative value versus risk matrix showing ${ev ? "positions after evidence-based assessment" : "initial assumed positions with wide uncertainty"}.`}
      >
        <rect x={P.x} y={P.y} width={P.w} height={P.h} fill="#f5f6f8" />
        <line x1={toX(50)} x2={toX(50)} y1={P.y} y2={P.y + P.h} stroke="#cfd4dc" />
        <line x1={P.x} x2={P.x + P.w} y1={toY(50)} y2={toY(50)} stroke="#cfd4dc" />
        {/* Highlight the quadrant worth acting on */}
        <rect
          x={toX(50)} y={toY(50)} width={P.w / 2} height={P.h / 2}
          fill="#e7f3f1" opacity={ev ? 1 : 0}
          style={{ transition: "opacity 600ms var(--ease-out)" }}
        />
        {quadrants.map((q) => (
          <text
            key={q.label}
            x={toX(q.x)} y={toY(q.y > 50 ? 96 : 4) + (q.y > 50 ? 10 : -6)}
            textAnchor="middle"
            className="fill-subtle font-mono text-[10px] uppercase tracking-[0.08em]"
          >
            {q.label}
          </text>
        ))}
        <text x={P.x + P.w} y={P.y + P.h + 26} textAnchor="end" className="fill-muted font-mono text-[10px] uppercase tracking-[0.08em]">
          Business value →
        </text>
        <text
          transform={`translate(${P.x - 18} ${P.y}) rotate(-90)`}
          textAnchor="end"
          className="fill-muted font-mono text-[10px] uppercase tracking-[0.08em]"
        >
          Risk →
        </text>

        {items.map((it, i) => {
          const [vx, vy] = ev ? it.evidence : it.guess;
          const spread = ev ? 5 : it.spread;
          return (
            <g
              key={it.label}
              style={{
                transform: `translate(${toX(vx)}px, ${toY(vy)}px)`,
                transition: `transform 1000ms var(--ease-out) ${i * 70}ms`,
              }}
            >
              <circle
                r="1"
                fill="#2563eb"
                fillOpacity={ev ? 0.1 : 0.06}
                stroke="#2563eb"
                strokeOpacity={0.35}
                strokeDasharray={ev ? undefined : "2 2"}
                vectorEffect="non-scaling-stroke"
                style={{
                  transform: `scale(${spread * 1.6})`,
                  transition: `transform 1000ms var(--ease-out) ${i * 70}ms, fill-opacity 600ms`,
                }}
              />
              <circle r="4" fill={ev ? "#0b1220" : "#667085"} style={{ transition: "fill 600ms" }} />
              <text
                x={vx > 60 ? -9 : 9}
                y="4"
                textAnchor={vx > 60 ? "end" : "start"}
                className="fill-ink text-[12px]"
                style={{ fontWeight: 500, opacity: ev ? 1 : 0, transition: `opacity 500ms ${ev ? 700 + i * 70 : 0}ms` }}
              >
                {it.label}
              </text>
            </g>
          );
        })}
      </svg>
      <p aria-live="polite" className="mt-4 min-h-[3em] text-small text-muted">
        {ev
          ? "After assessment: three initiatives are clear to act on now, one needs added controls, and two should be redesigned or stopped."
          : "Before assessment: six initiatives cluster near the middle. The uncertainty is too wide to rank them with confidence."}
      </p>
    </div>
  );
}
