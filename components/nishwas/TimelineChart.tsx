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
    index: number
  }>
}

export default function TimelineChart({ data }: TimelineChartProps) {
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

  const CustomTooltip = (props: any) => {
    const { active, payload } = props
    if (active && payload && payload.length) {
      const data = payload[0].payload
      return (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          className="rounded-lg bg-[var(--surface)] border border-[var(--border)] p-3 shadow-lg"
        >
          <p className="text-sm font-semibold text-[var(--foreground)]">
            {data.time}
          </p>
          <p className="text-xs text-[var(--foreground-muted)] mt-1">
            Temperature: {data.temp}°C
          </p>
          <p className="text-xs text-blue-400 mt-1">
            Rain: {data.precip}%
          </p>
        </motion.div>
      )
    }
    return null
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.15 }}
      className="rounded-2xl bg-[var(--surface)] border border-[var(--border)] p-6 overflow-hidden"
    >
      <h3 className="text-sm font-semibold text-[var(--foreground)] mb-4">
        Hourly Forecast with Precipitation
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
              <linearGradient id="colorTemp" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#f97316" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#f97316" stopOpacity={0.1} />
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
              dataKey="temp"
              stroke="#f97316"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#colorTemp)"
              dot={false}
              isAnimationActive={false}
            />
          </AreaChart>
        </ResponsiveContainer>

        {/* Rain overlays for each segment with precipitation > 30% */}
        {data.map((point, index) => {
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
            <div className="w-3 h-3 rounded-full bg-[#f97316]" />
            <span className="text-[var(--foreground-muted)]">Temperature</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-blue-400" />
            <span className="text-[var(--foreground-muted)]">
              Precipitation &gt; 30%
            </span>
          </div>
        </div>
        <span className="text-[var(--foreground-muted)]">
          Hover to see details
        </span>
      </div>
    </motion.div>
  )
}
