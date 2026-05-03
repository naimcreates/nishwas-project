"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useNishwasStore } from "@/lib/store"
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { X } from "lucide-react"
import { useEffect } from "react"

export default function WeatherDetailModal() {
  const { activeWeatherCard, setActiveWeatherCard, weather, exposureHistory } = useNishwasStore()

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActiveWeatherCard(null)
    }
    document.addEventListener("keydown", handleEscape)
    return () => document.removeEventListener("keydown", handleEscape)
  }, [setActiveWeatherCard])

  const temperatureData = [
    { time: "6am", temp: 26, feels: 28 },
    { time: "8am", temp: 28, feels: 30 },
    { time: "10am", temp: 30, feels: 33 },
    { time: "12pm", temp: 32, feels: 36 },
    { time: "2pm", temp: 33, feels: 37 },
    { time: "4pm", temp: 31, feels: 35 },
    { time: "6pm", temp: 29, feels: 31 },
    { time: "8pm", temp: 27, feels: 29 },
  ]

  const humidityData = [
    { time: "6am", humidity: 82, dewPoint: 20 },
    { time: "8am", humidity: 76, dewPoint: 19 },
    { time: "10am", humidity: 68, dewPoint: 17 },
    { time: "12pm", humidity: 74, dewPoint: 19 },
    { time: "2pm", humidity: 70, dewPoint: 18 },
    { time: "4pm", humidity: 72, dewPoint: 18 },
    { time: "6pm", humidity: 78, dewPoint: 20 },
    { time: "8pm", humidity: 80, dewPoint: 20 },
  ]

  const windData = [
    { time: "6am", speed: 8, gust: 12 },
    { time: "8am", speed: 10, gust: 15 },
    { time: "10am", speed: 12, gust: 18 },
    { time: "12pm", speed: 12, gust: 18 },
    { time: "2pm", speed: 14, gust: 20 },
    { time: "4pm", speed: 13, gust: 19 },
    { time: "6pm", speed: 11, gust: 16 },
    { time: "8pm", speed: 9, gust: 13 },
  ]

  const rainData = [
    { time: "6am", probability: 5, intensity: 0 },
    { time: "8am", probability: 8, intensity: 0 },
    { time: "10am", probability: 10, intensity: 0 },
    { time: "12pm", probability: 15, intensity: 0.2 },
    { time: "2pm", probability: 12, intensity: 0 },
    { time: "4pm", probability: 10, intensity: 0 },
    { time: "6pm", probability: 8, intensity: 0 },
    { time: "8pm", probability: 5, intensity: 0 },
  ]

  const getComfortLevel = (humidity: number) => {
    if (humidity < 40) return "Low - Dry"
    if (humidity < 60) return "Moderate - Comfortable"
    return "High - Humid"
  }

  const getWindDirection = (angle: number) => {
    const directions = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"]
    return directions[Math.round(angle / 45) % 8]
  }

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.3 } },
    exit: { opacity: 0, scale: 0.95, transition: { duration: 0.2 } },
  }

  const contentVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.1, duration: 0.3 },
    }),
  }

  return (
    <AnimatePresence>
      {activeWeatherCard && (
        <motion.div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50"
          onClick={() => setActiveWeatherCard(null)}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-[var(--surface-elevated)] border border-[var(--border)] rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl"
            onClick={(e) => e.stopPropagation()}
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            {/* Header */}
            <div className="sticky top-0 bg-[var(--surface-elevated)] border-b border-[var(--border)] p-6 flex items-center justify-between">
              <motion.h2
                className="text-2xl font-bold text-[var(--foreground)]"
                variants={contentVariants}
                custom={0}
                initial="hidden"
                animate="visible"
              >
                {activeWeatherCard === "temperature" && "Temperature"}
                {activeWeatherCard === "humidity" && "Humidity"}
                {activeWeatherCard === "wind" && "Wind"}
                {activeWeatherCard === "rain" && "Precipitation"}
              </motion.h2>
              <button
                onClick={() => setActiveWeatherCard(null)}
                className="text-[var(--foreground-muted)] hover:text-[var(--foreground)] transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6 space-y-6">
              {activeWeatherCard === "temperature" && (
                <>
                  <motion.div
                    className="grid grid-cols-3 gap-4"
                    variants={contentVariants}
                    custom={1}
                    initial="hidden"
                    animate="visible"
                  >
                    <div className="bg-[var(--surface)] rounded-lg p-4">
                      <p className="text-[var(--foreground-muted)] text-sm mb-1">Current</p>
                      <p className="text-2xl font-bold text-[var(--foreground)]">{weather.temperature}°C</p>
                    </div>
                    <div className="bg-[var(--surface)] rounded-lg p-4">
                      <p className="text-[var(--foreground-muted)] text-sm mb-1">Feels Like</p>
                      <p className="text-2xl font-bold text-[var(--foreground)]">{weather.temperature + 4}°C</p>
                    </div>
                    <div className="bg-[var(--surface)] rounded-lg p-4">
                      <p className="text-[var(--foreground-muted)] text-sm mb-1">Range</p>
                      <p className="text-2xl font-bold text-[var(--foreground)]">22-33°C</p>
                    </div>
                  </motion.div>

                  <motion.div
                    variants={contentVariants}
                    custom={2}
                    initial="hidden"
                    animate="visible"
                    className="bg-[var(--surface)] rounded-lg p-4"
                  >
                    <p className="text-[var(--foreground-muted)] text-sm mb-4">Hourly Temperature</p>
                    <ResponsiveContainer width="100%" height={250}>
                      <LineChart data={temperatureData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                        <XAxis dataKey="time" stroke="var(--foreground-muted)" />
                        <YAxis stroke="var(--foreground-muted)" />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: "var(--surface-elevated)",
                            border: "1px solid var(--border)",
                            borderRadius: "8px",
                          }}
                          labelStyle={{ color: "var(--foreground)" }}
                        />
                        <Line type="monotone" dataKey="temp" stroke="#60a5fa" strokeWidth={2} dot={{ r: 4 }} />
                        <Line type="monotone" dataKey="feels" stroke="#f97316" strokeWidth={2} dot={{ r: 4 }} strokeDasharray="5 5" />
                      </LineChart>
                    </ResponsiveContainer>
                  </motion.div>
                </>
              )}

              {activeWeatherCard === "humidity" && (
                <>
                  <motion.div
                    className="grid grid-cols-3 gap-4"
                    variants={contentVariants}
                    custom={1}
                    initial="hidden"
                    animate="visible"
                  >
                    <div className="bg-[var(--surface)] rounded-lg p-4">
                      <p className="text-[var(--foreground-muted)] text-sm mb-1">Current</p>
                      <p className="text-2xl font-bold text-[var(--foreground)]">{weather.humidity}%</p>
                    </div>
                    <div className="bg-[var(--surface)] rounded-lg p-4">
                      <p className="text-[var(--foreground-muted)] text-sm mb-1">Dew Point</p>
                      <p className="text-2xl font-bold text-[var(--foreground)]">19°C</p>
                    </div>
                    <div className="bg-[var(--surface)] rounded-lg p-4">
                      <p className="text-[var(--foreground-muted)] text-sm mb-1">Comfort</p>
                      <p className="text-sm font-bold text-orange-400">{getComfortLevel(weather.humidity)}</p>
                    </div>
                  </motion.div>

                  <motion.div
                    variants={contentVariants}
                    custom={2}
                    initial="hidden"
                    animate="visible"
                    className="bg-[var(--surface)] rounded-lg p-4"
                  >
                    <p className="text-[var(--foreground-muted)] text-sm mb-4">Humidity Trend</p>
                    <ResponsiveContainer width="100%" height={250}>
                      <LineChart data={humidityData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                        <XAxis dataKey="time" stroke="var(--foreground-muted)" />
                        <YAxis stroke="var(--foreground-muted)" />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: "var(--surface-elevated)",
                            border: "1px solid var(--border)",
                            borderRadius: "8px",
                          }}
                          labelStyle={{ color: "var(--foreground)" }}
                        />
                        <Line type="monotone" dataKey="humidity" stroke="#3b82f6" strokeWidth={2} dot={{ r: 4 }} />
                      </LineChart>
                    </ResponsiveContainer>
                  </motion.div>
                </>
              )}

              {activeWeatherCard === "wind" && (
                <>
                  <motion.div
                    className="grid grid-cols-3 gap-4"
                    variants={contentVariants}
                    custom={1}
                    initial="hidden"
                    animate="visible"
                  >
                    <div className="bg-[var(--surface)] rounded-lg p-4">
                      <p className="text-[var(--foreground-muted)] text-sm mb-1">Current Speed</p>
                      <p className="text-2xl font-bold text-[var(--foreground)]">{weather.windSpeed} km/h</p>
                    </div>
                    <div className="bg-[var(--surface)] rounded-lg p-4">
                      <p className="text-[var(--foreground-muted)] text-sm mb-1">Direction</p>
                      <p className="text-2xl font-bold text-[var(--foreground)]">{getWindDirection(225)}</p>
                    </div>
                    <div className="bg-[var(--surface)] rounded-lg p-4">
                      <p className="text-[var(--foreground-muted)] text-sm mb-1">Gust</p>
                      <p className="text-2xl font-bold text-[var(--foreground)]">18 km/h</p>
                    </div>
                  </motion.div>

                  <motion.div
                    variants={contentVariants}
                    custom={2}
                    initial="hidden"
                    animate="visible"
                    className="bg-[var(--surface)] rounded-lg p-4"
                  >
                    <p className="text-[var(--foreground-muted)] text-sm mb-4">Wind Speed & Gust</p>
                    <ResponsiveContainer width="100%" height={250}>
                      <BarChart data={windData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                        <XAxis dataKey="time" stroke="var(--foreground-muted)" />
                        <YAxis stroke="var(--foreground-muted)" />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: "var(--surface-elevated)",
                            border: "1px solid var(--border)",
                            borderRadius: "8px",
                          }}
                          labelStyle={{ color: "var(--foreground)" }}
                        />
                        <Bar dataKey="speed" fill="#60a5fa" />
                        <Bar dataKey="gust" fill="#f97316" />
                      </BarChart>
                    </ResponsiveContainer>
                  </motion.div>
                </>
              )}

              {activeWeatherCard === "rain" && (
                <>
                  <motion.div
                    className="grid grid-cols-2 gap-4"
                    variants={contentVariants}
                    custom={1}
                    initial="hidden"
                    animate="visible"
                  >
                    <div className="bg-[var(--surface)] rounded-lg p-4">
                      <p className="text-[var(--foreground-muted)] text-sm mb-1">Probability</p>
                      <p className="text-2xl font-bold text-[var(--foreground)]">{weather.rainChance}%</p>
                    </div>
                    <div className="bg-[var(--surface)] rounded-lg p-4">
                      <p className="text-[var(--foreground-muted)] text-sm mb-1">Intensity</p>
                      <p className="text-lg font-bold text-blue-400">Light</p>
                    </div>
                  </motion.div>

                  <motion.div
                    variants={contentVariants}
                    custom={2}
                    initial="hidden"
                    animate="visible"
                    className="bg-[var(--surface)] rounded-lg p-4"
                  >
                    <p className="text-[var(--foreground-muted)] text-sm mb-4">Rain Probability & Intensity</p>
                    <ResponsiveContainer width="100%" height={250}>
                      <BarChart data={rainData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                        <XAxis dataKey="time" stroke="var(--foreground-muted)" />
                        <YAxis stroke="var(--foreground-muted)" />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: "var(--surface-elevated)",
                            border: "1px solid var(--border)",
                            borderRadius: "8px",
                          }}
                          labelStyle={{ color: "var(--foreground)" }}
                        />
                        <Bar dataKey="probability" fill="#3b82f6" />
                      </BarChart>
                    </ResponsiveContainer>
                  </motion.div>
                </>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
