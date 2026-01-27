import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { FiClock, FiUsers } from 'react-icons/fi'
import type { Event } from '@src/types/event.types'

export interface EventCardProps {
  event: Event
  onEnroll?: () => void
  onDetails?: () => void
}

const categoryLabels: Record<Event['type'], string> = {
  arts: 'ARTES',
  technology: 'TECNOLOGIA',
  sciences: 'CIÊNCIAS',
}

const categoryColors: Record<Event['type'], { bg: string; text: string }> = {
  arts: {
    bg: 'rgb(237, 97, 20)', // Orange from Figma
    text: 'rgb(255, 255, 255)',
  },
  technology: {
    bg: 'rgb(153, 61, 237)', // Purple from Figma
    text: 'rgb(255, 255, 255)',
  },
  sciences: {
    bg: 'rgb(159, 90, 51)', // Brown from Figma
    text: 'rgb(255, 255, 255)',
  },
}

const eventTypeLabels: Record<Event['category'], string> = {
  workshop: 'Workshop',
  hackathon: 'Hackathon',
  seminar: 'Maraton',
  other: 'Outro',
}

const eventTypeColors: Record<Event['category'], { bg: string; text: string; border: string }> = {
  workshop: {
    bg: 'rgb(220, 252, 231)', // Light green
    text: 'rgb(0, 166, 124)', // Green from Figma
    border: 'rgb(0, 166, 124)', // Green border
  },
  hackathon: {
    bg: 'rgb(255, 237, 213)', // Light orange
    text: 'rgb(247, 177, 0)', // Orange from Figma
    border: 'rgb(247, 177, 0)', // Orange border
  },
  seminar: {
    bg: 'rgb(255, 250, 205)', // Pale yellow
    text: 'rgb(247, 177, 0)', // Yellow from Figma
    border: 'rgb(247, 177, 0)', // Yellow border
  },
  other: {
    bg: 'rgb(243, 244, 246)',
    text: 'rgb(107, 114, 128)',
    border: 'rgb(209, 213, 219)',
  },
}

export function EventCard({ event, onEnroll, onDetails }: EventCardProps) {
  const eventDate = typeof event.date === 'string' ? new Date(event.date) : event.date
  const day = format(eventDate, 'd', { locale: ptBR })
  const month = format(eventDate, 'MMM', { locale: ptBR }).toLowerCase()
  const isFull = event.enrolled >= event.maxEnrolled
  const categoryStyle = categoryColors[event.type]
  const eventTypeStyle = eventTypeColors[event.category]

  return (
    <div
      style={{
        width: '100%',
        maxWidth: '379px',
        height: '152px',
        borderRadius: '12.75px',
        border: '1px solid rgba(0, 0, 0, 0.1)',
        backgroundColor: 'rgb(255, 255, 255)',
        padding: '21px 17px',
        display: 'flex',
        gap: '16px',
        position: 'relative',
      }}
    >
      {/* Left Section - Date and Category */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '7px', flexShrink: 0 }}>
        {/* Date Block */}
        <div
          style={{
            width: '66px',
            height: '38px',
            borderRadius: '8px',
            backgroundColor: 'rgb(223, 239, 255)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0px',
            position: 'relative',
          }}
        >
          <span
            style={{
              fontSize: '24px',
              fontWeight: 700,
              color: 'rgb(30, 128, 225)',
              lineHeight: '24px',
              marginTop: '-2px',
            }}
          >
            {day}
          </span>
          <span
            style={{
              fontSize: '12px',
              fontWeight: 500,
              color: 'rgb(30, 128, 225)',
              lineHeight: '12px',
              textTransform: 'lowercase',
              marginTop: '-2px',
            }}
          >
            {month}.
          </span>
        </div>

        {/* Category Tag */}
        <div
          style={{
            width: '66px',
            height: '20px',
            borderRadius: '5px',
            backgroundColor: categoryStyle.bg,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '3px 0',
          }}
        >
          <span
            style={{
              fontSize: '14px',
              fontWeight: 600,
              color: categoryStyle.text,
              textTransform: 'uppercase',
              lineHeight: '14px',
            }}
          >
            {categoryLabels[event.type]}
          </span>
        </div>
      </div>

      {/* Right Section - Event Details */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0px', minWidth: 0, position: 'relative' }}>
        {/* Title */}
        <h3
          style={{
            fontSize: '16px',
            fontWeight: 700,
            color: 'rgb(10, 10, 10)',
            margin: 0,
            marginTop: '0.8px',
            marginBottom: '4.6px',
            lineHeight: '18.4px',
            maxWidth: '287px',
          }}
        >
          {event.title}
        </h3>

        {/* Organizer */}
        <p
          style={{
            fontSize: '13px',
            fontWeight: 400,
            color: 'rgb(113, 113, 130)',
            margin: 0,
            marginBottom: '13px',
            lineHeight: '18px',
          }}
        >
          por {event.organizer}
        </p>

        {/* Time and Participants */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '17px', marginBottom: '19px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <FiClock style={{ width: '13px', height: '13px', color: 'rgb(113, 113, 130)' }} />
            <span
              style={{
                fontSize: '13px',
                fontWeight: 400,
                color: 'rgb(113, 113, 130)',
                lineHeight: '18px',
              }}
            >
              {event.time}
            </span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <FiUsers style={{ width: '13px', height: '13px', color: 'rgb(113, 113, 130)' }} />
            <span
              style={{
                fontSize: '13px',
                fontWeight: 400,
                color: 'rgb(113, 113, 130)',
                lineHeight: '18px',
              }}
            >
              {event.enrolled}/{event.maxEnrolled} inscritos
            </span>
          </div>
        </div>

        {/* Action Buttons and Event Type Tag */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '9px',
            position: 'absolute',
            bottom: '19.59px',
            left: '0',
            right: '0',
          }}
        >
          {/* Inscrever-se Button */}
          <button
            onClick={onEnroll}
            disabled={isFull}
            style={{
              height: '30px',
              padding: '8px 10px',
              borderRadius: '6px',
              backgroundColor: 'rgb(25, 118, 210)',
              border: 'none',
              cursor: isFull ? 'not-allowed' : 'pointer',
              color: 'rgb(255, 255, 255)',
              fontSize: '14px',
              fontWeight: 500,
              opacity: isFull ? 0.5 : 1,
              whiteSpace: 'nowrap',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {isFull ? 'Lotado' : 'Inscrever-se'}
          </button>

          {/* Mais Detalhes Button */}
          <button
            onClick={onDetails}
            style={{
              height: '30px',
              padding: '8px 10px',
              borderRadius: '6px',
              backgroundColor: 'rgb(255, 255, 255)',
              border: '1px solid rgba(0, 0, 0, 0.1)',
              cursor: 'pointer',
              color: 'rgb(0, 0, 0)',
              fontSize: '14px',
              fontWeight: 500,
              whiteSpace: 'nowrap',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            Mais Detalhes
          </button>

          {/* Event Type Tag - Right aligned */}
          <div
            style={{
              marginLeft: 'auto',
              height: '18px',
              padding: '2px 7px',
              borderRadius: '6.75px',
              backgroundColor: 'transparent',
              border: `1px solid ${eventTypeStyle.border}`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <span
              style={{
                fontSize: '12px',
                fontWeight: 600,
                color: eventTypeStyle.text,
                whiteSpace: 'nowrap',
                lineHeight: '14px',
              }}
            >
              {eventTypeLabels[event.category]}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
