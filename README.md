# Equilibrium

**Live:** https://buyequilibrium.com  
**Backup:** https://equilibrium-sand.vercel.app  
**Vercel Project:** equilibrium-sand

## What Is This?

A visual memecoin comparison tool built for bonk.fun's Balanced Mode launch. Users drag tokens onto an old-school balance scale to compare market caps in real-time.

## Key Features

- **Draggable Tokens** — Physics-based floating tokens you can throw onto the scale
- **Real-time Scale** — Heavier side tips down, shows market cap differential
- **Tiered Token Display** — Pyramid layout: Whales → Runners → Mid-Tier → Emerging → Micros → Floor
- **Mathematical Thesis** — Explains Balanced Mode mechanics (0.75% LP depth, 0.25% creator rewards)
- **Note Paper Modals** — Styled like ruled notebook paper with hole punches

## Stack

- React + TypeScript
- Vite
- Tailwind CSS
- Framer Motion (animations)
- Matter.js (physics for floating tokens)

## Local Development

```bash
cd ~/clawd/projects/equilibrium
npm install
npm run dev
```

## Deployment

Deployed on Vercel. Auto-deploys on push to main.

```bash
git add -A && git commit -m "update" && git push
```

## Domain

- **Primary:** buyequilibrium.com (Google Domains)
- **Root A record:** 76.76.21.21 (Vercel)
- **www CNAME:** cname.vercel-dns.com

## Sidebar Buttons

- **X** — Links to X/Twitter (update href when account created)
- **CA** — Shows "Coming Soon" modal (update after coin launches)
- **SUM** — Opens Thesis modal explaining Balanced Mode math

## Files

- `src/App.tsx` — Main layout
- `src/components/ClassicScale.tsx` — The balance scale
- `src/components/FloorTokens.tsx` — Tiered token pyramid
- `src/components/Sidebar.tsx` — Left sidebar with modals
- `src/components/Thesis.tsx` — Mathematical thesis box
- `src/components/Header.tsx` — Title and swap symbol

---

*Built for bonk.fun Balanced Mode launch. Simple, clean, effective.*
