import { ProgressBar } from '@src/components/ui'
import type { UserRanking } from '@src/types/ranking.types'
import styles from './UserRankCard.module.scss'

export interface UserRankCardProps {
  userRanking: UserRanking['user']
}

export function UserRankCard({ userRanking }: UserRankCardProps) {
  const levelLabels = {
    bronze: 'Bronze',
    silver: 'Prata',
    gold: 'Ouro',
    diamond: 'Diamante',
  }

  return (
    <div className={styles.card}>
      <div className={styles.block}>
        <h3 className={styles.name}>{userRanking.name}</h3>
        <p className={styles.points}>{userRanking.points.toLocaleString('pt-BR')} pontos</p>
      </div>
      <div className={styles.block}>
        <p className={styles.label}>
          Progresso nível {levelLabels[userRanking.currentLevel]}
        </p>
        <ProgressBar value={userRanking.progressToNextLevel} color="green" />
      </div>
      <p className={styles.footer}>{userRanking.pointsToNextLevel} pts para próximo nível</p>
    </div>
  )
}
