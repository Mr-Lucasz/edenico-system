/**
 * Formata o progresso em porcentagem
 */
export function formatProgress(current: number, total: number): number {
  if (total === 0) return 0
  return Math.round((current / total) * 100)
}

/**
 * Formata o progresso como string (ex: "4 de 6 unidades • 75% concluído")
 */
export function formatProgressText(
  current: number,
  total: number,
  unitLabel: string = 'unidades'
): string {
  const percentage = formatProgress(current, total)
  return `${current} de ${total} ${unitLabel} • ${percentage}% concluído`
}
