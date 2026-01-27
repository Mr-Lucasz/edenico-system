import type { IAchievementRepository } from '@src/domain/interfaces/IAchievementRepository'
import type { Achievement } from '@src/types/achievement.types'
import { mockAchievements } from '../data/mockAchievements'

/**
 * Implementação concreta do repositório de conquistas
 */
export class AchievementRepository implements IAchievementRepository {
  async findAll(): Promise<Achievement[]> {
    await new Promise((resolve) => setTimeout(resolve, 100))
    return [...mockAchievements]
  }

  async findById(id: string): Promise<Achievement | null> {
    await new Promise((resolve) => setTimeout(resolve, 50))
    return mockAchievements.find((achievement) => achievement.id === id) || null
  }

  async findRecent(limit: number = 5): Promise<Achievement[]> {
    await new Promise((resolve) => setTimeout(resolve, 50))
    return mockAchievements.slice(0, limit)
  }
}
