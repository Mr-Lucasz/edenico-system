'use client'

import { useEffect, useMemo, useState } from 'react'
import { FiCreditCard, FiDownload, FiFileText } from 'react-icons/fi'
import { downloadCsv } from '@src/lib/downloadFile'
import { MOCK_ASSINATURAS } from '@src/infrastructure/data/mockAdminFinanceiro'
import type { AssinaturaStatus } from '@src/infrastructure/data/mockAdminFinanceiro'
import { RowActionsMenu } from './RowActionsMenu'
import u from './financeiroUi.module.scss'

const money = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' })

type AssinRow = (typeof MOCK_ASSINATURAS)[number]

function statusPill(status: AssinaturaStatus) {
  if (status === 'ativa') return `${u.pillStatus} ${u.pillAtiva}`
  if (status === 'pendente') return `${u.pillStatus} ${u.pillPendente}`
  return `${u.pillStatus} ${u.pillVencida}`
}

function statusLabel(status: AssinaturaStatus) {
  if (status === 'ativa') return 'Ativa'
  if (status === 'pendente') return 'Pendente'
  return 'Vencida'
}

function MetodoCell({ tipo }: { tipo: AssinRow['metodo'] }) {
  if (tipo === 'pix') {
    return (
      <span className={u.metodo}>
        <span style={{ fontSize: '0.65rem', fontWeight: 800, color: '#32bcad' }}>PIX</span>
        Pix
      </span>
    )
  }
  if (tipo === 'boleto') {
    return (
      <span className={u.metodo}>
        <FiFileText aria-hidden />
        Boleto
      </span>
    )
  }
  if (tipo === 'debito') {
    return (
      <span className={u.metodo}>
        <FiCreditCard aria-hidden />
        Débito automático
      </span>
    )
  }
  return (
    <span className={u.metodo}>
      <FiCreditCard aria-hidden />
      Cartão de Crédito
    </span>
  )
}

function norm(s: string) {
  return s.toLowerCase().replace(/\D/g, '')
}

export function FinanceiroAssinaturasTab() {
  const [rows, setRows] = useState<AssinRow[]>(() => [...MOCK_ASSINATURAS])
  const [q, setQ] = useState('')
  const [st, setSt] = useState<'all' | AssinaturaStatus>('all')
  const [plano, setPlano] = useState<'all' | 'Mensal' | 'Trimestral' | 'Anual'>('all')
  const [toast, setToast] = useState<string | null>(null)

  useEffect(() => {
    if (!toast) return
    const t = window.setTimeout(() => setToast(null), 2800)
    return () => window.clearTimeout(t)
  }, [toast])

  const filtradas = useMemo(() => {
    return rows.filter((row) => {
      if (st !== 'all' && row.status !== st) return false
      if (plano !== 'all' && row.plano !== plano) return false
      if (q.trim()) {
        const n = norm(q)
        const hay = `${row.estudante} ${row.email} ${row.cpfResp} ${row.nomeResp}`.toLowerCase()
        const hayN = norm(hay)
        if (!hay.includes(q.trim().toLowerCase()) && !hayN.includes(n)) return false
      }
      return true
    })
  }, [rows, q, st, plano])

  function exportLista() {
    const stamp = new Date().toISOString().slice(0, 10)
    downloadCsv(
      `edenicos-assinaturas-filtradas-${stamp}.csv`,
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
      filtradas.map((r) => ({
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
    setToast('Lista exportada conforme filtros.')
  }

  return (
    <>
      {toast ? (
        <div role="status" aria-live="polite" className={u.liveToast}>
          {toast}
        </div>
      ) : null}
      <div className={`${u.card} ${u.cardPad}`} style={{ marginBottom: '1rem' }}>
        <h2 className={u.filterTitle}>Filtros</h2>
        <div className={u.filterGrid}>
          <div className={`${u.inputWrap} ${u.filterSearch}`}>
            <span className={u.inputIcon} aria-hidden>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8" />
                <path d="M21 21l-4.35-4.35" />
              </svg>
            </span>
            <input
              type="search"
              className={u.textInput}
              placeholder="Buscar por nome, email ou CPF"
              aria-label="Buscar assinaturas"
              value={q}
              onChange={(e) => setQ(e.target.value)}
            />
          </div>
          <select
            className={u.selectLike}
            aria-label="Status"
            value={st}
            onChange={(e) => setSt(e.target.value as typeof st)}
          >
            <option value="all">Todos os Status</option>
            <option value="ativa">Ativa</option>
            <option value="pendente">Pendente</option>
            <option value="vencida">Vencida</option>
          </select>
          <select
            className={u.selectLike}
            aria-label="Plano"
            value={plano}
            onChange={(e) => setPlano(e.target.value as typeof plano)}
          >
            <option value="all">Todos os Planos</option>
            <option value="Mensal">Mensal</option>
            <option value="Trimestral">Trimestral</option>
            <option value="Anual">Anual</option>
          </select>
        </div>
        <div className={u.filterFooter}>
          <span>
            Exibindo {filtradas.length} de {rows.length} assinaturas
          </span>
          <button type="button" className={u.btnOutline} onClick={exportLista}>
            <FiDownload aria-hidden />
            Exportar Lista
          </button>
        </div>
      </div>

      <div className={`${u.card} ${u.cardPad}`}>
        <h2 className={u.cardTitle}>Assinaturas</h2>
        <p className={u.cardSubtitle}>Gerencie todas as assinaturas da plataforma</p>
        <div className={u.tableWrap}>
          <table className={u.table}>
            <thead>
              <tr>
                <th>Estudante</th>
                <th>CPF Responsável</th>
                <th>Plano</th>
                <th>Valor</th>
                <th>Método</th>
                <th>Status</th>
                <th>Próximo Vencimento</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {filtradas.map((row) => (
                <tr key={row.email}>
                  <td>
                    <span className={u.cellStrong}>{row.estudante}</span>
                    <span className={u.cellMuted}>{row.email}</span>
                  </td>
                  <td>
                    <span className={u.cellStrong}>{row.cpfResp}</span>
                    <span className={u.cellMuted}>{row.nomeResp}</span>
                  </td>
                  <td>
                    <span className={u.pillPlano}>{row.plano}</span>
                  </td>
                  <td className={u.cellStrong}>{money.format(row.valor)}</td>
                  <td>
                    <MetodoCell tipo={row.metodo} />
                  </td>
                  <td>
                    <span className={statusPill(row.status)}>{statusLabel(row.status)}</span>
                  </td>
                  <td>{row.vencimento}</td>
                  <td>
                    <RowActionsMenu
                      items={[
                        {
                          label: 'Ver detalhes',
                          onClick: () =>
                            setToast(`${row.estudante} · ${row.plano} · ${money.format(row.valor)}`),
                        },
                        {
                          label: 'Remover da lista (demo)',
                          danger: true,
                          onClick: () => {
                            setRows((prev) => prev.filter((r) => r.email !== row.email))
                            setToast('Assinatura removida apenas nesta sessão.')
                          },
                        },
                      ]}
                    />
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
