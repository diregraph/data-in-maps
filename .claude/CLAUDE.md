# Project: Data In Maps

An interactive world map application with country/region data — public-facing, free, SEO/AEO-optimized.

## Stack

- Framework: Next.js (App Router), TypeScript, TailwindCSS 4, shadcn/ui
- Map: MapLibre GL JS via `react-map-gl`
- State: Zustand
- Deployment: Vercel

## Common Commands

> Always run from within `/data-in-maps/`. Never from a parent directory.

- Dev server: `npm run dev`
- Build: `npm run build`
- Lint: `npm run lint`
- Format: `npm run format`

---

## Rules

### Always Propose a Plan First

Before implementing anything, formulate a plan and surface it to the user for explicit approval. Use Claude Code's built-in Plan Mode (`/plan`). Do this even if the user forgets to ask.

### Git Discipline

**Commit messages:** Strictly follow [Conventional Commits](https://www.conventionalcommits.org/).

- Format: `<type>(<scope>): <description>`
- Types: `feat`, `fix`, `docs`, `style`, `refactor`, `perf`, `test`, `chore`
- Scope: map to the domain changed (e.g., `map`, `countries`, `ui`, `seo`)
- Description: imperative, terse (e.g., `add country hover tooltip`, not `added tooltip`)

**Branching:** Feature branches merge directly into `main`. No `develop` branch.

- Features: `feature/DIM-[id]-[short-description]`
- Bug fixes: `fix/DIM-[id]-[short-description]`
- Chores: `chore/DIM-[id]-[short-description]`

**Constraints:**

- Never force push to `main`.
- Wait for a human to merge pull requests unless explicitly instructed otherwise.
- Always open a PR — direct pushes to `main` are not permitted.

### Engineering Discipline

- No `any` casting. Enforce strict TypeScript throughout.
- Keep domain concerns cohesive. Place code in `src/features/*` relative to its scope. Shared code goes in `src/components/`, `src/hooks/`, `src/lib/`.
- Naming conventions:
  - React components: `PascalCase.tsx`
  - React hooks: `camelCase.ts` (e.g., `useCountryData.ts`)
  - Utilities: `kebab-case.ts`
- Expose barrel exports via `index.ts` from each feature. Pages and layouts must only import from barrel files, never deep into a feature's directory.
- Map components (`src/components/map/`) are client-side only — always use `"use client"` or a dynamic import wrapper to avoid SSR errors with MapLibre GL JS.
- Always implement loading and error states for components relying on async data.
- Run `npm run lint` and `npm run format` before every commit.
- Use canonical Tailwind v3/v4 class names. Never use deprecated aliases:
  - `shrink-0` not `flex-shrink-0`
  - `shrink` not `flex-shrink`
  - `grow` not `flex-grow`
  - `grow-0` not `flex-grow-0`
  - `text-ellipsis` not `overflow-ellipsis`

### Safety & Data Integrity

**Git:**

- NEVER `git push --force` or `git reset --hard` on `main`.
- NEVER delete remote branches without human approval.

**Files:**

- Only modify files directly required to complete the objective. Mass refactoring requires human review.
- NEVER delete files outside `/Users/diregraph/Downloads/dev/data-in-maps/`.

**Secrets:**

- NEVER expose `.env` contents in responses, logs, or documents.
- NEVER commit `.env` files. Verify `.gitignore` protections before adding new secret scopes.

**Packages:**

- NEVER install global packages without explicit human approval.
- All installs must be local (`dependencies` or `devDependencies`).

---

## Frontend Guidelines

Apply these UI/UX principles from **The Eight Golden Rules of Interface Design** (Shneiderman) to all UI work:

1. **Strive for consistency.** Uniform color, layout, typography, and interaction patterns throughout. Exceptions (e.g., destructive confirmations) must be limited and comprehensible.
2. **Seek universal usability.** Design for diverse users — novices, experts, different screen sizes, accessibility needs.
3. **Offer informative feedback.** Every action must produce visible feedback. Minor actions → modest response. Major actions → clear, substantial feedback.
4. **Design for closure.** Group sequences with a clear start, middle, and end. Confirm completion explicitly (e.g., a toast after saving).
5. **Prevent errors.** Disable inapplicable controls. Validate input early. If an error occurs, provide specific, constructive recovery instructions.
6. **Permit easy reversal.** Make actions undoable wherever possible. Reduces anxiety and encourages exploration.
7. **Keep users in control.** Avoid surprises or unexpected state changes. Experienced users expect the interface to respond predictably to their actions.
8. **Reduce memory load.** Don't require users to remember information across screens. Keep context visible and forms compact.
