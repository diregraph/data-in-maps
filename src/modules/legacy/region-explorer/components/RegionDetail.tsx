"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { FRAMEWORKS } from "@/modules/legacy/world-map/data/frameworks"

import type { FrameworkKey } from "../types"
import RegionStatCard from "./RegionStatCard"

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
          className="mt-1.5 h-4 w-4 shrink-0 rounded ring-1 ring-black/10"
          style={{ background: reg.color }}
        />
        <div className="min-w-0 flex-1">
          <h3 className="text-lg leading-tight font-semibold">{reg.name}</h3>
          <p className="mt-0.5 text-xs text-muted-foreground">{fw.label}</p>
        </div>
        <Badge variant="outline" className="shrink-0 text-xs">
          {reg.cont}
        </Badge>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <RegionStatCard label="Population" value={reg.pop} accent={reg.color} />
        <RegionStatCard label="Share of world" value={`${reg.pct}%`} />
      </div>

      <p className="text-sm leading-relaxed text-muted-foreground">
        {reg.desc}
      </p>

      <Separator />

      <div>
        <p className="mb-1.5 text-xs font-semibold tracking-wide text-muted-foreground uppercase">
          Key countries
        </p>
        <p className="text-sm leading-relaxed text-foreground">{reg.ctr}</p>
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
