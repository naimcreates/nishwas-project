"use client"

import { usePathname, useRouter } from "next/navigation"
import {
  Home,
  Cloud,
  Activity,
  Users,
  Zap,
  BookOpen,
  Wind,
} from "lucide-react"

const navItems = [
  { label: "Home", icon: Home, href: "/" },
  { label: "Go Outside", icon: Cloud, href: "/go-outside" },
  { label: "Exposure", icon: Activity, href: "/exposure" },
  { label: "Community", icon: Users, href: "/community" },
  { label: "Action", icon: Zap, href: "/action" },
  { label: "Education", icon: BookOpen, href: "/education" },
]

export default function Sidebar() {
  const pathname = usePathname()
  const router = useRouter()

  return (
    <aside className="w-64 shrink-0 h-full flex flex-col border-r border-[var(--border)] bg-[var(--surface)]">
      {/* Logo */}
      <div className="flex items-center gap-3 px-5 py-5 border-b border-[var(--border)]">
        <div className="w-8 h-8 rounded-lg bg-[var(--primary)] flex items-center justify-center shrink-0">
          <Wind className="w-4 h-4 text-[var(--primary-foreground)]" />
        </div>
        <span className="text-[var(--foreground)] font-semibold text-lg tracking-tight">
          Nishwas
        </span>
      </div>

      {/* Nav */}
      <nav className="flex-1 py-4 px-3 space-y-1">
        {navItems.map(({ label, icon: Icon, href }) => {
          const isActive = pathname === href
          return (
            <button
              key={label}
              onClick={() => router.push(href)}
              className={`
                w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium
                transition-all duration-150 cursor-pointer
                ${
                  isActive
                    ? "bg-[var(--primary)]/15 text-[var(--primary)] border border-[var(--primary)]/25"
                    : "text-[var(--foreground-muted)] hover:text-[var(--foreground)] hover:bg-[var(--surface-2)]"
                }
              `}
            >
              <Icon className="w-4 h-4 shrink-0" />
              {label}
            </button>
          )
        })}
      </nav>

      {/* Bottom status */}
      <div className="px-4 py-4 border-t border-[var(--border)]">
        <div className="flex items-center gap-2 text-xs text-[var(--foreground-muted)]">
          <span className="w-2 h-2 rounded-full bg-[var(--primary)] animate-pulse shrink-0" />
          Live data · Updated now
        </div>
      </div>
    </aside>
  )
}
