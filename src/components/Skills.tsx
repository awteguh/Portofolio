import { skills } from "@/data/skills"
import { ScrollReveal } from "./ScrollReveal"

export function Skills() {
  return (
    <section id="skills" className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <ScrollReveal>
          <h2 className="text-2xl font-bold text-navy dark:text-ice mb-10 text-center">
            Skills & Expertise
          </h2>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {skills.map((skill, index) => (
            <ScrollReveal key={skill.category} delay={index * 0.1}>
              <div className="rounded-xl border border-steel/30 dark:border-steel/40 bg-white dark:bg-dark-card p-6 shadow-sm hover:shadow-md hover:scale-[1.02] transition-all duration-300 h-full">
                <div className="text-4xl mb-3">{skill.icon}</div>
                <h3 className="text-lg font-bold text-navy dark:text-ice mb-4">
                  {skill.category}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {skill.items.map((item) => (
                    <span
                      key={item}
                      className="text-xs px-3 py-1 rounded-full bg-ice/20 dark:bg-ice/10 text-navy dark:text-ice border border-ice/30"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
