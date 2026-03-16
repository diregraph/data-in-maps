import Link from "next/link"

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="flex items-center justify-between border-b px-6 py-4">
        <Link href="/" className="font-semibold tracking-tight">
          Data In Maps
        </Link>
        <nav>
          <Link
            href="/architecture"
            className="text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            Architecture
          </Link>
        </nav>
      </header>
      <main className="flex-1">{children}</main>
      <footer className="border-t px-6 py-4 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} Data In Maps
      </footer>
    </div>
  )
}
