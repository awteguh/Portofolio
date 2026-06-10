import { certifications } from "@/data/certifications"
import { ScrollReveal } from "./ScrollReveal"
import { Award } from "lucide-react"

export function Certifications() {
  return (
    <section id="certifications" className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <ScrollReveal>
          <h2 className="text-2xl font-bold text-navy dark:text-ice mb-10 text-center">
            Certifications
          </h2>
        </ScrollReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {certifications.map((cert, index) => (
            <ScrollReveal key={index} delay={index * 0.1}>
              <div className="rounded-xl border border-steel/30 dark:border-steel/40 bg-white dark:bg-dark-card p-5 shadow-sm hover:shadow-md hover:scale-[1.02] transition-all duration-300 text-center h-full">
                <Award
                  size={32}
                  className="mx-auto mb-3 text-ice dark:text-ice"
                />
                <h3 className="font-bold text-navy dark:text-ice text-sm mb-1">
                  {cert.name}
                </h3>
                <p className="text-xs text-steel dark:text-snow/60">
                  {cert.issuer}
                </p>
                <p className="text-xs text-steel/60 dark:text-snow/40 mt-1">
                  {cert.year}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
