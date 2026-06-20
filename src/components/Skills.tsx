import { skills } from "@/data/skills"
import { Stagger, StaggerItem } from "./Stagger"
import { Section } from "./Section"
import { SectionHeading } from "./SectionHeading"
import { ScanCard } from "./ScanCard"
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
          tag="CAPABILITIES"
          lead="Tiga disiplin yang saling menguatkan — dari dukungan pengguna sehari-hari, pemantauan keamanan, hingga otomasi infrastruktur."
        />

        <Stagger className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          {skills.map((skill) => {
            const Icon = iconMap[skill.icon]
            return (
              <StaggerItem key={skill.category}>
                <ScanCard className="p-6 h-full">
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
                        className="font-[family-name:var(--font-mono)] text-xs px-2.5 py-1 rounded bg-ice/15 dark:bg-ice/10 text-navy dark:text-ice border border-ice/30"
                      >
                        --{item.toLowerCase().replace(/[^a-z0-9]/g, "-")}
                      </span>
                    ))}
                  </div>
                </ScanCard>
              </StaggerItem>
            )
          })}
        </Stagger>
      </div>
    </Section>
  )
}
