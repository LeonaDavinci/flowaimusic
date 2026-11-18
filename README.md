# Flow AI Music

`www.flowaimusic.com` — an AI music creation product site built with **Next.js App Router (SSR)**.

The information architecture is informed by a structural analysis of a leading
conversational AI music studio. All copy, artwork, track names, plans and demo
data in this repository are original. This project is not affiliated with, or
endorsed by, any third-party music product or model provider.

## Quick start

```bash
npm install
npm run dev          # http://localhost:3000
npm run build        # production build
npm run start        # serve the production build
npm run typecheck    # tsc --noEmit
```

Requires Node.js 20.9+ (developed on Node 22).

## Brand & keyword convention

The brand is written **`Flow AI Music`** everywhere in UI, metadata and
structured data. The compact form `flowaimusic` is kept only where it belongs:
the domain `www.flowaimusic.com`, the repository / package name, and a sample
Space URL — this preserves the exact-match long-tail search term without
turning the whole site into one concatenated word. `Flow Music AI` is declared
as `alternateName`, and the long-tail phrases `ai music creator` and
`flow music ai` are laid out on the homepage, the `/ai-music-creator` landing
page, the guide and the JSON-LD keywords.

## What is inside

| Route | Purpose |
| --- | --- |
| `/` | Landing page: hero composer, quick starts, studio preview, playable keyboard, capabilities, testimonials, CTA |
| `/studio` | Demo creation workspace; reads `?brief=` and `?persona=` on the server |
| `/explore` | Community feed; `?genre=` filtering happens on the server |
| `/features` | Six capability modules + workflow |
| `/pricing` | Four plans, monthly/yearly switch, comparison table, FAQ |
| `/ai-music-creator` | Long-tail landing page for `ai music creator` / `flow music ai` |
| `/guides/ai-music-generator` | Long-form SEO guide (template for future articles) |
| `/library/*` | Library empty states |
| `/terms`, `/privacy` | Legal pages |

Full product requirements: [`docs/PRD.md`](docs/PRD.md).

## Rendering & SEO

- Every page exports `dynamic = 'force-dynamic'`, so routes are server-rendered
  per request (`ƒ` in the build output) instead of being pre-rendered as static HTML.
- `generateMetadata`-style per-page metadata via `src/lib/seo.ts`: title,
  description, canonical, Open Graph, Twitter card, robots.
- JSON-LD: `SoftwareApplication` + `Organization` (home, with
  `alternateName: Flow Music AI`), `FAQPage` (pricing and AI music creator),
  `Article` + `BreadcrumbList` (guide and landing page).
- `app/sitemap.ts` → `/sitemap.xml`, `app/robots.ts` → `/robots.txt`,
  `app/opengraph-image.tsx` → dynamically generated 1200×630 OG image.
- One `<h1>` per page, semantic landmarks, visible focus rings,
  `prefers-reduced-motion` support.

## Architecture

```
src/
├── app/                 # routes, global CSS, sitemap/robots/OG image
├── components/          # server components + 6 small client islands
├── lib/
│   ├── content.ts       # all demo content (single source of truth)
│   └── seo.ts           # metadata + schema helpers
public/
├── favicon.ico          # 16/32/48/64/128/256 multi-size ICO
├── logo.png             # 128×128 RGBA PNG - the only brand mark asset
└── album-cover.png      # 1080×800 song-cover artwork for track cards
docs/PRD.md              # product requirements document
```

The violet rounded-square waveform mark is delivered as PNG (plus an ICO for
browser tabs) — there is no SVG logo asset. `layout.tsx` declares `icon` /
`apple` / `shortcut`, the header and footer render `/logo.png`, and the
`Organization` schema points to `logo.png`. Both the logo and the track cover
images carry `alt="flow ai music"` for accessibility and keyword context.

Client-side JavaScript is limited to the interactive islands (header, hero
composer, mini keyboard, play buttons, studio workspace, pricing toggle).
The content itself is rendered on the server.

## Demo scope

No account, no payments, no database, no real music generation. The studio
simulates a generation session in the browser, the keyboard synthesises notes
with the Web Audio API, and analytics events are written only to an in-browser
`dataLayer` array. See `/terms` and `/privacy` for the user-facing wording.

## Deployment

`npm run build && npm run start` works on any Node host. The site is also
compatible with Vercel and Cloudflare's Next.js runtime. Set the production
domain to `https://www.flowaimusic.com` — `SITE_URL` in `src/lib/content.ts`
drives canonical URLs, OG URLs, sitemap and robots.
