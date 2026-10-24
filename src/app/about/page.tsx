import { Eye, Target, Lightbulb, Microscope, Scale, ShieldCheck } from "lucide-react";
import { PageHero } from "@/components/sections/page-hero";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/motion/reveal";
import { CTASection } from "@/components/sections/cta-section";
import { approach, mission, values, vision } from "@/content/company";
import { domainOrder, domains, servicesByDomain } from "@/content/services";
import { domainColor, img, photos } from "@/content/media";
import { site } from "@/config/site";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "About — A Multidisciplinary Technology & Business Consultancy",
  description:
    "Data Fold was founded in 2025 in Karachi to bring technology, data, risk and finance expertise together for organizations worldwide.",
  path: "/about",
});

const valueIcons = [Lightbulb, Microscope, Scale, ShieldCheck];

export default function AboutPage() {
  return (
    <>
      <PageHero
        label="About Data Fold"
        title="Risk, data and finance belong in the same conversation."
        image={photos.teamTable}
        aside={
          <dl className="grid grid-cols-2 gap-6 border-t border-white/25 pt-6">
            <div>
              <dt className="eyebrow !text-white/60">Founded</dt>
              <dd className="mt-2 text-h2 text-mint">{site.founded}</dd>
            </div>
            <div>
              <dt className="eyebrow !text-white/60">Headquarters</dt>
              <dd className="mt-2 text-h2">{site.headquarters.city}</dd>
            </div>
          </dl>
        }
      />

      {/* Story */}
      <section aria-labelledby="story" className="section-y">
        <div className="container-x grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
          <div>
            <SectionHeading index="01" label="Our story" id="story" title="Why we started." />
            <Reveal className="mt-8 space-y-5 text-lead text-muted" delay={80}>
              <p>
                A reporting problem is usually a data problem. A data problem is usually a control problem. Traditional
                advisory splits these across teams and reports.
              </p>
              <p className="text-ink">
                We founded Data Fold in {site.headquarters.city} in {site.founded} to solve them together, with a
                global outlook from day one.
              </p>
            </Reveal>
          </div>
          <Reveal delay={120} className="overflow-hidden rounded-lg shadow-lg">
            {/* eslint-disable-next-line @next/next/no-img-element -- static export, no optimizer */}
            <img
              src={img(photos.office, 1200)}
              alt="A modern open-plan office"
              loading="lazy"
              className="aspect-[4/3] w-full object-cover"
            />
          </Reveal>
        </div>
      </section>

      {/* Mission / vision */}
      <section aria-label="Mission and vision" className="bg-navy text-white">
        <div className="container-x grid gap-6 py-16 md:grid-cols-2 md:py-24">
          {[
            { k: "Mission", v: mission, icon: Target, accent: "text-mint" },
            { k: "Vision", v: vision, icon: Eye, accent: "text-sky" },
          ].map((item, i) => (
            <Reveal key={item.k} delay={i * 100} className="rounded-lg border border-white/10 bg-white/5 p-8 md:p-10">
              <item.icon aria-hidden="true" strokeWidth={1.5} className={`size-8 ${item.accent}`} />
              <p className={`eyebrow mt-6 ${item.accent}`}>{item.k}</p>
              <p className="mt-3 text-h3 !font-normal">{item.v}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Values */}
      <section aria-labelledby="values" className="section-y">
        <div className="container-x">
          <SectionHeading index="02" label="Values" id="values" title="What we hold ourselves to." />
          <ul className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((v, i) => {
              const Icon = valueIcons[i];
              return (
                <Reveal
                  as="li"
                  key={v.title}
                  delay={i * 70}
                  className="rounded-lg border border-line p-7 transition-colors hover:border-teal hover:bg-teal-soft/40"
                >
                  <span className="grid size-11 place-items-center rounded-md bg-teal-soft text-teal">
                    <Icon aria-hidden="true" strokeWidth={1.75} className="size-5" />
                  </span>
                  <h3 className="mt-5 text-h4">{v.title}</h3>
                  <p className="mt-1 text-small text-muted">{v.body}</p>
                </Reveal>
              );
            })}
          </ul>
        </div>
      </section>

      {/* Disciplines + how we work */}
      <section aria-labelledby="multi" className="section-y bg-canvas">
        <div className="container-x">
          <SectionHeading index="03" label="How we work" id="multi" title="Three disciplines. Four steps." />
          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {domainOrder.map((d, i) => (
              <Reveal key={d} delay={i * 90} className="relative overflow-hidden rounded-lg bg-white p-7 shadow-sm">
                <span aria-hidden="true" className={`absolute inset-x-0 top-0 h-1 ${domainColor[d].bg}`} />
                <p className="text-h3">{domains[d].name}</p>
                <p className="mt-1 text-small text-muted">{domains[d].line}</p>
                <ul className="mt-5 flex flex-wrap gap-2">
                  {servicesByDomain(d).map((s) => (
                    <li key={s.slug} className="rounded-full bg-canvas px-3 py-1 text-caption text-ink">
                      {s.name}
                    </li>
                  ))}
                </ul>
              </Reveal>
            ))}
          </div>
          <ol className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {approach.map((s, i) => (
              <Reveal as="li" key={s.title} delay={i * 80} className="rounded-lg bg-white p-7 shadow-sm">
                <span className="font-mono text-label text-teal">0{i + 1}</span>
                <h3 className="mt-3 text-h4">{s.title}</h3>
                <p className="mt-1 text-small text-muted">{s.body}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <CTASection
        label="Work with us"
        title="Let's talk about what you need to decide."
        body="A single review or a broader transformation — it starts with a conversation."
        primary={{ href: "/contact", label: "Start a Conversation" }}
        secondary={{ href: "/services", label: "Explore Our Services" }}
      />
    </>
  );
}
