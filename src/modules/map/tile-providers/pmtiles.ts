import type { TileProvider, TileSourceConfig } from "./types"

export class PMTilesProvider implements TileProvider {
  id = "pmtiles"

  isReady() {
    return true
  }

  getConfig(): TileSourceConfig {
    const url = process.env.NEXT_PUBLIC_PMTILES_URL ?? "/tiles/world.pmtiles"
    return {
      style: {
        version: 8,
        sources: {
          openmaptiles: { type: "vector", url: `pmtiles://${url}` },
        },
        layers: [],
        glyphs: "",
        sprite: "",
      },
      attribution: "© OpenMapTiles © OpenStreetMap contributors",
    }
  }
}
