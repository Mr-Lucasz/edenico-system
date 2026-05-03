export type FaixaId = '5-7-anos' | '8-10-anos' | '11-13-anos' | '14-15-anos'

export type CategoriaId = 'science' | 'technology' | 'arts' | 'relations' | 'service'

export type NivelId = 'basico' | 'intermedio' | 'avancado'

export type CursoAdminCard = {
  id: string
  titulo: string
  descricao: string
  progressoPct: number
  duracaoLabel: string
  alunos: number
}

export type NivelDetalhe = {
  resumoCursosNivel: number
  resumoAlunosInscritos: number
  resumoCursosCompletos: number
  cursos: CursoAdminCard[]
}

export type NivelCard = {
  nivelId: NivelId
  titulo: string
  descricao: string
  icon: 'star' | 'moon' | 'sun'
  tags: string[]
  alunos: number
  cursos: number
  ctaLabel: string
}

export type CategoriaTab = {
  id: CategoriaId
  label: string
  count: number
}

export type FaixaEtaria = {
  id: FaixaId
  faixaLabel: string
  segmento: string
  cursosDisponiveis: number
  cardTheme: 'pink' | 'sky' | 'green' | 'orange'
  icon: 'baby' | 'smile' | 'heart' | 'star'
}

export const ADMIN_CURSOS_RESUMO_GERAL = {
  totalCursos: 82,
  totalAlunos: 28441,
  faixasEtarias: 4,
  categoriasStars: 5,
} as const

export const ADMIN_CURSOS_STARS_DISTRIBUICAO = [
  { letter: 'S', nome: 'Science', count: 17, color: '#795548' },
  { letter: 'T', nome: 'Technology', count: 17, color: '#7b2cbf' },
  { letter: 'A', nome: 'Arts', count: 16, color: '#fb8c00' },
  { letter: 'R', nome: 'Relations', count: 16, color: '#28a745' },
  { letter: 'S', nome: 'Service', count: 16, color: '#e53935' },
] as const

export const ADMIN_CURSOS_FAIXAS: FaixaEtaria[] = [
  {
    id: '5-7-anos',
    faixaLabel: '5-7 anos',
    segmento: 'Educação Infantil',
    cursosDisponiveis: 15,
    cardTheme: 'pink',
    icon: 'baby',
  },
  {
    id: '8-10-anos',
    faixaLabel: '8-10 anos',
    segmento: 'Ensino Fundamental I',
    cursosDisponiveis: 25,
    cardTheme: 'sky',
    icon: 'smile',
  },
  {
    id: '11-13-anos',
    faixaLabel: '11-13 anos',
    segmento: 'Ensino Fundamental II',
    cursosDisponiveis: 22,
    cardTheme: 'green',
    icon: 'heart',
  },
  {
    id: '14-15-anos',
    faixaLabel: '14-15 anos',
    segmento: 'Ensino Médio',
    cursosDisponiveis: 20,
    cardTheme: 'orange',
    icon: 'star',
  },
]

const TAB_LABELS: Record<CategoriaId, string> = {
  science: 'Science',
  technology: 'Technology',
  arts: 'Arts',
  relations: 'Relations',
  service: 'Service',
}

/** Contagens por faixa (alinhadas ao layout de referência para 8-10). */
const TAB_COUNTS: Record<FaixaId, Record<CategoriaId, number>> = {
  '5-7-anos': { science: 4, technology: 3, arts: 4, relations: 2, service: 2 },
  '8-10-anos': { science: 5, technology: 4, arts: 6, relations: 3, service: 1 },
  '11-13-anos': { science: 5, technology: 5, arts: 5, relations: 4, service: 3 },
  '14-15-anos': { science: 4, technology: 5, arts: 4, relations: 4, service: 3 },
}

export function getCategoriasTabsParaFaixa(faixaId: FaixaId): CategoriaTab[] {
  const row = TAB_COUNTS[faixaId]
  return (Object.keys(row) as CategoriaId[]).map((id) => ({
    id,
    label: TAB_LABELS[id],
    count: row[id],
  }))
}

export function getFaixaEtaria(faixaId: string): FaixaEtaria | undefined {
  return ADMIN_CURSOS_FAIXAS.find((f) => f.id === faixaId)
}

export function getDefaultCategoriaId(_faixaId: FaixaId): CategoriaId {
  return 'technology'
}

