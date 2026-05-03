/**
 * Dados demo — Atendimento ao cliente (tickets de suporte).
 */

export type TicketStatus = 'aberto' | 'em_andamento' | 'aguardando' | 'resolvido' | 'fechado' | 'cancelado'

export type TicketPriority = 'baixa' | 'media' | 'alta' | 'urgente'

export type TicketCategory = 'tecnico' | 'financeiro' | 'academico' | 'geral'

export type TicketMessageRole = 'usuario' | 'agente' | 'sistema'

export type TicketMessage = {
  id: string
  role: TicketMessageRole
  authorName: string
  authorInitials: string
  body: string
  /** ISO 8601 */
  atIso: string
}

export type TicketUser = {
  nome: string
  email: string
  telefone?: string
  tipo: string
  initials: string
}

export type TicketAgent = {
  nome: string
  initials: string
}

export type SupportTicket = {
  id: string
  numero: number
  titulo: string
  descricao: string
  status: TicketStatus
  prioridade: TicketPriority
  categoria: TicketCategory
  usuario: TicketUser
  atribuidoA: TicketAgent | null
  criadoEmIso: string
  atualizadoEmIso: string
  mensagens: TicketMessage[]
  tags: string[]
}

export const AGENT_PADRAO_ATENDIMENTO: TicketAgent = { nome: 'João Silva', initials: 'JS' }

export const AGENTES_DISPONIVEIS: TicketAgent[] = [
  AGENT_PADRAO_ATENDIMENTO,
  { nome: 'Maria Suporte', initials: 'MS' },
  { nome: 'Carlos Tickets', initials: 'CT' },
]

