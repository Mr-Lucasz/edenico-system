export type CourseCategory = 'sciences' | 'technology' | 'arts' | 'relations' | 'service'

export type CourseLevel = 'basic' | 'intermediate' | 'advanced'

export interface Course {
  id: string
  title: string
  description?: string
  category: CourseCategory
  level: CourseLevel
  totalUnits: number
  completedUnits: number
  progress: number
  lastAccessed: Date | string
  imageUrl?: string
  /** Duração estimada em minutos (ex.: 150 = 2h 30min) */
  durationMinutes?: number
  enrolledCount?: number
}
