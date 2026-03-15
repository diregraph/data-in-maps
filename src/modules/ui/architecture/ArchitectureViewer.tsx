"use client"

import { useState, useTransition } from "react"
import { useRouter } from "next/navigation"
import { ArchitectureDiagram } from "./ArchitectureDiagram"
import type { NodeId } from "./nodes"

interface ArchitectureViewerProps {
  activeNodeId?: NodeId
}

export function ArchitectureViewer({ activeNodeId }: ArchitectureViewerProps) {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const [pendingNodeId, setPendingNodeId] = useState<NodeId | null>(null)
  function handleNodeClick(id: NodeId) {
    setPendingNodeId(id)
    startTransition(() => {
      router.push(`/architecture/${id}`)
    })
  }

  return (
    <div className="h-[75vh] w-full">
      <ArchitectureDiagram
        onNodeClick={handleNodeClick}
        activeNodeId={activeNodeId}
        pendingNodeId={isPending ? (pendingNodeId ?? undefined) : undefined}
      />
    </div>
  )
}
