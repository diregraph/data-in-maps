import type { ComingSoonFramework, FrameworkMap } from "../types"
import {
  CULTURAL_C2R,
  CULTURAL_PINS,
  CULTURAL_REGIONS,
} from "./cultural-regions"
import {
  ECOLOGICAL_C2R,
  ECOLOGICAL_PINS,
  ECOLOGICAL_REGIONS,
} from "./ecological-regions"
import {
  GEOPOLITICAL_C2R,
  GEOPOLITICAL_PINS,
  GEOPOLITICAL_REGIONS,
} from "./geopolitical-regions"
import {
  HISTORICAL_C2R,
  HISTORICAL_PINS,
  HISTORICAL_REGIONS,
} from "./historical-regions"
import {
  RELIGIOUS_C2R,
  RELIGIOUS_PINS,
  RELIGIOUS_REGIONS,
} from "./religious-regions"
import { UN_C2R, UN_PINS, UN_REGIONS } from "./un-regions"
import { WORLD_C2R, WORLD_PINS, WORLD_REGIONS } from "./world-regions"

export const FRAMEWORKS: FrameworkMap = {
  world: {
    label: "World Regions",
    desc: "10 broad world regions",
    regions: WORLD_REGIONS,
    c2r: WORLD_C2R,
    pins: WORLD_PINS,
  },
  un: {
    label: "UN Geoscheme",
    desc: "22 UN official sub-regions",
    regions: UN_REGIONS,
    c2r: UN_C2R,
    pins: UN_PINS,
  },
  cultural: {
    label: "Cultural / Civilizational",
    desc: "9 civilizations (Huntington)",
    regions: CULTURAL_REGIONS,
    c2r: CULTURAL_C2R,
    pins: CULTURAL_PINS,
  },
  geopolitical: {
    label: "Political / Geopolitical",
    desc: "6 geopolitical blocs",
    regions: GEOPOLITICAL_REGIONS,
    c2r: GEOPOLITICAL_C2R,
    pins: GEOPOLITICAL_PINS,
  },
  historical: {
    label: "Historical / Colonial",
    desc: "Colonial empires & sovereignty",
    regions: HISTORICAL_REGIONS,
    c2r: HISTORICAL_C2R,
    pins: HISTORICAL_PINS,
  },
  religious: {
    label: "Religious / Linguistic",
    desc: "Dominant religion by country",
    regions: RELIGIOUS_REGIONS,
    c2r: RELIGIOUS_C2R,
    pins: RELIGIOUS_PINS,
  },
  ecological: {
    label: "Environmental / Ecological",
    desc: "Köppen climate classification",
    regions: ECOLOGICAL_REGIONS,
    c2r: ECOLOGICAL_C2R,
    pins: ECOLOGICAL_PINS,
  },
}

export const COMING_SOON: ComingSoonFramework[] = []

export const CONTINENT_ORDER: string[] = [
  "Africa",
  "Americas",
  "Asia",
  "Europe",
  "Oceania",
]

/** Frameworks shown as tabs in the primary selector */
export const TAB_FRAMEWORKS: Array<keyof FrameworkMap> = ["world", "un"]

/** Frameworks shown in the "More frameworks" select */
export const SELECT_FRAMEWORKS: Array<keyof FrameworkMap> = [
  "cultural",
  "geopolitical",
  "historical",
  "religious",
  "ecological",
]
