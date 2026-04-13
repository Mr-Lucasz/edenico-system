import Link from 'next/link'
import { FiCheckCircle, FiUsers, FiActivity, FiLayers, FiBook, FiTrendingUp } from 'react-icons/fi'
import { gameSaveWorldCopy } from '@src/constants/gamePageCopy'
import styles from './GameSaveWorldSection.module.scss'

const EDU_ICONS = [FiLayers, FiBook, FiTrendingUp] as const

export function GameSaveWorldSection() {
  const c = gameSaveWorldCopy

  return (
    <section className={styles.section} aria-labelledby="game-save-world-title">
      <div className={styles.inner}>
        <header className={styles.header}>
          <span className={styles.badge}>{c.badge}</span>
          <h2 id="game-save-world-title" className={styles.title}>
            {c.titleBefore}
            <span className={styles.titleAccent}>{c.titleAccent}</span>
          </h2>
          <p className={styles.subtitle}>{c.subtitle}</p>
        </header>

        <div className={styles.gridTop}>
          <article className={styles.card}>
            <div className={styles.cardHead}>
              <FiCheckCircle className={styles.cardIcon} aria-hidden />
              <h3 className={styles.cardTitle}>{c.objectiveCard.title}</h3>
            </div>
            <p className={styles.cardBody}>{c.objectiveCard.body}</p>
            <div className={styles.cardActions}>
              <Link href={c.objectiveCard.moreHref} className={styles.btnOutline}>
                {c.objectiveCard.moreLabel}
              </Link>
              <Link href={c.objectiveCard.playHref} className={styles.btnPrimary}>
                {c.objectiveCard.playLabel}
              </Link>
            </div>
          </article>

          <article className={styles.card}>
            <div className={styles.cardHead}>
              <FiUsers className={`${styles.cardIcon} ${styles.cardIconBlue}`} aria-hidden />
              <h3 className={styles.cardTitle}>{c.communityCard.title}</h3>
            </div>
            <p className={styles.cardBody}>{c.communityCard.body}</p>
            <ul className={styles.communityList}>
              {c.communityCard.bullets.map((line) => (
                <li key={line} className={styles.communityRow}>
                  <FiActivity className={styles.rowIcon} aria-hidden />
                  {line}
                </li>
              ))}
            </ul>
          </article>
        </div>

        <article className={styles.wideCard}>
          <p className={styles.wideBrand}>{c.educationCard.brand}</p>
          <h3 className={styles.wideTitle}>{c.educationCard.headline}</h3>
          <p className={styles.wideIntro}>{c.educationCard.intro}</p>
          <div className={styles.cols}>
            {c.educationCard.columns.map((col, i) => {
              const Icon = EDU_ICONS[i]
              return (
                <div key={col.title} className={styles.col}>
                  <div className={styles.colIconWrap}>
                    <Icon className={styles.colIcon} aria-hidden />
                  </div>
                  <h4 className={styles.colTitle}>{col.title}</h4>
                  <p className={styles.colText}>{col.text}</p>
                </div>
              )
            })}
          </div>
        </article>
      </div>
    </section>
  )
}
