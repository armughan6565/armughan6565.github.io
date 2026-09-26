# Data Fold — website

Marketing site for Data Fold, a multidisciplinary technology and business consultancy.
Built with Next.js 16 (App Router, Turbopack), React 19, TypeScript, Tailwind CSS 4 and Motion.

## Run

```bash
npm install
cp .env.example .env.local   # then set NEXT_PUBLIC_SITE_URL (and CONTACT_WEBHOOK_URL when ready)
npm run dev                  # http://localhost:3000
```

## Build & deploy

```bash
npm run lint
npm run build
npm start                    # serves the production build on :3000
```

Deploys to any Node host (Vercel, Netlify, Render, a container). Every page is pre-rendered as static HTML. Only `/api/contact` runs server-side.
On Vercel: import the repo and set the environment variables below. No other configuration is needed.

| Variable | Required | Purpose |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | Yes (prod) | Canonical URLs, sitemap, OG, JSON-LD |
| `CONTACT_WEBHOOK_URL` | Yes (prod) | Where contact enquiries are POSTed as JSON. Without it, production returns 503 rather than silently losing enquiries |
| `CONTACT_WEBHOOK_TOKEN` | Optional | Sent as a `Bearer` token to the webhook |

To use an email provider (Resend, Postmark, SES…) instead of a webhook, replace the body of `deliverEnquiry` in `src/lib/contact-delivery.ts`.

## Structure

```
src/
  app/                       routes (App Router)
    page.tsx                 home
    services/ [slug]/        overview + 9 service pages (SSG)
    industries/  insights/ [slug]/  about/  contact/
    case-studies/[slug]/     case-study template (sample only, noindex)
    privacy/ terms/ cookies/ legal templates
    api/contact/route.ts     contact endpoint (validation, honeypot, rate limit)
    sitemap.ts robots.ts opengraph-image.tsx icon.svg not-found.tsx error.tsx template.tsx
  components/
    brand/ layout/ ui/ sections/ motion/ visuals/ insights/ contact/
  content/                   structured content — CMS-ready (services, industries, insights, case-studies, company)
  config/site.ts             brand + contact details (placeholders marked)
  lib/                       seo helpers, contact schema & delivery
```

## Content & CMS

All copy lives in `src/content/*.ts` as typed data. Article bodies are structured blocks (`p`, `h2`, `list`, `quote`), not HTML, so they map onto Sanity Portable Text, Contentful Rich Text, Strapi blocks or WordPress blocks.
To connect a CMS, replace `getAllInsights()` / `getInsight()` with fetchers that return the same `Insight` type. The pages don't change.

## Before launch — placeholders to replace

- `src/config/site.ts`: domain, email, phone, street address, legal entity name, social URLs (empty URLs are hidden)
- All six Insights are **editorial samples** (`sample: true`). They are badged, `noindex`, and excluded from the sitemap. Approve or replace them, then set `sample: false`.
- `src/content/case-studies.ts`: layout sample only. Add real, client-approved case studies.
- Privacy, Terms and Cookie pages are **templates** and need legal review.
- Company values and the "Focused teams" / "Independence" statements should be confirmed by the firm.
- Contact delivery: set `CONTACT_WEBHOOK_URL`.

See `DESIGN-SYSTEM.md` for tokens, typography, motion and component guidelines.
