"use client"

import { useState } from "react"
import { CheckCircle2, Circle, Zap, Leaf, Car, Recycle, Home } from "lucide-react"

const actions = [
  {
    id: "1",
    icon: Leaf,
    color: "#10b981",
    title: "Plant a tree in your neighbourhood",
    desc: "One tree absorbs ~22kg of CO₂ per year. Find a spot and plant today.",
    impact: "High Impact",
    impactColor: "#10b981",
    points: 50,
  },
  {
    id: "2",
    icon: Car,
    color: "#3b82f6",
    title: "Use public transport or carpool",
    desc: "Replacing one car trip reduces your carbon footprint by 2.6kg of CO₂.",
    impact: "High Impact",
    impactColor: "#10b981",
    points: 30,
  },
  {
    id: "3",
    icon: Home,
    color: "#a78bfa",
    title: "Switch off unused appliances",
    desc: "Standby power accounts for 10% of household energy use.",
    impact: "Medium Impact",
    impactColor: "#eab308",
    points: 20,
  },
  {
    id: "4",
    icon: Recycle,
    color: "#f97316",
    title: "Separate waste for recycling",
    desc: "Proper waste segregation reduces landfill methane emissions.",
    impact: "Medium Impact",
    impactColor: "#eab308",
    points: 20,
  },
  {
    id: "5",
    icon: Zap,
    color: "#fbbf24",
    title: "Report a pollution violation",
    desc: "Use Nishwas community reports or contact DoE to flag violations.",
    impact: "Community Impact",
    impactColor: "#3b82f6",
    points: 40,
  },
]

const initiatives = [
  { title: "Dhaka Green Belt Initiative", progress: 68, target: "500 trees", current: "340 trees" },
  { title: "Clean Air Bus Campaign", progress: 45, target: "100 buses", current: "45 buses" },
  { title: "Industrial Compliance Drive", progress: 82, target: "200 factories", current: "164 factories" },
]

export default function ActionPage() {
  const [completed, setCompleted] = useState<Set<string>>(new Set())
  const totalPoints = Array.from(completed).reduce((sum, id) => {
    const a = actions.find((x) => x.id === id)
    return sum + (a?.points ?? 0)
  }, 0)

  const toggle = (id: string) => {
    setCompleted((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  return (
    <div className="flex flex-col gap-5 p-6">
      {/* Points banner */}
      <div className="rounded-2xl bg-[var(--primary)]/10 border border-[var(--primary)]/20 p-5 flex items-center justify-between">
        <div>
          <p className="text-xs text-[var(--primary)] uppercase tracking-wider mb-1">
            Your Green Score
          </p>
          <p className="text-3xl font-bold text-[var(--foreground)]">
            {totalPoints}{" "}
            <span className="text-sm font-normal text-[var(--foreground-muted)]">points</span>
          </p>
          <p className="text-xs text-[var(--foreground-muted)] mt-1">
            Complete actions to earn points and reduce your carbon footprint
          </p>
        </div>
        <div className="w-16 h-16 rounded-2xl bg-[var(--primary)]/20 flex items-center justify-center">
          <Leaf className="w-8 h-8 text-[var(--primary)]" />
        </div>
      </div>

      {/* Action checklist */}
      <div className="rounded-2xl bg-[var(--surface)] border border-[var(--border)] p-5">
        <h3 className="text-sm font-semibold text-[var(--foreground)] mb-4">
          Today&apos;s Green Actions
        </h3>
        <div className="flex flex-col gap-3">
          {actions.map((action) => {
            const done = completed.has(action.id)
            return (
              <button
                key={action.id}
                onClick={() => toggle(action.id)}
                className={`flex items-start gap-4 p-4 rounded-xl border text-left transition-all ${
                  done
                    ? "bg-[var(--primary)]/8 border-[var(--primary)]/25"
                    : "bg-[var(--surface-2)] border-[var(--border)] hover:border-[var(--primary)]/20"
                }`}
              >
                <div
                  className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0 mt-0.5"
                  style={{ backgroundColor: `${action.color}18` }}
                >
                  <action.icon className="w-4 h-4" style={{ color: action.color }} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <p
                      className={`text-sm font-semibold ${
                        done
                          ? "line-through text-[var(--foreground-muted)]"
                          : "text-[var(--foreground)]"
                      }`}
                    >
                      {action.title}
                    </p>
                    <div className="flex items-center gap-1.5 shrink-0">
                      <span
                        className="text-[9px] font-bold px-1.5 py-0.5 rounded-md"
                        style={{
                          backgroundColor: `${action.impactColor}18`,
                          color: action.impactColor,
                        }}
                      >
                        {action.impact}
                      </span>
                      <span className="text-xs font-bold text-[var(--primary)]">
                        +{action.points}pts
                      </span>
                    </div>
                  </div>
                  <p className="text-xs text-[var(--foreground-muted)] mt-1 leading-relaxed">
                    {action.desc}
                  </p>
                </div>
                <div className="shrink-0 mt-0.5">
                  {done ? (
                    <CheckCircle2 className="w-5 h-5 text-[var(--primary)]" />
                  ) : (
                    <Circle className="w-5 h-5 text-[var(--foreground-dim)]" />
                  )}
                </div>
              </button>
            )
          })}
        </div>
      </div>

      {/* City initiatives */}
      <div className="rounded-2xl bg-[var(--surface)] border border-[var(--border)] p-5">
        <h3 className="text-sm font-semibold text-[var(--foreground)] mb-4">
          City Initiatives Progress
        </h3>
        <div className="flex flex-col gap-4">
          {initiatives.map((init) => (
            <div key={init.title}>
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-sm text-[var(--foreground)]">{init.title}</span>
                <span className="text-xs text-[var(--foreground-muted)]">
                  {init.current} / {init.target}
                </span>
              </div>
              <div className="w-full h-2 rounded-full bg-[var(--surface-2)] overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-700"
                  style={{
                    width: `${init.progress}%`,
                    background: `linear-gradient(90deg, var(--primary), #34d399)`,
                  }}
                />
              </div>
              <span className="text-[10px] text-[var(--foreground-dim)] mt-1 block">
                {init.progress}% complete
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
