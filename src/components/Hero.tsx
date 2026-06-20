"use client"

import { useEffect, useState, useCallback } from "react"
import { motion, AnimatePresence, useReducedMotion, type Variants } from "framer-motion"
import Image from "next/image"
import { X } from "lucide-react"
import { personal } from "@/data/personal"
import { NetworkCanvas } from "./NetworkCanvas"

const EASE = [0.16, 1, 0.3, 1] as const

const ROLES = ["IT Support", "SOC Analyst", "DevOps Engineer"]

/** Animated cycling role text — types in, pauses, fades out, next. */
function RoleCycler({ reduce }: { reduce: boolean }) {
  const [index, setIndex] = useState(0)
  const [displayed, setDisplayed] = useState("")
  const [phase, setPhase] = useState<"typing" | "pause" | "erasing">("typing")

  const current = ROLES[index]

  const tick = useCallback(() => {
    if (reduce) {
      // Reduced motion: just swap instantly, no typewriter
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
    if (reduce) {
      setDisplayed(current)
      return
    }
    const delay =
      phase === "typing" ? 60
      : phase === "pause" ? 1800
      : 40
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
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      <Image
        src="/images/Background1.jpg"
        alt=""
        fill
        className="object-cover"
        priority
      />
      <div className="absolute inset-0 bg-gradient-to-b from-navy/30 via-navy/20 to-navy/40 dark:from-navy/50 dark:via-navy/40 dark:to-navy/60" />
      <NetworkCanvas />

      <motion.div
        className="relative z-10 text-center px-4 pt-16"
        variants={container}
        initial={reduce ? false : "hidden"}
        animate={reduce ? false : "show"}
      >
        {/* Photo */}
        <motion.button
          type="button"
          variants={item}
          onClick={() => personal.avatarUrl && setShowOverlay(true)}
          aria-label="Lihat foto profil ukuran penuh"
          className="group block w-32 h-32 mx-auto mb-6 rounded-full overflow-hidden ring-4 ring-snow/30 dark:ring-ice/30 shadow-xl cursor-pointer hover:ring-ice/70 focus-visible:ring-ice transition-all duration-300"
        >
          {personal.avatarUrl ? (
            <Image
              src={personal.avatarUrl}
              alt={personal.name}
              width={128}
              height={128}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              priority
            />
          ) : (
            <div className="w-full h-full bg-navy dark:bg-ice flex items-center justify-center">
              <span className="text-3xl font-bold text-snow dark:text-navy">
                {personal.initials}
              </span>
            </div>
          )}
        </motion.button>

        {/* Hi! */}
        <motion.p
          variants={item}
          className="text-snow/80 text-lg md:text-xl mb-1 tracking-wide"
        >
          Hi! 👋
        </motion.p>

        {/* Full name */}
        <motion.h1
          variants={item}
          className="text-balance text-4xl md:text-5xl font-bold tracking-tight text-snow mb-2"
        >
          I&apos;m {personal.name}
        </motion.h1>

        {/* Nickname */}
        <motion.p
          variants={item}
          className="text-base md:text-lg text-snow/60 mb-6"
        >
          ({personal.nickname})
        </motion.p>

        {/* Cycling role */}
        <motion.p
          variants={item}
          className="text-base md:text-lg text-snow/80 mb-8 h-7"
        >
          I&apos;m into{" "}
          <RoleCycler reduce={reduce} />
        </motion.p>

        {/* CTAs */}
        <motion.div variants={item} className="flex gap-4 justify-center">
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
            className="px-6 py-2.5 rounded-lg border-2 border-snow text-snow font-semibold text-sm hover:bg-snow/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-snow transition-colors"
          >
            Contact Me
          </a>
        </motion.div>
      </motion.div>

      {/* Scroll cue — three cascading chevrons */}
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
            className="block text-snow/40 group-hover:text-ice transition-colors duration-300"
            animate={
              reduce
                ? undefined
                : { opacity: [0.2, 1, 0.2], y: [0, 5, 0] }
            }
            transition={
              reduce
                ? undefined
                : {
                    duration: 1.4,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: i * 0.18,
                  }
            }
          >
            <svg
              width="22"
              height="13"
              viewBox="0 0 22 13"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
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
                className="absolute -top-3 -right-3 z-10 w-9 h-9 rounded-full bg-snow text-navy flex items-center justify-center shadow-lg hover:bg-ice focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ice transition-colors"
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
