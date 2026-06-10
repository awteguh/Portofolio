# Portfolio Landing Page — Aw Teguh

## Overview

Personal portfolio landing page dashboard for Aw Teguh — an IT Support, SOC Analyst, and DevOps Engineer. Single-page application built with Next.js 15 (App Router) featuring a hybrid layout: full-width hero section followed by dashboard-style card grid sections.

All content is stored in separate TypeScript data files so that editing content requires zero knowledge of React or component code.

## Tech Stack

- **Next.js 15** — App Router (`app/` directory), React Server Components where applicable
- **TypeScript** — type-safe data files and components
- **Tailwind CSS v4** — utility-first styling, built-in dark mode via `class` strategy
- **Framer Motion** — scroll-reveal animations and hover effects (medium level)

## Color Palette

| Name       | Hex       | Role                                      |
|------------|-----------|-------------------------------------------|
| Navy       | `#000080` | Primary — headings, dark mode accents      |
| Slate      | `#6D8196` | Secondary — borders, muted text, gradients |
| Light Blue | `#ADD8E6` | Accent — links, highlights, badges         |
| Snow       | `#FFFAFA` | Background (light mode), text (dark mode)  |

### Light Mode
- Background: Snow (`#FFFAFA`)
- Text: Navy (`#000080`)
- Card background: white with Light Blue border
- Accent: Light Blue (`#ADD8E6`)

### Dark Mode (Default)
- Background: Deep Navy (`#0a0a2e`)
- Text: Snow (`#FFFAFA`)
- Card background: `rgba(109,129,150,0.15)` with Slate border
- Accent: Light Blue (`#ADD8E6`)

## Layout — Hybrid (Hero + Dashboard Grid)

### Navbar (fixed top)
- Logo/initials "AT" on the left
- Navigation links: Home, About, Skills, Experience, Certifications, Projects, Contact
- Dark/Light mode toggle button on the right
- Transparent background with backdrop blur, solid on scroll
- Mobile: hamburger menu

### Hero Section (full-width)
- Gradient background: Navy → Slate (dark) / Light Blue → Slate (light)
- Avatar circle with initials "AT" (or photo placeholder)
- Name: "Aw Teguh"
- Tagline: "IT Support · SOC Analyst · DevOps Engineer"
- Short description line
- Two CTA buttons: "Download CV" (primary) and "Contact Me" (outline)

### About Section
- Full-width card
- Short bio paragraph about professional background

### Skills Section (3-column grid)
Three category cards, each containing:
- Icon/emoji
- Category title (IT Support, SOC, DevOps)
- List of skills as tags/badges

### Experience Section
- Timeline layout with left border line
- Each entry: job title, company, date range, description
- Entries ordered newest-first

### Certifications Section
- Grid of certification badges/cards
- Each: certification name, issuer, year

### Projects Section
- Grid of project cards
- Each: project name, description, tech tags, optional link

### Contact Section
- Centered layout
- Social links as icon buttons (Email, LinkedIn, GitHub)

## Data Architecture

All content lives in `src/data/`. Each file exports a typed constant.

### `src/data/personal.ts`
```typescript
export const personal = {
  name: "Aw Teguh",
  initials: "AT",
  tagline: "IT Support · SOC Analyst · DevOps Engineer",
  description: "...",
  avatarUrl: "/images/avatar.png", // optional
  resumeUrl: "/files/resume.pdf",  // optional
}
```

### `src/data/skills.ts`
```typescript
export const skills = [
  {
    category: "IT Support",
    icon: "🛡️",
    items: ["Windows Server", "Active Directory", "Networking", "Troubleshooting"]
  },
  // ...
]
```

### `src/data/experience.ts`
```typescript
export const experience = [
  {
    title: "DevOps Engineer",
    company: "PT Contoh",
    period: "2023 - Sekarang",
    description: "Mengelola CI/CD pipeline, Docker, Kubernetes..."
  },
  // ...
]
```

### `src/data/certifications.ts`
```typescript
export const certifications = [
  {
    name: "CompTIA Security+",
    issuer: "CompTIA",
    year: "2023"
  },
  // ...
]
```

### `src/data/projects.ts`
```typescript
export const projects = [
  {
    title: "Monitoring Dashboard",
    description: "Setup Grafana + Prometheus monitoring stack...",
    tags: ["Grafana", "Prometheus", "Docker"],
    url: "https://github.com/..." // optional
  },
  // ...
]
```

### `src/data/contact.ts`
```typescript
export const contact = {
  email: "awteguh@email.com",
  socials: [
    { platform: "LinkedIn", url: "https://linkedin.com/in/...", icon: "linkedin" },
    { platform: "GitHub", url: "https://github.com/...", icon: "github" },
  ]
}
```

## Component Structure

```
src/
  app/
    layout.tsx          — root layout, font loading, ThemeProvider
    page.tsx            — assembles all sections
    globals.css         — Tailwind imports, custom CSS variables
  components/
    Navbar.tsx          — fixed navbar with theme toggle
    Hero.tsx            — hero section
    About.tsx           — about section
    Skills.tsx          — skill category cards grid
    Experience.tsx      — timeline
    Certifications.tsx  — cert badges grid
    Projects.tsx        — project cards grid
    Contact.tsx         — contact links/form
    ThemeToggle.tsx     — dark/light switch button
    ScrollReveal.tsx    — Framer Motion wrapper for scroll animations
    Footer.tsx          — simple footer
  data/
    personal.ts
    skills.ts
    experience.ts
    certifications.ts
    projects.ts
    contact.ts
    types.ts            — shared TypeScript interfaces
```

## Animations (Medium Level)

- **Scroll reveal:** sections fade-in + slide-up when entering viewport (Framer Motion `whileInView`)
- **Card hover:** subtle scale (1.02) + shadow elevation on hover
- **Navbar:** background transitions from transparent to solid on scroll
- **Theme toggle:** smooth color transitions via CSS `transition` on background/color (300ms)
- **Smooth scroll:** CSS `scroll-behavior: smooth` + navbar link scroll-to-section

## Responsive Breakpoints

- **Mobile (< 640px):** single column, hamburger nav, stacked cards
- **Tablet (640px - 1024px):** 2-column grid
- **Desktop (> 1024px):** 3-column skill cards, 2-column for experience/certs/projects

## Performance Considerations

- Next.js static export (`output: 'export'`) — can be deployed anywhere (Vercel, Netlify, GitHub Pages)
- Images via `next/image` for optimization
- Framer Motion tree-shaken — only import what's used
- Tailwind CSS purges unused styles in production

## Placeholder Content

All data files will be pre-filled with realistic placeholder content relevant to IT Support/SOC/DevOps. User only needs to replace with their actual data. Each data file has clear TypeScript types so the editor provides autocomplete guidance.
