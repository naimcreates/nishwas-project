"use client"

import { LucideIcon } from "lucide-react"
import { ReactNode } from "react"

interface InfoCardProps {
  icon: LucideIcon
  iconColor: string
  title: string
  value: string | number
  badge?: ReactNode
  onClick?: () => void
  className?: string
}

export default function InfoCard({
  icon: Icon,
  iconColor,
  title,
  value,
  badge,
  onClick,
  className = "",
}: InfoCardProps) {
  const Component = onClick ? "button" : "div"
  
  return (
    <Component
      onClick={onClick}
      className={`rounded-xl bg-[var(--surface)] border border-[var(--border)] p-4 flex flex-col gap-3 transition-colors text-left ${
        onClick ? "hover:border-[var(--primary)]/30 cursor-pointer" : ""
      } ${className}`}
    >
      <div className="flex items-center">
        <div
          className="w-8 h-8 rounded-lg flex items-center justify-center"
          style={{ backgroundColor: `${iconColor}18` }}
        >
          <Icon className="w-4 h-4" style={{ color: iconColor }} />
        </div>
      </div>
      <div>
        <p className="text-[11px] text-[var(--foreground-muted)] mb-1">{title}</p>
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-base font-bold text-[var(--foreground)]">{value}</span>
          {badge}
        </div>
      </div>
    </Component>
  )
}
