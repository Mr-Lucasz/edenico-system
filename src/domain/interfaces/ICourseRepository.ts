import type { Course } from '@src/types/course.types'

export interface ICourseRepository {
  findAll(): Promise<Course[]>
  findById(id: string): Promise<Course | null>
  findByCategory(category: Course['category']): Promise<Course[]>
}
