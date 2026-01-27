import type { Event } from '@src/types/event.types'

export interface IEventRepository {
  findAll(): Promise<Event[]>
  findById(id: string): Promise<Event | null>
  findUpcoming(limit?: number): Promise<Event[]>
}
