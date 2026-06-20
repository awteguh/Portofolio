import { personal } from "@/data/personal"
import { ScrollReveal } from "./ScrollReveal"
import { Section } from "./Section"
import { SectionHeading } from "./SectionHeading"

export function About() {
  const paragraphs = personal.description.split("\n\n").filter(Boolean)

  return (
    <Section id="about">
      <div className="max-w-6xl mx-auto grid gap-12 md:grid-cols-[1fr_1.7fr] md:gap-16 items-start">

        {/* Left — heading only */}
        <ScrollReveal>
          <SectionHeading title="About Me" tag="PROFILE" />
        </ScrollReveal>

        {/* Right — bio paragraphs */}
        <ScrollReveal delay={0.15}>
          <div className="space-y-5">
            {paragraphs.map((para, i) => (
              <p
                key={i}
                className="text-base md:text-lg leading-relaxed text-pretty text-snow/75"
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
