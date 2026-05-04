"use client"

import { useState, useMemo, useEffect } from "react"
import { MapContainer, TileLayer, Rectangle, useMapEvents } from "react-leaflet"
import L from "leaflet"
import "leaflet/dist/leaflet.css"

function getTempColor(temp: number) {
  if (temp < 20) return "#3b82f6" // Blue
  if (temp < 25) return "#10b981" // Green
  if (temp < 30) return "#eab308" // Yellow
  if (temp < 35) return "#f97316" // Orange
  return "#ef4444" // Red
}

function getMockTemp(lat: number, lng: number) {
  // Simple mock function that makes south warmer and adds some pseudo-random variation
  return 22 + (26.6 - lat) * 2.5 + Math.sin(lng * 12) * 4
}

// Bangladesh bounds
const BD_BOUNDS: L.LatLngBoundsExpression = [
  [20.5, 88.0],
  [26.6, 92.8],
]

function MapEvents({ setTooltipData }: { setTooltipData: (data: { x: number; y: number; temp: number } | null) => void }) {
  useMapEvents({
    mousemove(e) {
      const { lat, lng } = e.latlng
      // Restrict tooltip within BD bounds roughly
      if (lat >= 20.5 && lat <= 26.6 && lng >= 88.0 && lng <= 92.8) {
        const temp = getMockTemp(lat, lng)
        setTooltipData({
          x: e.originalEvent.clientX,
          y: e.originalEvent.clientY,
          temp: parseFloat(temp.toFixed(1)),
        })
      } else {
        setTooltipData(null)
      }
    },
    mouseout() {
      setTooltipData(null)
    },
  })
  return null
}

export default function TempMapInner() {
  const [tooltipData, setTooltipData] = useState<{ x: number; y: number; temp: number } | null>(null)

  // Pre-generate the grid of rectangles to avoid recalculating on every render
  const grid = useMemo(() => {
    const cells = []
    const stepLat = 0.2
    const stepLng = 0.2
    for (let lat = 20.5; lat <= 26.6; lat += stepLat) {
      for (let lng = 88.0; lng <= 92.8; lng += stepLng) {
        const temp = getMockTemp(lat + stepLat / 2, lng + stepLng / 2)
        const color = getTempColor(temp)
        cells.push(
          <Rectangle
            key={`${lat}-${lng}`}
            bounds={[[lat, lng], [lat + stepLat, lng + stepLng]]}
            pathOptions={{ color, fillColor: color, fillOpacity: 0.35, weight: 0 }}
            interactive={false}
          />
        )
      }
    }
    return cells
  }, [])

  // Fix leaflet icon issues in Next.js
  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    delete (L.Icon.Default.prototype as any)._getIconUrl
    L.Icon.Default.mergeOptions({
      iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png",
      iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",
      shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
    })
  }, [])

  return (
    <>
      <MapContainer
        bounds={BD_BOUNDS}
        zoomControl={true}
        scrollWheelZoom={false}
        className="w-full h-full z-0 cursor-crosshair"
        maxBounds={BD_BOUNDS}
        maxBoundsViscosity={1.0}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
          subdomains="abcd"
          className="map-tiles opacity-80"
        />
        {grid}
        <MapEvents setTooltipData={setTooltipData} />
      </MapContainer>

      {/* Custom Tooltip Overlay */}
      {tooltipData && (
        <div
          className="fixed z-50 pointer-events-none transform -translate-x-1/2 -translate-y-[120%] bg-[var(--surface)] border border-[var(--border)] rounded-lg shadow-xl px-3 py-2 flex flex-col items-center gap-1 transition-opacity duration-150"
          style={{
            left: tooltipData.x,
            top: tooltipData.y,
          }}
        >
          <p className="text-[10px] text-[var(--foreground-muted)] uppercase tracking-wider font-semibold">
            Temperature
          </p>
          <p className="text-lg font-bold text-[var(--foreground)] leading-none">
            {tooltipData.temp}°C
          </p>
          <div 
            className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-[var(--surface)] border-b border-r border-[var(--border)] rotate-45"
          />
        </div>
      )}
    </>
  )
}
