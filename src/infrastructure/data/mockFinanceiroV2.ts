/**
 * Dados demo — Dashboard financeiro v2 e transações gateway (layout referência UI).
 */

export const DASH_KPIS = {
  receitaMes: 45750,
  receitaTrend: '+12%',
  assinantesAtivos: 305,
  assinantesTrend: '+23 novos este mês',
  pagamentosPendentesValor: 3200,
  pagamentosPendentesSub: '8 faturas vencendo em 7 dias',
  inadimplenciaPct: 2.3,
  inadimplenciaTrend: '-0,5%',
  mrr: 42300,
  ticketMedio: 149.83,
  churnPct: 3.2,
  churnTrend: '-0,8%',
} as const

/** Eixo esquerdo (volume) e direito (receita R$) — Jan–Jun */
export const DASH_EVOL_ALUNOS = [820, 920, 1010, 1120, 1240, 1320] as const
export const DASH_EVOL_RECEITA = [11800, 12800, 13600, 14800, 15900, 16800] as const

export const DASH_PLANOS_DONUT = [
  { label: 'Plano Mensal', pct: 45, valor: 20587.5, color: '#7c3aed' },
  { label: 'Plano Anual', pct: 55, valor: 25162.5, color: '#a78bfa' },
] as const

export const DASH_VENCIMENTOS = [
  { nome: 'Ana Silva', plano: 'Plano Mensal STARS', valor: 150, vencimento: '08/12/2025' },
  { nome: 'Bruno Costa', plano: 'Plano Anual STARS', valor: 1200, vencimento: '09/12/2025' },
  { nome: 'Carla Mendes', plano: 'Plano Mensal STARS', valor: 150, vencimento: '10/12/2025' },
] as const

export const DASH_FALHADOS = [
  {
    nome: 'Diego Santos',
    valor: 150,
    motivo: 'Saldo insuficiente',
    email: 'diego.santos@email.com',
  },
] as const

export type GatewayTxnStatus = 'aprovado' | 'pendente' | 'falhado'
export type GatewayMetodoTipo = 'cartao' | 'pix' | 'boleto' | 'debito'

export type GatewayTxnRow = {
  id: string
  dataHora: string
  estudante: string
  email: string
  descricao: string
  metodoTipo: GatewayMetodoTipo
  metodoLabel: string
  valor: number
  status: GatewayTxnStatus
  gatewayId: string
}

export const MOCK_GATEWAY_TXNS: GatewayTxnRow[] = [
  {
    id: 'txn-001',
    dataHora: '12/11/2025 14:32',
    estudante: 'Maria Eduarda Santos',
    email: 'maria.eduarda@email.com',
    descricao: 'Renovação Plano Mensal',
    metodoTipo: 'cartao',
    metodoLabel: 'Cartão de Crédito **** 4242',
    valor: 150,
    status: 'aprovado',
    gatewayId: 'gw_live_8xK2mN9pQ1',
  },
  {
    id: 'txn-002',
    dataHora: '12/11/2025 11:05',
    estudante: 'João Pedro Oliveira',
    email: 'joao.oliveira@email.com',
    descricao: 'Assinatura Premium',
    metodoTipo: 'pix',
    metodoLabel: 'PIX',
    valor: 420,
    status: 'aprovado',
    gatewayId: 'gw_live_7yJ1nL8oP0',
  },
  {
    id: 'txn-003',
    dataHora: '11/11/2025 09:18',
    estudante: 'Beatriz Lima Costa',
    email: 'beatriz.lima@email.com',
    descricao: 'Plano Trimestral',
    metodoTipo: 'boleto',
    metodoLabel: 'Boleto',
    valor: 420,
    status: 'pendente',
    gatewayId: 'gw_live_6wH0mK7nO9',
  },
  {
    id: 'txn-004',
    dataHora: '10/11/2025 16:44',
    estudante: 'Lucas Ferreira',
    email: 'lucas.f@email.com',
    descricao: 'Upgrade Anual',
    metodoTipo: 'cartao',
    metodoLabel: 'Cartão de Crédito **** 1234',
    valor: 1200,
    status: 'aprovado',
    gatewayId: 'gw_live_5vG9lJ6mN8',
  },
  {
    id: 'txn-005',
    dataHora: '09/11/2025 08:12',
    estudante: 'Diego Santos',
    email: 'diego.santos@email.com',
    descricao: 'Mensalidade',
    metodoTipo: 'cartao',
    metodoLabel: 'Cartão de Crédito **** 8899',
    valor: 150,
    status: 'falhado',
    gatewayId: 'gw_live_4uF8kI5lM7',
  },
]
