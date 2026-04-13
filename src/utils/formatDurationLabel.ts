/** Formata minutos como "2h 30min" (alinhado ao mock Meus Cursos). */
export function formatDurationLabel(totalMinutes: number): string {
  const h = Math.floor(totalMinutes / 60)
  const min = totalMinutes % 60
  if (h <= 0) return `${min}min`
  return `${min > 0 ? `${h}h ${min}min` : `${h}h`}`
}
