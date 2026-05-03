'use client'

import { useEffect, useState } from 'react'
import {
  FiAlertTriangle,
  FiClock,
  FiDollarSign,
  FiMail,
  FiRefreshCw,
  FiTrendingDown,
  FiTrendingUp,
  FiUsers,
} from 'react-icons/fi'
import { downloadCsv } from '@src/lib/downloadFile'
import {
  DASH_EVOL_ALUNOS,
  DASH_EVOL_RECEITA,
  DASH_FALHADOS,
  DASH_KPIS,
  DASH_PLANOS_DONUT,
  DASH_VENCIMENTOS,
} from '@src/infrastructure/data/mockFinanceiroV2'
import base from './financeiroUi.module.scss'
import v2 from './financeiroV2.module.scss'

const money = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' })
const intAxis = new Intl.NumberFormat('pt-BR', { maximumFractionDigits: 0 })
const pctFmt = new Intl.NumberFormat('pt-BR', { maximumFractionDigits: 1, minimumFractionDigits: 1 })

function pieSlicePath(cx: number, cy: number, r: number, startFrac: number, pct: number) {
  const start = -Math.PI / 2 + startFrac * 2 * Math.PI
  const end = -Math.PI / 2 + (startFrac + pct / 100) * 2 * Math.PI
  const x1 = cx + r * Math.cos(start)
  const y1 = cy + r * Math.sin(start)
  const x2 = cx + r * Math.cos(end)
  const y2 = cy + r * Math.sin(end)
  const large = end - start > Math.PI ? 1 : 0
  return `M ${cx} ${cy} L ${x1} ${y1} A ${r} ${r} 0 ${large} 1 ${x2} ${y2} Z`
}

function EvolucaoReceitaDualChart() {
  const W = 540
  const H = 236
  const pl = 38
  const pr = 46
  const pt = 8
  const pb = 32
  const cw = W - pl - pr
  const ch = H - pt - pb
  const maxL = 1400
  const maxR = 20000
  const n = DASH_EVOL_RECEITA.length
  const xs = DASH_EVOL_RECEITA.map((_, i) => pl + (i / (n - 1)) * cw)
  const ysL = DASH_EVOL_ALUNOS.map((v) => pt + ch - (v / maxL) * ch)
  const ysR = DASH_EVOL_RECEITA.map((v) => pt + ch - (v / maxR) * ch)
  const ptsL = xs.map((x, i) => `${x},${ysL[i]}`).join(' ')
  const ptsR = xs.map((x, i) => `${x},${ysR[i]}`).join(' ')
  const months = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun']

  const yTicks = [0, 0.25, 0.5, 0.75, 1]

  return (
    <svg className={v2.chartSvg} viewBox={`0 0 ${W} ${H}`} role="img" aria-label="Evolução da receita e volume">
      <title>Evolução da receita</title>
      {yTicks.map((t) => {
        const y = pt + ch - t * ch
        return <line key={t} className={v2.gridLine} x1={pl} y1={y} x2={W - pr} y2={y} />
      })}
      {yTicks.map((t) => {
        const vL = Math.round(maxL * t)
        const y = pt + ch - t * ch + 3
        return (
          <text key={`l-${t}`} className={v2.axisTxt} x={2} y={y}>
            {intAxis.format(vL)}
          </text>
        )
      })}
      {yTicks.map((t) => {
        const vR = Math.round(maxR * t)
        const y = pt + ch - t * ch + 3
        return (
          <text key={`r-${t}`} className={v2.axisTxt} x={W - 4} y={y} textAnchor="end">
            {intAxis.format(vR)}
          </text>
        )
      })}
      <polyline className={v2.lineVolume} points={ptsL} fill="none" />
      <polyline className={v2.lineReceita} points={ptsR} fill="none" />
      {xs.map((x, i) => (
        <circle key={`cl-${i}`} cx={x} cy={ysL[i]} r={3.5} fill="#fff" stroke="#3b82f6" strokeWidth={2} />
      ))}
      {xs.map((x, i) => (
        <circle key={`cr-${i}`} cx={x} cy={ysR[i]} r={3.5} fill="#fff" stroke="#22c55e" strokeWidth={2} />
      ))}
      {months.map((m, i) => (
        <text key={m} className={v2.monthTxt} x={xs[i]} y={H - 8} textAnchor="middle">
          {m}
        </text>
      ))}
    </svg>
  )
}

function DonutReceitaPlano() {
  const cx = 100
  const cy = 100
  const r = 82
  return (
    <svg width={200} height={200} viewBox="0 0 200 200" aria-hidden>
      {DASH_PLANOS_DONUT.map((d, i) => {
        let start = 0
        for (let j = 0; j < i; j++) start += DASH_PLANOS_DONUT[j].pct / 100
        return <path key={d.label} d={pieSlicePath(cx, cy, r, start, d.pct)} fill={d.color} stroke="#fff" strokeWidth="2" />
      })}
      <circle cx={cx} cy={cy} r={46} fill="#fff" />
      <text x={cx} y={cy + 4} textAnchor="middle" fontSize="11" fontWeight="700" fill="#6b7280">
        Receita
      </text>
    </svg>
  )
}

