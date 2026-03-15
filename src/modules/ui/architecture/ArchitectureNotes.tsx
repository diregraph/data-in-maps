import { readFile } from "fs/promises"
import path from "path"
import { MDXRemote } from "next-mdx-remote/rsc"
import remarkGfm from "remark-gfm"

export async function ArchitectureNotes() {
  const filePath = path.join(
    process.cwd(),
    "content/architecture/notes.mdx"
  )
  const source = await readFile(filePath, "utf8")

  return (
    <section className="mx-auto max-w-3xl px-6 py-12">
      <article className="prose prose-invert prose-sm sm:prose-base max-w-none">
        <MDXRemote source={source} options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }} />
      </article>
    </section>
  )
}
