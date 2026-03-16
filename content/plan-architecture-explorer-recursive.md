# Plan: Recursive Architecture Explorer

**Status:** Ready to implement
**Branch convention:** `feature/DIM-[id]-recursive-architecture-explorer`
**Commit scope:** `architecture`

---

## Goal

Refactor the architecture explorer from a single hardcoded diagram into a recursively composable system. Each node in the tree can optionally have its own sub-diagram. Navigating into a node shows that node's diagram (if it has one) or the nearest ancestor's diagram with the node highlighted. Depth is unbounded — adding a new diagram at any level requires touching exactly four places and nothing else.

While building the infrastructure, fully implement two node pages:

- **`app-router`** — 15 sub-nodes, SVG at `content/architecture/app-router/app_router_structure.svg`
- **`tile-provider`** — 6 sub-nodes, SVG at `content/architecture/tile-provider/tile_provider_architecture.svg`

And one leaf-node page (notes only, no diagram):

- **`tile-provider/create-tile-provider`** — factory implementation notes

---

## Current state

```
src/modules/ui/architecture/
├── ArchitectureDiagram.tsx   # top-level SVG JSX, typed with NodeId
├── ArchitectureViewer.tsx    # 'use client' — useRouter + useTransition + spinner
├── ArchitecturePage.tsx      # server component — breadcrumb + viewer + notes
├── NodeContent.tsx           # server component — reads MDX from content/architecture/
├── nodes.ts                  # NodeId union, ArchNodeConfig, NODES record, getNodeBySlug
├── index.ts                  # barrel exports
├── ArchitectureNotes.tsx     # unused
├── NodeDetailPanel.tsx       # unused
└── types.ts                  # unused ArchNode interface

content/architecture/
├── notes.mdx                 # root notes — complete, do not touch
├── app-router/notes.mdx      # placeholder — replace
├── tile-provider/notes.mdx   # placeholder — replace
└── [others]/notes.mdx        # complete, do not touch

src/app/(marketing)/architecture/[[...slug]]/page.tsx
  # calls ArchitecturePage; generateMetadata uses getNodeBySlug
```

`ArchitectureViewer` currently hardcodes `ArchitectureDiagram` and navigates to
`/architecture/${id}`. It will be deleted and replaced by `DiagramViewer`.

`getNodeBySlug` already traverses `children` recursively — no changes needed there.

---

## Algorithm: `resolveViewer(slug)`

Walk the slug against the node tree. Track the **last** node that has a `viewerKey`.
That node's diagram is shown; the segment immediately after it is the active node.

```
slug = []
→ viewerKey='root', basePath='/architecture', activeNodeId=undefined

slug = ['ai']                         // ai has no viewerKey
→ viewerKey='root', basePath='/architecture', activeNodeId='ai'

slug = ['app-router']
→ viewerKey='app-router', basePath='/architecture/app-router', activeNodeId=undefined

slug = ['app-router', 'map-group']    // map-group has no viewerKey
→ viewerKey='app-router', basePath='/architecture/app-router', activeNodeId='map-group'

slug = ['tile-provider']
→ viewerKey='tile-provider', basePath='/architecture/tile-provider', activeNodeId=undefined

slug = ['tile-provider', 'create-tile-provider']   // leaf, no viewerKey
→ viewerKey='tile-provider', basePath='/architecture/tile-provider', activeNodeId='create-tile-provider'

// Future depth-3 example: if pmtiles-provider later gets viewerKey='tile-provider/pmtiles'
slug = ['tile-provider', 'pmtiles-provider', 'protocol-plugin']
→ viewerKey='tile-provider/pmtiles', basePath='/architecture/tile-provider/pmtiles-provider', activeNodeId='protocol-plugin'
```

TypeScript implementation of the algorithm:

```typescript
// Inside ArchitecturePage — server component, no 'use client'
import type { ArchNodeConfig } from "./nodes"
import { NODES } from "./nodes"

function resolveViewer(slug: string[]) {
  let viewerKey = "root"
  let basePath = "/architecture"
  let activeNodeId: string | undefined = slug[0] // default for root-level highlights

  let children: Record<string, ArchNodeConfig> = NODES

  for (let i = 0; i < slug.length; i++) {
    const segment = slug[i]
    const node = children[segment]
    if (!node) break

    if (node.viewerKey) {
      viewerKey = node.viewerKey
      basePath = "/architecture/" + slug.slice(0, i + 1).join("/")
      activeNodeId = slug[i + 1] // may be undefined
    }

    children = node.children ?? {}
  }

  return (
    <DiagramViewer
      viewerKey={viewerKey}
      basePath={basePath}
      activeNodeId={activeNodeId}
    />
  )
}
```

