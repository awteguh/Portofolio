# Portfolio Landing Page — Aw Teguh — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a personal portfolio landing page for Aw Teguh (IT Support / SOC / DevOps) with hybrid layout, dark/light toggle, scroll animations, and separated data files.

**Architecture:** Single-page Next.js 15 App Router application. All content stored in typed data files under `src/data/`. Components are small, focused, and use Tailwind CSS v4 for styling with Framer Motion for scroll-reveal animations. Theme toggling via next-themes with class-based dark mode.

**Tech Stack:** Next.js 15 (App Router), TypeScript, Tailwind CSS v4, Framer Motion, next-themes, lucide-react

---

## File Structure

```
src/
  app/
    layout.tsx          — root layout: font, metadata, ThemeProvider wrapper
    page.tsx            — assembles all sections in order
    globals.css         — Tailwind v4 imports, @theme colors, dark mode config
  components/
    ThemeProvider.tsx    — next-themes wrapper (client component)
    ThemeToggle.tsx      — sun/moon toggle button (client component)
    ScrollReveal.tsx     — Framer Motion whileInView wrapper (client component)
    Navbar.tsx           — fixed navbar with mobile hamburger (client component)
    Hero.tsx             — hero section with gradient, name, CTA
    About.tsx            — about paragraph card
    Skills.tsx           — 3-column skill category cards
    Experience.tsx       — timeline with left border
    Certifications.tsx   — certification badge grid
    Projects.tsx         — project card grid
    Contact.tsx          — social link buttons
    Footer.tsx           — simple copyright footer
  data/
    types.ts            — shared TypeScript interfaces
    personal.ts         — name, tagline, bio, avatar, resume
    skills.ts           — skills grouped by category
    experience.ts       — work history entries
    certifications.ts   — cert list
    projects.ts         — project entries
    contact.ts          — email + social links
```

---

## Task 1: Scaffold Next.js Project and Install Dependencies

**Files:**
- Create: `package.json` (via create-next-app)
- Create: `tsconfig.json` (via create-next-app)
- Create: `src/app/layout.tsx` (via create-next-app, will be replaced in Task 5)
- Create: `src/app/page.tsx` (via create-next-app, will be replaced in Task 11)
- Create: `src/app/globals.css` (via create-next-app, will be replaced in Task 3)

- [ ] **Step 1: Move existing docs out of the way**

The `docs/` and `.superpowers/` folders from brainstorming will conflict with create-next-app's empty directory check. Move them temporarily.

Run:
```bash
cd d:/Project/Portofolio
mv docs docs_bak 2>/dev/null; mv .superpowers .superpowers_bak 2>/dev/null
```

- [ ] **Step 2: Scaffold Next.js 15 project**

Run:
```bash
cd d:/Project/Portofolio
npx create-next-app@latest . --typescript --tailwind --eslint --app --src-dir --import-alias "@/*" --turbopack
```

If prompted for package manager, choose npm.

- [ ] **Step 3: Restore docs folders**

Run:
```bash
cd d:/Project/Portofolio
mv docs_bak docs 2>/dev/null; mv .superpowers_bak .superpowers 2>/dev/null
```

- [ ] **Step 4: Install additional dependencies**

Run:
```bash
cd d:/Project/Portofolio
npm install framer-motion next-themes lucide-react
```

- [ ] **Step 5: Verify project builds**

Run:
```bash
cd d:/Project/Portofolio
npm run build
```

Expected: Build succeeds with no errors.

- [ ] **Step 6: Add .superpowers to .gitignore**

Append to `.gitignore`:
```
.superpowers/
```

- [ ] **Step 7: Commit**

```bash
git init
git add -A
git commit -m "chore: scaffold Next.js 15 project with Tailwind, Framer Motion, next-themes"
```

---

## Task 2: TypeScript Types and Data Files

**Files:**
- Create: `src/data/types.ts`
- Create: `src/data/personal.ts`
- Create: `src/data/skills.ts`
- Create: `src/data/experience.ts`
- Create: `src/data/certifications.ts`
- Create: `src/data/projects.ts`
- Create: `src/data/contact.ts`

- [ ] **Step 1: Create shared types**

Create `src/data/types.ts`:

```typescript
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
  icon: "mail" | "linkedin" | "github" | "globe"
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
```

- [ ] **Step 2: Create personal data**

Create `src/data/personal.ts`:

