"use client"

import { useEffect, useRef } from "react"
import { useNishwasStore, getAQIColor } from "@/lib/store"

// We use a dynamic import approach via useEffect to avoid SSR issues with Leaflet
export default function MapView() {
  const mapRef = useRef<HTMLDivElement>(null)
  const mapInstanceRef = useRef<unknown>(null)
  const { mapMarkers, activeMapLayer, setActiveMapLayer } = useNishwasStore()

  useEffect(() => {
    if (typeof window === "undefined" || !mapRef.current) return
    if (mapInstanceRef.current) return // already initialized

    // Dynamically import Leaflet
    import("leaflet").then((L) => {
      if (!mapRef.current || mapInstanceRef.current) return

      // Fix default icon paths
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      delete (L.Icon.Default.prototype as any)._getIconUrl
      L.Icon.Default.mergeOptions({
        iconRetinaUrl:
          "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png",
        iconUrl:
          "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",
        shadowUrl:
          "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
      })

      const map = L.map(mapRef.current!, {
        center: [23.7761, 90.3990],
        zoom: 12,
        zoomControl: true,
        attributionControl: true,
      })

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        maxZoom: 19,
      }).addTo(map)

      // Add AQI circle markers
      mapMarkers.forEach((marker) => {
        const color = getAQIColor(marker.aqi)
        const circleMarker = L.circleMarker([marker.lat, marker.lng], {
          radius: 14,
          fillColor: color,
          color: color,
          weight: 2,
          opacity: 0.9,
          fillOpacity: 0.55,
        }).addTo(map)

        circleMarker.bindPopup(
          `<div style="background:#102318;color:#e8f5ee;border:1px solid #1e3d2a;border-radius:8px;padding:10px;min-width:140px;">
            <div style="font-weight:700;font-size:13px;margin-bottom:4px;">${marker.name}</div>
            <div style="font-size:12px;color:#7ea98a;">AQI</div>
            <div style="font-size:20px;font-weight:800;color:${color};">${marker.aqi}</div>
          </div>`,
          {
            className: "nishwas-popup",
            closeButton: false,
          }
        )
      })

      mapInstanceRef.current = map
    })

    return () => {
      if (mapInstanceRef.current) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        ;(mapInstanceRef.current as any).remove()
        mapInstanceRef.current = null
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="rounded-2xl bg-[var(--surface)] border border-[var(--border)] overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-[var(--border)]">
        <div className="flex items-center gap-2">
          <svg
            className="w-4 h-4 text-[var(--primary)]"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
            />
          </svg>
          <h2 className="text-sm font-semibold text-[var(--foreground)]">
            Pollution Heatmap
          </h2>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveMapLayer("aqi")}
            className={`text-xs px-3 py-1.5 rounded-lg font-medium transition-all ${
              activeMapLayer === "aqi"
                ? "bg-[var(--primary)] text-[var(--primary-foreground)]"
                : "text-[var(--foreground-muted)] hover:text-[var(--foreground)] border border-[var(--border)] hover:border-[var(--primary)]/30"
            }`}
          >
            AQI Heatmap
          </button>
          <button
            onClick={() => setActiveMapLayer("flood")}
            className={`text-xs px-3 py-1.5 rounded-lg font-medium transition-all ${
              activeMapLayer === "flood"
                ? "bg-[var(--primary)] text-[var(--primary-foreground)]"
                : "text-[var(--foreground-muted)] hover:text-[var(--foreground)] border border-[var(--border)] hover:border-[var(--primary)]/30"
            }`}
          >
            Flood Risk
          </button>
        </div>
      </div>

      {/* Map container */}
      <div className="relative">
        <div ref={mapRef} className="w-full h-72" style={{ zIndex: 0 }} />

        {/* Wind source badge */}
        <div className="absolute bottom-3 left-3 flex items-center gap-2 bg-[var(--surface)]/90 backdrop-blur-sm border border-[var(--border)] rounded-lg px-3 py-2 z-[999]">
          <div>
            <p className="text-[9px] text-[var(--foreground-muted)] uppercase tracking-wider">
              Wind Source
            </p>
            <p className="text-xs font-medium text-[var(--foreground)]">
              NE – Traffic Corridor
            </p>
          </div>
          <div className="w-6 h-6 rounded-full bg-[var(--primary)]/15 border border-[var(--primary)]/30 flex items-center justify-center">
            <svg
              className="w-3 h-3 text-[var(--primary)] rotate-45"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 10l7-7m0 0l7 7m-7-7v18"
              />
            </svg>
          </div>
        </div>

        {/* Legend */}
        <div className="absolute bottom-3 right-3 bg-[var(--surface)]/90 backdrop-blur-sm border border-[var(--border)] rounded-lg px-3 py-2 z-[999]">
          <div className="flex items-center gap-1.5">
            {[
              "#22c55e",
              "#eab308",
              "#f97316",
              "#ef4444",
              "#a855f7",
              "#991b1b",
            ].map((c) => (
              <div
                key={c}
                className="w-4 h-2 rounded-sm"
                style={{ backgroundColor: c }}
              />
            ))}
          </div>
          <div className="flex justify-between mt-1">
            <span className="text-[9px] text-[var(--foreground-muted)]">
              Good
            </span>
            <span className="text-[9px] text-[var(--foreground-muted)]">
              Hazardous
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
