"use client"

import { useMemo, memo } from "react"
import * as d3 from "d3"
import { useGeoData } from "@/features/world-map/hooks/useGeoData"
import { FRAMEWORKS } from "@/features/world-map/data/frameworks"
import type { FrameworkKey } from "../types"

const projection = d3.geoNaturalEarth1().scale(153).translate([480, 250])
const pathGen = d3.geoPath().projection(projection)
const SPHERE = { type: "Sphere" } as Parameters<typeof pathGen>[0]
const GRATICULE = d3.geoGraticule()()

interface Props {
  framework: FrameworkKey
  selectedRegion: string | null
  onRegionSelect: (regionId: string) => void
  onCountryHover: (e: React.MouseEvent, regionId: string) => void
  onCountryLeave: () => void
}

const RegionMapSVG = memo(function RegionMapSVG({
  framework,
  selectedRegion,
  onRegionSelect,
  onCountryHover,
  onCountryLeave,
}: Props) {
  const { geo, loading, error } = useGeoData()

  const spherePath = useMemo(() => pathGen(SPHERE) ?? "", [])
  const gratPath = useMemo(() => pathGen(GRATICULE) ?? "", [])
  const bordersPath = useMemo(() => (geo ? (pathGen(geo.borders) ?? "") : ""), [geo])

  const { c2r, regions, pins } = FRAMEWORKS[framework]

  if (loading) {
    return (
      <div className="flex items-center justify-center" style={{ height: 300 }}>
        <div className="flex flex-col items-center gap-3">
          <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin" />
          <span className="text-sm text-muted-foreground">Loading world map…</span>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex items-center justify-center" style={{ height: 300 }}>
        <span className="text-sm text-muted-foreground">
          Could not load map data. Check your connection.
        </span>
      </div>
    )
  }

  if (!geo) return null

  return (
    <svg width="100%" viewBox="0 0 960 500" style={{ display: "block" }}>
      <path d={spherePath} fill="#D4E8F5" stroke="#A8CCE0" strokeWidth="0.7" />
      <path d={gratPath} fill="none" stroke="rgba(0,0,0,0.05)" strokeWidth="0.5" />

      {geo.countries.map((f, i) => {
        const rid = c2r[+(f.id ?? 0)]
        const reg = rid ? regions[rid] : undefined
        const d = pathGen(f)
        if (!d) return null
        const isSel = selectedRegion === rid

        return (
          <path
            key={f.id != null ? String(f.id) : `country-${i}`}
            d={d}
            fill={reg ? reg.color : "#D8D4CC"}
            opacity={isSel ? 1 : reg ? 0.78 : 0.4}
            stroke={isSel ? "rgba(255,255,255,0.9)" : "none"}
            strokeWidth={isSel ? 1 : 0}
            style={{ cursor: reg ? "pointer" : "default", transition: "opacity 0.12s" }}
            onMouseEnter={e => reg && onCountryHover(e, rid)}
            onMouseMove={e => reg && onCountryHover(e, rid)}
            onMouseLeave={() => onCountryLeave()}
            onClick={() => reg && onRegionSelect(rid)}
          />
        )
      })}

      <path d={bordersPath} fill="none" stroke="rgba(255,255,255,0.55)" strokeWidth="0.4" />

      {pins.map(pin => {
        const reg = regions[pin.id]
        if (!reg || reg.labelSkip) return null
        const pos = projection([pin.lon, pin.lat])
        if (!pos) return null

        return (
          <g key={pin.id} style={{ pointerEvents: "none" }}>
            <text
              x={pos[0]}
              y={pos[1]}
              textAnchor="middle"
              fontSize={10}
              fontWeight={700}
              fill="white"
              stroke="rgba(0,0,0,0.6)"
              strokeWidth={2.5}
              style={{ paintOrder: "stroke" }}
              fontFamily="sans-serif"
            >
              {reg.short}
            </text>
            <text
              x={pos[0]}
              y={pos[1] + 13}
              textAnchor="middle"
              fontSize={9}
              fontWeight={400}
              fill="white"
              stroke="rgba(0,0,0,0.55)"
              strokeWidth={2}
              style={{ paintOrder: "stroke" }}
              fontFamily="sans-serif"
            >
              {reg.pop}
            </text>
          </g>
        )
      })}
    </svg>
  )
})

export default RegionMapSVG
