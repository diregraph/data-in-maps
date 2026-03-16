import type { Metadata } from "next"

import { notFound } from "next/navigation"

import { RegionExplorerLoader } from "./RegionExplorerLoader"

interface Props {
  params: Promise<{ id: string }>
}

const MAP_TITLES: Record<string, string> = {
  "population-by-regions": "Population by Regions",
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params
  const title = MAP_TITLES[id]
  if (!title) return {}
  return {
    title: `${title} — Data In Maps`,
    description: `Explore ${title.toLowerCase()} on an interactive world map.`,
  }
}

export default async function SharedMapPage({ params }: Props) {
  const { id } = await params

  if (id === "population-by-regions") {
    return <RegionExplorerLoader />
  }

  notFound()
}
