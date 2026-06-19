"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence, useReducedMotion, type Variants } from "framer-motion"
import Image from "next/image"
import { X, ArrowDown } from "lucide-react"
import { personal } from "@/data/personal"

const EASE = [0.16, 1, 0.3, 1] as const

export function Hero() {
  const [showOverlay, setShowOverlay] = useState(false)
  const reduce = useReducedMotion()

  // Close the photo overlay with Escape.
  useEffect(() => {
    if (!showOverlay) return
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setShowOverlay(false)
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [showOverlay])

  // Container orchestrates a gentle stagger; items rise into place. When the
  // user prefers reduced motion, the variants are left unused (initial/animate
  // are disabled below) so everything renders at rest immediately.
  const container: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.12, delayChildren: 0.15 } },
  }
  const item: Variants = {
    hidden: { opacity: 0, y: 24 },
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

      <motion.div
        className="relative z-10 text-center px-4 pt-16"
        variants={container}
        initial={reduce ? false : "hidden"}
        animate={reduce ? false : "show"}
      >
        <motion.button
          type="button"
          variants={item}
          onClick={() => personal.avatarUrl && setShowOverlay(true)}
          aria-label="Lihat foto profil ukuran penuh"
          className="group block w-28 h-28 mx-auto mb-6 rounded-full overflow-hidden ring-4 ring-snow/30 dark:ring-ice/30 shadow-lg cursor-pointer hover:ring-ice/60 focus-visible:ring-ice transition-all"
        >
          {personal.avatarUrl ? (
            <Image
              src={personal.avatarUrl}
              alt={personal.name}
              width={112}
              height={112}
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

        <motion.h1
          variants={item}
          className="text-balance text-4xl md:text-5xl font-bold tracking-tight text-snow mb-2"
        >
          {personal.name}
        </motion.h1>

        <motion.p
          variants={item}
          className="text-base md:text-lg text-ice/80 mb-3"
        >
          ({personal.nickname})
        </motion.p>

        <motion.p
          variants={item}
          className="text-lg md:text-xl text-ice dark:text-ice/90 mb-4"
        >
          {personal.tagline}
        </motion.p>

        <motion.p
          variants={item}
          className="text-pretty text-snow/85 max-w-xl mx-auto mb-8 text-sm md:text-base leading-relaxed"
        >
          {personal.description}
        </motion.p>

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

      {/* Scroll cue */}
      <motion.a
        href="#about"
        aria-label="Scroll ke bawah"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 text-snow/70 hover:text-snow transition-colors"
        animate={reduce ? undefined : { y: [0, 8, 0] }}
        transition={
          reduce ? undefined : { duration: 1.8, repeat: Infinity, ease: "easeInOut" }
        }
      >
        <ArrowDown size={24} />
      </motion.a>

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
