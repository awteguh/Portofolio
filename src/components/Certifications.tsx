import { certifications } from "@/data/certifications"
import { Stagger, StaggerItem } from "./Stagger"
import { Section } from "./Section"
import { SectionHeading } from "./SectionHeading"
import { Award } from "lucide-react"

export function Certifications() {
  return (
    <Section id="certifications" alt>
      <div className="max-w-6xl mx-auto">
        <SectionHeading title="Certifications" align="center" />

        <Stagger className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {certifications.map((cert, index) => (
            <StaggerItem key={index}>
              <div className="group rounded-xl border border-steel/30 dark:border-steel/40 bg-white dark:bg-dark-card p-6 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 h-full">
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-lg bg-ice/20 dark:bg-ice/10 text-navy dark:text-ice ring-1 ring-ice/30 mb-4 transition-transform duration-300 group-hover:scale-110">
                  <Award size={22} strokeWidth={1.75} />
                </span>
                <h3 className="font-bold text-navy dark:text-snow text-sm mb-1">
                  {cert.name}
                </h3>
                <p className="text-xs text-steel-ink dark:text-snow/70">
                  {cert.issuer}
                </p>
                <p className="text-xs text-steel-ink dark:text-snow/60 mt-1">
                  {cert.year}
                </p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </Section>
  )
}
