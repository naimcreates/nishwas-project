"use client"

import { useNishwasStore, getLevelColor } from "@/lib/store"
import { Info, ArrowRight } from "lucide-react"

export default function PollutantCard() {
  const { primaryPollutant, pollutants } = useNishwasStore()

  return (
    <div className="rounded-2xl bg-[var(--surface)] border border-[var(--border)] p-5 flex flex-col gap-4 h-full">
      {/* Header */}
      <div className="flex items-start justify-between">
        <h3 className="text-sm font-medium text-[var(--foreground-muted)]">
          Primary: {primaryPollutant.name}
        </h3>
        <button
          aria-label="More info"
          className="text-[var(--foreground-dim)] hover:text-[var(--primary)] transition-colors"
        >
          <Info className="w-4 h-4" />
        </button>
      </div>

      {/* Primary value */}
      <div>
        <div className="flex items-baseline gap-1.5">
          <span className="text-4xl font-bold text-[var(--foreground)]">
            {primaryPollutant.value}
          </span>
          <span className="text-xs text-[var(--foreground-muted)]">
            {primaryPollutant.unit}
          </span>
        </div>
        <p className="text-xs text-[var(--foreground-muted)] mt-1.5 leading-relaxed">
          Main pollutant in Dhaka today. Primarily from construction dust and vehicle emissions.
        </p>
      </div>

      {/* Pollutant grid */}
      <div className="grid grid-cols-2 gap-2 flex-1">
        {pollutants.map((p) => {
          const levelColor = getLevelColor(p.level)
          return (
            <div
              key={p.name}
              className="bg-[var(--surface-2)] rounded-xl p-3 flex flex-col gap-1"
            >
              <span className="text-[10px] text-[var(--foreground-muted)] uppercase tracking-wider">
                {p.name}
              </span>
              <div className="flex items-baseline gap-1">
                <span className="text-base font-bold text-[var(--foreground)]">
                  {p.value}
                </span>
                <span className="text-[9px] text-[var(--foreground-dim)]">
                  {p.unit}
                </span>
              </div>
              <span
                className="text-[10px] font-medium"
                style={{ color: levelColor }}
              >
                {p.level}
              </span>
            </div>
          )
        })}
      </div>

      {/* Footer */}
      <button className="flex items-center gap-1.5 text-xs font-medium text-[var(--primary)] hover:text-[var(--primary-dim)] transition-colors group mt-auto">
        Health recommendations
        <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
      </button>
    </div>
  )
}
