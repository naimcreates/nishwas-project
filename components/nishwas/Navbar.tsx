"use client"

import { Search, Bell, RefreshCw, User, X, Check } from "lucide-react"
import { useNishwasStore } from "@/lib/store"
import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"

const notifications = [
  { id: 1, title: "AQI Alert", message: "Air quality has degraded to Unhealthy levels", time: "2 min ago", read: false },
  { id: 2, title: "Weather Update", message: "Rain expected in the next 2 hours", time: "15 min ago", read: false },
  { id: 3, title: "Community Event", message: "Tree planting drive this Saturday", time: "1 hour ago", read: true },
]

export default function Navbar() {
  const { location, setLocation } = useNishwasStore()
  const [inputValue, setInputValue] = useState(location)
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [showNotifications, setShowNotifications] = useState(false)
  const [showUserMenu, setShowUserMenu] = useState(false)
  const notifRef = useRef<HTMLDivElement>(null)
  const userRef = useRef<HTMLDivElement>(null)

  // Close dropdowns when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (notifRef.current && !notifRef.current.contains(event.target as Node)) {
        setShowNotifications(false)
      }
      if (userRef.current && !userRef.current.contains(event.target as Node)) {
        setShowUserMenu(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (inputValue.trim()) setLocation(inputValue.trim())
  }

  const handleRefresh = () => {
    setIsRefreshing(true)
    // Simulate data refresh
    setTimeout(() => setIsRefreshing(false), 1000)
  }

  return (
    <header className="flex items-center gap-4 px-6 py-3 border-b border-[var(--border)] bg-[var(--surface)] shrink-0">
      {/* Search bar */}
      <form onSubmit={handleSubmit} className="flex-1 max-w-md mx-auto">
        <div className="flex items-center gap-2 bg-[var(--surface-2)] border border-[var(--border)] rounded-full px-4 py-2 focus-within:border-[var(--primary)]/50 transition-colors">
          <Search className="w-4 h-4 text-[var(--foreground-muted)] shrink-0" />
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Search location..."
            className="flex-1 bg-transparent text-sm text-[var(--foreground)] placeholder:text-[var(--foreground-muted)] outline-none"
          />
        </div>
      </form>

      {/* Right actions */}
      <div className="flex items-center gap-3 ml-auto">
        {/* Refresh Button */}
        <button
          onClick={handleRefresh}
          disabled={isRefreshing}
          className="w-8 h-8 flex items-center justify-center rounded-lg text-[var(--foreground-muted)] hover:text-[var(--primary)] hover:bg-[var(--surface-2)] transition-colors disabled:opacity-50"
          aria-label="Refresh data"
        >
          <RefreshCw className={`w-4 h-4 ${isRefreshing ? "animate-spin" : ""}`} />
        </button>

        {/* Notifications Dropdown */}
        <div ref={notifRef} className="relative">
          <button
            onClick={() => {
              setShowNotifications(!showNotifications)
              setShowUserMenu(false)
            }}
            className="w-8 h-8 flex items-center justify-center rounded-lg text-[var(--foreground-muted)] hover:text-[var(--primary)] hover:bg-[var(--surface-2)] transition-colors relative"
            aria-label="Notifications"
          >
            <Bell className="w-4 h-4" />
            {notifications.some(n => !n.read) && (
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
            )}
          </button>

          <AnimatePresence>
            {showNotifications && (
              <motion.div
                initial={{ opacity: 0, y: -10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.95 }}
                transition={{ duration: 0.15 }}
                className="absolute right-0 top-full mt-2 w-80 bg-[var(--surface)] border border-[var(--border)] rounded-xl shadow-xl z-50 overflow-hidden"
              >
                <div className="flex items-center justify-between p-3 border-b border-[var(--border)]">
                  <h3 className="text-sm font-semibold text-[var(--foreground)]">Notifications</h3>
                  <button className="text-xs text-[var(--primary)] hover:underline">Mark all read</button>
                </div>
                <div className="max-h-64 overflow-y-auto">
                  {notifications.map((notif) => (
                    <div
                      key={notif.id}
                      className={`p-3 border-b border-[var(--border)] last:border-b-0 hover:bg-[var(--surface-2)] transition-colors cursor-pointer ${
                        !notif.read ? "bg-[var(--primary)]/5" : ""
                      }`}
                    >
                      <div className="flex items-start gap-2">
                        <div className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${!notif.read ? "bg-[var(--primary)]" : "bg-transparent"}`} />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-[var(--foreground)]">{notif.title}</p>
                          <p className="text-xs text-[var(--foreground-muted)] mt-0.5 truncate">{notif.message}</p>
                          <p className="text-[10px] text-[var(--foreground-dim)] mt-1">{notif.time}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="p-2 border-t border-[var(--border)]">
                  <button className="w-full text-xs text-center text-[var(--foreground-muted)] hover:text-[var(--primary)] py-1">
                    View all notifications
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* User Menu Dropdown */}
        <div ref={userRef} className="relative">
          <button
            onClick={() => {
              setShowUserMenu(!showUserMenu)
              setShowNotifications(false)
            }}
            className="w-8 h-8 rounded-full bg-[var(--primary)]/20 border border-[var(--primary)]/30 flex items-center justify-center hover:bg-[var(--primary)]/30 transition-colors"
            aria-label="User menu"
          >
            <User className="w-4 h-4 text-[var(--primary)]" />
          </button>

          <AnimatePresence>
            {showUserMenu && (
              <motion.div
                initial={{ opacity: 0, y: -10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.95 }}
                transition={{ duration: 0.15 }}
                className="absolute right-0 top-full mt-2 w-48 bg-[var(--surface)] border border-[var(--border)] rounded-xl shadow-xl z-50 overflow-hidden"
              >
                <div className="p-3 border-b border-[var(--border)]">
                  <p className="text-sm font-medium text-[var(--foreground)]">Guest User</p>
                  <p className="text-xs text-[var(--foreground-muted)]">Dhaka, Bangladesh</p>
                </div>
                <div className="p-1">
                  {["Profile Settings", "Preferences", "Health Profile", "Sign Out"].map((item) => (
                    <button
                      key={item}
                      className="w-full text-left px-3 py-2 text-sm text-[var(--foreground)] hover:bg-[var(--surface-2)] rounded-lg transition-colors"
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </header>
  )
}
