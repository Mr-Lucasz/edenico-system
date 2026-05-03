import { downloadCsv } from '@src/lib/downloadFile'
import {
  MOCK_ASSINATURAS,
  MOCK_FATURAS,
  MOCK_PROMOCOES,
} from '@src/infrastructure/data/mockAdminFinanceiro'
import {
  DASH_FALHADOS,
  DASH_KPIS,
  DASH_VENCIMENTOS,
  MOCK_GATEWAY_TXNS,
} from '@src/infrastructure/data/mockFinanceiroV2'

const money = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' })

function gatewayStatusLabel(s: (typeof MOCK_GATEWAY_TXNS)[0]['status']) {
  if (s === 'aprovado') return 'Aprovado'
  if (s === 'pendente') return 'Pendente'
  return 'Falhado'
}

/** Exporta CSV conforme a aba atual do módulo financeiro (dados demo completos). */
export function exportFinanceiroCsvForPath(pathname: string) {
  const stamp = new Date().toISOString().slice(0, 10)

  if (pathname.includes('/assinaturas')) {
    downloadCsv(
      `edenicos-assinaturas-${stamp}.csv`,
      [
        { key: 'estudante', header: 'Estudante' },
        { key: 'email', header: 'Email' },
        { key: 'cpfResp', header: 'CPF Responsável' },
        { key: 'nomeResp', header: 'Responsável' },
        { key: 'plano', header: 'Plano' },
        { key: 'valor', header: 'Valor' },
        { key: 'metodo', header: 'Método' },
        { key: 'status', header: 'Status' },
        { key: 'vencimento', header: 'Vencimento' },
      ],
      MOCK_ASSINATURAS.map((r) => ({
        estudante: r.estudante,
        email: r.email,
        cpfResp: r.cpfResp,
        nomeResp: r.nomeResp,
        plano: r.plano,
        valor: r.valor,
        metodo: r.metodo,
        status: r.status,
        vencimento: r.vencimento,
      })),
    )
    return
  }

  if (pathname.includes('/transacoes')) {
    downloadCsv(
      `edenicos-transacoes-${stamp}.csv`,
      [
        { key: 'id', header: 'ID' },
        { key: 'dataHora', header: 'Data/Hora' },
        { key: 'estudante', header: 'Estudante' },
        { key: 'email', header: 'E-mail' },
        { key: 'descricao', header: 'Descrição' },
        { key: 'metodo', header: 'Método' },
        { key: 'valor', header: 'Valor' },
        { key: 'status', header: 'Status' },
        { key: 'gatewayId', header: 'Gateway ID' },
      ],
      MOCK_GATEWAY_TXNS.map((r) => ({
        id: r.id,
        dataHora: r.dataHora,
        estudante: r.estudante,
        email: r.email,
        descricao: r.descricao,
        metodo: r.metodoLabel,
        valor: money.format(r.valor),
        status: gatewayStatusLabel(r.status),
        gatewayId: r.gatewayId,
      })),
    )
    return
  }

  if (pathname.includes('/faturas')) {
    downloadCsv(
      `edenicos-faturas-${stamp}.csv`,
      [
        { key: 'num', header: 'Nº' },
        { key: 'emissao', header: 'Emissão' },
        { key: 'estudante', header: 'Estudante' },
        { key: 'estudanteCpf', header: 'CPF' },
        { key: 'descricao', header: 'Descrição' },
        { key: 'valor', header: 'Valor' },
        { key: 'vencimento', header: 'Vencimento' },
        { key: 'status', header: 'Status' },
      ],
      [...MOCK_FATURAS],
    )
    return
  }

  if (pathname.includes('/promocoes')) {
    downloadCsv(
      `edenicos-promocoes-${stamp}.csv`,
      [
        { key: 'codigo', header: 'Código' },
        { key: 'nome', header: 'Nome' },
        { key: 'tipo', header: 'Tipo' },
        { key: 'aplicavel', header: 'Aplicável' },
        { key: 'status', header: 'Status' },
        { key: 'inicio', header: 'Início' },
        { key: 'fim', header: 'Fim' },
      ],
      MOCK_PROMOCOES.map((p) => ({
        codigo: p.codigo,
        nome: p.nome,
        tipo: p.tipo,
        aplicavel: p.aplicavel,
        status: p.status,
        inicio: p.inicio,
        fim: p.fim,
      })),
    )
    return
  }

  if (pathname.includes('/relatorios')) {
    downloadCsv(
      `edenicos-relatorio-resumo-${stamp}.csv`,
      [
        { key: 'k', header: 'Indicador' },
        { key: 'v', header: 'Valor' },
      ],
      [
        { k: 'Receita demo (assinaturas)', v: MOCK_ASSINATURAS.reduce((s, r) => s + r.valor, 0) },
        { k: 'Transações gateway (linhas)', v: MOCK_GATEWAY_TXNS.length },
        { k: 'Faturas (linhas)', v: MOCK_FATURAS.length },
        { k: 'Promoções (linhas)', v: MOCK_PROMOCOES.length },
      ],
    )
    return
  }

  // dashboard (default) — mesma visão consolidada do botão "Exportar visão" na aba
  downloadCsv(
    `edenicos-financeiro-dashboard-${stamp}.csv`,
    [
      { key: 'secao', header: 'Seção' },
      { key: 'a', header: 'Campo A' },
      { key: 'b', header: 'Campo B' },
      { key: 'c', header: 'Campo C' },
    ],
    [
      { secao: 'KPI', a: 'Receita mês', b: money.format(DASH_KPIS.receitaMes), c: DASH_KPIS.receitaTrend },
      { secao: 'KPI', a: 'Assinantes', b: String(DASH_KPIS.assinantesAtivos), c: DASH_KPIS.assinantesTrend },
      {
        secao: 'KPI',
        a: 'Pagamentos pendentes',
        b: money.format(DASH_KPIS.pagamentosPendentesValor),
        c: DASH_KPIS.pagamentosPendentesSub,
      },
      {
        secao: 'KPI',
        a: 'Inadimplência',
        b: `${String(DASH_KPIS.inadimplenciaPct).replace('.', ',')}%`,
        c: DASH_KPIS.inadimplenciaTrend,
      },
      { secao: 'KPI', a: 'MRR', b: money.format(DASH_KPIS.mrr), c: '' },
      { secao: 'KPI', a: 'Ticket médio', b: money.format(DASH_KPIS.ticketMedio), c: '' },
      {
        secao: 'KPI',
        a: 'Churn',
        b: `${String(DASH_KPIS.churnPct).replace('.', ',')}%`,
        c: DASH_KPIS.churnTrend,
      },
      ...DASH_VENCIMENTOS.map((v) => ({
        secao: 'Vencimento 7d',
        a: v.nome,
        b: v.plano,
        c: `${money.format(v.valor)} · ${v.vencimento}`,
      })),
      ...DASH_FALHADOS.map((f) => ({
        secao: 'Falhado',
        a: f.nome,
        b: f.motivo,
        c: money.format(f.valor),
      })),
    ],
  )
}
