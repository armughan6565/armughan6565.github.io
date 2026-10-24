import { PageHero } from "@/components/sections/page-hero";
import { photos } from "@/content/media";
import { InsightsBrowser } from "@/components/insights/insights-browser";
import { CTASection } from "@/components/sections/cta-section";
import { getAllInsights, insightCategories } from "@/content/insights";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Insights — Perspectives on Risk, Technology, AI, Data and Finance",
  description:
    "Articles and perspectives from Data Fold on IT audit, technology risk, cybersecurity, data analytics, AI governance, ERP and finance.",
  path: "/insights",
});

export default function InsightsPage() {
  return (
    <>
      <PageHero
        label="Insights"
        title="Perspectives from the practice."
        intro="Practical thinking on risk, technology, AI, data and finance."
        image={photos.laptopWork}
      />
      <section aria-label="Articles" className="bg-canvas pb-24 pt-12 lg:pb-32">
        <div className="container-x">
          <InsightsBrowser insights={getAllInsights()} categories={insightCategories} />
        </div>
      </section>
      <CTASection
        label="Discuss a topic"
        title="Want to go deeper on one of these questions?"
        body="We're happy to discuss how they apply to your organization."
        primary={{ href: "/contact", label: "Talk to an Advisor" }}
      />
    </>
  );
}
