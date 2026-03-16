"use client"

import type { AppRouterNodeId } from "../nodes"

const NODE_BOUNDS: Record<AppRouterNodeId, { x: number; y: number; w: number; h: number }> = {
  layout:            { x: 240, y: 20,  w: 200, h: 44 },
  "map-group":       { x: 30,  y: 104, w: 180, h: 56 },
  "marketing-group": { x: 250, y: 104, w: 180, h: 56 },
  api:               { x: 470, y: 104, w: 180, h: 56 },
  "map-page":        { x: 18,  y: 200, w: 88,  h: 44 },
  "maps-id":         { x: 130, y: 200, w: 100, h: 44 },
  "marketing-page":  { x: 238, y: 200, w: 88,  h: 44 },
  gallery:           { x: 350, y: 200, w: 100, h: 44 },
  "ai-route":        { x: 456, y: 200, w: 92,  h: 44 },
  "export-route":    { x: 572, y: 200, w: 96,  h: 44 },
  loading:           { x: 28,  y: 296, w: 110, h: 44 },
  error:             { x: 154, y: 296, w: 110, h: 44 },
  "not-found":       { x: 280, y: 296, w: 120, h: 44 },
  "opengraph-image": { x: 416, y: 296, w: 120, h: 44 },
  sitemap:           { x: 552, y: 296, w: 110, h: 44 },
}

interface AppRouterDiagramProps {
  onNodeClick: (id: AppRouterNodeId) => void
  activeNodeId?: AppRouterNodeId
  pendingNodeId?: AppRouterNodeId
}

