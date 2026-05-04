import { Loader2 } from "lucide-react"

export default function Loading() {
  return (
    <div className="w-full h-full min-h-[50vh] flex flex-col items-center justify-center gap-3">
      <Loader2 className="w-8 h-8 text-[var(--primary)] animate-spin" />
      <p className="text-sm text-[var(--foreground-muted)] animate-pulse">Loading data...</p>
    </div>
  )
}
