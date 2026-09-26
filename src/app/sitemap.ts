import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/config/site";
import { services } from "@/content/services";
import { getAllInsights } from "@/content/insights";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages = ["/", "/services", "/industries", "/insights", "/about", "/contact", "/privacy", "/terms", "/cookies"];
  return [
    ...staticPages.map((p) => ({ url: absoluteUrl(p), changeFrequency: "monthly" as const, priority: p === "/" ? 1 : 0.7 })),
    ...services.map((s) => ({ url: absoluteUrl(`/services/${s.slug}`), changeFrequency: "monthly" as const, priority: 0.8 })),
    // Editorial samples are noindex, so they are left out until approved
    ...getAllInsights()
      .filter((i) => !i.sample)
      .map((i) => ({ url: absoluteUrl(`/insights/${i.slug}`), lastModified: i.published, priority: 0.6 })),
  ];
}
