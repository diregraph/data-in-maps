import type { SourceSpecification, StyleSpecification } from "maplibre-gl"

export interface TileSourceConfig {
  style?: StyleSpecification
  rasterSource?: SourceSpecification
  attribution: string
}

export interface TileProvider {
  id: string
  isReady(): boolean
  getConfig(): TileSourceConfig
}
