"use client"

import { motion } from "framer-motion"
import { Wind } from "lucide-react"

interface WindAnimationProps {
  windSpeed: number
  windDirection?: number // degrees (0-360)
  hideText?: boolean
}

export default function WindAnimation({ windSpeed, windDirection = 180, hideText }: WindAnimationProps) {
  // Intensity is speed-based: low (0-5) = slow, high (15+) = fast
  const intensity = Math.min(windSpeed / 20, 1)
  const duration = 2 - intensity * 1.2 // slower for low wind, faster for high

  return (
    <div className="relative w-full h-32 overflow-hidden rounded-xl bg-gradient-to-b from-cyan-900/20 to-transparent flex items-center justify-center">
      {/* Container that rotates based on wind direction */}
      <div 
        className="absolute inset-0 flex items-center justify-center"
        style={{ transform: `rotate(${windDirection}deg)` }}
      >
        {/* Wind stream lines */}
        {[0, 1, 2].map((idx) => (
          <motion.div
            key={`line-${idx}`}
            className="absolute h-0.5 bg-gradient-to-r from-transparent via-cyan-400 to-transparent"
            style={{
              width: "150%", // Make it wider since it rotates
              top: `${30 + idx * 20}%`,
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
            className="absolute w-1.5 h-0.5 rounded-full bg-cyan-300"
            style={{
              left: "-20%",
              top: `${20 + idx * 15}%`,
              opacity: 0.8,
            }}
            animate={{
              x: ["0%", "800%"],
              opacity: [0, 0.8, 0],
            }}
            transition={{
              duration: duration + 0.5,
              repeat: Infinity,
              delay: idx * (duration / 5),
              ease: "linear",
            }}
          />
        ))}
      </div>

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
        {!hideText && (
          <>
            <p className="text-sm font-semibold text-cyan-300">{windSpeed} km/h</p>
            {intensity > 0.5 && (
              <p className="text-xs text-cyan-400">
                {intensity > 0.8 ? "Strong wind" : "Moderate wind"}
              </p>
            )}
          </>
        )}
      </div>
    </div>
  )
}
