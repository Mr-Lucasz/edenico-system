export type CourseCategory = 'sciences' | 'technology' | 'arts'

export interface Course {
  id: string
  title: string
  category: CourseCategory
  totalUnits: number
  completedUnits: number
  progress: number
  lastAccessed: Date | string
  imageUrl?: string
}
