import { Spinner } from "@/modules/ui"

export default function Loading() {
  return (
    <div className="flex h-screen w-full items-center justify-center">
      <Spinner />
    </div>
  )
}