const NIVEL_META: Record<
  NivelId,
  { titulo: string; cta: string; icon: NivelCard['icon'] }
> = {
  basico: {
    titulo: 'NÍVEL BÁSICO',
    cta: 'Ver Cursos Básicos',
    icon: 'star',
  },
  intermedio: {
    titulo: 'NÍVEL INTERMÉDIO',
    cta: 'Ver Cursos Intermédios',
    icon: 'moon',
  },
  avancado: {
    titulo: 'NÍVEL AVANZADO',
    cta: 'Ver Cursos Avanzados',
    icon: 'sun',
  },
}

const DESC_PADRAO: Record<NivelId, string> = {
  basico: 'Comece sua jornada de aprendizado com conceitos fundamentais e experimentos divertidos!',
  intermedio: 'Aprofunde seus conhecimentos com desafios mais complexos e projetos.',
  avancado: 'Domine conceitos avançados e torne-se um verdadeiro especialista na área!',
}

/** Níveis exatos do mock de referência (Technology + 8-10). */
const OVERRIDE_NIVEIS: Partial<
  Record<FaixaId, Partial<Record<CategoriaId, Record<NivelId, Omit<NivelCard, 'nivelId' | 'ctaLabel' | 'titulo' | 'icon'>>>>>
> = {
  '8-10-anos': {
    technology: {
      basico: {
        descricao: DESC_PADRAO.basico,
        tags: ['Planetas', 'Estrelas', 'Foguetes'],
        alunos: 32,
        cursos: 4,
      },
      intermedio: {
        descricao: DESC_PADRAO.intermedio,
        tags: ['Animais', 'Plantas', 'Ecologia'],
        alunos: 54,
        cursos: 4,
      },
      avancado: {
        descricao: DESC_PADRAO.avancado,
        tags: ['Experimentos', 'Cores', 'Diversão'],
        alunos: 12,
        cursos: 3,
      },
    },
  },
}

function hashStr(s: string): number {
  let h = 0
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) >>> 0
  return h
}

function pickTags(seed: string): string[] {
  const pool = [
    'Projetos',
    'Laboratório',
    'Vídeos',
    'Quiz',
    'STARS',
    'Gamificação',
    'Portfólio',
    'Desafios',
    'Equipe',
    'Criatividade',
  ]
  const h = hashStr(seed)
  const a = pool[h % pool.length]
  const b = pool[(h >> 3) % pool.length]
  const c = pool[(h >> 6) % pool.length]
  return Array.from(new Set([a, b, c]))
}

export function getNiveisCards(faixaId: FaixaId, categoriaId: CategoriaId): NivelCard[] {
  const ordem: NivelId[] = ['basico', 'intermedio', 'avancado']
  return ordem.map((nivelId) => {
    const meta = NIVEL_META[nivelId]
    const ov = OVERRIDE_NIVEIS[faixaId]?.[categoriaId]?.[nivelId]
    const key = `${faixaId}|${categoriaId}|${nivelId}`
    const counts = ov ?? {
      descricao: DESC_PADRAO[nivelId],
      tags: pickTags(key),
      alunos: 18 + (hashStr(key) % 80),
      cursos: 2 + (hashStr(key + 'c') % 6),
    }
    return {
      nivelId,
      titulo: meta.titulo,
      descricao: counts.descricao,
      icon: meta.icon,
      tags: counts.tags,
      alunos: counts.alunos,
      cursos: counts.cursos,
      ctaLabel: meta.cta,
    }
  })
}

const TECH_INTERMEDIO_DEMO: CursoAdminCard[] = [
  {
    id: 'py-jovens',
    titulo: 'Python para Jovens',
    descricao: 'Aprenda Python criando projetos incríveis!',
    progressoPct: 48,
    duracaoLabel: '5h 30min',
    alunos: 512,
  },
  {
    id: 'apps-moveis',
    titulo: 'Criação de Apps Móveis',
    descricao: 'Crie aplicativos para celular de forma simples!',
    progressoPct: 33,
    duracaoLabel: '4h 15min',
    alunos: 487,
  },
  {
    id: 'design-ui',
    titulo: 'Design de Interfaces',
    descricao: 'Aprenda a criar interfaces bonitas e funcionais!',
    progressoPct: 52,
    duracaoLabel: '4h 30min',
    alunos: 456,
  },
  {
    id: 'jogos-2d',
    titulo: 'Programação de Jogos 2D',
    descricao: 'Crie jogos 2D completos com mecânicas avançadas!',
    progressoPct: 44,
    duracaoLabel: '6h 00min',
    alunos: 358,
  },
]

