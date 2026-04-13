import type { Course, CourseCategory, CourseLevel } from '@src/types/course.types'

export interface ICourseRepository {
  findAll(): Promise<Course[]>
  findById(id: string): Promise<Course | null>
  findByCategory(category: Course['category']): Promise<Course[]>
  findByCategoryAndLevel(category: CourseCategory | null, level: CourseLevel): Promise<Course[]>
}
