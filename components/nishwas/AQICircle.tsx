"use client"

import { useNishwasStore, getAQIColor } from "@/lib/store"
import { Thermometer, Droplets, Wind, CloudRain, ChevronRight } from "lucide-react"
import { motion } from "framer-motion"

export default function AQICircle() {
  const { aqi, aqiLevel, weather, setActivePage } = useNishwasStore()
  const color = getAQIColor(aqi)

  // SVG circle math
  const radius = 72
  const circumference = 2 * Math.PI * radius
  // Map 0–500 AQI to 0–270° arc (starting at 135°)
  const fraction = Math.min(aqi / 500, 1)
  const dash = fraction * (circumference * 0.75)
  const gap = circumference - dash

  return (
    <div className="rounded-2xl bg-[var(--surface)] border border-[var(--border)] p-5 flex flex-col gap-5">
      <div className="flex items-center gap-6">
        {/* Circular AQI gauge */}
        <div className="relative flex items-center justify-center shrink-0">
          <svg width="180" height="180" className="-rotate-[225deg]">
            {/* Track */}
            <circle
              cx="90"
              cy="90"
              r={radius}
              fill="none"
              stroke="var(--surface-2)"
              strokeWidth="10"
              strokeDasharray={`${circumference * 0.75} ${circumference * 0.25}`}
              strokeLinecap="round"
            />
            {/* Progress */}
            <circle
              cx="90"
              cy="90"
              r={radius}
              fill="none"
              stroke={color}
              strokeWidth="10"
              strokeDasharray={`${dash} ${gap}`}
              strokeLinecap="round"
              style={{ transition: "stroke-dasharray 0.6s ease" }}
            />
          </svg>
          <div className="absolute flex flex-col items-center">
            <span className="text-4xl font-bold text-[var(--foreground)]" style={{ color }}>
              {aqi}
            </span>
            <span className="text-xs font-medium mt-0.5" style={{ color }}>
              {aqiLevel}
            </span>
            <span className="text-[10px] text-[var(--foreground-muted)] uppercase tracking-wider mt-0.5">
              Dhaka AQI
            </span>
          </div>
        </div>

        {/* Weather stats */}
        <div className="grid grid-cols-2 gap-3 flex-1">
          {/* Clickable Temperature Card */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setActivePage("Weather")}
            className="flex items-start gap-2 bg-[var(--surface-2)] rounded-xl p-3 text-left group cursor-pointer hover:bg-[var(--surface-2)]/80 transition-colors relative overflow-hidden"
          >
            <span style={{ color: "#f97316" }} className="mt-0.5 shrink-0">
              <Thermometer className="w-3.5 h-3.5" />
            </span>
            <div className="flex-1">
              <p className="text-[9px] text-[var(--foreground-muted)] uppercase tracking-wider leading-tight">
                TEMPERATURE
              </p>
              <p className="text-sm font-semibold text-[var(--foreground)] mt-0.5">
                {weather.temperature}°C
              </p>
            </div>
            <ChevronRight className="w-4 h-4 text-[var(--foreground-muted)] opacity-0 group-hover:opacity-100 transition-opacity absolute right-2 top-1/2 -translate-y-1/2" />
          </motion.button>
          <WeatherStat
            icon={<Droplets className="w-3.5 h-3.5" />}
            label="HUMIDITY"
            value={`${weather.humidity}%`}
            color="#3b82f6"
          />
          <WeatherStat
            icon={<Wind className="w-3.5 h-3.5" />}
            label="WIND SPEED"
            value={`${weather.windSpeed} km/h`}
            color="#10b981"
          />
          <WeatherStat
            icon={<CloudRain className="w-3.5 h-3.5" />}
            label="RAIN CHANCE"
            value={`${weather.rainChance}%`}
            color="#60a5fa"
          />
        </div>
      </div>
    </div>
  )
}

function WeatherStat({
  icon,
  label,
  value,
  color,
}: {
  icon: React.ReactNode
  label: string
  value: string
  color: string
}) {
  return (
    <div className="flex items-start gap-2 bg-[var(--surface-2)] rounded-xl p-3">
      <span style={{ color }} className="mt-0.5 shrink-0">
        {icon}
      </span>
      <div>
        <p className="text-[9px] text-[var(--foreground-muted)] uppercase tracking-wider leading-tight">
          {label}
        </p>
        <p className="text-sm font-semibold text-[var(--foreground)] mt-0.5">
          {value}
        </p>
      </div>
    </div>
  )
}
