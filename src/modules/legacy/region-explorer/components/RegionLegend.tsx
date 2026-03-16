"use client"

import {
  CONTINENT_ORDER,
  FRAMEWORKS,
} from "@/modules/legacy/world-map/data/frameworks"

import type { FrameworkKey, RegionData } from "../types"

/** Frameworks that group legend items by their `cont` field */
const GROUPED_FRAMEWORKS = new Set<FrameworkKey>(["un"])

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
      className={`group flex items-center gap-2 rounded-lg px-2.5 py-2 text-left transition-all ${isSelected ? "bg-accent" : "hover:bg-muted"}`}
    >
      <span
        className="h-2.5 w-2.5 shrink-0 rounded-sm transition-transform group-hover:scale-110"
        style={{ background: region.color }}
      />
      <span
        className={`truncate text-sm transition-colors ${
          isSelected
            ? "font-medium text-foreground"
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

export default function RegionLegend({
  framework,
  onSelect,
  selectedRegion,
}: RegionLegendProps) {
  const { regions } = FRAMEWORKS[framework]

  if (GROUPED_FRAMEWORKS.has(framework)) {
    const groups: Record<string, [string, RegionData][]> = {}
    CONTINENT_ORDER.forEach((c) => {
      groups[c] = []
    })
    Object.entries(regions).forEach(([id, r]) => {
      if (groups[r.cont]) groups[r.cont].push([id, r])
    })

    return (
      <div className="space-y-5">
        {CONTINENT_ORDER.map((cont) =>
          groups[cont].length === 0 ? null : (
            <div key={cont}>
              <div className="mb-2 flex items-center gap-2">
                <span className="text-xs font-semibold tracking-widest text-muted-foreground uppercase">
                  {cont}
                </span>
                <div className="h-px flex-1 bg-border" />
              </div>
              <div className="grid grid-cols-2 gap-0.5 md:grid-cols-3">
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
          ),
        )}
      </div>
    )
  }

  return (
    <div className="grid grid-cols-2 gap-0.5 md:grid-cols-3 lg:grid-cols-5">
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
