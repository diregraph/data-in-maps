"use client"

import { useState, useRef, useCallback } from "react"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ScrollArea } from "@/components/ui/scroll-area"
import { FRAMEWORKS, COMING_SOON } from "@/features/world-map/data/frameworks"
import RegionMapSVG from "./RegionMapSVG"
import RegionTooltip from "./RegionTooltip"
import RegionLegend from "./RegionLegend"
import RegionDetail from "./RegionDetail"
import type { FrameworkKey, TooltipState } from "../types"

export default function RegionExplorer() {
  const [framework, setFramework] = useState<FrameworkKey>("world")
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null)
  const [tooltip, setTooltip] = useState<TooltipState>({
    visible: false,
    x: 0,
    y: 0,
    regionId: null,
  })
  const wrapperRef = useRef<HTMLDivElement>(null)

  const handleCountryHover = useCallback((e: React.MouseEvent, rid: string) => {
    const rect = wrapperRef.current?.getBoundingClientRect()
    if (!rect) return
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const tx = x + 16 + 208 > rect.width ? x - 216 : x + 16
    setTooltip({ visible: true, x: tx, y: Math.max(8, y - 60), regionId: rid })
  }, [])

  const handleCountryLeave = useCallback(() => {
    setTooltip(t => ({ ...t, visible: false }))
  }, [])

  const handleRegionSelect = useCallback((rid: string) => {
    setSelectedRegion(prev => (prev === rid ? null : rid))
    setTooltip(t => ({ ...t, visible: false }))
  }, [])

  const handleFrameworkChange = useCallback((fw: string) => {
    setFramework(fw as FrameworkKey)
    setSelectedRegion(null)
    setTooltip({ visible: false, x: 0, y: 0, regionId: null })
  }, [])

  const currentRegions = FRAMEWORKS[framework].regions
  const regionCount = Object.keys(currentRegions).length

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-5xl mx-auto px-4 py-6 space-y-4">

        {/* Header */}
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">World Map</h1>
            <p className="text-sm text-muted-foreground mt-0.5">Regional frameworks explorer</p>
          </div>
          <div className="flex items-center gap-2 mt-1">
            <Badge variant="secondary" className="text-xs font-medium">
              {regionCount} regions
            </Badge>
            <Badge variant="outline" className="text-xs text-muted-foreground">
              v2
            </Badge>
          </div>
        </div>

        {/* Framework Selector */}
        <div className="flex flex-wrap items-center gap-3">
          <Tabs value={framework} onValueChange={handleFrameworkChange}>
            <TabsList className="h-9">
              {Object.entries(FRAMEWORKS).map(([key, fw]) => (
                <TabsTrigger key={key} value={key} className="text-sm px-4 font-medium">
                  {fw.label}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>

          <Select onValueChange={() => {}}>
            <SelectTrigger className="w-60 h-9 text-sm text-muted-foreground">
              <SelectValue placeholder="More frameworks" />
            </SelectTrigger>
            <SelectContent>
              {COMING_SOON.map(f => (
                <SelectItem key={f.value} value={f.value} disabled className="py-2">
                  <div className="flex items-center gap-2 w-full">
                    <span className="text-muted-foreground">{f.label}</span>
                    <Badge variant="secondary" className="text-xs ml-auto">
                      Soon
                    </Badge>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <p className="text-xs text-muted-foreground hidden sm:block ml-auto italic">
            {FRAMEWORKS[framework].desc}
          </p>
        </div>

        {/* Map Card */}
        <Card className="overflow-hidden shadow-md">
          <CardContent className="p-0">
            <div ref={wrapperRef} className="relative">
              <RegionMapSVG
                framework={framework}
                selectedRegion={selectedRegion}
                onRegionSelect={handleRegionSelect}
                onCountryHover={handleCountryHover}
                onCountryLeave={handleCountryLeave}
              />
              <RegionTooltip tooltip={tooltip} regions={currentRegions} />
            </div>
          </CardContent>
        </Card>

        {/* Detail / Legend Panel */}
        <Card className="shadow-sm">
          <CardContent className="p-5">
            {selectedRegion ? (
              <RegionDetail
                framework={framework}
                regionId={selectedRegion}
                onBack={() => setSelectedRegion(null)}
              />
            ) : (
              <>
                <div className="flex items-center justify-between mb-4">
                  <p className="text-xs text-muted-foreground">
                    <span className="font-medium text-foreground">
                      {FRAMEWORKS[framework].label}
                    </span>
                    {" · "}Hover or click any country to explore
                  </p>
                  <span className="text-xs text-muted-foreground">{regionCount} regions</span>
                </div>
                <ScrollArea className="max-h-72 pr-1">
                  <RegionLegend
                    framework={framework}
                    onSelect={handleRegionSelect}
                    selectedRegion={selectedRegion}
                  />
                </ScrollArea>
              </>
            )}
          </CardContent>
        </Card>

      </div>
    </div>
  )
}
