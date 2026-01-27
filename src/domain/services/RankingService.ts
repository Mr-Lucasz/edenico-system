import type { IRankingRepository } from '../interfaces/IRankingRepository'
import type { UserRanking, RankLevel } from '@src/types/ranking.types'

/**
 * Service para operações de domínio relacionadas a ranking
 */
export class RankingService {
  constructor(private readonly repository: IRankingRepository) {}

  async getUserRanking(userId: string): Promise<UserRanking> {
    return this.repository.getUserRanking(userId)
  }

  async getTopStudents(limit: number = 5): Promise<UserRanking['topStudents']> {
    return this.repository.getTopStudents(limit)
  }

  calculateLevelFromPoints(points: number): RankLevel {
    if (points >= 4000) return 'diamond'
    if (points >= 2000) return 'gold'
    if (points >= 1000) return 'silver'
    return 'bronze'
  }

  getNextLevelPoints(currentLevel: RankLevel): number {
    const levelPoints: Record<RankLevel, number> = {
      bronze: 1000,
      silver: 2000,
      gold: 4000,
      diamond: 8000,
    }
    return levelPoints[currentLevel] || 0
  }
}