`ArchitecturePage` body becomes:

```tsx
export function ArchitecturePage({ slug }: { slug: string[] }) {
  return (
    <main className="min-h-screen bg-[#1a1916]">
      <nav
        aria-label="Breadcrumb" /* ... existing breadcrumb JSX unchanged ... */
      />
      {resolveViewer(slug)}
      <NodeContent slug={slug} />
    </main>
  )
}
```

The breadcrumb `nav` block is unchanged — copy it verbatim from the current file.

---

## File manifest

### Delete

- `src/modules/ui/architecture/ArchitectureViewer.tsx`

### Create

- `src/modules/ui/architecture/DiagramViewer.tsx`
- `src/modules/ui/architecture/app-router/AppRouterDiagram.tsx`
- `src/modules/ui/architecture/tile-provider/TileProviderDiagram.tsx`
- `content/architecture/tile-provider/create-tile-provider/notes.mdx`

### Modify

- `src/modules/ui/architecture/nodes.ts`
- `src/modules/ui/architecture/ArchitecturePage.tsx`
- `src/modules/ui/architecture/index.ts`
- `content/architecture/app-router/notes.mdx`
- `content/architecture/tile-provider/notes.mdx`

### Do not touch

- `src/modules/ui/architecture/ArchitectureDiagram.tsx`
- `src/modules/ui/architecture/NodeContent.tsx`
- `src/modules/ui/architecture/ArchitectureNotes.tsx` (unused, leave as-is)
- `src/modules/ui/architecture/NodeDetailPanel.tsx` (unused, leave as-is)
- `src/modules/ui/architecture/types.ts` (unused, leave as-is)
- `src/app/(marketing)/architecture/[[...slug]]/page.tsx`
- `content/architecture/notes.mdx`
- All other `content/architecture/*/notes.mdx` files

---

## Implementation specs

### 1. `src/modules/ui/architecture/nodes.ts`

Add `viewerKey?: string` to `ArchNodeConfig`.
Add `AppRouterNodeId` and `TileProviderNodeId` union types.
Populate `children` for `app-router` and `tile-provider` in `NODES`.
Use prompts from the SVG `onclick` attributes (listed below).

```typescript
export type NodeId =
  | "app-router"
  | "ai"
  | "data"
  | "layers"
  | "map"
  | "ui"
  | "export"
  | "claude-api"
  | "tile-provider"
  | "browser-storage"

export type AppRouterNodeId =
  | "layout"
  | "map-group"
  | "marketing-group"
  | "api"
  | "map-page"
  | "maps-id"
  | "marketing-page"
  | "gallery"
  | "ai-route"
  | "export-route"
  | "loading"
  | "error"
  | "not-found"
  | "opengraph-image"
  | "sitemap"

export type TileProviderNodeId =
  | "map-canvas"
  | "tile-provider-interface"
  | "pmtiles-provider"
  | "osm-provider"
  | "mapbox-provider"
  | "create-tile-provider"

export interface ArchNodeConfig {
  label: string
  prompt: string
  viewerKey?: string // ← NEW — present only if node has a sub-diagram
  children?: Record<string, ArchNodeConfig>
}
```

`NODES` entries to add/update (keep all other entries unchanged):

