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

export type AppRouterNodeId =
  | 'layout'
  | 'map-group'
  | 'marketing-group'
  | 'api'
  | 'map-page'
  | 'maps-id'
  | 'marketing-page'
  | 'gallery'
  | 'ai-route'
  | 'export-route'
  | 'loading'
  | 'error'
  | 'not-found'
  | 'opengraph-image'
  | 'sitemap'

export type TileProviderNodeId =
  | 'map-canvas'
  | 'tile-provider-interface'
  | 'pmtiles-provider'
  | 'osm-provider'
  | 'mapbox-provider'
  | 'create-tile-provider'

export interface ArchNodeConfig {
  label: string
  prompt: string
  viewerKey?: string
  children?: Record<string, ArchNodeConfig>
}

export const NODES: Record<NodeId, ArchNodeConfig> = {
  'app-router': {
    label: 'Next.js app router',
    prompt:
      'How should the Next.js App Router be set up for an open-source map platform? What pages, route groups, and API routes are needed?',
    viewerKey: 'app-router',
    children: {
      layout: {
        label: 'app/layout.tsx',
        prompt: 'What goes in the root layout.tsx for the map platform? What providers wrap the app?',
      },
      'map-group': {
        label: '(map)',
        prompt: 'What is the (map) route group responsible for in the map platform? What shared layout does it provide?',
      },
      'marketing-group': {
        label: '(marketing)',
        prompt: 'What pages live in the (marketing) route group for the map platform? What is its layout?',
      },
      api: {
        label: 'api/',
        prompt: 'What is the api/ directory responsible for in the map platform app router?',
      },
      'map-page': {
        label: '(map)/page.tsx',
        prompt: 'What does the main editor page look like at (map)/page.tsx? What components does it render?',
      },
      'maps-id': {
        label: 'maps/[id]',
        prompt: 'How should shared map routes like /maps/[id] work in the map platform? What does the dynamic route fetch?',
      },
      'marketing-page': {
        label: '(marketing)/page.tsx',
        prompt: 'What does the landing page for the map platform look like? What sections should it have?',
      },
      gallery: {
        label: 'gallery',
        prompt: 'What example maps should the gallery page show? How is it structured?',
      },
      'ai-route': {
        label: 'api/ai/',
        prompt: 'Design the api/ai/route.ts endpoint for the map platform. What does the request body look like, and what does it return?',
      },
      'export-route': {
        label: 'api/export/',
        prompt: 'Design the api/export/route.ts endpoint. How does it handle PNG and SVG export server-side?',
      },
      loading: {
        label: 'loading.tsx',
        prompt: 'What should the loading.tsx fallback look like for the map route group?',
      },
      error: {
        label: 'error.tsx',
        prompt: 'What should error.tsx handle for the map platform route groups?',
      },
      'not-found': {
        label: 'not-found.tsx',
        prompt: 'What does the not-found.tsx page look like for the map platform?',
      },
      'opengraph-image': {
        label: 'opengraph-image',
        prompt: 'What metadata and Open Graph tags should be in app/opengraph-image.tsx for sharing map links?',
      },
      sitemap: {
        label: 'sitemap.ts',
        prompt: 'What should sitemap.ts generate for the map platform?',
      },
    },
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
    viewerKey: 'tile-provider',
    children: {
      'map-canvas': {
        label: 'MapCanvas (consumer)',
        prompt: 'How does the MapCanvas component consume the tile provider interface? Show me the React integration.',
      },
      'tile-provider-interface': {
        label: 'TileProvider interface',
        prompt: 'Show me the full TileProvider TypeScript interface for the map platform, including the TileSourceConfig type it returns.',
      },
      'pmtiles-provider': {
        label: 'PMTilesProvider',
        prompt: 'Show me the full PMTilesProvider implementation. How does it self-host tiles using the pmtiles protocol plugin for MapLibre?',
      },
      'osm-provider': {
        label: 'OSMProvider',
        prompt: 'Show me the OSMProvider implementation. What tile URL template and attribution string does it use?',
      },
      'mapbox-provider': {
        label: 'MapboxProvider',
        prompt: 'Show me the MapboxProvider implementation. How does it pull the API key from env and what style URLs does it support?',
      },
      'create-tile-provider': {
        label: 'createTileProvider()',
        prompt: 'Show me the createTileProvider factory function. How does it read NEXT_PUBLIC_TILE_PROVIDER and NEXT_PUBLIC_MAPBOX_TOKEN to pick the right provider?',
      },
    },
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
