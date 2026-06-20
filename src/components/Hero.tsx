"use client"

import { useEffect, useState, useCallback } from "react"
import { motion, AnimatePresence, useReducedMotion, type Variants } from "framer-motion"
import Image from "next/image"
import { X } from "lucide-react"
import { personal } from "@/data/personal"
import { NetworkCanvas } from "./NetworkCanvas"

const EASE = [0.16, 1, 0.3, 1] as const

const ROLES = ["IT Support", "SOC Analyst", "DevOps Engineer"]

function RoleCycler({ reduce }: { reduce: boolean }) {
  const [index, setIndex] = useState(0)
  const [displayed, setDisplayed] = useState("")
  const [phase, setPhase] = useState<"typing" | "pause" | "erasing">("typing")

  const current = ROLES[index]

  const tick = useCallback(() => {
    if (reduce) {
      setDisplayed(current)
      return
    }
    if (phase === "typing") {
      if (displayed.length < current.length) {
        setDisplayed(current.slice(0, displayed.length + 1))
      } else {
        setPhase("pause")
      }
    } else if (phase === "pause") {
      setPhase("erasing")
    } else {
      if (displayed.length > 0) {
        setDisplayed(displayed.slice(0, -1))
      } else {
        setIndex((i) => (i + 1) % ROLES.length)
        setPhase("typing")
      }
    }
  }, [reduce, phase, displayed, current])

  useEffect(() => {
    if (reduce) { setDisplayed(current); return }
    const delay = phase === "typing" ? 60 : phase === "pause" ? 1800 : 40
    const t = setTimeout(tick, delay)
    return () => clearTimeout(t)
  }, [tick, phase, reduce, current])

  return (
    <span
      className="font-[family-name:var(--font-mono)] font-bold text-online"
      style={{ textShadow: "0 0 12px rgba(57,255,138,0.7), 0 0 24px rgba(57,255,138,0.35)" }}
    >
      {displayed}
      {!reduce && (
        <span className="inline-block w-0.5 h-5 ml-0.5 align-middle bg-online animate-pulse" />
      )}
    </span>
  )
}

export function Hero() {
  const [showOverlay, setShowOverlay] = useState(false)
  const reduce = useReducedMotion() ?? false

  useEffect(() => {
    if (!showOverlay) return
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setShowOverlay(false)
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [showOverlay])

  const container: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.13, delayChildren: 0.1 } },
  }
  const item: Variants = {
    hidden: { opacity: 0, y: 28 },
    show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
  }

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center overflow-hidden bg-dark-bg"
    >
      {/* Particle network — full canvas, no photo bg competing */}
      <NetworkCanvas />
      {/* Vignette — darkens edges so canvas is vivid at center, text stays readable */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_50%_50%,transparent_30%,#0a0a2e_90%)]" />
      {/* Bottom fade — smooth transition into next section */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-dark-bg to-transparent" />

      {/* Content — 2 column on md+, stacked on mobile */}
      <motion.div
        className="relative z-10 w-full max-w-6xl mx-auto px-6 pt-24 pb-16 flex flex-col md:flex-row items-center gap-12 md:gap-16"
        variants={container}
        initial={reduce ? false : "hidden"}
        animate={reduce ? false : "show"}
      >
        {/* LEFT — text */}
        <div className="flex-1 text-center md:text-left">
          <motion.p variants={item} className="text-snow/70 text-lg mb-2 tracking-wide">
            Hi! 👋
          </motion.p>

          <motion.h1
            variants={item}
            className="text-balance text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-snow mb-2"
          >
            I&apos;m {personal.name}
          </motion.h1>

          <motion.p variants={item} className="text-base text-snow/50 mb-8">
            ({personal.nickname})
          </motion.p>

          <motion.p variants={item} className="text-base md:text-lg text-snow/80 mb-10 h-7">
            I&apos;m into{" "}
            <RoleCycler reduce={reduce} />
          </motion.p>

          <motion.div variants={item} className="flex gap-4 justify-center md:justify-start">
            {personal.resumeUrl && (
              <a
                href={personal.resumeUrl}
                className="px-6 py-2.5 rounded-lg bg-ice text-navy font-semibold text-sm hover:bg-ice/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ice transition-colors"
              >
                Download CV
              </a>
            )}
            <a
              href="#contact"
              className="px-6 py-2.5 rounded-lg border-2 border-snow/50 text-snow font-semibold text-sm hover:bg-snow/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-snow transition-colors"
            >
              Contact Me
            </a>
          </motion.div>
        </div>

        {/* RIGHT — photo */}
        <motion.div variants={item} className="shrink-0">
          <motion.button
            type="button"
            onClick={() => personal.avatarUrl && setShowOverlay(true)}
            aria-label="Lihat foto profil ukuran penuh"
            className="group block w-52 h-52 md:w-64 md:h-64 rounded-full overflow-hidden ring-4 ring-ice/30 shadow-2xl cursor-pointer hover:ring-online/60 focus-visible:ring-online transition-all duration-300"
            style={{ boxShadow: "0 0 40px rgba(57,255,138,0.15), 0 0 80px rgba(0,0,128,0.4)" }}
          >
            {personal.avatarUrl ? (
              <Image
                src={personal.avatarUrl}
                alt={personal.name}
                width={256}
                height={256}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                priority
              />
            ) : (
              <div className="w-full h-full bg-dark-card flex items-center justify-center">
                <span className="font-[family-name:var(--font-mono)] text-5xl font-bold text-ice">
                  {personal.initials}
                </span>
              </div>
            )}
          </motion.button>
        </motion.div>
      </motion.div>

      {/* Scroll cue */}
      <motion.a
        href="#about"
        aria-label="Scroll ke bawah"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-0.5 group"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 0.6 }}
      >
        {[0, 1, 2].map((i) => (
          <motion.span
            key={i}
            className="block text-snow/40 group-hover:text-online transition-colors duration-300"
            animate={reduce ? undefined : { opacity: [0.2, 1, 0.2], y: [0, 5, 0] }}
            transition={reduce ? undefined : { duration: 1.4, repeat: Infinity, ease: "easeInOut", delay: i * 0.18 }}
          >
            <svg width="22" height="13" viewBox="0 0 22 13" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="1 1 11 11 21 1" />
            </svg>
          </motion.span>
        ))}
      </motion.a>

      {/* Photo overlay */}
      <AnimatePresence>
        {showOverlay && personal.avatarUrl && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
            onClick={() => setShowOverlay(false)}
            role="dialog"
            aria-modal="true"
            aria-label={`Foto ${personal.name}`}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3, ease: EASE }}
              className="relative max-w-[90vw] max-h-[90vh]"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setShowOverlay(false)}
                aria-label="Tutup"
                className="absolute -top-3 -right-3 z-10 w-9 h-9 rounded-full bg-dark-card text-snow flex items-center justify-center shadow-lg hover:bg-dark-surface border border-ice/30 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ice transition-colors"
              >
                <X size={18} />
              </button>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={personal.avatarUrl}
                alt={personal.name}
                className="max-w-[90vw] max-h-[90vh] rounded-lg shadow-2xl"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
