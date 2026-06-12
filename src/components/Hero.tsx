"use client"

import { motion } from "framer-motion"
import Image from "next/image"
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
          className="w-28 h-28 mx-auto mb-6 rounded-full overflow-hidden ring-4 ring-snow/30 dark:ring-ice/30 shadow-lg"
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
