"use client"

import dynamic from "next/dynamic"

const RegionExplorer = dynamic(
  () => import("@/features/region-explorer").then(m => m.RegionExplorer),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-screen w-full items-center justify-center text-sm text-muted-foreground">
        Loading map…
      </div>
    ),
  }
)

export default function RegionExplorerLoader() {
  return <RegionExplorer />
}
