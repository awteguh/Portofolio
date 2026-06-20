"use client"

import type { ReactNode } from "react"

/**
 * Wrapper that adds a horizontal scan-line sweep on hover —
 * the line crosses the card top-to-bottom like a radar sweep.
 * Uses CSS only; no JS needed. Respects reduced-motion.
 */
export function ScanCard({
  children,
  className = "",
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <div
      className={`
        group relative overflow-hidden
        rounded-xl border border-steel/30 dark:border-steel/40
        bg-white dark:bg-dark-card
        shadow-sm hover:shadow-lg
        hover:border-ice/50 dark:hover:border-ice/40
        hover:-translate-y-1
        transition-all duration-300
        ${className}
      `}
    >
      {/* Scan line — sweeps top→bottom on hover */}
      <div
        className="
          pointer-events-none absolute inset-x-0 top-0 h-0.5
          bg-gradient-to-r from-transparent via-ice to-transparent
          opacity-0 group-hover:opacity-100
          -translate-y-full group-hover:translate-y-[1000%]
          transition-none group-hover:transition-[transform,opacity]
          group-hover:duration-[600ms] group-hover:ease-in-out
          motion-reduce:hidden
        "
        aria-hidden="true"
      />
      {children}
    </div>
  )
}
