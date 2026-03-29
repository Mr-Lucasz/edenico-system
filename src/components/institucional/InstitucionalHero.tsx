import { institutionalCopy } from '@src/constants/institutionalCopy'
import { FiAward, FiZap, FiUsers, FiCheckCircle, FiGrid, FiFolder } from 'react-icons/fi'
import styles from './InstitucionalHero.module.scss'

const DIFF_ICONS = [FiAward, FiZap, FiUsers, FiCheckCircle, FiGrid, FiFolder]

export function InstitucionalHero() {
  const { hero } = institutionalCopy
  return (
    <section id="inicio" className={styles.section} aria-labelledby="institucional-hero-heading">
      <div className={styles.inner}>
        <div>
          <span className={styles.badge}>{hero.badge}</span>
          <h1 id="institucional-hero-heading" className={styles.title}>
            {hero.titleLine1}{' '}
            <span className={styles.accent}>{hero.titleLine2}</span>{' '}
            {hero.titleLine3}
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
          {hero.differentials.map((label, i) => {
            const Icon = DIFF_ICONS[i]
            return (
              <div key={label} className={styles.card}>
                <div className={styles.iconWrap}>
                  <Icon className={styles.icon} aria-hidden />
                </div>
                <span className={styles.cardLabel}>{label}</span>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
