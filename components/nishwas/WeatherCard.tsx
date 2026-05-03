"use client"

import { motion } from "framer-motion"
import { useNishwasStore } from "@/lib/store"

interface WeatherCardProps {
  cardType: "temperature" | "humidity" | "wind" | "rain"
  icon: React.ComponentType<{ className: string; style?: React.CSSProperties }>
  title: string
  value: string | number
  badge: React.ReactNode
  iconColor: string
}

export default function WeatherCard({
  cardType,
  icon: Icon,
  title,
  value,
  badge,
  iconColor,
}: WeatherCardProps) {
  const { activeWeatherCard, setActiveWeatherCard } = useNishwasStore()
  const isActive = activeWeatherCard === cardType

  return (
    <motion.div
      onClick={() => setActiveWeatherCard(isActive ? null : cardType)}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.2 }}
      className={`rounded-xl border p-4 flex flex-col gap-3 cursor-pointer group transition-all duration-300 ${
        isActive
          ? "bg-[var(--surface-elevated)] border-[var(--primary)]/50 shadow-lg shadow-[var(--primary)]/20"
          : "bg-[var(--surface)] border-[var(--border)] hover:border-[var(--primary)]/30"
      }`}
    >
      <div className="flex items-center justify-between">
        <div
          className="w-8 h-8 rounded-lg flex items-center justify-center"
          style={{ backgroundColor: `${iconColor}18` }}
        >
          <Icon className="w-4 h-4" style={{ color: iconColor }} />
        </div>
        <motion.button
          aria-label="More info"
          className="opacity-0 group-hover:opacity-100 transition-opacity text-[var(--foreground-dim)]"
          animate={{ rotate: isActive ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <circle cx="7" cy="2" r="1.2" fill="currentColor" />
            <circle cx="7" cy="7" r="1.2" fill="currentColor" />
            <circle cx="7" cy="12" r="1.2" fill="currentColor" />
          </svg>
        </motion.button>
      </div>
      <div>
        <p className="text-[11px] text-[var(--foreground-muted)] mb-1">{title}</p>
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-base font-bold text-[var(--foreground)]">{value}</span>
          {badge}
        </div>
      </div>
    </motion.div>
  )
}
