import { ScrollReveal } from "./ScrollReveal"

interface SectionHeadingProps {
  title: string
  lead?: string
  align?: "left" | "center"
  /** Short system tag shown in mono before the title e.g. "SYS" "LOG" "OPS" */
  tag?: string
}

export function SectionHeading({ title, lead, align = "left", tag }: SectionHeadingProps) {
  const centered = align === "center"
  return (
    <ScrollReveal className={centered ? "text-center" : ""}>
      {tag && (
        <p
          className={`font-[family-name:var(--font-mono)] text-xs text-online/80 tracking-widest mb-3 ${
            centered ? "justify-center" : ""
          } flex items-center gap-2`}
        >
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-online animate-pulse" />
          [{tag}]
        </p>
      )}
      <h2 className="text-balance text-3xl md:text-4xl font-bold tracking-tight text-navy dark:text-snow">
        {title}
      </h2>
      <div
        className={`mt-4 h-0.5 w-12 bg-ice ${centered ? "mx-auto" : ""}`}
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
