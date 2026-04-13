import { FiPlay } from 'react-icons/fi'
import { formatProgressText, formatTimeAgo } from '@src/utils'
import type { Course } from '@src/types/course.types'

export interface AdventureCardProps {
  course: Course
  onContinue?: () => void
}

export function AdventureCard({ course, onContinue }: AdventureCardProps) {
  const categoryColors: Record<Course['category'], string> = {
    sciences: 'rgb(234, 88, 12)',
    technology: 'rgb(168, 85, 247)',
    arts: 'rgb(234, 88, 12)',
    relations: 'rgb(59, 130, 246)',
    service: 'rgb(16, 185, 129)',
  }

  const categoryLabels: Record<Course['category'], string> = {
    sciences: 'CIÊNCIAS',
    technology: 'TECNOLOGIA',
    arts: 'ARTES',
    relations: 'RELAÇÕES',
    service: 'SERVIÇO',
  }

  const progressPercentage = Math.round(course.progress)

  return (
    <div
      style={{
        borderRadius: '12px',
        border: '1px solid rgb(229, 231, 235)',
        backgroundColor: 'rgb(255, 255, 255)',
        padding: '20px',
        boxShadow: '0px 1px 2px rgba(0, 0, 0, 0.05)',
      }}
    >
      {/* Top Section - Category, Title, Play Icon */}
      <div
        style={{
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          marginBottom: '12px',
        }}
      >
        <div style={{ flex: 1 }}>
          {/* Category */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              marginBottom: '8px',
            }}
          >
            <div
              style={{
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                backgroundColor: categoryColors[course.category],
              }}
            />
            <span
              style={{
                fontSize: '12px',
                fontWeight: 600,
                color: 'rgb(55, 65, 81)',
                textTransform: 'uppercase',
              }}
            >
              {categoryLabels[course.category]}
            </span>
          </div>

          {/* Title */}
          <h3
            style={{
              fontSize: '16px',
              fontWeight: 600,
              color: 'rgb(31, 41, 55)',
              margin: 0,
              marginBottom: '8px',
            }}
          >
            {course.title}
          </h3>

          {/* Progress Text */}
          <p
            style={{
              fontSize: '14px',
              fontWeight: 400,
              color: 'rgb(107, 114, 128)',
              margin: 0,
            }}
          >
            {course.completedUnits} de {course.totalUnits} unidades • {progressPercentage}% concluído
          </p>
        </div>

        {/* Play Icon - Top Right */}
        <FiPlay
          style={{
            width: '20px',
            height: '20px',
            color: 'rgb(59, 130, 246)',
            flexShrink: 0,
            marginLeft: '12px',
          }}
        />
      </div>

      {/* Progress Section */}
      <div style={{ marginBottom: '16px' }}>
        {/* Progress Label */}
        <p
          style={{
            fontSize: '12px',
            fontWeight: 400,
            color: 'rgb(156, 163, 175)',
            margin: 0,
            marginBottom: '6px',
          }}
        >
          Progresso
        </p>

        {/* Progress Bar */}
        <div
          style={{
            position: 'relative',
            width: '100%',
            height: '8px',
            borderRadius: '9999px',
            backgroundColor: 'rgb(229, 231, 235)',
            overflow: 'hidden',
            marginBottom: '4px',
          }}
        >
          <div
            style={{
              width: `${progressPercentage}%`,
              height: '100%',
              backgroundColor: 'rgb(59, 130, 246)',
              borderRadius: '9999px',
              transition: 'width 0.3s ease',
            }}
          />
        </div>

        {/* Percentage on Bar Right */}
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <span
            style={{
              fontSize: '12px',
              fontWeight: 400,
              color: 'rgb(156, 163, 175)',
            }}
          >
            {progressPercentage}%
          </span>
        </div>
      </div>

      {/* Bottom Section - Last Access & Continue Button */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        {/* Last Access */}
        <span
          style={{
            fontSize: '12px',
            fontWeight: 400,
            color: 'rgb(156, 163, 175)',
          }}
        >
          Último acesso: {formatTimeAgo(course.lastAccessed)}
        </span>

        {/* Continue Button */}
        <button
          onClick={onContinue}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            padding: '8px 16px',
            borderRadius: '8px',
            backgroundColor: 'rgb(37, 99, 235)',
            border: 'none',
            cursor: 'pointer',
            color: 'rgb(255, 255, 255)',
            fontSize: '14px',
            fontWeight: 500,
          }}
        >
          <FiPlay style={{ width: '14px', height: '14px', strokeWidth: 3 }} />
          <span>Continuar</span>
        </button>
      </div>
    </div>
  )
}
