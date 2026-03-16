export type ParseResult<T> =
  | { ok: true; data: T }
  | { ok: false; errors: string[] }