```typescript
"app-router": {
  label: "Next.js app router",
  prompt: "How should the Next.js App Router be set up for an open-source map platform? What pages, route groups, and API routes are needed?",
  viewerKey: "app-router",
  children: {
    layout: {
      label: "app/layout.tsx",
      prompt: "What goes in the root layout.tsx for the map platform? What providers wrap the app?",
    },
    "map-group": {
      label: "(map)",
      prompt: "What is the (map) route group responsible for in the map platform? What shared layout does it provide?",
    },
    "marketing-group": {
      label: "(marketing)",
      prompt: "What pages live in the (marketing) route group for the map platform? What is its layout?",
    },
    api: {
      label: "api/",
      prompt: "What is the api/ directory responsible for in the map platform app router?",
    },
    "map-page": {
      label: "(map)/page.tsx",
      prompt: "What does the main editor page look like at (map)/page.tsx? What components does it render?",
    },
    "maps-id": {
      label: "maps/[id]",
      prompt: "How should shared map routes like /maps/[id] work in the map platform? What does the dynamic route fetch?",
    },
    "marketing-page": {
      label: "(marketing)/page.tsx",
      prompt: "What does the landing page for the map platform look like? What sections should it have?",
    },
    gallery: {
      label: "gallery",
      prompt: "What example maps should the gallery page show? How is it structured?",
    },
    "ai-route": {
      label: "api/ai/",
      prompt: "Design the api/ai/route.ts endpoint for the map platform. What does the request body look like, and what does it return?",
    },
    "export-route": {
      label: "api/export/",
      prompt: "Design the api/export/route.ts endpoint. How does it handle PNG and SVG export server-side?",
    },
    loading: {
      label: "loading.tsx",
      prompt: "What should the loading.tsx fallback look like for the map route group?",
    },
    error: {
      label: "error.tsx",
      prompt: "What should error.tsx handle for the map platform route groups?",
    },
    "not-found": {
      label: "not-found.tsx",
      prompt: "What does the not-found.tsx page look like for the map platform?",
    },
    "opengraph-image": {
      label: "opengraph-image",
      prompt: "What metadata and Open Graph tags should be in app/opengraph-image.tsx for sharing map links?",
    },
    sitemap: {
      label: "sitemap.ts",
      prompt: "What should sitemap.ts generate for the map platform?",
    },
  },
},

"tile-provider": {
  label: "Tile provider",
  prompt: "How should tile provider support be architected for the map platform? How do we support PMTiles self-hosted, OSM, and optional Mapbox with a single clean interface?",
  viewerKey: "tile-provider",
  children: {
    "map-canvas": {
      label: "MapCanvas (consumer)",
      prompt: "How does the MapCanvas component consume the tile provider interface? Show me the React integration.",
    },
    "tile-provider-interface": {
      label: "TileProvider interface",
      prompt: "Show me the full TileProvider TypeScript interface for the map platform, including the TileSourceConfig type it returns.",
    },
    "pmtiles-provider": {
      label: "PMTilesProvider",
      prompt: "Show me the full PMTilesProvider implementation. How does it self-host tiles using the pmtiles protocol plugin for MapLibre?",
    },
    "osm-provider": {
      label: "OSMProvider",
      prompt: "Show me the OSMProvider implementation. What tile URL template and attribution string does it use?",
    },
    "mapbox-provider": {
      label: "MapboxProvider",
      prompt: "Show me the MapboxProvider implementation. How does it pull the API key from env and what style URLs does it support?",
    },
    "create-tile-provider": {
      label: "createTileProvider()",
      prompt: "Show me the createTileProvider factory function. How does it read NEXT_PUBLIC_TILE_PROVIDER and NEXT_PUBLIC_MAPBOX_TOKEN to pick the right provider?",
    },
  },
},
```

`getNodeBySlug` — **no changes needed**. The existing implementation already traverses `children` correctly.

---

### 2. `src/modules/ui/architecture/DiagramViewer.tsx`

Replaces `ArchitectureViewer.tsx`. Single `'use client'` component.
The `viewerKey` prop (a plain string) is safe to pass from a server component.
All diagram imports live here — this is the single registration point.

```typescript
"use client"

import { useState, useTransition } from "react"
import { useRouter } from "next/navigation"
import { ArchitectureDiagram } from "./ArchitectureDiagram"
import { AppRouterDiagram } from "./app-router/AppRouterDiagram"
import { TileProviderDiagram } from "./tile-provider/TileProviderDiagram"

// Boundary type — specific ID unions are enforced inside each diagram component.
// The cast below is intentional: the registry treats all diagrams generically.
type DiagramComponent = React.ComponentType<{
  onNodeClick: (id: string) => void
  activeNodeId?: string
  pendingNodeId?: string
}>

const DIAGRAMS: Record<string, DiagramComponent> = {
  root:            ArchitectureDiagram as unknown as DiagramComponent,
  "app-router":    AppRouterDiagram    as unknown as DiagramComponent,
  "tile-provider": TileProviderDiagram as unknown as DiagramComponent,
  // future: "tile-provider/pmtiles": PMTilesProviderDiagram as unknown as DiagramComponent,
}

interface DiagramViewerProps {
  viewerKey: string
  basePath: string
  activeNodeId?: string
}

export function DiagramViewer({ viewerKey, basePath, activeNodeId }: DiagramViewerProps) {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const [pendingNodeId, setPendingNodeId] = useState<string | null>(null)

  function handleNodeClick(id: string) {
    setPendingNodeId(id)
    startTransition(() => {
      router.push(`${basePath}/${id}`)
    })
  }

  const Diagram = DIAGRAMS[viewerKey] ?? DIAGRAMS.root

  return (
    <div className="h-[75vh] w-full">
      <Diagram
        onNodeClick={handleNodeClick}
        activeNodeId={activeNodeId}
        pendingNodeId={isPending ? (pendingNodeId ?? undefined) : undefined}
      />
    </div>
  )
}
```

