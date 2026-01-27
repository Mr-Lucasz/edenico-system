import { useState, useEffect } from 'react'
import { EventService } from '@src/domain/services/EventService'
import { EventRepository } from '@src/infrastructure/repositories/EventRepository'
import type { Event } from '@src/types/event.types'

export function useEvents(limit?: number) {
  const [events, setEvents] = useState<Event[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    const loadEvents = async () => {
      try {
        setIsLoading(true)
        const repository = new EventRepository()
        const service = new EventService(repository)
        const upcomingEvents = await service.getUpcomingEvents(limit)
        setEvents(upcomingEvents)
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Erro ao carregar eventos'))
      } finally {
        setIsLoading(false)
      }
    }

    loadEvents()
  }, [limit])

  return { events, isLoading, error }
}
