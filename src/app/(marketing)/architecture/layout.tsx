import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Architecture — Data In Maps",
  description: "Interactive diagram of the Data In Maps system architecture.",
};

export default function ArchitectureLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