```typescript
import type { Personal } from "./types"

// ✏️ Edit data di bawah ini untuk mengubah informasi pribadi
export const personal: Personal = {
  name: "Aw Teguh",
  initials: "AT",
  tagline: "IT Support · SOC Analyst · DevOps Engineer",
  description:
    "Profesional IT dengan pengalaman di bidang IT Support, Security Operations Center, dan DevOps Engineering. Berpengalaman mengelola infrastruktur jaringan, monitoring keamanan siber, serta membangun dan mengelola pipeline CI/CD untuk deployment yang efisien dan andal.",
  // avatarUrl: "/images/avatar.png",
  // resumeUrl: "/files/resume.pdf",
}
```

- [ ] **Step 3: Create skills data**

Create `src/data/skills.ts`:

```typescript
import type { Skill } from "./types"

// ✏️ Edit data di bawah ini untuk mengubah daftar keahlian
export const skills: Skill[] = [
  {
    category: "IT Support",
    icon: "🛡️",
    items: [
      "Windows Server",
      "Active Directory",
      "Networking & TCP/IP",
      "Troubleshooting",
      "Help Desk Management",
      "Hardware Maintenance",
    ],
  },
  {
    category: "SOC Analyst",
    icon: "🔒",
    items: [
      "SIEM (Splunk / Wazuh)",
      "Incident Response",
      "Threat Analysis",
      "Log Monitoring",
      "Vulnerability Assessment",
      "Firewall Management",
    ],
  },
  {
    category: "DevOps",
    icon: "⚙️",
    items: [
      "Docker & Kubernetes",
      "CI/CD (Jenkins / GitHub Actions)",
      "Linux Administration",
      "Cloud (AWS / GCP)",
      "Terraform / Ansible",
      "Monitoring (Grafana / Prometheus)",
    ],
  },
]
```

- [ ] **Step 4: Create experience data**

Create `src/data/experience.ts`:

```typescript
import type { Experience } from "./types"

// ✏️ Edit data di bawah ini untuk mengubah pengalaman kerja
// Urutkan dari yang terbaru di atas
export const experience: Experience[] = [
  {
    title: "DevOps Engineer",
    company: "PT Teknologi Nusantara",
    period: "2024 - Sekarang",
    description:
      "Mengelola infrastruktur cloud, membangun CI/CD pipeline dengan GitHub Actions dan Jenkins, serta mengimplementasikan container orchestration menggunakan Docker dan Kubernetes.",
  },
  {
    title: "SOC Analyst",
    company: "PT Keamanan Siber Indonesia",
    period: "2022 - 2024",
    description:
      "Monitoring keamanan jaringan menggunakan SIEM, melakukan incident response, threat hunting, dan vulnerability assessment untuk klien enterprise.",
  },
  {
    title: "IT Support Specialist",
    company: "CV Solusi Digital",
    period: "2020 - 2022",
    description:
      "Menangani troubleshooting hardware dan software, mengelola Active Directory, jaringan kantor, serta memberikan dukungan teknis kepada end-user.",
  },
]
```

- [ ] **Step 5: Create certifications data**

Create `src/data/certifications.ts`:

```typescript
import type { Certification } from "./types"

// ✏️ Edit data di bawah ini untuk mengubah daftar sertifikasi
export const certifications: Certification[] = [
  {
    name: "CompTIA Security+",
    issuer: "CompTIA",
    year: "2023",
  },
  {
    name: "AWS Cloud Practitioner",
    issuer: "Amazon Web Services",
    year: "2023",
  },
  {
    name: "Certified Kubernetes Administrator",
    issuer: "CNCF",
    year: "2024",
  },
  {
    name: "CCNA",
    issuer: "Cisco",
    year: "2022",
  },
]
```

- [ ] **Step 6: Create projects data**

Create `src/data/projects.ts`:

```typescript
import type { Project } from "./types"

// ✏️ Edit data di bawah ini untuk mengubah daftar project
export const projects: Project[] = [
  {
    title: "Monitoring Dashboard",
    description:
      "Setup stack monitoring menggunakan Grafana dan Prometheus untuk memantau performa server dan aplikasi secara real-time.",
    tags: ["Grafana", "Prometheus", "Docker", "Linux"],
    url: "https://github.com/awteguh/monitoring-dashboard",
  },
  {
    title: "CI/CD Pipeline Automation",
    description:
      "Membangun pipeline otomatis untuk build, test, dan deployment menggunakan GitHub Actions dengan multi-environment support.",
    tags: ["GitHub Actions", "Docker", "Node.js", "AWS"],
    url: "https://github.com/awteguh/cicd-pipeline",
  },
  {
    title: "SIEM Integration",
    description:
      "Integrasi Wazuh SIEM dengan berbagai log source untuk centralized security monitoring dan automated alerting.",
    tags: ["Wazuh", "ELK Stack", "Python", "Security"],
  },
  {
    title: "Infrastructure as Code",
    description:
      "Provisioning infrastruktur cloud AWS menggunakan Terraform dengan modular architecture dan state management.",
    tags: ["Terraform", "AWS", "Ansible", "Linux"],
    url: "https://github.com/awteguh/iac-terraform",
  },
]
```

