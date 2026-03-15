import { useEffect, useState } from "react"

interface PopulationState {
  /** ISO alpha-2 → population count */
  data: Record<string, number> | null
  loading: boolean
  error: string | null
}

/**
 * Fetches current world population data from the /api/population route,
 * which proxies the World Bank SP.POP.TOTL indicator (updated daily).
 * Returns a map of ISO alpha-2 country codes to population counts.
 */
export function useCountryPopulation(): PopulationState {
  const [state, setState] = useState<PopulationState>({
    data: null,
    loading: true,
    error: null,
  })

  useEffect(() => {
    let cancelled = false

    fetch("/api/population")
      .then(res => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`)
        return res.json() as Promise<Record<string, number>>
      })
      .then(data => {
        if (!cancelled) setState({ data, loading: false, error: null })
      })
      .catch((err: unknown) => {
        if (!cancelled) {
          const message = err instanceof Error ? err.message : "Failed to load population data"
          setState({ data: null, loading: false, error: message })
        }
      })

    return () => { cancelled = true }
  }, [])

  return state
}
