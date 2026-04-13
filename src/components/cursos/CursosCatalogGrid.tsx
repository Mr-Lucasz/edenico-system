import type { Course } from '@src/types/course.types'
import { CatalogCourseCard } from './CatalogCourseCard'
import styles from './CursosCatalogGrid.module.scss'

interface CursosCatalogGridProps {
  courses: Course[]
}

export function CursosCatalogGrid({ courses }: CursosCatalogGridProps) {
  if (courses.length === 0) {
    return (
      <p className={styles.empty}>Nenhum curso nesta categoria e nível. Experimente outra aba STARS.</p>
    )
  }

  return (
    <div className={styles.grid}>
      {courses.map((course) => (
        <CatalogCourseCard key={course.id} course={course} />
      ))}
    </div>
  )
}