- [ ] **Step 7: Create contact data**

Create `src/data/contact.ts`:

```typescript
import type { Contact } from "./types"

// ✏️ Edit data di bawah ini untuk mengubah informasi kontak
export const contact: Contact = {
  email: "awteguh@email.com",
  socials: [
    {
      platform: "LinkedIn",
      url: "https://linkedin.com/in/awteguh",
      icon: "linkedin",
    },
    {
      platform: "GitHub",
      url: "https://github.com/awteguh",
      icon: "github",
    },
  ],
}
```

- [ ] **Step 8: Verify types compile**

Run:
```bash
cd d:/Project/Portofolio
npx tsc --noEmit
```

Expected: No type errors.

- [ ] **Step 9: Commit**

```bash
git add src/data/
git commit -m "feat: add typed data files for portfolio content"
```

---

## Task 3: Tailwind Theme Configuration

**Files:**
- Modify: `src/app/globals.css`

- [ ] **Step 1: Replace globals.css with theme configuration**

Replace the entire contents of `src/app/globals.css` with:

```css
@import "tailwindcss";

@custom-variant dark (&:where(.dark, .dark *));

@theme {
  --color-navy: #000080;
  --color-steel: #6D8196;
  --color-ice: #ADD8E6;
  --color-snow: #FFFAFA;
  --color-dark-bg: #0a0a2e;
  --color-dark-card: rgba(109, 129, 150, 0.15);
}

html {
  scroll-behavior: smooth;
}

body {
  background-color: var(--color-snow);
  color: var(--color-navy);
  transition: background-color 300ms ease, color 300ms ease;
}

:where(.dark) body {
  background-color: var(--color-dark-bg);
  color: var(--color-snow);
}
```

- [ ] **Step 2: Verify build passes**

Run:
```bash
cd d:/Project/Portofolio
npm run build
```

Expected: Build succeeds.

- [ ] **Step 3: Commit**

```bash
git add src/app/globals.css
git commit -m "feat: configure Tailwind v4 theme with custom colors and dark mode"
```

---

## Task 4: Theme Provider and Root Layout

**Files:**
- Create: `src/components/ThemeProvider.tsx`
- Create: `src/components/ThemeToggle.tsx`
- Modify: `src/app/layout.tsx`

- [ ] **Step 1: Create ThemeProvider**

Create `src/components/ThemeProvider.tsx`:

```tsx
"use client"

import { ThemeProvider as NextThemesProvider } from "next-themes"
import type { ReactNode } from "react"

export function ThemeProvider({ children }: { children: ReactNode }) {
  return (
    <NextThemesProvider attribute="class" defaultTheme="dark" enableSystem={false}>
      {children}
    </NextThemesProvider>
  )
}
```

- [ ] **Step 2: Create ThemeToggle**

Create `src/components/ThemeToggle.tsx`:

```tsx
"use client"

import { useTheme } from "next-themes"
import { Sun, Moon } from "lucide-react"
import { useEffect, useState } from "react"

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

  if (!mounted) {
    return <div className="w-9 h-9 rounded-full" />
  }

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="w-9 h-9 flex items-center justify-center rounded-full bg-ice/20 hover:bg-ice/40 transition-colors"
      aria-label="Toggle theme"
    >
      {theme === "dark" ? (
        <Sun size={18} className="text-ice" />
      ) : (
        <Moon size={18} className="text-navy" />
      )}
    </button>
  )
}
```

- [ ] **Step 3: Update root layout**

Replace the entire contents of `src/app/layout.tsx` with:

```tsx
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/ThemeProvider"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Aw Teguh — IT Support · SOC · DevOps",
  description:
    "Portfolio profesional Aw Teguh — IT Support, SOC Analyst, dan DevOps Engineer.",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="id" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  )
}
```

- [ ] **Step 4: Verify build passes**

