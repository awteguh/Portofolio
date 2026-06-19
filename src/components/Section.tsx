import type { ReactNode } from "react"

interface SectionProps {
  id?: string
  children: ReactNode
  /** Alternate tonal background to create rhythm between sections. */
  alt?: boolean
  className?: string
}

/**
 * Section wrapper that establishes vertical rhythm via fluid spacing and an
 * optional alternating tonal background (snow ↔ mist in light, midnight ↔
 * surface in dark). Borders do the separating, per the design system.
 */
export function Section({ id, children, alt = false, className = "" }: SectionProps) {
  return (
    <section
      id={id}
      className={`px-4 [padding-block:clamp(4rem,9vw,7rem)] ${
        alt ? "bg-mist dark:bg-dark-surface" : "bg-snow dark:bg-dark-bg"
      } ${className}`}
    >
      {children}
    </section>
  )
}
