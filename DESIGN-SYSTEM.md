# Data Fold — Design System

Tokens live in `src/app/globals.css` (`@theme`). Tailwind's default colour and type scales are **reset**, so every colour and text size in the codebase comes from this system.

## Brand

| | |
|---|---|
| Positioning | A multidisciplinary technology and business consultancy — technology, data, risk and finance in one team |
| Tagline | **Complexity, folded into clarity.** |
| Personality | Trust · Intelligence · Technology · Transformation |

**Tagline candidates considered:** "Decisions, unfolded." (clever but vague) · "Where data meets decision." (excludes risk/finance) · "Clarity from complexity." (generic) · **"Complexity, folded into clarity."** — chosen: it carries the name, works across every service line and reads as a promise rather than a slogan.

### Logo
A flat plane (data as it is) beside a plane folding away in perspective (the same data reduced into a new dimension). The silhouette also reads as an abstract "D". Two flat colours, no gradients, legible at 16px.

- React: `src/components/brand/logo.tsx` (`<Logo />`, `<LogoMark />`, `inverse` prop for dark backgrounds)
- Files: `public/brand/datafold-mark.svg`, `datafold-mark-inverse.svg`, `datafold-logo.svg`; favicon `src/app/icon.svg`
- Wordmark: "DATA" semibold + "FOLD" regular, tracking 0.16em. *Before print use, outline the wordmark text in a vector editor (the SVG references the web font).*
- Clear space: the width of the flat panel on all sides. Minimum size: 16px mark / 96px lock-up.

## Colour

| Token | Hex | Use |
|---|---|---|
| `ink` | `#0B1220` | Primary — text, dark surfaces, primary buttons |
| `teal` | `#0F766E` | Secondary — brand, "structured", active states (5.5:1 on white) |
| `blue` | `#2563EB` | Accent — "insight", focus rings (5.2:1 on white) |
| `muted` | `#475467` | Secondary text (7.4:1) |
| `subtle` | `#667085` | Captions, meta (4.8:1) |
| `bg` / `surface` | `#FFFFFF` | Page / cards |
| `canvas` | `#F5F6F8` | Alternate section surface |
| `line` / `line-strong` | `#E4E7EC` / `#CFD4DC` | Hairlines, input borders |
| `teal-soft`, `blue-soft` | `#E7F3F1`, `#EAF0FD` | Tints for selection and highlights |
| `success` / `warning` / `error` / `info` | `#157F3C` / `#B54708` / `#B42318` / `#2563EB` | States (each with a `-soft` tint) |

Rule: teal marks *structure and brand*, blue marks *the insight or the focused thing*. Never more than one accent per component.

## Typography

**Instrument Sans** (display + body) and **IBM Plex Mono** (labels, indices, data). Both are self-hosted via `next/font`.

| Token | Size | Leading | Tracking |
|---|---|---|---|
| `text-display` | 42→76px fluid | 1.02 | −0.038em |
| `text-h1` | 36→64px | 1.05 | −0.032em |
| `text-h2` | 30→48px | 1.10 | −0.026em |
| `text-h3` | 22→28px | 1.22 | −0.016em |
| `text-h4` | 18px | 1.40 | −0.008em |
| `text-lead` | 18→21px | 1.55 | — |
| `text-body` | 16px | 1.65 | — |
| `text-small` | 14px | 1.55 | — |
| `text-caption` | 13px | 1.45 | — |
| `text-label` / `.eyebrow` | 12px mono, uppercase | 1.30 | 0.08em |

Headings use weight 500, never bold. Emphasis comes from colour (teal) or scale, not weight. Buttons: 14px, weight 500.

## Layout & spacing
- Container: `.container-x` — max 1400px, fluid gutter 20→56px.
- Section rhythm: `.section-y` — 72→128px vertical padding.
- 12-column grid at `lg`. Spacing uses Tailwind's 4px scale.
- Breakpoints: `sm` 640 · `md` 768 · `lg` 1024 · `xl` 1280 · `2xl` 1536 · `3xl` 1600.

## Surfaces, radii, shadows
- Structure comes from **hairlines** (`border-line`) and a faint analytic grid (`.grid-paper`), not from cards and shadows.
- Radii: `xs` 2px (tags) · `sm` 4px (buttons, inputs) · `md` 8px · `lg` 12px. Mostly `sm`.
- Shadows: `sm` for resting panels, `lg` for the mega menu only.

## Components
| Component | File |
|---|---|
| Header + MegaMenu + mobile menu | `components/layout/header.tsx` |
| Footer | `components/layout/footer.tsx` |
| Button / ButtonLink (`primary`, `secondary`, `inverse`, `text`) | `components/ui/button.tsx` |
| SectionHeading | `components/ui/section-heading.tsx` |
| PageHero | `components/sections/page-hero.tsx` |
| CTASection | `components/sections/cta-section.tsx` |
| Reveal | `components/motion/reveal.tsx` |
| FoldVisualization (signature) | `components/visuals/fold-visualization.tsx` |
| ServiceEcosystem | `components/visuals/service-ecosystem.tsx` |
| EvidenceLens | `components/visuals/evidence-lens.tsx` |
| InsightCard, InsightsBrowser | `components/insights/*` |
| ContactForm | `components/contact/contact-form.tsx` |

Icons: **lucide-react only**, stroke 1.5–1.75, 16–24px, always `aria-hidden` when decorative.

## Motion

| Tier | Duration | Easing | Used for |
|---|---|---|---|
| Fast | 180ms (`--dur-fast`) | `--ease-out` | Hover colour, borders |
| Base | 320ms (`--dur-base`) | `--ease-out` | Button fill, underline, chevrons, menus |
| Reveal | 640ms (`--dur-reveal`) | `--ease-out` | Section entrance (once) |
| Route | 420ms | `--ease-out` | Page transition (`app/template.tsx`) |
| Visualization | 1000–1100ms + 12ms stagger | `--ease-out` | The Fold, Evidence Lens |

`--ease-out: cubic-bezier(0.22, 1, 0.36, 1)`. Only `transform` and `opacity` are animated.

Principles: motion shows **change of state or hierarchy** — nothing loops without purpose. The Fold auto-advances only while visible and pauses on hover or focus. Under `prefers-reduced-motion`, transitions collapse to 1ms, reveals are shown immediately, and the Fold holds on the *Insight* stage.

Signature interactions: the teal "fold" wipe on primary buttons, the arrow nudge, the animated underline, and the Fold's segmented progress bar.
