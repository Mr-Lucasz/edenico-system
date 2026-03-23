'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'

const PILLARS = [
  { id: 'fisico', svg: '/fisico-section-filosofia.svg' },
  { id: 'mental', svg: '/mental-section-filosofia.svg' },
  { id: 'espiritual', svg: '/espiritual-section-filosofia.svg' },
  { id: 'relacional', svg: '/relacional-section-filosofia.svg' },
  { id: 'profissional', svg: '/profissional-section-filosofia.svg' },
] as const

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.06 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 18 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.42, ease: [0.22, 1, 0.36, 1] as const },
  },
}

export function PhilosophyCards() {
  return (
    <motion.div
      className="filosofia-cards mx-auto w-full max-w-[642px]"
      variants={containerVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-48px' }}
    >
      <div className="grid grid-cols-1 grid-rows-[auto] gap-x-[18px] gap-y-[24px] sm:grid-cols-2">
        {PILLARS.map((pillar, index) => (
          <motion.div
            key={pillar.id}
            variants={itemVariants}
            className={index === 4 ? 'flex justify-center sm:col-span-2' : ''}
          >
            <div
              className="relative mx-auto h-[146px] w-full max-w-[309px] shrink-0 sm:w-[309px]"
              style={{ aspectRatio: '309/146' }}
            >
              <Image
                src={pillar.svg}
                alt=""
                fill
                className="object-contain object-left"
                sizes="(max-width: 640px) 100vw, 309px"
                unoptimized
              />
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}
