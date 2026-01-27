import type { UserRanking, RankingStudent } from '@src/types/ranking.types'

export interface IRankingRepository {
  getUserRanking(userId: string): Promise<UserRanking>
  getTopStudents(limit?: number): Promise<RankingStudent[]>
}
