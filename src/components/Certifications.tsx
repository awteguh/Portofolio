import { certifications } from "@/data/certifications"
import { Stagger, StaggerItem } from "./Stagger"
import { Section } from "./Section"
import { SectionHeading } from "./SectionHeading"
import { ScanCard } from "./ScanCard"
import { Award } from "lucide-react"

export function Certifications() {
  return (
    <Section id="certifications" alt>
      <div className="max-w-6xl mx-auto">
        <SectionHeading title="Certifications" tag="CLEARANCE" align="center" />

        <Stagger className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {certifications.map((cert, index) => (
            <StaggerItem key={index}>
              <ScanCard className="p-6 h-full">
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-lg bg-ice/20 dark:bg-ice/10 text-navy dark:text-ice ring-1 ring-ice/30 mb-4 transition-transform duration-300 group-hover:scale-110">
                  <Award size={22} strokeWidth={1.75} />
                </span>
                <h3 className="font-bold text-navy dark:text-snow text-sm mb-1 leading-snug">
                  {cert.name}
                </h3>
                <p className="font-[family-name:var(--font-mono)] text-xs text-steel-ink dark:text-snow/70">
                  {cert.issuer}
                </p>
                <p className="font-[family-name:var(--font-mono)] text-xs text-online/70 mt-1">
                  {cert.year}
                </p>
              </ScanCard>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </Section>
  )
}
