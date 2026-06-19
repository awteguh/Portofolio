---
name: Aw Teguh Portfolio
description: Technical-credibility portfolio for an IT Support / SOC / DevOps engineer — a calm night operations deck.
colors:
  navy: "#000080"
  dark-bg: "#0a0a2e"
  steel: "#6D8196"
  ice: "#ADD8E6"
  snow: "#FFFAFA"
  surface-light: "#FFFFFF"
  dark-card: "#1a2247"
typography:
  display:
    fontFamily: "Inter, system-ui, sans-serif"
    fontSize: "clamp(2.25rem, 6vw, 3rem)"
    fontWeight: 700
    lineHeight: 1.1
    letterSpacing: "-0.02em"
  headline:
    fontFamily: "Inter, system-ui, sans-serif"
    fontSize: "1.5rem"
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: "-0.01em"
  title:
    fontFamily: "Inter, system-ui, sans-serif"
    fontSize: "1.125rem"
    fontWeight: 700
    lineHeight: 1.3
    letterSpacing: "normal"
  body:
    fontFamily: "Inter, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.625
    letterSpacing: "normal"
  label:
    fontFamily: "Inter, system-ui, sans-serif"
    fontSize: "0.75rem"
    fontWeight: 500
    lineHeight: 1.4
    letterSpacing: "normal"
rounded:
  pill: "9999px"
  md: "0.75rem"
  lg: "0.75rem"
spacing:
  section: "5rem"
  card: "2rem"
  inline: "1rem"
components:
  button-primary:
    backgroundColor: "{colors.ice}"
    textColor: "{colors.navy}"
    rounded: "0.5rem"
    padding: "0.625rem 1.5rem"
  button-secondary:
    backgroundColor: "{colors.snow}"
    textColor: "{colors.snow}"
    rounded: "0.5rem"
    padding: "0.625rem 1.5rem"
  contact-pill:
    backgroundColor: "{colors.ice}"
    textColor: "{colors.navy}"
    rounded: "0.5rem"
    padding: "0.625rem 1.25rem"
  card:
    backgroundColor: "{colors.surface-light}"
    textColor: "{colors.navy}"
    rounded: "{rounded.md}"
    padding: "{spacing.card}"
  tag-pill:
    backgroundColor: "{colors.ice}"
    textColor: "{colors.navy}"
    rounded: "{rounded.pill}"
    padding: "0.25rem 0.75rem"
---

# Design System: Aw Teguh Portfolio

## 1. Overview

**Creative North Star: "The Night Operations Deck"**

This is the interface of someone who watches systems at night and keeps them safe. The aesthetic borrows from a calm SOC/NOC: a deep navy field, clean snow-white reading surfaces, steel-gray structure, and a single ice-blue signal color that lights up only where something matters. Nothing shouts. Credibility is conveyed by exactness — correct alignment, honest contrast, surfaces that respond precisely to interaction — because the persona is a security and infrastructure engineer, and the build itself is the work sample.

The system runs in two coordinated themes. **Light** is a snow ground (`#FFFAFA`) with navy ink — the daytime reading mode, clean and trustworthy. **Dark** is a deep midnight-navy ground (`#0a0a2e`) — the operations-deck mode, where the ice accent reads brightest. Both must hold WCAG AA contrast; neither is decorative. The choice of which to ship as default is the visitor's (system preference via `next-themes`).

What this system explicitly rejects: the untouched **create-next-app / generic-template** look, and the soulless **corporate-bland** stock-enterprise look. Professional here never means forgettable, and finished never means cookie-cutter. It also refuses the current AI-slop tells — purple-to-blue gradients, gradient text, identical icon+heading+text card grids, and tracked uppercase eyebrows.

**Key Characteristics:**
- Two-theme system (snow-light / midnight-navy-dark), both AA-legible.
- One cool signal color (ice) used sparingly for meaning, not decoration.
- Flat surfaces at rest; depth appears only as a response to interaction.
- Single typeface (Inter) worked across weights — no decorative pairing.
- Substance-first: every motion and accent earns its place.

## 2. Colors

A cool, restrained palette built on a navy↔snow contrast spine, with steel as structure and ice as the lone signal.

### Primary
- **Operations Navy** (`#000080`): The authority color and primary ink. Body and heading text in light mode; the deep brand anchor. Carries headings (`text-navy`) and most light-mode reading text at high contrast against snow.
- **Midnight Navy** (`#0a0a2e`): The dark-mode ground — the operations-deck field after hours. Backs the entire dark theme; ice and snow sit on top of it.

