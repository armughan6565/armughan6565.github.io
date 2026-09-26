import type { ReactNode } from "react";
import { Reveal } from "@/components/motion/reveal";

/**
 * Standard section opener: mono index + label, headline, optional intro.
 * `split` places the intro in a right-hand column on large screens.
 */
export function SectionHeading({
  index,
  label,
  title,
  intro,
  split = false,
  as: H = "h2",
  id,
  className = "",
}: {
  id?: string;
  index?: string;
  label: string;
  title: ReactNode;
  intro?: ReactNode;
  split?: boolean;
  as?: "h1" | "h2";
  className?: string;
}) {
  return (
    <Reveal className={`${split ? "grid gap-6 lg:grid-cols-12 lg:gap-12" : ""} ${className}`}>
      <div className={split ? "lg:col-span-7" : "max-w-3xl"}>
        <p className="eyebrow flex items-center gap-3">
          {index && <span className="text-teal">{index}</span>}
          {index && <span aria-hidden="true" className="h-px w-6 bg-line-strong" />}
          <span>{label}</span>
        </p>
        <H id={id} className={`mt-5 ${H === "h1" ? "text-h1" : "text-h2"}`}>{title}</H>
      </div>
      {intro && (
        <div className={split ? "lg:col-span-5 lg:self-end" : "mt-6 max-w-2xl"}>
          <p className="text-lead text-muted">{intro}</p>
        </div>
      )}
    </Reveal>
  );
}
