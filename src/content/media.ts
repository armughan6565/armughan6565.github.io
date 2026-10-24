import type { DomainId, ServiceSlug } from "./services";
import type { InsightCategory } from "./insights";

/**
 * Photography. Unsplash-hosted stock (free licence) — swap for owned photography before launch.
 * Static export has no image optimizer, so sizing is done through Unsplash's URL params.
 */
export const img = (id: string, w = 1200) => `https://images.unsplash.com/photo-${id}?w=${w}&q=75&auto=format&fit=crop`;

export const photos = {
  skyline: "1486406146926-c627a92ad1ab",
  meeting: "1556761175-5973dc0f32e7",
  team: "1522071820081-009f0129c71c",
  teamTable: "1600880292203-757bb62b4baf",
  office: "1497366216548-37526070297c",
  laptopWork: "1573164713988-8665fc963095",
  contract: "1450101499163-c8848c66ca85",
  dashboard: "1551288049-bebda4e38f71",
};

export const serviceImages: Record<ServiceSlug, string> = {
  "it-audit": "1454165804606-c3d57bc86b40",
  "it-risk-advisory": "1550751827-4bd374c3f58b",
  "cyber-advisory": "1563986768609-322da13575f3",
  "data-analytics": "1551288049-bebda4e38f71",
  "ai-process-automation": "1677442136019-21780ecad995",
  "data-science": "1526628953301-3e589a6a8b74",
  tax: "1554224155-6726b3ff858f",
  "financial-accounting": "1460925895917-afdab827c52f",
  "bpr-erp": "1519389950473-47ba0277781c",
};

export const industryImages: Record<string, string> = {
  "financial-services": "1611974789855-9c2a0a7236a3",
  banking: "1559526324-4b87b5e36e44",
  insurance: "1450101499163-c8848c66ca85",
  manufacturing: "1565688534245-05d6b5be184a",
  "retail-consumer": "1441986300917-64674bd600d8",
  healthcare: "1576091160399-112ba8d25d1d",
  technology: "1518770660439-4636190af475",
  "professional-services": "1507679799987-c73779587ccf",
  "public-sector": "1541872703-74c5e44368f9",
  "other-enterprises": "1497366216548-37526070297c",
};

export const insightImages: Record<InsightCategory, string> = {
  Risk: "1550751827-4bd374c3f58b",
  Technology: "1531297484001-80022131f5a1",
  AI: "1677442136019-21780ecad995",
  Data: "1551288049-bebda4e38f71",
  Finance: "1454165804606-c3d57bc86b40",
};

/** One colour per discipline, used for chips, bars and accents. */
export const domainColor: Record<DomainId, { text: string; bg: string; hex: string }> = {
  data: { text: "text-sky", bg: "bg-sky", hex: "#38bdf8" },
  technology: { text: "text-mint", bg: "bg-mint", hex: "#2dd4bf" },
  business: { text: "text-amber", bg: "bg-amber", hex: "#f59e0b" },
};
