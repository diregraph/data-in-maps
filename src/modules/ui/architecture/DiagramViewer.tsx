"use client"

import { useState, useTransition } from "react"
import { useRouter } from "next/navigation"
import { ArchitectureDiagram } from "./ArchitectureDiagram"
import { AppRouterDiagram } from "./app-router/AppRouterDiagram"
import { LayersDiagram } from "./layers/LayersDiagram"
import { MapDiagram } from "./map/MapDiagram"
import { TileProviderDiagram } from "./tile-provider/TileProviderDiagram"

// Boundary type — specific ID unions are enforced inside each diagram component.
// The cast below is intentional: the registry treats all diagrams generically.
type DiagramComponent = React.ComponentType<{
  onNodeClick: (id: string) => void
  activeNodeId?: string
  pendingNodeId?: string
}>

const DIAGRAMS: Record<string, DiagramComponent> = {
  root:            ArchitectureDiagram as unknown as DiagramComponent,
  "app-router":    AppRouterDiagram    as unknown as DiagramComponent,
  layers:          LayersDiagram       as unknown as DiagramComponent,
  map:             MapDiagram          as unknown as DiagramComponent,
  "tile-provider": TileProviderDiagram as unknown as DiagramComponent,
}

interface DiagramViewerProps {
  viewerKey: string
  basePath: string
  activeNodeId?: string
}

export function DiagramViewer({ viewerKey, basePath, activeNodeId }: DiagramViewerProps) {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const [pendingNodeId, setPendingNodeId] = useState<string | null>(null)

  function handleNodeClick(id: string) {
    setPendingNodeId(id)
    startTransition(() => {
      router.push(`${basePath}/${id}`)
    })
  }

  const Diagram = DIAGRAMS[viewerKey] ?? DIAGRAMS.root

  return (
    <div className="h-[75vh] w-full">
      <Diagram
        onNodeClick={handleNodeClick}
        activeNodeId={activeNodeId}
        pendingNodeId={isPending ? (pendingNodeId ?? undefined) : undefined}
      />
    </div>
  )
}