export function AppRouterDiagram({ onNodeClick, activeNodeId, pendingNodeId }: AppRouterDiagramProps) {
  function hl(id: AppRouterNodeId): React.SVGProps<SVGRectElement> {
    return activeNodeId === id
      ? { stroke: "rgb(255,255,255)", strokeWidth: 2 }
      : {}
  }

  function groupOpacity(id: AppRouterNodeId, base: number): React.CSSProperties {
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
      viewBox="0 0 680 500"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="App Router architecture diagram"
      style={{
        fontFamily:
          '"Anthropic Sans", -apple-system, "system-ui", "Segoe UI", sans-serif',
      }}
    >
      {/* Background */}
      <rect x="0" y="0" width="680" height="500" fill="#1a1916" />

      {/* ── Row 1: layout ── */}
      <g onClick={() => onNodeClick("layout")} style={groupOpacity("layout", 1)}>
        <rect
          x="240" y="20" width="200" height="44" rx="8"
          fill="rgb(60,52,137)" stroke="rgb(175,169,236)" strokeWidth="0.5"
          {...hl("layout")}
        />
        <text x="340" y="42" textAnchor="middle" dominantBaseline="central"
          fill="rgb(206,203,246)" fontSize="13" fontWeight="500">
          app/layout.tsx
        </text>
      </g>

      {/* ── Branch lines: layout → row 2 ── */}
      {/* layout → map-group (includes stem from y=64 to y=84) */}
      <path d="M 340 64 L 340 84 L 120 84 L 120 104" {...connectorProps} />
      {/* layout → marketing-group */}
      <path d="M 340 84 L 340 104" {...connectorProps} />
      {/* layout → api */}
      <path d="M 340 84 L 560 84 L 560 104" {...connectorProps} />

      {/* ── Row 2: map-group, marketing-group, api ── */}
      <g onClick={() => onNodeClick("map-group")} style={groupOpacity("map-group", 1)}>
        <rect
          x="30" y="104" width="180" height="56" rx="8"
          fill="rgb(8,80,65)" stroke="rgb(93,202,165)" strokeWidth="0.5"
          {...hl("map-group")}
        />
        <text x="120" y="124" textAnchor="middle" dominantBaseline="central"
          fill="rgb(159,225,203)" fontSize="13" fontWeight="500">
          (map)
        </text>
        <text x="120" y="146" textAnchor="middle" dominantBaseline="central"
          fill="rgb(93,202,165)" fontSize="11">
          route group
        </text>
      </g>

      <g onClick={() => onNodeClick("marketing-group")} style={groupOpacity("marketing-group", 1)}>
        <rect
          x="250" y="104" width="180" height="56" rx="8"
          fill="rgb(68,68,65)" stroke="rgb(180,178,169)" strokeWidth="0.5"
          {...hl("marketing-group")}
        />
        <text x="340" y="124" textAnchor="middle" dominantBaseline="central"
          fill="rgb(211,209,199)" fontSize="13" fontWeight="500">
          (marketing)
        </text>
        <text x="340" y="146" textAnchor="middle" dominantBaseline="central"
          fill="rgb(180,178,169)" fontSize="11">
          route group
        </text>
      </g>

      <g onClick={() => onNodeClick("api")} style={groupOpacity("api", 1)}>
        <rect
          x="470" y="104" width="180" height="56" rx="8"
          fill="rgb(113,43,19)" stroke="rgb(240,153,123)" strokeWidth="0.5"
          {...hl("api")}
        />
        <text x="560" y="124" textAnchor="middle" dominantBaseline="central"
          fill="rgb(245,196,179)" fontSize="13" fontWeight="500">
          api/
        </text>
        <text x="560" y="146" textAnchor="middle" dominantBaseline="central"
          fill="rgb(240,153,123)" fontSize="11">
          route handlers
        </text>
      </g>

      {/* ── Branch lines: row 2 → row 3 ── */}
      {/* map-group → map-page (includes stem from y=160 to y=180) */}
      <path d="M 120 160 L 120 180 L 60 180 L 60 200" {...connectorProps} />
      {/* map-group → maps-id */}
      <path d="M 120 180 L 180 180 L 180 200" {...connectorProps} />
      {/* marketing-group stem + branches */}
      <path d="M 340 160 L 340 180" {...connectorProps} />
      <path d="M 340 180 L 280 180 L 280 200" {...connectorProps} />
      <path d="M 340 180 L 400 180 L 400 200" {...connectorProps} />
      {/* api stem + branches */}
      <path d="M 560 160 L 560 180" {...connectorProps} />
      <path d="M 560 180 L 500 180 L 500 200" {...connectorProps} />
      <path d="M 560 180 L 620 180 L 620 200" {...connectorProps} />

      {/* ── Row 3: page-level routes ── */}
      <g onClick={() => onNodeClick("map-page")} style={groupOpacity("map-page", 1)}>
        <rect
          x="18" y="200" width="88" height="44" rx="8"
          fill="rgb(8,80,65)" stroke="rgb(93,202,165)" strokeWidth="0.5"
          {...hl("map-page")}
        />
        <text x="62" y="222" textAnchor="middle" dominantBaseline="central"
          fill="rgb(159,225,203)" fontSize="11" fontWeight="500">
          (map)/page.tsx
        </text>
      </g>

      <g onClick={() => onNodeClick("maps-id")} style={groupOpacity("maps-id", 1)}>
        <rect
          x="130" y="200" width="100" height="44" rx="8"
          fill="rgb(8,80,65)" stroke="rgb(93,202,165)" strokeWidth="0.5"
          {...hl("maps-id")}
        />
        <text x="180" y="222" textAnchor="middle" dominantBaseline="central"
          fill="rgb(159,225,203)" fontSize="11" fontWeight="500">
          maps/[id]
        </text>
      </g>

      <g onClick={() => onNodeClick("marketing-page")} style={groupOpacity("marketing-page", 1)}>
        <rect
          x="238" y="200" width="88" height="44" rx="8"
          fill="rgb(68,68,65)" stroke="rgb(180,178,169)" strokeWidth="0.5"
          {...hl("marketing-page")}
        />
        <text x="282" y="222" textAnchor="middle" dominantBaseline="central"
          fill="rgb(211,209,199)" fontSize="11" fontWeight="500">
          (mkt)/page.tsx
        </text>
      </g>

      {/* gallery — static, no onClick */}
      <g>
        <rect
          x="350" y="200" width="100" height="44" rx="8"
          fill="rgb(68,68,65)" stroke="rgb(180,178,169)" strokeWidth="0.5"
        />
        <text x="400" y="222" textAnchor="middle" dominantBaseline="central"
          fill="rgb(211,209,199)" fontSize="11" fontWeight="500">
          gallery
        </text>
      </g>

      <g onClick={() => onNodeClick("ai-route")} style={groupOpacity("ai-route", 1)}>
        <rect
          x="456" y="200" width="92" height="44" rx="8"
          fill="rgb(113,43,19)" stroke="rgb(240,153,123)" strokeWidth="0.5"
          {...hl("ai-route")}
        />
        <text x="502" y="222" textAnchor="middle" dominantBaseline="central"
          fill="rgb(245,196,179)" fontSize="11" fontWeight="500">
          api/ai/
        </text>
      </g>

      <g onClick={() => onNodeClick("export-route")} style={groupOpacity("export-route", 1)}>
        <rect
          x="572" y="200" width="96" height="44" rx="8"
          fill="rgb(113,43,19)" stroke="rgb(240,153,123)" strokeWidth="0.5"
          {...hl("export-route")}
        />
        <text x="620" y="222" textAnchor="middle" dominantBaseline="central"
          fill="rgb(245,196,179)" fontSize="11" fontWeight="500">
          api/export/
        </text>
      </g>

      {/* ── Dashed divider ── */}
      <line
        x1="20" y1="270" x2="660" y2="270"
        stroke="rgba(222,220,209,0.15)" strokeWidth="1" strokeDasharray="4 4"
      />
      <text x="26" y="284" fill="rgb(156,154,146)" fontSize="11">
        special files — all route groups
      </text>

      {/* ── Row 4: special files ── */}
      <g onClick={() => onNodeClick("loading")} style={groupOpacity("loading", 1)}>
        <rect
          x="28" y="296" width="110" height="44" rx="8"
          fill="rgb(12,68,124)" stroke="rgb(133,183,235)" strokeWidth="0.5"
          {...hl("loading")}
        />
        <text x="83" y="318" textAnchor="middle" dominantBaseline="central"
          fill="rgb(181,212,244)" fontSize="12" fontWeight="500">
          loading.tsx
        </text>
      </g>

      <g onClick={() => onNodeClick("error")} style={groupOpacity("error", 1)}>
        <rect
          x="154" y="296" width="110" height="44" rx="8"
          fill="rgb(12,68,124)" stroke="rgb(133,183,235)" strokeWidth="0.5"
          {...hl("error")}
        />
        <text x="209" y="318" textAnchor="middle" dominantBaseline="central"
          fill="rgb(181,212,244)" fontSize="12" fontWeight="500">
          error.tsx
        </text>
      </g>

      <g onClick={() => onNodeClick("not-found")} style={groupOpacity("not-found", 1)}>
        <rect
          x="280" y="296" width="120" height="44" rx="8"
          fill="rgb(12,68,124)" stroke="rgb(133,183,235)" strokeWidth="0.5"
          {...hl("not-found")}
        />
        <text x="340" y="318" textAnchor="middle" dominantBaseline="central"
          fill="rgb(181,212,244)" fontSize="12" fontWeight="500">
          not-found.tsx
        </text>
      </g>

      <g onClick={() => onNodeClick("opengraph-image")} style={groupOpacity("opengraph-image", 1)}>
        <rect
          x="416" y="296" width="120" height="44" rx="8"
          fill="rgb(12,68,124)" stroke="rgb(133,183,235)" strokeWidth="0.5"
          {...hl("opengraph-image")}
        />
        <text x="476" y="318" textAnchor="middle" dominantBaseline="central"
          fill="rgb(181,212,244)" fontSize="12" fontWeight="500">
          opengraph-image
        </text>
      </g>

      <g onClick={() => onNodeClick("sitemap")} style={groupOpacity("sitemap", 1)}>
        <rect
          x="552" y="296" width="110" height="44" rx="8"
          fill="rgb(12,68,124)" stroke="rgb(133,183,235)" strokeWidth="0.5"
          {...hl("sitemap")}
        />
        <text x="607" y="318" textAnchor="middle" dominantBaseline="central"
          fill="rgb(181,212,244)" fontSize="12" fontWeight="500">
          sitemap.ts
        </text>
      </g>

      {/* ── Legend ── */}
      <rect x="28"  y="400" width="10" height="10" rx="2" fill="rgb(60,52,137)" />
      <text x="44"  y="405" dominantBaseline="central" fill="rgb(194,192,182)" fontSize="12">root</text>

      <rect x="100" y="400" width="10" height="10" rx="2" fill="rgb(8,80,65)" />
      <text x="116" y="405" dominantBaseline="central" fill="rgb(194,192,182)" fontSize="12">canvas routes</text>

      <rect x="230" y="400" width="10" height="10" rx="2" fill="rgb(68,68,65)" />
      <text x="246" y="405" dominantBaseline="central" fill="rgb(194,192,182)" fontSize="12">public pages</text>

      <rect x="352" y="400" width="10" height="10" rx="2" fill="rgb(113,43,19)" />
      <text x="368" y="405" dominantBaseline="central" fill="rgb(194,192,182)" fontSize="12">API routes</text>

      <rect x="454" y="400" width="10" height="10" rx="2" fill="rgb(12,68,124)" />
      <text x="470" y="405" dominantBaseline="central" fill="rgb(194,192,182)" fontSize="12">special files</text>

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
