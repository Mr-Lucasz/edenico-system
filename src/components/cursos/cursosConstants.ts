import type { CourseCategory } from '@src/types/course.types'

export const STARS_TABS: readonly { id: CourseCategory; letter: string; label: string }[] = [
  { id: 'sciences', letter: 'S', label: 'Science' },
  { id: 'technology', letter: 'T', label: 'Technology' },
  { id: 'arts', letter: 'A', label: 'Arts' },
  { id: 'relations', letter: 'R', label: 'Relations' },
  { id: 'service', letter: 'S', label: 'Service' },
] as const

export const CATEGORY_QUERY_KEY = 'categoria'

export function isCourseCategory(value: string | null): value is CourseCategory {
  return (
    value === 'sciences' ||
    value === 'technology' ||
    value === 'arts' ||
    value === 'relations' ||
    value === 'service'
  )
}
