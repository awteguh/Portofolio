import { projects } from "@/data/projects"
import { Stagger, StaggerItem } from "./Stagger"
import { Section } from "./Section"
import { SectionHeading } from "./SectionHeading"
import { ArrowUpRight } from "lucide-react"

export function Projects() {
  return (
    <Section id="projects">
      <div className="max-w-6xl mx-auto">
        <SectionHeading
          title="Projects"
          lead="Pekerjaan representatif lintas monitoring, otomasi, dan keamanan."
        />

        <Stagger className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((project, index) => (
            <StaggerItem
              key={index}
              className={index === 0 ? "md:col-span-2" : ""}
            >
              <article
                className={`group relative rounded-xl border border-steel/30 dark:border-steel/40 bg-white dark:bg-dark-card p-6 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 h-full flex flex-col ${
                  index === 0 ? "md:p-8" : ""
                }`}
              >
                <div className="flex items-start justify-between gap-3 mb-2">
                  <h3
                    className={`font-bold text-navy dark:text-snow ${
                      index === 0 ? "text-xl md:text-2xl" : "text-lg"
                    }`}
                  >
                    {project.title}
                  </h3>
                  {project.url && (
                    <a
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-steel-ink dark:text-snow/70 hover:text-navy dark:hover:text-ice focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ice rounded transition-colors shrink-0"
                      aria-label={`View ${project.title}`}
                    >
                      <ArrowUpRight
                        size={20}
                        className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      />
                    </a>
                  )}
                </div>
                <p
                  className={`text-navy/70 dark:text-snow/70 mb-5 flex-1 ${
                    index === 0 ? "text-base max-w-2xl" : "text-sm"
                  }`}
                >
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs px-2.5 py-1 rounded-full bg-navy/10 dark:bg-ice/10 text-navy dark:text-ice"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </article>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </Section>
  )
}
