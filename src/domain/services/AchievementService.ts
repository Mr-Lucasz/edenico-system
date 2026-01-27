import type { IAchievementRepository } from '../interfaces/IAchievementRepository'
import type { Achievement } from '@src/types/achievement.types'

/**
 * Service para operações de domínio relacionadas a conquistas
 */
export class AchievementService {
  constructor(private readonly repository: IAchievementRepository) {}

  async getAllAchievements(): Promise<Achievement[]> {
    return this.repository.findAll()
  }

  async getAchievementById(id: string): Promise<Achievement | null> {
    return this.repository.findById(id)
  }

  async getRecentAchievements(limit: number = 5): Promise<Achievement[]> {
    return this.repository.findRecent(limit)
  }

  calculateTotalXP(achievements: Achievement[]): number {
    return achievements.reduce((total, achievement) => total + achievement.xp, 0)
  }
}
