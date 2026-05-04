"use client"

import dynamic from "next/dynamic"

const TempMap = dynamic(() => import("./TempMapInner"), {
  ssr: false,
  loading: () => (
    <div className="h-96 w-full rounded-2xl bg-[var(--surface-2)] animate-pulse flex items-center justify-center border border-[var(--border)]">
      <span className="text-[var(--foreground-muted)] text-sm">Loading temperature map...</span>
    </div>
  ),
})

export default function TemperatureMap() {
  return (
    <div className="rounded-2xl bg-[var(--surface)] border border-[var(--border)] hover:border-[var(--primary)]/30 transition-colors duration-500 overflow-hidden group">
      <div className="flex items-center px-5 py-4 border-b border-[var(--border)] gap-2 bg-[var(--surface-2)] group-hover:bg-[var(--surface)] transition-colors duration-500">
        <svg className="w-4 h-4 text-[var(--primary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
        </svg>
        <h2 className="text-sm font-semibold text-[var(--foreground)] group-hover:text-[var(--primary)] transition-colors">Bangladesh Temperature Heatmap</h2>
      </div>
      <div className="relative h-96">
        <TempMap />
      </div>
    </div>
  )
}
