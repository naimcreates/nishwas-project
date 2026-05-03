"use client"

import { useNishwasStore } from "@/lib/store"
import Image from "next/image"
import { ArrowRight, BookOpen } from "lucide-react"

const categoryColors: Record<string, string> = {
  ALERT: "#ef4444",
  NEWS: "#3b82f6",
  COMMUNITY: "#10b981",
}

export default function NewsSection() {
  const { news } = useNishwasStore()

  return (
    <div>
      <div className="flex items-center gap-2 mb-4">
        <BookOpen className="w-4 h-4 text-[var(--primary)]" />
        <h2 className="text-sm font-semibold text-[var(--foreground)]">
          Local Eco Headlines
        </h2>
      </div>
      <div className="grid grid-cols-3 gap-4">
        {news.map((item) => {
          const catColor = categoryColors[item.category] ?? "#10b981"
          return (
            <article
              key={item.id}
              className="rounded-2xl bg-[var(--surface)] border border-[var(--border)] overflow-hidden hover:border-[var(--primary)]/30 transition-all cursor-pointer group"
            >
              {/* Image */}
              <div className="relative w-full h-40 overflow-hidden">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--surface)] via-transparent to-transparent opacity-60" />
                {/* Category badge */}
                <span
                  className="absolute top-2.5 left-2.5 text-[9px] font-bold px-2 py-1 rounded-md uppercase tracking-wider text-white"
                  style={{ backgroundColor: catColor }}
                >
                  {item.category}
                </span>
              </div>

              {/* Content */}
              <div className="p-4 flex flex-col gap-2">
                <h3 className="text-sm font-semibold text-[var(--foreground)] leading-snug line-clamp-2">
                  {item.title}
                </h3>
                <p className="text-xs text-[var(--foreground-muted)] leading-relaxed line-clamp-2">
                  {item.description}
                </p>
                <div className="flex items-center justify-between mt-1">
                  <span className="text-[10px] text-[var(--foreground-dim)] uppercase tracking-wider">
                    {item.timestamp}
                  </span>
                  <ArrowRight className="w-3.5 h-3.5 text-[var(--foreground-dim)] group-hover:text-[var(--primary)] group-hover:translate-x-0.5 transition-all" />
                </div>
              </div>
            </article>
          )
        })}
      </div>
    </div>
  )
}
