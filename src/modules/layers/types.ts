export type EncodingType = "choropleth" | "bubble" | "categorical"

export interface ChoroplethEncoding {
  type: "choropleth"
  field: string
  colorScale: string[]
  domain?: [number, number]
}

export interface BubbleEncoding {
  type: "bubble"
  field: string
  radiusRange: [number, number]
  domain?: [number, number]
}

export interface CategoricalEncoding {
  type: "categorical"
  field: string
  colorMap: Record<string, string>
}

export type LayerEncoding =
  | ChoroplethEncoding
  | BubbleEncoding
  | CategoricalEncoding

export interface Layer {
  id: string
  label: string
  /** References a data source registered in the data module. */
  sourceId: string
  visible: boolean
  encoding: LayerEncoding
}
