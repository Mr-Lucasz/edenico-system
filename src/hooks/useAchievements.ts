import { useState, useEffect } from 'react'
import { AchievementService } from '@src/domain/services/AchievementService'
import { AchievementRepository } from '@src/infrastructure/repositories/AchievementRepository'
import type { Achievement } from '@src/types/achievement.types'

export function useAchievements(limit?: number) {
  const [achievements, setAchievements] = useState<Achievement[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    const loadAchievements = async () => {
      try {
        setIsLoading(true)
        const repository = new AchievementRepository()
        const service = new AchievementService(repository)
        const recentAchievements = await service.getRecentAchievements(limit)
        setAchievements(recentAchievements)
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Erro ao carregar conquistas'))
      } finally {
        setIsLoading(false)
      }
    }

    loadAchievements()
  }, [limit])

  return { achievements, isLoading, error }
}
