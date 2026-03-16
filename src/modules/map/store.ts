import type { FlyToOptions, Map as MapLibreMap } from "maplibre-gl"
import { create } from "zustand"

import type { MapRef, Viewport } from "./types"

interface MapStore {
  viewport: Viewport
  isReady: boolean
  /** Stable non-reactive ref to the MapLibre GL JS instance. Set once on map load. */
  mapRef: MapRef
  selectedCountrySlug: string | null

  setViewport: (v: Viewport) => void
  setReady: (ready: boolean) => void
  /**
   * Set the raw MapLibre instance. Called from MapCanvas on the `load` event.
   * Not an action that triggers re-renders — mutates the ref directly.
   */
  setMapInstance: (map: MapLibreMap | null) => void
  /** Programmatic camera animation. Does not write viewport state mid-flight. */
  flyTo: (target: Partial<Viewport>, options?: FlyToOptions) => void
  setSelectedCountry: (slug: string | null) => void
}

export const useMapStore = create<MapStore>((set, get) => ({
  viewport: { longitude: 0, latitude: 20, zoom: 2 },
  isReady: false,
  mapRef: { current: null },
  selectedCountrySlug: null,

  setViewport: (viewport) => set({ viewport }),
  setReady: (isReady) => set({ isReady }),
  setMapInstance: (map) => {
    // Mutate the ref directly — avoids a Zustand re-render cycle for a non-reactive value
    get().mapRef.current = map
  },
  flyTo: (target, options) => {
    const map = get().mapRef.current
    if (!map) return
    map.flyTo({
      center: [target.longitude ?? 0, target.latitude ?? 0],
      zoom: target.zoom,
      bearing: target.bearing,
      pitch: target.pitch,
      ...options,
    })
  },
  setSelectedCountry: (selectedCountrySlug) => set({ selectedCountrySlug }),
}))
