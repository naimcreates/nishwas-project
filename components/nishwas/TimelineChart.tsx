"use client"

import { useState, useRef, useEffect } from "react"
import { motion } from "framer-motion"
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
  CartesianGrid,
} from "recharts"
import RainOverlay from "./RainOverlay"

interface TimelineChartProps {
  data: Array<{
    time: string
    temp: number
    precip: number
    wind: number
    humidity: number
    pressure: number
    uv: number
    index: number
  }>
  activeTab: string
}

export default function TimelineChart({ data, activeTab }: TimelineChartProps) {
  const [chartDimensions, setChartDimensions] = useState({ width: 0, height: 0 })
  const chartContainerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const updateDimensions = () => {
      if (chartContainerRef.current) {
        const rect = chartContainerRef.current.getBoundingClientRect()
        setChartDimensions({
          width: rect.width,
          height: rect.height,
        })
      }
    }

    updateDimensions()
    window.addEventListener("resize", updateDimensions)
    return () => window.removeEventListener("resize", updateDimensions)
  }, [])

  // Determine what to chart based on activeTab
  let dataKey = "temp"
  let color = "#f97316"
  let label = "Temperature"
  let unit = "°C"

  switch (activeTab) {
    case "Precipitation":
      dataKey = "precip"
      color = "#3b82f6"
      label = "Precipitation"
      unit = "%"
      break
    case "Wind":
      dataKey = "wind"
      color = "#22d3ee"
      label = "Wind Speed"
      unit = " km/h"
      break
    case "Humidity":
      dataKey = "humidity"
      color = "#60a5fa"
      label = "Humidity"
      unit = "%"
      break
    case "Pressure":
      dataKey = "pressure"
      color = "#a855f7"
      label = "Pressure"
      unit = " mb"
      break
    case "UV":
      dataKey = "uv"
      color = "#eab308"
      label = "UV Index"
      unit = ""
      break
    default:
      dataKey = "temp"
      color = "#f97316"
      label = "Temperature"
      unit = "°C"
      break
  }

  const CustomTooltip = (props: any) => {
    const { active, payload } = props
    if (active && payload && payload.length) {
      const pointData = payload[0].payload
      return (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          className="rounded-lg bg-[var(--surface)] border border-[var(--border)] p-3 shadow-lg z-50 relative"
        >
          <p className="text-sm font-semibold text-[var(--foreground)]">
            {pointData.time}
          </p>
          <p className="text-xs mt-1" style={{ color }}>
            {label}: {typeof pointData[dataKey] === 'number' ? pointData[dataKey].toFixed(0) : pointData[dataKey]}{unit}
          </p>
          {activeTab === "Overview" && (
            <p className="text-xs text-blue-400 mt-1">
              Rain: {pointData.precip}%
            </p>
          )}
        </motion.div>
      )
    }
    return null
  }

  return (
    <motion.div
      key={activeTab} // re-animate on tab change
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
      className="rounded-2xl bg-[var(--surface)] border border-[var(--border)] p-6 overflow-hidden relative"
    >
      <h3 className="text-sm font-semibold text-[var(--foreground)] mb-4">
        Hourly Forecast - {activeTab}
      </h3>

      {/* Chart container with rain overlay */}
      <div
        ref={chartContainerRef}
        className="w-full h-72 relative bg-[var(--surface-2)]/30 rounded-xl overflow-hidden"
      >
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
          >
            <defs>
              <linearGradient id="colorDynamic" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={color} stopOpacity={0.8} />
                <stop offset="95%" stopColor={color} stopOpacity={0.1} />
              </linearGradient>
            </defs>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="var(--border)"
              vertical={false}
            />
            <XAxis
              dataKey="time"
              stroke="var(--foreground-muted)"
              style={{ fontSize: "12px" }}
              tick={{ fill: "var(--foreground-muted)" }}
            />
            <YAxis
              stroke="var(--foreground-muted)"
              style={{ fontSize: "12px" }}
              domain={["dataMin - 2", "dataMax + 2"]}
              tick={{ fill: "var(--foreground-muted)" }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Area
              type="monotone"
              dataKey={dataKey}
              stroke={color}
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#colorDynamic)"
              dot={false}
              isAnimationActive={true}
              animationDuration={500}
            />
          </AreaChart>
        </ResponsiveContainer>

        {/* Rain overlays for each segment with precipitation > 30%, ONLY if Overview or Precipitation is active */}
        {(activeTab === "Overview" || activeTab === "Precipitation") && data.map((point, index) => {
          if (point.precip > 30) {
            const segmentWidth = chartDimensions.width / data.length
            const segmentStart = index * segmentWidth
            const segmentEnd = (index + 1) * segmentWidth

            return (
              <motion.div
                key={`rain-${index}`}
                className="absolute top-0 bottom-0 pointer-events-none"
                style={{
                  left: `${(index / data.length) * 100}%`,
                  width: `${(1 / data.length) * 100}%`,
                }}
              >
                <RainOverlay
                  rainProbability={point.precip}
                  chartWidth={segmentWidth}
                  chartHeight={chartDimensions.height}
                  segmentStart={segmentStart}
                  segmentEnd={segmentEnd}
                />
              </motion.div>
            )
          }
          return null
        })}
      </div>

      {/* Legend */}
      <div className="flex items-center justify-between mt-4 text-xs">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: color }} />
            <span className="text-[var(--foreground-muted)]">{label}</span>
          </div>
          {(activeTab === "Overview" || activeTab === "Precipitation") && (
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-blue-400" />
              <span className="text-[var(--foreground-muted)]">
                Precipitation &gt; 30%
              </span>
            </div>
          )}
        </div>
        <span className="text-[var(--foreground-muted)]">
          Hover to see details
        </span>
      </div>
    </motion.div>
  )
}
