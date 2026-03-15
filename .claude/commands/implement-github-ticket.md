---
description: Implements a GitHub ticket from start to finish following Data In Maps project structure and git discipline
allowed-tools: Read, Write, Edit, Bash, Grep, Glob
---

**Issue number:** $ARGUMENTS

When the user asks to implement a GitHub ticket, follow this workflow strictly.

## 1. Retrieve the Ticket
```bash
gh issue view $ARGUMENTS
```
Understand the full scope before touching any code.

## 2. Plan First
- Use Claude Code's Plan Mode (`/plan`) to formulate an implementation approach.
- Identify which features, components, hooks, or pages need to change.
- Wait for explicit user approval before proceeding.

## 3. Create a Feature Branch
Branch off `main`:
```bash
git checkout main
git pull origin main
git checkout -b feature/DIM-$ARGUMENTS-<short-description>
```
Use `fix/DIM-...` for bug fixes, `chore/DIM-...` for non-feature work.

## 4. Implement
- Use `/project:skills:scaffold-feature` if a new feature directory is needed.
- Follow the engineering discipline in `CLAUDE.md`:
  - Strict TypeScript — no `any`.
  - Map components must use `"use client"` or dynamic import wrappers.
  - Barrel exports only from `index.ts`.
  - Loading and error states for all async data.

## 5. Lint and Format
```bash
npm run format
npm run lint
```
Fix all violations before committing.

## 6. Commit
```bash
git add <files>
git commit -m "feat(scope): description"
```
Follow Conventional Commits. Scope maps to the domain changed (e.g., `map`, `countries`, `ui`).

## 7. Open a PR
```bash
gh pr create --assignee "@me" --title "<title>" --body "..."
```
- Self-review using `/project:skills:pr-review` before opening.
- Share the PR URL with the user. Wait for a human to merge.
