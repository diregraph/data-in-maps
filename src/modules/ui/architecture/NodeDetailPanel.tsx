"use client";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import type { ArchNode } from "./types";

interface NodeDetailPanelProps {
  node: ArchNode | null;
  onClose: () => void;
}

export function NodeDetailPanel({ node, onClose }: NodeDetailPanelProps) {
  return (
    <Sheet open={node !== null} onOpenChange={(open) => !open && onClose()}>
      <SheetContent side="right">
        <SheetHeader>
          <SheetTitle>{node?.label ?? ""}</SheetTitle>
          <SheetDescription>Node details coming soon.</SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
}
