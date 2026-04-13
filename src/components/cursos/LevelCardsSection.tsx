'use client'

import Link from 'next/link'
import { FiStar, FiAward, FiLock, FiMoon, FiSun, FiPlay } from 'react-icons/fi'
import type { CourseCategory } from '@src/types/course.types'
import { CATEGORY_QUERY_KEY } from './cursosConstants'
import styles from './LevelCardsSection.module.scss'

interface LevelCardsSectionProps {
  category: CourseCategory
}

export function LevelCardsSection({ category }: LevelCardsSectionProps) {
  const query = `?${CATEGORY_QUERY_KEY}=${category}`
  const basicoHref = `/cursos/nivel/basico${query}`

  return (
    <section className={styles.grid} aria-label="Níveis de aprendizado">
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
          <p className={styles.cardDesc}>
            Fundamentos divertidos para começar a jornada com confiança e curiosidade.
          </p>
        </div>
        <div className={styles.cardBody}>
          <div className={styles.progressHead}>
            <span className={styles.progressLabel}>Progresso da Aventura</span>
            <span className={styles.progressPill}>65%</span>
          </div>
          <div className={styles.progressTrack}>
            <div className={styles.progressFill} style={{ width: '65%' }} />
          </div>
          <div className={styles.tags}>
            <span className={styles.tag}>Planetas</span>
            <span className={styles.tag}>Estrelas</span>
            <span className={styles.tag}>Foguetes</span>
          </div>
          <div className={styles.statsRow}>
            <div className={styles.statBox}>
              <span className={styles.statNum}>520</span>
              <span className={styles.statLbl}>Pontos</span>
            </div>
            <div className={styles.statBox}>
              <span className={styles.statNum}>6</span>
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
          <p className={styles.cardDesc}>Desafios para quem já dominou o básico.</p>
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
          <p className={styles.cardDesc}>Projetos complexos para pequenos especialistas.</p>
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
