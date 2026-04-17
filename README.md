# SwiftShopr Website

Marketing site for SwiftShopr — AI-powered retail checkout.
Deployed as a static Next.js site on Render at [swiftshopr.shop](https://swiftshopr.shop).

## Stack

- **Next.js 14** (App Router, static export via `output: 'export'`)
- **TypeScript** + **Tailwind CSS** + shadcn/ui patterns
- **Framer Motion** for animations, **Lucide** for icons
- **next-themes** for light/dark mode
- Hosted on **Render Static Site** (free tier)

## Pages

| Route | Description |
|---|---|
| `/` | Home — hero, stats, features, app showcase, CTA |
| `/for-shoppers` | Consumer-facing features |
| `/for-retailers` | POS integration, Stripe Connect, pilot request |
| `/about` | Company mission, values, how we monetize, partners |
| `/swifty` | Live Swifty AI — real Claude-powered shopping assistant |
| `/privacy`, `/terms`, `/support` | Legal + help |

## Live Backend Integration

The site fetches data from `https://shopr-scanner-backend.onrender.com`:

- `GET /api/v1/public/stats` — landing-page counters (5 min cache)
- `GET /api/v1/retailers` — partner logos
- `GET /api/v1/agent/suggestions` — AI demo suggestion chips
- `POST /api/v1/public/agent/demo-chat` — live AI chat (rate-limited)

## Local Development

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # static export to ./out
```

## Deployment (Render)

1. **Connect repo** in Render Dashboard → New → Static Site
2. Render auto-reads `render.yaml` for build + env config
3. **Build command**: `npm ci && npm run build`
4. **Publish directory**: `out`
5. **Node version**: 20 (via `.nvmrc`)
6. **Custom domain**: `swiftshopr.shop` (existing DNS → CNAME to Render target)

## Backend Env Vars Required

On the `ross-scanner-backend` Render service, add:
- `DEMO_USER_SALT` — random 32+ char string (for hashing demo session IDs)
- `ALLOWED_ORIGINS` — ensure `https://swiftshopr.shop,https://www.swiftshopr.shop` is included

## Legacy

The original static HTML site is preserved under `legacy/`.
