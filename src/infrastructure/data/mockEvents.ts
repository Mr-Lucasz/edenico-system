import type { Event } from '@src/types/event.types'

// Criando datas futuras para os eventos
const eventDate1 = new Date()
eventDate1.setMonth(11) // Dezembro
eventDate1.setDate(15)
eventDate1.setFullYear(2025)

const eventDate2 = new Date()
eventDate2.setMonth(11) // Dezembro
eventDate2.setDate(20)
eventDate2.setFullYear(2025)

export const mockEvents: Event[] = [
  {
    id: '1',
    title: 'Show de Talentos Virtual da Academia',
    date: eventDate1,
    time: '15:00',
    category: 'workshop',
    type: 'arts',
    organizer: 'Prof. Ana Silva',
    enrolled: 70,
    maxEnrolled: 150,
    description: 'Um evento especial para mostrar os talentos dos alunos',
  },
  {
    id: '2',
    title: 'Hackathon de Programação',
    date: eventDate2,
    time: '10:00',
    category: 'hackathon',
    type: 'technology',
    organizer: 'Prof. Carlos Mendes',
    enrolled: 45,
    maxEnrolled: 100,
    description: 'Desafio de programação para estudantes',
  },
]
