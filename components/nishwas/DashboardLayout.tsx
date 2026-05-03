"use client"

import { useNishwasStore } from "@/lib/store"
import Sidebar from "./Sidebar"
import Navbar from "./Navbar"
import HomePage from "./HomePage"
import GoOutsidePage from "./GoOutsidePage"
import ExposurePage from "./ExposurePage"
import CommunityPage from "./CommunityPage"
import ActionPage from "./ActionPage"
import EducationPage from "./EducationPage"
import WeatherPage from "./WeatherPage"

function PageContent() {
  const { activePage } = useNishwasStore()

  switch (activePage) {
    case "Home":
      return <HomePage />
    case "Go Outside":
      return <GoOutsidePage />
    case "Exposure":
      return <ExposurePage />
    case "Community":
      return <CommunityPage />
    case "Action":
      return <ActionPage />
    case "Education":
      return <EducationPage />
    case "Weather":
      return <WeatherPage />
    default:
      return <HomePage />
  }
}

export default function DashboardLayout() {
  return (
    <div className="flex h-screen bg-[var(--background)] overflow-hidden">
      {/* Sidebar */}
      <Sidebar />

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <Navbar />
        <main className="flex-1 overflow-y-auto">
          <PageContent />
        </main>
      </div>
    </div>
  )
}
