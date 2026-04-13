'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { FiPlay, FiClock, FiUsers, FiEye } from 'react-icons/fi'
import type { Course } from '@src/types/course.types'
import { formatDurationLabel } from '@src/utils'
import { startNavigationProgress } from '@src/lib/navigationProgress'
import styles from './CatalogCourseCard.module.scss'

const DOT: Record<Course['category'], string> = {
  sciences: '#965a3e',
  technology: '#0070f3',
  arts: '#ea580c',
  relations: '#3b82f6',
  service: '#00a86b',
}

interface CatalogCourseCardProps {
  course: Course
}

export function CatalogCourseCard({ course }: CatalogCourseCardProps) {
  const router = useRouter()
  const pct = Math.round(course.progress)
  const isNew = course.progress <= 0
  const duration =
    course.durationMinutes != null ? formatDurationLabel(course.durationMinutes) : '—'
  const enrolled = course.enrolledCount ?? 0

  return (
    <article className={styles.card}>
      <div className={styles.top}>
        <span className={styles.dot} style={{ backgroundColor: DOT[course.category] }} aria-hidden />
        <h3 className={styles.title}>{course.title}</h3>
      </div>
      {course.description ? <p className={styles.desc}>{course.description}</p> : null}

      <div className={styles.progressBlock}>
        <div className={styles.progressLabels}>
          <span className={styles.progressLbl}>Progresso</span>
          <span className={styles.progressPct}>{pct}%</span>
        </div>
        <div className={styles.track}>
          <div className={styles.fill} style={{ width: `${pct}%` }} />
        </div>
      </div>

      <div className={styles.meta}>
        <span className={styles.metaItem}>
          <FiClock className={styles.metaIcon} aria-hidden />
          {duration}
        </span>
        <span className={styles.metaItem}>
          <FiUsers className={styles.metaIcon} aria-hidden />
          {enrolled.toLocaleString('pt-BR')}
        </span>
      </div>

      <div className={styles.actions}>
        <button
          type="button"
          className={isNew ? styles.btnStart : styles.btnContinue}
          onClick={() => {
            startNavigationProgress()
            router.push(`/cursos/${course.id}`)
          }}
        >
          <FiPlay className={styles.btnIcon} aria-hidden />
          {isNew ? 'Começar' : 'Continuar'}
        </button>
        <Link href={`/cursos/${course.id}`} className={styles.btnGhost}>
          <FiEye className={styles.btnIcon} aria-hidden />
          Conteúdo
        </Link>
      </div>
    </article>
  )
}
