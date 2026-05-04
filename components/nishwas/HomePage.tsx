"use client"

import { motion } from "framer-motion"
import AQICircle from "./AQICircle"
import PollutantCard from "./PollutantCard"
import StatusCards from "./StatusCards"
import MapView from "./MapView"
import NewsSection from "./NewsSection"
import TemperatureMap from "./TemperatureMap"
import TimelineChart from "./TimelineChart"

// Generate mock timeline data for the home page chart
const mockTimelineData = Array.from({ length: 8 }).map((_, i) => ({
  time: `${i * 3}:00`,
  temp: 28 + Math.sin(i) * 5,
  precip: i > 4 ? 45 + Math.random() * 40 : Math.random() * 20,
  wind: 10 + Math.random() * 5,
  humidity: 60 + Math.random() * 20,
  pressure: 1010 + Math.random() * 5,
  uv: Math.max(0, 8 - Math.abs(i - 4) * 2),
  index: i,
}))

export default function HomePage() {
  return (
    <div className="flex flex-col gap-6 p-6 max-w-[1600px] mx-auto w-full">
      
      {/* Top Section: Overview & Air Quality */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="grid grid-cols-1 xl:grid-cols-12 gap-6"
      >
        <div className="xl:col-span-8 h-full">
          <AQICircle />
        </div>
        <div className="xl:col-span-4 h-full">
          <PollutantCard />
        </div>
      </motion.div>

      {/* Middle Section: MSN Weather Style Animations (StatusCards) */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <StatusCards />
      </motion.div>

      {/* Bottom Section: Maps & Charts Grid */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="grid grid-cols-1 xl:grid-cols-12 gap-6"
      >
        {/* Left Column: Maps */}
        <div className="xl:col-span-8 flex flex-col gap-6">
          <div className="h-[400px]">
            <MapView />
          </div>
          <div className="h-[400px]">
             <TemperatureMap />
          </div>
        </div>

        {/* Right Column: Timeline & News */}
        <div className="xl:col-span-4 flex flex-col gap-6">
          <TimelineChart data={mockTimelineData} activeTab="Precipitation" />
          <NewsSection />
        </div>
      </motion.div>
      
    </div>
  )
}
