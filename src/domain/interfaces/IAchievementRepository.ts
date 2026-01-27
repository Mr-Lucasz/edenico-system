import type { Achievement } from '@src/types/achievement.types'

export interface IAchievementRepository {
  findAll(): Promise<Achievement[]>
  findById(id: string): Promise<Achievement | null>
  findRecent(limit?: number): Promise<Achievement[]>
}
