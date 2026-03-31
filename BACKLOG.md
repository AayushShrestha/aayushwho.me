# BACKLOG

---

## Epic 1: Hero CTA ✅
- [x] Add `heroContent` to `content.ts` (tagline, primaryCTA, secondaryCTA)
- [x] Add CTA buttons to `Hero.tsx`
- [x] Add social icons row to `Hero.tsx`
- [x] Extract `socialLinks` to `content.ts` for reuse across components

---

## Epic 2: Section Reorder ✅
- [x] Update `page.tsx` render order (Hero → Tours → Specials → Showcase → PPV → Community → Merch → Connectivity)
- [x] Update Navbar `navLinks` to match new order + add Inner Circle

---

## Epic 3: Community Section ✅
- [x] Add `communityContent` to `content.ts` (Discord + WhatsApp invite URLs)
- [x] Create `src/app/api/subscribe/route.ts` (email → `/data/subscribers.json`)
- [x] Create `src/components/Community.tsx` (Discord, WhatsApp, Newsletter cards)
- [x] Add `/data/` to `.gitignore`
- [ ] Fill in real Discord invite URL in `communityContent.discord.inviteUrl`
- [ ] Fill in real WhatsApp Broadcast Channel URL in `communityContent.whatsapp.inviteUrl`

---

## Epic 4: Copy Overhaul ✅
- [x] Add `sectionCopy` export to `content.ts`
- [x] Update `Hero.tsx` tagline
- [x] Update `Tours.tsx` + YouTube nudge
- [x] Update `Specials.tsx`
- [x] Update `Showcase.tsx` + YouTube nudge
- [x] Update `PPV.tsx`
- [x] Update `Merch.tsx`
- [x] Update `Connectivity.tsx` (shared `socialLinks` + new copy)

---

## Epic 5: Documentation ✅
- [x] Append Phase 2 section to `what_are_we_doing.md`
- [x] Create `BACKLOG.md`

---

## Backlog (Future)

### Community
- [ ] Integrate email newsletter with an ESP (Beehiiv recommended) — replace `/api/subscribe` filesystem approach before Vercel deploy
- [ ] Add Heckle Box form submission handler (currently `onSubmit` is no-op)

### Content
- [ ] Replace placeholder images in Specials section (all three use `mujibaad.png`)
- [ ] Add real merch product images and links
- [ ] Update `upcomingShows` data with real ticket links when available
- [ ] Verify YouTube video IDs are the correct public videos

### Pages
- [ ] Build out tech work page (`/tech`)
- [ ] Build out writing/direction page (`/writing`)

### SEO & Performance
- [ ] Add `metadata` export to `layout.tsx` (title, description, og:image)
- [ ] Add structured data (JSON-LD) for events (upcoming shows)
- [ ] Audit image sizes and add proper `sizes` props to all `<Image>` components
