"use client"

import { motion, useReducedMotion } from "framer-motion"
import type { ReactNode } from "react"

interface ScrollRevealProps {
  children: ReactNode
  className?: string
  delay?: number
  /** Distance (px) the element travels up into place. */
  y?: number
}

// Confident exponential deceleration (ease-out-expo).
const EASE = [0.16, 1, 0.3, 1] as const

/**
 * Reveals content as it scrolls into view. Respects prefers-reduced-motion:
 * when reduced, content renders immediately at its final state — motion only
 * ever enhances an already-visible default, never gates visibility.
 */
export function ScrollReveal({
  children,
  className,
  delay = 0,
  y = 24,
}: ScrollRevealProps) {
  const reduce = useReducedMotion()

  if (reduce) {
    return <div className={className}>{children}</div>
  }

  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, ease: EASE, delay }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
