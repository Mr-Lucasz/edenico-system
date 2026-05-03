'use client'

import { useEffect, useState } from 'react'
import { FiTrendingUp, FiUsers, FiUserCheck, FiBookOpen, FiCalendar, FiDownload } from 'react-icons/fi'
import { downloadCsv } from '@src/lib/downloadFile'
import {
  USUARIOS_CRESCIMENTO_MENSAL,
  USUARIOS_DISTRIBUICAO_PCT,
  USUARIOS_KPIS,
  USUARIOS_MOCK_ROWS,
  USUARIOS_OUVIDORIA,
  USUARIOS_ULTIMOS_CADASTROS,
  PERFIS_LABEL,
  type PerfilUsuario,
} from '@src/infrastructure/data/mockGestaoUsuarios'
import u from './gestaoUsuarios.module.scss'

const intFmt = new Intl.NumberFormat('pt-BR')

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

function DonutDistribuicao() {
  const cx = 100
  const cy = 100
  const r = 78
  const total = USUARIOS_KPIS.total
  return (
    <svg width={200} height={200} viewBox="0 0 200 200" aria-hidden>
      {USUARIOS_DISTRIBUICAO_PCT.map((d, i) => {
        let start = 0
        for (let j = 0; j < i; j++) start += USUARIOS_DISTRIBUICAO_PCT[j].pct / 100
        return (
          <path key={d.perfil} d={pieSlicePath(cx, cy, r, start, d.pct)} fill={d.cor} stroke="#fff" strokeWidth="2" />
        )
      })}
      <circle cx={cx} cy={cy} r={48} fill="#fff" />
      <text x={cx} y={cy - 2} textAnchor="middle" className={u.donutCenter}>
        Total
      </text>
      <text x={cx} y={cy + 16} textAnchor="middle" className={u.donutTotal}>
        {intFmt.format(total)}
      </text>
    </svg>
  )
}

function badgePerfilClass(perfil: PerfilUsuario) {
  if (perfil === 'estudante') return u.badgeEstudante
  if (perfil === 'docente') return u.badgeDocente
  if (perfil === 'responsavel') return u.badgeResp
  if (perfil === 'prestador') return u.badgePrest
  return u.badgeAdmin
}

