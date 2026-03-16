import { create } from "zustand"

import type { Layer } from "./types"

interface LayerStore {
  /** Ordered stack: index 0 renders first (bottom), last index renders on top. */
  layers: Layer[]
  activeLayerId: string | null

  addLayer: (layer: Layer) => void
  removeLayer: (id: string) => void
  updateLayer: (id: string, patch: Partial<Layer>) => void
  reorderLayers: (from: number, to: number) => void
  setActiveLayer: (id: string | null) => void
}

export const useLayerStore = create<LayerStore>((set) => ({
  layers: [],
  activeLayerId: null,

  addLayer: (layer) => set((s) => ({ layers: [...s.layers, layer] })),
  removeLayer: (id) =>
    set((s) => ({ layers: s.layers.filter((l) => l.id !== id) })),
  updateLayer: (id, patch) =>
    set((s) => ({
      layers: s.layers.map((l) => (l.id === id ? { ...l, ...patch } : l)),
    })),
  reorderLayers: (from, to) =>
    set((s) => {
      const layers = [...s.layers]
      const [item] = layers.splice(from, 1)
      layers.splice(to, 0, item)
      return { layers }
    }),
  setActiveLayer: (activeLayerId) => set({ activeLayerId }),
}))
