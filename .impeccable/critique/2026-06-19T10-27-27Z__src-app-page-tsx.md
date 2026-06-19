---
target: critique boleh, saya pengin jadi desain yg lebih menarik dari sekarang
total_score: 29
p0_count: 0
p1_count: 3
timestamp: 2026-06-19T10-27-27Z
slug: src-app-page-tsx
---
# Critique — Portfolio Aw Teguh (src/app/page.tsx)

## Design Health Score

| # | Heuristic | Score | Key Issue |
|---|-----------|-------|-----------|
| 1 | Visibility of System Status | 2 | No active-section state in nav; no scroll progress |
| 2 | Match System / Real World | 4 | Indonesian natural, labels clear |
| 3 | User Control & Freedom | 3 | Smooth scroll, theme toggle, overlay closes |
| 4 | Consistency & Standards | 4 | Very consistent (overly uniform) |
| 5 | Error Prevention | 3 | n/a mostly (no forms) |
| 6 | Recognition vs Recall | 3 | Nav labeled, no active location marker |
| 7 | Flexibility & Efficiency | 2 | No keyboard shortcuts / skip-link |
| 8 | Aesthetic & Minimalist | 2 | Clean but monotonous; weak cross-section hierarchy |
| 9 | Error Recovery | 3 | Avatar fallback exists; n/a otherwise |
| 10 | Help & Documentation | 3 | n/a for portfolio |
| **Total** | | **29/40** | **Good — strong foundation held back by monotony** |

## Anti-Patterns Verdict

Deterministic scan: clean, 0 findings across src/. No gradient text, side-stripe borders, eyebrows, hero-metric template, or purple-blue gradients.

LLM assessment: Not overt AI slop, but template-competent and not bold. After a strong Hero, every section collapses to "centered text-2xl heading + card grid" — About, Skills, Certifications, Projects nearly identical structurally. Violates DESIGN.md's own "no identical card grids" rule.

Visual overlays: unavailable — no browser automation in this environment.

## Overall Impression

Competent but flat. Hero is the only "designed" moment; the rest deflates into a uniform plane. Persona (precise, credible, grounded) comes through, but "Demonstrate, don't assert" unmet. Biggest opportunity: give rhythm and hierarchy between sections.

## What's Working

1. Disciplined palette & two-theme system — ice used sparingly as signal.
2. Experience timeline — the one correct custom pattern; encodes real sequence.
3. Separated data architecture — clean, itself evidence of an orderly engineer.

## Priority Issues

[P1] Section monotony — every section py-20, centered text-2xl heading, mb-10, card grid hover:scale-[1.02]. No variation in bg, spacing, or heading treatment. Fix: alternate section backgrounds, vary spacing, stronger heading treatment. Command: /impeccable layout

[P1] Uniform scroll-reveal reflex + no reduced-motion. All sections wrapped in identical ScrollReveal fade-up. whileInView with initial opacity:0 hides content by default (blank if JS fails/headless). No prefers-reduced-motion (DESIGN.md requires it). Fix: content visible by default, vary motion, add reduced-motion fallback. Command: /impeccable animate

[P1] Skill icons are emoji — text-4xl emoji undercuts the security/infra credibility. Fix: consistent line icons (lucide) ice-tinted, or remove for stronger typography. Command: /impeccable typeset

[P2] Contrast risk on metadata — text-steel/60, text-snow/40, text-snow/50 likely fail WCAG AA 4.5:1. Fix: bump toward ink ramp; verify both themes. Command: /impeccable polish

[P2] No nav active-state — no scroll-spy highlight. Command: /impeccable polish

## Persona Red Flags

Jordan (First-Timer/Recruiter): No visual staircase to proof points after Hero; all equal weight, can't skim. Contact CTA disappears after Hero.

Casey (Mobile): 18 skill chips stack densely. No sticky/following contact CTA — must scroll far.

Sam (Accessibility): initial opacity:0 without reduced-motion; default focus states only; metadata contrast risk vs AA target.

## Minor Observations
- Nav logo "AT" vs full legal name now in use — consistency.
- Contact mixes lucide Mail with brand SVGs.
- bg-dark-card is rgba(...0.15) — dark cards may be too transparent.

## Questions to Consider
- What if each section had a slightly different visual world without losing calm?
- What makes a recruiter stop scrolling and think "this person is meticulous"?
- What would the most confident version look like?
