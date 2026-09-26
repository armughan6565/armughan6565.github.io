"use client";

import Link from "next/link";
import { useState } from "react";
import { AnimatePresence, LazyMotion, domAnimation, m, useReducedMotion } from "motion/react";
import { ArrowRight } from "lucide-react";
import {
  domainOrder,
  domains,
  serviceLinks,
  services,
  servicesByDomain,
  type DomainId,
  type Service,
  type ServiceSlug,
} from "@/content/services";

/**
 * Service ecosystem: a chord diagram. Services sit on three domain arcs;
 * chords are real cross-service capabilities (see serviceLinks).
 * Selecting a service highlights its connections and updates the detail panel.
 * Below md the diagram is replaced by a grouped list driving the same panel.
 */

const R = 33; // node radius, % of the square
const domainAngles: Record<DomainId, number[]> = {
  data: [-130, -90, -50],
  technology: [-10, 30, 70],
  business: [110, 150, 190],
};

const rad = (deg: number) => (deg * Math.PI) / 180;
const point = (deg: number, r = R) => ({ x: 50 + r * Math.cos(rad(deg)), y: 50 + r * Math.sin(rad(deg)) });

const nodes = Object.fromEntries(
  domainOrder.flatMap((d) =>
    servicesByDomain(d).map((s, i) => {
      const angle = domainAngles[d][i];
      return [s.slug, { angle, ...point(angle) }];
    }),
  ),
) as Record<ServiceSlug, { angle: number; x: number; y: number }>;

/** Pie wedge from the centre, used to shade the active discipline */
function wedgePath(from: number, to: number, r: number) {
  const a = point(from, r);
  const b = point(to, r);
  return `M 50 50 L ${a.x} ${a.y} A ${r} ${r} 0 0 1 ${b.x} ${b.y} Z`;
}

/** Angles halfway between disciplines — drawn as faint dividers */
const dividers = [-30, 90, 210];

function linksFor(slug: ServiceSlug) {
  return serviceLinks
    .filter((l) => l.a === slug || l.b === slug)
    .map((l) => ({ other: (l.a === slug ? l.b : l.a) as ServiceSlug, reason: l.reason }));
}

const bySlug = Object.fromEntries(services.map((s) => [s.slug, s])) as Record<ServiceSlug, Service>;

