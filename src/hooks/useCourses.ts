import { useState, useEffect } from 'react'
import { CourseService } from '@src/domain/services/CourseService'
import { CourseRepository } from '@src/infrastructure/repositories/CourseRepository'
import type { Course } from '@src/types/course.types'

export function useCourses() {
  const [courses, setCourses] = useState<Course[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    const loadCourses = async () => {
      try {
        setIsLoading(true)
        const repository = new CourseRepository()
        const service = new CourseService(repository)
        const allCourses = await service.getAllCourses()
        setCourses(allCourses)
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Erro ao carregar cursos'))
      } finally {
        setIsLoading(false)
      }
    }

    loadCourses()
  }, [])

  return { courses, isLoading, error }
}
