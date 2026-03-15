"use client"

import type { NodeId } from "./nodes"

interface ArchitectureDiagramProps {
  onNodeClick: (id: NodeId) => void
  activeNodeId?: NodeId
}

export function ArchitectureDiagram({ onNodeClick, activeNodeId }: ArchitectureDiagramProps) {
  function hl(id: NodeId): React.SVGProps<SVGRectElement> {
    return activeNodeId === id
      ? { stroke: "rgb(255,255,255)", strokeWidth: 2 }
      : {}
  }

  function groupOpacity(id: NodeId, base: number): React.CSSProperties {
    return { cursor: "pointer", opacity: activeNodeId === id ? 1 : base }
  }

  return (
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 680 430"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Architecture diagram"
      style={{
        fontFamily:
          '"Anthropic Sans", -apple-system, "system-ui", "Segoe UI", sans-serif',
      }}
    >
      <defs>
        <marker
          id="arrow"
          viewBox="0 0 10 10"
          refX="8"
          refY="5"
          markerWidth="6"
          markerHeight="6"
          orient="auto-start-reverse"
        >
          <path
            d="M2 1L8 5L2 9"
            fill="none"
            stroke="context-stroke"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </marker>
      </defs>

      {/* Background — matches Claude web interface dark appearance */}
      <rect x="0" y="0" width="680" height="430" fill="#1a1916" />

      {/* Next.js app router */}
      <g onClick={() => onNodeClick("app-router")} style={{ cursor: "pointer" }}>
        <rect
          x="190"
          y="20"
          width="300"
          height="44"
          rx="8"
          fill="rgb(60, 52, 137)"
          stroke="rgb(175, 169, 236)"
          strokeWidth="0.5"
          {...hl("app-router")}
        />
        <text
          x="340"
          y="42"
          textAnchor="middle"
          dominantBaseline="central"
          fill="rgb(206, 203, 246)"
          fontSize="14"
          fontWeight="500"
        >
          Next.js app router
        </text>
      </g>

      {/* Arrow: app router → core pipeline */}
      <line
        x1="340"
        y1="64"
        x2="340"
        y2="96"
        markerEnd="url(#arrow)"
        stroke="rgb(156, 154, 146)"
        strokeWidth="1.5"
        fill="none"
      />

      {/* core pipeline container */}
      <text x="26" y="93" fill="rgb(194, 192, 182)" fontSize="12">
        core pipeline
      </text>
      <rect
        x="20"
        y="96"
        width="640"
        height="72"
        rx="6"
        fill="none"
        stroke="rgba(222, 220, 209, 0.15)"
        strokeDasharray="4 4"
        strokeWidth="1"
      />

      {/* support container */}
      <text x="26" y="193" fill="rgb(194, 192, 182)" fontSize="12">
        support
      </text>
      <rect
        x="20"
        y="196"
        width="640"
        height="72"
        rx="6"
        fill="none"
        stroke="rgba(222, 220, 209, 0.15)"
        strokeDasharray="4 4"
        strokeWidth="1"
      />

      {/* ai module */}
      <g onClick={() => onNodeClick("ai")} style={{ cursor: "pointer" }}>
        <rect
          x="28"
          y="104"
          width="140"
          height="60"
          rx="8"
          fill="rgb(113, 43, 19)"
          stroke="rgb(240, 153, 123)"
          strokeWidth="0.5"
          {...hl("ai")}
        />
        <text
          x="98"
          y="124"
          textAnchor="middle"
          dominantBaseline="central"
          fill="rgb(245, 196, 179)"
          fontSize="14"
          fontWeight="500"
        >
          ai
        </text>
        <text
          x="98"
          y="147"
          textAnchor="middle"
          dominantBaseline="central"
          fill="rgb(240, 153, 123)"
          fontSize="12"
        >
          natural language
        </text>
      </g>

      {/* data module */}
      <g onClick={() => onNodeClick("data")} style={{ cursor: "pointer" }}>
        <rect
          x="185"
          y="104"
          width="140"
          height="60"
          rx="8"
          fill="rgb(8, 80, 65)"
          stroke="rgb(93, 202, 165)"
          strokeWidth="0.5"
          {...hl("data")}
        />
        <text
          x="255"
          y="124"
          textAnchor="middle"
          dominantBaseline="central"
          fill="rgb(159, 225, 203)"
          fontSize="14"
          fontWeight="500"
        >
          data
        </text>
        <text
          x="255"
          y="147"
          textAnchor="middle"
          dominantBaseline="central"
          fill="rgb(93, 202, 165)"
          fontSize="12"
        >
          ingest &amp; parse
        </text>
      </g>

      {/* layers module */}
      <g onClick={() => onNodeClick("layers")} style={{ cursor: "pointer" }}>
        <rect
          x="342"
          y="104"
          width="140"
          height="60"
          rx="8"
          fill="rgb(8, 80, 65)"
          stroke="rgb(93, 202, 165)"
          strokeWidth="0.5"
          {...hl("layers")}
        />
        <text
          x="412"
          y="124"
          textAnchor="middle"
          dominantBaseline="central"
          fill="rgb(159, 225, 203)"
          fontSize="14"
          fontWeight="500"
        >
          layers
        </text>
        <text
          x="412"
          y="147"
          textAnchor="middle"
          dominantBaseline="central"
          fill="rgb(93, 202, 165)"
          fontSize="12"
        >
          stack &amp; styles
        </text>
      </g>

      {/* map module */}
      <g onClick={() => onNodeClick("map")} style={{ cursor: "pointer" }}>
        <rect
          x="499"
          y="104"
          width="149"
          height="60"
          rx="8"
          fill="rgb(8, 80, 65)"
          stroke="rgb(93, 202, 165)"
          strokeWidth="0.5"
          {...hl("map")}
        />
        <text
          x="573"
          y="124"
          textAnchor="middle"
          dominantBaseline="central"
          fill="rgb(159, 225, 203)"
          fontSize="14"
          fontWeight="500"
        >
          map
        </text>
        <text
          x="573"
          y="147"
          textAnchor="middle"
          dominantBaseline="central"
          fill="rgb(93, 202, 165)"
          fontSize="12"
        >
          render &amp; viewport
        </text>
      </g>

      {/* Pipeline arrows */}
      <line
        x1="168"
        y1="134"
        x2="183"
        y2="134"
        markerEnd="url(#arrow)"
        stroke="rgb(156, 154, 146)"
        strokeWidth="1.5"
        fill="none"
      />
      <line
        x1="325"
        y1="134"
        x2="340"
        y2="134"
        markerEnd="url(#arrow)"
        stroke="rgb(156, 154, 146)"
        strokeWidth="1.5"
        fill="none"
      />
      <line
        x1="482"
        y1="134"
        x2="497"
        y2="134"
        markerEnd="url(#arrow)"
        stroke="rgb(156, 154, 146)"
        strokeWidth="1.5"
        fill="none"
      />

      {/* ui module */}
      <g onClick={() => onNodeClick("ui")} style={{ cursor: "pointer" }}>
        <rect
          x="28"
          y="204"
          width="283"
          height="60"
          rx="8"
          fill="rgb(68, 68, 65)"
          stroke="rgb(180, 178, 169)"
          strokeWidth="0.5"
          {...hl("ui")}
        />
        <text
          x="169"
          y="224"
          textAnchor="middle"
          dominantBaseline="central"
          fill="rgb(211, 209, 199)"
          fontSize="14"
          fontWeight="500"
        >
          ui
        </text>
        <text
          x="169"
          y="247"
          textAnchor="middle"
          dominantBaseline="central"
          fill="rgb(180, 178, 169)"
          fontSize="12"
        >
          shared components &amp; design system
        </text>
      </g>

      {/* export module */}
      <g onClick={() => onNodeClick("export")} style={{ cursor: "pointer" }}>
        <rect
          x="369"
          y="204"
          width="283"
          height="60"
          rx="8"
          fill="rgb(68, 68, 65)"
          stroke="rgb(180, 178, 169)"
          strokeWidth="0.5"
          {...hl("export")}
        />
        <text
          x="510"
          y="224"
          textAnchor="middle"
          dominantBaseline="central"
          fill="rgb(211, 209, 199)"
          fontSize="14"
          fontWeight="500"
        >
          export
        </text>
        <text
          x="510"
          y="247"
          textAnchor="middle"
          dominantBaseline="central"
          fill="rgb(180, 178, 169)"
          fontSize="12"
        >
          PNG, SVG, embed link
        </text>
      </g>

      {/* Claude API */}
      <g
        onClick={() => onNodeClick("claude-api")}
        style={groupOpacity("claude-api", 0.65)}
      >
        <rect
          x="28"
          y="302"
          width="180"
          height="56"
          rx="8"
          fill="rgb(113, 43, 19)"
          stroke="rgb(240, 153, 123)"
          strokeWidth="0.5"
          {...hl("claude-api")}
        />
        <text
          x="118"
          y="320"
          textAnchor="middle"
          dominantBaseline="central"
          fill="rgb(245, 196, 179)"
          fontSize="14"
          fontWeight="500"
        >
          Claude API
        </text>
        <text
          x="118"
          y="342"
          textAnchor="middle"
          dominantBaseline="central"
          fill="rgb(240, 153, 123)"
          fontSize="12"
        >
          LLM gateway
        </text>
      </g>

      {/* Tile provider */}
      <g
        onClick={() => onNodeClick("tile-provider")}
        style={groupOpacity("tile-provider", 0.65)}
      >
        <rect
          x="250"
          y="302"
          width="180"
          height="56"
          rx="8"
          fill="rgb(12, 68, 124)"
          stroke="rgb(133, 183, 235)"
          strokeWidth="0.5"
          {...hl("tile-provider")}
        />
        <text
          x="340"
          y="320"
          textAnchor="middle"
          dominantBaseline="central"
          fill="rgb(181, 212, 244)"
          fontSize="14"
          fontWeight="500"
        >
          Tile provider
        </text>
        <text
          x="340"
          y="342"
          textAnchor="middle"
          dominantBaseline="central"
          fill="rgb(133, 183, 235)"
          fontSize="12"
        >
          PMTiles / OSM / Mapbox
        </text>
      </g>

      {/* Browser storage */}
      <g
        onClick={() => onNodeClick("browser-storage")}
        style={groupOpacity("browser-storage", 0.65)}
      >
        <rect
          x="472"
          y="302"
          width="180"
          height="56"
          rx="8"
          fill="rgb(68, 68, 65)"
          stroke="rgb(180, 178, 169)"
          strokeWidth="0.5"
          {...hl("browser-storage")}
        />
        <text
          x="562"
          y="320"
          textAnchor="middle"
          dominantBaseline="central"
          fill="rgb(211, 209, 199)"
          fontSize="14"
          fontWeight="500"
        >
          Browser storage
        </text>
        <text
          x="562"
          y="342"
          textAnchor="middle"
          dominantBaseline="central"
          fill="rgb(180, 178, 169)"
          fontSize="12"
        >
          maps, preferences
        </text>
      </g>

      {/* Connecting paths */}
      {/* Claude API → ai (feedback loop) */}
      <path
        d="M 28 330 L 12 330 L 12 134 L 28 134"
        fill="none"
        stroke="rgba(222, 220, 209, 0.3)"
        strokeWidth="1"
        strokeDasharray="4 3"
        markerEnd="url(#arrow)"
      />
      {/* map → export */}
      <path
        d="M 573 164 L 573 186 L 510 186 L 510 204"
        fill="none"
        stroke="rgb(156, 154, 146)"
        strokeWidth="1.5"
        markerEnd="url(#arrow)"
      />
      {/* ui ← pipeline (dashed) */}
      <path
        d="M 169 204 L 169 164"
        fill="none"
        stroke="rgba(222, 220, 209, 0.3)"
        strokeWidth="1"
        strokeDasharray="3 3"
        markerEnd="url(#arrow)"
      />
      {/* Browser storage → export (dashed) */}
      <path
        d="M 562 302 L 562 264"
        fill="none"
        stroke="rgba(222, 220, 209, 0.3)"
        strokeWidth="1"
        strokeDasharray="3 3"
        markerEnd="url(#arrow)"
      />

      {/* Legend */}
      <rect x="28" y="390" width="10" height="10" rx="2" fill="rgb(60, 52, 137)" />
      <text x="44" y="395" dominantBaseline="central" fill="rgb(194, 192, 182)" fontSize="12">
        entry
      </text>

      <rect x="110" y="390" width="10" height="10" rx="2" fill="rgb(113, 43, 19)" />
      <text x="126" y="395" dominantBaseline="central" fill="rgb(194, 192, 182)" fontSize="12">
        AI layer
      </text>

      <rect x="210" y="390" width="10" height="10" rx="2" fill="rgb(8, 80, 65)" />
      <text x="226" y="395" dominantBaseline="central" fill="rgb(194, 192, 182)" fontSize="12">
        pipeline
      </text>

      <rect x="320" y="390" width="10" height="10" rx="2" fill="rgb(68, 68, 65)" />
      <text x="336" y="395" dominantBaseline="central" fill="rgb(194, 192, 182)" fontSize="12">
        support / infra
      </text>

      <text x="460" y="395" dominantBaseline="central" fill="rgb(194, 192, 182)" fontSize="12">
        ╌╌ external data flow
      </text>
    </svg>
  )
}
