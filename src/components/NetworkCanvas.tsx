"use client"

import { useEffect, useRef } from "react"
import { useReducedMotion } from "framer-motion"

interface Node {
  x: number
  y: number
  vx: number
  vy: number
  radius: number
  pulse: number
  pulseSpeed: number
}

const NODE_COUNT = 55
const MAX_DIST = 160
const ICE = "173,216,230"      // #ADD8E6
const THREAT = "255,80,80"     // threat-red

/**
 * Animated network graph canvas — SOC/NOC threat-map aesthetic.
 * Nodes drift, connections appear when close, mouse proximity
 * triggers a "detection" glow in threat-red.
 */
export function NetworkCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const mouse = useRef({ x: -999, y: -999 })
  const reduce = useReducedMotion()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let raf = 0
    let W = 0, H = 0

    function resize() {
      if (!canvas) return
      W = canvas.width = canvas.offsetWidth * window.devicePixelRatio
      H = canvas.height = canvas.offsetHeight * window.devicePixelRatio
      ctx!.scale(window.devicePixelRatio, window.devicePixelRatio)
    }
    resize()

    const ro = new ResizeObserver(resize)
    ro.observe(canvas)

    // Initialize nodes
    const nodes: Node[] = Array.from({ length: NODE_COUNT }, () => ({
      x: Math.random() * (W / window.devicePixelRatio),
      y: Math.random() * (H / window.devicePixelRatio),
      vx: (Math.random() - 0.5) * 0.35,
      vy: (Math.random() - 0.5) * 0.35,
      radius: Math.random() * 1.5 + 1,
      pulse: Math.random() * Math.PI * 2,
      pulseSpeed: 0.02 + Math.random() * 0.02,
    }))

    const W_css = () => W / window.devicePixelRatio
    const H_css = () => H / window.devicePixelRatio

    function draw() {
      if (!ctx) return
      ctx.clearRect(0, 0, W_css(), H_css())

      const mx = mouse.current.x
      const my = mouse.current.y

      // Update + draw nodes
      for (const n of nodes) {
        n.x += n.vx
        n.y += n.vy
        n.pulse += n.pulseSpeed
        if (n.x < 0 || n.x > W_css()) n.vx *= -1
        if (n.y < 0 || n.y > H_css()) n.vy *= -1

        const dx = n.x - mx, dy = n.y - my
        const mdist = Math.sqrt(dx * dx + dy * dy)
        const threatened = mdist < 90

        const glow = Math.sin(n.pulse) * 0.3 + 0.7
        const alpha = threatened ? 1 : 0.6 * glow
        const color = threatened ? THREAT : ICE

        // Outer glow ring on threatened nodes
        if (threatened) {
          ctx.beginPath()
          ctx.arc(n.x, n.y, n.radius + 6, 0, Math.PI * 2)
          ctx.fillStyle = `rgba(${THREAT},${0.15 * (1 - mdist / 90)})`
          ctx.fill()
        }

        ctx.beginPath()
        ctx.arc(n.x, n.y, n.radius, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${color},${alpha})`
        ctx.fill()
      }

      // Draw edges
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i], b = nodes[j]
          const dx = a.x - b.x, dy = a.y - b.y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist > MAX_DIST) continue

          const opacity = (1 - dist / MAX_DIST) * 0.35
          // Red edge if either node is threatened
          const daxM = Math.sqrt((a.x - mx) ** 2 + (a.y - my) ** 2)
          const dbxM = Math.sqrt((b.x - mx) ** 2 + (b.y - my) ** 2)
          const edgeThreat = daxM < 90 || dbxM < 90
          const edgeColor = edgeThreat ? THREAT : ICE

          ctx.beginPath()
          ctx.moveTo(a.x, a.y)
          ctx.lineTo(b.x, b.y)
          ctx.strokeStyle = `rgba(${edgeColor},${opacity})`
          ctx.lineWidth = 0.6
          ctx.stroke()
        }
      }

      raf = requestAnimationFrame(draw)
    }

    if (!reduce) {
      draw()
    } else {
      // Static snapshot for reduced-motion
      draw()
      cancelAnimationFrame(raf)
    }

    const onMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      mouse.current = { x: e.clientX - rect.left, y: e.clientY - rect.top }
    }
    canvas.addEventListener("mousemove", onMove)

    return () => {
      cancelAnimationFrame(raf)
      ro.disconnect()
      canvas.removeEventListener("mousemove", onMove)
    }
  }, [reduce])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full opacity-40 dark:opacity-55"
      aria-hidden="true"
    />
  )
}
