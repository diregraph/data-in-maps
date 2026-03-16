---
description: Reviews a Pull Request following Google's Engineering Practices for Code Review
allowed-tools: Read, Bash
---

**PR number or diff reference:** $ARGUMENTS

## Review Goals

Approve changes that improve overall code health, even if imperfect. Provide constructive mentorship. Avoid nitpicking style unless it violates ESLint/Prettier rules. Look for what's right first.

## Focus Areas

### Design

- Is the code well-designed and appropriate for this project?
- Are map components correctly isolated as client-side only?
- Are feature modules cohesive and correctly placed in `src/features/` vs `src/components/`?
- Are barrel exports the only point of entry for cross-feature imports?

### Functionality

- Does the code behave as the author intended?
- Are edge cases handled — empty data, failed fetches, loading states?
- Are there any memory leaks (e.g., map event listeners not cleaned up)?

### Complexity

- Is the code as simple as it can be while remaining correct?
- Would a future developer understand it without needing to ask questions?

### Tests

- Are there tests where meaningful behavior can be verified?
- Do tests cover edge cases, not just the happy path?

### Naming

- Are names clear, specific, and following project conventions?
  - `PascalCase.tsx` for components, `camelCase.ts` for hooks, `kebab-case.ts` for utilities.

### Comments

- Do comments explain _why_, not _what_?
- Are novel patterns or non-obvious decisions documented inline?

## Action Protocol

1. **Get the diff:**
   ```bash
   gh pr diff $ARGUMENTS
   ```
   Fall back to `git diff main...HEAD` if no PR number is provided.
2. **Review** against the areas above.
3. **Format feedback** constructively. For each issue, include a suggested fix in a code block.
4. **Conclude** clearly: approve with suggestions, or request changes before approval.
