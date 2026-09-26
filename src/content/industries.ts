import type { ServiceSlug } from "./services";

/**
 * Framed as "how Data Fold can support" — these describe sector pressures and
 * relevant services, not claimed track record.
 */
export interface Industry {
  slug: string;
  name: string;
  pressure: string;
  support: string[];
  services: ServiceSlug[];
}

export const industries: Industry[] = [
  {
    slug: "financial-services",
    name: "Financial Services",
    pressure:
      "High regulatory expectations, heavy dependence on technology and data, and rising scrutiny of third parties and models.",
    support: [
      "Technology risk and control frameworks aligned to supervisory expectations",
      "Model validation, risk scoring and anomaly detection",
      "Automated regulatory and management reporting",
    ],
    services: ["it-risk-advisory", "data-science", "data-analytics"],
  },
  {
    slug: "banking",
    name: "Banking",
    pressure:
      "Core-system complexity, cyber threats targeting payments and customer data, and pressure to digitise without weakening control.",
    support: [
      "ITGC and application control testing across core banking systems",
      "Cyber maturity assessment and penetration testing",
      "Transaction monitoring analytics and fraud detection models",
    ],
    services: ["it-audit", "cyber-advisory", "data-science"],
  },
  {
    slug: "insurance",
    name: "Insurance",
    pressure:
      "Complex reporting standards, legacy policy administration systems and large volumes of claims documentation.",
    support: [
      "Financial reporting and IFRS advisory support",
      "AI document processing for claims and policy documents",
      "Data quality work on actuarial and finance data",
    ],
    services: ["financial-accounting", "ai-process-automation", "data-analytics"],
  },
  {
    slug: "manufacturing",
    name: "Manufacturing",
    pressure:
      "Thin margins, supply chain volatility and ERP landscapes that have grown by acquisition and customisation.",
    support: [
      "Procure-to-pay and supply chain process redesign",
      "Demand forecasting and cost analytics",
      "ERP controls and segregation of duties",
    ],
    services: ["bpr-erp", "data-science", "it-audit"],
  },
  {
    slug: "retail-consumer",
    name: "Retail & Consumer",
    pressure:
      "Fast-moving demand, omnichannel data spread across platforms, and high volumes of indirect-tax transactions.",
    support: [
      "Customer segmentation and demand forecasting",
      "Sales tax health checks and ERP tax-code reviews",
      "Operational and store performance dashboards",
    ],
    services: ["data-science", "tax", "data-analytics"],
  },
  {
    slug: "healthcare",
    name: "Healthcare",
    pressure:
      "Sensitive patient data, ageing systems, and administrative workloads that pull clinicians and staff away from care.",
    support: [
      "Security posture and data protection assessments",
      "Automation of administrative and document-heavy processes",
      "Operational analytics for capacity and cost",
    ],
    services: ["cyber-advisory", "ai-process-automation", "data-analytics"],
  },
  {
    slug: "technology",
    name: "Technology",
    pressure:
      "Rapid growth that outpaces finance processes and controls, with investors and customers expecting assurance.",
    support: [
      "Finance function set-up, close and revenue reporting",
      "Control environments that satisfy customer and auditor due diligence",
      "Security governance for scaling organizations",
    ],
    services: ["financial-accounting", "it-risk-advisory", "cyber-advisory"],
  },
  {
    slug: "professional-services",
    name: "Professional Services",
    pressure:
      "Utilisation and pricing pressure, knowledge locked in documents, and client demands for data security.",
    support: [
      "Knowledge assistants over internal documents and precedent",
      "Utilisation, margin and pipeline analytics",
      "Third-party and client-data security assurance",
    ],
    services: ["ai-process-automation", "data-analytics", "it-risk-advisory"],
  },
  {
    slug: "public-sector",
    name: "Public Sector",
    pressure:
      "Accountability for public funds, legacy systems and the need to modernise services within procurement and governance constraints.",
    support: [
      "IT audit and technology governance reviews",
      "Process re-engineering for citizen-facing services",
      "Transparent performance reporting",
    ],
    services: ["it-audit", "bpr-erp", "data-analytics"],
  },
  {
    slug: "other-enterprises",
    name: "Other Enterprises",
    pressure:
      "Every organization now runs on systems, data and controls. The questions are similar even when the sector is not.",
    support: [
      "A multidisciplinary diagnostic across risk, data and finance",
      "Targeted support on a single process or system",
      "An independent view before a major technology or finance decision",
    ],
    services: ["it-risk-advisory", "data-analytics", "financial-accounting"],
  },
];