Run:
```bash
cd d:/Project/Portofolio
npm run build
```

Expected: Build succeeds.

- [ ] **Step 5: Commit**

```bash
git add src/components/ThemeProvider.tsx src/components/ThemeToggle.tsx src/app/layout.tsx
git commit -m "feat: add theme provider with dark/light toggle"
```

---

## Task 5: ScrollReveal Component

**Files:**
- Create: `src/components/ScrollReveal.tsx`

- [ ] **Step 1: Create ScrollReveal wrapper**

Create `src/components/ScrollReveal.tsx`:

```tsx
"use client"

import { motion } from "framer-motion"
import type { ReactNode } from "react"

interface ScrollRevealProps {
  children: ReactNode
  className?: string
  delay?: number
}

export function ScrollReveal({ children, className, delay = 0 }: ScrollRevealProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, ease: "easeOut", delay }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
```

- [ ] **Step 2: Verify build passes**

Run:
```bash
cd d:/Project/Portofolio
npm run build
```

Expected: Build succeeds.

- [ ] **Step 3: Commit**

```bash
git add src/components/ScrollReveal.tsx
git commit -m "feat: add ScrollReveal animation wrapper component"
```

---

## Task 6: Navbar Component

**Files:**
- Create: `src/components/Navbar.tsx`

- [ ] **Step 1: Create Navbar**

Create `src/components/Navbar.tsx`:

```tsx
"use client"

import { useState, useEffect } from "react"
import { Menu, X } from "lucide-react"
import { ThemeToggle } from "./ThemeToggle"

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Experience", href: "#experience" },
  { label: "Certifications", href: "#certifications" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
]

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener("scroll", onScroll)
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-snow/95 dark:bg-dark-bg/95 backdrop-blur-md shadow-md"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <a
          href="#home"
          className="text-xl font-bold text-navy dark:text-ice transition-colors"
        >
          AT
        </a>

        <div className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-navy/70 dark:text-snow/70 hover:text-navy dark:hover:text-ice transition-colors"
            >
              {link.label}
            </a>
          ))}
          <ThemeToggle />
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? (
              <X size={24} className="text-navy dark:text-snow" />
            ) : (
              <Menu size={24} className="text-navy dark:text-snow" />
            )}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="md:hidden bg-snow dark:bg-dark-bg border-t border-ice/20 px-4 pb-4">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="block py-2 text-navy/70 dark:text-snow/70 hover:text-navy dark:hover:text-ice transition-colors"
            >
              {link.label}
            </a>
          ))}
        </div>
      )}
    </nav>
  )
}
```

- [ ] **Step 2: Verify build passes**

Run:
```bash
cd d:/Project/Portofolio
npm run build
```

Expected: Build succeeds.

- [ ] **Step 3: Commit**

```bash
git add src/components/Navbar.tsx
git commit -m "feat: add responsive navbar with mobile menu and theme toggle"
```

---

## Task 7: Hero Section

**Files:**
- Create: `src/components/Hero.tsx`

- [ ] **Step 1: Create Hero component**

Create `src/components/Hero.tsx`:

```tsx
"use client"

import { motion } from "framer-motion"
import { personal } from "@/data/personal"

export function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-ice to-steel dark:from-navy dark:to-steel overflow-hidden"
    >
      <div className="relative z-10 text-center px-4 pt-16">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", duration: 0.6 }}
          className="w-24 h-24 mx-auto mb-6 rounded-full bg-navy dark:bg-ice flex items-center justify-center"
        >
          <span className="text-3xl font-bold text-snow dark:text-navy">
            {personal.initials}
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="text-4xl md:text-5xl font-bold text-snow mb-3"
        >
          {personal.name}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.5 }}
          className="text-lg md:text-xl text-ice dark:text-ice/90 mb-4"
        >
          {personal.tagline}
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="text-snow/80 max-w-xl mx-auto mb-8 text-sm md:text-base"
        >
          {personal.description}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.65, duration: 0.5 }}
          className="flex gap-4 justify-center"
        >
          {personal.resumeUrl && (
            <a
              href={personal.resumeUrl}
              className="px-6 py-2.5 rounded-lg bg-ice text-navy font-semibold text-sm hover:bg-ice/80 transition-colors"
            >
              Download CV
            </a>
          )}
          <a
            href="#contact"
            className="px-6 py-2.5 rounded-lg border-2 border-snow text-snow font-semibold text-sm hover:bg-snow/10 transition-colors"
          >
            Contact Me
          </a>
        </motion.div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Verify build passes**

Run:
```bash
cd d:/Project/Portofolio
npm run build
```

Expected: Build succeeds.

- [ ] **Step 3: Commit**

```bash
git add src/components/Hero.tsx
git commit -m "feat: add hero section with animated entrance"
```

---

## Task 8: About and Skills Sections

**Files:**
- Create: `src/components/About.tsx`
- Create: `src/components/Skills.tsx`

- [ ] **Step 1: Create About component**

Create `src/components/About.tsx`:

```tsx
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
```

- [ ] **Step 2: Create Skills component**

Create `src/components/Skills.tsx`:

```tsx
import { skills } from "@/data/skills"
import { ScrollReveal } from "./ScrollReveal"