export function FinanceiroDashboardTab() {
  const [toast, setToast] = useState<string | null>(null)

  useEffect(() => {
    if (!toast) return
    const t = window.setTimeout(() => setToast(null), 2600)
    return () => window.clearTimeout(t)
  }, [toast])

  function exportVisao() {
    const stamp = new Date().toISOString().slice(0, 10)
    downloadCsv(
      `edenicos-dashboard-financeiro-v2-${stamp}.csv`,
      [
        { key: 'secao', header: 'Seção' },
        { key: 'a', header: 'Campo A' },
        { key: 'b', header: 'Campo B' },
        { key: 'c', header: 'Campo C' },
      ],
      [
        { secao: 'KPI', a: 'Receita mês', b: money.format(DASH_KPIS.receitaMes), c: DASH_KPIS.receitaTrend },
        { secao: 'KPI', a: 'Assinantes', b: String(DASH_KPIS.assinantesAtivos), c: DASH_KPIS.assinantesTrend },
        ...DASH_VENCIMENTOS.map((v) => ({ secao: 'Vencimento 7d', a: v.nome, b: v.plano, c: `${money.format(v.valor)} · ${v.vencimento}` })),
        ...DASH_FALHADOS.map((f) => ({ secao: 'Falhado', a: f.nome, b: f.motivo, c: money.format(f.valor) })),
      ],
    )
    setToast('Exportação CSV gerada.')
  }

  const cardBox = `${base.card} ${base.cardPad}`

  return (
    <>
      {toast ? (
        <div role="status" aria-live="polite" className={base.liveToast}>
          {toast}
        </div>
      ) : null}

      <div className={base.filterRowTop} style={{ marginBottom: '1rem' }}>
        <span style={{ flex: 1 }} />
        <button type="button" className={base.btnOutline} onClick={exportVisao}>
          Exportar visão
        </button>
      </div>

      <div className={v2.dashGrid4}>
        <div className={v2.dashKpi}>
          <p className={v2.dashKpiLabel}>Receita do mês atual</p>
          <p className={`${v2.dashKpiValue} ${v2.valGreen}`}>{money.format(DASH_KPIS.receitaMes)}</p>
          <p className={`${v2.dashKpiTrend} ${v2.dashKpiTrendUp}`}>
            <FiTrendingUp aria-hidden />
            {DASH_KPIS.receitaTrend} vs. mês anterior
          </p>
          <div className={`${v2.dashKpiIcon} ${v2.dashIconGreen}`} aria-hidden>
            <FiDollarSign />
          </div>
        </div>
        <div className={v2.dashKpi}>
          <p className={v2.dashKpiLabel}>Assinantes ativos</p>
          <p className={`${v2.dashKpiValue} ${v2.valBlue}`}>{intAxis.format(DASH_KPIS.assinantesAtivos)}</p>
          <p className={`${v2.dashKpiTrend} ${v2.dashKpiTrendUp}`}>
            <FiTrendingUp aria-hidden />
            {DASH_KPIS.assinantesTrend}
          </p>
          <div className={`${v2.dashKpiIcon} ${v2.dashIconBlue}`} aria-hidden>
            <FiUsers />
          </div>
        </div>
        <div className={v2.dashKpi}>
          <p className={v2.dashKpiLabel}>Pagamentos pendentes</p>
          <p className={`${v2.dashKpiValue} ${v2.valOrange}`}>{money.format(DASH_KPIS.pagamentosPendentesValor)}</p>
          <p className={v2.dashKpiSub}>{DASH_KPIS.pagamentosPendentesSub}</p>
          <div className={`${v2.dashKpiIcon} ${v2.dashIconOrange}`} aria-hidden>
            <FiClock />
          </div>
        </div>
        <div className={v2.dashKpi}>
          <p className={v2.dashKpiLabel}>Taxa de inadimplência</p>
          <p className={`${v2.dashKpiValue} ${v2.valRed}`}>{pctFmt.format(DASH_KPIS.inadimplenciaPct)}%</p>
          <p className={`${v2.dashKpiTrend} ${v2.dashKpiTrendDown}`}>
            <FiTrendingDown aria-hidden />
            {DASH_KPIS.inadimplenciaTrend} vs. mês anterior
          </p>
          <div className={`${v2.dashKpiIcon} ${v2.dashIconRed}`} aria-hidden>
            <FiAlertTriangle />
          </div>
        </div>
      </div>

      <div className={v2.dashChartsRow}>
        <div className={cardBox}>
          <div className={v2.chartCardHead}>
            <div>
              <h2 className={v2.chartCardTitle}>Evolução da receita</h2>
              <p className={v2.chartCardSub}>Volume (eixo esquerdo) e receita em R$ (eixo direito)</p>
            </div>
            <span id="dash-periodo-label" className={v2.srOnly}>
              Período do gráfico
            </span>
            <select
              id="dash-periodo"
              className={v2.selectMini}
              defaultValue="12"
              aria-labelledby="dash-periodo-label"
            >
              <option value="12">12 meses</option>
              <option value="6">6 meses</option>
              <option value="3">3 meses</option>
            </select>
          </div>
          <EvolucaoReceitaDualChart />
          <div className={v2.legendDotLine}>
            <span className={v2.legendSw} style={{ background: '#3b82f6' }} />
            Volume (índice)
            <span style={{ width: '0.75rem' }} />
            <span className={v2.legendSw} style={{ background: '#22c55e' }} />
            Receita (R$)
          </div>
        </div>
        <div className={cardBox}>
          <div className={v2.chartCardHead}>
            <div>
              <h2 className={v2.chartCardTitle}>Receita por plano</h2>
              <p className={v2.chartCardSub}>Distribuição no período</p>
            </div>
          </div>
          <div className={base.donutWrap}>
            <DonutReceitaPlano />
            <ul className={base.legend}>
              {DASH_PLANOS_DONUT.map((d) => (
                <li key={d.label} className={base.legendItem}>
                  <span className={base.legendDot} style={{ background: d.color }} />
                  <span>
                    {d.label}
                    <span className={v2.donutLegendVal}>
                      {d.pct}% · {money.format(d.valor)}
                    </span>
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className={v2.dashListsRow}>
        <div className={cardBox}>
          <h2 className={v2.listCardTitle}>Vencimentos nos próximos 7 dias</h2>
          <p className={v2.listCardSub}>Assinaturas que vencerão em breve</p>
          {DASH_VENCIMENTOS.map((v) => (
            <div key={v.nome} className={v2.vencRow}>
              <div className={v2.vencInfo}>
                <span className={v2.vencNome}>{v.nome}</span>
                <span className={v2.vencPlano}>{v.plano}</span>
              </div>
              <div className={v2.vencRight}>
                <span className={v2.vencValor}>{money.format(v.valor)}</span>
                <span className={v2.vencData}>{v.vencimento}</span>
                <button
                  type="button"
                  className={v2.iconBtn}
                  aria-label={`Enviar lembrete para ${v.nome}`}
                  onClick={() => setToast(`Lembrete (demo) para ${v.nome}`)}
                >
                  <FiMail />
                </button>
              </div>
            </div>
          ))}
          <button type="button" className={v2.linkFooter} onClick={() => setToast('Lista completa de vencimentos (demo)')}>
            Ver todos os vencimentos
          </button>
        </div>
        <div className={cardBox}>
          <h2 className={v2.listCardTitle}>Pagamentos falhados</h2>
          <p className={v2.listCardSub}>Transações que necessitam atenção</p>
          {DASH_FALHADOS.map((f) => (
            <div key={f.email} className={v2.falhaRow}>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div className={v2.falhaNome}>{f.nome}</div>
                <div className={v2.falhaMotivo}>{f.motivo}</div>
              </div>
              <span className={v2.falhaValor}>{money.format(f.valor)}</span>
              <span className={`${base.pillStatus} ${v2.pillFalhado}`}>Falhado</span>
              <button
                type="button"
                className={v2.iconBtn}
                style={{ color: '#dc2626', borderColor: '#fecaca' }}
                aria-label={`Retentar pagamento de ${f.nome}`}
                onClick={() => setToast(`Nova tentativa agendada (demo) — ${f.nome}`)}
              >
                <FiRefreshCw />
              </button>
            </div>
          ))}
          <button type="button" className={v2.linkFooter} onClick={() => setToast('Lista de falhas (demo)')}>
            Ver todos os pagamentos falhados
          </button>
        </div>
      </div>

      <div className={v2.dashFooter3}>
        <div className={v2.miniStat}>
          <p className={v2.miniStatLabel}>MRR</p>
          <p className={v2.miniStatValue}>{money.format(DASH_KPIS.mrr)}</p>
        </div>
        <div className={v2.miniStat}>
          <p className={v2.miniStatLabel}>Ticket médio</p>
          <p className={v2.miniStatValue}>{money.format(DASH_KPIS.ticketMedio)}</p>
        </div>
        <div className={v2.miniStat}>
          <p className={v2.miniStatLabel}>Churn rate</p>
          <p className={v2.miniStatValue}>{pctFmt.format(DASH_KPIS.churnPct)}%</p>
          <p className={`${v2.dashKpiTrend} ${v2.dashKpiTrendDown}`} style={{ marginTop: '0.35rem' }}>
            <FiTrendingDown aria-hidden />
            {DASH_KPIS.churnTrend} vs. mês anterior
          </p>
        </div>
      </div>
    </>
  )
}
