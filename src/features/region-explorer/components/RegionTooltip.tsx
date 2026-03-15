"use client"

import type { TooltipState, RegionMap } from "../types"

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
      className="absolute pointer-events-none z-30 bg-background/96 backdrop-blur border border-border rounded-xl shadow-lg p-3 w-52"
      style={{ left: tooltip.x, top: tooltip.y }}
    >
      <div className="flex items-center gap-2 mb-1.5">
        <span
          className="w-2.5 h-2.5 rounded-sm shrink-0"
          style={{ background: reg.color }}
        />
        <span className="font-semibold text-sm leading-tight">{reg.name}</span>
      </div>
      <div className="text-xs text-muted-foreground mb-2">{reg.cont}</div>
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
      <div className="mt-2 pt-2 border-t border-border text-xs text-muted-foreground/70">
        Click for full details
      </div>
    </div>
  )
}
