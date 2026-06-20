import { experience } from "@/data/experience"
import { ScrollReveal } from "./ScrollReveal"
import { Section } from "./Section"
import { SectionHeading } from "./SectionHeading"

const SEVERITY_COLOR: Record<number, string> = {
  0: "text-online",   // current
  1: "text-ice",
  2: "text-steel-ink dark:text-snow/60",
  3: "text-steel-ink dark:text-snow/50",
}

export function Experience() {
  return (
    <Section id="experience">
      <div className="max-w-4xl mx-auto">
        <SectionHeading title="Experience" tag="SYS.LOG" align="center" />

        {/* Log-stream timeline */}
        <div className="mt-12 relative">
          {/* Spine */}
          <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-ice/25 dark:bg-ice/15" />

          {experience.map((exp, index) => {
            const isCurrent = exp.period.includes("Sekarang")
            const isLeft = index % 2 === 0

            return (
              <ScrollReveal key={index} delay={index * 0.1}>
                <div
                  className={`relative pl-8 md:pl-0 mb-10 md:w-1/2 ${
                    isLeft ? "md:pr-10 md:text-right" : "md:ml-auto md:pl-10"
                  }`}
                >
                  {/* Node dot */}
                  <div
                    className={`absolute top-3 w-3 h-3 rounded-full border-2 border-dark-bg left-[-6px] z-10
                      ${isCurrent
                        ? "bg-online shadow-[0_0_8px_2px_rgba(57,255,138,0.5)]"
                        : "bg-ice/60"
                      }
                      ${isLeft ? "md:left-auto md:right-[-7px]" : "md:left-[-7px]"}
                    `}
                  />

                  {/* Card */}
                  <div className="group relative overflow-hidden rounded-xl border border-steel/30 dark:border-steel/40 bg-white dark:bg-dark-card p-5 shadow-sm hover:shadow-lg hover:border-ice/50 dark:hover:border-ice/30 transition-all duration-300">
                    {/* Scan line */}
                    <div
                      className="pointer-events-none absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-transparent via-ice to-transparent opacity-0 group-hover:opacity-100 -translate-y-full group-hover:translate-y-[1000%] group-hover:transition-[transform,opacity] group-hover:duration-[600ms] group-hover:ease-in-out motion-reduce:hidden"
                      aria-hidden="true"
                    />

                    {/* Log-style header */}
                    <div className={`font-[family-name:var(--font-mono)] text-[10px] mb-2 flex items-center gap-2 flex-wrap ${isLeft ? "md:justify-end" : ""}`}>
                      <span className={isCurrent ? "text-online" : "text-steel-ink dark:text-snow/50"}>
                        {isCurrent ? "● ACTIVE" : "○ CLOSED"}
                      </span>
                      <span className="text-steel-ink dark:text-snow/40">{exp.period}</span>
                    </div>

                    <h3 className="font-bold text-navy dark:text-ice text-base">
                      {exp.title}
                    </h3>
                    <p className={`font-[family-name:var(--font-mono)] text-xs mt-0.5 mb-3 ${SEVERITY_COLOR[Math.min(index, 3)]}`}>
                      {exp.company}
                    </p>
                    <p className="text-sm text-navy/70 dark:text-snow/70 leading-relaxed">
                      {exp.description}
                    </p>
                  </div>
                </div>
              </ScrollReveal>
            )
          })}
        </div>
      </div>
    </Section>
  )
}
