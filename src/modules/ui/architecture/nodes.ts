export type NodeId =
  | 'app-router'
  | 'ai'
  | 'data'
  | 'layers'
  | 'map'
  | 'ui'
  | 'export'
  | 'claude-api'
  | 'tile-provider'
  | 'browser-storage'

export interface ArchNodeConfig {
  label: string
  prompt: string
  children?: Record<string, ArchNodeConfig>
}

export const NODES: Record<NodeId, ArchNodeConfig> = {
  'app-router': {
    label: 'Next.js app router',
    prompt:
      'How should the Next.js App Router be set up for an open-source map platform? What pages, route groups, and API routes are needed?',
  },
  ai: {
    label: 'ai',
    prompt:
      'Design the ai module for the map platform. What should its folder structure look like, what does its index.ts expose, and how should it interact with Claude API server-side?',
  },
  data: {
    label: 'data',
    prompt:
      'Design the data module for the map platform. What parsers are needed, how should Zod validation work, and how does it validate AI-generated output before it reaches the map?',
  },
  layers: {
    label: 'layers',
    prompt:
      'Design the layers module for the map platform. How should layer state be managed with Zustand, and what visual encoding types should be supported initially?',
  },
  map: {
    label: 'map',
    prompt:
      'Design the map module for the map platform. How should MapLibre GL JS be wrapped, what belongs in store.ts, and how should viewport state be managed?',
  },
  ui: {
    label: 'ui',
    prompt:
      'Design the ui module (design system) for the map platform. What shared components are needed at launch, and how should theming work?',
  },
  export: {
    label: 'export',
    prompt:
      'Design the export module for the map platform. How should PNG, SVG, and embed link exports work? What does it need from the map and layers modules?',
  },
  'claude-api': {
    label: 'Claude API',
    prompt:
      'How should the Claude API integration be handled server-side in Next.js for the map platform? What prompt structure works best for generating map config from natural language?',
  },
  'tile-provider': {
    label: 'Tile provider',
    prompt:
      'How should tile provider support be architected for the map platform? How do we support PMTiles self-hosted, OSM, and optional Mapbox with a single clean interface?',
  },
  'browser-storage': {
    label: 'Browser storage',
    prompt:
      'What should be persisted in browser storage for the map platform? How should the storage wrapper in lib/storage.ts be designed?',
  },
}

/**
 * Traverse the node tree by slug segments.
 * Returns null if the slug is empty or any segment is not found.
 */
export function getNodeBySlug(slug: string[]): ArchNodeConfig | null {
  if (slug.length === 0) return null

  let children: Record<string, ArchNodeConfig> = NODES
  let node: ArchNodeConfig | null = null

  for (const segment of slug) {
    const found = children[segment]
    if (!found) return null
    node = found
    children = found.children ?? {}
  }

  return node
}
