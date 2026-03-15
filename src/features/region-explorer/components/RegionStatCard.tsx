"use client"

interface Props {
  label: string
  value: string
  accent?: string
}

export default function RegionStatCard({ label, value, accent }: Props) {
  return (
    <div className="rounded-xl border bg-muted/30 px-4 py-3">
      <div className="text-xs font-medium text-muted-foreground mb-1 uppercase tracking-wide">
        {label}
      </div>
      <div
        className="text-2xl font-bold tracking-tight"
        style={accent ? { color: accent } : {}}
      >
        {value}
      </div>
    </div>
  )
}
