/**
 * Single source of truth for brand and contact details.
 * TODO(before launch): replace every value marked PLACEHOLDER.
 */
export const site = {
  name: "Data Fold",
  legalName: "Data Fold", // PLACEHOLDER — confirm registered legal entity name
  tagline: "Audit, risk and data advisory.",
  description:
    "Data Fold is a multidisciplinary consultancy working across IT audit, risk, cybersecurity, data, AI, tax, finance and ERP — helping organizations turn technology, data and risk into better business decisions.",
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.example.com").replace(/\/$/, ""), // PLACEHOLDER domain
  founded: 2025,
  headquarters: { city: "Karachi", country: "Pakistan" },
  contact: {
    email: "contact@example.com", // PLACEHOLDER
    phone: "+00 000 000 0000", // PLACEHOLDER
    address: "Karachi, Pakistan", // PLACEHOLDER — add full street address when available
  },
  /** Leave href empty to hide a profile. PLACEHOLDER — add real URLs. */
  social: [
    { label: "LinkedIn", href: "" },
    { label: "X", href: "" },
  ],
} as const;

export const absoluteUrl = (path = "/") => `${site.url}${path}`;
