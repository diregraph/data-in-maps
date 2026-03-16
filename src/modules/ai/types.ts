export interface MapConfigRequest {
  query: string
  context?: Record<string, unknown>
}

// TODO: define the validated map configuration shape (mirrors data/schemas/map-config)
export type MapConfigResponse = Record<string, unknown>
