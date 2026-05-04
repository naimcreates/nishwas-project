"use client"

import { useEffect } from "react"
import { AlertTriangle, RefreshCw } from "lucide-react"
import { motion } from "framer-motion"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error("Application error:", error)
  }, [error])

  return (
    <div className="w-full h-full min-h-[60vh] flex flex-col items-center justify-center p-6 text-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 15 }}
        className="max-w-md w-full bg-[var(--surface)] border border-[var(--border)] rounded-2xl p-8 shadow-2xl flex flex-col items-center gap-5 relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 to-transparent pointer-events-none" />
        
        <div className="w-16 h-16 rounded-2xl bg-red-500/10 flex items-center justify-center shrink-0 relative z-10 shadow-inner">
          <AlertTriangle className="w-8 h-8 text-red-500" />
        </div>
        
        <div className="relative z-10">
          <h2 className="text-2xl font-bold text-[var(--foreground)] mb-2 tracking-tight">Something went wrong</h2>
          <p className="text-sm text-[var(--foreground-muted)] mb-6 leading-relaxed">
            We encountered an unexpected issue while loading this page. 
            Don't worry, your data is safe.
          </p>
        </div>
        
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => reset()}
          className="relative z-10 flex items-center gap-2 bg-[var(--primary)] text-[var(--primary-foreground)] px-6 py-3 rounded-xl font-medium shadow-lg shadow-[var(--primary)]/20 hover:bg-[var(--primary-dim)] transition-colors"
        >
          <RefreshCw className="w-4 h-4" />
          Try again
        </motion.button>
      </motion.div>
    </div>
  )
}
