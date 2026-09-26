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
npm run build                # static export → out/
npx serve out                # preview the exported site locally
```

The site is a **fully static export** (`output: "export"` in `next.config.ts`) deployed to
GitHub Pages as a user site: **https://armughan6565.github.io/**.
`.github/workflows/deploy.yml` builds and deploys on every push to `main`
(repo Settings → Pages → Source must be **GitHub Actions**).

| Variable | Required | Purpose |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | Yes (prod) | Canonical URLs, sitemap, OG, JSON-LD. Set in the workflow |
| `NEXT_PUBLIC_CONTACT_ENDPOINT` | Optional | Where the contact form POSTs. Unset on GitHub Pages → the form validates, then asks the visitor to email `site.contact.email` (mailto prefilled) |

### Contact form on static hosting

GitHub Pages cannot run server code, so the contact API is parked at `src/server/contact-route.ts`
(validation, honeypot, origin check, rate limit, webhook delivery — unchanged). To restore online submission on a Node host
(Vercel, Netlify, a container): move it back to `src/app/api/contact/route.ts`, remove `output: "export"`, and build with
`NEXT_PUBLIC_CONTACT_ENDPOINT=/api/contact` plus `CONTACT_WEBHOOK_URL` (and optional `CONTACT_WEBHOOK_TOKEN`, server-side only).
To replace the webhook with an email provider (Resend, Postmark, SES…), edit `deliverEnquiry` in `src/lib/contact-delivery.ts`.

Security headers from the previous `next.config.ts` can't be set by a static export on GitHub Pages; they are listed in `next.config.ts` for a future host.

## Structure

```
src/
  app/                       routes (App Router)
    page.tsx                 home
    services/ [slug]/        overview + 9 service pages (SSG)
    industries/  insights/ [slug]/  about/  contact/
    case-studies/[slug]/     case-study template (sample only, noindex)
    privacy/ terms/ cookies/ legal templates
    sitemap.ts robots.ts opengraph-image.png icon.svg not-found.tsx error.tsx template.tsx
  components/
    brand/ layout/ ui/ sections/ motion/ visuals/ insights/ contact/
  content/                   structured content — CMS-ready (services, industries, insights, case-studies, company)
  config/site.ts             brand + contact details (placeholders marked)
  lib/                       seo helpers, contact schema & delivery
  server/contact-route.ts    parked contact API (not in the static export)
  og/opengraph-image.tsx     design source for app/opengraph-image.png
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
- Contact: replace the placeholder email in `src/config/site.ts` (the static contact form sends visitors there), or restore the API as above.

See `DESIGN-SYSTEM.md` for tokens, typography, motion and component guidelines.