### Secondary
- **Signal Ice** (`#ADD8E6`): The single accent. Cool, calm, and reserved for things that carry meaning — primary CTA fill, links and hover targets, active nav, key icons (Award, timeline nodes), and tag chips. In dark mode it doubles as the heading/accent ink because it reads brightest against midnight navy.

### Neutral
- **Steel** (`#6D8196`): Structure and quiet metadata. Borders (`border-steel/30`), dividers, footer text, company/period labels. The gray that holds the grid together without competing for attention.
- **Snow** (`#FFFAFA`): The light-mode ground and the dark-mode text color. Near-white with the faintest warmth, kept legible on navy.
- **Surface White** (`#FFFFFF`): Card faces in light mode — a clean half-step brighter than the snow ground so cards read as distinct planes without shadow.
- **Dark Card** (`#1a2247`): Card faces in dark mode — a navy a step above midnight ground, so surfaces layer tonally rather than by shadow. (Source uses a translucent `rgba(109,129,150,0.15)` over midnight; this hex is its effective resolved value.)

### Named Rules
**The Signal Rule.** Ice is a signal, not a surface. It covers ≤15% of any screen and appears only where it means something — an action, a link, an active state, a credential. Its rarity is what makes it read as "important". Never wash a section in ice to make it "friendlier".

**The Cool-Spine Rule.** Every neutral leans cool (toward navy/steel), never warm. No cream, sand, or beige ever enters this palette — warmth would break the operations-deck character.

## 3. Typography

**Display Font:** Inter (with system-ui, sans-serif fallback)
**Body Font:** Inter (same family)
**Label/Mono Font:** none distinct — Inter at small size + medium weight

**Character:** One disciplined geometric sans worked across weights (400/500/700) rather than a decorative pairing. The restraint is the point: a security engineer's interface doesn't need two fonts to prove taste. Hierarchy comes from weight, size, and the tightened display tracking — not from contrast between families.

### Hierarchy
- **Display** (700, `clamp(2.25rem, 6vw, 3rem)`, line-height 1.1, tracking -0.02em): The hero name. The only place type goes large; ceiling stays well under the 6rem shout threshold.
- **Headline** (700, 1.5rem / `text-2xl`, line-height 1.2): Section titles ("About Me", "Projects", "Certifications"), usually centered.
- **Title** (700, 1.125rem / `text-lg`, line-height 1.3): Card titles — skill category, project name, role.
- **Body** (400, 1rem, line-height 1.625 / `leading-relaxed`): Descriptions and prose. Cap measure at 65–75ch; the existing `max-w-4xl`/`max-w-2xl` containers keep this honest.
- **Label** (500, 0.75rem / `text-xs`, normal tracking): Tag chips, periods, issuer/year metadata. Sentence/normal case.

### Named Rules
**The One-Family Rule.** Inter only. Express hierarchy through weight and size, never by introducing a second typeface. If something needs emphasis, go heavier or larger — don't reach for a new font.

**The No-Eyebrow Rule.** Section titles stand alone. No tiny uppercase tracked kicker ("ABOUT", "EXPERIENCE") above headings, and no `01 / 02 / 03` numbered markers as default scaffolding. The cadence here is heading-then-content.

## 4. Elevation

Flat by default. Surfaces rest on a 1px steel border and a tonal background step (white over snow in light; `#1a2247` over midnight in dark), not on shadow. Depth is a **response to interaction**: a soft shadow and a 2% scale lift appear on hover/focus, then settle back. This keeps the page calm at rest and makes interactivity feel earned — the operations deck only "lights up" when you touch it.

### Shadow Vocabulary
- **Rest** (`box-shadow: 0 1px 2px rgba(0,0,0,0.05)` / `shadow-sm`): The barely-there resting shadow on cards. Often reads as none; the border does the separating.
- **Active** (`box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1)` / `shadow-md`): Hover/focus state on interactive cards, paired with `scale(1.02)` and a 300ms transition.

### Named Rules
**The Respond-Don't-Rest Rule.** Surfaces are flat at rest. Shadow and lift exist only as feedback to hover, focus, or elevation change. A card that's already floating before you touch it has nothing left to say when you do.

## 5. Components

