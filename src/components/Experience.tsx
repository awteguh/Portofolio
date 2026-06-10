import { experience } from "@/data/experience"
import { ScrollReveal } from "./ScrollReveal"

export function Experience() {
  return (
    <section id="experience" className="py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <ScrollReveal>
          <h2 className="text-2xl font-bold text-navy dark:text-ice mb-10 text-center">
            Experience
          </h2>
        </ScrollReveal>

        <div className="relative">
          <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-0.5 bg-ice/40 dark:bg-ice/20" />

          {experience.map((exp, index) => (
            <ScrollReveal key={index} delay={index * 0.1}>
              <div
                className={`relative pl-8 md:pl-0 mb-10 md:w-1/2 ${
                  index % 2 === 0
                    ? "md:pr-10 md:text-right"
                    : "md:ml-auto md:pl-10"
                }`}
              >
                <div
                  className={`absolute top-1 w-3 h-3 rounded-full bg-ice border-2 border-snow dark:border-dark-bg left-[-6px] ${
                    index % 2 === 0
                      ? "md:left-auto md:right-[-6px]"
                      : "md:left-[-6px]"
                  }`}
                />
                <div className="rounded-xl border border-steel/30 dark:border-steel/40 bg-white dark:bg-dark-card p-5 shadow-sm hover:shadow-md transition-shadow">
                  <h3 className="font-bold text-navy dark:text-ice">
                    {exp.title}
                  </h3>
                  <p className="text-sm text-steel dark:text-steel font-medium">
                    {exp.company}
                  </p>
                  <p className="text-xs text-steel/70 dark:text-snow/50 mb-2">
                    {exp.period}
                  </p>
                  <p className="text-sm text-navy/70 dark:text-snow/70">
                    {exp.description}
                  </p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
