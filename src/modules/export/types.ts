export type ExportFormat = "png" | "svg" | "embed"

export interface ExportOptions {
  format: ExportFormat
  filename?: string
}

export interface ExportResult {
  format: ExportFormat
  /** Data URL (PNG/SVG) or plain URL (embed). */
  data: string
}
