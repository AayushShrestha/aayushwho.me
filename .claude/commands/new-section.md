Scaffold a new page section component for aayushwho.me. The user will provide the section name and purpose.

## Before writing any code

1. Read `src/app/globals.css` to confirm current theme tokens
2. Read an existing similar component (e.g., `src/components/Tours.tsx` or `src/components/Specials.tsx`) to match the exact patterns used
3. Read `src/data/content.ts` to understand the data structure

## Component requirements

Create `src/components/<SectionName>.tsx` following these rules:

**Structure:**
```tsx
'use client'

import { motion } from 'framer-motion'

// Props from content.ts if needed
interface SectionNameProps { ... }

export default function SectionName() {
  return (
    <section id="section-id" className="...">
      {/* content */}
    </section>
  )
}
```

**Design system rules:**
- Background: `bg-club-black`, `bg-club-gray`, or `bg-club-navy` — rotate to create visual separation between sections
- Text: `text-club-gray-light` for body, white for emphasis
- Accent: `text-club-red` or `bg-club-red` for CTAs and highlights
- Headings: always use the `font-heading` class (Anton, uppercase)
- Body text: default serif (Merriweather) via body styles
- Noise overlay: only the root layout uses `bg-noise` — don't add it to sections
- Padding: `py-20 px-6` or `py-24 px-8` for section spacing, `max-w-6xl mx-auto` for container

**Animation pattern (copy exactly):**
```tsx
<motion.div
  initial={{ opacity: 0, y: 30 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6 }}
  viewport={{ once: true }}
>
```

**If the section needs data:**
- Add the data type and array to `src/data/content.ts` first
- Import from `@/data/content` in the component

## After creating the component

1. Add the import and `<SectionName />` to `src/app/page.tsx` in the correct position
2. Add a nav link in `src/components/Navbar.tsx` if the section should be navigable
3. Run `npm run lint` to catch any TypeScript issues

## Confirm with the user

Before writing code, state: the section name, where it will appear in the page order, and what data (if any) needs to be added to content.ts. Get confirmation before proceeding.
