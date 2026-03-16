import type { Metadata } from "next"

import { ArchitecturePage } from "@/modules/ui/architecture"
import { getNodeBySlug } from "@/modules/ui/architecture"

interface PageProps {
  params: Promise<{ slug?: string[] }>
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params
  const node = slug ? getNodeBySlug(slug) : null

  return {
    title: node
      ? `${node.label} — Architecture — Data In Maps`
      : "Architecture — Data In Maps",
    description:
      node?.prompt ??
      "Interactive diagram of the Data In Maps system architecture.",
  }
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params
  return <ArchitecturePage slug={slug ?? []} />
}
