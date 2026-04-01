Review a specific section of aayushwho.me against the design vision. The user will name the section to review.

## What to review

Read the component file for the named section (e.g., `src/components/Tours.tsx`). Then evaluate it against these criteria:

### Design vision check
The site should feel like a **raw, grainy, high-ISO midnight club** — underground, exclusive, dark.

- **Colors:** Only club-black, club-gray, club-navy, club-red, club-red-dark, club-gray-light, club-blue. Flag any hardcoded hex values that bypass the theme.
- **Typography:** All headings must use `font-heading` (Anton, uppercase). Body uses the default serif. Flag any inline font overrides.
- **Spacing:** Sections should have `py-20` or more. Content should have `max-w-6xl mx-auto`. Flag cramped or overly wide layouts.
- **Animations:** Every entrance should use Framer Motion `whileInView` with `viewport={{ once: true }}`. Flag missing or janky animations.
- **Mobile:** Check for responsive classes (`sm:`, `md:`, `lg:`). Flag anything that will break on small screens.
- **Content hardcoding:** Flag any content (text, URLs, prices) that should live in `content.ts` but is hardcoded in the component.

### UX check
- Is the CTA (if any) clear and using `bg-club-red`?
- Does the section have a clear visual hierarchy?
- Is there sufficient contrast for readability?

## Output format

Report findings as:
- **Good:** things that are working well
- **Issues:** specific problems with file:line references
- **Suggestions:** optional improvements that align with the design vision

Only flag real issues — don't invent problems or suggest unnecessary changes.
