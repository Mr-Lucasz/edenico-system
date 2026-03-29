import { Avatar } from '@src/components/ui'
import type { RankingStudent } from '@src/types/ranking.types'
import styles from './TopStudentsList.module.scss'

export interface TopStudentsListProps {
  students: RankingStudent[]
  currentUserId?: string
}

export function TopStudentsList({ students, currentUserId }: TopStudentsListProps) {
  return (
    <div className={styles.root}>
      <h3 className={styles.title}>Top 5 Estudantes</h3>
      {students.map((student) => {
        const isCurrentUser = student.id === currentUserId
        return (
          <div
            key={student.id}
            className={isCurrentUser ? styles.rowHighlight : styles.row}
          >
            <div className={styles.rank}>#{student.position}</div>
            <Avatar name={student.name} size="sm" />
            <div className={styles.body}>
              <p className={styles.name}>
                {student.name} ({student.age} anos)
              </p>
              <p className={styles.meta}>{student.location}</p>
            </div>
            <div className={styles.points}>
              {student.points.toLocaleString('pt-BR')} pontos
            </div>
          </div>
        )
      })}
    </div>
  )
}
