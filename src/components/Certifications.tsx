"use client"

import { useState, useCallback } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { useReducedMotion } from "framer-motion"
import { certifications } from "@/data/certifications"
import { Section } from "./Section"
import { SectionHeading } from "./SectionHeading"
import { ChevronLeft, ChevronRight, X, Download } from "lucide-react"

const EASE = [0.16, 1, 0.3, 1] as const
const TOTAL = certifications.length
const PER_PAGE = 4

export function Certifications() {
  const [page, setPage] = useState(0)
  const [direction, setDirection] = useState<1 | -1>(1)
  const [lightbox, setLightbox] = useState<number | null>(null)
  const reduce = useReducedMotion()

  const totalPages = Math.ceil(TOTAL / PER_PAGE)

  const go = useCallback((dir: 1 | -1) => {
    setDirection(dir)
    setPage((p) => (p + dir + totalPages) % totalPages)
  }, [totalPages])

  const visible = certifications.slice(page * PER_PAGE, page * PER_PAGE + PER_PAGE)

  const variants = {
    enter: (d: number) => ({ x: d * 80, opacity: 0 }),
    center: { x: 0, opacity: 1, transition: { duration: 0.4, ease: EASE } },
    exit: (d: number) => ({ x: d * -80, opacity: 0, transition: { duration: 0.25, ease: EASE } }),
  }

  const lightboxCert = lightbox !== null ? certifications[lightbox] : null

  return (
    <Section id="certifications" alt>
      <div className="max-w-6xl mx-auto">
        <SectionHeading title="Certifications" tag="CLEARANCE" align="center" />

        <div className="mt-12 relative">
          {/* Slide window */}
          <div className="overflow-hidden">
            <AnimatePresence custom={direction} mode="wait">
              <motion.div
                key={page}
                custom={direction}
                variants={reduce ? undefined : variants}
                initial={reduce ? false : "enter"}
                animate={reduce ? false : "center"}
                exit={reduce ? undefined : "exit"}
                className="grid grid-cols-2 md:grid-cols-4 gap-4"
              >
                {visible.map((cert, i) => {
                  const globalIdx = page * PER_PAGE + i
                  return (
                    <button
                      key={globalIdx}
                      onClick={() => setLightbox(globalIdx)}
                      aria-label={`Lihat ${cert.name}`}
                      className="group relative overflow-hidden rounded-xl border border-steel/30 dark:border-steel/40 bg-dark-card hover:border-ice/50 hover:-translate-y-1 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ice transition-all duration-300 shadow-md hover:shadow-xl"
                    >
                      {/* Scan line */}
                      <div
                        className="pointer-events-none absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-transparent via-ice to-transparent opacity-0 group-hover:opacity-100 -translate-y-full group-hover:translate-y-[1000%] group-hover:transition-[transform,opacity] group-hover:duration-[600ms] group-hover:ease-in-out motion-reduce:hidden z-10"
                        aria-hidden="true"
                      />

                      {/* Certificate image */}
                      <div className="aspect-[3/2] relative">
                        <Image
                          src={cert.image}
                          alt={cert.name}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                          sizes="(max-width: 768px) 50vw, 25vw"
                        />
                      </div>

                      {/* Meta */}
                      <div className="px-3 py-2 text-left">
                        <p className="text-xs font-semibold text-snow leading-snug truncate">
                          {cert.name}
                        </p>
                        <p className="font-[family-name:var(--font-mono)] text-[10px] text-online/80 mt-0.5 truncate">
                          {cert.issuer} · {cert.year}
                        </p>
                      </div>
                    </button>
                  )
                })}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Controls */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-4 mt-6">
              <button
                onClick={() => go(-1)}
                aria-label="Halaman sebelumnya"
                className="w-9 h-9 rounded-full bg-dark-card border border-ice/20 text-ice flex items-center justify-center hover:bg-ice/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ice transition-all"
              >
                <ChevronLeft size={18} />
              </button>

              <div className="flex gap-2">
                {Array.from({ length: totalPages }).map((_, i) => (
                  <button
                    key={i}
                    onClick={() => { setDirection(i > page ? 1 : -1); setPage(i) }}
                    aria-label={`Halaman ${i + 1}`}
                    className={`h-1.5 rounded-full transition-all duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ice ${
                      i === page ? "w-6 bg-online" : "w-1.5 bg-steel/50 hover:bg-ice/60"
                    }`}
                  />
                ))}
              </div>

              <button
                onClick={() => go(1)}
                aria-label="Halaman berikutnya"
                className="w-9 h-9 rounded-full bg-dark-card border border-ice/20 text-ice flex items-center justify-center hover:bg-ice/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ice transition-all"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          )}
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
              className="relative max-w-[95vw] max-h-[95vh] flex flex-col items-center"
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
                className="max-w-[95vw] max-h-[85vh] rounded-xl shadow-2xl object-contain"
              />

              <div className="mt-3 flex items-center gap-4">
                <div className="text-center">
                  <p className="font-bold text-snow text-sm">{lightboxCert.name}</p>
                  <p className="font-[family-name:var(--font-mono)] text-xs text-online/80">
                    {lightboxCert.issuer} · {lightboxCert.year}
                  </p>
                </div>
                {lightboxCert.pdfUrl && (
                  <a
                    href={lightboxCert.pdfUrl}
                    download
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-ice/15 border border-ice/30 text-ice text-xs font-medium hover:bg-ice/30 transition-colors"
                  >
                    <Download size={13} /> PDF
                  </a>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </Section>
  )
}
