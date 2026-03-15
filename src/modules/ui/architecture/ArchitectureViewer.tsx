"use client"

import { useRouter } from "next/navigation"
import { ArchitectureDiagram } from "./ArchitectureDiagram"
import type { NodeId } from "./nodes"

interface ArchitectureViewerProps {
  activeNodeId?: NodeId
}

export function ArchitectureViewer({ activeNodeId }: ArchitectureViewerProps) {
  const router = useRouter()

  function handleNodeClick(id: NodeId) {
    router.push(`/architecture/${id}`)
  }

  return (
    <div className="h-[75vh] w-full">
      <ArchitectureDiagram onNodeClick={handleNodeClick} activeNodeId={activeNodeId} />
    </div>
  )
}
