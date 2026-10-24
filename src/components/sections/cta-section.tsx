import { ButtonLink } from "@/components/ui/button";
import { Reveal } from "@/components/motion/reveal";
import { img, photos } from "@/content/media";

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
    <section aria-labelledby="cta-title" className="relative overflow-hidden bg-navy text-white">
      {/* eslint-disable-next-line @next/next/no-img-element -- static export, no optimizer */}
      <img src={img(photos.meeting, 1800)} alt="" aria-hidden="true" className="absolute inset-0 size-full object-cover" />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[linear-gradient(90deg,rgb(6_20_43/0.97)_30%,rgb(6_20_43/0.7)_65%,rgb(15_118_110/0.55))]"
      />
      <div className="container-x relative section-y">
        <Reveal className="max-w-2xl">
          <p className="eyebrow !text-mint">{label}</p>
          <h2 id="cta-title" className="mt-5 text-h1">
            {title}
          </h2>
          <p className="mt-6 text-lead text-white/75">{body}</p>
          <div className="mt-10 flex flex-wrap gap-3">
            <ButtonLink href={primary.href} variant="inverse">
              {primary.label}
            </ButtonLink>
            {secondary && (
              <ButtonLink href={secondary.href} variant="ghost">
                {secondary.label}
              </ButtonLink>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
