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
  image: string   // path relative to /public, e.g. /images/certs/xxx.jpg
  pdfUrl?: string // path to original PDF for download
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
  nickname: string
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
