import type { Achievement } from '@src/types/achievement.types'

export const mockAchievements: Achievement[] = [
  {
    id: '1',
    name: 'Explorador da Natureza',
    description: 'Descobriu 5 fatos incríveis sobre aves.',
    icon: 'compass',
    xp: 100,
    isNew: true,
  },
  {
    id: '2',
    name: 'Mestre da Tecnologia',
    description: 'Completou 3 projetos de programação.',
    icon: 'gear',
    xp: 150,
    isNew: true,
  },
  {
    id: '3',
    name: 'Artista Criativo',
    description: 'Criou 10 obras de arte originais.',
    icon: 'palette',
    xp: 120,
    isNew: false,
  },
]
