'use client'

import { useState, useEffect } from 'react'
import { FiBook } from 'react-icons/fi'
import { CourseService } from '@src/domain/services/CourseService'
import { CourseRepository } from '@src/infrastructure/repositories/CourseRepository'
import { AdventureCard } from './AdventureCard'
import type { Course } from '@src/types/course.types'

export function RecentAdventures() {
  const [courses, setCourses] = useState<Course[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const loadCourses = async () => {
      setIsLoading(true)
      const repository = new CourseRepository()
      const service = new CourseService(repository)
      const inProgressCourses = await service.getInProgressCourses()
      setCourses(inProgressCourses)
      setIsLoading(false)
    }

    loadCourses()
  }, [])

  return (
    <div
      style={{
        borderRadius: '12px',
        border: '1px solid rgb(190, 219, 255)',
        backgroundColor: 'rgb(255, 255, 255)',
        padding: '24px',
        boxShadow: '0px 1px 3px rgba(0, 0, 0, 0.1)',
      }}
    >
      {/* Header */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr auto 1fr',
          alignItems: 'center',
          gap: '12px',
          marginBottom: '20px',
        }}
      >
        {/* Left - Title */}
        <h2
          style={{
            fontSize: '20px',
            fontWeight: 700,
            color: 'rgb(31, 41, 55)',
            margin: 0,
            justifySelf: 'flex-start',
          }}
        >
          Aventuras Recentes
        </h2>

        {/* Center - Course Count */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            color: 'rgb(113, 113, 130)',
            fontSize: '14px',
            justifySelf: 'center',
          }}
        >
          <FiBook style={{ width: '16px', height: '16px' }} />
          <span>26 cursos disponíveis</span>
        </div>

        {/* Right - Ver Todos Button */}
        <button
          onClick={() => (window.location.href = '/cursos')}
          style={{
            padding: '8px 16px',
            borderRadius: '8px',
            backgroundColor: 'rgb(21, 93, 251)',
            border: 'none',
            cursor: 'pointer',
            color: 'rgb(255, 255, 255)',
            fontSize: '14px',
            fontWeight: 500,
            justifySelf: 'flex-end',
          }}
        >
          Ver Todos
        </button>
      </div>

      {/* Adventure Cards */}
      {isLoading ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              style={{
                height: '160px',
                borderRadius: '12px',
                backgroundColor: 'rgb(229, 231, 235)',
                animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
              }}
            />
          ))}
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {courses.map((course) => (
            <AdventureCard key={course.id} course={course} />
          ))}
        </div>
      )}
    </div>
  )
}
