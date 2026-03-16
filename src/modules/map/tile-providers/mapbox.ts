import type { TileProvider, TileSourceConfig } from "./types"

export class MapboxProvider implements TileProvider {
  id = "mapbox"
  private token = process.env.NEXT_PUBLIC_MAPBOX_TOKEN

  isReady() {
    return !!this.token
  }

  getConfig(): TileSourceConfig {
    if (!this.token) throw new Error("NEXT_PUBLIC_MAPBOX_TOKEN not set")
    return {
      style: {
        version: 8,
        sources: {},
        layers: [],
        glyphs: `mapbox://fonts/mapbox/{fontstack}/{range}?access_token=${this.token}`,
        sprite: `mapbox://sprites/mapbox/streets-v12?access_token=${this.token}`,
      },
      attribution: "© Mapbox © OpenStreetMap contributors",
    }
  }
}
