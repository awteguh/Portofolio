import { personal } from "@/data/personal"
import { ScrollReveal } from "./ScrollReveal"
import { Section } from "./Section"

export function About() {
  return (
    <Section id="about">
      <div className="max-w-6xl mx-auto grid gap-10 md:grid-cols-[1fr_1.6fr] md:gap-16 items-start">
        <ScrollReveal>
          <h2 className="text-balance text-3xl md:text-4xl font-bold tracking-tight text-navy dark:text-snow">
            About Me
          </h2>
          <div className="mt-4 h-1 w-12 rounded-full bg-ice" />
          <p className="mt-6 text-sm font-medium text-steel-ink dark:text-ice/80">
            {personal.tagline}
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <p className="text-lg leading-relaxed text-pretty text-navy/80 dark:text-snow/80">
            {personal.description}
          </p>
        </ScrollReveal>
      </div>
    </Section>
  )
}
