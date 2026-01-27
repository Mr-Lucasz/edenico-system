import type { IEventRepository } from '@src/domain/interfaces/IEventRepository'
import type { Event } from '@src/types/event.types'
import { mockEvents } from '../data/mockEvents'

/**
 * Implementação concreta do repositório de eventos
 */
export class EventRepository implements IEventRepository {
  async findAll(): Promise<Event[]> {
    await new Promise((resolve) => setTimeout(resolve, 100))
    return [...mockEvents]
  }

  async findById(id: string): Promise<Event | null> {
    await new Promise((resolve) => setTimeout(resolve, 50))
    return mockEvents.find((event) => event.id === id) || null
  }

  async findUpcoming(limit: number = 5): Promise<Event[]> {
    await new Promise((resolve) => setTimeout(resolve, 50))
    const now = new Date()
    const upcoming = mockEvents
      .filter((event) => {
        const eventDate = typeof event.date === 'string' ? new Date(event.date) : event.date
        return eventDate >= now
      })
      .sort((a, b) => {
        const dateA = typeof a.date === 'string' ? new Date(a.date) : a.date
        const dateB = typeof b.date === 'string' ? new Date(b.date) : b.date
        return dateA.getTime() - dateB.getTime()
      })
    return upcoming.slice(0, limit)
  }
}
