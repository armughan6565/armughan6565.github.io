import { LegalPage } from "@/components/sections/legal-page";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({ title: "Privacy Policy", description: "How Data Fold handles personal information.", path: "/privacy" });

export default function PrivacyPage() {
  return (
    <LegalPage
      title="Privacy Policy"
      sections={[
        { heading: "Who we are", body: "[Legal entity name, registered address and contact details for privacy enquiries.]" },
        { heading: "Information we collect", body: "When you use our contact form we collect the details you provide: name, company, work email, phone number (optional), country, service of interest and your message." },
        { heading: "How we use it", body: "We use this information only to respond to your enquiry and, where relevant, to prepare a proposal. [Confirm lawful basis and any other uses.]" },
        { heading: "Retention and sharing", body: "[State retention periods, any processors (e.g. email or hosting providers) and international transfers.]" },
        { heading: "Your rights", body: "[Describe the rights available to individuals under applicable data protection laws and how to exercise them.]" },
      ]}
    />
  );
}
