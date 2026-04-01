Update the site content data in `src/data/content.ts`. This is how all dynamic content (shows, videos, merch, specials, podcasts) is managed on aayushwho.me.

## Step 1 — Read the current content file

Always read `src/data/content.ts` fully before making any edits. Never modify it blind.

## Step 2 — Identify what to update

The file contains these data arrays:

- **`standUpVideos`** — YouTube video IDs and metadata for the Showcase section
- **`podcasts`** — Podcast appearance YouTube IDs and metadata
- **`specialsList`** — Current stand-up specials (Mujibaad, Dark Dirty Dangerous, Gender In.Equality)
- **`upcomingShows`** — Tour dates with venue, city, date, ticketLink, status
- **`merchItems`** — Merchandise with name, price (in Rs.), link
- **`ppvSpecials`** — Pay-per-view specials with price and link

## Step 3 — Make the update

Apply the minimal edit needed. Match the exact TypeScript interface of existing entries.

**For show status values:** use exactly `"Available"`, `"Selling Fast"`, or `"Sold Out"`

**For YouTube videos:** the `id` field is the YouTube video ID (the part after `v=` in the URL)

**For prices:** always in Rs. (Nepalese Rupees), stored as a number

**Date format for shows:** use a human-readable string like `"April 12, 2025"` — match the existing format

## Step 4 — Verify TypeScript

After editing, run `npm run lint` to confirm there are no type errors.

## Step 5 — Commit

After the update, use `/commit` to make an atomic `content(scope)` commit. Example:
```
content(tours): add April shows at Laugh Garden Kathmandu
content(showcase): add new Mujibaad clip from March performance
```
