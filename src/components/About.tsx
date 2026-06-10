import { personal } from "@/data/personal"
import { ScrollReveal } from "./ScrollReveal"

export function About() {
  return (
    <section id="about" className="py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <ScrollReveal>
          <div className="rounded-xl border border-steel/30 dark:border-steel/40 bg-white dark:bg-dark-card p-8 shadow-sm">
            <h2 className="text-2xl font-bold text-navy dark:text-ice mb-4">
              About Me
            </h2>
            <p className="text-navy/80 dark:text-snow/80 leading-relaxed">
              {personal.description}
            </p>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
