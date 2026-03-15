import type { FrameworkMap, ComingSoonFramework } from "../types"
import { WORLD_REGIONS, WORLD_C2R, WORLD_PINS } from "./world-regions"
import { UN_REGIONS, UN_C2R, UN_PINS } from "./un-regions"

export const FRAMEWORKS: FrameworkMap = {
  world: { label:"World Regions", desc:"10 broad world regions",      regions:WORLD_REGIONS, c2r:WORLD_C2R, pins:WORLD_PINS },
  un:    { label:"UN Geoscheme",  desc:"22 UN official sub-regions",  regions:UN_REGIONS,    c2r:UN_C2R,    pins:UN_PINS    },
}

export const COMING_SOON: ComingSoonFramework[] = [
  { value:"cultural",    label:"Cultural / Civilizational" },
  { value:"geopolitical",label:"Political / Geopolitical" },
  { value:"historical",  label:"Historical / Colonial" },
  { value:"religious",   label:"Religious / Linguistic" },
  { value:"ecological",  label:"Environmental / Ecological" },
]

export const CONTINENT_ORDER: string[] = ["Africa","Americas","Asia","Europe","Oceania"]
