import { NextResponse } from "next/server"
import { fetchWorldBankPopulation } from "@/lib/population-api"

export const revalidate = 86400 // 24 h ISR

export async function GET() {
  try {
    const data = await fetchWorldBankPopulation()
    return NextResponse.json(data)
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error"
    return NextResponse.json({ error: message }, { status: 502 })
  }
}
