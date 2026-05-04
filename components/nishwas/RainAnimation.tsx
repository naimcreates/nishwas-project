"use client"

import { motion } from "framer-motion"
import { Cloud, CloudRain, CloudDrizzle } from "lucide-react"

interface RainAnimationProps {
  rainProbability: number
  hideText?: boolean
}

export default function RainAnimation({ rainProbability, hideText }: RainAnimationProps) {
  // Determine rain intensity based on probability
  const isRaining = rainProbability > 30
  let intensity = "light"
  let dropCount = 8

  if (rainProbability > 30 && rainProbability <= 60) {
    intensity = "medium"
    dropCount = 15
  } else if (rainProbability > 60) {
    intensity = "heavy"
    dropCount = 25
  }

  if (!isRaining) {
    return (
      <div className="relative w-full h-32 overflow-hidden rounded-xl bg-gradient-to-b from-slate-700/20 to-transparent flex items-center justify-center">
        <Cloud className="w-12 h-12 text-slate-400" />
        <p className="absolute bottom-4 text-sm text-slate-400">No rain expected</p>
      </div>
    )
  }

  return (
    <div className="relative w-full h-32 overflow-hidden rounded-xl bg-gradient-to-b from-blue-900/30 via-blue-900/20 to-transparent flex items-center justify-center">
      {/* Rain drops */}
      {Array.from({ length: dropCount }).map((_, idx) => (
        <motion.div
          key={idx}
          className="absolute w-0.5 h-4 bg-gradient-to-b from-blue-300 to-blue-500 rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: "-20px",
            opacity: 0.7,
          }}
          animate={{
            y: [0, 150],
            opacity: [0.7, 0],
          }}
          transition={{
            duration: intensity === "heavy" ? 0.8 : intensity === "medium" ? 1.2 : 1.6,
            repeat: Infinity,
            delay: Math.random() * 0.5,
            ease: "linear",
          }}
        />
      ))}

      {/* Cloud icon */}
      <div className="absolute flex flex-col items-center gap-2">
        {intensity === "light" ? (
          <CloudDrizzle className="w-10 h-10 text-blue-300" />
        ) : (
          <CloudRain className="w-10 h-10 text-blue-400" />
        )}
        {!hideText && (
          <>
            <p className="text-sm font-semibold text-blue-300">{rainProbability}%</p>
            <p className="text-xs text-blue-400 capitalize">
              {intensity === "light"
                ? "Light drizzle"
                : intensity === "medium"
                  ? "Moderate rain"
                  : "Heavy rain"}
            </p>
          </>
        )}
      </div>

      {/* Ripple effect on ground */}
      <motion.div
        className="absolute bottom-0 w-32 h-1 bg-gradient-to-r from-transparent via-blue-400/40 to-transparent rounded-full blur"
        animate={{
          scaleX: [0.8, 1.2, 0.8],
          opacity: [0.4, 0.2, 0.4],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </div>
  )
}
