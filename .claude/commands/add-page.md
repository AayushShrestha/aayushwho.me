Scaffold a new page (route) for aayushwho.me. The user will provide the page name and purpose (e.g., "tech work", "writing", "direction").

## Before writing any code

1. Read `node_modules/next/dist/docs/01-app/01-getting-started/` to confirm the current routing conventions for this version of Next.js
2. Read `src/app/layout.tsx` to understand what the root layout provides (fonts, Navbar, global styles)
3. Read an existing page like `src/app/page.tsx` to match structure

## Creating the route

New pages go in `src/app/<page-name>/page.tsx` following the App Router convention.

**Page file structure:**
```tsx
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Page Title | AAYUSHWHO',
  description: 'Brief description',
}

export default function PageName() {
  return (
    <main>
      {/* sections */}
    </main>
  )
}
```

**Rules:**
- The root layout already wraps all pages with `<Navbar />` — don't add it again
- The `bg-noise` grain overlay is on the root layout — don't add it to the page
- Follow the same design system as the main page (same colors, fonts, animations)
- If the page needs its own sections, create them in `src/components/<PageName><SectionName>.tsx` to avoid naming conflicts with main page components
- Add a nav link in `src/components/Navbar.tsx` if the page should be top-level navigable

## Confirm before building

State: the route path, what sections it will contain, and whether it needs any new data in `content.ts`. Get confirmation before writing any code.
