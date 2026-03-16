"use client"

import type { UiNodeId } from "../nodes"

const NODE_BOUNDS: Record<
  UiNodeId,
  { x: number; y: number; w: number; h: number }
> = {
  theme: { x: 240, y: 28, w: 200, h: 44 },
  button: { x: 28, y: 111, w: 140, h: 60 },
  sheet: { x: 186, y: 111, w: 140, h: 60 },
  form: { x: 344, y: 111, w: 140, h: 60 },
  toast: { x: 502, y: 111, w: 150, h: 60 },
  custom: { x: 28, y: 216, w: 624, h: 60 },
}

interface UiDiagramProps {
  onNodeClick: (id: UiNodeId) => void
  activeNodeId?: UiNodeId
  pendingNodeId?: UiNodeId
}

export function UiDiagram({
  onNodeClick,
  activeNodeId,
  pendingNodeId,
}: UiDiagramProps) {
  function hl(id: UiNodeId): React.SVGProps<SVGRectElement> {
    return activeNodeId === id
      ? { stroke: "rgb(255,255,255)", strokeWidth: 2 }
      : {}
  }

  function groupOpacity(id: UiNodeId, base: number): React.CSSProperties {
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
      viewBox="0 0 680 340"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="UI module architecture diagram"
      style={{
        fontFamily:
          '"Anthropic Sans", -apple-system, "system-ui", "Segoe UI", sans-serif',
      }}
    >
      {/* Background */}
      <rect x="0" y="0" width="680" height="340" fill="#1a1916" />

      {/* ── Row 1: theme ── */}
      <g onClick={() => onNodeClick("theme")} style={groupOpacity("theme", 1)}>
        <rect
          x="240"
          y="28"
          width="200"
          height="44"
          rx="8"
          fill="rgb(60,52,137)"
          stroke="rgb(175,169,236)"
          strokeWidth="0.5"
          {...hl("theme")}
        />
        <text
          x="340"
          y="44"
          textAnchor="middle"
          dominantBaseline="central"
          fill="rgb(206,203,246)"
          fontSize="14"
          fontWeight="500"
        >
          theme.css
        </text>
        <text
          x="340"
          y="62"
          textAnchor="middle"
          dominantBaseline="central"
          fill="rgb(175,169,236)"
          fontSize="11"
        >
          CSS vars · shadcn tokens · dark mode
        </text>
      </g>

      {/* ── Branch: theme → shadcn row ── */}
      <line
        x1="340"
        y1="72"
        x2="340"
        y2="92"
        {...connectorProps}
        strokeDasharray="3 3"
      />
      <line
        x1="98"
        y1="92"
        x2="577"
        y2="92"
        {...connectorProps}
        strokeDasharray="3 3"
      />
      <line
        x1="98"
        y1="92"
        x2="98"
        y2="111"
        {...connectorProps}
        strokeDasharray="3 3"
      />
      <line
        x1="256"
        y1="92"
        x2="256"
        y2="111"
        {...connectorProps}
        strokeDasharray="3 3"
      />
      <line
        x1="414"
        y1="92"
        x2="414"
        y2="111"
        {...connectorProps}
        strokeDasharray="3 3"
      />
      <line
        x1="577"
        y1="92"
        x2="577"
        y2="111"
        {...connectorProps}
        strokeDasharray="3 3"
      />

      {/* ── shadcn / ui container ── */}
      <text x="26" y="100" fill="rgb(194,192,182)" fontSize="12">
        shadcn / ui
      </text>
      <rect
        x="20"
        y="103"
        width="640"
        height="76"
        rx="6"
        fill="none"
        stroke="rgba(222,220,209,0.15)"
        strokeDasharray="4 4"
        strokeWidth="1"
      />

      {/* ── Row 2: Button ── */}
      <g
        onClick={() => onNodeClick("button")}
        style={groupOpacity("button", 1)}
      >
        <rect
          x="28"
          y="111"
          width="140"
          height="60"
          rx="8"
          fill="rgb(12,68,124)"
          stroke="rgb(133,183,235)"
          strokeWidth="0.5"
          {...hl("button")}
        />
        <text
          x="98"
          y="131"
          textAnchor="middle"
          dominantBaseline="central"
          fill="rgb(181,212,244)"
          fontSize="14"
          fontWeight="500"
        >
          Button
        </text>
        <text
          x="98"
          y="152"
          textAnchor="middle"
          dominantBaseline="central"
          fill="rgb(133,183,235)"
          fontSize="11"
        >
          default · outline · ghost
        </text>
      </g>

      {/* ── Row 2: Sheet ── */}
      <g onClick={() => onNodeClick("sheet")} style={groupOpacity("sheet", 1)}>
        <rect
          x="186"
          y="111"
          width="140"
          height="60"
          rx="8"
          fill="rgb(12,68,124)"
          stroke="rgb(133,183,235)"
          strokeWidth="0.5"
          {...hl("sheet")}
        />
        <text
          x="256"
          y="131"
          textAnchor="middle"
          dominantBaseline="central"
          fill="rgb(181,212,244)"
          fontSize="14"
          fontWeight="500"
        >
          Sheet
        </text>
        <text
          x="256"
          y="152"
          textAnchor="middle"
          dominantBaseline="central"
          fill="rgb(133,183,235)"
          fontSize="11"
        >
          sidebar · overlay panel
        </text>
      </g>

      {/* ── Row 2: Form ── */}
      <g onClick={() => onNodeClick("form")} style={groupOpacity("form", 1)}>
        <rect
          x="344"
          y="111"
          width="140"
          height="60"
          rx="8"
          fill="rgb(12,68,124)"
          stroke="rgb(133,183,235)"
          strokeWidth="0.5"
          {...hl("form")}
        />
        <text
          x="414"
          y="131"
          textAnchor="middle"
          dominantBaseline="central"
          fill="rgb(181,212,244)"
          fontSize="14"
          fontWeight="500"
        >
          Form
        </text>
        <text
          x="414"
          y="152"
          textAnchor="middle"
          dominantBaseline="central"
          fill="rgb(133,183,235)"
          fontSize="11"
        >
          Input · Select · Slider
        </text>
      </g>

      {/* ── Row 2: Sonner ── */}
      <g onClick={() => onNodeClick("toast")} style={groupOpacity("toast", 1)}>
        <rect
          x="502"
          y="111"
          width="150"
          height="60"
          rx="8"
          fill="rgb(12,68,124)"
          stroke="rgb(133,183,235)"
          strokeWidth="0.5"
          {...hl("toast")}
        />
        <text
          x="577"
          y="131"
          textAnchor="middle"
          dominantBaseline="central"
          fill="rgb(181,212,244)"
          fontSize="14"
          fontWeight="500"
        >
          Sonner
        </text>
        <text
          x="577"
          y="152"
          textAnchor="middle"
          dominantBaseline="central"
          fill="rgb(133,183,235)"
          fontSize="11"
        >
          toast · action feedback
        </text>
      </g>

      {/* ── custom container ── */}
      <text x="26" y="205" fill="rgb(194,192,182)" fontSize="12">
        custom
      </text>
      <rect
        x="20"
        y="208"
        width="640"
        height="76"
        rx="6"
        fill="none"
        stroke="rgba(222,220,209,0.15)"
        strokeDasharray="4 4"
        strokeWidth="1"
      />

      {/* ── Row 3: custom components ── */}
      <g
        onClick={() => onNodeClick("custom")}
        style={groupOpacity("custom", 1)}
      >
        <rect
          x="28"
          y="216"
          width="624"
          height="60"
          rx="8"
          fill="rgb(68,68,65)"
          stroke="rgb(180,178,169)"
          strokeWidth="0.5"
          {...hl("custom")}
        />
        <text
          x="340"
          y="236"
          textAnchor="middle"
          dominantBaseline="central"
          fill="rgb(211,209,199)"
          fontSize="14"
          fontWeight="500"
        >
          custom components
        </text>
        <text
          x="340"
          y="257"
          textAnchor="middle"
          dominantBaseline="central"
          fill="rgb(180,178,169)"
          fontSize="11"
        >
          ColorRamp · EmptyState · Spinner
        </text>
      </g>

      {/* ── Legend ── */}
      <rect
        x="28"
        y="302"
        width="10"
        height="10"
        rx="2"
        fill="rgb(60,52,137)"
      />
      <text
        x="44"
        y="307"
        dominantBaseline="central"
        fill="rgb(194,192,182)"
        fontSize="12"
      >
        token foundation
      </text>

      <rect
        x="188"
        y="302"
        width="10"
        height="10"
        rx="2"
        fill="rgb(12,68,124)"
      />
      <text
        x="204"
        y="307"
        dominantBaseline="central"
        fill="rgb(194,192,182)"
        fontSize="12"
      >
        shadcn component
      </text>

      <rect
        x="370"
        y="302"
        width="10"
        height="10"
        rx="2"
        fill="rgb(68,68,65)"
      />
      <text
        x="386"
        y="307"
        dominantBaseline="central"
        fill="rgb(194,192,182)"
        fontSize="12"
      >
        custom / platform-specific
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