function nivelLabelPt(nivelId: NivelId): string {
  if (nivelId === 'basico') return 'Básico'
  if (nivelId === 'intermedio') return 'Intermédio'
  return 'Avanzado'
}

function formatDuracao(h: number): string {
  const horas = 3 + (h % 5)
  const mins = (h % 4) * 15
  if (mins === 0) return `${horas}h 00min`
  return `${horas}h ${String(mins).padStart(2, '0')}min`
}

function cursosGerados(seed: string, n: number): CursoAdminCard[] {
  const titulos = [
    'Explorando o Universo',
    'Mãos na Massa',
    'Makers em Ação',
    'Ciência Divertida',
    'Robótica Criativa',
    'Histórias e Código',
  ]
  const out: CursoAdminCard[] = []
  for (let i = 0; i < n; i++) {
    const h = hashStr(`${seed}|${i}`)
    out.push({
      id: `gen-${seed}-${i}`,
      titulo: `${titulos[h % titulos.length]} ${i + 1}`,
      descricao: 'Trilha com atividades guiadas, vídeos e projetos colaborativos.',
      progressoPct: 15 + (h % 80),
      duracaoLabel: formatDuracao(h),
      alunos: 120 + (h % 900),
    })
  }
  return out
}

export function getNivelDetalhe(
  faixaId: FaixaId,
  categoriaId: CategoriaId,
  nivelId: NivelId,
): NivelDetalhe | undefined {
  const niveis = getNiveisCards(faixaId, categoriaId)
  const card = niveis.find((n) => n.nivelId === nivelId)
  if (!card) return undefined

  const isDemoTechInter =
    faixaId === '8-10-anos' && categoriaId === 'technology' && nivelId === 'intermedio'

  const n = card.cursos
  const cursos = isDemoTechInter ? TECH_INTERMEDIO_DEMO : cursosGerados(`${faixaId}|${categoriaId}|${nivelId}`, n)

  const alunosInscritos = isDemoTechInter
    ? 2222
    : cursos.reduce((s, c) => s + c.alunos, 0)

  return {
    resumoCursosNivel: cursos.length,
    resumoAlunosInscritos: alunosInscritos,
    resumoCursosCompletos: isDemoTechInter ? 0 : Math.min(12, Math.floor(cursos.length * 0.4)),
    cursos,
  }
}

export function tituloMetodologiaStars(faixa: FaixaEtaria): string {
  return `Metodologia STARS - ${faixa.faixaLabel}`
}

export function tituloNivelLista(categoriaLabel: string, nivelId: NivelId): string {
  return `${categoriaLabel} - Nível ${nivelLabelPt(nivelId)}`
}

export function subtituloNivelLista(faixa: FaixaEtaria, qtdCursos: number): string {
  return `${faixa.faixaLabel} • ${qtdCursos} curso${qtdCursos === 1 ? '' : 's'} disponível${qtdCursos === 1 ? '' : 'is'}`
}

export function isFaixaId(s: string): s is FaixaId {
  return ADMIN_CURSOS_FAIXAS.some((f) => f.id === s)
}

export function isCategoriaId(s: string): s is CategoriaId {
  return ['science', 'technology', 'arts', 'relations', 'service'].includes(s)
}

export function isNivelId(s: string): s is NivelId {
  return s === 'basico' || s === 'intermedio' || s === 'avancado'
}

export const ADMIN_CURSOS_STARS_SELECT_OPTIONS: { id: CategoriaId; label: string }[] = [
  { id: 'science', label: 'Science' },
  { id: 'technology', label: 'Technology' },
  { id: 'arts', label: 'Arts' },
  { id: 'relations', label: 'Relations' },
  { id: 'service', label: 'Service' },
]

export const ADMIN_CURSOS_NIVEL_SELECT_OPTIONS: { id: NivelId; label: string }[] = [
  { id: 'basico', label: 'Básico' },
  { id: 'intermedio', label: 'Intermédio' },
  { id: 'avancado', label: 'Avanzado' },
]
