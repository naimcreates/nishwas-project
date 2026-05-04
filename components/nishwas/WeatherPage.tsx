"use client"

import { useNishwasStore } from "@/lib/store"
import { motion } from "framer-motion"
import {
  ArrowLeft,
  Wind,
  Droplets,
  Eye,
  Gauge,
  Thermometer,
  Sun,
  Cloud,
  CloudRain,
  CloudSun,
  Moon,
  CloudMoon,
  MapPin,
} from "lucide-react"
import { useState } from "react"
import WindAnimation from "./WindAnimation"
import RainAnimation from "./RainAnimation"
import { TemperatureAnimation, HumidityAnimation } from "./WeatherAnimations"
import TimelineChart from "./TimelineChart"

// Hourly forecast data
const hourlyData = [
  { time: "7 PM", temp: 24, icon: "cloud", precip: 6 },
  { time: "Now", temp: 25, icon: "cloud-rain", precip: 20 },
  { time: "11 PM", temp: 25, icon: "cloud-rain", precip: 25 },
  { time: "1 AM", temp: 24, icon: "cloud-rain", precip: 45 },
  { time: "3 AM", temp: 23, icon: "cloud-rain", precip: 39 },
  { time: "5 AM", temp: 23, icon: "cloud-rain", precip: 25 },
  { time: "7 AM", temp: 23, icon: "cloud-rain", precip: 36 },
  { time: "9 AM", temp: 25, icon: "cloud-sun", precip: 30 },
  { time: "11 AM", temp: 26, icon: "cloud-sun", precip: 25 },
  { time: "1 PM", temp: 27, icon: "cloud", precip: 18 },
  { time: "3 PM", temp: 28, icon: "cloud", precip: 18 },
  { time: "5 PM", temp: 28, icon: "cloud-sun", precip: 18 },
]

// Daily forecast data
const dailyData = [
  { day: "Yesterday", date: "2", high: 28, low: 22, icon: "cloud", condition: "Cloudy" },
  { day: "Today", date: "3", high: 25, low: 23, icon: "cloud-rain", condition: "Rain", isToday: true },
  { day: "Mon", date: "4", high: 29, low: 24, icon: "cloud", condition: "Cloudy" },
  { day: "Tue", date: "5", high: 31, low: 25, icon: "cloud-sun", condition: "Partly Cloudy" },
  { day: "Wed", date: "6", high: 31, low: 25, icon: "cloud-sun", condition: "Partly Cloudy" },
  { day: "Thu", date: "7", high: 32, low: 25, icon: "sun", condition: "Sunny" },
  { day: "Fri", date: "8", high: 33, low: 24, icon: "cloud-sun", condition: "Partly Cloudy" },
]

// Chart data for temperature overview
const getChartData = (day: string) => {
  // Generate slightly different data based on the selected day to simulate changes
  const offset = day === "Today" ? 0 : day === "Yesterday" ? -2 : 2
  return hourlyData.map((h, i) => ({
    time: h.time,
    temp: h.temp + offset,
    precip: Math.max(0, h.precip + (offset * 5)),
    wind: Math.max(5, 12 + (Math.sin(i) * 8) + offset),
    humidity: Math.min(100, Math.max(30, 60 + (Math.cos(i) * 20) + offset * 2)),
    pressure: 1005 + (Math.sin(i) * 5),
    uv: Math.max(0, Math.min(11, 5 + (Math.sin(i - 4) * 6))),
    index: i,
  }))
}

const tabs = [
  "Overview",
  "Precipitation",
  "Wind",
  "Air Quality",
  "Humidity",
  "Cloud cover",
  "Pressure",
  "UV",
  "Visibility",
  "Feels like",
]

function getWeatherIcon(type: string, size = 24) {
  const props = { size, className: "text-yellow-400" }
  switch (type) {
    case "sun":
      return <Sun {...props} />
    case "cloud":
      return <Cloud {...props} className="text-gray-400" />
    case "cloud-rain":
      return <CloudRain {...props} className="text-blue-400" />
    case "cloud-sun":
      return <CloudSun {...props} />
    case "moon":
      return <Moon {...props} className="text-gray-300" />
    case "cloud-moon":
      return <CloudMoon {...props} className="text-gray-400" />
    default:
      return <Cloud {...props} className="text-gray-400" />
  }
}

