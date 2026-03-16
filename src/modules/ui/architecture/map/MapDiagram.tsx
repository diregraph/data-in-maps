"use client"

import type { MapNodeId } from "../nodes"

const NODE_BOUNDS: Record<MapNodeId, { x: number; y: number; w: number; h: number }> = {
  types:              { x: 240, y: 28,  w: 200, h: 44 },
  "map-canvas":       { x: 28,  y: 112, w: 295, h: 60 },
  store:              { x: 357, y: 112, w: 295, h: 60 },
  "use-map-instance": { x: 28,  y: 240, w: 190, h: 60 },
  "use-fly-to":       { x: 246, y: 240, w: 188, h: 60 },
  "use-layer-sync":   { x: 462, y: 240, w: 190, h: 60 },
}

interface MapDiagramProps {
  onNodeClick: (id: MapNodeId) => void
  activeNodeId?: MapNodeId
  pendingNodeId?: MapNodeId
}

export function MapDiagram({ onNodeClick, activeNodeId, pendingNodeId }: MapDiagramProps) {
  function hl(id: MapNodeId): React.SVGProps<SVGRectElement> {
    return activeNodeId === id
      ? { stroke: "rgb(255,255,255)", strokeWidth: 2 }
      : {}
  }

  function groupOpacity(id: MapNodeId, base: number): React.CSSProperties {
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
      viewBox="0 0 680 380"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Map module architecture diagram"
      style={{
        fontFamily:
          '"Anthropic Sans", -apple-system, "system-ui", "Segoe UI", sans-serif',
      }}
    >
      {/* Background */}
      <rect x="0" y="0" width="680" height="380" fill="#1a1916" />

      {/* ── Row 1: types ── */}
      <g onClick={() => onNodeClick("types")} style={groupOpacity("types", 1)}>
        <rect
          x="240" y="28" width="200" height="44" rx="8"
          fill="rgb(68,68,65)" stroke="rgb(180,178,169)" strokeWidth="0.5"
          {...hl("types")}
        />
        <text x="340" y="44" textAnchor="middle" dominantBaseline="central"
          fill="rgb(211,209,199)" fontSize="14" fontWeight="500">
          types.ts
        </text>
        <text x="340" y="62" textAnchor="middle" dominantBaseline="central"
          fill="rgb(180,178,169)" fontSize="11">
          Viewport · MapState · MapRef
        </text>
      </g>

      {/* ── Branch: types → row 2 (dashed dependency) ── */}
      <line x1="340" y1="72" x2="340" y2="92" {...connectorProps} strokeDasharray="3 3" />
      <line x1="175" y1="92" x2="504" y2="92" {...connectorProps} strokeDasharray="3 3" />
      <line x1="175" y1="92" x2="175" y2="112" {...connectorProps} strokeDasharray="3 3" />
      <line x1="504" y1="92" x2="504" y2="112" {...connectorProps} strokeDasharray="3 3" />

      {/* ── Row 2: MapCanvas ── */}
      <g onClick={() => onNodeClick("map-canvas")} style={groupOpacity("map-canvas", 1)}>
        <rect
          x="28" y="112" width="295" height="60" rx="8"
          fill="rgb(60,52,137)" stroke="rgb(175,169,236)" strokeWidth="0.5"
          {...hl("map-canvas")}
        />
        <text x="175" y="132" textAnchor="middle" dominantBaseline="central"
          fill="rgb(206,203,246)" fontSize="14" fontWeight="500">
          MapCanvas
        </text>
        <text x="175" y="153" textAnchor="middle" dominantBaseline="central"
          fill="rgb(175,169,236)" fontSize="11">
          react-map-gl · SSR guard
        </text>
      </g>

      {/* ── Row 2: store ── */}
      <g onClick={() => onNodeClick("store")} style={groupOpacity("store", 1)}>
        <rect
          x="357" y="112" width="295" height="60" rx="8"
          fill="rgb(8,80,65)" stroke="rgb(93,202,165)" strokeWidth="0.5"
          {...hl("store")}
        />
        <text x="504" y="132" textAnchor="middle" dominantBaseline="central"
          fill="rgb(159,225,203)" fontSize="14" fontWeight="500">
          store.ts
        </text>
        <text x="504" y="153" textAnchor="middle" dominantBaseline="central"
          fill="rgb(93,202,165)" fontSize="11">
          viewport · mapRef · flyTo
        </text>
      </g>

      {/* ── Branch: row 2 → row 3 (shared bus at y=202) ── */}
      <line x1="175" y1="172" x2="175" y2="202" {...connectorProps} />
      <line x1="504" y1="172" x2="504" y2="202" {...connectorProps} />
      <line x1="123" y1="202" x2="557" y2="202" {...connectorProps} />
      <line x1="123" y1="202" x2="123" y2="240" {...connectorProps} />
      <line x1="340" y1="202" x2="340" y2="240" {...connectorProps} />
      <line x1="557" y1="202" x2="557" y2="240" {...connectorProps} />

      {/* ── Row 3: useMapInstance ── */}
      <g onClick={() => onNodeClick("use-map-instance")} style={groupOpacity("use-map-instance", 1)}>
        <rect
          x="28" y="240" width="190" height="60" rx="8"
          fill="rgb(8,80,65)" stroke="rgb(93,202,165)" strokeWidth="0.5"
          {...hl("use-map-instance")}
        />
        <text x="123" y="260" textAnchor="middle" dominantBaseline="central"
          fill="rgb(159,225,203)" fontSize="14" fontWeight="500">
          useMapInstance
        </text>
        <text x="123" y="281" textAnchor="middle" dominantBaseline="central"
          fill="rgb(93,202,165)" fontSize="11">
          MapLibre GL JS ref
        </text>
      </g>

      {/* ── Row 3: useFlyTo ── */}
      <g onClick={() => onNodeClick("use-fly-to")} style={groupOpacity("use-fly-to", 1)}>
        <rect
          x="246" y="240" width="188" height="60" rx="8"
          fill="rgb(8,80,65)" stroke="rgb(93,202,165)" strokeWidth="0.5"
          {...hl("use-fly-to")}
        />
        <text x="340" y="260" textAnchor="middle" dominantBaseline="central"
          fill="rgb(159,225,203)" fontSize="14" fontWeight="500">
          useFlyTo
        </text>
        <text x="340" y="281" textAnchor="middle" dominantBaseline="central"
          fill="rgb(93,202,165)" fontSize="11">
          camera animation
        </text>
      </g>

      {/* ── Row 3: useLayerSync ── */}
      <g onClick={() => onNodeClick("use-layer-sync")} style={groupOpacity("use-layer-sync", 1)}>
        <rect
          x="462" y="240" width="190" height="60" rx="8"
          fill="rgb(8,80,65)" stroke="rgb(93,202,165)" strokeWidth="0.5"
          {...hl("use-layer-sync")}
        />
        <text x="557" y="260" textAnchor="middle" dominantBaseline="central"
          fill="rgb(159,225,203)" fontSize="14" fontWeight="500">
          useLayerSync
        </text>
        <text x="557" y="281" textAnchor="middle" dominantBaseline="central"
          fill="rgb(93,202,165)" fontSize="11">
          layers → MapLibre sync
        </text>
      </g>

      {/* ── Legend ── */}
      <rect x="28"  y="342" width="10" height="10" rx="2" fill="rgb(68,68,65)" />
      <text x="44"  y="347" dominantBaseline="central" fill="rgb(194,192,182)" fontSize="12">contracts</text>

      <rect x="140" y="342" width="10" height="10" rx="2" fill="rgb(60,52,137)" />
      <text x="156" y="347" dominantBaseline="central" fill="rgb(194,192,182)" fontSize="12">entry component</text>

      <rect x="300" y="342" width="10" height="10" rx="2" fill="rgb(8,80,65)" />
      <text x="316" y="347" dominantBaseline="central" fill="rgb(194,192,182)" fontSize="12">state / hooks</text>

      <text x="450" y="347" dominantBaseline="central" fill="rgb(194,192,182)" fontSize="12">╌╌ type dependency</text>

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
