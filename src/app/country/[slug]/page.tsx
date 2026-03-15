import type { Metadata } from "next";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const name = slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
  return {
    title: `${name} — Data In Maps`,
    description: `Explore statistics and data for ${name} on Data In Maps.`,
  };
}

export default async function CountryPage({ params }: Props) {
  const { slug } = await params;
  const name = slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());

  return (
    <main className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="text-3xl font-semibold tracking-tight">{name}</h1>
      <p className="mt-4 text-zinc-500">Country data coming soon.</p>
    </main>
  );
}
