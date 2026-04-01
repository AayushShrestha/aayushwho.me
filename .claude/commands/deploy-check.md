Run pre-deployment checks for aayushwho.me. Use this before pushing to production.

## Step 1 — Lint

```bash
npm run lint
```

Fix any errors before continuing. Warnings are acceptable but note them.

## Step 2 — Production build

```bash
npm run build
```

This is the most important check — Next.js 16 has stricter build requirements than earlier versions. Common issues to watch for:
- Server Component / Client Component boundary violations (`'use client'` missing where needed)
- Missing `alt` attributes on `<Image>` components
- Invalid `href` props
- Type errors that TypeScript catches at build time but not in dev
- Unresolved dynamic imports

If the build fails, read the full error output carefully. Fix the root cause — do not suppress errors with type casts or `// @ts-ignore`.

## Step 3 — Report

Output a summary:
- **Lint:** pass / N warnings / N errors
- **Build:** pass / fail
- If fail: exact error and the file:line where it occurred
- **Ready to deploy:** yes / no

## Step 4 — If all checks pass

Remind the user to verify on the deployed preview before merging to main.