export const MOCK_TICKETS_SEED: SupportTicket[] = [
  {
    id: '2481',
    numero: 2481,
    titulo: 'Não consigo acessar o curso de Robótica',
    descricao:
      'Ao clicar em "Continuar curso", a página fica em branco. Já limpei o cache e testei em outro navegador.',
    status: 'aberto',
    prioridade: 'alta',
    categoria: 'tecnico',
    usuario: {
      nome: 'Maria Santos',
      email: 'maria.santos@email.com',
      telefone: '(11) 98877-6655',
      tipo: 'Estudante',
      initials: 'MS',
    },
    atribuidoA: null,
    criadoEmIso: '2026-01-19T13:30:00.000Z',
    atualizadoEmIso: '2026-01-19T13:30:00.000Z',
    mensagens: [],
    tags: ['Plataforma', 'Login'],
  },
  {
    id: '2482',
    numero: 2482,
    titulo: 'Dúvida sobre pagamento de mensalidade',
    descricao: 'Recebi um e-mail dizendo que o pagamento está pendente, mas o PIX foi feito ontem.',
    status: 'em_andamento',
    prioridade: 'media',
    categoria: 'financeiro',
    usuario: {
      nome: 'Pedro Costa',
      email: 'pedro.costa@email.com',
      telefone: '(21) 97766-5544',
      tipo: 'Estudante',
      initials: 'PC',
    },
    atribuidoA: AGENT_PADRAO_ATENDIMENTO,
    criadoEmIso: '2026-01-18T16:00:00.000Z',
    atualizadoEmIso: '2026-01-19T09:15:00.000Z',
    mensagens: [
      {
        id: 'm-2482-1',
        role: 'usuario',
        authorName: 'Pedro Costa',
        authorInitials: 'PC',
        body: 'Segue o comprovante em anexo no painel. O ID da transação termina em 8821.',
        atIso: '2026-01-18T16:05:00.000Z',
      },
      {
        id: 'm-2482-2',
        role: 'agente',
        authorName: AGENT_PADRAO_ATENDIMENTO.nome,
        authorInitials: AGENT_PADRAO_ATENDIMENTO.initials,
        body: 'Olá, Pedro! Estamos conferindo com o gateway de pagamentos e retorno em até 1 dia útil.',
        atIso: '2026-01-19T09:15:00.000Z',
      },
    ],
    tags: ['PIX', 'Fatura'],
  },
  {
    id: '2483',
    numero: 2483,
    titulo: 'Certificado do curso não foi emitido',
    descricao: 'Finalizei todas as aulas há 3 dias e o certificado ainda aparece como "Em processamento".',
    status: 'aguardando',
    prioridade: 'media',
    categoria: 'academico',
    usuario: {
      nome: 'Lucas Oliveira',
      email: 'lucas.oliveira@email.com',
      tipo: 'Estudante',
      initials: 'LO',
    },
    atribuidoA: { nome: 'Maria Suporte', initials: 'MS' },
    criadoEmIso: '2026-01-17T11:20:00.000Z',
    atualizadoEmIso: '2026-01-18T14:40:00.000Z',
    mensagens: [
      {
        id: 'm-2483-1',
        role: 'agente',
        authorName: 'Maria Suporte',
        authorInitials: 'MS',
        body: 'Lucas, validamos suas avaliações finais. Aguardando apenas assinatura digital institucional.',
        atIso: '2026-01-18T14:40:00.000Z',
      },
    ],
    tags: ['Certificado'],
  },
  {
    id: '2484',
    numero: 2484,
    titulo: 'Sistema lento durante a aula ao vivo',
    descricao: 'Durante a aula ao vivo de ontem, o sistema estava muito lento e travando.',
    status: 'resolvido',
    prioridade: 'urgente',
    categoria: 'tecnico',
    usuario: {
      nome: 'Sofia Lima',
      email: 'sofia.lima@email.com',
      telefone: '(31) 96655-4433',
      tipo: 'Estudante',
      initials: 'SL',
    },
    atribuidoA: AGENT_PADRAO_ATENDIMENTO,
    criadoEmIso: '2026-01-18T22:30:00.000Z',
    atualizadoEmIso: '2026-01-19T13:00:00.000Z',
    mensagens: [
      {
        id: 'm-2484-1',
        role: 'usuario',
        authorName: 'Sofia Lima',
        authorInitials: 'SL',
        body: 'Durante a aula ao vivo de ontem, o sistema estava muito lento e travando.',
        atIso: '2026-01-18T22:30:00.000Z',
      },
      {
        id: 'm-2484-2',
        role: 'agente',
        authorName: AGENT_PADRAO_ATENDIMENTO.nome,
        authorInitials: AGENT_PADRAO_ATENDIMENTO.initials,
        body: 'Olá Sofia! Identificamos o problema e já foi corrigido. Era um problema no servidor. Desculpe pelo transtorno!',
        atIso: '2026-01-19T10:00:00.000Z',
      },
      {
        id: 'm-2484-3',
        role: 'sistema',
        authorName: 'Sistema',
        authorInitials: '•',
        body: `Ticket marcado como resolvido por ${AGENT_PADRAO_ATENDIMENTO.nome} — 19/01/2026 10:00`,
        atIso: '2026-01-19T13:00:00.000Z',
      },
    ],
    tags: ['Suporte Técnico', 'Aula ao Vivo'],
  },
  {
    id: '2485',
    numero: 2485,
    titulo: 'Sugestão de novo curso',
    descricao: 'Gostaria de sugerir um curso curto sobre Python para iniciantes.',
    status: 'fechado',
    prioridade: 'baixa',
    categoria: 'geral',
    usuario: {
      nome: 'Rafael Almeida',
      email: 'rafael.almeida@email.com',
      tipo: 'Estudante',
      initials: 'RA',
    },
    atribuidoA: AGENT_PADRAO_ATENDIMENTO,
    criadoEmIso: '2026-01-10T09:00:00.000Z',
    atualizadoEmIso: '2026-01-12T17:30:00.000Z',
    mensagens: [
      {
        id: 'm-2485-1',
        role: 'agente',
        authorName: AGENT_PADRAO_ATENDIMENTO.nome,
        authorInitials: AGENT_PADRAO_ATENDIMENTO.initials,
        body: 'Obrigado pela sugestão, Rafael! Encaminhamos ao time pedagógico para avaliação.',
        atIso: '2026-01-12T17:30:00.000Z',
      },
    ],
    tags: ['Feedback'],
  },
]

export function labelStatus(s: TicketStatus): string {
  const map: Record<TicketStatus, string> = {
    aberto: 'Aberto',
    em_andamento: 'Em Andamento',
    aguardando: 'Aguardando',
    resolvido: 'Resolvido',
    fechado: 'Fechado',
    cancelado: 'Cancelado',
  }
  return map[s]
}

export function labelPrioridade(p: TicketPriority): string {
  const map: Record<TicketPriority, string> = {
    baixa: 'Baixa',
    media: 'Média',
    alta: 'Alta',
    urgente: 'Urgente',
  }
  return map[p]
}

export function labelCategoria(c: TicketCategory): string {
  const map: Record<TicketCategory, string> = {
    tecnico: 'Técnico',
    financeiro: 'Financeiro',
    academico: 'Acadêmico',
    geral: 'Geral',
  }
  return map[c]
}

export function snippetFrom(desc: string, max = 96): string {
  const t = desc.replace(/\s+/g, ' ').trim()
  if (t.length <= max) return t
  return `${t.slice(0, max - 1)}…`
}
