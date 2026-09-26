"use client";

import { useEffect, useRef, useState } from "react";

/**
 * THE FOLD — Data Fold's signature visualization.
 * 48 data cells travel through four states: Fragmented → Structured → Insight → Action.
 * Positions are computed once; CSS transitions on `transform` do the motion (GPU-only,
 * no layout work). Auto-advances while visible; pauses on hover/focus, when off-screen,
 * and entirely under prefers-reduced-motion.
 */

const W = 520;
const H = 380;
const INTERVAL = 3600;
const CELL = 22;
const PITCH = 30;
const N = 48;

export const stages = [
  { id: "fragmented", label: "Fragmented", caption: "Data arrives scattered — across systems, spreadsheets and teams." },
  { id: "structured", label: "Structured", caption: "We reconcile, model and control it until it can be trusted." },
  { id: "insight", label: "Insight", caption: "Patterns, exceptions and trends become visible and measurable." },
  { id: "action", label: "Action", caption: "Leadership decides and acts — with evidence behind the decision." },
] as const;

type Cell = { x: number; y: number; r: number; s: number; fill: string; o: number };

const INK = "#0b1220";
const TEAL = "#0f766e";
const BLUE = "#2563eb";
const GREY = "#cfd4dc";

function mulberry32(seed: number) {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** Centre a set of grid coordinates (col,row) on the canvas */
function place(coords: [number, number][], rows: number, cols: number) {
  const ox = (W - (cols * PITCH - (PITCH - CELL))) / 2;
  const oy = (H - (rows * PITCH - (PITCH - CELL))) / 2;
  return coords.map(([c, r]) => ({ x: ox + c * PITCH, y: oy + r * PITCH }));
}

function buildLayouts(): Cell[][] {
  const rand = mulberry32(20250101);

  const fragmented: Cell[] = Array.from({ length: N }, () => {
    const t = rand();
    return {
      x: 16 + rand() * (W - CELL - 32),
      y: 16 + rand() * (H - CELL - 32),
      r: (rand() - 0.5) * 80,
      s: 0.45 + rand() * 0.55,
      fill: t > 0.86 ? TEAL : t > 0.72 ? INK : GREY,
      o: 0.35 + rand() * 0.5,
    };
  });

  // 8 × 6 table: key column in teal, header row in ink
  const gridCoords: [number, number][] = Array.from({ length: N }, (_, i) => [i % 8, Math.floor(i / 8)]);
  const structured = place(gridCoords, 6, 8).map((p, i) => {
    const [c, r] = gridCoords[i];
    return { ...p, r: 0, s: 1, fill: r === 0 ? INK : c === 0 ? TEAL : GREY, o: r === 0 ? 0.9 : c === 0 ? 0.85 : 0.9 };
  });

  // Bar chart with a rising trend; final column is the insight (accent)
  const heights = [2, 3, 4, 4, 5, 6, 7, 8, 9];
  const barCoords: [number, number][] = [];
  heights.forEach((h, c) => {
    for (let k = 0; k < h; k++) barCoords.push([c, 8 - k]);
  });
  const insight = place(barCoords, 9, 9).map((p, i) => {
    const last = barCoords[i][0] === 8;
    return { ...p, r: 0, s: 1, fill: last ? BLUE : TEAL, o: last ? 1 : 0.35 + (barCoords[i][0] / 8) * 0.55 };
  });

  // Arrow: 3 × 8 shaft + stepped head
  const arrowCoords: [number, number][] = [];
  for (let c = 0; c < 8; c++) for (let r = 3; r <= 5; r++) arrowCoords.push([c, r]);
  [[8, 0, 8], [9, 1, 7], [10, 2, 6], [11, 3, 5]].forEach(([c, a, b]) => {
    for (let r = a; r <= b; r++) arrowCoords.push([c, r]);
  });
  const action = place(arrowCoords, 9, 12).map((p, i) => {
    const head = arrowCoords[i][0] >= 8;
    return { ...p, r: 0, s: 1, fill: head ? BLUE : INK, o: head ? 1 : 0.25 + (arrowCoords[i][0] / 7) * 0.7 };
  });

  return [fragmented, structured, insight, action];
}

const layouts = buildLayouts();
/** Just below the bottom of the 9-row bar chart */
const BASE_Y = (H + 9 * PITCH - (PITCH - CELL)) / 2 + 5;

export function FoldVisualization({ className = "" }: { className?: string }) {
  const [stage, setStage] = useState(0);
  const [paused, setPaused] = useState(false);
  const [visible, setVisible] = useState(true);
  const [reduced, setReduced] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => {
      setReduced(mq.matches);
      if (mq.matches) setStage(2);
    };
    apply();
    mq.addEventListener("change", apply);
    // First assembly shortly after load — the brand moment
    const t = mq.matches ? undefined : setTimeout(() => setStage(1), 700);
    return () => {
      mq.removeEventListener("change", apply);
      clearTimeout(t);
    };
  }, []);

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { threshold: 0.2 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (reduced || paused || !visible) return;
    const id = setInterval(() => setStage((s) => (s + 1) % stages.length), INTERVAL);
    return () => clearInterval(id);
  }, [reduced, paused, visible]);

  const cells = layouts[stage];

  return (
    <figure
      ref={rootRef}
      className={`relative ${className}`}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <svg viewBox={`0 0 ${W} ${H}`} className="block h-auto w-full" role="img" aria-labelledby="fold-caption">
        {/* Baseline appears when the data becomes a chart */}
        <line
          x1="60" x2={W - 60} y1={BASE_Y} y2={BASE_Y}
          stroke={INK} strokeOpacity={stage === 2 ? 0.35 : 0} strokeWidth="1"
          style={{ transition: "stroke-opacity 600ms var(--ease-out)" }}
        />
        {cells.map((c, i) => (
          <rect
            key={i}
            width={CELL}
            height={CELL}
            rx="2"
            fill={c.fill}
            fillOpacity={c.o}
            style={{
              transformBox: "fill-box",
              transformOrigin: "center",
              transform: `translate(${c.x}px, ${c.y}px) rotate(${c.r}deg) scale(${c.s})`,
              transition: `transform 1100ms var(--ease-out) ${i * 12}ms, fill 700ms ease ${i * 12}ms, fill-opacity 700ms ease ${i * 12}ms`,
            }}
          />
        ))}
      </svg>

      <figcaption className="mt-5">
        <div className="grid grid-cols-4 gap-2" role="group" aria-label="Visualization stage">
          {stages.map((s, i) => {
            const on = stage === i;
            const playing = on && !reduced && !paused && visible;
            return (
              <button
                key={s.id}
                type="button"
                aria-pressed={on}
                onClick={() => setStage(i)}
                className="group pt-0 text-left"
              >
                {/* Segment doubles as the auto-advance timer */}
                <span aria-hidden="true" className="relative block h-0.5 overflow-hidden bg-line">
                  <span
                    key={playing ? `play-${stage}` : "static"}
                    className={`absolute inset-0 origin-left bg-teal ${on ? "" : "scale-x-0"}`}
                    style={playing ? { animation: `stage-progress ${INTERVAL}ms linear both` } : undefined}
                  />
                </span>
                <span className={`mt-3 block font-mono text-label ${on ? "text-teal" : "text-subtle"}`}>0{i + 1}</span>
                <span className={`mt-0.5 block text-caption transition-colors ${on ? "text-ink" : "text-muted group-hover:text-ink"}`}>
                  {s.label}
                </span>
              </button>
            );
          })}
        </div>
        <p id="fold-caption" aria-live={paused ? "polite" : "off"} className="mt-4 min-h-[3em] text-small text-muted">
          {stages[stage].caption}
        </p>
      </figcaption>
    </figure>
  );
}
