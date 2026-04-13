'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { startNavigationProgress } from '@src/lib/navigationProgress'
import { FiCalendar } from 'react-icons/fi'
import { EventService } from '@src/domain/services/EventService'
import { EventRepository } from '@src/infrastructure/repositories/EventRepository'
import { EventCard } from './EventCard'
import type { Event } from '@src/types/event.types'

export function Events() {
  const router = useRouter()
  const [events, setEvents] = useState<Event[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const loadEvents = async () => {
      setIsLoading(true)
      const repository = new EventRepository()
      const service = new EventService(repository)
      const upcomingEvents = await service.getUpcomingEvents(4)
      setEvents(upcomingEvents)
      setIsLoading(false)
    }

    loadEvents()
  }, [])

  return (
    <div
      style={{
        borderRadius: '12.75px',
        overflow: 'hidden',
        boxShadow: `
          0px 1px 2px rgba(0, 0, 0, 0.1),
          0px 1px 3px rgba(0, 0, 0, 0.1),
          0px 0px 0px 1px rgba(0, 0, 0, 0.05)
        `,
      }}
    >
      {/* Header - Azul com gradiente */}
      <div
        style={{
          background: `linear-gradient(to bottom, 
            rgba(25, 118, 210, 0.05) 0%, 
            rgba(66, 165, 245, 0.05) 50%, 
            rgba(243, 232, 255, 0.3) 100%
          )`,
          padding: '34px 21px',
          minHeight: '113px',
          position: 'relative',
        }}
      >
        {/* Gradiente overlay adicional */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'linear-gradient(to right, rgba(25, 118, 210, 0.02), transparent)',
            pointerEvents: 'none',
          }}
        />
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', position: 'relative', zIndex: 1 }}>
          {/* Icon Circle */}
          <div
            style={{
              width: '31.5px',
              height: '31.5px',
              borderRadius: '12.75px',
              backgroundColor: 'rgb(0, 191, 255)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
              boxShadow: `
                0px 4px 6px rgba(0, 0, 0, 0.1),
                0px 10px 15px rgba(0, 0, 0, 0.1)
              `,
            }}
          >
            <FiCalendar style={{ width: '17.5px', height: '17.5px', color: 'rgb(255, 255, 255)' }} />
          </div>

          {/* Title Section */}
          <div>
            <h2
              style={{
                fontSize: '20px',
                fontWeight: 700,
                color: 'rgb(255, 255, 255)',
                margin: 0,
                marginBottom: '4px',
                lineHeight: '23.2px',
              }}
            >
              Eventos
            </h2>
            <p
              style={{
                fontSize: '14px',
                fontWeight: 400,
                color: 'rgb(255, 255, 255)',
                margin: 0,
                lineHeight: '18px',
              }}
            >
              Inscreve-se e participe
            </p>
          </div>
        </div>
      </div>

      {/* Events List - Fundo Branco */}
      <div
        style={{
          backgroundColor: 'rgb(255, 255, 255)',
          padding: '0',
        }}
      >
        {isLoading ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                style={{
                  width: '100%',
                  maxWidth: '379px',
                  height: '152px',
                  borderRadius: '12.75px',
                  backgroundColor: 'rgb(229, 231, 235)',
                  animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
                }}
              />
            ))}
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {events.map((event) => (
              <EventCard
                key={event.id}
                event={event}
                onEnroll={() => {
                  startNavigationProgress()
                  router.push(`/eventos/${event.id}?demo=inscricao`)
                }}
                onDetails={() => {
                  startNavigationProgress()
                  router.push(`/eventos/${event.id}`)
                }}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
