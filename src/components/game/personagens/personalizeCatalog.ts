import type { AdaoIconSlotId } from './adaoIconAssets'

export type CustomizeTabId = 'tudo' | AdaoIconSlotId

export type CatalogItem = {
  readonly id: string
  readonly name: string
  readonly category: AdaoIconSlotId
}

/** Itens fictícios por categoria (protótipo / grelha 4×2 + paginação). */
export const PERSONAGEM_CATALOG: readonly CatalogItem[] = [
  { id: 'r1', name: 'Túnica Básica', category: 'roupa' },
  { id: 'r2', name: 'Manto Verde', category: 'roupa' },
  { id: 'r3', name: 'Armadura Dourada', category: 'roupa' },
  { id: 'r4', name: 'Túnica Real', category: 'roupa' },
  { id: 'r5', name: 'Veste do Éden', category: 'roupa' },
  { id: 'a1', name: 'Coroa Simples', category: 'acessorios' },
  { id: 'a2', name: 'Cinto do Éden', category: 'acessorios' },
  { id: 'a3', name: 'Amuleto da Vida', category: 'acessorios' },
  { id: 'a4', name: 'Bracelete Luz', category: 'acessorios' },
  { id: 'a5', name: 'Colar Sábio', category: 'acessorios' },
  { id: 'w1', name: 'Espada de Ferro', category: 'armas' },
  { id: 'w2', name: 'Arco Longo', category: 'armas' },
  { id: 'w3', name: 'Cajado Éden', category: 'armas' },
  { id: 'w4', name: 'Lança da Aurora', category: 'armas' },
  { id: 'w5', name: 'Martelo Leve', category: 'armas' },
  { id: 'e1', name: 'Escudo Éden', category: 'ferramentas' },
  { id: 'e2', name: 'Luvas de Proteção', category: 'ferramentas' },
  { id: 'e3', name: 'Elmo Básico', category: 'ferramentas' },
  { id: 'e4', name: 'Botas do Viajante', category: 'ferramentas' },
  { id: 'e5', name: 'Mochila Sábia', category: 'ferramentas' },
  { id: 'r6', name: 'Capa Noturna', category: 'roupa' },
  { id: 'a6', name: 'Anel da Harmonia', category: 'acessorios' },
  { id: 'w6', name: 'Adaga Veloz', category: 'armas' },
  { id: 'e6', name: 'Cinto de Ferramentas', category: 'ferramentas' },
] as const

export const ITEMS_PER_PAGE = 8

export function filterCatalog(tab: CustomizeTabId): CatalogItem[] {
  if (tab === 'tudo') return [...PERSONAGEM_CATALOG]
  return PERSONAGEM_CATALOG.filter((i) => i.category === tab)
}

export function itemById(id: string): CatalogItem | undefined {
  return PERSONAGEM_CATALOG.find((i) => i.id === id)
}
