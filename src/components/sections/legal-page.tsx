import { PageHero } from "@/components/sections/page-hero";

/**
 * Legal page shell. The text passed in is a structural TEMPLATE only —
 * it must be written or approved by qualified counsel before launch.
 */
export function LegalPage({ title, sections }: { title: string; sections: { heading: string; body: string }[] }) {
  return (
    <>
      <PageHero label="Legal" title={title} />
      <section className="border-t border-line py-16 lg:py-24">
        <div className="container-x">
          <div className="max-w-[68ch]">
            <p className="rounded-sm border border-warning/30 bg-warning-soft p-4 text-small text-warning">
              Template content — this page must be reviewed and completed by qualified legal counsel before launch.
            </p>
            {sections.map((s) => (
              <div key={s.heading} className="mt-10">
                <h2 className="text-h4">{s.heading}</h2>
                <p className="mt-3 text-body text-muted">{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
