import { LegalPage } from "@/components/sections/legal-page";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({ title: "Cookie Policy", description: "How the Data Fold website uses cookies.", path: "/cookies" });

export default function CookiesPage() {
  return (
    <LegalPage
      title="Cookie Policy"
      sections={[
        { heading: "Current use", body: "This website does not currently set analytics or advertising cookies. [Update this page — and add a consent mechanism if required — before adding any analytics or third-party tools.]" },
        { heading: "Essential storage", body: "[List any strictly necessary cookies or local storage set by hosting or security providers.]" },
        { heading: "Contact", body: "[Contact details for questions about this policy.]" },
      ]}
    />
  );
}
