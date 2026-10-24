import type { ReactNode } from "react";
import Link from "next/link";
import { img } from "@/content/media";

/** Interior page opener: dark photographic band with breadcrumb, H1 and a short intro. */
export function PageHero({
  label,
  title,
  intro,
  crumbs,
  children,
  aside,
  image,
}: {
  label: string;
  title: ReactNode;
  intro?: ReactNode;
  crumbs?: { href: string; label: string }[];
  children?: ReactNode;
  aside?: ReactNode;
  /** Unsplash photo id (see content/media.ts). Without it the band is a plain navy gradient. */
  image?: string;
}) {
  return (
    <section className="relative overflow-hidden bg-navy pt-[var(--header-h)] text-white">
      {image && (
        // eslint-disable-next-line @next/next/no-img-element -- static export, no optimizer
        <img src={img(image, 1800)} alt="" aria-hidden="true" className="absolute inset-0 size-full object-cover" />
      )}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[linear-gradient(100deg,rgb(6_20_43/0.96)_15%,rgb(6_20_43/0.75)_55%,rgb(15_118_110/0.45))]"
      />
      <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-mint via-sky to-amber" />
      <div className="container-x relative grid gap-10 pb-16 pt-16 md:pb-24 md:pt-24 lg:grid-cols-12">
        <div className="lg:col-span-8">
          {crumbs ? (
            <nav aria-label="Breadcrumb">
              <ol className="eyebrow flex flex-wrap items-center gap-2 !text-white/60">
                {crumbs.map((c) => (
                  <li key={c.href} className="flex items-center gap-2">
                    <Link href={c.href} className="link-underline hover:text-white">
                      {c.label}
                    </Link>
                    <span aria-hidden="true">/</span>
                  </li>
                ))}
                <li aria-current="page" className="text-mint">
                  {label}
                </li>
              </ol>
            </nav>
          ) : (
            <p className="eyebrow !text-mint">{label}</p>
          )}
          <h1 className="mt-6 max-w-[20ch] text-h1">{title}</h1>
          {intro && <p className="mt-6 max-w-2xl text-lead text-white/75">{intro}</p>}
          {children}
        </div>
        {aside && <div className="lg:col-span-4 lg:self-end">{aside}</div>}
      </div>
    </section>
  );
}
