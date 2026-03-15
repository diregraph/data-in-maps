"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { FRAMEWORKS } from "@/features/world-map/data/frameworks"
import RegionStatCard from "./RegionStatCard"
import type { FrameworkKey } from "../types"

interface Props {
  framework: FrameworkKey
  regionId: string
  onBack: () => void
}

export default function RegionDetail({ framework, regionId, onBack }: Props) {
  const fw = FRAMEWORKS[framework]
  const reg = fw.regions[regionId]
  if (!reg) return null

  return (
    <div className="space-y-4">
      <div className="flex items-start gap-3">
        <div
          className="w-4 h-4 rounded mt-1.5 shrink-0 ring-1 ring-black/10"
          style={{ background: reg.color }}
        />
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-lg leading-tight">{reg.name}</h3>
          <p className="text-xs text-muted-foreground mt-0.5">{fw.label}</p>
        </div>
        <Badge variant="outline" className="shrink-0 text-xs">
          {reg.cont}
        </Badge>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <RegionStatCard label="Population" value={reg.pop} accent={reg.color} />
        <RegionStatCard label="Share of world" value={`${reg.pct}%`} />
      </div>

      <p className="text-sm text-muted-foreground leading-relaxed">{reg.desc}</p>

      <Separator />

      <div>
        <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-1.5">
          Key countries
        </p>
        <p className="text-sm text-foreground leading-relaxed">{reg.ctr}</p>
      </div>

      <Button
        variant="ghost"
        size="sm"
        className="-ml-2 text-muted-foreground hover:text-foreground"
        onClick={onBack}
      >
        ← Back to all regions
      </Button>
    </div>
  )
}
