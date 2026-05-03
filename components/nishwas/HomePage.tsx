"use client"

import AQICircle from "./AQICircle"
import PollutantCard from "./PollutantCard"
import StatusCards from "./StatusCards"
import MapView from "./MapView"
import NewsSection from "./NewsSection"

export default function HomePage() {
  return (
    <div className="flex flex-col gap-5 p-6">
      {/* Top row: AQI + Pollutant */}
      <div className="grid grid-cols-[1fr_320px] gap-5">
        <AQICircle />
        <PollutantCard />
      </div>

      {/* Status cards */}
      <StatusCards />

      {/* Map */}
      <MapView />

      {/* News */}
      <NewsSection />
    </div>
  )
}
