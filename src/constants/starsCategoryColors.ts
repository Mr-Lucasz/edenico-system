import { starsCategories } from '@src/data/starsContent'
import type { StarsCategoryId } from '@src/data/starsContent'
import type { CourseCategory } from '@src/types/course.types'

const courseCategoryToStarsId: Record<CourseCategory, StarsCategoryId> = {
  sciences: 'science',
  technology: 'technology',
  arts: 'arts',
  relations: 'relationship',
  service: 'service',
}

const FALLBACK_ACTIVE = '#A05A32'

/**
 * Cor da peça STARS no quebra-cabeça principal (`starsContent.colorHex`), alinhada à categoria de curso.
 */
export function getActiveColorForCourseCategory(category: CourseCategory): string {
  const starsId = courseCategoryToStarsId[category]
  const entry = starsCategories.find((c) => c.id === starsId)
  return entry?.colorHex ?? FALLBACK_ACTIVE
}
