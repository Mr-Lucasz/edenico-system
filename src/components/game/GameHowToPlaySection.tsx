'use client'

import { useState } from 'react'
import { FiChevronLeft, FiChevronRight, FiCpu, FiBookOpen, FiAward, FiUsers } from 'react-icons/fi'
import { gameHowToPlayCopy } from '@src/constants/gamePageCopy'
import styles from './GameHowToPlaySection.module.scss'

const ICONS = [FiBookOpen, FiAward, FiUsers] as const
const TONE_CLASS = [styles.featureIconBlue, styles.featureIconGreen, styles.featureIconPurple] as const

export function GameHowToPlaySection() {
  const { badge, title, subtitle, slides, features } = gameHowToPlayCopy
  const [index, setIndex] = useState(0)
  const n = slides.length
  const prev = () => setIndex((i) => (i - 1 + n) % n)
  const next = () => setIndex((i) => (i + 1) % n)
  const slide = slides[index]

  return (
    <section className={styles.section} aria-labelledby="game-how-to-play-title">
      <div className={styles.inner}>
        <header className={styles.header}>
          <span className={styles.badge}>
            <FiCpu className={styles.badgeIcon} aria-hidden />
            {badge}
          </span>
          <h2 id="game-how-to-play-title" className={styles.title}>
            {title}
          </h2>
          <p className={styles.subtitle}>{subtitle}</p>
        </header>

        <div className={styles.carouselWrap}>
          <div className={styles.carousel}>
            <button
              type="button"
              className={`${styles.carouselNav} ${styles.carouselNavPrev}`}
              onClick={prev}
              aria-label="Slide anterior"
            >
              <FiChevronLeft className={styles.navIcon} aria-hidden />
            </button>
            <div className={styles.carouselBody}>
              <p className={styles.carouselLabel}>{slide.label}</p>
              <p className={styles.carouselCaption}>{slide.caption}</p>
            </div>
            <button
              type="button"
              className={`${styles.carouselNav} ${styles.carouselNavNext}`}
              onClick={next}
              aria-label="Próximo slide"
            >
              <FiChevronRight className={styles.navIcon} aria-hidden />
            </button>
          </div>
          <div className={styles.dots} role="tablist" aria-label="Slides">
            {slides.map((s, i) => (
              <button
                key={s.id}
                type="button"
                role="tab"
                aria-selected={i === index}
                className={styles.dot}
                data-active={i === index}
                onClick={() => setIndex(i)}
                aria-label={`Slide ${i + 1}`}
              />
            ))}
          </div>
        </div>

        <ul className={styles.features}>
          {features.map((f, i) => {
            const Icon = ICONS[i]
            return (
              <li key={f.title} className={styles.feature}>
                <div className={`${styles.featureIconWrap} ${TONE_CLASS[i]}`}>
                  <Icon className={styles.featureIcon} aria-hidden />
                </div>
                <h3 className={styles.featureTitle}>{f.title}</h3>
                <p className={styles.featureText}>{f.description}</p>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
