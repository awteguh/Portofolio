import { skills } from "@/data/skills"
import { Stagger, StaggerItem } from "./Stagger"
import { Section } from "./Section"
import { SectionHeading } from "./SectionHeading"
import { Headset, ShieldCheck, ServerCog, type LucideIcon } from "lucide-react"

const iconMap: Record<string, LucideIcon> = {
  headset: Headset,
  "shield-check": ShieldCheck,
  "server-cog": ServerCog,
}

export function Skills() {
  return (
    <Section id="skills" alt>
      <div className="max-w-6xl mx-auto">
        <SectionHeading
          title="Skills & Expertise"
          lead="Tiga disiplin yang saling menguatkan — dari dukungan pengguna sehari-hari, pemantauan keamanan, hingga otomasi infrastruktur."
        />

        <Stagger className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          {skills.map((skill) => {
            const Icon = iconMap[skill.icon]
            return (
              <StaggerItem key={skill.category}>
                <div className="group rounded-xl border border-steel/30 dark:border-steel/40 bg-white dark:bg-dark-card p-6 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 h-full">
                  <div className="flex items-center gap-3 mb-5">
                    <span className="inline-flex h-11 w-11 items-center justify-center rounded-lg bg-ice/20 dark:bg-ice/10 text-navy dark:text-ice ring-1 ring-ice/30 transition-transform duration-300 group-hover:scale-110">
                      {Icon && <Icon size={22} strokeWidth={1.75} />}
                    </span>
                    <h3 className="text-lg font-bold text-navy dark:text-snow">
                      {skill.category}
                    </h3>
                  </div>
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
              </StaggerItem>
            )
          })}
        </Stagger>
      </div>
    </Section>
  )
}
