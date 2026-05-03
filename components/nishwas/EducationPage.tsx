"use client"

import { useState } from "react"
import { BookOpen, ChevronDown, ChevronUp, ExternalLink } from "lucide-react"

const aqiScale = [
  { range: "0–50", level: "Good", color: "#22c55e", desc: "Air quality is satisfactory with little or no risk." },
  { range: "51–100", level: "Moderate", color: "#eab308", desc: "Acceptable quality; some pollutants may be a concern for sensitive people." },
  { range: "101–150", level: "Unhealthy for Sensitive Groups", color: "#f97316", desc: "Sensitive groups may experience health effects. General public is not likely to be affected." },
  { range: "151–200", level: "Unhealthy", color: "#ef4444", desc: "Everyone may begin to experience health effects; sensitive groups more serious effects." },
  { range: "201–300", level: "Very Unhealthy", color: "#a855f7", desc: "Health alerts of emergency conditions. The entire population is more likely to be affected." },
  { range: "301+", level: "Hazardous", color: "#991b1b", desc: "Health warnings of emergency conditions. Everyone is more likely to be affected." },
]

const faqs = [
  {
    q: "What is PM2.5 and why is it dangerous?",
    a: "PM2.5 refers to fine particulate matter with a diameter of 2.5 micrometres or less. These tiny particles can penetrate deep into the lungs and bloodstream, causing cardiovascular and respiratory diseases, reduced lung function, and increased risk of heart attacks and strokes.",
  },
  {
    q: "How is the AQI calculated?",
    a: "The Air Quality Index (AQI) is calculated by measuring concentrations of key pollutants (PM2.5, PM10, O3, NO2, SO2, CO) and converting them to a single index number using a standardised formula. The highest individual pollutant AQI becomes the overall AQI.",
  },
  {
    q: "What are the main sources of air pollution in Dhaka?",
    a: "The main sources include brick kilns (~58%), vehicles (~10%), road dust (~5%), industries (~7%), and biomass burning (~18%). Seasonal factors like reduced rainfall and lower wind speeds make winter months significantly worse.",
  },
  {
    q: "How can air purifiers help?",
    a: "HEPA air purifiers can remove up to 99.97% of particles 0.3 microns or larger, including PM2.5. They are most effective in enclosed spaces. Look for purifiers with a CADR rating appropriate for your room size.",
  },
  {
    q: "What are the health effects of long-term exposure?",
    a: "Long-term exposure to high AQI levels is linked to chronic respiratory diseases like asthma and COPD, heart disease, stroke, lung cancer, cognitive decline, and reduced life expectancy. Children, elderly, and those with pre-existing conditions are most vulnerable.",
  },
]

const resources = [
  { title: "WHO Air Quality Guidelines 2021", url: "#", org: "WHO" },
  { title: "Bangladesh DoE Air Quality Reports", url: "#", org: "DoE Bangladesh" },
  { title: "IQAir World Air Quality Report", url: "#", org: "IQAir" },
  { title: "CAMS Global Air Quality Forecast", url: "#", org: "Copernicus" },
]

export default function EducationPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  return (
    <div className="flex flex-col gap-5 p-6">
      {/* AQI scale */}
      <div className="rounded-2xl bg-[var(--surface)] border border-[var(--border)] p-5">
        <div className="flex items-center gap-2 mb-4">
          <BookOpen className="w-4 h-4 text-[var(--primary)]" />
          <h2 className="text-sm font-semibold text-[var(--foreground)]">
            Understanding the AQI Scale
          </h2>
        </div>
        <div className="flex flex-col gap-2">
          {aqiScale.map(({ range, level, color, desc }) => (
            <div
              key={range}
              className="flex items-start gap-4 bg-[var(--surface-2)] rounded-xl p-3"
            >
              <div
                className="w-12 shrink-0 rounded-lg px-2 py-1 text-center text-[10px] font-bold text-white"
                style={{ backgroundColor: color }}
              >
                {range}
              </div>
              <div>
                <p className="text-sm font-semibold" style={{ color }}>
                  {level}
                </p>
                <p className="text-xs text-[var(--foreground-muted)] leading-relaxed mt-0.5">
                  {desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* FAQ */}
      <div className="rounded-2xl bg-[var(--surface)] border border-[var(--border)] p-5">
        <h2 className="text-sm font-semibold text-[var(--foreground)] mb-4">
          Frequently Asked Questions
        </h2>
        <div className="flex flex-col gap-2">
          {faqs.map(({ q, a }, i) => (
            <div
              key={i}
              className="border border-[var(--border)] rounded-xl overflow-hidden"
            >
              <button
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                className="w-full flex items-center justify-between gap-3 px-4 py-3.5 text-left hover:bg-[var(--surface-2)] transition-colors"
              >
                <span className="text-sm text-[var(--foreground)] font-medium">{q}</span>
                {openFaq === i ? (
                  <ChevronUp className="w-4 h-4 text-[var(--primary)] shrink-0" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-[var(--foreground-muted)] shrink-0" />
                )}
              </button>
              {openFaq === i && (
                <div className="px-4 pb-4 bg-[var(--surface-2)]">
                  <p className="text-sm text-[var(--foreground-muted)] leading-relaxed">{a}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Resources */}
      <div className="rounded-2xl bg-[var(--surface)] border border-[var(--border)] p-5">
        <h2 className="text-sm font-semibold text-[var(--foreground)] mb-4">
          Trusted Resources
        </h2>
        <div className="grid grid-cols-2 gap-3">
          {resources.map(({ title, url, org }) => (
            <a
              key={title}
              href={url}
              className="flex items-start justify-between gap-3 bg-[var(--surface-2)] rounded-xl p-4 hover:border-[var(--primary)]/30 border border-transparent transition-colors group"
            >
              <div>
                <p className="text-xs font-bold text-[var(--primary)] uppercase tracking-wider">
                  {org}
                </p>
                <p className="text-sm text-[var(--foreground)] font-medium mt-1 leading-snug">
                  {title}
                </p>
              </div>
              <ExternalLink className="w-4 h-4 text-[var(--foreground-dim)] group-hover:text-[var(--primary)] shrink-0 mt-0.5 transition-colors" />
            </a>
          ))}
        </div>
      </div>
    </div>
  )
}
