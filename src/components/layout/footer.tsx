import Link from "next/link";
import { Logo } from "@/components/brand/logo";
import { site } from "@/config/site";
import { services } from "@/content/services";
import { industries } from "@/content/industries";

const company = [
  { href: "/about", label: "About" },
  { href: "/insights", label: "Insights" },
  { href: "/industries", label: "Industries" },
  { href: "/contact", label: "Contact" },
];

const legal = [
  { href: "/privacy", label: "Privacy Policy" },
  { href: "/terms", label: "Terms of Use" },
  { href: "/cookies", label: "Cookie Policy" },
];

function Column({ title, links, continued }: { title: string; links: { href: string; label: string }[]; continued?: boolean }) {
  return (
    <div>
      <h2 className={`eyebrow !text-white/60 ${continued ? "sr-only sm:not-sr-only sm:invisible" : ""}`}>{title}</h2>
      <ul className="mt-5 space-y-3">
        {links.map((l) => (
          <li key={l.href}>
            <Link href={l.href} className="link-underline text-small text-white/80 hover:text-white">
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Footer() {
  const socials = site.social.filter((s) => s.href);
  return (
    <footer className="bg-ink text-white">
      <div className="container-x pt-20 pb-10">
        <div className="grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Logo inverse />
            <p className="mt-6 max-w-sm text-lead text-white/90">{site.tagline}</p>
            <p className="mt-4 max-w-sm text-small text-white/60">
              A multidisciplinary consultancy across technology, data, risk and finance. Founded in{" "}
              {site.founded}, headquartered in {site.headquarters.city}, working with organizations worldwide.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-10 sm:grid-cols-4 lg:col-span-8">
            <Column title="Services" links={services.slice(0, 5).map((s) => ({ href: `/services/${s.slug}`, label: s.name }))} />
            <Column title="Services, continued" continued links={services.slice(5).map((s) => ({ href: `/services/${s.slug}`, label: s.name }))} />
            <Column title="Industries" links={industries.slice(0, 5).map((i) => ({ href: `/industries#${i.slug}`, label: i.name }))} />
            <Column title="Company" links={company} />
          </div>
        </div>

        <div className="mt-16 grid gap-8 border-t border-white/15 pt-8 sm:grid-cols-3">
          <div>
            <h2 className="eyebrow !text-white/60">Email</h2>
            {/* PLACEHOLDER contact details — edit in src/config/site.ts */}
            <a href={`mailto:${site.contact.email}`} className="link-underline mt-2 inline-block text-small text-white/85">
              {site.contact.email}
            </a>
          </div>
          <div>
            <h2 className="eyebrow !text-white/60">Phone</h2>
            <p className="mt-2 text-small text-white/85">{site.contact.phone}</p>
          </div>
          <div>
            <h2 className="eyebrow !text-white/60">Headquarters</h2>
            <p className="mt-2 text-small text-white/85">{site.contact.address}</p>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-white/15 pt-8 text-caption text-white/60 md:flex-row md:items-center md:justify-between">
          <p>
            {site.name} © {site.founded}–{new Date().getFullYear()}. All rights reserved.
          </p>
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            {legal.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="link-underline hover:text-white">
                  {l.label}
                </Link>
              </li>
            ))}
            {socials.map((s) => (
              <li key={s.label}>
                <a href={s.href} rel="noopener noreferrer" target="_blank" className="link-underline hover:text-white">
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
