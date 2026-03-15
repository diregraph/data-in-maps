import Link from "next/link"
import { ArchitectureViewer } from "./ArchitectureViewer"
import { NodeContent } from "./NodeContent"
import { getNodeBySlug } from "./nodes"
import type { NodeId } from "./nodes"

interface ArchitecturePageProps {
  slug: string[]
}

export function ArchitecturePage({ slug }: ArchitecturePageProps) {
  const activeNodeId = slug.length > 0 ? (slug[0] as NodeId) : undefined

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

      <ArchitectureViewer activeNodeId={activeNodeId} />

      <NodeContent slug={slug} />
    </main>
  )
}
