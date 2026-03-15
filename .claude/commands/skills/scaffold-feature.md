---
description: Scaffolds a new feature in Data In Maps following the Next.js App Router feature structure
allowed-tools: Read, Write, Edit, Bash, Grep, Glob
---

**Feature domain name:** $ARGUMENTS

## Philosophy
Features are self-contained vertical slices in `src/features/[name]/`. Everything related to a domain lives together. Pages and layouts import only from the feature's barrel file (`index.ts`) — never deep into its internals.

## Steps

### 1. Confirm the feature name
The feature domain to scaffold is: **$ARGUMENTS** (e.g., `countries`, `search`, `compare`). Confirm with the user if not provided.

### 2. Create the directory structure
```
src/features/$ARGUMENTS/
  components/   ← Domain-specific UI components (PascalCase.tsx)
  hooks/        ← Custom React hooks (camelCase.ts)
  types/        ← TypeScript interfaces and types
  index.ts      ← Barrel export (the only public surface)
```

Create these directories and an `index.ts` stub:
```ts
// src/features/$ARGUMENTS/index.ts
// Barrel export — only expose what pages/layouts need
```

### 3. Implement a skeleton component
Create a placeholder component in `components/` that renders with a loading skeleton. This ensures the feature renders safely before real data is wired up.

### 4. Add types
Define the core TypeScript interfaces for this feature's data in `types/`.

### 5. Enforce the barrel rule
Remind the user: **pages and layouts must only import from `src/features/$ARGUMENTS/index.ts`**. Never import directly from subdirectories.

### 6. Verify
- No ESLint violations from the initial scaffolding (`npm run lint`)
- TypeScript compiles cleanly (`npm run build`)
- All new files follow naming conventions
