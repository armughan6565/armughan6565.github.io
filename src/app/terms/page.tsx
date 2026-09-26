import { LegalPage } from "@/components/sections/legal-page";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({ title: "Terms of Use", description: "Terms governing use of the Data Fold website.", path: "/terms" });

export default function TermsPage() {
  return (
    <LegalPage
      title="Terms of Use"
      sections={[
        { heading: "Use of this website", body: "[Terms governing access to and use of this website.]" },
        { heading: "No professional advice", body: "Content on this website, including Insights, is general information only. It is not audit, tax, legal, accounting or other professional advice and should not be relied on as such. Engagements are governed by a separate written agreement." },
        { heading: "Intellectual property", body: "[Ownership of website content, trademarks and permitted use.]" },
        { heading: "Liability", body: "[Limitation of liability — to be drafted by counsel.]" },
        { heading: "Governing law", body: "[Governing law and jurisdiction.]" },
      ]}
    />
  );
}
