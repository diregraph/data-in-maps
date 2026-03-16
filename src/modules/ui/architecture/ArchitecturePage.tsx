import Link from "next/link"
import { DiagramViewer } from "./DiagramViewer"
import { NodeContent } from "./NodeContent"
import { getNodeBySlug, NODES } from "./nodes"
import type { ArchNodeConfig } from "./nodes"

interface ArchitecturePageProps {
  slug: string[]
}

function resolveViewer(slug: string[]) {
  let viewerKey = "root"
  let basePath = "/architecture"
  let activeNodeId: string | undefined = slug[0]

  let children: Record<string, ArchNodeConfig> = NODES

  for (let i = 0; i < slug.length; i++) {
    const segment = slug[i]
    const node = children[segment]
    if (!node) break

    if (node.viewerKey) {
      viewerKey = node.viewerKey
      basePath = "/architecture/" + slug.slice(0, i + 1).join("/")
      activeNodeId = slug[i + 1]
    }

    children = node.children ?? {}
  }

  return (
    <DiagramViewer
      viewerKey={viewerKey}
      basePath={basePath}
      activeNodeId={activeNodeId}
    />
  )
}

export function ArchitecturePage({ slug }: ArchitecturePageProps) {
  return (
    <main className="bg-[#1a1916] min-h-screen">
      <nav
        aria-label="Breadcrumb"
        className="flex items-center gap-1.5 px-8 pt-6 pb-2 text-sm text-[rgb(156,154,146)]"
      >
        {slug.length === 0 ? (
          <span className="text-[rgb(211,209,199)]">Architecture</span>
        ) : (
          <>
            <Link
              href="/architecture"
              className="transition-colors hover:text-[rgb(211,209,199)]"
            >
              Architecture
            </Link>
            {slug.map((segment, i) => {
              const partial = slug.slice(0, i + 1)
              const node = getNodeBySlug(partial)
              const label = node?.label ?? segment
              const isLast = i === slug.length - 1

              return (
                <span key={segment} className="flex items-center gap-1.5">
                  <span>/</span>
                  {isLast ? (
                    <span className="text-[rgb(211,209,199)]">{label}</span>
                  ) : (
                    <Link
                      href={"/architecture/" + partial.join("/")}
                      className="transition-colors hover:text-[rgb(211,209,199)]"
                    >
                      {label}
                    </Link>
                  )}
                </span>
              )
            })}
          </>
        )}
      </nav>

      {resolveViewer(slug)}

      <NodeContent slug={slug} />
    </main>
  )
}
