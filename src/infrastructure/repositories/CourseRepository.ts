import type { ICourseRepository } from '@src/domain/interfaces/ICourseRepository'
import type { Course } from '@src/types/course.types'
import { mockCourses } from '../data/mockCourses'

/**
 * Implementação concreta do repositório de cursos
 * Usa dados mock por enquanto
 */
export class CourseRepository implements ICourseRepository {
  async findAll(): Promise<Course[]> {
    // Simula delay de API
    await new Promise((resolve) => setTimeout(resolve, 100))
    return [...mockCourses]
  }

  async findById(id: string): Promise<Course | null> {
    await new Promise((resolve) => setTimeout(resolve, 50))
    return mockCourses.find((course) => course.id === id) || null
  }

  async findByCategory(category: Course['category']): Promise<Course[]> {
    await new Promise((resolve) => setTimeout(resolve, 50))
    return mockCourses.filter((course) => course.category === category)
  }
}
