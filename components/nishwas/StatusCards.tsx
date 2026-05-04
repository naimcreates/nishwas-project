"use client"

import { useNishwasStore, getAQIColor } from "@/lib/store"
import { Activity, Waves, Target, ArrowRight } from "lucide-react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import WindAnimation from "./WindAnimation"
import RainAnimation from "./RainAnimation"
import { TemperatureAnimation, HumidityAnimation } from "./WeatherAnimations"

export default function StatusCards() {
  const { aqi, aqiLevel, floodRisk, weather, exposureScore } = useNishwasStore()
  const router = useRouter()
  const aqiColor = getAQIColor(aqi)

  const exposureLevel = exposureScore > 75 ? "Very High" : exposureScore > 50 ? "High" : exposureScore > 25 ? "Moderate" : "Low"

  return (
    <div className="flex flex-col gap-6">
      {/* Non-Weather Status Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Air Quality Card */}
        <button
          onClick={() => router.push("/exposure")}
          className="rounded-2xl bg-[var(--surface)] border border-[var(--border)] p-4 flex flex-col gap-3 hover:border-[var(--primary)]/30 transition-colors cursor-pointer text-left group"
        >
          <div className="flex items-center justify-between">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-orange-500/10 text-orange-500">
              <Activity className="w-5 h-5" />
            </div>
            <ArrowRight className="w-4 h-4 text-[var(--foreground-muted)] opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
          <div>
            <p className="text-xs font-semibold text-[var(--foreground-muted)] uppercase tracking-wider mb-1">Air Quality</p>
            <div className="flex items-end gap-2">
              <span className="text-xl font-bold text-[var(--foreground)]">{aqiLevel}</span>
              <span className="text-xs font-bold px-2 py-0.5 rounded-md mb-1" style={{ backgroundColor: `${aqiColor}22`, color: aqiColor }}>
                AQI {aqi}
              </span>
            </div>
          </div>
        </button>

        {/* Flood Risk Card */}
        <div className="rounded-2xl bg-[var(--surface)] border border-[var(--border)] p-4 flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-blue-500/10 text-blue-500">
              <Waves className="w-5 h-5" />
            </div>
          </div>
          <div>
            <p className="text-xs font-semibold text-[var(--foreground-muted)] uppercase tracking-wider mb-1">Flood Risk</p>
            <div className="flex items-end gap-2">
              <span className="text-xl font-bold text-[var(--foreground)]">{floodRisk}</span>
              <span className="text-xs font-semibold text-green-400 mb-1">No warnings</span>
            </div>
          </div>
        </div>

        {/* Exposure Score Card */}
        <button
          onClick={() => router.push("/exposure")}
          className="rounded-2xl bg-[var(--surface)] border border-[var(--border)] p-4 flex flex-col gap-3 hover:border-[var(--primary)]/30 transition-colors cursor-pointer text-left group"
        >
          <div className="flex items-center justify-between">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-red-500/10 text-red-500">
              <Target className="w-5 h-5" />
            </div>
            <ArrowRight className="w-4 h-4 text-[var(--foreground-muted)] opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
          <div>
            <p className="text-xs font-semibold text-[var(--foreground-muted)] uppercase tracking-wider mb-1">Exposure Score</p>
            <div className="flex items-end gap-2">
              <span className="text-xl font-bold text-[var(--foreground)]">{exposureLevel}</span>
              <span className="text-xs font-bold px-2 py-0.5 rounded-md bg-red-500/10 text-red-500 mb-1">
                {exposureScore}/100
              </span>
            </div>
          </div>
        </button>
      </div>

      {/* MSN Weather Style Animated Detail Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        
        {/* Temperature Details */}
        <motion.div 
          onClick={() => router.push("/weather")}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="rounded-2xl bg-[var(--surface)] border border-[var(--border)] overflow-hidden cursor-pointer flex flex-col hover:border-[var(--primary)]/30 transition-colors group"
        >
          <div className="p-4 pb-2 flex justify-between items-center">
            <p className="text-xs font-semibold text-[var(--foreground-muted)] uppercase tracking-wider">Temperature</p>
            <ArrowRight className="w-3.5 h-3.5 text-[var(--foreground-muted)] opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
          <div className="px-4 pb-3">
             <div className="flex items-baseline gap-2">
                <span className="text-2xl font-bold text-[var(--foreground)]">{weather.temperature}°C</span>
                <span className="text-xs text-[var(--foreground-muted)]">Feels {weather.temperature + 4}°C</span>
             </div>
             <p className="text-[11px] text-[var(--foreground-muted)] mt-1">High 34° • Low 25°</p>
          </div>
          <div className="mt-auto pointer-events-none p-2 pt-0">
             <TemperatureAnimation temperature={weather.temperature} hideText={true} />
          </div>
        </motion.div>

        {/* Wind Details */}
        <motion.div 
          onClick={() => router.push("/weather")}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="rounded-2xl bg-[var(--surface)] border border-[var(--border)] overflow-hidden cursor-pointer flex flex-col hover:border-[var(--primary)]/30 transition-colors group"
        >
          <div className="p-4 pb-2 flex justify-between items-center">
            <p className="text-xs font-semibold text-[var(--foreground-muted)] uppercase tracking-wider">Wind</p>
            <ArrowRight className="w-3.5 h-3.5 text-[var(--foreground-muted)] opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
          <div className="px-4 pb-3">
             <div className="flex items-baseline gap-2">
                <span className="text-2xl font-bold text-[var(--foreground)]">{weather.windSpeed}</span>
                <span className="text-xs text-[var(--foreground-muted)]">km/h</span>
             </div>
             <p className="text-[11px] text-[var(--foreground-muted)] mt-1">Direction: South (180°)</p>
          </div>
          <div className="mt-auto pointer-events-none p-2 pt-0">
             <WindAnimation windSpeed={weather.windSpeed} windDirection={180} hideText={true} />
          </div>
        </motion.div>

        {/* Rain Details */}
        <motion.div 
          onClick={() => router.push("/weather")}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="rounded-2xl bg-[var(--surface)] border border-[var(--border)] overflow-hidden cursor-pointer flex flex-col hover:border-[var(--primary)]/30 transition-colors group"
        >
          <div className="p-4 pb-2 flex justify-between items-center">
            <p className="text-xs font-semibold text-[var(--foreground-muted)] uppercase tracking-wider">Precipitation</p>
            <ArrowRight className="w-3.5 h-3.5 text-[var(--foreground-muted)] opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
          <div className="px-4 pb-3">
             <div className="flex items-baseline gap-2">
                <span className="text-2xl font-bold text-[var(--foreground)]">{weather.rainChance}%</span>
                <span className="text-xs text-[var(--foreground-muted)]">chance</span>
             </div>
             <p className="text-[11px] text-[var(--foreground-muted)] mt-1">Timeline: None expected</p>
          </div>
          <div className="mt-auto pointer-events-none p-2 pt-0">
             <RainAnimation rainProbability={weather.rainChance} hideText={true} />
          </div>
        </motion.div>

        {/* Humidity Details */}
        <motion.div 
          onClick={() => router.push("/weather")}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="rounded-2xl bg-[var(--surface)] border border-[var(--border)] overflow-hidden cursor-pointer flex flex-col hover:border-[var(--primary)]/30 transition-colors group"
        >
          <div className="p-4 pb-2 flex justify-between items-center">
            <p className="text-xs font-semibold text-[var(--foreground-muted)] uppercase tracking-wider">Humidity</p>
            <ArrowRight className="w-3.5 h-3.5 text-[var(--foreground-muted)] opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
          <div className="px-4 pb-3">
             <div className="flex items-baseline gap-2">
                <span className="text-2xl font-bold text-[var(--foreground)]">{weather.humidity}%</span>
             </div>
             <p className="text-[11px] text-[var(--foreground-muted)] mt-1">Comfort: Very Humid</p>
          </div>
          <div className="mt-auto pointer-events-none p-2 pt-0">
             <HumidityAnimation humidity={weather.humidity} hideText={true} />
          </div>
        </motion.div>

      </div>
    </div>
  )
}
