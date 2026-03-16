"use client"

import type { RegionMap, TooltipState } from "../types"

interface Props {
  tooltip: TooltipState
  regions: RegionMap
}

export default function RegionTooltip({ tooltip, regions }: Props) {
  if (!tooltip.visible || !tooltip.regionId) return null
  const reg = regions[tooltip.regionId]
  if (!reg) return null

  return (
    <div
      className="pointer-events-none absolute z-30 w-52 rounded-xl border border-border bg-background/96 p-3 shadow-lg backdrop-blur"
      style={{ left: tooltip.x, top: tooltip.y }}
    >
      <div className="mb-1.5 flex items-center gap-2">
        <span
          className="h-2.5 w-2.5 shrink-0 rounded-sm"
          style={{ background: reg.color }}
        />
        <span className="text-sm leading-tight font-semibold">{reg.name}</span>
      </div>
      <div className="mb-2 text-xs text-muted-foreground">{reg.cont}</div>
      <div className="grid grid-cols-2 gap-2 text-xs">
        <div>
          <div className="text-muted-foreground">Population</div>
          <div className="font-semibold text-foreground">{reg.pop}</div>
        </div>
        <div>
          <div className="text-muted-foreground">% of world</div>
          <div className="font-semibold text-foreground">{reg.pct}%</div>
        </div>
      </div>
      <div className="mt-2 border-t border-border pt-2 text-xs text-muted-foreground/70">
        Click for full details
      </div>
    </div>
  )
}
