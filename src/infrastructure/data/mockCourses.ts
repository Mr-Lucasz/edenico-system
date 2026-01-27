import type { Course } from '@src/types/course.types'

export const mockCourses: Course[] = [
  {
    id: '1',
    title: 'Aventuras no Mundo dos Animais',
    category: 'sciences',
    totalUnits: 6,
    completedUnits: 4,
    progress: 75,
    lastAccessed: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 horas atrás
  },
  {
    id: '2',
    title: 'Programação para Iniciantes',
    category: 'technology',
    totalUnits: 8,
    completedUnits: 3,
    progress: 37,
    lastAccessed: new Date(Date.now() - 5 * 60 * 60 * 1000), // 5 horas atrás
  },
  {
    id: '3',
    title: 'Arte e Criatividade',
    category: 'arts',
    totalUnits: 5,
    completedUnits: 5,
    progress: 100,
    lastAccessed: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // 1 dia atrás
  },
  {
    id: '4',
    title: 'Explorando o Sistema Solar',
    category: 'sciences',
    totalUnits: 7,
    completedUnits: 2,
    progress: 28,
    lastAccessed: new Date(Date.now() - 3 * 60 * 60 * 1000), // 3 horas atrás
  },
  {
    id: '5',
    title: 'Robótica Divertida',
    category: 'technology',
    totalUnits: 6,
    completedUnits: 6,
    progress: 100,
    lastAccessed: new Date(Date.now() - 12 * 60 * 60 * 1000), // 12 horas atrás
  },
]
