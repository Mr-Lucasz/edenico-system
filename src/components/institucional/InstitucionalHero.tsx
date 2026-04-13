import type { CSSProperties } from 'react'
import { institutionalCopy } from '@src/constants/institutionalCopy'
import { FiAward, FiZap, FiUsers, FiCheckCircle, FiHeart, FiFileText } from 'react-icons/fi'
import styles from './InstitucionalHero.module.scss'

const HERO_ICONS = [FiAward, FiZap, FiUsers, FiCheckCircle, FiHeart, FiFileText] as const

/** Cores dos círculos de ícone (protótipo / SVG) */
const HERO_ICON_ACCENTS = ['#f59e0b', '#a855f7', '#22c55e', '#6366f1', '#ec4899', '#14b8a6'] as const

export function InstitucionalHero() {
  const { hero } = institutionalCopy

  return (
    <section id="inicio" className={styles.section} aria-labelledby="institucional-hero-heading">
      <div className={styles.inner}>
        <div className={styles.copyCol}>
          <span className={styles.badge}>{hero.badge}</span>
          <h1 id="institucional-hero-heading" className={styles.title}>
            {hero.titleLine1}{' '}
            <span className={styles.accent}>{hero.titleLine2}</span>{' '}
            <span className={styles.titleLight}>{hero.titleLine3}</span>
          </h1>
          <p className={styles.subtitle}>{hero.subtitle}</p>
          <a href="#quem-somos" className={styles.cta}>
            {hero.cta}
            <svg className={styles.ctaIcon} fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </a>
        </div>
        <div className={styles.grid}>
          {hero.differentials.map((item, i) => {
            const Icon = HERO_ICONS[i]
            const accent = HERO_ICON_ACCENTS[i]
            const iconStyle = {
              '--icon-accent': accent,
              '--icon-bg': `${accent}22`,
            } as CSSProperties
            return (
              <div key={`${item.title}-${item.subtitle}`} className={styles.card}>
                <div className={styles.cardRow}>
                  <div className={styles.iconWrap} style={iconStyle}>
                    <Icon className={styles.icon} aria-hidden />
                  </div>
                  <div className={styles.cardTexts}>
                    <span className={styles.cardTitle}>{item.title}</span>
                    <span className={styles.cardSubtitle}>{item.subtitle}</span>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
