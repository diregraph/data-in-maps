import { MapboxProvider } from "./mapbox"
import { OSMProvider } from "./osm"
import { PMTilesProvider } from "./pmtiles"
import type { TileProvider } from "./types"

const PROVIDERS: Record<string, TileProvider> = {
  osm: new OSMProvider(),
  pmtiles: new PMTilesProvider(),
  mapbox: new MapboxProvider(),
}

/**
 * Returns the active TileProvider based on the NEXT_PUBLIC_TILE_PROVIDER env var.
 * Falls back to OSM if the configured provider is not ready (e.g. missing API key).
 */
export function createTileProvider(): TileProvider {
  const key = process.env.NEXT_PUBLIC_TILE_PROVIDER ?? "osm"
  const provider = PROVIDERS[key] ?? PROVIDERS.osm
  return provider.isReady() ? provider : PROVIDERS.osm
}
