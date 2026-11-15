# WEIDER Mongolia

Website of WEIDER Mongolia — importer of WEIDER and Victory Endurance sports nutrition.
Site copy is in Mongolian.

- Facebook: https://www.facebook.com/WeiderMongolia
- Instagram: https://www.instagram.com/weider_mongolia/

## Development

Requires Node.js 20+.

```sh
npm install
npm run dev        # http://localhost:5180
npm run build      # production build (Nitro; auto-detects the hosting provider)
npm run preview    # serve the production build
npm test           # vitest
npm run lint
```

## Where things live

| What | Where |
| --- | --- |
| Product catalogue (names, prices ₮, servings, key figures) | `src/data/products.ts` |
| Product photos — one file per product id, picked up automatically | `src/assets/products/<id>.png\|jpg\|webp` |
| Contact email and social links | `src/data/site.ts` |
| Legacy page copy and archive photo registry (with credits) | `src/data/legacy.ts`, `src/assets/archive/` |
| Logo | `src/assets/brand/` |
| Design tokens, fonts, Mongolian typography rules | `src/styles.css`, `src/routes/__root.tsx` |
| Pages (file-based routing) | `src/routes/` |

## Stack

TanStack Start (React 19, SSR) · Vite · Tailwind CSS v4 · Framer Motion · GSAP ScrollTrigger · Nitro.

## Image rights

Product packshots are manufacturer images; confirm usage rights with the supplier before launch.
Archive photos on `/legacy` are Wikimedia Commons files (public domain / CC BY / CC BY-SA) — keep
their credits; slots without a licensed photo show a labelled placeholder.
