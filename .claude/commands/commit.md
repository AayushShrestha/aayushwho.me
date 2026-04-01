Make an atomic git commit for the current staged/unstaged changes. Follow this process precisely:

## Step 1 — Understand the changes

Run these in parallel:
- `git diff HEAD` to see all unstaged + staged changes
- `git status` to see which files are affected

## Step 2 — Determine the commit scope

Atomic commits mean ONE logical change per commit. If the diff contains multiple unrelated changes, stage only the files that belong to one logical unit and note that remaining changes need separate commits.

Logical groupings for this project:
- A single component edit → stage that component file only
- Content data update (content.ts) → stage content.ts and nothing else
- Style/theme changes (globals.css) → stage globals.css
- Config changes → stage config file(s) only
- Multiple related files for one feature (e.g., new component + page.tsx import) → stage together

## Step 3 — Write the commit message

Use **Conventional Commits** format:

```
type(scope): short description (max 72 chars)
```

**Types:**
- `feat` — new feature or section
- `fix` — bug fix
- `style` — visual/CSS changes with no logic change
- `content` — updates to text, data, images (content.ts, copy changes)
- `refactor` — code restructuring without behavior change
- `chore` — config, deps, tooling

**Scope** = the section or file affected, e.g.: `hero`, `tours`, `merch`, `navbar`, `content`, `globals`, `layout`

**Good examples:**
```
feat(tours): add sold-out badge to past shows
fix(showcase): prevent video thumbnail from breaking on mobile
style(hero): increase heading size on large screens
content(tours): add April shows at Comedy Garden
chore: update framer-motion to v12
```

**Rules:**
- Lowercase, imperative mood ("add" not "added" or "adds")
- No period at the end
- No vague messages like "updates" or "changes"
- Describe WHAT changed and WHY if not obvious

## Step 4 — Stage and commit

Stage only the files for this logical unit, then commit. Use a heredoc for the message:

```bash
git add <specific files>
git commit -m "$(cat <<'EOF'
type(scope): description
EOF
)"
```

## Step 5 — Report

Tell the user:
- What was committed
- If there are remaining unstaged changes that need separate commits