---

### 3. `src/modules/ui/architecture/app-router/AppRouterDiagram.tsx`

Pattern: identical to `ArchitectureDiagram.tsx`. Study that file before writing this one.

- `"use client"`
- `NODE_BOUNDS: Record<AppRouterNodeId, { x: number; y: number; w: number; h: number }>`
- Props: `{ onNodeClick: (id: AppRouterNodeId) => void; activeNodeId?: AppRouterNodeId; pendingNodeId?: AppRouterNodeId }`
- Helper functions `hl(id)` and `groupOpacity(id, base)` — identical pattern to `ArchitectureDiagram`
- Spinner overlay — identical pattern, copy verbatim from `ArchitectureDiagram` (the `pendingNodeId && (() => { ... })()` block at the end)
- Background rect: `fill="#1a1916"`, full viewBox dimensions
- `viewBox="0 0 680 500"`
- `fontFamily` style on `<svg>`: `'"Anthropic Sans", -apple-system, "system-ui", "Segoe UI", sans-serif'`

**NODE_BOUNDS** (extracted from `content/architecture/app-router/app_router_structure.svg`):

```typescript
const NODE_BOUNDS: Record<
  AppRouterNodeId,
  { x: number; y: number; w: number; h: number }
> = {
  layout: { x: 240, y: 20, w: 200, h: 44 },
  "map-group": { x: 30, y: 104, w: 180, h: 56 },
  "marketing-group": { x: 250, y: 104, w: 180, h: 56 },
  api: { x: 470, y: 104, w: 180, h: 56 },
  "map-page": { x: 18, y: 200, w: 88, h: 44 },
  "maps-id": { x: 130, y: 200, w: 100, h: 44 },
  "marketing-page": { x: 238, y: 200, w: 88, h: 44 },
  gallery: { x: 350, y: 200, w: 100, h: 44 },
  "ai-route": { x: 456, y: 200, w: 92, h: 44 },
  "export-route": { x: 572, y: 200, w: 96, h: 44 },
  loading: { x: 28, y: 296, w: 110, h: 44 },
  error: { x: 154, y: 296, w: 110, h: 44 },
  "not-found": { x: 280, y: 296, w: 120, h: 44 },
  "opengraph-image": { x: 416, y: 296, w: 120, h: 44 },
  sitemap: { x: 552, y: 296, w: 110, h: 44 },
}
```

**Color palette** for the SVG nodes:

| Group                                                                         | fill             | stroke             | text (primary)     | text (secondary)   |
| ----------------------------------------------------------------------------- | ---------------- | ------------------ | ------------------ | ------------------ |
| `layout` (root)                                                               | `rgb(60,52,137)` | `rgb(175,169,236)` | `rgb(206,203,246)` | —                  |
| `map-group`, `map-page`, `maps-id` (canvas routes)                            | `rgb(8,80,65)`   | `rgb(93,202,165)`  | `rgb(159,225,203)` | `rgb(93,202,165)`  |
| `marketing-group`, `marketing-page`, `gallery` (public)                       | `rgb(68,68,65)`  | `rgb(180,178,169)` | `rgb(211,209,199)` | `rgb(180,178,169)` |
| `api`, `ai-route`, `export-route` (API routes)                                | `rgb(113,43,19)` | `rgb(240,153,123)` | `rgb(245,196,179)` | `rgb(240,153,123)` |
| `loading`, `error`, `not-found`, `opengraph-image`, `sitemap` (special files) | `rgb(12,68,124)` | `rgb(133,183,235)` | `rgb(181,212,244)` | `rgb(133,183,235)` |

**Connector arrows color**: `stroke="rgba(222,220,209,0.3)"` `strokeWidth={1}` for the branch lines.

**Structural layout** (translate directly from `content/architecture/app-router/app_router_structure.svg`):

```
Row 1 (y=20):   layout (centered at x=340)

Row 2 (y=104):  map-group | marketing-group | api
                  (x=30)     (x=250)          (x=470)

Row 3 (y=200):  map-page | maps-id | marketing-page | gallery | ai-route | export-route

Row 4 (y=296):  loading | error | not-found | opengraph-image | sitemap
                (labeled "special files — all route groups" at y=286)

Legend (y≈400):  4 color swatches with labels
```

