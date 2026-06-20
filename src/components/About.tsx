import { personal } from "@/data/personal"
import { ScrollReveal } from "./ScrollReveal"
import { Stagger, StaggerItem } from "./Stagger"
import { Section } from "./Section"
import { Headset, ShieldCheck, ServerCog } from "lucide-react"

const focusAreas = [
  {
    icon: ShieldCheck,
    label: "SOC / IT Security",
    desc: "Monitoring, incident response & threat analysis",
  },
  {
    icon: Headset,
    label: "IT Support",
    desc: "Troubleshooting, jaringan & Active Directory",
  },
  {
    icon: ServerCog,
    label: "DevOps",
    desc: "CI/CD, Docker, Kubernetes & IaC",
  },
]

export function About() {
  const paragraphs = personal.description.split("\n\n").filter(Boolean)

  return (
    <Section id="about">
      <div className="max-w-6xl mx-auto grid gap-12 md:grid-cols-[1fr_1.7fr] md:gap-16 items-start">

        {/* Left — heading + focus cards */}
        <div>
          <ScrollReveal>
            <h2 className="text-balance text-3xl md:text-4xl font-bold tracking-tight text-navy dark:text-snow">
              About Me
            </h2>
            <div className="mt-4 h-1 w-12 rounded-full bg-ice" />
          </ScrollReveal>

          <Stagger className="mt-8 flex flex-col gap-3">
            {focusAreas.map(({ icon: Icon, label, desc }) => (
              <StaggerItem key={label}>
                <div className="flex items-start gap-3 rounded-xl border border-steel/25 dark:border-steel/30 bg-white dark:bg-dark-card px-4 py-3 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300">
                  <span className="mt-0.5 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-ice/20 dark:bg-ice/10 text-navy dark:text-ice ring-1 ring-ice/30">
                    <Icon size={16} strokeWidth={1.75} />
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-navy dark:text-snow">{label}</p>
                    <p className="text-xs text-steel-ink dark:text-snow/60 mt-0.5">{desc}</p>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>

        {/* Right — bio paragraphs */}
        <ScrollReveal delay={0.15}>
          <div className="space-y-5">
            {paragraphs.map((para, i) => (
              <p
                key={i}
                className="text-base md:text-lg leading-relaxed text-pretty text-navy/80 dark:text-snow/75"
              >
                {para}
              </p>
            ))}
          </div>
        </ScrollReveal>

      </div>
    </Section>
  )
}
