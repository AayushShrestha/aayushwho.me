@AGENTS.md

# Project: aayushwho.me

Personal website for Aayush Shrestha — Stand Up Comedian and Software Engineer. The primary landing page focuses exclusively on the Stand Up Comedy work.

## Tech Stack (Critical Versions)

- **Next.js 16.2.1** — Has breaking changes from earlier versions. Before writing routing, data-fetching, or layout code, read `node_modules/next/dist/docs/`. Do not assume Next.js 13/14/15 conventions.
- **React 19.2.4** — App Router uses React canary with Server Components support
- **Tailwind CSS v4** — Uses `@tailwindcss/postcss`. No `tailwind.config.js`. Theme defined in `globals.css` via `@theme inline {}`. Do not look for a config file.
- **Framer Motion 12** — Used for all animations
- **TypeScript** — Strict mode enabled

## Project Structure

```
src/
  app/
    layout.tsx      # Root layout: fonts, metadata, Navbar wrapper
    page.tsx        # Main page: section order
    globals.css     # Tailwind import + theme tokens + global styles
  components/       # One file per section
  data/
    content.ts      # ALL site content lives here (videos, shows, merch, etc.)
public/images/      # Serve images from here (not /images/ root)
```

## Design System

**Colors (Tailwind v4 tokens — use as `bg-club-black`, `text-club-red`, etc.):**
- `--color-club-black: #080808` — main background
- `--color-club-gray: #1a1a1a` — card backgrounds, sections
- `--color-club-gray-light: #e5e5e5` — body text
- `--color-club-navy: #0a0f1c` — alternate dark background
- `--color-club-red: #8a0303` — primary accent, CTAs
- `--color-club-red-dark: #4a0101` — hover states, deeper accents
- `--color-club-blue: #2563eb` — secondary accent (use sparingly)

**Typography:**
- `font-heading` utility class → Anton (bold, uppercase, sans-serif) — all headings
- `font-serif` → Merriweather — body text (default body)
- Never mix heading font into body copy

**Visual Language:**
- Raw, grainy midnight-club aesthetic. Dark, underground, exclusive.
- `bg-noise` class on the root layout applies the gritty film-grain overlay
- Animations via Framer Motion `whileInView` for scroll-triggered entrances
- Hover: glow effects, color shifts, scale transforms

## Key Conventions

- All content data (videos, shows, merch, specials) lives in `src/data/content.ts` — never hardcode content in components
- One component per section, named after the section (e.g., `Tours.tsx`)
- Components use `motion` from framer-motion for animations
- Images served from `/public/images/` — use Next.js `<Image>` component
- External images: only `img.youtube.com` is whitelisted in `next.config.ts`
- Mobile-first responsive design

## Current Page Sections (in order)

1. `<Hero />` — full-viewport hero with title
2. `<Specials />` — current stand-up specials (Mujibaad, Dark Dirty Dangerous, Gender In.Equality)
3. `<Tours />` — upcoming show dates
4. `<PPV />` — pay-per-view special
5. `<Showcase />` — YouTube videos + podcasts
6. `<Merch />` — merchandise
7. `<Connectivity />` — heckle box form + social links

**`Bio.tsx` exists but is NOT used in page.tsx yet.**

## What Is Not Yet Implemented

- Backend for the "Heckle Box" contact form
- Merch purchase flow / cart
- Ticket purchase integration
- PPV payment system
- Other pages (tech work, writing, direction)

## Dev Commands

```bash
npm run dev    # http://localhost:3000
npm run build
npm run lint
```
