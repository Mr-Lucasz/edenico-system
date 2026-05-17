'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useLayoutEffect, useRef } from 'react'
import { cn } from '@src/utils/cn'
import styles from './PhilosophyCards.module.scss'

gsap.registerPlugin(ScrollTrigger)

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

const STACK_SHRINK_SELECTOR = `.${styles.stackShrinkTarget}`

export function PhilosophyCards() {
  const stackRef = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    const stack = stackRef.current
    if (!stack) return

    const mm = gsap.matchMedia()

    mm.add('(max-width: 639px) and (prefers-reduced-motion: no-preference)', () => {
      const ctx = gsap.context(() => {
        const cards = gsap.utils.toArray<HTMLElement>(stack.querySelectorAll(STACK_SHRINK_SELECTOR))
        if (cards.length < 2) return

        cards.forEach((card, index) => {
          if (index === cards.length - 1) return

          gsap.fromTo(
            card,
            { scale: 1, filter: 'brightness(1)' },
            {
              scale: 0.9,
              filter: 'brightness(0.5)',
              ease: 'none',
              scrollTrigger: {
                trigger: cards[index + 1],
                start: 'top 80%',
                end: 'top 20%',
                scrub: true,
              },
            }
          )
        })
      }, stack)

      const refreshSoon = () => {
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            ScrollTrigger.refresh()
          })
        })
      }

      refreshSoon()

      const onLoad = () => {
        ScrollTrigger.refresh()
      }
      if (document.readyState !== 'complete') {
        window.addEventListener('load', onLoad)
      }

      return () => {
        window.removeEventListener('load', onLoad)
        ctx.revert()
      }
    })

    return () => {
      mm.revert()
    }
  }, [])

  return (
    <motion.div
      className={`filosofia-cards ${styles.root}`}
      variants={containerVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-48px' }}
    >
      <div ref={stackRef} className={styles.stack}>
        {PILLARS.map((pillar, index) => (
          <motion.div
            key={pillar.id}
            variants={itemVariants}
            className={cn(styles.stackItem, index === 4 && styles.stackItemLast)}
          >
            <div className={styles.stackShrinkTarget}>
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
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}
