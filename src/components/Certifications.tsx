"use client"

import { useState, useCallback } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { certifications } from "@/data/certifications"
import { Section } from "./Section"
import { SectionHeading } from "./SectionHeading"
import { ChevronLeft, ChevronRight, X, Download, ZoomIn } from "lucide-react"
import { useReducedMotion } from "framer-motion"

const EASE = [0.16, 1, 0.3, 1] as const
const TOTAL = certifications.length

export function Certifications() {
  const [index, setIndex] = useState(0)
  const [direction, setDirection] = useState<1 | -1>(1)
  const [lightbox, setLightbox] = useState<number | null>(null)
  const reduce = useReducedMotion()

  const go = useCallback((dir: 1 | -1) => {
    setDirection(dir)
    setIndex((i) => (i + dir + TOTAL) % TOTAL)
  }, [])

  const prev = useCallback(() => go(-1), [go])
  const next = useCallback(() => go(1), [go])

  const variants = {
    enter: (d: number) => ({ x: d * 60, opacity: 0 }),
    center: { x: 0, opacity: 1, transition: { duration: 0.45, ease: EASE } },
    exit: (d: number) => ({ x: d * -60, opacity: 0, transition: { duration: 0.3, ease: EASE } }),
  }

  const cert = certifications[index]
  const lightboxCert = lightbox !== null ? certifications[lightbox] : null

  return (
    <Section id="certifications" alt>
      <div className="max-w-4xl mx-auto">
        <SectionHeading title="Certifications" tag="CLEARANCE" align="center" />

        <div className="mt-12 relative">
          {/* Carousel track */}
          <div className="relative overflow-hidden rounded-2xl border border-steel/30 dark:border-ice/15 shadow-2xl bg-dark-card">
            <AnimatePresence custom={direction} mode="wait">
              <motion.div
                key={index}
                custom={direction}
                variants={reduce ? undefined : variants}
                initial={reduce ? false : "enter"}
                animate={reduce ? false : "center"}
                exit={reduce ? undefined : "exit"}
                className="relative w-full cursor-zoom-in"
                onClick={() => setLightbox(index)}
              >
                <Image
                  src={cert.image}
                  alt={cert.name}
                  width={1400}
                  height={990}
                  className="w-full h-auto object-contain max-h-[70vh]"
                  priority={index === 0}
                />
                {/* Bottom meta strip */}
                <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-dark-bg/90 to-transparent p-4 flex items-end justify-between">
                  <div>
                    <p className="font-bold text-snow text-base">{cert.name}</p>
                    <p className="font-[family-name:var(--font-mono)] text-xs text-online/80">
                      {cert.issuer} · {cert.year}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-snow/50 text-xs flex items-center gap-1">
                      <ZoomIn size={13} /> klik untuk perbesar
                    </span>
                    {cert.pdfUrl && (
                      <a
                        href={cert.pdfUrl}
                        download
                        onClick={(e) => e.stopPropagation()}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-ice/15 border border-ice/30 text-ice text-xs font-medium hover:bg-ice/30 transition-colors"
                        aria-label={`Download ${cert.name}`}
                      >
                        <Download size={13} />
                        PDF
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Prev / Next arrows */}
            <button
              onClick={prev}
              aria-label="Sertifikat sebelumnya"
              className="absolute left-3 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-dark-bg/70 border border-ice/20 text-ice flex items-center justify-center hover:bg-ice/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ice transition-all"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={next}
              aria-label="Sertifikat berikutnya"
              className="absolute right-3 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-dark-bg/70 border border-ice/20 text-ice flex items-center justify-center hover:bg-ice/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ice transition-all"
            >
              <ChevronRight size={20} />
            </button>
          </div>

          {/* Dot indicators */}
          <div className="flex justify-center gap-2 mt-5">
            {certifications.map((_, i) => (
              <button
                key={i}
                onClick={() => { setDirection(i > index ? 1 : -1); setIndex(i) }}
                aria-label={`Lihat sertifikat ${i + 1}`}
                className={`h-1.5 rounded-full transition-all duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ice ${
                  i === index
                    ? "w-6 bg-online"
                    : "w-1.5 bg-steel/50 hover:bg-ice/60"
                }`}
              />
            ))}
          </div>

          {/* Thumbnail strip */}
          <div className="mt-4 flex gap-3 justify-center flex-wrap">
            {certifications.map((c, i) => (
              <button
                key={i}
                onClick={() => { setDirection(i > index ? 1 : -1); setIndex(i) }}
                aria-label={c.name}
                className={`relative w-20 h-14 rounded-lg overflow-hidden border-2 transition-all duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ice ${
                  i === index
                    ? "border-online shadow-[0_0_10px_rgba(57,255,138,0.4)]"
                    : "border-steel/30 opacity-60 hover:opacity-100 hover:border-ice/50"
                }`}
              >
                <Image src={c.image} alt={c.name} fill className="object-cover" />
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxCert && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm p-4"
            onClick={() => setLightbox(null)}
          >
            <motion.div
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              transition={{ duration: 0.3, ease: EASE }}
              className="relative max-w-[95vw] max-h-[95vh]"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setLightbox(null)}
                aria-label="Tutup"
                className="absolute -top-3 -right-3 z-10 w-9 h-9 rounded-full bg-dark-card border border-ice/30 text-snow flex items-center justify-center hover:bg-dark-surface focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ice transition-colors"
              >
                <X size={16} />
              </button>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={lightboxCert.image}
                alt={lightboxCert.name}
                className="max-w-[95vw] max-h-[92vh] rounded-xl shadow-2xl object-contain"
              />
              <div className="mt-3 text-center">
                <p className="font-bold text-snow">{lightboxCert.name}</p>
                <p className="font-[family-name:var(--font-mono)] text-xs text-online/80">
                  {lightboxCert.issuer} · {lightboxCert.year}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </Section>
  )
}
