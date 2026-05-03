"use client"

import { useNishwasStore, getAQIColor } from "@/lib/store"
import { Cloud, Wind, Droplets, Eye, ShieldCheck, AlertTriangle } from "lucide-react"

const hourlyForecast = [
  { time: "Now", aqi: 142, temp: 32, icon: "☁" },
  { time: "1pm", aqi: 155, temp: 33, icon: "🌤" },
  { time: "2pm", aqi: 148, temp: 34, icon: "☀" },
  { time: "3pm", aqi: 138, temp: 33, icon: "🌤" },
  { time: "4pm", aqi: 128, temp: 31, icon: "⛅" },
  { time: "5pm", aqi: 120, temp: 30, icon: "🌧" },
  { time: "6pm", aqi: 110, temp: 29, icon: "🌧" },
  { time: "7pm", aqi: 105, temp: 28, icon: "🌙" },
]

const recommendations = [
  {
    icon: ShieldCheck,
    color: "#10b981",
    title: "Wear an N95 mask",
    desc: "N95 masks filter 95% of particles including PM2.5. Wear one when commuting.",
  },
  {
    icon: Eye,
    color: "#3b82f6",
    title: "Avoid peak hours (8–10am, 5–7pm)",
    desc: "Traffic pollution peaks during rush hours. Schedule outdoor activities midday.",
  },
  {
    icon: AlertTriangle,
    color: "#eab308",
    title: "Limit strenuous outdoor exercise",
    desc: "High AQI reduces lung capacity. Switch to indoor workouts today.",
  },
]

export default function GoOutsidePage() {
  const { aqi, weather, location } = useNishwasStore()
  const color = getAQIColor(aqi)
  const isOk = aqi <= 100

  return (
    <div className="flex flex-col gap-5 p-6">
      {/* Header card */}
      <div className="rounded-2xl bg-[var(--surface)] border border-[var(--border)] p-6">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-xs text-[var(--foreground-muted)] uppercase tracking-wider mb-1">
              Outdoor Conditions · {location}
            </p>
            <h2 className="text-3xl font-bold text-[var(--foreground)]">
              {isOk ? "Safe to Go Outside" : "Use Caution Outdoors"}
            </h2>
            <p className="text-sm text-[var(--foreground-muted)] mt-1.5">
              Current AQI is{" "}
              <span style={{ color }} className="font-semibold">
                {aqi}
              </span>{" "}
              – {isOk ? "acceptable for most activities" : "sensitive groups should limit exposure"}
            </p>
          </div>
          <div
            className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl"
            style={{ backgroundColor: `${color}18` }}
          >
            {isOk ? "✅" : "⚠️"}
          </div>
        </div>
      </div>

      {/* Conditions row */}
      <div className="grid grid-cols-4 gap-3">
        {[
          { icon: Cloud, label: "Sky", value: "Partly Cloudy", color: "#60a5fa" },
          { icon: Wind, label: "Wind", value: `${weather.windSpeed} km/h NE`, color: "#10b981" },
          { icon: Droplets, label: "Humidity", value: `${weather.humidity}%`, color: "#3b82f6" },
          { icon: Eye, label: "Visibility", value: "6.2 km", color: "#a78bfa" },
        ].map(({ icon: Icon, label, value, color: c }) => (
          <div
            key={label}
            className="rounded-xl bg-[var(--surface)] border border-[var(--border)] p-4 flex items-center gap-3"
          >
            <div
              className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0"
              style={{ backgroundColor: `${c}18` }}
            >
              <Icon className="w-4 h-4" style={{ color: c }} />
            </div>
            <div>
              <p className="text-[10px] text-[var(--foreground-muted)] uppercase tracking-wider">
                {label}
              </p>
              <p className="text-sm font-semibold text-[var(--foreground)]">{value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Hourly forecast */}
      <div className="rounded-2xl bg-[var(--surface)] border border-[var(--border)] p-5">
        <h3 className="text-sm font-semibold text-[var(--foreground)] mb-4">
          Hourly AQI Forecast
        </h3>
        <div className="flex gap-3 overflow-x-auto pb-1">
          {hourlyForecast.map((h) => {
            const c = getAQIColor(h.aqi)
            return (
              <div
                key={h.time}
                className="flex flex-col items-center gap-2 min-w-[70px] bg-[var(--surface-2)] rounded-xl p-3"
              >
                <span className="text-xs text-[var(--foreground-muted)]">{h.time}</span>
                <span className="text-2xl">{h.icon}</span>
                <span className="text-xs text-[var(--foreground-muted)]">{h.temp}°C</span>
                <span
                  className="text-xs font-bold px-1.5 py-0.5 rounded-md"
                  style={{ backgroundColor: `${c}22`, color: c }}
                >
                  {h.aqi}
                </span>
              </div>
            )
          })}
        </div>
      </div>

      {/* Recommendations */}
      <div className="rounded-2xl bg-[var(--surface)] border border-[var(--border)] p-5">
        <h3 className="text-sm font-semibold text-[var(--foreground)] mb-4">
          Recommendations
        </h3>
        <div className="flex flex-col gap-3">
          {recommendations.map(({ icon: Icon, color: c, title, desc }) => (
            <div
              key={title}
              className="flex items-start gap-4 bg-[var(--surface-2)] rounded-xl p-4"
            >
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 mt-0.5"
                style={{ backgroundColor: `${c}18` }}
              >
                <Icon className="w-4 h-4" style={{ color: c }} />
              </div>
              <div>
                <p className="text-sm font-semibold text-[var(--foreground)]">{title}</p>
                <p className="text-xs text-[var(--foreground-muted)] mt-0.5 leading-relaxed">
                  {desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
