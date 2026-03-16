/** Map shell layout — full-height flex container, no navigation chrome.
 *  Left slot reserved for module panels (layers, AI) once those modules are built out.
 *  Right slot is the primary canvas area.
 */
export default function MapLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen w-full overflow-hidden">
      {/* Sidebar — layer/AI panels mount here once modules are ready */}
      <aside className="w-0 shrink-0" />
      <main className="relative flex-1 overflow-hidden">{children}</main>
    </div>
  )
}
