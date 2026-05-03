'use client'

import Link from 'next/link'
import type { CSSProperties } from 'react'
import { FiStar, FiAward, FiLock, FiMoon, FiSun, FiPlay } from 'react-icons/fi'
import { getLevelCardsMock } from '@src/data/levelCardsByCategory'
import { getActiveColorForCourseCategory } from '@src/constants/starsCategoryColors'
import type { CourseCategory } from '@src/types/course.types'
import { CATEGORY_QUERY_KEY } from './cursosConstants'
import styles from './LevelCardsSection.module.scss'

function shadeTowardBlack(hex: string, factor = 0.78): string {
  const raw = hex.trim().replace('#', '')
  if (raw.length !== 6) return '#7a4a33'
  const r = Math.min(255, Math.round(parseInt(raw.slice(0, 2), 16) * factor))
  const g = Math.min(255, Math.round(parseInt(raw.slice(2, 4), 16) * factor))
  const b = Math.min(255, Math.round(parseInt(raw.slice(4, 6), 16) * factor))
  const part = (n: number) => n.toString(16).padStart(2, '0')
  return `#${part(r)}${part(g)}${part(b)}`
}

interface LevelCardsSectionProps {
  category: CourseCategory
}

export function LevelCardsSection({ category }: LevelCardsSectionProps) {
  const mock = getLevelCardsMock(category)
  const accent = getActiveColorForCourseCategory(category)
  const accentDeep = shadeTowardBlack(accent)
  const gridStyle = {
    '--level-accent': accent,
    '--level-accent-deep': accentDeep,
  } as CSSProperties

  const query = `?${CATEGORY_QUERY_KEY}=${category}`
  const basicoHref = `/cursos/nivel/basico${query}`
  const pct = `${mock.progressPercent}%`

  return (
    <section className={styles.grid} style={gridStyle} aria-label="Níveis de aprendizado">
      {/* Básico — ativo */}
      <article className={styles.card}>
        <div className={styles.cardHero}>
          <div className={styles.cardHeroTop}>
            <span className={styles.starBadge} aria-hidden>
              <FiStar className={styles.starIcon} />
            </span>
            <span className={styles.certBadge}>
              <FiAward className={styles.certIcon} aria-hidden />
              Certificado
            </span>
          </div>
          <h2 className={styles.cardTitle}>Nível Básico</h2>
          <p className={styles.cardDesc}>{mock.basicDescription}</p>
        </div>
        <div className={styles.cardBody}>
          <div className={styles.progressHead}>
            <span className={styles.progressLabel}>Progresso da Aventura</span>
            <span className={styles.progressPill}>{pct}</span>
          </div>
          <div className={styles.progressTrack}>
            <div className={styles.progressFill} style={{ width: pct }} />
          </div>
          <div className={styles.tags}>
            {mock.basicTags.map((t) => (
              <span key={t} className={styles.tag}>
                {t}
              </span>
            ))}
          </div>
          <div className={styles.statsRow}>
            <div className={styles.statBox}>
              <span className={styles.statNum}>{mock.points}</span>
              <span className={styles.statLbl}>Pontos</span>
            </div>
            <div className={styles.statBox}>
              <span className={styles.statNum}>{mock.adventures}</span>
              <span className={styles.statLbl}>Aventuras</span>
            </div>
          </div>
          <Link href={basicoHref} className={styles.cta}>
            <FiPlay className={styles.ctaIcon} aria-hidden />
            Continuar Aventura
          </Link>
        </div>
      </article>

      {/* Intermediário — bloqueado */}
      <article className={styles.cardLocked} style={{ opacity: 0.55 }}>
        <div className={`${styles.cardHero} ${styles.cardHeroMuted}`}>
          <div className={styles.cardHeroTop}>
            <span className={styles.phaseIcon} aria-hidden>
              <FiMoon className={styles.phaseIconInner} />
            </span>
          </div>
          <h2 className={styles.cardTitle}>Nível Intermediário</h2>
          <p className={styles.cardDesc}>{mock.intermediateDescription}</p>
        </div>
        <div className={styles.cardBody}>
          <div className={styles.lockArea}>
            <FiLock className={styles.lockIcon} aria-hidden />
          </div>
          <button type="button" className={styles.ctaGhost} disabled>
            Começar Aventura
          </button>
        </div>
        <p className={styles.unlockHint}>Complete todos os cursos básicos para desbloquear</p>
      </article>

      {/* Avançado — bloqueado */}
      <article className={styles.cardLocked} style={{ opacity: 0.42 }}>
        <div className={`${styles.cardHero} ${styles.cardHeroMutedLight}`}>
          <div className={styles.cardHeroTop}>
            <span className={styles.phaseIcon} aria-hidden>
              <FiSun className={styles.phaseIconInner} />
            </span>
          </div>
          <h2 className={styles.cardTitle}>Nível Avançado</h2>
          <p className={styles.cardDesc}>{mock.advancedDescription}</p>
        </div>
        <div className={styles.cardBody}>
          <div className={styles.lockArea}>
            <FiLock className={styles.lockIcon} aria-hidden />
          </div>
          <button type="button" className={styles.ctaGhost} disabled>
            Começar Aventura
          </button>
        </div>
        <p className={styles.unlockHint}>Complete os níveis Básico e Intermediário</p>
      </article>
    </section>
  )
}
