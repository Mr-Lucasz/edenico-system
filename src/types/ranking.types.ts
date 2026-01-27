export type RankLevel = 'bronze' | 'silver' | 'gold' | 'diamond'

export interface RankBadge {
  level: RankLevel
  label: string
  minPoints: number
  maxPoints: number
}

export interface RankingStudent {
  id: string
  name: string
  age: number
  location: string
  points: number
  position: number
  avatar?: string
}

export interface UserRanking {
  user: {
    id: string
    name: string
    points: number
    currentLevel: RankLevel
    nextLevel: RankLevel
    progressToNextLevel: number
    pointsToNextLevel: number
  }
  topStudents: RankingStudent[]
}
