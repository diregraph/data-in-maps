"use client"

import type { TileProviderNodeId } from "../nodes"

const NODE_BOUNDS: Record<TileProviderNodeId, { x: number; y: number; w: number; h: number }> = {
  "map-canvas":              { x: 220, y: 20,  w: 240, h: 44 },
  "tile-provider-interface": { x: 170, y: 96,  w: 340, h: 56 },
  "pmtiles-provider":        { x: 28,  y: 196, w: 184, h: 60 },
  "osm-provider":            { x: 248, y: 196, w: 184, h: 60 },
  "mapbox-provider":         { x: 468, y: 196, w: 184, h: 60 },
  "create-tile-provider":    { x: 200, y: 290, w: 280, h: 56 },
}

interface TileProviderDiagramProps {
  onNodeClick: (id: TileProviderNodeId) => void
  activeNodeId?: TileProviderNodeId
  pendingNodeId?: TileProviderNodeId
}

export function TileProviderDiagram({ onNodeClick, activeNodeId, pendingNodeId }: TileProviderDiagramProps) {
  function hl(id: TileProviderNodeId): React.SVGProps<SVGRectElement> {
    return activeNodeId === id
      ? { stroke: "rgb(255,255,255)", strokeWidth: 2 }
      : {}
  }

  function groupOpacity(id: TileProviderNodeId, base: number): React.CSSProperties {
    return { cursor: "pointer", opacity: activeNodeId === id ? 1 : base }
  }

  const connectorProps = {
    fill: "none",
    stroke: "rgba(222,220,209,0.3)",
    strokeWidth: 1,
  }

  return (
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 680 384.56"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Tile provider architecture diagram"
      style={{
        fontFamily:
          '"Anthropic Sans", -apple-system, "system-ui", "Segoe UI", sans-serif',
      }}
    >
      {/* Background */}
      <rect x="0" y="0" width="680" height="384.56" fill="#1a1916" />

      {/* ── Row 1: map-canvas ── */}
      <g onClick={() => onNodeClick("map-canvas")} style={groupOpacity("map-canvas", 1)}>
        <rect
          x="220" y="20" width="240" height="44" rx="8"
          fill="rgb(60,52,137)" stroke="rgb(175,169,236)" strokeWidth="0.5"
          {...hl("map-canvas")}
        />
        <text x="340" y="42" textAnchor="middle" dominantBaseline="central"
          fill="rgb(206,203,246)" fontSize="14" fontWeight="500">
          MapCanvas (consumer)
        </text>
      </g>

      {/* ── Connector: map-canvas → tile-provider-interface ── */}
      <line x1="340" y1="64" x2="340" y2="96" {...connectorProps} />

      {/* ── Row 2: tile-provider-interface ── */}
      <g onClick={() => onNodeClick("tile-provider-interface")} style={groupOpacity("tile-provider-interface", 1)}>
        <rect
          x="170" y="96" width="340" height="56" rx="8"
          fill="rgb(8,80,65)" stroke="rgb(93,202,165)" strokeWidth="0.5"
          {...hl("tile-provider-interface")}
        />
        <text x="340" y="116" textAnchor="middle" dominantBaseline="central"
          fill="rgb(159,225,203)" fontSize="14" fontWeight="500">
          TileProvider interface
        </text>
        <text x="340" y="138" textAnchor="middle" dominantBaseline="central"
          fill="rgb(93,202,165)" fontSize="12">
          getSource() · getStyleURL() · isReady()
        </text>
      </g>

      {/* ── Branch lines: tile-provider-interface → row 3 ── */}
      {/* → pmtiles-provider (includes stem from y=152 to y=176) */}
      <path d="M 340 152 L 340 176 L 120 176 L 120 196" {...connectorProps} />
      {/* → osm-provider */}
      <path d="M 340 176 L 340 196" {...connectorProps} />
      {/* → mapbox-provider */}
      <path d="M 340 176 L 560 176 L 560 196" {...connectorProps} />

      {/* ── Row 3: providers ── */}
      <g onClick={() => onNodeClick("pmtiles-provider")} style={groupOpacity("pmtiles-provider", 1)}>
        <rect
          x="28" y="196" width="184" height="60" rx="8"
          fill="rgb(8,80,65)" stroke="rgb(93,202,165)" strokeWidth="0.5"
          {...hl("pmtiles-provider")}
        />
        <text x="120" y="216" textAnchor="middle" dominantBaseline="central"
          fill="rgb(159,225,203)" fontSize="14" fontWeight="500">
          PMTilesProvider
        </text>
        <text x="120" y="238" textAnchor="middle" dominantBaseline="central"
          fill="rgb(93,202,165)" fontSize="11">
          self-hosted · zero API key
        </text>
      </g>

      <g onClick={() => onNodeClick("osm-provider")} style={groupOpacity("osm-provider", 1)}>
        <rect
          x="248" y="196" width="184" height="60" rx="8"
          fill="rgb(8,80,65)" stroke="rgb(93,202,165)" strokeWidth="0.5"
          {...hl("osm-provider")}
        />
        <text x="340" y="216" textAnchor="middle" dominantBaseline="central"
          fill="rgb(159,225,203)" fontSize="14" fontWeight="500">
          OSMProvider
        </text>
        <text x="340" y="238" textAnchor="middle" dominantBaseline="central"
          fill="rgb(93,202,165)" fontSize="11">
          raster fallback · no key
        </text>
      </g>

      <g onClick={() => onNodeClick("mapbox-provider")} style={groupOpacity("mapbox-provider", 1)}>
        <rect
          x="468" y="196" width="184" height="60" rx="8"
          fill="rgb(99,56,6)" stroke="rgb(239,159,39)" strokeWidth="0.5"
          {...hl("mapbox-provider")}
        />
        <text x="560" y="216" textAnchor="middle" dominantBaseline="central"
          fill="rgb(250,199,117)" fontSize="14" fontWeight="500">
          MapboxProvider
        </text>
        <text x="560" y="238" textAnchor="middle" dominantBaseline="central"
          fill="rgb(239,159,39)" fontSize="11">
          optional · env-gated
        </text>
      </g>

      {/* ── Branch lines: row 3 → create-tile-provider ── */}
      <path d="M 120 256 L 120 290 L 340 290" {...connectorProps} />
      <path d="M 340 256 L 340 290" {...connectorProps} />
      <path d="M 560 256 L 560 290 L 340 290" {...connectorProps} />

      {/* ── Row 4: create-tile-provider ── */}
      <g onClick={() => onNodeClick("create-tile-provider")} style={groupOpacity("create-tile-provider", 1)}>
        <rect
          x="200" y="290" width="280" height="56" rx="8"
          fill="rgb(68,68,65)" stroke="rgb(180,178,169)" strokeWidth="0.5"
          {...hl("create-tile-provider")}
        />
        <text x="340" y="310" textAnchor="middle" dominantBaseline="central"
          fill="rgb(211,209,199)" fontSize="14" fontWeight="500">
          createTileProvider()
        </text>
        <text x="340" y="332" textAnchor="middle" dominantBaseline="central"
          fill="rgb(180,178,169)" fontSize="12">
          reads env → returns concrete provider
        </text>
      </g>

      {/* ── Legend ── */}
      <rect x="28"  y="362" width="10" height="10" rx="2" fill="rgb(8,80,65)" />
      <text x="44"  y="367" dominantBaseline="central" fill="rgb(194,192,182)" fontSize="12">default / OSS</text>

      <rect x="180" y="362" width="10" height="10" rx="2" fill="rgb(99,56,6)" />
      <text x="196" y="367" dominantBaseline="central" fill="rgb(194,192,182)" fontSize="12">optional (env-gated)</text>

      <rect x="360" y="362" width="10" height="10" rx="2" fill="rgb(68,68,65)" />
      <text x="376" y="367" dominantBaseline="central" fill="rgb(194,192,182)" fontSize="12">factory — single config point</text>

      {/* ── Spinner overlay on pending node ── */}
      {pendingNodeId && (() => {
        const b = NODE_BOUNDS[pendingNodeId]
        const cx = b.x + b.w / 2
        const cy = b.y + b.h / 2
        return (
          <g style={{ pointerEvents: "none" }}>
            <rect x={b.x} y={b.y} width={b.w} height={b.h} rx="8" fill="rgba(0,0,0,0.45)" />
            <g transform={`translate(${cx},${cy})`}>
              <circle
                r="11"
                fill="none"
                stroke="rgba(255,255,255,0.9)"
                strokeWidth="2.5"
                strokeDasharray="28 48"
                strokeLinecap="round"
              >
                <animateTransform
                  attributeName="transform"
                  type="rotate"
                  from="0"
                  to="360"
                  dur="0.75s"
                  repeatCount="indefinite"
                />
              </circle>
            </g>
          </g>
        )
      })()}
    </svg>
  )
}
