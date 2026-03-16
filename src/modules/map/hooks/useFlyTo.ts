import { useMapStore } from "../store"

/** Returns the flyTo action for programmatic camera animation. */
export function useFlyTo() {
  return useMapStore((s) => s.flyTo)
}
