import type { Feature, MultiLineString } from "geojson"

export interface RegionData {
  name: string
  short: string
  cont: string
  color: string
  pop: string
  pct: string
  desc: string
  ctr: string
  labelSkip?: true
}

export type RegionMap = Record<string, RegionData>

/** ISO numeric country code → region ID */
export type CountryToRegion = Record<number, string>

export interface RegionPin {
  id: string
  lon: number
  lat: number
}

export interface Framework {
  label: string
  desc: string
  regions: RegionMap
  c2r: CountryToRegion
  pins: RegionPin[]
}

export type FrameworkKey =
  | "world"
  | "un"
  | "cultural"
  | "geopolitical"
  | "historical"
  | "religious"
  | "ecological"
export type FrameworkMap = Record<FrameworkKey, Framework>

export interface TooltipState {
  visible: boolean
  x: number
  y: number
  regionId: string | null
}

export interface GeoData {
  countries: Feature[]
  borders: MultiLineString
}

export interface ComingSoonFramework {
  value: string
  label: string
}
