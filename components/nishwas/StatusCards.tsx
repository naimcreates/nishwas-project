"use client"

import { useNishwasStore, getAQIColor } from "@/lib/store"
import { Activity, Waves, Target } from "lucide-react"
import WeatherCard from "./WeatherCard"
import WeatherDetailModal from "./WeatherDetailModal"
import { Cloud } from "lucide-react"

export default function StatusCards() {
  const { aqi, floodRisk, weather, exposureScore, setActivePage } = useNishwasStore()
  const aqiColor = getAQIColor(aqi)

  return (
    <>
      <div className="grid grid-cols-4 gap-3">
        {/* Air Quality Card - Clickable to Exposure page */}
        <button
          onClick={() => setActivePage("Exposure")}
          className="rounded-xl bg-[var(--surface)] border border-[var(--border)] p-4 flex flex-col gap-3 hover:border-[var(--primary)]/30 transition-colors cursor-pointer text-left group"
        >
          <div className="flex items-center justify-between">
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center"
              style={{ backgroundColor: `#f9731618` }}
            >
              <Activity className="w-4 h-4" style={{ color: "#f97316" }} />
            </div>
          </div>
          <div>
            <p className="text-[11px] text-[var(--foreground-muted)] mb-1">Air Quality</p>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-base font-bold text-[var(--foreground)]">Moderate</span>
              <span
                className="text-[10px] font-bold px-1.5 py-0.5 rounded-md"
                style={{ backgroundColor: `${aqiColor}22`, color: aqiColor }}
              >
                AQI {aqi}
              </span>
            </div>
          </div>
        </button>

        {/* Flood Risk Card - Static info card */}
        <div className="rounded-xl bg-[var(--surface)] border border-[var(--border)] p-4 flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center"
              style={{ backgroundColor: `#3b82f618` }}
            >
              <Waves className="w-4 h-4" style={{ color: "#3b82f6" }} />
            </div>
          </div>
          <div>
            <p className="text-[11px] text-[var(--foreground-muted)] mb-1">Flood Risk</p>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-base font-bold text-[var(--foreground)]">{floodRisk}</span>
              <span className="text-[10px] text-green-400">No warnings</span>
            </div>
          </div>
        </div>

        {/* Temperature Card - Interactive, opens Weather page */}
        <WeatherCard
          cardType="temperature"
          icon={Cloud}
          title="Temperature"
          value={`${weather.temperature}°C`}
          badge={<span className="text-[10px] font-bold px-1.5 py-0.5 rounded-md bg-blue-500/10 text-blue-400">Feels +4°C</span>}
          iconColor="#60a5fa"
        />

        {/* Humidity Card - Interactive */}
        <WeatherCard
          cardType="humidity"
          icon={Cloud}
          title="Humidity"
          value={`${weather.humidity}%`}
          badge={<span className="text-[10px] font-bold px-1.5 py-0.5 rounded-md bg-blue-500/10 text-blue-400">Dew 19°C</span>}
          iconColor="#3b82f6"
        />

        {/* Wind Card - Interactive */}
        <WeatherCard
          cardType="wind"
          icon={Cloud}
          title="Wind Speed"
          value={`${weather.windSpeed} km/h`}
          badge={<span className="text-[10px] font-bold px-1.5 py-0.5 rounded-md bg-cyan-500/10 text-cyan-400">Gust 18</span>}
          iconColor="#06b6d4"
        />

        {/* Rain Card - Interactive */}
        <WeatherCard
          cardType="rain"
          icon={Cloud}
          title="Rain Chance"
          value={`${weather.rainChance}%`}
          badge={<span className="text-[10px] font-bold px-1.5 py-0.5 rounded-md bg-blue-500/10 text-blue-400">Light</span>}
          iconColor="#3b82f6"
        />

        {/* Exposure Score Card - Clickable to Exposure page */}
        <button
          onClick={() => setActivePage("Exposure")}
          className="rounded-xl bg-[var(--surface)] border border-[var(--border)] p-4 flex flex-col gap-3 hover:border-[var(--primary)]/30 transition-colors cursor-pointer text-left group"
        >
          <div className="flex items-center justify-between">
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center"
              style={{ backgroundColor: `#f9731618` }}
            >
              <Target className="w-4 h-4" style={{ color: "#f97316" }} />
            </div>
          </div>
          <div>
            <p className="text-[11px] text-[var(--foreground-muted)] mb-1">Exposure Score</p>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-base font-bold text-[var(--foreground)]">High</span>
              <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-md bg-red-500/10 text-red-400">
                {exposureScore}/100
              </span>
            </div>
          </div>
        </button>
      </div>

      {/* Weather Detail Modal */}
      <WeatherDetailModal />
    </>
  )
}
