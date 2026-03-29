'use client'

import { useState, useEffect } from 'react'
import { institutionalCopy } from '@src/constants/institutionalCopy'
import { FiEye, FiHeart } from 'react-icons/fi'
import { cn } from '@src/utils/cn'
import styles from './PrinciplesSection.module.scss'

function renderHighlight(text: string) {
  const parts = text.split(/\*\*(.*?)\*\*/g)
  return parts.map((p, i) =>
    i % 2 === 1 ? (
      <strong key={i} className={styles.highlightOrange}>
        {p}
      </strong>
    ) : (
      p
    )
  )
}

export function PrinciplesSection() {
  const { principles } = institutionalCopy
  const [activeIndex, setActiveIndex] = useState(0)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 768px)')
    setIsMobile(mq.matches)
    const fn = () => setIsMobile(mq.matches)
    mq.addEventListener('change', fn)
    return () => mq.removeEventListener('change', fn)
  }, [])

  const cards = [
    {
      title: principles.vision.title,
      description: principles.vision.description,
      icon: FiEye,
      iconWrap: styles.iconOrange,
    },
    {
      title: principles.mission.title,
      description: principles.mission.description,
      icon: FiHeart,
      iconWrap: styles.iconPurple,
    },
  ]

  return (
    <section className={styles.section} aria-labelledby="principles-heading">
      <div className={styles.container}>
        <span className={styles.tag}>{principles.tag}</span>
        <h2 id="principles-heading" className={styles.title}>
          {principles.title} <span className={styles.titleAccent}>{principles.title2}</span>
        </h2>
        <p className={styles.subtitle}>{principles.subtitle}</p>

        {isMobile ? (
          <div className={styles.mobileWrap}>
            <div className={styles.mobileSlider}>
              {cards.map((card, i) => (
                <div
                  key={card.title}
                  role="tabpanel"
                  id={`principles-panel-${i}`}
                  aria-labelledby={`principles-tab-${i}`}
                  hidden={activeIndex !== i}
                  className={styles.panel}
                >
                  <div className={card.iconWrap}>
                    <card.icon className={styles.iconLg} aria-hidden />
                  </div>
                  <h3 className={styles.cardTitle}>{card.title}</h3>
                  <p className={styles.cardText}>{renderHighlight(card.description)}</p>
                </div>
              ))}
            </div>
            <div role="tablist" className={styles.dots} aria-label="Visão e Missão">
              {cards.map((_, i) => (
                <button
                  key={i}
                  id={`principles-tab-${i}`}
                  type="button"
                  role="tab"
                  aria-selected={activeIndex === i}
                  aria-controls={`principles-panel-${i}`}
                  onClick={() => setActiveIndex(i)}
                  className={cn(styles.dot, activeIndex === i && styles.dotActive)}
                />
              ))}
            </div>
          </div>
        ) : (
          <div className={styles.desktopGrid}>
            {cards.map((card) => (
              <article key={card.title} className={styles.desktopCard}>
                <div className={card.iconWrap}>
                  <card.icon className={styles.iconLg} aria-hidden />
                </div>
                <h3 className={styles.cardTitle}>{card.title}</h3>
                <p className={styles.cardText}>{renderHighlight(card.description)}</p>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
