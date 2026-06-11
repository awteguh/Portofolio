export interface Skill {
  category: string
  icon: string
  items: string[]
}

export interface Experience {
  title: string
  company: string
  period: string
  description: string
}

export interface Certification {
  name: string
  issuer: string
  year: string
}

export interface Project {
  title: string
  description: string
  tags: string[]
  url?: string
}

export interface Social {
  platform: string
  url: string
  icon: "mail" | "linkedin" | "github" | "globe" | "whatsapp"
}

export interface Personal {
  name: string
  initials: string
  tagline: string
  description: string
  avatarUrl?: string
  resumeUrl?: string
}

export interface Contact {
  email: string
  socials: Social[]
}
