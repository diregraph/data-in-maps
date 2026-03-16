import type { TileProvider, TileSourceConfig } from "./types"

export class OSMProvider implements TileProvider {
  id = "osm"

  isReady() {
    return true
  }

  getConfig(): TileSourceConfig {
    return {
      rasterSource: {
        type: "raster",
        tiles: ["https://tile.openstreetmap.org/{z}/{x}/{y}.png"],
        tileSize: 256,
        maxzoom: 19,
      },
      attribution: "© OpenStreetMap contributors",
    }
  }
}
