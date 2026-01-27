import type { UserRanking, RankingStudent } from '@src/types/ranking.types'

export const mockTopStudents: RankingStudent[] = [
  {
    id: '1',
    name: 'Miguel',
    age: 14,
    location: 'São Paulo SP',
    points: 9850,
    position: 1,
  },
  {
    id: '2',
    name: 'Ana',
    age: 13,
    location: 'Rio de Janeiro RJ',
    points: 9200,
    position: 2,
  },
  {
    id: '3',
    name: 'Lucas',
    age: 15,
    location: 'Belo Horizonte MG',
    points: 8750,
    position: 3,
  },
  {
    id: '4',
    name: 'Sofia',
    age: 12,
    location: 'Curitiba PR',
    points: 4850,
    position: 4,
  },
  {
    id: '5',
    name: 'Isabella',
    age: 14,
    location: 'Porto Alegre RS',
    points: 4200,
    position: 5,
  },
]

export const mockUserRanking: UserRanking = {
  user: {
    id: '4',
    name: 'Sofia',
    points: 4850,
    currentLevel: 'silver',
    nextLevel: 'gold',
    progressToNextLevel: 85,
    pointsToNextLevel: 150,
  },
  topStudents: mockTopStudents,
}