export default function WeatherPage() {
  const { weather, location, setActivePage } = useNishwasStore()
  const [activeTab, setActiveTab] = useState("Overview")
  const [selectedDay, setSelectedDay] = useState("Today")
  const [showFeelsLike, setShowFeelsLike] = useState(false)
  const [selectedHour, setSelectedHour] = useState(1) // "Now" is at index 1

  const chartData = getChartData(selectedDay)

  // Get current selected hour data
  const currentHourData = hourlyData[selectedHour]
  
  // Dynamic wind direction (example: changes throughout day)
  const windDirection = 180 + selectedHour * 15

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
      className="p-6 space-y-6"
    >
      {/* Header with back button */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setActivePage("Home")}
            className="w-10 h-10 rounded-xl bg-[var(--surface)] border border-[var(--border)] flex items-center justify-center text-[var(--foreground-muted)] hover:text-[var(--foreground)] hover:border-[var(--primary)]/30 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </motion.button>
          <div>
            <h1 className="text-xl font-bold text-[var(--foreground)]">Weather Details</h1>
            <div className="flex items-center gap-1.5 text-sm text-[var(--foreground-muted)]">
              <MapPin className="w-3.5 h-3.5" />
              {location}
            </div>
          </div>
        </div>
        <div className="text-xs text-[var(--foreground-muted)]">
          Last updated: 3:58 PM
        </div>
      </div>

      {/* Current Weather Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-2 gap-4"
      >
        {/* Main current weather */}
        <div className="rounded-2xl bg-[var(--surface)] border border-[var(--border)] p-6">
          <div className="flex items-start justify-between mb-4">
            <div>
              <p className="text-xs text-[var(--foreground-muted)] mb-1">Current weather · 3:58 PM</p>
              <div className="flex items-start gap-3">
                <div className="text-6xl font-light text-[var(--foreground)]">
                  {weather.temperature}
                  <span className="text-2xl align-top">°C</span>
                </div>
                <div>
                  <p className="text-lg font-medium text-[var(--foreground)]">Mostly cloudy</p>
                  <p className="text-sm text-[var(--foreground-muted)]">Feels like 36°</p>
                </div>
              </div>
            </div>
            <div className="w-16 h-16">
              <CloudSun className="w-full h-full text-yellow-400" />
            </div>
          </div>
          <p className="text-sm text-[var(--foreground-muted)] mb-4">
            There will be scattered light rain showers. The low will be 23°.
          </p>
          <div className="grid grid-cols-5 gap-4">
            <div className="flex items-center gap-2">
              <Wind className="w-4 h-4 text-[var(--foreground-muted)]" />
              <div>
                <p className="text-[10px] text-[var(--foreground-muted)]">Wind</p>
                <p className="text-sm font-medium text-[var(--foreground)]">{weather.windSpeed} km/h</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Droplets className="w-4 h-4 text-blue-400" />
              <div>
                <p className="text-[10px] text-[var(--foreground-muted)]">Humidity</p>
                <p className="text-sm font-medium text-[var(--foreground)]">{weather.humidity}%</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Eye className="w-4 h-4 text-[var(--foreground-muted)]" />
              <div>
                <p className="text-[10px] text-[var(--foreground-muted)]">Visibility</p>
                <p className="text-sm font-medium text-[var(--foreground)]">3.5 km</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Gauge className="w-4 h-4 text-[var(--foreground-muted)]" />
              <div>
                <p className="text-[10px] text-[var(--foreground-muted)]">Pressure</p>
                <p className="text-sm font-medium text-[var(--foreground)]">1007 mb</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Thermometer className="w-4 h-4 text-orange-400" />
              <div>
                <p className="text-[10px] text-[var(--foreground-muted)]">Dew point</p>
                <p className="text-sm font-medium text-[var(--foreground)]">22°</p>
              </div>
            </div>
          </div>
        </div>

        {/* Mini map placeholder */}
        <div className="rounded-2xl bg-[var(--surface)] border border-[var(--border)] p-4 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 to-cyan-900/20" />
          <div className="relative z-10 h-full flex flex-col">
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center">
                <Cloud className="w-12 h-12 mx-auto text-[var(--foreground-muted)] mb-2" />
                <p className="text-sm text-[var(--foreground-muted)]">No precipitation for at least 2 hours.</p>
              </div>
            </div>
            <div className="flex justify-end">
              <button className="text-xs text-[var(--primary)] hover:underline">Open Map</button>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Weather Animations Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="grid grid-cols-2 gap-4"
      >
        {/* Temperature Animation */}
        <div className="rounded-2xl bg-[var(--surface)] border border-[var(--border)] p-4 overflow-hidden">
          <p className="text-sm font-semibold text-[var(--foreground)] mb-3">Temperature</p>
          <TemperatureAnimation temperature={currentHourData.temp} />
        </div>

        {/* Humidity Animation */}
        <div className="rounded-2xl bg-[var(--surface)] border border-[var(--border)] p-4 overflow-hidden">
          <p className="text-sm font-semibold text-[var(--foreground)] mb-3">Humidity</p>
          <HumidityAnimation humidity={weather.humidity} />
        </div>

        {/* Wind Animation */}
        <div className="rounded-2xl bg-[var(--surface)] border border-[var(--border)] p-4 overflow-hidden">
          <p className="text-sm font-semibold text-[var(--foreground)] mb-3">Wind</p>
          <WindAnimation windSpeed={weather.windSpeed} windDirection={windDirection} />
        </div>

        {/* Rain Animation */}
        <div className="rounded-2xl bg-[var(--surface)] border border-[var(--border)] p-4 overflow-hidden">
          <p className="text-sm font-semibold text-[var(--foreground)] mb-3">Precipitation</p>
          <RainAnimation rainProbability={currentHourData.precip} />
        </div>
      </motion.div>

      {/* Hourly Timeline Slider */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25 }}
        className="rounded-2xl bg-[var(--surface)] border border-[var(--border)] p-6"
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-semibold text-[var(--foreground)]">Select Time</h3>
          <p className="text-xs text-[var(--foreground-muted)]">
            {currentHourData.time} • {currentHourData.temp}°C
          </p>
        </div>
        
        {/* Timeline slider */}
        <div className="flex items-center gap-2">
          <input
            type="range"
            min="0"
            max={hourlyData.length - 1}
            value={selectedHour}
            onChange={(e) => setSelectedHour(Number(e.target.value))}
            className="flex-1 h-2 bg-[var(--surface-2)] rounded-full cursor-pointer appearance-none accent-[var(--primary)]"
          />
        </div>

        {/* Hour labels */}
        <div className="flex items-center justify-between mt-3 px-1">
          <span className="text-xs text-[var(--foreground-muted)]">{hourlyData[0].time}</span>
          <span className="text-xs text-[var(--foreground-muted)]">{hourlyData[Math.floor(hourlyData.length / 2)].time}</span>
          <span className="text-xs text-[var(--foreground-muted)]">{hourlyData[hourlyData.length - 1].time}</span>
        </div>
      </motion.div>

      {/* Hourly Tabs */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="rounded-2xl bg-[var(--surface)] border border-[var(--border)] overflow-hidden"
      >
        {/* Tab header */}
        <div className="flex items-center gap-1 p-2 border-b border-[var(--border)] overflow-x-auto">
          <span className="text-sm font-medium text-[var(--foreground)] px-3 shrink-0">Hourly</span>
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors shrink-0 ${
                activeTab === tab
                  ? "bg-[var(--primary)]/15 text-[var(--primary)] border border-[var(--primary)]/25"
                  : "text-[var(--foreground-muted)] hover:text-[var(--foreground)] hover:bg-[var(--surface-2)]"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Daily forecast row */}
        <div className="flex items-center gap-2 p-4 border-b border-[var(--border)] overflow-x-auto">
          {dailyData.map((day, idx) => (
            <motion.div
              key={idx}
              onClick={() => setSelectedDay(day.day)}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.05 * idx }}
              className={`flex flex-col items-center gap-1 px-4 py-3 rounded-xl shrink-0 min-w-[80px] cursor-pointer transition-colors ${
                selectedDay === day.day
                  ? "bg-[var(--primary)]/20 border border-[var(--primary)]/30"
                  : "bg-[var(--surface-2)] hover:bg-[var(--surface-3)]"
              }`}
            >
              <span className="text-[10px] text-[var(--foreground-muted)]">{day.date}</span>
              <span className="text-xs font-medium text-[var(--foreground)]">{day.day}</span>
              <div className="my-1">{getWeatherIcon(day.icon, 28)}</div>
              <div className="flex items-center gap-1">
                <span className="text-sm font-bold text-[var(--foreground)]">{day.high}°</span>
                <span className="text-xs text-[var(--foreground-muted)]">{day.low}°</span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Timeline Chart with Rain Overlay */}
        <div className="p-4">
          <TimelineChart data={chartData} activeTab={activeTab} />
        </div>

        {/* Precipitation bars */}
        <div className="flex items-end justify-between mt-4 px-2 h-8">
          {hourlyData.map((h, i) => (
            <div key={i} className="flex flex-col items-center gap-1">
              <div
                className="w-6 bg-blue-500/60 rounded-t"
                style={{ height: `${Math.max(h.precip / 2, 2)}px` }}
              />
              <span className="text-[9px] text-blue-400">{h.precip}%</span>
            </div>
          ))}
        </div>

        {/* Legend */}
        <div className="flex items-center justify-between mt-6 pt-4 border-t border-[var(--border)]">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-[#d4a574]" />
            <span className="text-xs text-[var(--foreground-muted)]">Temperature</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-yellow-400" />
            <span className="text-xs text-[var(--foreground-muted)]">Moon phase: Waning Gibbous</span>
          </div>
        </div>
      </motion.div>

      {/* Weather Details Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="rounded-2xl bg-[var(--surface)] border border-[var(--border)] p-6"
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-[var(--foreground)]">Weather details · 3:58 PM</h2>
          <button className="text-xs text-[var(--primary)] hover:underline">
            SUGGESTIONS FOR YOUR DAY
          </button>
        </div>

        <div className="grid grid-cols-4 gap-4">
          {/* Feels like */}
          <div className="bg-[var(--surface-2)] rounded-xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <Thermometer className="w-4 h-4 text-orange-400" />
              <span className="text-xs text-[var(--foreground-muted)]">Feels like</span>
            </div>
            <p className="text-2xl font-bold text-[var(--foreground)]">36°</p>
            <p className="text-xs text-[var(--foreground-muted)] mt-1">Humidity is making it feel warmer</p>
          </div>

          {/* Wind */}
          <div className="bg-[var(--surface-2)] rounded-xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <Wind className="w-4 h-4 text-cyan-400" />
              <span className="text-xs text-[var(--foreground-muted)]">Wind</span>
            </div>
            <p className="text-2xl font-bold text-[var(--foreground)]">{weather.windSpeed} km/h</p>
            <p className="text-xs text-[var(--foreground-muted)] mt-1">From the South</p>
          </div>

          {/* Humidity */}
          <div className="bg-[var(--surface-2)] rounded-xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <Droplets className="w-4 h-4 text-blue-400" />
              <span className="text-xs text-[var(--foreground-muted)]">Humidity</span>
            </div>
            <p className="text-2xl font-bold text-[var(--foreground)]">{weather.humidity}%</p>
            <p className="text-xs text-[var(--foreground-muted)] mt-1">The dew point is 22° right now</p>
          </div>

          {/* UV Index */}
          <div className="bg-[var(--surface-2)] rounded-xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <Sun className="w-4 h-4 text-yellow-400" />
              <span className="text-xs text-[var(--foreground-muted)]">UV Index</span>
            </div>
            <p className="text-2xl font-bold text-[var(--foreground)]">6</p>
            <p className="text-xs text-orange-400 mt-1">High</p>
          </div>

          {/* Visibility */}
          <div className="bg-[var(--surface-2)] rounded-xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <Eye className="w-4 h-4 text-[var(--foreground-muted)]" />
              <span className="text-xs text-[var(--foreground-muted)]">Visibility</span>
            </div>
            <p className="text-2xl font-bold text-[var(--foreground)]">3.5 km</p>
            <p className="text-xs text-[var(--foreground-muted)] mt-1">Haze is reducing visibility</p>
          </div>

          {/* Pressure */}
          <div className="bg-[var(--surface-2)] rounded-xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <Gauge className="w-4 h-4 text-[var(--foreground-muted)]" />
              <span className="text-xs text-[var(--foreground-muted)]">Pressure</span>
            </div>
            <p className="text-2xl font-bold text-[var(--foreground)]">1007 mb</p>
            <p className="text-xs text-[var(--foreground-muted)] mt-1">Steady</p>
          </div>

          {/* Sunrise/Sunset */}
          <div className="bg-[var(--surface-2)] rounded-xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <Sun className="w-4 h-4 text-yellow-400" />
              <span className="text-xs text-[var(--foreground-muted)]">Sunrise</span>
            </div>
            <p className="text-2xl font-bold text-[var(--foreground)]">5:52 AM</p>
            <p className="text-xs text-[var(--foreground-muted)] mt-1">Sunset: 6:28 PM</p>
          </div>

          {/* Moon */}
          <div className="bg-[var(--surface-2)] rounded-xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <Moon className="w-4 h-4 text-gray-300" />
              <span className="text-xs text-[var(--foreground-muted)]">Moon</span>
            </div>
            <p className="text-2xl font-bold text-[var(--foreground)]">Waning</p>
            <p className="text-xs text-[var(--foreground-muted)] mt-1">Moonrise: 9:45 PM</p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}
