"use client"

import { useEffect, useRef } from "react"
import { motion } from "framer-motion"

interface RainDrop {
  id: number
  left: number
  delay: number
  duration: number
}

interface RainOverlayProps {
  rainProbability: number
  chartWidth: number
  chartHeight: number
  segmentStart: number
  segmentEnd: number
}

export default function RainOverlay({
  rainProbability,
  chartWidth,
  chartHeight,
  segmentStart,
  segmentEnd,
}: RainOverlayProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  
  // Only render if rain probability > 30%
  if (rainProbability <= 30) {
    return null
  }

  // Calculate intensity level
  const getIntensity = (prob: number) => {
    if (prob <= 30) return "light"
    if (prob <= 60) return "medium"
    return "heavy"
  }

  const intensity = getIntensity(rainProbability)

  // Calculate number of drops based on intensity
  const getDropCount = () => {
    if (intensity === "light") return 8
    if (intensity === "medium") return 15
    return 25
  }

  const dropCount = getDropCount()

  // Generate rain drops
  const rainDrops: RainDrop[] = Array.from({ length: dropCount }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    delay: Math.random() * 0.5,
    duration: intensity === "heavy" ? 0.6 : intensity === "medium" ? 0.8 : 1.0,
  }))

  return (
    <motion.div
      ref={containerRef}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="absolute inset-0 pointer-events-none overflow-hidden rounded-lg"
      style={{
        background: rainProbability > 60 
          ? "rgba(100, 150, 200, 0.08)" 
          : rainProbability > 30 
          ? "rgba(100, 150, 200, 0.04)" 
          : "transparent",
      }}
    >
      {/* Rain drops */}
      {rainDrops.map((drop) => (
        <motion.div
          key={drop.id}
          className="absolute w-0.5 h-4 bg-gradient-to-b from-blue-400/80 to-blue-300/40 rounded-full"
          initial={{ top: -10, opacity: 0 }}
          animate={{
            top: chartHeight + 20,
            opacity: [0, 0.6, 0],
          }}
          transition={{
            duration: drop.duration,
            delay: drop.delay,
            repeat: Infinity,
            ease: "linear",
          }}
          style={{
            left: `${drop.left}%`,
            filter: "blur(0.5px)",
          }}
        />
      ))}

      {/* Splash effect at bottom */}
      <motion.div
        className="absolute bottom-0 w-full h-6 bg-gradient-to-t from-blue-400/20 to-transparent"
        animate={{
          opacity: [0.2, 0.3, 0.2],
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Rain icon indicator */}
      <div className="absolute top-2 left-2">
        <motion.svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className="text-blue-400"
          animate={{
            opacity: [0.5, 0.8, 0.5],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" />
          <line x1="12" y1="16" x2="12" y2="22" />
          <line x1="16" y1="18" x2="16" y2="24" />
          <line x1="8" y1="18" x2="8" y2="24" />
        </motion.svg>
      </div>

      {/* Rain probability percentage */}
      <div className="absolute top-2 right-2 text-xs font-semibold text-blue-300">
        {Math.round(rainProbability)}%
      </div>
    </motion.div>
  )
}
