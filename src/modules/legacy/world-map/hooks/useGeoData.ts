"use client"

import { useEffect, useState } from "react"

import type { FeatureCollection } from "geojson"
import * as topojson from "topojson-client"
import type { Objects, Topology } from "topojson-specification"

import type { GeoData } from "../types"

interface UseGeoDataResult {
  geo: GeoData | null
  loading: boolean
  error: boolean
}

export function useGeoData(): UseGeoDataResult {
  const [geo, setGeo] = useState<GeoData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    let cancelled = false
    async function load() {
      try {
        const res = await fetch(
          "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json",
        )
        const world = (await res.json()) as Topology<Objects>
        if (!cancelled) {
          const countries = world.objects["countries"]
          if (!countries) throw new Error("countries object missing")
          setGeo({
            countries: (topojson.feature(world, countries) as FeatureCollection)
              .features,
            borders: topojson.mesh(world, countries, (a, b) => a !== b),
          })
        }
      } catch {
        if (!cancelled) setError(true)
      } finally {
        if (!cancelled) setLoading(false)
      }
    }
    load()
    return () => {
      cancelled = true
    }
  }, [])

  return { geo, loading, error }
}