export function Skills() {
  return (
    <section id="skills" className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <ScrollReveal>
          <h2 className="text-2xl font-bold text-navy dark:text-ice mb-10 text-center">
            Skills & Expertise
          </h2>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {skills.map((skill, index) => (
            <ScrollReveal key={skill.category} delay={index * 0.1}>
              <div className="rounded-xl border border-steel/30 dark:border-steel/40 bg-white dark:bg-dark-card p-6 shadow-sm hover:shadow-md hover:scale-[1.02] transition-all duration-300 h-full">
                <div className="text-4xl mb-3">{skill.icon}</div>
                <h3 className="text-lg font-bold text-navy dark:text-ice mb-4">
                  {skill.category}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {skill.items.map((item) => (
                    <span
                      key={item}
                      className="text-xs px-3 py-1 rounded-full bg-ice/20 dark:bg-ice/10 text-navy dark:text-ice border border-ice/30"
                    >
                      {item}
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
```

- [ ] **Step 3: Verify build passes**

Run:
```bash
cd d:/Project/Portofolio
npm run build
```

Expected: Build succeeds.

- [ ] **Step 4: Commit**

```bash
git add src/components/About.tsx src/components/Skills.tsx
git commit -m "feat: add About and Skills sections"
```

---

## Task 9: Experience and Certifications Sections

**Files:**
- Create: `src/components/Experience.tsx`
- Create: `src/components/Certifications.tsx`

- [ ] **Step 1: Create Experience component**

Create `src/components/Experience.tsx`:

```tsx
import { experience } from "@/data/experience"
import { ScrollReveal } from "./ScrollReveal"

export function Experience() {
  return (
    <section id="experience" className="py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <ScrollReveal>
          <h2 className="text-2xl font-bold text-navy dark:text-ice mb-10 text-center">
            Experience
          </h2>
        </ScrollReveal>

        <div className="relative">
          <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-0.5 bg-ice/40 dark:bg-ice/20" />

          {experience.map((exp, index) => (
            <ScrollReveal key={index} delay={index * 0.1}>
              <div
                className={`relative pl-8 md:pl-0 mb-10 md:w-1/2 ${
                  index % 2 === 0
                    ? "md:pr-10 md:text-right"
                    : "md:ml-auto md:pl-10"
                }`}
              >
                <div
                  className={`absolute top-1 w-3 h-3 rounded-full bg-ice border-2 border-snow dark:border-dark-bg left-[-6px] ${
                    index % 2 === 0
                      ? "md:left-auto md:right-[-6px]"
                      : "md:left-[-6px]"
                  }`}
                />
                <div className="rounded-xl border border-steel/30 dark:border-steel/40 bg-white dark:bg-dark-card p-5 shadow-sm hover:shadow-md transition-shadow">
                  <h3 className="font-bold text-navy dark:text-ice">
                    {exp.title}
                  </h3>
                  <p className="text-sm text-steel dark:text-steel font-medium">
                    {exp.company}
                  </p>
                  <p className="text-xs text-steel/70 dark:text-snow/50 mb-2">
                    {exp.period}
                  </p>
                  <p className="text-sm text-navy/70 dark:text-snow/70">
                    {exp.description}
                  </p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Create Certifications component**

Create `src/components/Certifications.tsx`:

```tsx
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
```

- [ ] **Step 3: Verify build passes**

Run:
```bash
cd d:/Project/Portofolio
npm run build
```

Expected: Build succeeds.

- [ ] **Step 4: Commit**

```bash
git add src/components/Experience.tsx src/components/Certifications.tsx
git commit -m "feat: add Experience timeline and Certifications grid"
```

---

## Task 10: Projects, Contact, and Footer Sections

**Files:**
- Create: `src/components/Projects.tsx`
- Create: `src/components/Contact.tsx`
- Create: `src/components/Footer.tsx`

- [ ] **Step 1: Create Projects component**

Create `src/components/Projects.tsx`:

```tsx
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
```

- [ ] **Step 2: Create Contact component**

Create `src/components/Contact.tsx`:

```tsx
import { contact } from "@/data/contact"
import { ScrollReveal } from "./ScrollReveal"
import { Mail, Linkedin, Github, Globe } from "lucide-react"

const iconMap = {
  mail: Mail,
  linkedin: Linkedin,
  github: Github,
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
```

- [ ] **Step 3: Create Footer component**

Create `src/components/Footer.tsx`:

```tsx
import { personal } from "@/data/personal"

export function Footer() {
  return (
    <footer className="py-6 px-4 border-t border-steel/20 dark:border-steel/30">
      <div className="max-w-6xl mx-auto text-center">
        <p className="text-sm text-steel dark:text-snow/50">
          &copy; {new Date().getFullYear()} {personal.name}. All rights
          reserved.
        </p>
      </div>
    </footer>
  )
}
```

- [ ] **Step 4: Verify build passes**

Run:
```bash
cd d:/Project/Portofolio
npm run build
```

Expected: Build succeeds.

- [ ] **Step 5: Commit**

```bash
git add src/components/Projects.tsx src/components/Contact.tsx src/components/Footer.tsx
git commit -m "feat: add Projects, Contact, and Footer sections"
```

---

## Task 11: Main Page Assembly

**Files:**
- Modify: `src/app/page.tsx`

- [ ] **Step 1: Replace page.tsx with assembled sections**

Replace the entire contents of `src/app/page.tsx` with:

```tsx
import { Navbar } from "@/components/Navbar"
import { Hero } from "@/components/Hero"
import { About } from "@/components/About"
import { Skills } from "@/components/Skills"
import { Experience } from "@/components/Experience"
import { Certifications } from "@/components/Certifications"
import { Projects } from "@/components/Projects"
import { Contact } from "@/components/Contact"
import { Footer } from "@/components/Footer"

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Certifications />
        <Projects />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
```

- [ ] **Step 2: Verify build passes**

Run:
```bash
cd d:/Project/Portofolio
npm run build
```

Expected: Build succeeds with no errors.

- [ ] **Step 3: Commit**

```bash
git add src/app/page.tsx
git commit -m "feat: assemble all sections into main page"
```

---

## Task 12: Visual Verification and Final Polish

**Files:**
- Possibly adjust: any component file if visual issues found

- [ ] **Step 1: Start dev server**

Run:
```bash
cd d:/Project/Portofolio
npm run dev
```

Open http://localhost:3000 in browser.

- [ ] **Step 2: Verify all sections in dark mode (default)**

Check:
- Navbar shows "AT" logo, nav links, and theme toggle (moon/sun icon)
- Hero shows gradient background, initials circle, name, tagline, description, CTA buttons
- About shows card with bio text
- Skills shows 3 cards (IT Support, SOC, DevOps) with tags
- Experience shows timeline with alternating cards
- Certifications shows 4 cert badges in a grid
- Projects shows 4 project cards with tags and external links
- Contact shows social link buttons
- Footer shows copyright

- [ ] **Step 3: Toggle to light mode and verify**

Click the theme toggle in navbar. Verify:
- Background changes to Snow (#FFFAFA)
- Text changes to Navy (#000080)
- Cards have white background with Light Blue borders
- Hero gradient changes to lighter colors
- All sections readable and visually correct

- [ ] **Step 4: Test responsive (mobile)**

Resize browser to mobile width (< 640px). Verify:
- Navbar shows hamburger menu
- Hamburger opens mobile nav drawer
- Skill cards stack to single column
- Experience timeline collapses to left-aligned
- All content readable without horizontal scroll

- [ ] **Step 5: Test smooth scroll**

Click any nav link (e.g., "Skills"). Verify page scrolls smoothly to that section.

- [ ] **Step 6: Fix any visual issues found**

If any visual issues are found during steps 2-5, fix them in the relevant component files.

- [ ] **Step 7: Final build check**

Run:
```bash
cd d:/Project/Portofolio
npm run build
```

Expected: Build succeeds.

- [ ] **Step 8: Commit any final adjustments**

```bash
git add -A
git commit -m "feat: portfolio landing page complete — visual verification passed"
```
