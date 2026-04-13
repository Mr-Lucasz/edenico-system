import type { ICourseRepository } from '../interfaces/ICourseRepository'
import type { Course, CourseCategory, CourseLevel } from '@src/types/course.types'

/**
 * Service para operações de domínio relacionadas a cursos
 * Segue o princípio de Dependency Inversion (DIP)
 */
export class CourseService {
  constructor(private readonly repository: ICourseRepository) {}

  async getAllCourses(): Promise<Course[]> {
    return this.repository.findAll()
  }

  async getCourseById(id: string): Promise<Course | null> {
    return this.repository.findById(id)
  }

  async getCoursesByCategory(category: CourseCategory): Promise<Course[]> {
    return this.repository.findByCategory(category)
  }

  async getCoursesByCategoryAndLevel(category: CourseCategory | null, level: CourseLevel): Promise<Course[]> {
    return this.repository.findByCategoryAndLevel(category, level)
  }

  async getInProgressCourses(): Promise<Course[]> {
    const allCourses = await this.repository.findAll()
    return allCourses.filter((course) => course.progress > 0 && course.progress < 100)
  }

  async getCompletedCourses(): Promise<Course[]> {
    const allCourses = await this.repository.findAll()
    return allCourses.filter((course) => course.progress === 100)
  }
}
