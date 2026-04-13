import Link from 'next/link'
import { FiChevronLeft } from 'react-icons/fi'
import styles from './CoursePlayerHeader.module.scss'

interface CoursePlayerHeaderProps {
  title: string
  instructor: string
  globalProgress: number
  backHref?: string
}

export function CoursePlayerHeader({
  title,
  instructor,
  globalProgress,
  backHref = '/cursos',
}: CoursePlayerHeaderProps) {
  const pct = Math.min(100, Math.max(0, Math.round(globalProgress)))

  return (
    <header className={styles.wrap}>
      <div className={styles.backRow}>
        <Link href={backHref} className={styles.back}>
          <FiChevronLeft aria-hidden style={{ width: '1.1rem', height: '1.1rem' }} />
          Voltar ao catálogo
        </Link>
        <h1 className={styles.title}>{title}</h1>
        <p className={styles.instructor}>por {instructor}</p>
      </div>

      <div className={styles.progressCol}>
        <span className={styles.progressLabel}>Progresso</span>
        <div className={styles.track} role="progressbar" aria-valuenow={pct} aria-valuemin={0} aria-valuemax={100}>
          <div className={styles.fill} style={{ width: `${pct}%` }}>
            <span className={styles.pctInside}>{pct}%</span>
          </div>
        </div>
      </div>

      <div className={styles.spacer} aria-hidden />
    </header>
  )
}
