import { projects } from "@/data/projects"
import { ScrollReveal } from "./ScrollReveal"
import { ExternalLink } from "lucide-react"

export function Projects() {
  return (
    <section id="projects" className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <ScrollReveal>
          <h2 className="text-2xl font-bold text-navy dark:text-ice mb-10 text-center">
            Projects
          </h2>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((project, index) => (
            <ScrollReveal key={index} delay={index * 0.1}>
              <div className="rounded-xl border border-steel/30 dark:border-steel/40 bg-white dark:bg-dark-card p-6 shadow-sm hover:shadow-md hover:scale-[1.02] transition-all duration-300 h-full flex flex-col">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-bold text-navy dark:text-ice">
                    {project.title}
                  </h3>
                  {project.url && (
                    <a
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-steel hover:text-ice transition-colors shrink-0 ml-2"
                      aria-label={`View ${project.title}`}
                    >
                      <ExternalLink size={18} />
                    </a>
                  )}
                </div>
                <p className="text-sm text-navy/70 dark:text-snow/70 mb-4 flex-1">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs px-2.5 py-0.5 rounded-full bg-navy/10 dark:bg-ice/10 text-navy dark:text-ice"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
