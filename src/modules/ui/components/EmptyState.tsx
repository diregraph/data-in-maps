import type { ComponentType, SVGProps } from "react"

interface EmptyStateProps {
  icon: ComponentType<SVGProps<SVGSVGElement>>
  title: string
  description?: string
}

/** Zero-data placeholder for LayerList and Gallery. */
export function EmptyState({
  icon: Icon,
  title,
  description,
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center gap-2 py-12 text-muted-foreground">
      <Icon className="h-8 w-8" />
      <p className="text-sm font-medium">{title}</p>
      {description && <p className="text-xs">{description}</p>}
    </div>
  )
}
