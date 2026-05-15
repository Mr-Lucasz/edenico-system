/** Evento disparado pelo menu da metodologia (desktop) para abrir uma dimensão na secção Filosofia 5.0 */
export const PHILOSOPHY_50_SELECT_EVENT = 'edenicos:philosophy50-select' as const

export type Philosophy50SelectDetail = {
  id: string
}

export const PHILOSOPHY_50_SHORT_LABEL: Record<string, string> = {
  fisica: 'Física',
  mental: 'Mental',
  espiritual: 'Espiritual',
  relacional: 'Relacional',
  profissional: 'Profissional',
}
