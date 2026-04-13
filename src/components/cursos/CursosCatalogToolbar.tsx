import Link from 'next/link'
import { FiArrowLeft } from 'react-icons/fi'
import type { CourseCategory } from '@src/types/course.types'
import { CATEGORY_QUERY_KEY } from './cursosConstants'
import styles from './CursosCatalogToolbar.module.scss'

interface CursosCatalogToolbarProps {
  levelLabel: string
  category: CourseCategory
}

export function CursosCatalogToolbar({ levelLabel, category }: CursosCatalogToolbarProps) {
  const backHref = `/cursos?${CATEGORY_QUERY_KEY}=${category}`

  return (
    <div className={styles.bar}>
      <Link href={backHref} className={styles.back}>
        <FiArrowLeft className={styles.backIcon} aria-hidden />
        Voltar aos Níveis
      </Link>
      <span className={styles.badge}>{levelLabel}</span>
    </div>
  )
}
