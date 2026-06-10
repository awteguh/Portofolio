import { contact } from "@/data/contact"
import { ScrollReveal } from "./ScrollReveal"
import { Mail, Link, GitFork, Globe } from "lucide-react"

const iconMap = {
  mail: Mail,
  linkedin: Link,
  github: GitFork,
  globe: Globe,
} as const

export function Contact() {
  return (
    <section id="contact" className="py-20 px-4">
      <div className="max-w-2xl mx-auto text-center">
        <ScrollReveal>
          <h2 className="text-2xl font-bold text-navy dark:text-ice mb-4">
            Get In Touch
          </h2>
          <p className="text-navy/70 dark:text-snow/70 mb-8">
            Tertarik untuk bekerja sama atau sekadar ingin menyapa? Jangan ragu
            untuk menghubungi saya.
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <div className="flex flex-wrap gap-4 justify-center">
            <a
              href={`mailto:${contact.email}`}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-ice/20 dark:bg-ice/10 text-navy dark:text-ice border border-ice/30 hover:bg-ice/40 dark:hover:bg-ice/20 transition-colors"
            >
              <Mail size={18} />
              <span className="text-sm font-medium">Email</span>
            </a>

            {contact.socials.map((social) => {
              const Icon = iconMap[social.icon]
              return (
                <a
                  key={social.platform}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-ice/20 dark:bg-ice/10 text-navy dark:text-ice border border-ice/30 hover:bg-ice/40 dark:hover:bg-ice/20 transition-colors"
                >
                  <Icon size={18} />
                  <span className="text-sm font-medium">{social.platform}</span>
                </a>
              )
            })}
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
