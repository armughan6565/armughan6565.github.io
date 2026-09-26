import { PageHero } from "@/components/sections/page-hero";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/motion/reveal";
import { CTASection } from "@/components/sections/cta-section";
import { approach, mission, values, vision } from "@/content/company";
import { domainOrder, domains, servicesByDomain } from "@/content/services";
import { site } from "@/config/site";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "About — A Multidisciplinary Technology & Business Consultancy",
  description:
    "Data Fold was founded in 2025 in Karachi to bring technology, data, risk and finance expertise together for organizations worldwide.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <>
      <PageHero
        label="About Data Fold"
        title="Built on the idea that risk, data and finance belong in the same conversation."
        aside={
          <dl className="grid grid-cols-2 gap-6 border-t border-ink pt-6">
            <div>
              <dt className="eyebrow">Founded</dt>
              <dd className="mt-2 text-h3">{site.founded}</dd>
            </div>
            <div>
              <dt className="eyebrow">Headquarters</dt>
              <dd className="mt-2 text-h3">{site.headquarters.city}</dd>
            </div>
          </dl>
        }
      />

      {/* Story */}
      <section aria-labelledby="story" className="section-y border-t border-line">
        <div className="container-x grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <SectionHeading index="01" label="Our story" id="story" title="Why we started." />
          </div>
          <Reveal className="space-y-6 text-lead text-muted lg:col-span-7 lg:col-start-6 lg:pt-12" delay={80}>
            <p>
              Data Fold was founded in {site.founded} in {site.headquarters.city}, {site.headquarters.country}, with a
              global outlook from day one.
            </p>
            <p>
              The founding observation was simple: the questions organizations struggle with most rarely fit a single
              discipline. A reporting problem turns out to be a data problem. A data problem turns out to be a control
              problem. A control problem turns out to be a process designed around an old system.
            </p>
            <p className="text-ink">
              Traditional advisory models separate these into different teams, reports and invoices. We built Data Fold
              to bring them together — technology, data, risk and finance expertise working on the same problem, at the
              same time.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Mission / vision */}
      <section aria-label="Mission and vision" className="bg-ink text-white">
        <div className="container-x grid md:grid-cols-2">
          {[
            { k: "Mission", v: mission },
            { k: "Vision", v: vision },
          ].map((item, i) => (
            <Reveal
              key={item.k}
              delay={i * 100}
              className={`py-16 md:py-24 ${i === 0 ? "border-b border-white/15 md:border-b-0 md:border-r md:pr-16" : "md:pl-16"}`}
            >
              <p className="eyebrow !text-[#5eead4]">{item.k}</p>
              <p className="mt-6 text-h3 !font-normal">{item.v}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Values */}
      <section aria-labelledby="values" className="section-y">
        <div className="container-x">
          <SectionHeading index="02" label="Values" id="values" title="What we hold ourselves to." />
          <ul className="mt-14 grid border-t border-line sm:grid-cols-2 lg:grid-cols-4">
            {values.map((v, i) => (
              <Reveal as="li" key={v.title} delay={i * 70} className="border-b border-line py-8 sm:pr-8">
                <span className="font-mono text-label text-teal">0{i + 1}</span>
                <h3 className="mt-4 text-h3">{v.title}</h3>
                <p className="mt-3 text-small text-muted">{v.body}</p>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* Multidisciplinary */}
      <section aria-labelledby="multi" className="section-y bg-canvas">
        <div className="container-x grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionHeading
              index="03"
              label="Multidisciplinary approach"
              id="multi"
              title="Three disciplines, one team."
              intro="Each discipline strengthens the others. Assurance improves when it is data-driven. Analytics is more useful when it is controlled. Finance runs better when processes and systems are designed together."
            />
          </div>
          <div className="space-y-4 lg:col-span-6 lg:col-start-7">
            {domainOrder.map((d, i) => (
              <Reveal key={d} delay={i * 90}>
                <div className="grid gap-4 border border-line bg-white p-6 sm:grid-cols-[9rem_1fr] sm:p-7">
                  <div>
                    <p className="text-h4">{domains[d].name}</p>
                    <p className="mt-1 text-caption text-teal">{domains[d].line}</p>
                  </div>
                  <p className="text-small text-muted">
                    {servicesByDomain(d)
                      .map((s) => s.name)
                      .join(" · ")}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* How we work */}
      <section aria-labelledby="how" className="section-y">
        <div className="container-x">
          <SectionHeading index="04" label="How we work" id="how" title="Four movements, every engagement." split
            intro="A consistent way of working keeps engagements focused on the decision that matters — and makes our work easy to review." />
          <ol className="mt-14 grid border-t border-ink md:grid-cols-2 lg:grid-cols-4">
            {approach.map((s, i) => (
              <Reveal as="li" key={s.title} delay={i * 80} className="border-b border-line py-8 md:pr-8">
                <span className="font-mono text-label text-teal">0{i + 1}</span>
                <h3 className="mt-4 text-h3">{s.title}</h3>
                <p className="mt-3 text-small text-muted">{s.body}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <CTASection
        label="Work with us"
        title="Let's talk about what you need to decide."
        body="Whether it is a single review or a broader transformation, we start with a conversation about the outcome you need."
        primary={{ href: "/contact", label: "Start a Conversation" }}
        secondary={{ href: "/services", label: "Explore Our Services" }}
      />
    </>
  );
}
