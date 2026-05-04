"use client"

import { useNishwasStore, getAQIColor } from "@/lib/store"
import { Thermometer, Droplets, Wind, CloudRain, ChevronRight, Sun, Cloud, Moon } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { useRouter } from "next/navigation"

// Live animated icon based on weather condition
function LiveWeatherIcon({ weather }: { weather: any }) {
  if (weather.rainChance > 40 || weather.condition.toLowerCase().includes("rain")) {
    return (
      <div className="relative w-16 h-16 flex items-center justify-center">
        <motion.div animate={{ y: [0, -4, 0] }} transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}>
          <Cloud className="w-12 h-12 text-slate-400 drop-shadow-md" fill="currentColor" />
        </motion.div>
        {/* Raindrops */}
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="absolute w-1.5 h-3 bg-blue-400/80 rounded-full"
            style={{ left: `${30 + i * 20}%`, top: "60%" }}
            animate={{ y: [0, 15, 0], opacity: [0, 1, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.2 }}
          />
        ))}
      </div>
    )
  }

  if (weather.temperature > 30 || weather.condition.toLowerCase().includes("sun") || weather.condition.toLowerCase().includes("clear")) {
    return (
      <div className="relative w-16 h-16 flex items-center justify-center">
        {/* Pulsing glow */}
        <motion.div
          className="absolute inset-0 bg-yellow-500/20 rounded-full blur-xl"
          animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0.8, 0.5] }}
          transition={{ duration: 4, repeat: Infinity }}
        />
        <motion.div animate={{ rotate: 360 }} transition={{ duration: 20, repeat: Infinity, ease: "linear" }}>
          <Sun className="w-12 h-12 text-yellow-400 drop-shadow-[0_0_10px_rgba(250,204,21,0.5)]" fill="currentColor" />
        </motion.div>
      </div>
    )
  }

  return (
    <div className="relative w-16 h-16 flex items-center justify-center">
      <motion.div
        className="absolute -top-1 -right-1"
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 4, repeat: Infinity }}
      >
        <Sun className="w-8 h-8 text-yellow-400" fill="currentColor" />
      </motion.div>
      <motion.div animate={{ x: [-2, 2, -2] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}>
        <Cloud className="w-12 h-12 text-slate-200 drop-shadow-md" fill="currentColor" />
      </motion.div>
    </div>
  )
}

export default function AQICircle() {
  const { aqi, aqiLevel, weather } = useNishwasStore()
  const router = useRouter()
  const color = getAQIColor(aqi)

  // SVG circle math
  const radius = 72
  const circumference = 2 * Math.PI * radius
  // Map 0–500 AQI to 0–270° arc (starting at 135°)
  const fraction = Math.min(aqi / 500, 1)
  const dash = fraction * (circumference * 0.75)
  const gap = circumference - dash

  return (
    <div className="rounded-2xl bg-[var(--surface)] border border-[var(--border)] p-5 flex flex-col gap-5 h-full justify-center">
      <div className="flex flex-col md:flex-row items-center gap-8">
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
            <span className="text-xs font-medium mt-0.5 text-center px-2" style={{ color }}>
              {aqiLevel}
            </span>
            <span className="text-[10px] text-[var(--foreground-muted)] uppercase tracking-wider mt-0.5">
              Dhaka AQI
            </span>
          </div>
        </div>

        {/* Live Weather Overview & Stats */}
        <div className="flex-1 flex flex-col sm:flex-row gap-6 items-center w-full">
          
          {/* Main Weather Overview */}
          <motion.div 
            onClick={() => router.push("/weather")}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex-shrink-0 flex flex-col items-center justify-center p-4 rounded-2xl bg-[var(--surface-2)] border border-[var(--border)] hover:border-[var(--primary)]/30 cursor-pointer transition-colors shadow-sm min-w-[140px] w-full sm:w-auto h-full"
          >
            <LiveWeatherIcon weather={weather} />
            <div className="text-center mt-2">
              <div className="text-2xl font-bold text-[var(--foreground)] flex items-start justify-center">
                {weather.temperature}<span className="text-sm mt-1">°C</span>
              </div>
              <p className="text-xs font-medium text-[var(--foreground-muted)] mt-0.5">{weather.condition}</p>
            </div>
          </motion.div>

          {/* Compact Weather Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 flex-1 h-full w-full">
            <WeatherStat
              icon={<Thermometer className="w-4 h-4" />}
              label="FEELS LIKE"
              value={`${weather.temperature + 4}°C`}
              color="#f97316"
              detail="Hot & Humid"
            />
            <WeatherStat
              icon={<Droplets className="w-4 h-4" />}
              label="HUMIDITY"
              value={`${weather.humidity}%`}
              color="#3b82f6"
              detail="Dew point 22°"
            />
            <WeatherStat
              icon={<Wind className="w-4 h-4" />}
              label="WIND"
              value={`${weather.windSpeed} km/h`}
              color="#22d3ee"
              detail="From South"
            />
            <WeatherStat
              icon={<CloudRain className="w-4 h-4" />}
              label="RAIN CHANCE"
              value={`${weather.rainChance}%`}
              color="#818cf8"
              detail="Light showers"
            />
          </div>
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
  detail,
}: {
  icon: React.ReactNode
  label: string
  value: string
  color: string
  detail?: string
}) {
  return (
    <div className="flex items-center gap-3 bg-[var(--surface-2)] border border-transparent hover:border-[var(--border)] rounded-xl p-3 transition-colors h-full">
      <div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0" style={{ backgroundColor: `${color}15`, color }}>
        {icon}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-[10px] text-[var(--foreground-muted)] uppercase tracking-wider font-semibold">
          {label}
        </p>
        <div className="flex items-baseline gap-1.5 mt-0.5">
          <p className="text-sm font-bold text-[var(--foreground)] truncate">
            {value}
          </p>
        </div>
        {detail && (
          <p className="text-[10px] text-[var(--foreground-muted)] truncate mt-0.5">
            {detail}
          </p>
        )}
      </div>
    </div>
  )
}
