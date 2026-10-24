"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { animate, useInView } from "motion/react";

/**
 * Hand-built equivalents of Magic UI components (number-ticker, marquee).
 * Shiny text, border beam and blur-fade are pure CSS — see globals.css.
 */

/** Counts up to `value` once it scrolls into view. */
export function NumberTicker({ value, className = "" }: { value: number; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -10% 0px" });

  useEffect(() => {
    if (!inView || !ref.current) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      ref.current.textContent = String(value);
      return;
    }
    const controls = animate(0, value, {
      duration: 1.6,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => {
        if (ref.current) ref.current.textContent = String(Math.round(v));
      },
    });
    return () => controls.stop();
  }, [inView, value]);

  // Server-rendered with the final value so no-JS and crawlers see the real number.
  return (
    <span ref={ref} className={`tabular-nums ${className}`}>
      {value}
    </span>
  );
}

/** Infinite horizontal scroller; children are rendered twice for a seamless loop. Pauses on hover. */
export function Marquee({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div
      className={`marquee overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_6%,black_94%,transparent)] ${className}`}
    >
      <div className="marquee-track flex w-max gap-6">
        <div className="flex gap-6">{children}</div>
        <div className="flex gap-6" aria-hidden="true" inert>
          {children}
        </div>
      </div>
    </div>
  );
}