Branch paths from `layout` down to row 2 (copy from SVG):

- `layout → map-group`: `M 340 64 L 340 84` then `M 340 84 L 120 84 L 120 104`
- `layout → marketing-group`: `M 340 84 L 340 104`
- `layout → api`: `M 340 84 L 560 84 L 560 104`

Branch paths from row 2 down to row 3 (copy from SVG):

- `map-group → map-page`: `M 120 160 L 120 180 L 60 180 L 60 200`
- `map-group → maps-id`: `M 120 180 L 180 180 L 180 200`
- `marketing-group → marketing-page`: `M 340 180 L 280 180 L 280 200`
- `marketing-group → gallery`: `M 340 180 L 400 180 L 400 200`
- `api → ai-route`: `M 560 180 L 500 180 L 500 200`
- `api → export-route`: `M 560 180 L 620 180 L 620 200`

Dashed divider line between row 3 and row 4: `x1=20 y1=270 x2=660 y2=270`, `strokeDasharray="4 4"`, `stroke="rgba(222,220,209,0.15)"`.

**`gallery` node**: has no `onClick` in the original SVG. Do **not** wire it to `onNodeClick`. Render as a static `<g>` (no cursor pointer).

All other non-gallery nodes in rows 1–4: `onClick={() => onNodeClick(id)}` with `style={{ cursor: "pointer" }}`.

The `hl(id)` helper adds `stroke="rgb(255,255,255)"` `strokeWidth={2}` when `activeNodeId === id`.

---

### 4. `src/modules/ui/architecture/tile-provider/TileProviderDiagram.tsx`

Same pattern as `AppRouterDiagram.tsx`.

- `viewBox="0 0 680 384.56"`
- All 6 nodes are clickable

**NODE_BOUNDS** (from `content/architecture/tile-provider/tile_provider_architecture.svg`):

```typescript
const NODE_BOUNDS: Record<
  TileProviderNodeId,
  { x: number; y: number; w: number; h: number }
> = {
  "map-canvas": { x: 220, y: 20, w: 240, h: 44 },
  "tile-provider-interface": { x: 170, y: 96, w: 340, h: 56 },
  "pmtiles-provider": { x: 28, y: 196, w: 184, h: 60 },
  "osm-provider": { x: 248, y: 196, w: 184, h: 60 },
  "mapbox-provider": { x: 468, y: 196, w: 184, h: 60 },
  "create-tile-provider": { x: 200, y: 290, w: 280, h: 56 },
}
```

**Color palette**:

| Node                               | fill             | stroke             | text (primary)     | text (secondary)   |
| ---------------------------------- | ---------------- | ------------------ | ------------------ | ------------------ |
| `map-canvas` (consumer)            | `rgb(60,52,137)` | `rgb(175,169,236)` | `rgb(206,203,246)` | —                  |
| `tile-provider-interface`          | `rgb(8,80,65)`   | `rgb(93,202,165)`  | `rgb(159,225,203)` | `rgb(93,202,165)`  |
| `pmtiles-provider`, `osm-provider` | `rgb(8,80,65)`   | `rgb(93,202,165)`  | `rgb(159,225,203)` | `rgb(93,202,165)`  |
| `mapbox-provider`                  | `rgb(99,56,6)`   | `rgb(239,159,39)`  | `rgb(250,199,117)` | `rgb(239,159,39)`  |
| `create-tile-provider` (factory)   | `rgb(68,68,65)`  | `rgb(180,178,169)` | `rgb(211,209,199)` | `rgb(180,178,169)` |

**Structural layout**:

```
Row 1 (y=20):   map-canvas (centered x=340)

Row 2 (y=96):   tile-provider-interface (centered x=340, taller: h=56)
                Sub-label: "getSource() · getStyleURL() · isReady()"

Row 3 (y=196):  pmtiles-provider | osm-provider | mapbox-provider
                Sub-labels: "self-hosted · zero API key" | "raster fallback · no key" | "optional · env-gated"

Row 4 (y=290):  create-tile-provider (centered x=340)
                Sub-label: "reads env → returns concrete provider"
```

Connector arrows (from SVG):

- `map-canvas → tile-provider-interface`: straight line `x1=340 y1=64 x2=340 y2=96`
- `tile-provider-interface → pmtiles-provider`: `M 340 152 L 340 176 L 120 176 L 120 196`
- `tile-provider-interface → osm-provider`: `M 340 176 L 340 196`
- `tile-provider-interface → mapbox-provider`: `M 340 176 L 560 176 L 560 196`
- All three providers → `create-tile-provider`:
  - `M 120 256 L 120 290 L 340 290`
  - `M 340 256 L 340 290`
  - `M 560 256 L 560 290 L 340 290`

