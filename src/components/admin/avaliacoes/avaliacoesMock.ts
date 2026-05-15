export type DimensaoMeta = {
  id: string
  emoji: string
  titulo: string
  descricao: string
}

export const DIMENSOES_META: Record<string, DimensaoMeta> = {
  fisica: {
    id: 'fisica',
    emoji: '💪',
    titulo: 'Física',
    descricao: 'Saúde, atividade física e bem-estar corporal',
  },
  mental: {
    id: 'mental',
    emoji: '🧠',
    titulo: 'Mental',
    descricao: 'Desenvolvimento cognitivo e equilíbrio emocional',
  },
  espiritual: {
    id: 'espiritual',
    emoji: '✨',
    titulo: 'Espiritual',
    descricao: 'Propósito, valores e conexão interior',
  },
  social: {
    id: 'social',
    emoji: '👥',
    titulo: 'Social',
    descricao: 'Relacionamentos, empatia e convivência',
  },
  profissional: {
    id: 'profissional',
    emoji: '💼',
    titulo: 'Profissional',
    descricao: 'Competências, carreira e autonomia',
  },
}

export type PapelUsuario = 'estudante' | 'docente'

export type StatusAvaliacaoCard = 'avaliado' | 'parcial' | 'nao'

export type NotaOuPendente = number | 'pendente'

export type NotaFinalValor = number | 'nao'

export type UsuarioDimensaoCard = {
  id: string
  iniciais: string
  nome: string
  email: string
  papel: PapelUsuario
  auto: NotaOuPendente
  adm: NotaOuPendente
  final: NotaFinalValor
  status: StatusAvaliacaoCard
  acao: 'ver' | 'avaliar'
}

/** Lista demo por dimensão (Física = referência do layout) */
export const USUARIOS_POR_DIMENSAO: Record<string, UsuarioDimensaoCard[]> = {
  fisica: [
    {
      id: 'ana-clara-silva',
      iniciais: 'ACS',
      nome: 'Ana Clara Silva',
      email: 'ana.silva@email.com',
      papel: 'estudante',
      auto: 4.3,
      adm: 4.7,
      final: 4.5,
      status: 'avaliado',
      acao: 'ver',
    },
    {
      id: 'bruno-costa',
      iniciais: 'BC',
      nome: 'Bruno Costa',
      email: 'bruno.costa@email.com',
      papel: 'estudante',
      auto: 3.5,
      adm: 4.1,
      final: 3.8,
      status: 'avaliado',
      acao: 'ver',
    },
    {
      id: 'carla-mendes',
      iniciais: 'CM',
      nome: 'Carla Mendes',
      email: 'carla.mendes@email.com',
      papel: 'estudante',
      auto: 4.0,
      adm: 'pendente',
      final: 'nao',
      status: 'parcial',
      acao: 'avaliar',
    },
    {
      id: 'ricardo-almeida',
      iniciais: 'RA',
      nome: 'Prof. Ricardo Almeida',
      email: 'ricardo.almeida@email.com',
      papel: 'docente',
      auto: 'pendente',
      adm: 'pendente',
      final: 4.8,
      status: 'avaliado',
      acao: 'avaliar',
    },
    {
      id: 'diego-fernandes',
      iniciais: 'DF',
      nome: 'Diego Fernandes',
      email: 'diego.fernandes@email.com',
      papel: 'estudante',
      auto: 'pendente',
      adm: 'pendente',
      final: 'nao',
      status: 'nao',
      acao: 'avaliar',
    },
  ],
}

/** Detalhe completo (abas) — demo focada em Ana Clara / Física */
export type IndicadorLinha = { id: string; texto: string; nota: number }

export type SecaoAvaliacao = {
  id: string
  titulo: string
  notaSecao: number
  indicadores: IndicadorLinha[]
}

export const DETALHE_ANA_CLARA = {
  semestre: 'Semestre 2/2025',
  auto: 3.8,
  adm: 4.6,
  final: 4.2,
  secoesAuto: [
    {
      id: 's1',
      titulo: 'Saúde Geral',
      notaSecao: 3.8,
      indicadores: [
        { id: 'i1', texto: 'Pratica exercícios físicos regularmente', nota: 4 },
        { id: 'i2', texto: 'Mantém uma alimentação equilibrada', nota: 3 },
        { id: 'i3', texto: 'Dorme pelo menos 7 horas por noite', nota: 5 },
        { id: 'i4', texto: 'Realiza check-ups médicos regularmente', nota: 3 },
        { id: 'i5', texto: 'Mantém peso saudável', nota: 4 },
      ],
    },
    {
      id: 's2',
      titulo: 'Atividade Física',
      notaSecao: 3.6,
      indicadores: [
        { id: 'i6', texto: 'Frequência de atividades aeróbicas', nota: 4 },
        { id: 'i7', texto: 'Prática de exercícios de força', nota: 3 },
        { id: 'i8', texto: 'Flexibilidade e alongamento', nota: 4 },
        { id: 'i9', texto: 'Tempo de atividade física semanal', nota: 4 },
        { id: 'i10', texto: 'Variedade de atividades físicas', nota: 3 },
      ],
    },
  ] satisfies SecaoAvaliacao[],
  secoesAdm: [
    {
      id: 'a1',
      titulo: 'Saúde Geral',
      notaSecao: 4.4,
      indicadores: [
        { id: 'a1i1', texto: 'Pratica exercícios físicos regularmente', nota: 5 },
        { id: 'a1i2', texto: 'Mantém uma alimentação equilibrada', nota: 4 },
        { id: 'a1i3', texto: 'Dorme pelo menos 7 horas por noite', nota: 5 },
        { id: 'a1i4', texto: 'Realiza check-ups médicos regularmente', nota: 4 },
        { id: 'a1i5', texto: 'Mantém peso saudável', nota: 4 },
      ],
    },
    {
      id: 'a2',
      titulo: 'Atividade Física',
      notaSecao: 4.4,
      indicadores: [
        { id: 'a2i1', texto: 'Frequência de atividades aeróbicas', nota: 5 },
        { id: 'a2i2', texto: 'Prática de exercícios de força', nota: 4 },
        { id: 'a2i3', texto: 'Flexibilidade e alongamento', nota: 4 },
        { id: 'a2i4', texto: 'Tempo de atividade física semanal', nota: 5 },
        { id: 'a2i5', texto: 'Variedade de atividades físicas', nota: 4 },
      ],
    },
    {
      id: 'a3',
      titulo: 'Nutrição e Hidratação',
      notaSecao: 4.5,
      indicadores: [
        { id: 'a3i1', texto: 'Consumo adequado de água diariamente', nota: 5 },
        { id: 'a3i2', texto: 'Ingestão de frutas e vegetais', nota: 4 },
        { id: 'a3i3', texto: 'Controle de alimentos processados', nota: 4 },
      ],
    },
  ] satisfies SecaoAvaliacao[],
  comparativoSecoes: [
    { secao: 'Saúde Geral', auto: 3.8, adm: 4.6 },
    { secao: 'Atividade Física', auto: 3.6, adm: 4.4 },
    { secao: 'Nutrição e Hidratação', auto: 4.0, adm: 4.8 },
  ],
}

export function getUsuariosDimensao(dimensaoId: string): UsuarioDimensaoCard[] {
  return USUARIOS_POR_DIMENSAO[dimensaoId] ?? USUARIOS_POR_DIMENSAO.fisica
}

export function getUsuarioCard(dimensaoId: string, usuarioId: string): UsuarioDimensaoCard | undefined {
  return getUsuariosDimensao(dimensaoId).find((u) => u.id === usuarioId)
}
