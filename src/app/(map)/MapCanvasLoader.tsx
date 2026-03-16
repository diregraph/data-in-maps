"use client"

import dynamic from "next/dynamic"

const MapCanvas = dynamic(
  () => import("@/modules/map").then((m) => m.MapCanvas),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-screen w-full items-center justify-center bg-zinc-100 text-sm text-zinc-500">
        Loading map…
      </div>
    ),
  },
)

export function MapCanvasLoader() {
  return <MapCanvas />
}