All branch connectors: `stroke="rgba(222,220,209,0.3)"` `strokeWidth={1}`.

**Legend** (at y≈362):

- Green swatch + "default / OSS"
- Amber swatch + "optional (env-gated)"
- Gray swatch + "factory — single config point"

---

### 5. `src/modules/ui/architecture/ArchitecturePage.tsx`

Full replacement. The breadcrumb `<nav>` block is **identical** to the current file — copy it verbatim. Only the viewer slot changes.

```tsx
import Link from "next/link"

import { DiagramViewer } from "./DiagramViewer"
// ← replaces ArchitectureViewer
import { NodeContent } from "./NodeContent"
import { NODES, getNodeBySlug } from "./nodes"
import type { ArchNodeConfig, NodeId } from "./nodes"

interface ArchitecturePageProps {
  slug: string[]
}

function resolveViewer(slug: string[]) {
  let viewerKey = "root"
  let basePath = "/architecture"
  let activeNodeId: string | undefined = slug[0]

  let children: Record<string, ArchNodeConfig> = NODES

  for (let i = 0; i < slug.length; i++) {
    const segment = slug[i]
    const node = children[segment]
    if (!node) break

    if (node.viewerKey) {
      viewerKey = node.viewerKey
      basePath = "/architecture/" + slug.slice(0, i + 1).join("/")
      activeNodeId = slug[i + 1]
    }

    children = node.children ?? {}
  }

  return (
    <DiagramViewer
      viewerKey={viewerKey}
      basePath={basePath}
      activeNodeId={activeNodeId}
    />
  )
}

export function ArchitecturePage({ slug }: ArchitecturePageProps) {
  // activeNodeId used in breadcrumb only — keep existing logic
  const activeNodeId = slug.length > 0 ? (slug[0] as NodeId) : undefined

  return (
    <main className="min-h-screen bg-[#1a1916]">
      <nav
        aria-label="Breadcrumb"
        className="flex items-center gap-1.5 px-8 pt-6 pb-2 text-sm text-[rgb(156,154,146)]"
      >
        {/* Copy breadcrumb JSX verbatim from current ArchitecturePage.tsx */}
      </nav>

      {resolveViewer(slug)}

      <NodeContent slug={slug} />
    </main>
  )
}
```

> **Note:** The `activeNodeId` variable used at the top of `ArchitecturePage` is for the breadcrumb only (existing logic). `resolveViewer` computes its own `activeNodeId` independently via the walk algorithm — they serve different purposes and may differ at depth > 1.

---

### 6. `src/modules/ui/architecture/index.ts`

```typescript
export { ArchitectureDiagram } from "./ArchitectureDiagram"
export { ArchitectureNotes } from "./ArchitectureNotes"
export { ArchitecturePage } from "./ArchitecturePage"
export { DiagramViewer } from "./DiagramViewer" // ← new
export { NodeContent } from "./NodeContent"
export { NodeDetailPanel } from "./NodeDetailPanel"
export { NODES, getNodeBySlug } from "./nodes"
export type {
  NodeId,
  AppRouterNodeId,
  TileProviderNodeId,
  ArchNodeConfig,
} from "./nodes" // ← new types
export type { ArchNode } from "./types"
// ArchitectureViewer removed — deleted
```

---

### 7. `content/architecture/app-router/notes.mdx`

Replace the placeholder entirely:

````mdx
# Next.js App Router

## Route tree

```
app/
├── layout.tsx                    # Root — providers: Zustand, TanStack Query, theme
├── not-found.tsx
├── sitemap.ts                    # Generates /maps/[id] entries for public maps
├── opengraph-image.tsx           # Dynamic OG image for shared map links
│
├── (map)/                        # Route group — no URL segment
│   ├── layout.tsx                # Map shell: sidebar + canvas, no nav
│   ├── page.tsx                  # / → editor (the main product)
│   └── maps/
│       └── [id]/
│           ├── page.tsx          # /maps/abc → read-only shared view (SSR)
│           └── loading.tsx
│
├── (marketing)/                  # Route group — no URL segment
│   ├── layout.tsx                # Nav header + footer
│   ├── page.tsx                  # / landing  ← only shown when no session
│   ├── gallery/
│   │   └── page.tsx              # /gallery — curated example maps
│   ├── loading.tsx
│   └── error.tsx
│
└── api/
    ├── ai/
    │   └── route.ts              # POST — natural language → MapConfig
    └── export/
        └── route.ts              # POST — map state → PNG / SVG / embed URL
```

