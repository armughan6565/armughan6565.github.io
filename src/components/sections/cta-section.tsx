import { ButtonLink } from "@/components/ui/button";
import { Reveal } from "@/components/motion/reveal";

type Action = { href: string; label: string };

/** Contextual closing call to action — every page passes its own wording. */
export function CTASection({
  label = "Next step",
  title,
  body,
  primary,
  secondary,
}: {
  label?: string;
  title: string;
  body: string;
  primary: Action;
  secondary?: Action;
}) {
  return (
    <section aria-labelledby="cta-title" className="relative overflow-hidden border-t border-line bg-canvas">
      {/* Fold motif: two planes echoing the logo, purely structural */}
      <svg
        aria-hidden="true"
        viewBox="0 0 400 400"
        className="pointer-events-none absolute right-[4%] top-1/2 hidden h-[70%] max-h-[420px] -translate-y-1/2 lg:block"
      >
        <rect x="40" y="40" width="150" height="320" fill="none" stroke="#cfd4dc" />
        <path d="M210 40 360 102v196l-150 62Z" fill="#e7f3f1" stroke="#0f766e" strokeOpacity=".35" />
      </svg>
      <div className="container-x relative section-y">
        <Reveal className="max-w-2xl">
          <p className="eyebrow">{label}</p>
          <h2 id="cta-title" className="mt-5 text-h1">
            {title}
          </h2>
          <p className="mt-6 text-lead text-muted">{body}</p>
          <div className="mt-10 flex flex-wrap gap-3">
            <ButtonLink href={primary.href}>{primary.label}</ButtonLink>
            {secondary && (
              <ButtonLink href={secondary.href} variant="secondary">
                {secondary.label}
              </ButtonLink>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
