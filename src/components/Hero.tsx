"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { X } from "lucide-react"
import { personal } from "@/data/personal"

export function Hero() {
  const [showOverlay, setShowOverlay] = useState(false)

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
      <div className="relative z-10 text-center px-4 pt-16">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", duration: 0.6 }}
          className="w-28 h-28 mx-auto mb-6 rounded-full overflow-hidden ring-4 ring-snow/30 dark:ring-ice/30 shadow-lg cursor-pointer hover:ring-ice/60 transition-all"
          onClick={() => personal.avatarUrl && setShowOverlay(true)}
        >
          {personal.avatarUrl ? (
            <Image
              src={personal.avatarUrl}
              alt={personal.name}
              width={112}
              height={112}
              className="w-full h-full object-cover"
              priority
            />
          ) : (
            <div className="w-full h-full bg-navy dark:bg-ice flex items-center justify-center">
              <span className="text-3xl font-bold text-snow dark:text-navy">
                {personal.initials}
              </span>
            </div>
          )}
        </motion.div>

      <AnimatePresence>
        {showOverlay && personal.avatarUrl && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
            onClick={() => setShowOverlay(false)}
          >
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.5, opacity: 0 }}
              transition={{ type: "spring", duration: 0.4 }}
              className="relative max-w-[90vw] max-h-[90vh]"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setShowOverlay(false)}
                className="absolute -top-3 -right-3 z-10 w-8 h-8 rounded-full bg-snow text-navy flex items-center justify-center shadow-lg hover:bg-ice transition-colors"
              >
                <X size={16} />
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

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="text-4xl md:text-5xl font-bold text-snow mb-2"
        >
          {personal.name}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.28, duration: 0.5 }}
          className="text-base md:text-lg text-ice/80 mb-3"
        >
          ({personal.nickname})
        </motion.p>

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
