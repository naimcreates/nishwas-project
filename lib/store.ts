"use client"
import { create } from "zustand"

export type AQILevel =
  | "Good"
  | "Moderate"
  | "Unhealthy for Sensitive Groups"
  | "Unhealthy"
  | "Very Unhealthy"
  | "Hazardous"

export interface Pollutant {
  name: string
  value: number
  unit: string
  level: AQILevel
}

export interface WeatherData {
  temperature: number
  humidity: number
  windSpeed: number
  rainChance: number
  condition: string
}

export interface MapMarker {
  id: string
  lat: number
  lng: number
  aqi: number
  name: string
}

export interface NewsItem {
  id: string
  category: "ALERT" | "NEWS" | "COMMUNITY"
  title: string
  description: string
  timestamp: string
  image: string
}

export interface ExposurePoint {
  time: string
  aqi: number
  exposure: number
}

interface NishwasState {
  location: string
  aqi: number
  aqiLevel: AQILevel
  weather: WeatherData
  primaryPollutant: Pollutant
  pollutants: Pollutant[]
  floodRisk: "Low" | "Moderate" | "High"
  exposureScore: number
  mapMarkers: MapMarker[]
  news: NewsItem[]
  exposureHistory: ExposurePoint[]
  activeMapLayer: "aqi" | "flood"
  activePage: string
  activeWeatherCard: "temperature" | "humidity" | "wind" | "rain" | null
  setLocation: (location: string) => void
  setActiveMapLayer: (layer: "aqi" | "flood") => void
  setActivePage: (page: string) => void
  setActiveWeatherCard: (card: "temperature" | "humidity" | "wind" | "rain" | null) => void
}

export const useNishwasStore = create<NishwasState>((set) => ({
  location: "Dhaka, Bangladesh",
  aqi: 142,
  aqiLevel: "Unhealthy",
  weather: {
    temperature: 32,
    humidity: 74,
    windSpeed: 12,
    rainChance: 15,
    condition: "Humid",
  },
  primaryPollutant: {
    name: "PM 2.5",
    value: 68.4,
    unit: "µg/m³",
    level: "Unhealthy",
  },
  pollutants: [
    { name: "PM 10", value: 112, unit: "µg/m³", level: "Moderate" },
    { name: "NO2", value: 38.4, unit: "µg/m³", level: "Good" },
    { name: "SO2", value: 12.1, unit: "µg/m³", level: "Good" },
    { name: "O3", value: 45.8, unit: "µg/m³", level: "Moderate" },
  ],
  floodRisk: "Low",
  exposureScore: 64,
  mapMarkers: [
    { id: "1", lat: 23.8103, lng: 90.4125, aqi: 168, name: "Mirpur" },
    { id: "2", lat: 23.7469, lng: 90.3763, aqi: 142, name: "Dhanmondi" },
    { id: "3", lat: 23.7925, lng: 90.4078, aqi: 125, name: "Gulshan" },
    { id: "4", lat: 23.7761, lng: 90.3990, aqi: 189, name: "Mohakhali" },
    { id: "5", lat: 23.7270, lng: 90.4160, aqi: 95, name: "Rampura" },
  ],
  news: [
    {
      id: "1",
      category: "ALERT",
      title: "Dhaka Air Quality expected to dip further as winter approaches",
      description:
        "Health experts advise starting preventive measures as AQI trends upward in northern districts.",
      timestamp: "5 HOURS AGO",
      image: "/news1.jpg",
    },
    {
      id: "2",
      category: "NEWS",
      title: "New EV bus routes announced for Banani-Gulshan corridor",
      description:
        "City Corporation plans to replace 200 aging diesel buses by end of 2026 to combat local pollution.",
      timestamp: "5 HOURS AGO",
      image: "/news2.jpg",
    },
    {
      id: "3",
      category: "COMMUNITY",
      title: "Volunteers plant 1,000 saplings in Purbachal project",
      description:
        "Community-led effort aims to create a green buffer zone against industrial expansion in the eastern corridor.",
      timestamp: "YESTERDAY",
      image: "/news3.jpg",
    },
  ],
  exposureHistory: [
    { time: "6am", aqi: 88, exposure: 22 },
    { time: "8am", aqi: 120, exposure: 45 },
    { time: "10am", aqi: 138, exposure: 58 },
    { time: "12pm", aqi: 142, exposure: 64 },
    { time: "2pm", aqi: 155, exposure: 72 },
    { time: "4pm", aqi: 148, exposure: 68 },
    { time: "6pm", aqi: 130, exposure: 60 },
    { time: "8pm", aqi: 118, exposure: 50 },
  ],
  activeMapLayer: "aqi",
  activePage: "Home",
  activeWeatherCard: null,
  setLocation: (location) => set({ location }),
  setActiveMapLayer: (layer) => set({ activeMapLayer: layer }),
  setActivePage: (page) => set({ activePage: page }),
  setActiveWeatherCard: (card) => set({ activeWeatherCard: card }),
}))

export function getAQIColor(aqi: number): string {
  if (aqi <= 50) return "#22c55e"
  if (aqi <= 100) return "#eab308"
  if (aqi <= 150) return "#f97316"
  if (aqi <= 200) return "#ef4444"
  if (aqi <= 300) return "#a855f7"
  return "#991b1b"
}

export function getAQILevel(aqi: number): AQILevel {
  if (aqi <= 50) return "Good"
  if (aqi <= 100) return "Moderate"
  if (aqi <= 150) return "Unhealthy for Sensitive Groups"
  if (aqi <= 200) return "Unhealthy"
  if (aqi <= 300) return "Very Unhealthy"
  return "Hazardous"
}

export function getLevelColor(level: AQILevel | string): string {
  switch (level) {
    case "Good": return "#22c55e"
    case "Moderate": return "#eab308"
    case "Unhealthy for Sensitive Groups": return "#f97316"
    case "Unhealthy": return "#ef4444"
    case "Very Unhealthy": return "#a855f7"
    case "Hazardous": return "#991b1b"
    default: return "#10b981"
  }
}
