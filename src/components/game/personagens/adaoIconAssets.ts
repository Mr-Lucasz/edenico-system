/**
 * Ícones de customização (Adão e Eva usam os mesmos ficheiros em `public/`).
 * Repouso: contorno branco; ativo Adão: círculo #F38015; ativo Eva: mesmo PNG + filtro rosa em `PersonagensClient.module.scss`.
 */
export type AdaoIconSlotId = 'roupa' | 'acessorios' | 'armas' | 'ferramentas'

export interface AdaoIconSlot {
  readonly id: AdaoIconSlotId
  readonly label: string
  /** Estado repouso (contorno branco no fundo escuro) */
  readonly defaultSrc: string
  /** Estado ativo (#F38015) */
  readonly clickedSrc: string
}

export const ADAO_CUSTOMIZATION_SLOTS: readonly AdaoIconSlot[] = [
  {
    id: 'roupa',
    label: 'Roupa',
    defaultSrc: '/IconRoupaAdao.png',
    clickedSrc: '/IconRoupaAdaoClicked.png',
  },
  {
    id: 'acessorios',
    label: 'Acessórios',
    /** Nome do ficheiro no protótipo (grafia «Acessoarios»). */
    defaultSrc: '/IconAcessoariosAdao.png',
    clickedSrc: '/IconAcessoriosAdaoClicked.png',
  },
  {
    id: 'armas',
    label: 'Armas',
    defaultSrc: '/IconArmasAdao.png',
    clickedSrc: '/IconArmasAdaoClicked.png',
  },
  {
    id: 'ferramentas',
    label: 'Ferramentas',
    defaultSrc: '/IconFerramentasAdao.png',
    clickedSrc: '/IconFerramentasAdaoClicked.png',
  },
] as const
