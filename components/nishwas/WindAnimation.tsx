"use client"

import { motion } from "framer-motion"
import { Wind } from "lucide-react"

interface WindAnimationProps {
  windSpeed: number
  windDirection?: number // degrees (0-360)
}

export default function WindAnimation({ windSpeed, windDirection = 180 }: WindAnimationProps) {
  // Intensity is speed-based: low (0-5) = slow, high (15+) = fast
  const intensity = Math.min(windSpeed / 20, 1)
  const duration = 2 - intensity * 1.2 // slower for low wind, faster for high

  return (
    <div className="relative w-full h-32 overflow-hidden rounded-xl bg-gradient-to-b from-cyan-900/20 to-transparent flex items-center justify-center">
      {/* Wind stream lines */}
      {[0, 1, 2].map((idx) => (
        <motion.div
          key={idx}
          className="absolute h-0.5 bg-gradient-to-r from-transparent via-cyan-400 to-transparent"
          style={{
            width: "60%",
            top: `${30 + idx * 20}%`,
            rotate: windDirection,
          }}
          animate={{
            x: ["-100%", "100%"],
          }}
          transition={{
            duration,
            repeat: Infinity,
            ease: "linear",
            delay: idx * 0.3,
          }}
        />
      ))}

      {/* Wind particles */}
      {[0, 1, 2, 3, 4].map((idx) => (
        <motion.div
          key={`particle-${idx}`}
          className="absolute w-1 h-1 rounded-full bg-cyan-400"
          style={{
            left: "10%",
            top: `${20 + idx * 15}%`,
            opacity: 0.6,
          }}
          animate={{
            x: [0, 300],
            opacity: [0.6, 0],
          }}
          transition={{
            duration: duration + 0.5,
            repeat: Infinity,
            delay: idx * (duration / 5),
            ease: "linear",
          }}
        />
      ))}

      {/* Center wind indicator */}
      <div className="absolute flex flex-col items-center gap-2">
        <motion.div
          animate={{
            rotate: [windDirection, windDirection + 5, windDirection - 5, windDirection],
          }}
          transition={{
            duration: duration,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <Wind className="w-8 h-8 text-cyan-400" />
        </motion.div>
        <p className="text-sm font-semibold text-cyan-300">{windSpeed} km/h</p>
        {intensity > 0.5 && (
          <p className="text-xs text-cyan-400">
            {intensity > 0.8 ? "Strong wind" : "Moderate wind"}
          </p>
        )}
      </div>
    </div>
  )
}
