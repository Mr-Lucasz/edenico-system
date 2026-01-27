import { Avatar } from '@src/components/ui'
import type { RankingStudent } from '@src/types/ranking.types'

export interface TopStudentsListProps {
  students: RankingStudent[]
  currentUserId?: string
}

export function TopStudentsList({ students, currentUserId }: TopStudentsListProps) {
  return (
    <div className="space-y-3">
      <h3 className="text-lg font-bold text-gray-900">Top 5 Estudantes</h3>
      {students.map((student) => {
        const isCurrentUser = student.id === currentUserId
        return (
          <div
            key={student.id}
            className={`flex items-center gap-3 rounded-lg border p-3 ${
              isCurrentUser ? 'border-blue-500 bg-blue-50' : 'border-gray-200 bg-white'
            }`}
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 font-bold text-gray-700">
              #{student.position}
            </div>
            <Avatar name={student.name} size="sm" />
            <div className="flex-1">
              <p className="font-semibold text-gray-900">
                {student.name} ({student.age} anos)
              </p>
              <p className="text-sm text-gray-600">{student.location}</p>
            </div>
            <div className="text-right">
              <p className="font-semibold text-gray-900">
                {student.points.toLocaleString('pt-BR')} pontos
              </p>
            </div>
          </div>
        )
      })}
    </div>
  )
}
