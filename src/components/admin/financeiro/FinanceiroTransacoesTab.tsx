'use client'

import { format, isValid, parse, parseISO, startOfDay } from 'date-fns'
import { useEffect, useMemo, useState } from 'react'
import {
  FiCalendar,
  FiCreditCard,
  FiDownload,
  FiEye,
  FiFileText,
  FiPlus,
} from 'react-icons/fi'
import { downloadCsv } from '@src/lib/downloadFile'
import {
  MOCK_GATEWAY_TXNS,
  type GatewayMetodoTipo,
  type GatewayTxnRow,
  type GatewayTxnStatus,
} from '@src/infrastructure/data/mockFinanceiroV2'
import base from './financeiroUi.module.scss'
import v2 from './financeiroV2.module.scss'

const money = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' })

function parseMoneyBR(input: string) {
  const s = input.trim().replace(/\s/g, '')
  if (!s) return Number.NaN
  if (s.includes(',') && s.includes('.')) return Number.parseFloat(s.replace(/\./g, '').replace(',', '.'))
  if (s.includes(',')) return Number.parseFloat(s.replace(',', '.'))
  return Number.parseFloat(s)
}

function parseDataTxn(dataHora: string) {
  const part = dataHora.split(/\s+/)[0] ?? ''
  const p = parse(part, 'dd/MM/yyyy', new Date())
  return isValid(p) ? startOfDay(p) : null
}

function pillClass(s: GatewayTxnStatus) {
  if (s === 'aprovado') return `${base.pillStatus} ${v2.pillAprovado}`
  if (s === 'pendente') return `${base.pillStatus} ${v2.pillPendenteTxn}`
  return `${base.pillStatus} ${v2.pillFalhado}`
}

function labelStatus(s: GatewayTxnStatus) {
  if (s === 'aprovado') return 'Aprovado'
  if (s === 'pendente') return 'Pendente'
  return 'Falhado'
}

function MetodoIconeInline({ tipo }: { tipo: GatewayMetodoTipo }) {
  if (tipo === 'pix') return <span style={{ fontSize: '0.6rem', fontWeight: 800, color: '#32bcad' }}>PIX</span>
  if (tipo === 'boleto') return <FiFileText aria-hidden />
  if (tipo === 'debito') return <FiCalendar aria-hidden />
  return <FiCreditCard aria-hidden />
}

function nextTxnId(rows: GatewayTxnRow[]) {
  let max = 0
  for (const r of rows) {
    const m = /^txn-(\d+)$/i.exec(r.id)
    if (m) max = Math.max(max, Number.parseInt(m[1], 10))
  }
  return `txn-${String(max + 1).padStart(3, '0')}`
}

