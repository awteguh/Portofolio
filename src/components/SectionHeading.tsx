import { ScrollReveal } from "./ScrollReveal"

interface SectionHeadingProps {
  title: string
  /** Optional short lead paragraph under the title. */
  lead?: string
  align?: "left" | "center"
}

/**
 * Consistent section title treatment: a strong heading with a short ice
 * accent rule beneath it. Alignment varies per section to break monotony.
 */
export function SectionHeading({ title, lead, align = "left" }: SectionHeadingProps) {
  const centered = align === "center"
  return (
    <ScrollReveal className={centered ? "text-center" : ""}>
      <h2 className="text-balance text-3xl md:text-4xl font-bold tracking-tight text-navy dark:text-snow">
        {title}
      </h2>
      <div
        className={`mt-4 h-1 w-12 rounded-full bg-ice ${centered ? "mx-auto" : ""}`}
      />
      {lead && (
        <p
          className={`mt-5 max-w-2xl text-base leading-relaxed text-navy/70 dark:text-snow/70 ${
            centered ? "mx-auto" : ""
          }`}
        >
          {lead}
        </p>
      )}
    </ScrollReveal>
  )
}
