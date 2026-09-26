import type { ServiceSlug } from "./services";

/**
 * Case-study content model. The single entry below is a LAYOUT SAMPLE ONLY:
 * no client, figures or dates. Pages render with noindex while `sample` is true.
 */
export interface CaseStudy {
  slug: string;
  title: string;
  client: string;
  sector: string;
  services: ServiceSlug[];
  sample: boolean;
  challenge: string;
  approach: string[];
  solution: string;
  technology: string[];
  outcome: string;
  insights: string[];
}

export const caseStudies: CaseStudy[] = [
  {
    slug: "sample-layout",
    title: "Sample case study — layout demonstration",
    client: "[Client name — to be provided]",
    sector: "[Sector]",
    services: ["it-audit", "data-analytics"],
    sample: true,
    challenge:
      "[Describe the client's situation and the problem in two or three sentences. Use only facts the client has approved for publication.]",
    approach: [
      "[Step one of the engagement approach]",
      "[Step two of the engagement approach]",
      "[Step three of the engagement approach]",
    ],
    solution: "[Describe what was designed or delivered.]",
    technology: ["[Platform]", "[Tool]", "[Method]"],
    outcome:
      "[Describe the verified outcome. Only include measurable results the client has confirmed and approved.]",
    insights: ["[Transferable lesson one]", "[Transferable lesson two]"],
  },
];

export const getCaseStudy = (slug: string) => caseStudies.find((c) => c.slug === slug);
