'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { cn } from '@src/utils/cn'
import styles from './PhilosophyCards.module.scss'

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
      className={`filosofia-cards ${styles.root}`}
      variants={containerVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-48px' }}
    >
      <div className={styles.grid}>
        {PILLARS.map((pillar, index) => (
          <motion.div
            key={pillar.id}
            variants={itemVariants}
            className={cn(index === 4 ? styles.cellCenter : styles.cell)}
          >
            <div
              className={styles.cardWrap}
              style={{ aspectRatio: '309/146' }}
            >
              <Image
                src={pillar.svg}
                alt=""
                fill
                className={styles.cardImg}
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
