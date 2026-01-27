export type EventCategory = 'workshop' | 'hackathon' | 'seminar' | 'other'
export type EventType = 'arts' | 'technology' | 'sciences'

export interface Event {
  id: string
  title: string
  date: Date | string
  time: string
  category: EventCategory
  type: EventType
  organizer: string
  enrolled: number
  maxEnrolled: number
  description?: string
}