## Key decisions

**Two route groups, one URL namespace.** `(map)` and `(marketing)` share the same URL
space — `/` serves either the editor or the landing page depending on session state.
Route groups let each have its own `layout.tsx` with no shared chrome bleeding between
them.

**`/maps/[id]` is server-rendered.** The shared map view fetches the stored map config
server-side and renders a static snapshot. No client-side Zustand needed — keeps it fast
and crawlable. `generateMetadata` pulls the map title for link previews.

**API routes are the only place Claude and export logic run.** No Anthropic SDK usage in
client components, ever. Both routes are thin: validate input with Zod → call the service
→ stream or return JSON.

## API contracts

```ts
// POST /api/ai
// Body:    { prompt: string; context?: PartialMapConfig }
// Returns: ReadableStream<MapConfig>  (streamed JSON delta)

// POST /api/export
// Body:    { mapState: MapConfig; format: 'png' | 'svg' | 'embed' }
// Returns: Blob (png/svg) or { url: string } (embed)
```

## What to defer

Skip `/auth` entirely at launch. Use `localStorage` for map persistence. Add auth
(Clerk or NextAuth) only once saved maps need to survive across devices. The route group
structure makes it trivial to add an `(auth)/login` group later without touching
anything else.
````

---

### 8. `content/architecture/tile-provider/notes.mdx`

Replace the placeholder entirely:

````mdx
# Tile Provider

## Folder structure

```
modules/map/
└── tile-providers/
    ├── types.ts      # TileProvider interface + TileSourceConfig
    ├── pmtiles.ts
    ├── osm.ts
    ├── mapbox.ts
    └── factory.ts    # createTileProvider()
```

## The interface

```ts
// tile-providers/types.ts
import type { SourceSpecification, StyleSpecification } from "maplibre-gl"

export interface TileSourceConfig {
  style?: StyleSpecification // full style doc (PMTiles, Mapbox)
  rasterSource?: SourceSpecification // fallback for OSM raster
  attribution: string
}

export interface TileProvider {
  id: string
  isReady(): boolean // false if required env var is missing
  getConfig(): TileSourceConfig
}
```

## The three providers

```ts
// tile-providers/pmtiles.ts
import maplibregl from "maplibre-gl"
import { Protocol } from "pmtiles"

export class PMTilesProvider implements TileProvider {
  id = "pmtiles"

  static register() {
    const protocol = new Protocol()
    maplibregl.addProtocol("pmtiles", protocol.tile.bind(protocol))
  }

  isReady() {
    return true
  }

  getConfig(): TileSourceConfig {
    const url = process.env.NEXT_PUBLIC_PMTILES_URL ?? "/tiles/world.pmtiles"
    return {
      style: {
        version: 8,
        sources: { openmaptiles: { type: "vector", url: `pmtiles://${url}` } },
        layers: [],
      },
      attribution: "© OpenMapTiles © OpenStreetMap contributors",
    }
  }
}
```

```ts
// tile-providers/osm.ts
export class OSMProvider implements TileProvider {
  id = "osm"
  isReady() {
    return true
  }

  getConfig(): TileSourceConfig {
    return {
      rasterSource: {
        type: "raster",
        tiles: ["https://tile.openstreetmap.org/{z}/{x}/{y}.png"],
        tileSize: 256,
        maxzoom: 19,
      },
      attribution: "© OpenStreetMap contributors",
    }
  }
}
```

```ts
// tile-providers/mapbox.ts
export class MapboxProvider implements TileProvider {
  id = "mapbox"
  private token = process.env.NEXT_PUBLIC_MAPBOX_TOKEN

  isReady() {
    return !!this.token
  }

