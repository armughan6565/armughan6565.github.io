import type { ReactNode } from "react";
import Link from "next/link";

/** Interior page opener: breadcrumb, H1, intro. Consistent across all non-home pages. */
export function PageHero({
  label,
  title,
  intro,
  crumbs,
  children,
  aside,
}: {
  label: string;
  title: ReactNode;
  intro?: ReactNode;
  crumbs?: { href: string; label: string }[];
  children?: ReactNode;
  aside?: ReactNode;
}) {
  return (
    <section className="relative overflow-hidden pt-[var(--header-h)]">
      <div aria-hidden="true" className="grid-paper absolute inset-0 [mask-image:linear-gradient(to_bottom,black,transparent_80%)]" />
      <div className="container-x relative grid gap-10 pb-14 pt-14 md:pb-20 md:pt-20 lg:grid-cols-12">
        <div className="lg:col-span-8">
          {crumbs ? (
            <nav aria-label="Breadcrumb">
              <ol className="eyebrow flex flex-wrap items-center gap-2">
                {crumbs.map((c) => (
                  <li key={c.href} className="flex items-center gap-2">
                    <Link href={c.href} className="link-underline hover:text-ink">
                      {c.label}
                    </Link>
                    <span aria-hidden="true">/</span>
                  </li>
                ))}
                <li aria-current="page" className="text-ink">
                  {label}
                </li>
              </ol>
            </nav>
          ) : (
            <p className="eyebrow">{label}</p>
          )}
          <h1 className="mt-6 max-w-[20ch] text-h1">{title}</h1>
          {intro && <p className="mt-6 max-w-2xl text-lead text-muted">{intro}</p>}
          {children}
        </div>
        {aside && <div className="lg:col-span-4 lg:self-end">{aside}</div>}
      </div>
    </section>
  );
}