export function GestaoUsuariosDashboardTab() {
  const [toast, setToast] = useState<string | null>(null)

  useEffect(() => {
    if (!toast) return
    const t = window.setTimeout(() => setToast(null), 2600)
    return () => window.clearTimeout(t)
  }, [toast])

  function exportDashboard() {
    const stamp = new Date().toISOString().slice(0, 10)
    downloadCsv(
      `edenicos-usuarios-dashboard-${stamp}.csv`,
      [
        { key: 'kpi', header: 'Indicador' },
        { key: 'valor', header: 'Valor' },
      ],
      [
        { kpi: 'Total de usuários', valor: USUARIOS_KPIS.total },
        { kpi: 'Estudantes ativos', valor: USUARIOS_KPIS.estudantesAtivos },
        { kpi: 'Docentes ativos', valor: USUARIOS_KPIS.docentesAtivos },
        { kpi: 'Responsáveis', valor: USUARIOS_KPIS.responsaveis },
        { kpi: 'Novos (hoje)', valor: USUARIOS_KPIS.novosHoje },
        ...USUARIOS_CRESCIMENTO_MENSAL.map((m) => ({
          kpi: `Crescimento ${m.mes}`,
          valor: m.estudantes + m.responsaveis + m.docentes,
        })),
      ],
    )
    setToast('Resumo exportado em CSV.')
  }

  const maxBar = Math.max(
    ...USUARIOS_CRESCIMENTO_MENSAL.map((m) => m.estudantes + m.responsaveis + m.docentes),
    1,
  )

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '0.75rem' }}>
        <button type="button" className={u.btnOutline} onClick={exportDashboard}>
          <FiDownload aria-hidden />
          Exportar visão
        </button>
      </div>

      <div className={u.kpiGrid}>
        <div className={u.kpiCard}>
          <div className={u.kpiIcon} style={{ background: '#2563eb' }}>
            <FiUsers aria-hidden />
          </div>
          <div className={u.kpiLabel}>Total de usuários</div>
          <div className={u.kpiValue}>{intFmt.format(USUARIOS_KPIS.total)}</div>
        </div>
        <div className={u.kpiCard}>
          <div className={u.kpiIcon} style={{ background: '#10b981' }}>
            <FiUserCheck aria-hidden />
          </div>
          <div className={u.kpiLabel}>Estudantes ativos</div>
          <div className={u.kpiValue}>{intFmt.format(USUARIOS_KPIS.estudantesAtivos)}</div>
        </div>
        <div className={u.kpiCard}>
          <div className={u.kpiIcon} style={{ background: '#8b5cf6' }}>
            <FiBookOpen aria-hidden />
          </div>
          <div className={u.kpiLabel}>Docentes ativos</div>
          <div className={u.kpiValue}>{intFmt.format(USUARIOS_KPIS.docentesAtivos)}</div>
        </div>
        <div className={u.kpiCard}>
          <div className={u.kpiIcon} style={{ background: '#f97316' }}>
            <FiUsers aria-hidden />
          </div>
          <div className={u.kpiLabel}>Responsáveis</div>
          <div className={u.kpiValue}>{intFmt.format(USUARIOS_KPIS.responsaveis)}</div>
        </div>
        <div className={u.kpiCard}>
          <div className={u.kpiIcon} style={{ background: '#111827' }}>
            <FiCalendar aria-hidden />
          </div>
          <div className={u.kpiLabel}>Novos (hoje)</div>
          <div className={u.kpiValue}>{intFmt.format(USUARIOS_KPIS.novosHoje)}</div>
        </div>
      </div>

      <div className={u.chartRow}>
        <div className={u.card}>
          <div className={u.cardPad}>
            <h2 className={u.chartTitle}>Crescimento de usuários</h2>
            <p className={u.chartSub}>Cadastros por mês por perfil (demonstração).</p>
            <div className={u.barChart} aria-label="Gráfico de barras agrupadas">
              <div style={{ position: 'absolute', bottom: 0, left: '0.5rem', right: '0.5rem', display: 'flex', gap: '0.75rem', fontSize: '0.65rem', color: '#6b7280' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                  <span className={u.barSeg} style={{ height: 8, maxWidth: 8, background: '#3b82f6' }} />
                  Estudantes
                </span>
                <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                  <span className={u.barSeg} style={{ height: 8, maxWidth: 8, background: '#f97316' }} />
                  Responsáveis
                </span>
                <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                  <span className={u.barSeg} style={{ height: 8, maxWidth: 8, background: '#8b5cf6' }} />
                  Docentes
                </span>
              </div>
              {USUARIOS_CRESCIMENTO_MENSAL.map((m) => (
                <div key={m.mes} className={u.barGroup}>
                  <div className={u.barTriplet}>
                    <div
                      className={u.barSeg}
                      style={{
                        background: '#3b82f6',
                        height: `${(m.estudantes / maxBar) * 100}%`,
                      }}
                      title={`Estudantes: ${m.estudantes}`}
                    />
                    <div
                      className={u.barSeg}
                      style={{
                        background: '#f97316',
                        height: `${(m.responsaveis / maxBar) * 100}%`,
                      }}
                      title={`Responsáveis: ${m.responsaveis}`}
                    />
                    <div
                      className={u.barSeg}
                      style={{
                        background: '#8b5cf6',
                        height: `${(m.docentes / maxBar) * 100}%`,
                      }}
                      title={`Docentes: ${m.docentes}`}
                    />
                  </div>
                  <span className={u.barMonth}>{m.mes}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className={u.card}>
          <div className={u.cardPad}>
            <h2 className={u.chartTitle}>Distribuição por tipo</h2>
            <p className={u.chartSub}>Percentuais aproximados da base.</p>
            <div className={u.distGrid}>
              <div className={u.distBarRow}>
                {USUARIOS_DISTRIBUICAO_PCT.map((d) => (
                  <div key={d.perfil} className={u.distItem}>
                    <span className={u.distName}>{PERFIS_LABEL[d.perfil]}</span>
                    <div className={u.distTrack}>
                      <div className={u.distFill} style={{ width: `${d.pct}%`, background: d.cor }} />
                    </div>
                    <span className={u.distPct}>{d.pct.toFixed(1).replace('.', ',')}%</span>
                  </div>
                ))}
              </div>
              <div className={u.donutWrap}>
                <DonutDistribuicao />
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: '0.75rem', color: '#6b7280', fontWeight: 600 }}>
                  <FiTrendingUp aria-hidden style={{ color: '#10b981' }} />
                  Base estável no trimestre
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={u.bottomGrid}>
        <div className={u.card}>
          <div className={u.cardPad}>
            <h3 className={u.listCardTitle}>Últimos cadastros</h3>
            <ul className={u.miniList}>
              {USUARIOS_ULTIMOS_CADASTROS.map((x) => (
                <li key={x.id} className={u.miniRow}>
                  <div>
                    <div className={u.miniName}>{x.nome}</div>
                    <div className={u.miniMeta}>
                      <span className={`${u.badge} ${badgePerfilClass(x.perfil)}`}>{PERFIS_LABEL[x.perfil]}</span>
                    </div>
                  </div>
                  <span className={`${u.badge} ${x.status === 'ativo' ? u.badgeAtivo : u.badgeInativo}`}>
                    {x.status === 'ativo' ? 'Ativo' : 'Inativo'}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className={u.card}>
          <div className={u.cardPad}>
            <h3 className={u.listCardTitle}>Ouvidoria — canais de trabalho</h3>
            <ul className={u.miniList}>
              {USUARIOS_OUVIDORIA.map((o) => (
                <li key={o.id} className={u.miniRow}>
                  <div>
                    <div className={u.miniName}>{o.usuario}</div>
                    <div className={u.miniMeta}>
                      <span className={`${u.badge} ${badgePerfilClass(o.perfil)}`}>{PERFIS_LABEL[o.perfil]}</span>
                      <span style={{ fontSize: '0.75rem', color: '#6b7280' }}>{o.titulo}</span>
                    </div>
                  </div>
                  <span className={`${u.badge} ${o.status === 'pendente' ? u.badgePendente : u.badgeResolvido}`}>
                    {o.status === 'pendente' ? 'Pendente' : 'Resolvido'}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <p style={{ margin: '1rem 0 0', fontSize: '0.75rem', color: '#9ca3af' }}>
        Amostra de atividade: {USUARIOS_MOCK_ROWS.length} registros na lista geral (mock).
      </p>

      {toast ? (
        <div role="status" aria-live="polite" className={u.liveToast}>
          {toast}
        </div>
      ) : null}
    </>
  )
}
