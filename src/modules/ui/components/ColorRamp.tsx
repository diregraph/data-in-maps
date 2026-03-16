interface ColorRampProps {
  colors: string[]
}

/** Gradient swatch for choropleth scale preview. */
export function ColorRamp({ colors }: ColorRampProps) {
  const gradient = `linear-gradient(to right, ${colors.join(", ")})`
  return <div className="h-4 w-full rounded" style={{ background: gradient }} />
}
