import Link from 'next/link'
import { FiBook, FiPlay } from 'react-icons/fi'
import { gameAdventureCtaCopy } from '@src/constants/gamePageCopy'
import styles from './GameAdventureCtaSection.module.scss'

const GOOGLE_PLAY_URL = 'https://play.google.com/store/apps/details?id=com.edenicos.academy'
const UTM_PARAMS = 'utm_source=site&utm_medium=web&utm_campaign=game-adventure-cta'

const VALUE_CLASS = {
  yellow: styles.valYellow,
  green: styles.valGreen,
  purple: styles.valPurple,
} as const

export function GameAdventureCtaSection() {
  const c = gameAdventureCtaCopy

  return (
    <section className={styles.section} aria-labelledby="game-adventure-cta-title">
      <div className={styles.inner}>
        <span className={styles.badge}>
          <FiBook className={styles.badgeIcon} aria-hidden />
          {c.badge}
        </span>
        <h2 id="game-adventure-cta-title" className={styles.title}>
          {c.titleBefore}
          <span className={styles.titleAccent}>{c.titleAccent}</span>
        </h2>
        <p className={styles.subtitle}>{c.subtitle}</p>

        <div className={styles.statsCard}>
          <div className={styles.statsRow}>
            {c.stats.map((s) => (
              <div key={s.label + s.value} className={styles.stat}>
                <span className={`${styles.statValue} ${VALUE_CLASS[s.valueClass]}`}>{s.value}</span>
                <span className={styles.statLabel}>{s.label}</span>
                <span className={styles.statHint}>{s.hint}</span>
              </div>
            ))}
          </div>
        </div>

        <Link
          href={`${GOOGLE_PLAY_URL}?${UTM_PARAMS}`}
          className={styles.playCta}
          target="_blank"
          rel="noopener noreferrer"
        >
          <FiPlay className={styles.playIcon} aria-hidden />
          {c.ctaLabel}
          <span className={styles.sparkle} aria-hidden>
            ✦
          </span>
          <span className={styles.sparkle} aria-hidden>
            ✦
          </span>
        </Link>

        <p className={styles.footnote}>
          {c.footnoteBefore}
          <strong>{c.footnoteBold}</strong>
        </p>
      </div>
    </section>
  )
}
