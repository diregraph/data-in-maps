import { useMapStore } from "../store"

/** Returns the raw MapLibre GL JS instance, or null if the map has not loaded yet. */
export function useMapInstance() {
  return useMapStore((s) => s.mapRef.current)
}
