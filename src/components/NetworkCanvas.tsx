"use client"

import { useEffect, useRef } from "react"
import { useReducedMotion } from "framer-motion"

interface Node {
  x: number
  y: number
  vx: number
  vy: number
  /** Base speed magnitude — used when node returns to normal drift. */
  baseVx: number
  baseVy: number
  radius: number
  pulse: number
  pulseSpeed: number
}

const NODE_COUNT = 70
const MAX_DIST = 180
const REPULSE_RADIUS = 120   // cursor pushes nodes away within this px
const REPULSE_FORCE = 3.5    // push strength

const ICE = "173,216,230"    // #ADD8E6 — default node/edge
const ONLINE = "57,255,138"  // #39ff8a — cursor-near nodes (green)
const THREAT = "255,80,80"   // #ff5050 — reserved; unused here to keep green dominant

/**
 * SOC / NOC threat-map network canvas.
 *
 * Cursor effects:
 * - Within REPULSE_RADIUS: nodes flee the cursor (repulse), turn green,
 *   and their edges turn green too.
 * - Edges between non-affected nodes fade to a brighter ice (more visible).
 */
export function NetworkCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const mouse = useRef({ x: -9999, y: -9999 })
  const reduce = useReducedMotion()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let raf = 0
    let dpr = window.devicePixelRatio || 1
    let Wcss = 0, Hcss = 0

    function resize() {
      if (!canvas) return
      dpr = window.devicePixelRatio || 1
      Wcss = canvas.offsetWidth
      Hcss = canvas.offsetHeight
      canvas.width = Wcss * dpr
      canvas.height = Hcss * dpr
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0)
    }
    resize()

    const ro = new ResizeObserver(resize)
    ro.observe(canvas)

    const nodes: Node[] = Array.from({ length: NODE_COUNT }, () => {
      const bvx = (Math.random() - 0.5) * 0.5
      const bvy = (Math.random() - 0.5) * 0.5
      return {
        x: Math.random() * Wcss,
        y: Math.random() * Hcss,
        vx: bvx,
        vy: bvy,
        baseVx: bvx,
        baseVy: bvy,
        radius: Math.random() * 1.8 + 1.2,
        pulse: Math.random() * Math.PI * 2,
        pulseSpeed: 0.018 + Math.random() * 0.018,
      }
    })

    function draw() {
      if (!ctx) return
      // Fade trail instead of hard clear — gives a subtle motion-blur streak
      ctx.fillStyle = "rgba(10,10,46,0.35)"
      ctx.fillRect(0, 0, Wcss, Hcss)

      const mx = mouse.current.x
      const my = mouse.current.y

      // --- Update nodes ---
      for (const n of nodes) {
        const dx = n.x - mx
        const dy = n.y - my
        const dist = Math.sqrt(dx * dx + dy * dy)

        if (dist < REPULSE_RADIUS && dist > 0) {
          // Repulse: push away from cursor with falloff
          const force = (1 - dist / REPULSE_RADIUS) * REPULSE_FORCE
          n.vx += (dx / dist) * force
          n.vy += (dy / dist) * force
          // Cap velocity so nodes don't fly off screen
          const speed = Math.sqrt(n.vx * n.vx + n.vy * n.vy)
          if (speed > 6) { n.vx = (n.vx / speed) * 6; n.vy = (n.vy / speed) * 6 }
        } else {
          // Drift back toward base speed (friction-like damping)
          n.vx += (n.baseVx - n.vx) * 0.04
          n.vy += (n.baseVy - n.vy) * 0.04
        }

        n.x += n.vx
        n.y += n.vy
        n.pulse += n.pulseSpeed

        // Bounce off edges
        if (n.x < 0) { n.x = 0; n.vx = Math.abs(n.vx); n.baseVx = Math.abs(n.baseVx) }
        if (n.x > Wcss) { n.x = Wcss; n.vx = -Math.abs(n.vx); n.baseVx = -Math.abs(n.baseVx) }
        if (n.y < 0) { n.y = 0; n.vy = Math.abs(n.vy); n.baseVy = Math.abs(n.baseVy) }
        if (n.y > Hcss) { n.y = Hcss; n.vy = -Math.abs(n.vy); n.baseVy = -Math.abs(n.baseVy) }
      }

      // --- Draw edges ---
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i], b = nodes[j]
          const dx = a.x - b.x, dy = a.y - b.y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist > MAX_DIST) continue

          const prox = 1 - dist / MAX_DIST
          const aDist = Math.sqrt((a.x - mx) ** 2 + (a.y - my) ** 2)
          const bDist = Math.sqrt((b.x - mx) ** 2 + (b.y - my) ** 2)
          const affected = aDist < REPULSE_RADIUS || bDist < REPULSE_RADIUS

          const edgeColor = affected ? ONLINE : ICE
          const edgeAlpha = affected ? prox * 0.85 : prox * 0.45

          ctx.beginPath()
          ctx.moveTo(a.x, a.y)
          ctx.lineTo(b.x, b.y)
          ctx.strokeStyle = `rgba(${edgeColor},${edgeAlpha})`
          ctx.lineWidth = affected ? 1.0 : 0.7
          ctx.stroke()
        }
      }

      // --- Draw nodes ---
      for (const n of nodes) {
        const dx = n.x - mx, dy = n.y - my
        const mdist = Math.sqrt(dx * dx + dy * dy)
        const affected = mdist < REPULSE_RADIUS

        const glow = Math.sin(n.pulse) * 0.25 + 0.75
        const nodeColor = affected ? ONLINE : ICE
        const nodeAlpha = affected ? 1 : 0.7 * glow
        const r = affected ? n.radius * 1.5 : n.radius

        // Glow halo
        if (affected) {
          const proximity = 1 - mdist / REPULSE_RADIUS
          ctx.beginPath()
          ctx.arc(n.x, n.y, r + 8, 0, Math.PI * 2)
          ctx.fillStyle = `rgba(${ONLINE},${0.18 * proximity})`
          ctx.fill()
        }

        ctx.beginPath()
        ctx.arc(n.x, n.y, r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${nodeColor},${nodeAlpha})`
        ctx.fill()
      }

      raf = requestAnimationFrame(draw)
    }

    if (!reduce) {
      draw()
    } else {
      // Reduced-motion: one static frame
      ctx.fillStyle = "rgba(10,10,46,1)"
      ctx.fillRect(0, 0, Wcss, Hcss)
      for (const n of nodes) {
        ctx.beginPath()
        ctx.arc(n.x, n.y, n.radius, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${ICE},0.5)`
        ctx.fill()
      }
    }

    const onMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      mouse.current = { x: e.clientX - rect.left, y: e.clientY - rect.top }
    }
    const onLeave = () => { mouse.current = { x: -9999, y: -9999 } }

    canvas.addEventListener("mousemove", onMove)
    canvas.addEventListener("mouseleave", onLeave)

    return () => {
      cancelAnimationFrame(raf)
      ro.disconnect()
      canvas.removeEventListener("mousemove", onMove)
      canvas.removeEventListener("mouseleave", onLeave)
    }
  }, [reduce])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      aria-hidden="true"
    />
  )
}
