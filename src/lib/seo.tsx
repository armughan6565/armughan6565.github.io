import type { Metadata } from "next";
import { absoluteUrl, site } from "@/config/site";

/** Per-page metadata with canonical + OG/Twitter kept in sync. */
export function pageMetadata({
  title,
  description,
  path,
  type = "website",
  noindex = false,
}: {
  title: string;
  description: string;
  path: string;
  type?: "website" | "article";
  noindex?: boolean;
}): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: { title, description, url: path, type, siteName: site.name },
    twitter: { card: "summary_large_image", title, description },
    ...(noindex && { robots: { index: false, follow: true } }),
  };
}

type Json = Record<string, unknown>;

/** Serialises JSON-LD safely: `<` is escaped so content can never close the script tag. */
export function JsonLd({ data }: { data: Json | Json[] }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}

export const organizationJsonLd = (): Json => ({
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "@id": absoluteUrl("/#organization"),
  name: site.name,
  url: site.url,
  logo: absoluteUrl("/brand/datafold-mark.svg"),
  slogan: site.tagline,
  description: site.description,
  foundingDate: String(site.founded),
  address: {
    "@type": "PostalAddress",
    addressLocality: site.headquarters.city,
    addressCountry: "PK",
  },
  areaServed: "Worldwide",
});

export const websiteJsonLd = (): Json => ({
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: site.name,
  url: site.url,
  publisher: { "@id": absoluteUrl("/#organization") },
});

export const breadcrumbJsonLd = (items: { name: string; path: string }[]): Json => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: items.map((item, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: item.name,
    item: absoluteUrl(item.path),
  })),
});
