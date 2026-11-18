# FlowAI Music

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

## What is inside

| Route | Purpose |
| --- | --- |
| `/` | Landing page: hero composer, quick starts, studio preview, playable keyboard, capabilities, testimonials, CTA |
| `/studio` | Demo creation workspace; reads `?brief=` and `?persona=` on the server |
| `/explore` | Community feed; `?genre=` filtering happens on the server |
| `/features` | Six capability modules + workflow |
| `/pricing` | Four plans, monthly/yearly switch, comparison table, FAQ |
| `/guides/ai-music-generator` | Long-form SEO guide (template for future articles) |
| `/library/*` | Library empty states |
| `/terms`, `/privacy` | Legal pages |

Full product requirements: [`docs/PRD.md`](docs/PRD.md).

## Rendering & SEO

- Every page exports `dynamic = 'force-dynamic'`, so routes are server-rendered
  per request (`ƒ` in the build output) instead of being pre-rendered as static HTML.
- `generateMetadata`-style per-page metadata via `src/lib/seo.ts`: title,
  description, canonical, Open Graph, Twitter card, robots.
- JSON-LD: `SoftwareApplication` + `Organization` (home), `FAQPage` (pricing),
  `Article` + `BreadcrumbList` (guide).
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
docs/PRD.md              # product requirements document
```

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
