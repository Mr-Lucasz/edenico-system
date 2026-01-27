import { ProgressBar } from '@src/components/ui'
import type { UserRanking } from '@src/types/ranking.types'

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
    <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
      <div className="mb-3">
        <h3 className="mb-1 text-lg font-bold text-gray-900">{userRanking.name}</h3>
        <p className="text-2xl font-bold text-gray-900">{userRanking.points.toLocaleString('pt-BR')} pontos</p>
      </div>
      <div className="mb-3">
        <p className="mb-1 text-sm text-gray-600">
          Progresso nível {levelLabels[userRanking.currentLevel]}
        </p>
        <ProgressBar value={userRanking.progressToNextLevel} color="green" />
      </div>
      <p className="text-sm text-gray-600">
        {userRanking.pointsToNextLevel} pts para próximo nível
      </p>
    </div>
  )
}
