import type { Metadata } from "next"

import { MapCanvasLoader } from "./MapCanvasLoader"

export const metadata: Metadata = {
  title: "Data In Maps — Interactive World Map",
  description:
    "Explore world data through an interactive map. Country statistics, population, GDP, and more — visualized geographically.",
}

export default function EditorPage() {
  return <MapCanvasLoader />
}
