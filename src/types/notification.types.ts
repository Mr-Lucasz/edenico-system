import { type ReactNode } from 'react'

export interface Notification {
  id: string
  icon: ReactNode
  message: string
  actionLabel?: string
  onAction?: () => void
  variant?: 'info' | 'warning' | 'success'
}