  getConfig(): TileSourceConfig {
    if (!this.token) throw new Error("NEXT_PUBLIC_MAPBOX_TOKEN not set")
    return {
      style: {
        version: 8,
        sources: {},
        layers: [],
        // @ts-expect-error — MapLibre accepts Mapbox style URLs via compat layer
        sprite: `mapbox://sprites/mapbox/streets-v12?access_token=${this.token}`,
        glyphs: `mapbox://fonts/mapbox/{fontstack}/{range}?access_token=${this.token}`,
      },
      attribution: "© Mapbox © OpenStreetMap contributors",
    }
  }
}
```

## Environment config

```bash
# .env.local
NEXT_PUBLIC_TILE_PROVIDER=pmtiles           # pmtiles | osm | mapbox
NEXT_PUBLIC_PMTILES_URL=/tiles/world.pmtiles
NEXT_PUBLIC_MAPBOX_TOKEN=                   # leave blank → OSM fallback
```

## Adding a new provider

Three steps: implement `TileProvider`, add it to the `PROVIDERS` map in `factory.ts`,
document the env var. Nothing else changes.
````

---

### 9. `content/architecture/tile-provider/create-tile-provider/notes.mdx`

New file — create the directory:

````mdx
# createTileProvider()

```ts
// modules/map/tile-providers/factory.ts
import { MapboxProvider } from "./mapbox"
import { OSMProvider } from "./osm"
import { PMTilesProvider } from "./pmtiles"
import type { TileProvider } from "./types"

const PROVIDERS: Record<string, TileProvider> = {
  pmtiles: new PMTilesProvider(),
  osm: new OSMProvider(),
  mapbox: new MapboxProvider(),
}

const DEFAULT_PROVIDER = "pmtiles"

export function createTileProvider(): TileProvider {
  const requested = process.env.NEXT_PUBLIC_TILE_PROVIDER ?? DEFAULT_PROVIDER
  const provider = PROVIDERS[requested]

  if (!provider) {
    console.warn(
      `[tiles] Unknown provider "${requested}". ` +
        `Valid options: ${Object.keys(PROVIDERS).join(", ")}. ` +
        `Falling back to ${DEFAULT_PROVIDER}.`,
    )
    return PROVIDERS[DEFAULT_PROVIDER]
  }

  if (!provider.isReady()) {
    console.warn(
      `[tiles] Provider "${requested}" is not ready ` +
        `(missing env vars). Falling back to OSM.`,
    )
    return PROVIDERS.osm
  }

  return provider
}
```

## Fallback chain

```
NEXT_PUBLIC_TILE_PROVIDER=mapbox
  → MapboxProvider.isReady()?
      token set?    → use Mapbox
      token missing → warn + fall back to OSM

NEXT_PUBLIC_TILE_PROVIDER not set  → PMTiles (default)
NEXT_PUBLIC_TILE_PROVIDER=unknown  → warn + PMTiles (default)
```

The `isReady()` check is where env-var reading actually lives — the factory
just delegates:

```ts
// mapbox.ts
isReady() { return !!process.env.NEXT_PUBLIC_MAPBOX_TOKEN }

// pmtiles.ts + osm.ts
isReady() { return true }
```

## Important: build-time env inlining

`process.env.NEXT_PUBLIC_*` is inlined at build time by Next.js.
`createTileProvider()` resolves to a concrete provider at startup —
there is no runtime env reading after the bundle is built. If you need
runtime switching (e.g. per-tenant tile sources), the factory must
accept an explicit argument instead of reading env directly.
````

---

## Implementation order

1. `nodes.ts` — foundation; everything else reads from it
2. `app-router/AppRouterDiagram.tsx` — standalone, no deps on new files
3. `tile-provider/TileProviderDiagram.tsx` — standalone
4. `DiagramViewer.tsx` — depends on both diagrams above
5. `ArchitecturePage.tsx` — depends on `DiagramViewer`
6. `index.ts` — update exports, remove `ArchitectureViewer`
7. Delete `ArchitectureViewer.tsx`
8. MDX content files — independent, do last
9. `npm run lint && npm run format` — fix any issues
10. Verify routes: `/architecture`, `/architecture/app-router`, `/architecture/app-router/map-group`, `/architecture/tile-provider`, `/architecture/tile-provider/create-tile-provider`

---

## Future node checklist

Use `/add-arch-node <node-path>` to run the automated workflow (see below).
If doing it manually, touch exactly these four things:

1. **Create** `src/modules/ui/architecture/[node-id]/[NodeId]Diagram.tsx`
   — JSX SVG, specific ID union type, `NODE_BOUNDS` record for spinner

2. **Register** in `DiagramViewer.DIAGRAMS`:
   `"[node-id]": [NodeId]Diagram as unknown as DiagramComponent`

3. **Add** `viewerKey: "[node-id]"` and `children: { ... }` to that node in `nodes.ts`

4. **Write** `content/architecture/[node-id]/notes.mdx`

SVG source files live alongside the notes they describe:
`content/architecture/[node-path]/[slug].svg`

`ArchitecturePage.tsx` requires **no changes**.