### Buttons
- **Shape:** Gently rounded (`rounded-lg`, 0.5rem). Pills are reserved for tags, not buttons.
- **Primary:** Ice fill, navy text (`bg-ice text-navy`), padding `0.625rem 1.5rem`, semibold. The hero "Download CV" — the one loud action, justified by the Signal Rule.
- **Secondary / Outline:** Transparent with a 2px snow border and snow text (`border-2 border-snow text-snow`) over the hero image. The "Contact Me" companion action.
- **Hover / Focus:** Color/opacity shift only (`hover:bg-ice/80`, `hover:bg-snow/10`), 200ms `transition-colors`. Buttons don't scale; cards do.

### Chips / Tags
- **Style:** Pill (`rounded-full`), `text-xs`. Two tints: ice-wash (`bg-ice/20 ... border border-ice/30`) for skills, and navy/ice-wash (`bg-navy/10 dark:bg-ice/10`) for project tech tags. Text is navy (light) / ice (dark).
- **State:** Static labels, not interactive. No hover state needed.

### Cards / Containers
- **Corner Style:** `rounded-xl` (0.75rem) — the consistent card radius across About, Skills, Projects, Experience, Certifications.
- **Background:** White (light) / `#1a2247` translucent (dark). Never nested — a card never contains another card.
- **Shadow Strategy:** Flat-by-default; see Elevation. `shadow-sm` at rest → `shadow-md` + `scale-[1.02]` on hover where the card is interactive (Projects, Skills, Certifications).
- **Border:** Always full, 1px, steel at low opacity (`border border-steel/30 dark:border-steel/40`). Borders do the separating, not shadows.
- **Internal Padding:** `p-5` to `p-8` depending on density (cards `p-6`, About panel `p-8`, compact items `p-5`).

### Navigation
- **Style:** Fixed top bar, transparent over the hero, transitioning to `bg-snow/95 dark:bg-dark-bg/95` + `backdrop-blur-md` + `shadow-md` once scrolled past 50px.
- **Typography:** `text-sm`, links at 70% navy/snow, brightening to full navy/ice on hover (`transition-colors`).
- **Active/Hover:** Color shift only.
- **Mobile:** Hamburger (Menu/X icons) toggling a snow/midnight panel with a steel/ice top border; theme toggle stays visible at all widths.

### Timeline (signature component)
The Experience section is the one distinctive custom pattern: a vertical steel/ice spine (`bg-ice/40`), left-aligned on mobile and center-aligned (alternating sides) on desktop, with ice-filled nodes ringed in the ground color. It encodes a real sequence (career over time), which is the only place ordered/positional structure is justified.

## 6. Do's and Don'ts

### Do:
- **Do** keep every neutral cool (navy/steel/snow). Warmth is forbidden in this system.
- **Do** reserve ice for signals — actions, links, active states, credentials — at ≤15% coverage (the Signal Rule).
- **Do** keep surfaces flat at rest and let shadow/scale appear only on hover/focus (the Respond-Don't-Rest Rule).
- **Do** use one typeface (Inter) across weights; express hierarchy by weight and size.
- **Do** verify body text hits ≥4.5:1 in **both** themes — especially steel metadata on snow, and `snow/70` body on midnight. Bump toward the ink end if it's even close.
- **Do** give every framer-motion entrance and scroll-reveal a `@media (prefers-reduced-motion: reduce)` fallback, and ensure content is visible by default (never gated solely on a reveal class).
- **Do** use full 1px steel borders to separate surfaces.

### Don't:
- **Don't** ship the untouched **create-next-app / generic-template** look, or the **corporate-bland** stock-enterprise look — the two named anti-references. Professional must not read as forgettable or unfinished.
- **Don't** introduce cream, sand, beige, or any warm-tinted neutral. (Cross-checks the Cool-Spine Rule.)
- **Don't** use purple-to-blue gradients, gradient text (`background-clip: text`), or glassmorphism as decoration.
- **Don't** build identical icon+heading+text card grids that repeat endlessly with no variation, or the big-number hero-metric template.
- **Don't** add tiny uppercase tracked eyebrows or `01 / 02 / 03` numbered markers above every section.
- **Don't** use `border-left`/`border-right` greater than 1px as a colored accent stripe on cards, list items, or callouts.
- **Don't** nest a card inside another card.
- **Don't** let the steel gray drop below 4.5:1 for any real body text "for elegance" — the single most common AA failure.
