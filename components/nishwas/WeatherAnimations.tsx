"use client"

import { motion } from "framer-motion"

interface TemperatureAnimationProps {
  temperature: number
}

export function TemperatureAnimation({ temperature }: TemperatureAnimationProps) {
  // Cool (below 15°C) → Warm (above 30°C)
  const normalizedTemp = Math.min(Math.max((temperature - 10) / 25, 0), 1)

  // Gradient colors: cool (blue) → warm (orange/red)
  const coolColor = "from-blue-600/40"
  const warmColor = "to-orange-600/40"
  const blendColor = normalizedTemp > 0.5 ? warmColor : coolColor

  return (
    <motion.div
      className={`relative w-full h-32 overflow-hidden rounded-xl bg-gradient-to-br ${coolColor} ${warmColor} flex items-center justify-center`}
      animate={{
        backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"],
      }}
      transition={{
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      {/* Animated heat waves */}
      {[0, 1, 2].map((idx) => (
        <motion.div
          key={idx}
          className="absolute w-32 h-32 rounded-full border border-orange-400/20"
          animate={{
            scale: [0.5, 2, 2.5],
            opacity: [0.6, 0.3, 0],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            delay: idx * 1,
            ease: "easeOut",
          }}
        />
      ))}

      {/* Temperature display */}
      <motion.div
        className="relative z-10 flex flex-col items-center gap-1"
        animate={{
          scale: [1, 1.05, 1],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <p className="text-4xl font-bold text-white">{temperature}°</p>
        <p className="text-xs text-orange-200">
          {temperature < 15 ? "Cool" : temperature < 25 ? "Mild" : "Warm"}
        </p>
      </motion.div>
    </motion.div>
  )
}

interface HumidityAnimationProps {
  humidity: number
}

export function HumidityAnimation({ humidity }: HumidityAnimationProps) {
  // Create fog/mist effect based on humidity
  const mist = Math.min(humidity / 100, 1)

  return (
    <div className="relative w-full h-32 overflow-hidden rounded-xl bg-gradient-to-b from-slate-600/20 to-slate-700/20 flex items-center justify-center">
      {/* Mist layers */}
      {Array.from({ length: 3 }).map((_, idx) => (
        <motion.div
          key={idx}
          className="absolute inset-0 bg-gradient-to-r from-transparent via-slate-300 to-transparent blur-xl"
          style={{ opacity: (mist * 0.3) / (idx + 1) }}
          animate={{
            x: ["-100%", "100%"],
          }}
          transition={{
            duration: 4 + idx * 1,
            repeat: Infinity,
            ease: "linear",
            delay: idx * 0.5,
          }}
        />
      ))}

      {/* Humidity display */}
      <motion.div
        className="relative z-10 flex flex-col items-center gap-1"
        animate={{
          opacity: [0.9, 1, 0.9],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <p className="text-4xl font-bold text-slate-200">{humidity}%</p>
        <p className="text-xs text-slate-400">
          {humidity < 40 ? "Dry" : humidity < 70 ? "Moderate" : "Very Humid"}
        </p>
      </motion.div>

      {/* Droplets for high humidity */}
      {humidity > 60 &&
        Array.from({ length: 5 }).map((_, idx) => (
          <motion.div
            key={`drop-${idx}`}
            className="absolute w-1.5 h-1.5 rounded-full bg-blue-300/50"
            style={{
              left: `${20 + idx * 15}%`,
              top: "50%",
            }}
            animate={{
              y: [0, 20, 0],
              opacity: [0, 0.6, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: idx * 0.3,
              ease: "easeInOut",
            }}
          />
        ))}
    </div>
  )
}
