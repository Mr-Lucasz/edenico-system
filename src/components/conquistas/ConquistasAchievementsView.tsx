'use client'

import { FiAward, FiStar, FiTarget, FiZap } from 'react-icons/fi'
import { FaCrown } from 'react-icons/fa'
import { FaGem } from 'react-icons/fa6'
import { ConquistasStarsSection } from '@src/components/conquistas/ConquistasStarsSection'
import styles from './ConquistasAchievementsView.module.scss'

const XP_CURRENT = 4850
/** Faixa visual da barra até Diamante (protótipo) */
const XP_BAR_MAX = 8000

function formatXp(value: number): string {
  return value.toLocaleString('pt-BR')
}

export function ConquistasAchievementsView() {
  const fillPct = Math.min(100, (XP_CURRENT / XP_BAR_MAX) * 100)

  return (
    <div className={styles.root}>
      <header className={styles.pageHeader}>
        <h1 className={styles.pageTitle}>Minhas Conquistas</h1>
        <div className={styles.xpBadge} aria-label={`${formatXp(XP_CURRENT)} XP`}>
          <FiAward style={{ width: '1.25rem', height: '1.25rem' }} aria-hidden />
          <span>{formatXp(XP_CURRENT)} XP</span>
        </div>
      </header>

      <section className={styles.progressCard} aria-labelledby="xp-progress-heading">
        <div className={styles.progressCardHeader}>
          <h2 id="xp-progress-heading" className={styles.progressCardTitle}>
            Progresso de Nível XP
          </h2>
          <p className={styles.progressCardSubtitle}>
            Seu XP atual:{' '}
            <span className={styles.xpHighlight}>{formatXp(XP_CURRENT)}</span>
          </p>
        </div>

        <div
          className={styles.trackSection}
          style={{ ['--xp-fill-pct' as string]: `${fillPct}%` }}
        >
          <div className={styles.trackVisual}>
            <div className={styles.trackLine} aria-hidden>
              <div className={styles.trackLineFill} />
            </div>
            <div className={styles.milestoneIconsRow}>
              <div className={`${styles.milestoneIconWrap} ${styles.milestoneBronze}`}>
                <div className={styles.milestoneCircle}>
                  <FiAward style={{ width: '1.25rem', height: '1.25rem' }} aria-hidden />
                </div>
              </div>
              <div className={`${styles.milestoneIconWrap} ${styles.milestonePrata}`}>
                <div className={styles.milestoneCircle}>
                  <FiStar style={{ width: '1.25rem', height: '1.25rem' }} aria-hidden />
                </div>
              </div>
              <div className={`${styles.milestoneIconWrap} ${styles.milestoneLocked}`}>
                <div className={styles.milestoneCircle}>
                  <FaCrown style={{ width: '1.1rem', height: '1.1rem' }} aria-hidden />
                </div>
              </div>
              <div className={`${styles.milestoneIconWrap} ${styles.milestoneLocked}`}>
                <div className={styles.milestoneCircle}>
                  <FaGem style={{ width: '1.05rem', height: '1.05rem' }} aria-hidden />
                </div>
              </div>
            </div>
          </div>

          <div className={styles.milestoneLabelsRow}>
            <div className={`${styles.milestone} ${styles.milestoneBronze}`}>
              <div className={styles.milestoneLabel}>
                <span className={styles.milestoneName}>Bronze</span>
                <span className={styles.milestoneRange}>0 - 2.000 XP</span>
              </div>
            </div>
            <div className={`${styles.milestone} ${styles.milestonePrata}`}>
              <div className={styles.milestoneLabel}>
                <span className={styles.milestoneName}>Prata</span>
                <span className={styles.milestoneRange}>2.000 - 5.000 XP</span>
                <span className={styles.milestoneHint}>150 XP restantes</span>
              </div>
            </div>
            <div className={`${styles.milestone} ${styles.milestoneLocked}`}>
              <div className={styles.milestoneLabel}>
                <span className={styles.milestoneName}>Ouro</span>
                <span className={styles.milestoneRange}>5.000 - 8.000 XP</span>
              </div>
            </div>
            <div className={`${styles.milestone} ${styles.milestoneLocked}`}>
              <div className={styles.milestoneLabel}>
                <span className={styles.milestoneName}>Diamante</span>
                <span className={styles.milestoneRange}>8.000+ XP</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className={styles.summaryGrid}>
        <div className={styles.summaryCard}>
          <div className={`${styles.summaryIcon} ${styles.iconBlue}`}>
            <FiAward style={{ width: '1.75rem', height: '1.75rem' }} aria-hidden />
          </div>
          <p className={styles.summaryValue}>3</p>
          <p className={styles.summaryCaption}>Conquistadas</p>
        </div>
        <div className={styles.summaryCard}>
          <div className={`${styles.summaryIcon} ${styles.iconMuted}`}>
            <FiTarget style={{ width: '1.75rem', height: '1.75rem' }} aria-hidden />
          </div>
          <p className={styles.summaryValue}>4</p>
          <p className={styles.summaryCaption}>Restantes</p>
        </div>
        <div className={styles.summaryCard}>
          <div className={`${styles.summaryIcon} ${styles.iconYellow}`}>
            <FiZap style={{ width: '1.75rem', height: '1.75rem' }} aria-hidden />
          </div>
          <p className={styles.summaryValue}>{formatXp(XP_CURRENT)}</p>
          <p className={styles.summaryCaption}>XP Total</p>
        </div>
      </div>

      <ConquistasStarsSection />
    </div>
  )
}
