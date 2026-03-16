import type { Map as MapLibreMap } from "maplibre-gl"

export interface Viewport {
  longitude: number
  latitude: number
  zoom: number
  bearing?: number
  pitch?: number
}

export interface MapState {
  viewport: Viewport
  isReady: boolean
}

/** Mutable ref to the MapLibre GL JS instance. Stored in Zustand as a stable non-reactive value. */
export type MapRef = { current: MapLibreMap | null }