export function FinanceiroTransacoesTab() {
  const [rows, setRows] = useState<GatewayTxnRow[]>(() => [...MOCK_GATEWAY_TXNS])
  const [q, setQ] = useState('')
  const [st, setSt] = useState<'all' | GatewayTxnStatus>('all')
  const [mt, setMt] = useState<'all' | GatewayMetodoTipo>('all')
  const [dateOpen, setDateOpen] = useState(false)
  const [novoOpen, setNovoOpen] = useState(false)
  const [detail, setDetail] = useState<GatewayTxnRow | null>(null)
  const [fromIso, setFromIso] = useState('')
  const [toIso, setToIso] = useState('')
  const [appliedFrom, setAppliedFrom] = useState<Date | null>(null)
  const [appliedTo, setAppliedTo] = useState<Date | null>(null)
  const [toast, setToast] = useState<string | null>(null)

  const [fEst, setFEst] = useState('')
  const [fEmail, setFEmail] = useState('')
  const [fDesc, setFDesc] = useState('')
  const [fMet, setFMet] = useState<GatewayMetodoTipo>('pix')
  const [fValor, setFValor] = useState('')
  const [fSt, setFSt] = useState<GatewayTxnStatus>('aprovado')

  useEffect(() => {
    if (!toast) return
    const t = window.setTimeout(() => setToast(null), 2800)
    return () => window.clearTimeout(t)
  }, [toast])

  const visiveis = useMemo(() => {
    const qt = q.trim().toLowerCase()
    return rows.filter((r) => {
      if (st !== 'all' && r.status !== st) return false
      if (mt !== 'all' && r.metodoTipo !== mt) return false
      if (qt) {
        const blob = `${r.id} ${r.estudante} ${r.email} ${r.descricao} ${r.gatewayId}`.toLowerCase()
        if (!blob.includes(qt)) return false
      }
      if (appliedFrom || appliedTo) {
        const d = parseDataTxn(r.dataHora)
        if (d) {
          if (appliedFrom && d < appliedFrom) return false
          if (appliedTo && d > appliedTo) return false
        }
      }
      return true
    })
  }, [rows, q, st, mt, appliedFrom, appliedTo])

  const stats = useMemo(() => {
    const total = visiveis.length
    const valorTotal = visiveis.reduce((s, r) => s + r.valor, 0)
    const aprov = visiveis.filter((r) => r.status === 'aprovado').length
    const falh = visiveis.filter((r) => r.status === 'falhado').length
    return { total, valorTotal, aprov, falh }
  }, [visiveis])

  function aplicarDatas() {
    const a = fromIso && isValid(parseISO(fromIso)) ? startOfDay(parseISO(fromIso)) : null
    const b = toIso && isValid(parseISO(toIso)) ? startOfDay(parseISO(toIso)) : null
    if (a && b && a > b) {
      setToast('Data inicial não pode ser maior que a final.')
      return
    }
    setAppliedFrom(a)
    setAppliedTo(b)
    setDateOpen(false)
    setToast('Filtro de datas aplicado.')
  }

  function limparDatas() {
    setFromIso('')
    setToIso('')
    setAppliedFrom(null)
    setAppliedTo(null)
    setDateOpen(false)
    setToast('Filtro de datas limpo.')
  }

  function exportar() {
    const stamp = new Date().toISOString().slice(0, 10)
    downloadCsv(
      `edenicos-transacoes-gateway-${stamp}.csv`,
      [
        { key: 'id', header: 'ID' },
        { key: 'dataHora', header: 'Data/Hora' },
        { key: 'estudante', header: 'Estudante' },
        { key: 'email', header: 'E-mail' },
        { key: 'descricao', header: 'Descrição' },
        { key: 'metodo', header: 'Método' },
        { key: 'valor', header: 'Valor' },
        { key: 'status', header: 'Status' },
        { key: 'gatewayId', header: 'ID Gateway' },
      ],
      visiveis.map((r) => ({
        id: r.id,
        dataHora: r.dataHora,
        estudante: r.estudante,
        email: r.email,
        descricao: r.descricao,
        metodo: r.metodoLabel,
        valor: r.valor,
        status: labelStatus(r.status),
        gatewayId: r.gatewayId,
      })),
    )
    setToast('CSV exportado.')
  }

  function metodoLabelForTipo(t: GatewayMetodoTipo): string {
    if (t === 'pix') return 'PIX'
    if (t === 'boleto') return 'Boleto'
    if (t === 'debito') return 'Débito automático'
    return 'Cartão de Crédito **** 4242'
  }

  function salvarNovo(e: React.FormEvent) {
    e.preventDefault()
    const valor = parseMoneyBR(fValor)
    if (!fEst.trim() || !fEmail.trim() || !fDesc.trim() || !Number.isFinite(valor) || valor <= 0) {
      setToast('Preencha estudante, e-mail, descrição e valor válido.')
      return
    }
    const agora = format(new Date(), 'dd/MM/yyyy HH:mm')
    const novo: GatewayTxnRow = {
      id: nextTxnId(rows),
      dataHora: agora,
      estudante: fEst.trim(),
      email: fEmail.trim(),
      descricao: fDesc.trim(),
      metodoTipo: fMet,
      metodoLabel: metodoLabelForTipo(fMet),
      valor,
      status: fSt,
      gatewayId: `gw_live_${Date.now().toString(36)}${Math.random().toString(36).slice(2, 8)}`,
    }
    setRows((p) => [novo, ...p])
    setNovoOpen(false)
    setFEst('')
    setFEmail('')
    setFDesc('')
    setFValor('')
    setToast('Transação registrada (sessão).')
  }

  const cardBox = `${base.card} ${base.cardPad}`

  return (
    <>
      {toast ? (
        <div role="status" aria-live="polite" className={base.liveToast}>
          {toast}
        </div>
      ) : null}

      {dateOpen ? (
        <div
          className={base.modalOverlay}
          role="presentation"
          onMouseDown={(e) => e.target === e.currentTarget && setDateOpen(false)}
        >
          <div className={base.modalPanel} role="dialog" aria-modal="true" aria-labelledby="ft-date-title">
            <div className={base.modalHeader}>
              <h2 id="ft-date-title" className={base.modalTitle}>
                Filtrar por data
              </h2>
              <button type="button" className={base.modalClose} onClick={() => setDateOpen(false)} aria-label="Fechar">
                ×
              </button>
            </div>
            <div className={base.modalBody}>
              <div className={base.field}>
                <label className={base.fieldLabel} htmlFor="ft-d1">
                  De
                </label>
                <input id="ft-d1" type="date" className={base.fieldInput} value={fromIso} onChange={(e) => setFromIso(e.target.value)} />
              </div>
              <div className={base.field}>
                <label className={base.fieldLabel} htmlFor="ft-d2">
                  Até
                </label>
                <input id="ft-d2" type="date" className={base.fieldInput} value={toIso} onChange={(e) => setToIso(e.target.value)} />
              </div>
            </div>
            <div className={base.modalFooter}>
              <button type="button" className={base.btnOutline} onClick={limparDatas}>
                Limpar
              </button>
              <button type="button" className={base.btnPrimaryBlue} onClick={aplicarDatas}>
                Aplicar
              </button>
            </div>
          </div>
        </div>
      ) : null}

      {novoOpen ? (
        <div
          className={base.modalOverlay}
          role="presentation"
          onMouseDown={(e) => e.target === e.currentTarget && setNovoOpen(false)}
        >
          <div className={base.modalPanel} role="dialog" aria-modal="true" aria-labelledby="ft-novo-title">
            <div className={base.modalHeader}>
              <h2 id="ft-novo-title" className={base.modalTitle}>
                Nova transação
              </h2>
              <button type="button" className={base.modalClose} onClick={() => setNovoOpen(false)} aria-label="Fechar">
                ×
              </button>
            </div>
            <form onSubmit={salvarNovo}>
              <div className={base.modalBody}>
                <div className={base.field}>
                  <label className={base.fieldLabel} htmlFor="ft-nm">
                    Estudante
                  </label>
                  <input id="ft-nm" className={base.fieldInput} value={fEst} onChange={(e) => setFEst(e.target.value)} required />
                </div>
                <div className={base.field}>
                  <label className={base.fieldLabel} htmlFor="ft-em">
                    E-mail
                  </label>
                  <input id="ft-em" type="email" className={base.fieldInput} value={fEmail} onChange={(e) => setFEmail(e.target.value)} required />
                </div>
                <div className={base.field}>
                  <label className={base.fieldLabel} htmlFor="ft-ds">
                    Descrição
                  </label>
                  <input id="ft-ds" className={base.fieldInput} value={fDesc} onChange={(e) => setFDesc(e.target.value)} required />
                </div>
                <div className={base.field}>
                  <label className={base.fieldLabel} htmlFor="ft-mt">
                    Método
                  </label>
                  <select id="ft-mt" className={base.fieldSelect} value={fMet} onChange={(e) => setFMet(e.target.value as GatewayMetodoTipo)}>
                    <option value="cartao">Cartão</option>
                    <option value="pix">PIX</option>
                    <option value="boleto">Boleto</option>
                    <option value="debito">Débito automático</option>
                  </select>
                </div>
                <div className={base.field}>
                  <label className={base.fieldLabel} htmlFor="ft-vl">
                    Valor (R$)
                  </label>
                  <input
                    id="ft-vl"
                    className={base.fieldInput}
                    inputMode="decimal"
                    placeholder="ex: 150,00"
                    value={fValor}
                    onChange={(e) => setFValor(e.target.value)}
                    required
                  />
                </div>
                <div className={base.field}>
                  <label className={base.fieldLabel} htmlFor="ft-st">
                    Status
                  </label>
                  <select id="ft-st" className={base.fieldSelect} value={fSt} onChange={(e) => setFSt(e.target.value as GatewayTxnStatus)}>
                    <option value="aprovado">Aprovado</option>
                    <option value="pendente">Pendente</option>
                    <option value="falhado">Falhado</option>
                  </select>
                </div>
              </div>
              <div className={base.modalFooter}>
                <button type="button" className={base.btnOutline} onClick={() => setNovoOpen(false)}>
                  Cancelar
                </button>
                <button type="submit" className={base.btnPrimaryBlue}>
                  Salvar
                </button>
              </div>
            </form>
          </div>
        </div>
      ) : null}

      {detail ? (
        <div
          className={base.modalOverlay}
          role="presentation"
          onMouseDown={(e) => e.target === e.currentTarget && setDetail(null)}
        >
          <div className={base.modalPanel} role="dialog" aria-modal="true" aria-labelledby="ft-det-title">
            <div className={base.modalHeader}>
              <h2 id="ft-det-title" className={base.modalTitle}>
                Detalhe da transação
              </h2>
              <button type="button" className={base.modalClose} onClick={() => setDetail(null)} aria-label="Fechar">
                ×
              </button>
            </div>
            <div className={base.modalBody}>
              <p className={v2.detailMono}>
                <strong>ID:</strong> {detail.id}
                <br />
                <strong>Data/Hora:</strong> {detail.dataHora}
                <br />
                <strong>Estudante:</strong> {detail.estudante}
                <br />
                <strong>E-mail:</strong> {detail.email}
                <br />
                <strong>Descrição:</strong> {detail.descricao}
                <br />
                <strong>Método:</strong> {detail.metodoLabel}
                <br />
                <strong>Valor:</strong> {money.format(detail.valor)}
                <br />
                <strong>Status:</strong> {labelStatus(detail.status)}
                <br />
                <strong>Gateway:</strong> {detail.gatewayId}
              </p>
            </div>
            <div className={base.modalFooter}>
              <button type="button" className={base.btnPrimaryBlue} onClick={() => setDetail(null)}>
                Fechar
              </button>
            </div>
          </div>
        </div>
      ) : null}

      <div className={v2.txnHeaderRow}>
        <div className={base.filterRowTop} style={{ marginBottom: 0 }}>
          <button type="button" className={base.btnOutline} onClick={() => setDateOpen(true)}>
            Filtrar por data
          </button>
          <button type="button" className={base.btnOutline} onClick={exportar}>
            <FiDownload aria-hidden />
            Exportar
          </button>
        </div>
        <button type="button" className={base.btnPrimaryBlue} onClick={() => setNovoOpen(true)}>
          <FiPlus aria-hidden />
          Novo lançamento
        </button>
      </div>

      <div className={`${cardBox} ${v2.txnFilterCard}`}>
        <h2 className={base.filterTitle}>Filtros</h2>
        <div className={base.filterGrid}>
          <div className={`${base.inputWrap} ${base.filterSearch}`}>
            <span className={base.inputIcon} aria-hidden>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8" />
                <path d="M21 21l-4.35-4.35" />
              </svg>
            </span>
            <input
              type="search"
              className={base.textInput}
              placeholder="Buscar por ID ou nome do estudante"
              aria-label="Buscar transações"
              value={q}
              onChange={(e) => setQ(e.target.value)}
            />
          </div>
          <select className={base.selectLike} value={st} onChange={(e) => setSt(e.target.value as typeof st)} aria-label="Status">
            <option value="all">Todos os status</option>
            <option value="aprovado">Aprovado</option>
            <option value="pendente">Pendente</option>
            <option value="falhado">Falhado</option>
          </select>
          <select className={base.selectLike} value={mt} onChange={(e) => setMt(e.target.value as typeof mt)} aria-label="Método">
            <option value="all">Todos os métodos</option>
            <option value="cartao">Cartão</option>
            <option value="pix">PIX</option>
            <option value="boleto">Boleto</option>
            <option value="debito">Débito automático</option>
          </select>
        </div>
        <div className={v2.txnStats4}>
          <div className={v2.txnStatBox}>
            <p className={v2.txnStatLabel}>Total de transações</p>
            <p className={v2.txnStatValue}>{stats.total}</p>
          </div>
          <div className={v2.txnStatBox}>
            <p className={v2.txnStatLabel}>Valor total</p>
            <p className={v2.txnStatValue}>{money.format(stats.valorTotal)}</p>
          </div>
          <div className={v2.txnStatBox}>
            <p className={v2.txnStatLabel}>Aprovadas</p>
            <p className={`${v2.txnStatValue} ${v2.txnStatGreen}`}>{stats.aprov}</p>
          </div>
          <div className={v2.txnStatBox}>
            <p className={v2.txnStatLabel}>Falhadas</p>
            <p className={`${v2.txnStatValue} ${v2.txnStatRed}`}>{stats.falh}</p>
          </div>
        </div>
      </div>

      <div className={cardBox}>
        <h2 className={base.cardTitle}>Transações</h2>
        <p className={base.cardSubtitle}>
          Histórico completo de todas as transações · {visiveis.length} registro(s)
          {appliedFrom || appliedTo
            ? ` · ${appliedFrom ? format(appliedFrom, 'dd/MM/yyyy') : '…'} — ${appliedTo ? format(appliedTo, 'dd/MM/yyyy') : '…'}`
            : ''}
        </p>
        <div className={base.tableWrap}>
          <table className={base.table}>
            <thead>
              <tr>
                <th>ID</th>
                <th>Data/Hora</th>
                <th>Estudante</th>
                <th>Descrição</th>
                <th>Método</th>
                <th>Valor</th>
                <th>Status</th>
                <th>ID Gateway</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {visiveis.map((r) => (
                <tr key={r.id}>
                  <td className={base.cellStrong}>{r.id}</td>
                  <td style={{ whiteSpace: 'nowrap', fontSize: '0.8125rem' }}>{r.dataHora}</td>
                  <td>
                    <span className={base.cellStrong}>{r.estudante}</span>
                    <span className={base.cellMuted}>{r.email}</span>
                  </td>
                  <td>{r.descricao}</td>
                  <td>
                    <span className={v2.metodoCell}>
                      <MetodoIconeInline tipo={r.metodoTipo} />
                      {r.metodoTipo !== 'pix' ? <> {r.metodoLabel}</> : null}
                    </span>
                  </td>
                  <td className={base.cellStrong}>{money.format(r.valor)}</td>
                  <td>
                    <span className={pillClass(r.status)}>{labelStatus(r.status)}</span>
                  </td>
                  <td>
                    <span className={v2.gatewayId}>{r.gatewayId}</span>
                  </td>
                  <td>
                    <button type="button" className={v2.eyeBtn} aria-label="Ver detalhes" onClick={() => setDetail(r)}>
                      <FiEye />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}
