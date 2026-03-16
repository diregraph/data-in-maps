"use client"

import type { LayersNodeId } from "../nodes"

const NODE_BOUNDS: Record<
  LayersNodeId,
  { x: number; y: number; w: number; h: number }
> = {
  types: { x: 240, y: 28, w: 200, h: 44 },
  store: { x: 28, y: 112, w: 136, h: 60 },
  choropleth: { x: 188, y: 112, w: 136, h: 60 },
  bubble: { x: 348, y: 112, w: 136, h: 60 },
  categorical: { x: 508, y: 112, w: 144, h: 60 },
  "layer-list": { x: 28, y: 240, w: 295, h: 60 },
  "layer-editor": { x: 357, y: 240, w: 295, h: 60 },
}

interface LayersDiagramProps {
  onNodeClick: (id: LayersNodeId) => void
  activeNodeId?: LayersNodeId
  pendingNodeId?: LayersNodeId
}

export function LayersDiagram({
  onNodeClick,
  activeNodeId,
  pendingNodeId,
}: LayersDiagramProps) {
  function hl(id: LayersNodeId): React.SVGProps<SVGRectElement> {
    return activeNodeId === id
      ? { stroke: "rgb(255,255,255)", strokeWidth: 2 }
      : {}
  }

  function groupOpacity(id: LayersNodeId, base: number): React.CSSProperties {
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
      viewBox="0 0 680 360"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Layers module architecture diagram"
      style={{
        fontFamily:
          '"Anthropic Sans", -apple-system, "system-ui", "Segoe UI", sans-serif',
      }}
    >
      {/* Background */}
      <rect x="0" y="0" width="680" height="360" fill="#1a1916" />

      {/* ── Row 1: types ── */}
      <g onClick={() => onNodeClick("types")} style={groupOpacity("types", 1)}>
        <rect
          x="240"
          y="28"
          width="200"
          height="44"
          rx="8"
          fill="rgb(68,68,65)"
          stroke="rgb(180,178,169)"
          strokeWidth="0.5"
          {...hl("types")}
        />
        <text
          x="340"
          y="47"
          textAnchor="middle"
          dominantBaseline="central"
          fill="rgb(211,209,199)"
          fontSize="14"
          fontWeight="500"
        >
          types.ts
        </text>
        <text
          x="340"
          y="65"
          textAnchor="middle"
          dominantBaseline="central"
          fill="rgb(180,178,169)"
          fontSize="11"
        >
          Layer · LayerEncoding · EncodingType
        </text>
      </g>

      {/* ── Branch: types → row 2 (dashed dependency lines) ── */}
      <line
        x1="340"
        y1="72"
        x2="340"
        y2="92"
        {...connectorProps}
        strokeDasharray="3 3"
      />
      <line
        x1="96"
        y1="92"
        x2="580"
        y2="92"
        {...connectorProps}
        strokeDasharray="3 3"
      />
      <line
        x1="96"
        y1="92"
        x2="96"
        y2="112"
        {...connectorProps}
        strokeDasharray="3 3"
      />
      <line
        x1="256"
        y1="92"
        x2="256"
        y2="112"
        {...connectorProps}
        strokeDasharray="3 3"
      />
      <line
        x1="416"
        y1="92"
        x2="416"
        y2="112"
        {...connectorProps}
        strokeDasharray="3 3"
      />
      <line
        x1="580"
        y1="92"
        x2="580"
        y2="112"
        {...connectorProps}
        strokeDasharray="3 3"
      />

      {/* ── Row 2: store ── */}
      <g onClick={() => onNodeClick("store")} style={groupOpacity("store", 1)}>
        <rect
          x="28"
          y="112"
          width="136"
          height="60"
          rx="8"
          fill="rgb(8,80,65)"
          stroke="rgb(93,202,165)"
          strokeWidth="0.5"
          {...hl("store")}
        />
        <text
          x="96"
          y="132"
          textAnchor="middle"
          dominantBaseline="central"
          fill="rgb(159,225,203)"
          fontSize="14"
          fontWeight="500"
        >
          store.ts
        </text>
        <text
          x="96"
          y="153"
          textAnchor="middle"
          dominantBaseline="central"
          fill="rgb(93,202,165)"
          fontSize="11"
        >
          ordered stack · CRUD
        </text>
      </g>

      {/* ── Row 2: choropleth ── */}
      <g
        onClick={() => onNodeClick("choropleth")}
        style={groupOpacity("choropleth", 1)}
      >
        <rect
          x="188"
          y="112"
          width="136"
          height="60"
          rx="8"
          fill="rgb(8,80,65)"
          stroke="rgb(93,202,165)"
          strokeWidth="0.5"
          {...hl("choropleth")}
        />
        <text
          x="256"
          y="132"
          textAnchor="middle"
          dominantBaseline="central"
          fill="rgb(159,225,203)"
          fontSize="14"
          fontWeight="500"
        >
          choropleth
        </text>
        <text
          x="256"
          y="153"
          textAnchor="middle"
          dominantBaseline="central"
          fill="rgb(93,202,165)"
          fontSize="11"
        >
          fill-color ramp
        </text>
      </g>

      {/* ── Row 2: bubble ── */}
      <g
        onClick={() => onNodeClick("bubble")}
        style={groupOpacity("bubble", 1)}
      >
        <rect
          x="348"
          y="112"
          width="136"
          height="60"
          rx="8"
          fill="rgb(8,80,65)"
          stroke="rgb(93,202,165)"
          strokeWidth="0.5"
          {...hl("bubble")}
        />
        <text
          x="416"
          y="132"
          textAnchor="middle"
          dominantBaseline="central"
          fill="rgb(159,225,203)"
          fontSize="14"
          fontWeight="500"
        >
          bubble
        </text>
        <text
          x="416"
          y="153"
          textAnchor="middle"
          dominantBaseline="central"
          fill="rgb(93,202,165)"
          fontSize="11"
        >
          circle-radius scale
        </text>
      </g>

      {/* ── Row 2: categorical ── */}
      <g
        onClick={() => onNodeClick("categorical")}
        style={groupOpacity("categorical", 1)}
      >
        <rect
          x="508"
          y="112"
          width="144"
          height="60"
          rx="8"
          fill="rgb(8,80,65)"
          stroke="rgb(93,202,165)"
          strokeWidth="0.5"
          {...hl("categorical")}
        />
        <text
          x="580"
          y="132"
          textAnchor="middle"
          dominantBaseline="central"
          fill="rgb(159,225,203)"
          fontSize="14"
          fontWeight="500"
        >
          categorical
        </text>
        <text
          x="580"
          y="153"
          textAnchor="middle"
          dominantBaseline="central"
          fill="rgb(93,202,165)"
          fontSize="11"
        >
          color by category
        </text>
      </g>

      {/* ── Connectors: row 2 → row 3 ── */}
      {/* store → layer-list */}
      <line x1="96" y1="172" x2="96" y2="240" {...connectorProps} />
      {/* choropleth → layer-editor (draws full bus + drop) */}
      <path d="M 256 172 L 256 214 L 504 214 L 504 240" {...connectorProps} />
      {/* bubble → bus */}
      <line x1="416" y1="172" x2="416" y2="214" {...connectorProps} />
      {/* categorical → bus */}
      <path d="M 580 172 L 580 214 L 504 214" {...connectorProps} />

      {/* ── Row 3: LayerList ── */}
      <g
        onClick={() => onNodeClick("layer-list")}
        style={groupOpacity("layer-list", 1)}
      >
        <rect
          x="28"
          y="240"
          width="295"
          height="60"
          rx="8"
          fill="rgb(68,68,65)"
          stroke="rgb(180,178,169)"
          strokeWidth="0.5"
          {...hl("layer-list")}
        />
        <text
          x="175"
          y="260"
          textAnchor="middle"
          dominantBaseline="central"
          fill="rgb(211,209,199)"
          fontSize="14"
          fontWeight="500"
        >
          LayerList
        </text>
        <text
          x="175"
          y="281"
          textAnchor="middle"
          dominantBaseline="central"
          fill="rgb(180,178,169)"
          fontSize="11"
        >
          ordered stack editor · reorder
        </text>
      </g>

      {/* ── Row 3: LayerEditor ── */}
      <g
        onClick={() => onNodeClick("layer-editor")}
        style={groupOpacity("layer-editor", 1)}
      >
        <rect
          x="357"
          y="240"
          width="295"
          height="60"
          rx="8"
          fill="rgb(68,68,65)"
          stroke="rgb(180,178,169)"
          strokeWidth="0.5"
          {...hl("layer-editor")}
        />
        <text
          x="504"
          y="260"
          textAnchor="middle"
          dominantBaseline="central"
          fill="rgb(211,209,199)"
          fontSize="14"
          fontWeight="500"
        >
          LayerEditor
        </text>
        <text
          x="504"
          y="281"
          textAnchor="middle"
          dominantBaseline="central"
          fill="rgb(180,178,169)"
          fontSize="11"
        >
          encoding config panel
        </text>
      </g>

      {/* ── Legend ── */}
      <rect x="28" y="328" width="10" height="10" rx="2" fill="rgb(68,68,65)" />
      <text
        x="44"
        y="333"
        dominantBaseline="central"
        fill="rgb(194,192,182)"
        fontSize="12"
      >
        types / components
      </text>

      <rect x="200" y="328" width="10" height="10" rx="2" fill="rgb(8,80,65)" />
      <text
        x="216"
        y="333"
        dominantBaseline="central"
        fill="rgb(194,192,182)"
        fontSize="12"
      >
        state / encoding
      </text>

      <text
        x="400"
        y="333"
        dominantBaseline="central"
        fill="rgb(194,192,182)"
        fontSize="12"
      >
        ╌╌ type dependency
      </text>

      {/* ── Spinner overlay on pending node ── */}
      {pendingNodeId &&
        (() => {
          const b = NODE_BOUNDS[pendingNodeId]
          const cx = b.x + b.w / 2
          const cy = b.y + b.h / 2
          return (
            <g style={{ pointerEvents: "none" }}>
              <rect
                x={b.x}
                y={b.y}
                width={b.w}
                height={b.h}
                rx="8"
                fill="rgba(0,0,0,0.45)"
              />
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
