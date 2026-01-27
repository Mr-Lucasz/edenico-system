import { formatDistanceToNow } from 'date-fns'
import { ptBR } from 'date-fns/locale'

/**
 * Formata uma data para formato relativo (ex: "2 horas atrás")
 */
export function formatTimeAgo(date: Date | string): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date
  return formatDistanceToNow(dateObj, {
    addSuffix: true,
    locale: ptBR,
  })
}
