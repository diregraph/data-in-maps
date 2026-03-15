import { readFile } from "fs/promises"
import path from "path"
import { MDXRemote } from "next-mdx-remote/rsc"
import remarkGfm from "remark-gfm"

interface NodeContentProps {
  /** Empty array = root (content/architecture/notes.mdx).
   *  Non-empty = content/architecture/[...slug]/notes.mdx */
  slug: string[]
}

export async function NodeContent({ slug }: NodeContentProps) {
  const segments =
    slug.length === 0
      ? ["notes.mdx"]
      : [...slug, "notes.mdx"]

  const filePath = path.join(process.cwd(), "content", "architecture", ...segments)

  let source: string
  try {
    source = await readFile(filePath, "utf8")
  } catch {
    return (
      <section className="mx-auto max-w-3xl px-6 py-12">
        <p className="text-[rgb(156,154,146)] text-sm">No documentation yet.</p>
      </section>
    )
  }

  return (
    <section className="mx-auto max-w-3xl px-6 py-12">
      <article className="prose prose-invert prose-sm sm:prose-base max-w-none">
        <MDXRemote
          source={source}
          options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }}
        />
      </article>
    </section>
  )
}
