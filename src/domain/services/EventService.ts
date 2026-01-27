import type { IEventRepository } from '../interfaces/IEventRepository'
import type { Event } from '@src/types/event.types'

/**
 * Service para operações de domínio relacionadas a eventos
 */
export class EventService {
  constructor(private readonly repository: IEventRepository) {}

  async getAllEvents(): Promise<Event[]> {
    return this.repository.findAll()
  }

  async getEventById(id: string): Promise<Event | null> {
    return this.repository.findById(id)
  }

  async getUpcomingEvents(limit: number = 5): Promise<Event[]> {
    return this.repository.findUpcoming(limit)
  }

  isEventFull(event: Event): boolean {
    return event.enrolled >= event.maxEnrolled
  }

  getAvailableSlots(event: Event): number {
    return Math.max(0, event.maxEnrolled - event.enrolled)
  }
}
