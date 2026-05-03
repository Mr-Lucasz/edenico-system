/** Dados estáticos para o módulo financeiro admin (demo, sem API). */

export type AssinaturaStatus = 'ativa' | 'pendente' | 'vencida'
export type FaturaStatus = 'paga' | 'emitida' | 'vencida'
export type PromoStatus = 'agendada' | 'ativa'
export type TransacaoStatus = 'pago' | 'pendente' | 'atrasado'

export const MOCK_ASSINATURAS = [
  {
    estudante: 'Maria Eduarda Santos',
    email: 'maria.eduarda@email.com',
    cpfResp: '123.456.789-09',
    nomeResp: 'Carlos Santos',
    plano: 'Mensal' as const,
    valor: 150,
    metodo: 'cartao' as const,
    status: 'ativa' as AssinaturaStatus,
    vencimento: '14/12/2025',
  },
  {
    estudante: 'João Pedro Oliveira',
    email: 'joao.oliveira@email.com',
    cpfResp: '987.654.321-00',
    nomeResp: 'Ana Oliveira',
    plano: 'Anual' as const,
    valor: 1200,
    metodo: 'pix' as const,
    status: 'pendente' as AssinaturaStatus,
    vencimento: '02/01/2026',
  },
  {
    estudante: 'Beatriz Lima Costa',
    email: 'beatriz.lima@email.com',
    cpfResp: '456.789.123-45',
    nomeResp: 'Roberto Costa',
    plano: 'Trimestral' as const,
    valor: 420,
    metodo: 'boleto' as const,
    status: 'vencida' as AssinaturaStatus,
    vencimento: '28/10/2025',
  },
  {
    estudante: 'Lucas Ferreira',
    email: 'lucas.f@email.com',
    cpfResp: '321.654.987-11',
    nomeResp: 'Fernanda Ferreira',
    plano: 'Mensal' as const,
    valor: 150,
    metodo: 'debito' as const,
    status: 'ativa' as AssinaturaStatus,
    vencimento: '20/12/2025',
  },
  {
    estudante: 'Camila Rocha',
    email: 'camila.r@email.com',
    cpfResp: '111.222.333-44',
    nomeResp: 'Paulo Rocha',
    plano: 'Anual' as const,
    valor: 1200,
    metodo: 'cartao' as const,
    status: 'ativa' as AssinaturaStatus,
    vencimento: '05/11/2026',
  },
] as const

export const MOCK_FATURAS = [
  {
    num: 'FAT-000001',
    emissao: '01/11/2025',
    estudante: 'Ana Silva',
    estudanteCpf: '529.982.247-25',
    descricao: 'Mensalidade Novembro 2025',
    valor: 150,
    vencimento: '10/11/2025',
    status: 'paga' as FaturaStatus,
  },
  {
    num: 'FAT-000002',
    emissao: '03/11/2025',
    estudante: 'Pedro Souza',
    estudanteCpf: '390.533.447-05',
    descricao: 'Mensalidade Novembro 2025',
    valor: 420,
    vencimento: '15/11/2025',
    status: 'emitida' as FaturaStatus,
  },
  {
    num: 'FAT-000003',
    emissao: '05/11/2025',
    estudante: 'Juliana Martins',
    estudanteCpf: '456.789.123-45',
    descricao: 'Renovação Anual',
    valor: 1200,
    vencimento: '20/10/2025',
    status: 'vencida' as FaturaStatus,
  },
  {
    num: 'FAT-000004',
    emissao: '08/11/2025',
    estudante: 'Rafael Dias',
    estudanteCpf: '222.333.444-55',
    descricao: 'Mensalidade Novembro 2025',
    valor: 150,
    vencimento: '18/11/2025',
    status: 'paga' as FaturaStatus,
  },
] as const

export const MOCK_PROMOCOES = [
  {
    codigo: 'BLACKFRIDAY2025',
    nome: 'Black Friday 2025',
    descricao: 'Desconto especial de Black Friday',
    tipo: '30%',
    aplicavel: 'Todos os planos',
    limite: 100,
    usos: 45,
    ilimitado: false,
    inicio: '19/11/2025',
    fim: '29/11/2025',
    status: 'agendada' as PromoStatus,
  },
  {
    codigo: 'BEMVINDO15',
    nome: 'Bem-vindo',
    descricao: 'Primeira assinatura',
    tipo: '15%',
    aplicavel: 'Plano Mensal',
    limite: 0,
    usos: 128,
    ilimitado: true,
    inicio: '01/01/2025',
    fim: '31/12/2025',
    status: 'ativa' as PromoStatus,
  },
  {
    codigo: 'RECORRENTE1667',
    nome: 'Fidelidade trimestral',
    descricao: 'Desconto recorrente trimestral',
    tipo: '16,67% Recorrente',
    aplicavel: 'Plano Trimestral',
    limite: 200,
    usos: 173,
    ilimitado: false,
    inicio: '01/06/2025',
    fim: '30/06/2026',
    status: 'ativa' as PromoStatus,
  },
] as const

export const MOCK_TRANSACOES = [
  {
    data: '12/10/2025',
    descricao: 'Mensalidade — João Silva',
    categoria: 'Receita' as const,
    metodo: 'Cartão de Crédito',
    valor: 197,
    status: 'pago' as TransacaoStatus,
  },
  {
    data: '11/10/2025',
    descricao: 'Aluguel escritório',
    categoria: 'Despesa' as const,
    metodo: 'Pix',
    valor: 2800,
    status: 'pago' as TransacaoStatus,
  },
  {
    data: '10/10/2025',
    descricao: 'Assinatura Premium — Maria',
    categoria: 'Receita' as const,
    metodo: 'Boleto',
    valor: 420,
    status: 'pendente' as TransacaoStatus,
  },
  {
    data: '08/10/2025',
    descricao: 'Licenças software',
    categoria: 'Despesa' as const,
    metodo: 'Cartão de Crédito',
    valor: 890,
    status: 'atrasado' as TransacaoStatus,
  },
  {
    data: '05/10/2025',
    descricao: 'Plano anual — família Costa',
    categoria: 'Receita' as const,
    metodo: 'Pix',
    valor: 1200,
    status: 'pago' as TransacaoStatus,
  },
] as const

export const MOCK_TRANSACOES_DASH = [
  { data: '12/10/2025', descricao: 'Mensalidade — João Silva', categoria: 'Receita', valor: 197, status: 'pago' as const },
  { data: '11/10/2025', descricao: 'Taxa plataforma', categoria: 'Despesa', valor: 45, status: 'pago' as const },
  { data: '10/10/2025', descricao: 'Assinatura Premium', categoria: 'Receita', valor: 420, status: 'pendente' as const },
  { data: '09/10/2025', descricao: 'Reembolso parcial', categoria: 'Despesa', valor: 80, status: 'pendente' as const },
] as const

export const MOCK_CONTAS_PAGAR = [
  { descricao: 'Infraestrutura cloud', vencimento: '15/11/2025', valor: 890 },
  { descricao: 'Folha colaboradores', vencimento: '05/12/2025', valor: 12400 },
  { descricao: 'Marketing digital', vencimento: '22/11/2025', valor: 2100 },
] as const
