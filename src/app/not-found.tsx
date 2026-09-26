import Link from "next/link";
import { ButtonLink } from "@/components/ui/button";

export const metadata = { title: "Page not found" };

const suggestions = [
  { href: "/services", label: "Services" },
  { href: "/industries", label: "Industries" },
  { href: "/insights", label: "Insights" },
  { href: "/contact", label: "Contact" },
];

export default function NotFound() {
  return (
    <section className="relative overflow-hidden pt-[var(--header-h)]">
      <div aria-hidden="true" className="grid-paper absolute inset-0 [mask-image:linear-gradient(to_bottom,black,transparent_85%)]" />
      <div className="container-x relative grid min-h-[70vh] items-center gap-12 py-20 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <p className="eyebrow">Error 404</p>
          <h1 className="mt-6 text-h1">This page didn&rsquo;t fold into anything.</h1>
          <p className="mt-6 max-w-xl text-lead text-muted">
            The page you were looking for has moved or doesn&rsquo;t exist. These are good places to continue.
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            <ButtonLink href="/">Back to home</ButtonLink>
          </div>
          <ul className="mt-12 flex flex-wrap gap-x-8 gap-y-3 border-t border-line pt-6">
            {suggestions.map((s) => (
              <li key={s.href}>
                <Link href={s.href} className="link-underline text-small text-ink hover:text-teal">
                  {s.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        {/* A single cell out of place in an otherwise ordered grid */}
        <svg aria-hidden="true" viewBox="0 0 200 200" className="mx-auto hidden w-full max-w-sm lg:col-span-5 lg:block">
          {Array.from({ length: 25 }, (_, i) => {
            const missing = i === 18;
            return (
              <rect
                key={i}
                x={20 + (i % 5) * 34}
                y={20 + Math.floor(i / 5) * 34}
                width="26"
                height="26"
                rx="2"
                fill={missing ? "none" : i % 5 === 0 ? "#0f766e" : "#cfd4dc"}
                stroke={missing ? "#2563eb" : "none"}
                strokeDasharray="3 3"
              />
            );
          })}
          <rect x="176" y="150" width="26" height="26" rx="2" fill="#2563eb" transform="rotate(18 189 163)" />
        </svg>
      </div>
    </section>
  );
}
