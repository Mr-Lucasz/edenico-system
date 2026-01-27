import type { IRankingRepository } from '@src/domain/interfaces/IRankingRepository'
import type { UserRanking, RankingStudent } from '@src/types/ranking.types'
import { mockUserRanking, mockTopStudents } from '../data/mockRanking'

/**
 * Implementação concreta do repositório de ranking
 */
export class RankingRepository implements IRankingRepository {
  async getUserRanking(userId: string): Promise<UserRanking> {
    await new Promise((resolve) => setTimeout(resolve, 100))
    // Por enquanto retorna o mock, mas poderia buscar por userId
    return { ...mockUserRanking }
  }

  async getTopStudents(limit: number = 5): Promise<RankingStudent[]> {
    await new Promise((resolve) => setTimeout(resolve, 50))
    return mockTopStudents.slice(0, limit)
  }
}
