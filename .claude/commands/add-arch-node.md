---
description: Adds a new interactive architecture node — proposes plan, generates notes.mdx and optional SVG diagram, wires everything up
allowed-tools: Read, Write, Edit, Bash, Grep, Glob
---

**Node path:** $ARGUMENTS

A node path is a slash-separated route matching the architecture URL, e.g. `ai`, `map`, `tile-provider/pmtiles-provider`.

---

## Step 1 — Resolve the node

Read `src/modules/ui/architecture/nodes.ts`. Locate the node at `$ARGUMENTS` by walking the `NODES` tree along the slash-separated segments.

Extract:
- `label` — display name
- `prompt` — the design question this node answers
- Whether it already has `viewerKey` and `children` (already expanded — stop and tell the user)

Also check `content/architecture/$ARGUMENTS/` for any existing `notes.mdx` or `.svg` files.

---

## Step 2 — Assess and propose

Based on the node's `prompt`, decide whether it warrants an **interactive sub-diagram**. A diagram is appropriate when the node:
- Decomposes into 4 or more distinct sub-components, OR
- Has a clear data flow, dependency hierarchy, or layered structure that benefits from a visual

Present the following proposal to the user and **wait for explicit approval before proceeding**:

```
Node:    <label> (<node-path>)
Prompt:  <prompt>

Proposed sub-nodes:
  <id>: <label> — <one-line description>
  ...

Diagram: YES / NO — <one-sentence justification>

Files that will change:
  CREATE  content/architecture/<node-path>/notes.mdx
  [CREATE content/architecture/<node-path>/<slug>.svg]        ← if diagram
  [CREATE src/modules/ui/architecture/<node-id>/<NodeId>Diagram.tsx]  ← if diagram
  EDIT    src/modules/ui/architecture/nodes.ts
  [EDIT   src/modules/ui/architecture/DiagramViewer.tsx]      ← if diagram
```

If the user refines the sub-nodes or the diagram decision, update the proposal accordingly.

---

## Step 3 — Generate notes.mdx

Write `content/architecture/$ARGUMENTS/notes.mdx`.

The file should answer the node's `prompt` concisely and authoritatively. Structure:
- `# <label>` heading
- A short paragraph explaining the component's role
- Code-heavy sections: folder structure, key interfaces/types, implementation snippets
- A "Key decisions" section explaining *why* the design is the way it is
- Keep it scannable — engineers should get the full picture in 2 minutes

Tone: precise, opinionated, reference-quality. No filler prose.

---

## Step 4 — Generate SVG (if diagram approved)

Write the reference SVG to `content/architecture/$ARGUMENTS/<node-slug>.svg`.

The SVG must match the visual language of the existing diagrams:
- Background: `#1a1916`
- Font: `"Anthropic Sans", -apple-system, "system-ui", "Segoe UI", sans-serif`
- Node rects: `rx="8"`, `strokeWidth="0.5"`
- Branch connectors: `stroke="rgba(222,220,209,0.3)"` `strokeWidth="1"`
- Color palette (pick the semantically appropriate one):
  - Entry/root: fill `rgb(60,52,137)` stroke `rgb(175,169,236)` text `rgb(206,203,246)`
  - Pipeline/OSS: fill `rgb(8,80,65)` stroke `rgb(93,202,165)` text `rgb(159,225,203)`
  - Support/infra: fill `rgb(68,68,65)` stroke `rgb(180,178,169)` text `rgb(211,209,199)`
  - AI/external API: fill `rgb(113,43,19)` stroke `rgb(240,153,123)` text `rgb(245,196,179)`
  - Optional/env-gated: fill `rgb(99,56,6)` stroke `rgb(239,159,39)` text `rgb(250,199,117)`
  - Special files: fill `rgb(12,68,124)` stroke `rgb(133,183,235)` text `rgb(181,212,244)`

Lay nodes out in rows from top (entry point) to bottom (leaf/output). Include a legend.

---

## Step 5 — Create the diagram component (if diagram approved)

Read `src/modules/ui/architecture/ArchitectureDiagram.tsx` first — the new component must follow its exact pattern.

Create `src/modules/ui/architecture/<node-id>/<NodeId>Diagram.tsx`:

- `"use client"`
- Export type `<NodeId>NodeId` as a string union of the sub-node IDs
- `NODE_BOUNDS: Record<<NodeId>NodeId, { x; y; w; h }>` — extract coordinates from the SVG created in Step 4
- Props: `{ onNodeClick: (id: <NodeId>NodeId) => void; activeNodeId?: <NodeId>NodeId; pendingNodeId?: <NodeId>NodeId }`
- `hl(id)` helper — adds `stroke="rgb(255,255,255)" strokeWidth={2}` when active
- `groupOpacity(id, base)` helper — returns `{ cursor: "pointer", opacity: activeNodeId === id ? 1 : base }`
- Spinner overlay block — copy verbatim from `ArchitectureDiagram.tsx`
- `viewBox` matching the SVG dimensions
- Background rect `fill="#1a1916"`

---

## Step 6 — Wire up nodes.ts

Edit `src/modules/ui/architecture/nodes.ts`:

1. Add the `<NodeId>NodeId` union type (if diagram) — append after the existing union types
2. Add `viewerKey: "<node-id>"` and `children: { ... }` to the target node in `NODES`
   — one entry per proposed sub-node with `label` and `prompt`

---

## Step 7 — Register in DiagramViewer (if diagram)

Edit `src/modules/ui/architecture/DiagramViewer.tsx`:

1. Add import: `import { <NodeId>Diagram } from "./<node-id>/<NodeId>Diagram"`
2. Add entry to `DIAGRAMS`:
   `"<node-id>": <NodeId>Diagram as unknown as DiagramComponent,`

---

## Step 8 — Lint

```bash
npm run lint
```

Fix any violations before continuing.

---

## Step 9 — Summary

Output:

```
✓ content/architecture/<node-path>/notes.mdx
✓ content/architecture/<node-path>/<slug>.svg        (if diagram)
✓ src/modules/ui/architecture/<node-id>/<NodeId>Diagram.tsx  (if diagram)
✓ src/modules/ui/architecture/nodes.ts
✓ src/modules/ui/architecture/DiagramViewer.tsx      (if diagram)

Route: /architecture/<node-path>
```
