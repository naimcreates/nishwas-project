"use client"

import { useNishwasStore, getAQIColor } from "@/lib/store"
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts"

const weeklyData = [
  { day: "Mon", aqi: 118, exposure: 52 },
  { day: "Tue", aqi: 135, exposure: 61 },
  { day: "Wed", aqi: 125, exposure: 56 },
  { day: "Thu", aqi: 142, exposure: 64 },
  { day: "Fri", aqi: 160, exposure: 72 },
  { day: "Sat", aqi: 148, exposure: 67 },
  { day: "Sun", aqi: 138, exposure: 60 },
]

export default function ExposurePage() {
  const { exposureScore, exposureHistory } = useNishwasStore()
  const color = getAQIColor(exposureScore * 2)

  return (
    <div className="flex flex-col gap-5 p-6">
      {/* Score card */}
      <div className="grid grid-cols-3 gap-4">
        <div className="col-span-1 rounded-2xl bg-[var(--surface)] border border-[var(--border)] p-6 flex flex-col items-center justify-center gap-3">
          <p className="text-xs text-[var(--foreground-muted)] uppercase tracking-wider">
            Today&apos;s Exposure Score
          </p>
          <div className="relative w-28 h-28 flex items-center justify-center">
            <svg viewBox="0 0 100 100" className="w-28 h-28 -rotate-90">
              <circle cx="50" cy="50" r="42" fill="none" stroke="var(--surface-2)" strokeWidth="9" />
              <circle
                cx="50"
                cy="50"
                r="42"
                fill="none"
                stroke={color}
                strokeWidth="9"
                strokeDasharray={`${(exposureScore / 100) * 264} 264`}
                strokeLinecap="round"
              />
            </svg>
            <div className="absolute flex flex-col items-center">
              <span className="text-3xl font-bold" style={{ color }}>
                {exposureScore}
              </span>
              <span className="text-[10px] text-[var(--foreground-muted)]">/100</span>
            </div>
          </div>
          <span
            className="text-sm font-semibold px-3 py-1 rounded-full"
            style={{ backgroundColor: `${color}18`, color }}
          >
            High Exposure
          </span>
        </div>

        <div className="col-span-2 rounded-2xl bg-[var(--surface)] border border-[var(--border)] p-5">
          <h3 className="text-sm font-semibold text-[var(--foreground)] mb-4">
            Hourly Exposure Today
          </h3>
          <ResponsiveContainer width="100%" height={160}>
            <AreaChart data={exposureHistory}>
              <defs>
                <linearGradient id="exposureGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid stroke="var(--border)" strokeDasharray="3 3" />
              <XAxis
                dataKey="time"
                tick={{ fill: "var(--foreground-muted)", fontSize: 11 }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                tick={{ fill: "var(--foreground-muted)", fontSize: 11 }}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "var(--surface)",
                  border: "1px solid var(--border)",
                  borderRadius: 8,
                  color: "var(--foreground)",
                  fontSize: 12,
                }}
              />
              <Area
                type="monotone"
                dataKey="exposure"
                stroke="#10b981"
                strokeWidth={2}
                fill="url(#exposureGrad)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Weekly AQI bar chart */}
      <div className="rounded-2xl bg-[var(--surface)] border border-[var(--border)] p-5">
        <h3 className="text-sm font-semibold text-[var(--foreground)] mb-4">
          Weekly AQI Trend
        </h3>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={weeklyData} barSize={28}>
            <CartesianGrid stroke="var(--border)" strokeDasharray="3 3" vertical={false} />
            <XAxis
              dataKey="day"
              tick={{ fill: "var(--foreground-muted)", fontSize: 11 }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              tick={{ fill: "var(--foreground-muted)", fontSize: 11 }}
              axisLine={false}
              tickLine={false}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "var(--surface)",
                border: "1px solid var(--border)",
                borderRadius: 8,
                color: "var(--foreground)",
                fontSize: 12,
              }}
            />
            <Bar dataKey="aqi" fill="#f97316" radius={[4, 4, 0, 0]} opacity={0.85} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Tips */}
      <div className="rounded-2xl bg-[var(--surface)] border border-[var(--border)] p-5">
        <h3 className="text-sm font-semibold text-[var(--foreground)] mb-3">
          Reduce Your Exposure
        </h3>
        <div className="grid grid-cols-2 gap-3">
          {[
            { tip: "Use air purifiers with HEPA filters at home", icon: "🏠" },
            { tip: "Keep windows closed during peak pollution hours", icon: "🪟" },
            { tip: "Plant indoor air-purifying plants", icon: "🌿" },
            { tip: "Monitor real-time AQI before outdoor activities", icon: "📱" },
          ].map(({ tip, icon }) => (
            <div
              key={tip}
              className="flex items-start gap-3 bg-[var(--surface-2)] rounded-xl p-3"
            >
              <span className="text-xl shrink-0">{icon}</span>
              <p className="text-xs text-[var(--foreground-muted)] leading-relaxed">{tip}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
