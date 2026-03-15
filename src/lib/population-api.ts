/** World Bank Indicators API — SP.POP.TOTL (Population, total) */

const WB_BASE = "https://api.worldbank.org/v2"

interface WorldBankRecord {
  country: { id: string; value: string }
  countryiso3code: string
  date: string
  value: number | null
}

/** Returns the most-recent total population keyed by ISO alpha-2 code (e.g. "US", "BR"). */
export async function fetchWorldBankPopulation(): Promise<Record<string, number>> {
  const url =
    `${WB_BASE}/country/all/indicator/SP.POP.TOTL` +
    `?format=json&mrv=1&per_page=300`

  const res = await fetch(url, { next: { revalidate: 86400 } })
  if (!res.ok) throw new Error(`World Bank API error: ${res.status}`)

  // WB returns [metadata, data[]]
  const json = (await res.json()) as [unknown, WorldBankRecord[]]
  const records = json[1] ?? []

  const out: Record<string, number> = {}
  for (const r of records) {
    if (r.value !== null && r.country.id && r.country.id.length === 2) {
      out[r.country.id] = r.value
    }
  }
  return out
}

/** Returns population for a specific year, keyed by ISO alpha-2. */
export async function fetchWorldBankPopulationForYear(
  year: number,
): Promise<Record<string, number>> {
  const url =
    `${WB_BASE}/country/all/indicator/SP.POP.TOTL` +
    `?format=json&date=${year}&per_page=300`

  const res = await fetch(url, { next: { revalidate: 86400 } })
  if (!res.ok) throw new Error(`World Bank API error: ${res.status}`)

  const json = (await res.json()) as [unknown, WorldBankRecord[]]
  const records = json[1] ?? []

  const out: Record<string, number> = {}
  for (const r of records) {
    if (r.value !== null && r.country.id && r.country.id.length === 2) {
      out[r.country.id] = r.value
    }
  }
  return out
}

/** OWID chart API — population data back to ~1800, keyed by ISO alpha-3. */
export async function fetchOWIDPopulation(
  year: number,
): Promise<Record<string, number>> {
  const url =
    `https://ourworldindata.org/grapher/population.csv` +
    `?csvType=filtered&time=${year}&useColumnShortNames=true`

  const res = await fetch(url, { next: { revalidate: 86400 } })
  if (!res.ok) throw new Error(`OWID API error: ${res.status}`)

  const text = await res.text()
  const lines = text.trim().split("\n")
  // header: Entity,Code,Year,population
  const out: Record<string, number> = {}
  for (const line of lines.slice(1)) {
    const [, code, , pop] = line.split(",")
    if (code && code.trim().length === 3 && pop) {
      const n = Number(pop.trim())
      if (!Number.isNaN(n)) out[code.trim()] = n
    }
  }
  return out
}
