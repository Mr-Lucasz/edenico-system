import { useState, useEffect } from 'react'
import { RankingService } from '@src/domain/services/RankingService'
import { RankingRepository } from '@src/infrastructure/repositories/RankingRepository'
import type { UserRanking } from '@src/types/ranking.types'

export function useRanking(userId: string) {
  const [ranking, setRanking] = useState<UserRanking | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    const loadRanking = async () => {
      try {
        setIsLoading(true)
        const repository = new RankingRepository()
        const service = new RankingService(repository)
        const userRanking = await service.getUserRanking(userId)
        setRanking(userRanking)
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Erro ao carregar ranking'))
      } finally {
        setIsLoading(false)
      }
    }

    loadRanking()
  }, [userId])

  return { ranking, isLoading, error }
}