export function ServiceEcosystem() {
  const [selected, setSelected] = useState<ServiceSlug>("data-analytics");
  const [hovered, setHovered] = useState<ServiceSlug | null>(null);
  const reduced = useReducedMotion();
  const active = hovered ?? selected;
  const activeLinks = linksFor(active);
  const related = new Set(activeLinks.map((l) => l.other));
  const service = bySlug[active];

  return (
    <LazyMotion features={domAnimation} strict>
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
        {/* ---------- Diagram (md and up) ---------- */}
        <div className="hidden md:block lg:col-span-7">
          <div className="relative mx-auto aspect-square w-full max-w-[560px]">
            <svg viewBox="0 0 100 100" className="absolute inset-0 size-full overflow-visible" aria-hidden="true">
              <circle cx="50" cy="50" r={R} fill="none" stroke="#e4e7ec" strokeWidth="0.25" />
              <circle cx="50" cy="50" r="3.2" fill="none" stroke="#cfd4dc" strokeWidth="0.25" />
              <circle cx="50" cy="50" r="0.9" fill="#0b1220" />
              {domainOrder.map((d) => {
                const [first, , last] = domainAngles[d];
                return (
                  <path
                    key={d}
                    d={wedgePath(first - 20, last + 20, R + 6)}
                    fill="#e7f3f1"
                    opacity={bySlug[active].domain === d ? 0.8 : 0}
                    style={{ transition: "opacity 400ms" }}
                  />
                );
              })}
              {dividers.map((deg) => {
                const a = point(deg, 6);
                const b = point(deg, R);
                return <line key={deg} x1={a.x} y1={a.y} x2={b.x} y2={b.y} stroke="#cfd4dc" strokeWidth="0.25" strokeDasharray="0.6 0.9" />;
              })}
              {serviceLinks.map((l) => {
                const a = nodes[l.a];
                const b = nodes[l.b];
                const on = l.a === active || l.b === active;
                const crossDomain = bySlug[l.a].domain !== bySlug[l.b].domain;
                return (
                  <path
                    key={`${l.a}-${l.b}`}
                    d={`M ${a.x} ${a.y} Q 50 50 ${b.x} ${b.y}`}
                    fill="none"
                    stroke={on ? "#0f766e" : "#0b1220"}
                    strokeOpacity={on ? 0.9 : crossDomain ? 0.1 : 0.16}
                    strokeWidth={on ? 0.45 : 0.25}
                    strokeDasharray={crossDomain || on ? undefined : "0.8 0.8"}
                    style={{ transition: "stroke 300ms, stroke-opacity 300ms, stroke-width 300ms" }}
                  />
                );
              })}
            </svg>

            {/* Service nodes — real buttons for keyboard + screen readers */}
            {services.map((s) => {
              const n = nodes[s.slug];
              const cos = Math.cos(rad(n.angle));
              const side = cos > 0.2 ? "right" : cos < -0.2 ? "left" : "top";
              const isActive = s.slug === active;
              const isRelated = related.has(s.slug);
              return (
                <button
                  key={s.slug}
                  type="button"
                  aria-pressed={s.slug === selected}
                  onClick={() => setSelected(s.slug)}
                  onFocus={() => setSelected(s.slug)}
                  onMouseEnter={() => setHovered(s.slug)}
                  onMouseLeave={() => setHovered(null)}
                  className={`group absolute flex items-center gap-2.5 text-left ${
                    side === "left" ? "flex-row-reverse text-right" : side === "top" ? "flex-col-reverse text-center" : ""
                  }`}
                  style={{
                    left: `${n.x}%`,
                    top: `${n.y}%`,
                    transform:
                      side === "right"
                        ? "translate(-8px, -50%)"
                        : side === "left"
                          ? "translate(calc(-100% + 8px), -50%)"
                          : "translate(-50%, calc(-100% + 8px))",
                  }}
                >
                  <span
                    aria-hidden="true"
                    className={`relative grid size-4 shrink-0 place-items-center rounded-full border transition-all duration-[var(--dur-base)] ${
                      isActive
                        ? "scale-125 border-teal bg-teal"
                        : isRelated
                          ? "border-teal bg-white"
                          : "border-line-strong bg-white group-hover:border-ink"
                    }`}
                  >
                    {isActive && <span className="absolute inset-[-6px] rounded-full border border-teal/30" />}
                  </span>
                  <span className="block w-max max-w-[10rem]">
                    <span className={`block font-mono text-label ${isActive ? "text-teal" : "text-subtle"}`}>{s.number}</span>
                    <span
                      className={`block text-small leading-snug transition-colors ${
                        isActive ? "font-medium text-ink" : isRelated ? "text-ink" : "text-muted group-hover:text-ink"
                      }`}
                    >
                      {s.name}
                    </span>
                  </span>
                </button>
              );
            })}
          </div>
          <ul className="mt-8 flex justify-center gap-8" aria-label="Disciplines">
            {domainOrder.map((d) => {
              const on = bySlug[active].domain === d;
              return (
                <li key={d} className={`eyebrow flex items-center gap-2 transition-colors ${on ? "!text-teal" : ""}`}>
                  <span aria-hidden="true" className={`size-2 rounded-xs transition-colors ${on ? "bg-teal" : "bg-line-strong"}`} />
                  {domains[d].name}
                </li>
              );
            })}
          </ul>
        </div>

        {/* ---------- Grouped list (mobile) ---------- */}
        <div className="space-y-6 md:hidden">
          {domainOrder.map((d) => (
            <div key={d}>
              <p className="eyebrow">{domains[d].name}</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {servicesByDomain(d).map((s) => (
                  <button
                    key={s.slug}
                    type="button"
                    aria-pressed={s.slug === selected}
                    onClick={() => setSelected(s.slug)}
                    className="rounded-sm border border-line px-3 py-2 text-small transition-colors aria-pressed:border-teal aria-pressed:bg-teal-soft aria-pressed:text-teal"
                  >
                    {s.name}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* ---------- Detail panel ---------- */}
        <div className="lg:col-span-5">
          <div aria-live="polite" className="border-t border-ink pt-8 lg:mt-10">
            <AnimatePresence mode="wait" initial={false}>
              <m.div
                key={service.slug}
                initial={reduced ? false : { opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduced ? undefined : { opacity: 0, y: -6 }}
                transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
              >
                <p className="eyebrow">
                  <span className="text-teal">{service.number}</span> · {domains[service.domain].name}
                </p>
                <h3 className="mt-4 text-h3">{service.name}</h3>
                <p className="mt-4 text-body text-muted">{service.summary}</p>

                <h4 className="eyebrow mt-8">Capabilities</h4>
                <ul className="mt-3 grid gap-x-6 gap-y-2 sm:grid-cols-2">
                  {service.capabilities.slice(0, 6).map((c) => (
                    <li key={c.title} className="flex gap-2.5 text-small text-ink">
                      <span aria-hidden="true" className="mt-[0.6em] h-px w-2.5 shrink-0 bg-teal" />
                      {c.title}
                    </li>
                  ))}
                </ul>

                <h4 className="eyebrow mt-8">Connects with</h4>
                <ul className="mt-3 divide-y divide-line border-y border-line">
                  {activeLinks.map((l) => (
                    <li key={l.other}>
                      <button
                        type="button"
                        onClick={() => setSelected(l.other)}
                        className="group flex w-full items-baseline justify-between gap-4 py-2.5 text-left"
                      >
                        <span className="text-small text-ink group-hover:text-teal">{bySlug[l.other].name}</span>
                        <span className="text-caption text-subtle">{l.reason}</span>
                      </button>
                    </li>
                  ))}
                </ul>

                <Link
                  href={`/services/${service.slug}`}
                  className="group mt-8 inline-flex items-center gap-2 text-small font-medium text-ink hover:text-teal"
                >
                  <span className="link-underline">Explore {service.name}</span>
                  <ArrowRight aria-hidden="true" strokeWidth={1.75} className="size-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </m.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </LazyMotion>
  );
}
