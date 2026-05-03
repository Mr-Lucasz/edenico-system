'use client'

import { useEffect, useMemo, useState } from 'react'
import { FiPlus } from 'react-icons/fi'
import { MOCK_PROMOCOES } from '@src/infrastructure/data/mockAdminFinanceiro'
import type { PromoStatus } from '@src/infrastructure/data/mockAdminFinanceiro'
import { RowActionsMenu } from './RowActionsMenu'
import u from './financeiroUi.module.scss'

const money = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' })

type PromoRow = {
  codigo: string
  nome: string
  descricao: string
  tipo: string
  aplicavel: string
  limite: number
  usos: number
  ilimitado: boolean
  inicio: string
  fim: string
  status: PromoStatus
}

function promoPill(status: PromoStatus) {
  if (status === 'agendada') return `${u.pillStatus} ${u.pillAgendada}`
  return `${u.pillStatus} ${u.pillPromoAtiva}`
}

function promoLabel(status: PromoStatus) {
  return status === 'agendada' ? 'Agendada' : 'Ativa'
}

function seedPromo(): PromoRow[] {
  return MOCK_PROMOCOES.map((p) => ({ ...p }))
}

export function FinanceiroPromocoesTab() {
  const [rows, setRows] = useState<PromoRow[]>(seedPromo)
  const [q, setQ] = useState('')
  const [st, setSt] = useState<'all' | PromoStatus>('all')
  const [open, setOpen] = useState(false)
  const [toast, setToast] = useState<string | null>(null)
  const [cCod, setCCod] = useState('')
  const [cNome, setCNome] = useState('')
  const [cTipo, setCTipo] = useState('10%')
  const [cApl, setCApl] = useState('Todos os planos')

  useEffect(() => {
    if (!toast) return
    const t = window.setTimeout(() => setToast(null), 2800)
    return () => window.clearTimeout(t)
  }, [toast])

  const filtradas = useMemo(() => {
    const qt = q.trim().toLowerCase()
    return rows.filter((row) => {
      if (st !== 'all' && row.status !== st) return false
      if (!qt) return true
      return `${row.codigo} ${row.nome} ${row.descricao}`.toLowerCase().includes(qt)
    })
  }, [rows, q, st])

  const kpis = useMemo(() => {
    const ativas = rows.filter((r) => r.status === 'ativa').length
    const cupons = rows.length
    const usos = rows.reduce((s, r) => s + r.usos, 0)
    const economia = 15420
    return { ativas, cupons, usos, economia }
  }, [rows])

  function salvarPromo(e: React.FormEvent) {
    e.preventDefault()
    const cod = cCod.trim().toUpperCase().replace(/\s+/g, '_')
    if (!cod || !cNome.trim()) {
      setToast('Preencha código e nome da promoção.')
      return
    }
    if (rows.some((r) => r.codigo === cod)) {
      setToast('Já existe uma promoção com esse código.')
      return
    }
    const novo: PromoRow = {
      codigo: cod,
      nome: cNome.trim(),
      descricao: 'Campanha criada no painel (demo)',
      tipo: cTipo,
      aplicavel: cApl,
      limite: 500,
      usos: 0,
      ilimitado: false,
      inicio: '01/01/2026',
      fim: '31/12/2026',
      status: 'ativa',
    }
    setRows((prev) => [novo, ...prev])
    setOpen(false)
    setCCod('')
    setCNome('')
    setToast('Promoção criada (sessão atual).')
  }

  return (
    <>
      {toast ? (
        <div role="status" aria-live="polite" className={u.liveToast}>
          {toast}
        </div>
      ) : null}

      {open ? (
        <div
          className={u.modalOverlay}
          role="presentation"
          onMouseDown={(e) => e.target === e.currentTarget && setOpen(false)}
        >
          <div className={u.modalPanel} role="dialog" aria-modal="true" aria-labelledby="fin-promo-title">
            <div className={u.modalHeader}>
              <h2 id="fin-promo-title" className={u.modalTitle}>
                Nova promoção
              </h2>
              <button type="button" className={u.modalClose} onClick={() => setOpen(false)} aria-label="Fechar">
                ×
              </button>
            </div>
            <form onSubmit={salvarPromo}>
              <div className={u.modalBody}>
                <div className={u.field}>
                  <label className={u.fieldLabel} htmlFor="pm-cod">
                    Código
                  </label>
                  <input id="pm-cod" className={u.fieldInput} value={cCod} onChange={(e) => setCCod(e.target.value)} placeholder="EX: VERAO2026" />
                </div>
                <div className={u.field}>
                  <label className={u.fieldLabel} htmlFor="pm-nome">
                    Nome
                  </label>
                  <input id="pm-nome" className={u.fieldInput} value={cNome} onChange={(e) => setCNome(e.target.value)} />
                </div>
                <div className={u.field}>
                  <label className={u.fieldLabel} htmlFor="pm-tipo">
                    Tipo de desconto
                  </label>
                  <input id="pm-tipo" className={u.fieldInput} value={cTipo} onChange={(e) => setCTipo(e.target.value)} placeholder="ex: 15% ou 20" />
                </div>
                <div className={u.field}>
                  <label className={u.fieldLabel} htmlFor="pm-apl">
                    Aplicável a
                  </label>
                  <select id="pm-apl" className={u.fieldSelect} value={cApl} onChange={(e) => setCApl(e.target.value)}>
                    <option>Todos os planos</option>
                    <option>Plano Mensal</option>
                    <option>Plano Anual</option>
                  </select>
                </div>
              </div>
              <div className={u.modalFooter}>
                <button type="button" className={u.btnOutline} onClick={() => setOpen(false)}>
                  Cancelar
                </button>
                <button type="submit" className={u.btnPrimaryGreen}>
                  Criar
                </button>
              </div>
            </form>
          </div>
        </div>
      ) : null}

      <div className={u.grid4}>
        <div className={u.kpiCard}>
          <p className={u.kpiLabel}>Promoções Ativas</p>
          <p className={`${u.kpiValue} ${u.kpiGreen}`}>{kpis.ativas}</p>
        </div>
        <div className={u.kpiCard}>
          <p className={u.kpiLabel}>Total de Cupons</p>
          <p className={`${u.kpiValue} ${u.kpiBlack}`}>{kpis.cupons}</p>
        </div>
        <div className={u.kpiCard}>
          <p className={u.kpiLabel}>Cupons Utilizados</p>
          <p className={`${u.kpiValue} ${u.kpiBlack}`}>{kpis.usos}</p>
        </div>
        <div className={u.kpiCard}>
          <p className={u.kpiLabel}>Economia Gerada</p>
          <p className={`${u.kpiValue} ${u.kpiOrange}`}>{money.format(kpis.economia)}</p>
        </div>
      </div>

      <div className={`${u.card} ${u.cardPadComfort}`} style={{ marginBottom: '1rem' }}>
        <h2 className={u.filterTitle}>Filtros</h2>
        <div className={u.filtersPromoRow}>
          <div className={`${u.inputWrap} ${u.filtersGrow}`}>
            <span className={u.inputIcon} aria-hidden>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8" />
                <path d="M21 21l-4.35-4.35" />
              </svg>
            </span>
            <input
              type="search"
              className={u.textInput}
              placeholder="Buscar por número, nome ou CPF"
              aria-label="Buscar promoções"
              value={q}
              onChange={(e) => setQ(e.target.value)}
            />
          </div>
          <select className={u.selectPlain} aria-label="Situação" value={st} onChange={(e) => setSt(e.target.value as typeof st)}>
            <option value="all">Todas</option>
            <option value="ativa">Ativas</option>
            <option value="agendada">Agendadas</option>
          </select>
          <button type="button" className={u.btnPrimaryGreen} onClick={() => setOpen(true)}>
            <FiPlus aria-hidden />
            Criar Nova Promoção
          </button>
        </div>
      </div>

      <div className={`${u.card} ${u.cardPadComfort}`}>
        <h2 className={u.cardTitle}>Promoções e Descontos</h2>
        <p className={u.cardSubtitle}>Gerencie cupons e campanhas promocionais</p>
        <div className={u.tableWrap}>
          <table className={u.table}>
            <thead>
              <tr>
                <th>Código</th>
                <th>Nome</th>
                <th>Tipo</th>
                <th>Aplicável a</th>
                <th>Limite / Usos</th>
                <th>Validade</th>
                <th>Status</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {filtradas.map((row) => {
                const pctBar = row.ilimitado ? 100 : Math.min(100, (row.usos / Math.max(row.limite, 1)) * 100)
                return (
                  <tr key={row.codigo}>
                    <td className={u.cellStrong}>{row.codigo}</td>
                    <td>
                      <span className={u.cellStrong}>{row.nome}</span>
                      <span className={u.promoDesc}>{row.descricao}</span>
                    </td>
                    <td>{row.tipo}</td>
                    <td>{row.aplicavel}</td>
                    <td>
                      {row.ilimitado ? (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                          <span className={u.cellStrong}>Ilimitado</span>
                          <span className={u.promoLimit}>{row.usos} usos</span>
                        </div>
                      ) : (
                        <>
                          <span className={u.cellStrong}>
                            {row.usos}/{row.limite}
                          </span>
                          <div className={u.promoProgress}>
                            <div className={u.promoProgressFill} style={{ width: `${pctBar}%` }} />
                          </div>
                        </>
                      )}
                    </td>
                    <td className={u.promoValidade}>
                      {row.inicio}
                      <br />
                      até {row.fim}
                    </td>
                    <td>
                      <span className={promoPill(row.status)}>{promoLabel(row.status)}</span>
                    </td>
                    <td>
                      <RowActionsMenu
                        items={[
                          {
                            label: row.status === 'ativa' ? 'Pausar (demo)' : 'Ativar (demo)',
                            onClick: () => {
                              setRows((prev) =>
                                prev.map((r) =>
                                  r.codigo === row.codigo
                                    ? { ...r, status: r.status === 'ativa' ? ('agendada' as const) : ('ativa' as const) }
                                    : r,
                                ),
                              )
                              setToast('Status atualizado.')
                            },
                          },
                          {
                            label: 'Excluir',
                            danger: true,
                            onClick: () => {
                              setRows((prev) => prev.filter((r) => r.codigo !== row.codigo))
                              setToast('Promoção removida.')
                            },
                          },
                        ]}
                      />
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}
