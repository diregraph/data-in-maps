"use client";

import dynamic from "next/dynamic";

const WorldMap = dynamic(() => import("./WorldMap"), {
  ssr: false,
  loading: () => (
    <div className="flex h-screen w-full items-center justify-center bg-zinc-100 text-zinc-500 text-sm">
      Loading map…
    </div>
  ),
});

export default function MapWrapper() {
  return <WorldMap />;
}
