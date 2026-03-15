"use client"

import { FRAMEWORKS, CONTINENT_ORDER } from "@/features/world-map/data/frameworks"
import type { FrameworkKey, RegionData } from "../types"

interface LegendItemProps {
  id: string
  region: RegionData
  isSelected: boolean
  onSelect: (id: string) => void
}

function LegendItem({ id, region, isSelected, onSelect }: LegendItemProps) {
  return (
    <button
      onClick={() => onSelect(id)}
      className={`flex items-center gap-2 text-left px-2.5 py-2 rounded-lg transition-all group
        ${isSelected ? "bg-accent" : "hover:bg-muted"}`}
    >
      <span
        className="w-2.5 h-2.5 rounded-sm shrink-0 transition-transform group-hover:scale-110"
        style={{ background: region.color }}
      />
      <span
        className={`text-sm truncate transition-colors ${
          isSelected
            ? "text-foreground font-medium"
            : "text-muted-foreground group-hover:text-foreground"
        }`}
      >
        {region.name}
      </span>
    </button>
  )
}

interface RegionLegendProps {
  framework: FrameworkKey
  onSelect: (regionId: string) => void
  selectedRegion: string | null
}

export default function RegionLegend({ framework, onSelect, selectedRegion }: RegionLegendProps) {
  const { regions } = FRAMEWORKS[framework]

  if (framework === "un") {
    const groups: Record<string, [string, RegionData][]> = {}
    CONTINENT_ORDER.forEach(c => {
      groups[c] = []
    })
    Object.entries(regions).forEach(([id, r]) => {
      if (groups[r.cont]) groups[r.cont].push([id, r])
    })

    return (
      <div className="space-y-5">
        {CONTINENT_ORDER.map(cont =>
          groups[cont].length === 0 ? null : (
            <div key={cont}>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs font-semibold tracking-widest uppercase text-muted-foreground">
                  {cont}
                </span>
                <div className="flex-1 h-px bg-border" />
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-0.5">
                {groups[cont].map(([id, r]) => (
                  <LegendItem
                    key={id}
                    id={id}
                    region={r}
                    isSelected={selectedRegion === id}
                    onSelect={onSelect}
                  />
                ))}
              </div>
            </div>
          )
        )}
      </div>
    )
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-0.5">
      {Object.entries(regions).map(([id, r]) => (
        <LegendItem
          key={id}
          id={id}
          region={r}
          isSelected={selectedRegion === id}
          onSelect={onSelect}
        />
      ))}
    </div>
  )
}
