---
target: after full overhaul (layout+animate+polish)
total_score: 36
p0_count: 0
p1_count: 0
timestamp: 2026-06-19T11-04-21Z
slug: src-app-page-tsx
---
# Critique #3 (final) — Portfolio Aw Teguh (src/app/page.tsx)

## Design Health Score

| # | Heuristic | Score | Key Issue |
|---|-----------|-------|-----------|
| 1 | Visibility of System Status | 4 | Scroll-spy nav + active underline + scroll cue |
| 2 | Match System / Real World | 4 | Natural language |
| 3 | User Control & Freedom | 4 | Esc closes overlay, skip-link, smooth scroll |
| 4 | Consistency & Standards | 4 | Section/Heading/Stagger coherent |
| 5 | Error Prevention | 3 | n/a (no forms) |
| 6 | Recognition vs Recall | 4 | Nav active-state, labeled icons |
| 7 | Flexibility & Efficiency | 3 | Skip-link, keyboard nav + focus-visible |
| 8 | Aesthetic & Minimalist | 4 | Clear rhythm & hierarchy |
| 9 | Error Recovery | 3 | Avatar fallback |
| 10 | Help & Documentation | 3 | n/a |
| **Total** | | **36/40** | **Excellent — minor polish only** |

## Anti-Patterns Verdict
Deterministic scan: 0 findings. LLM: passes AI slop test.

## What changed across 3 passes
- Layout: cross-section rhythm (snow/mist), asymmetric About, lucide icons, bento Projects
- Animate: legitimate sibling stagger, prefers-reduced-motion, Hero entrance + scroll cue, Esc-to-close
- Polish: WCAG AA contrast (steel-ink #516374 token, all >=5.3:1), scroll-spy nav, focus-visible, skip-link

## Remaining (optional, P3)
- bg-dark-card now solid #1a2247 (good)
- Could add OG/social meta image
- Could add real project URLs/screenshots

Trend: 29 -> 31 -> 36 (+7). Good -> Excellent band.
