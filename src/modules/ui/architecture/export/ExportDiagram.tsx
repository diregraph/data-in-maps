"use client"

import type { ExportNodeId } from "../nodes"

const NODE_BOUNDS: Record<ExportNodeId, { x: number; y: number; w: number; h: number }> = {
  "export-panel": { x: 190, y: 28,  w: 300, h: 44 },
  "use-export":   { x: 190, y: 100, w: 300, h: 56 },
  "png-exporter": { x: 28,  y: 200, w: 188, h: 60 },
  "svg-exporter": { x: 246, y: 200, w: 188, h: 60 },
  "embed-link":   { x: 464, y: 200, w: 188, h: 60 },
  "api-route":    { x: 190, y: 308, w: 300, h: 56 },
}

interface ExportDiagramProps {
  onNodeClick: (id: ExportNodeId) => void
  activeNodeId?: ExportNodeId
  pendingNodeId?: ExportNodeId
}

export function ExportDiagram({ onNodeClick, activeNodeId, pendingNodeId }: ExportDiagramProps) {
  function hl(id: ExportNodeId): React.SVGProps<SVGRectElement> {
    return activeNodeId === id
      ? { stroke: "rgb(255,255,255)", strokeWidth: 2 }
      : {}
  }

  function groupOpacity(id: ExportNodeId, base: number): React.CSSProperties {
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
      viewBox="0 0 680 430"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Export module architecture diagram"
      style={{
        fontFamily:
          '"Anthropic Sans", -apple-system, "system-ui", "Segoe UI", sans-serif',
      }}
    >
      {/* Background */}
      <rect x="0" y="0" width="680" height="430" fill="#1a1916" />

      {/* ── Row 1: ExportPanel ── */}
      <g onClick={() => onNodeClick("export-panel")} style={groupOpacity("export-panel", 1)}>
        <rect
          x="190" y="28" width="300" height="44" rx="8"
          fill="rgb(60,52,137)" stroke="rgb(175,169,236)" strokeWidth="0.5"
          {...hl("export-panel")}
        />
        <text x="340" y="44" textAnchor="middle" dominantBaseline="central"
          fill="rgb(206,203,246)" fontSize="14" fontWeight="500">
          ExportPanel
        </text>
        <text x="340" y="62" textAnchor="middle" dominantBaseline="central"
          fill="rgb(175,169,236)" fontSize="11">
          format picker · download trigger
        </text>
      </g>

      {/* ── Connector: ExportPanel → useExport ── */}
      <line x1="340" y1="72" x2="340" y2="100" {...connectorProps} />

      {/* ── Dashed path: ExportPanel → api-route (direct server call) ── */}
      <path d="M 490 50 L 628 50 L 628 336 L 490 336"
        {...connectorProps} strokeDasharray="4 3" />

      {/* ── Row 2: useExport ── */}
      <g onClick={() => onNodeClick("use-export")} style={groupOpacity("use-export", 1)}>
        <rect
          x="190" y="100" width="300" height="56" rx="8"
          fill="rgb(8,80,65)" stroke="rgb(93,202,165)" strokeWidth="0.5"
          {...hl("use-export")}
        />
        <text x="340" y="120" textAnchor="middle" dominantBaseline="central"
          fill="rgb(159,225,203)" fontSize="14" fontWeight="500">
          useExport
        </text>
        <text x="340" y="141" textAnchor="middle" dominantBaseline="central"
          fill="rgb(93,202,165)" fontSize="11">
          coordinates client-side exports
        </text>
      </g>

      {/* ── Branch: useExport → row 3 ── */}
      <line x1="340" y1="156" x2="340" y2="180" {...connectorProps} />
      <line x1="122" y1="180" x2="558" y2="180" {...connectorProps} />
      <line x1="122" y1="180" x2="122" y2="200" {...connectorProps} />
      <line x1="340" y1="180" x2="340" y2="200" {...connectorProps} />
      <line x1="558" y1="180" x2="558" y2="200" {...connectorProps} />

      {/* ── Row 3: png-exporter ── */}
      <g onClick={() => onNodeClick("png-exporter")} style={groupOpacity("png-exporter", 1)}>
        <rect
          x="28" y="200" width="188" height="60" rx="8"
          fill="rgb(8,80,65)" stroke="rgb(93,202,165)" strokeWidth="0.5"
          {...hl("png-exporter")}
        />
        <text x="122" y="220" textAnchor="middle" dominantBaseline="central"
          fill="rgb(159,225,203)" fontSize="14" fontWeight="500">
          png.ts
        </text>
        <text x="122" y="241" textAnchor="middle" dominantBaseline="central"
          fill="rgb(93,202,165)" fontSize="11">
          canvas → PNG blob
        </text>
      </g>

      {/* ── Row 3: svg-exporter ── */}
      <g onClick={() => onNodeClick("svg-exporter")} style={groupOpacity("svg-exporter", 1)}>
        <rect
          x="246" y="200" width="188" height="60" rx="8"
          fill="rgb(8,80,65)" stroke="rgb(93,202,165)" strokeWidth="0.5"
          {...hl("svg-exporter")}
        />
        <text x="340" y="220" textAnchor="middle" dominantBaseline="central"
          fill="rgb(159,225,203)" fontSize="14" fontWeight="500">
          svg.ts
        </text>
        <text x="340" y="241" textAnchor="middle" dominantBaseline="central"
          fill="rgb(93,202,165)" fontSize="11">
          GeoJSON → SVG vector
        </text>
      </g>

      {/* ── Row 3: embed-link ── */}
      <g onClick={() => onNodeClick("embed-link")} style={groupOpacity("embed-link", 1)}>
        <rect
          x="464" y="200" width="188" height="60" rx="8"
          fill="rgb(8,80,65)" stroke="rgb(93,202,165)" strokeWidth="0.5"
          {...hl("embed-link")}
        />
        <text x="558" y="220" textAnchor="middle" dominantBaseline="central"
          fill="rgb(159,225,203)" fontSize="14" fontWeight="500">
          embed.ts
        </text>
        <text x="558" y="241" textAnchor="middle" dominantBaseline="central"
          fill="rgb(93,202,165)" fontSize="11">
          viewport + config → URL
        </text>
      </g>

      {/* ── Row 4: api-route ── */}
      <g onClick={() => onNodeClick("api-route")} style={groupOpacity("api-route", 0.8)}>
        <rect
          x="190" y="308" width="300" height="56" rx="8"
          fill="rgb(68,68,65)" stroke="rgb(180,178,169)" strokeWidth="0.5"
          {...hl("api-route")}
        />
        <text x="340" y="328" textAnchor="middle" dominantBaseline="central"
          fill="rgb(211,209,199)" fontSize="14" fontWeight="500">
          api/export/
        </text>
        <text x="340" y="349" textAnchor="middle" dominantBaseline="central"
          fill="rgb(180,178,169)" fontSize="11">
          server-side · OG image render
        </text>
      </g>

      {/* ── Legend ── */}
      <rect x="28"  y="392" width="10" height="10" rx="2" fill="rgb(60,52,137)" />
      <text x="44"  y="397" dominantBaseline="central" fill="rgb(194,192,182)" fontSize="12">entry component</text>

      <rect x="188" y="392" width="10" height="10" rx="2" fill="rgb(8,80,65)" />
      <text x="204" y="397" dominantBaseline="central" fill="rgb(194,192,182)" fontSize="12">client-side export</text>

      <rect x="360" y="392" width="10" height="10" rx="2" fill="rgb(68,68,65)" />
      <text x="376" y="397" dominantBaseline="central" fill="rgb(194,192,182)" fontSize="12">server-side route</text>

      <text x="510" y="397" dominantBaseline="central" fill="rgb(194,192,182)" fontSize="12">╌╌ direct call</text>

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
