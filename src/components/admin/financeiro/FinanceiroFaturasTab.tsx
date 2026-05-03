'use client'

import { useEffect, useMemo, useState } from 'react'
import { FiDownload, FiMoreVertical } from 'react-icons/fi'
import { downloadCsv, downloadTextFile } from '@src/lib/downloadFile'
import { MOCK_FATURAS } from '@src/infrastructure/data/mockAdminFinanceiro'
import type { FaturaStatus } from '@src/infrastructure/data/mockAdminFinanceiro'
import { RowActionsMenu } from './RowActionsMenu'
import u from './financeiroUi.module.scss'

const money = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' })

type FatRow = (typeof MOCK_FATURAS)[number]

function faturaPill(status: FaturaStatus) {
  if (status === 'paga') return `${u.pillStatus} ${u.pillPaga}`
  if (status === 'emitida') return `${u.pillStatus} ${u.pillEmitida}`
  return `${u.pillStatus} ${u.pillFaturaVencida}`
}

function faturaLabel(status: FaturaStatus) {
  if (status === 'paga') return 'Paga'
  if (status === 'emitida') return 'Emitida'
  return 'Vencida'
}

export function FinanceiroFaturasTab() {
  const [rows, setRows] = useState<FatRow[]>(() => [...MOCK_FATURAS])
  const [q, setQ] = useState('')
  const [st, setSt] = useState<'all' | FaturaStatus>('all')
  const [toast, setToast] = useState<string | null>(null)

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
      const blob = `${row.num} ${row.estudante} ${row.estudanteCpf} ${row.descricao}`.toLowerCase()
      return blob.includes(qt)
    })
  }, [rows, q, st])

  function exportFaturas() {
    const stamp = new Date().toISOString().slice(0, 10)
    downloadCsv(
      `edenicos-faturas-filtradas-${stamp}.csv`,
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
      filtradas.map((r) => ({ ...r })),
    )
    setToast('Faturas exportadas em CSV.')
  }

  function baixarPdf(row: FatRow) {
    const body = [
      `Edênicos Academy — Fatura ${row.num}`,
      `Estudante: ${row.estudante} (${row.estudanteCpf})`,
      `Emissão: ${row.emissao} · Vencimento: ${row.vencimento}`,
      `Descrição: ${row.descricao}`,
      `Valor: ${money.format(row.valor)}`,
      `Status: ${faturaLabel(row.status)}`,
      '',
      'Documento gerado em modo demonstração (texto).',
    ].join('\n')
    downloadTextFile(body, `fatura-${row.num.replace(/\//g, '-')}.txt`)
    setToast('Arquivo de demonstração baixado (.txt).')
  }

  return (
    <>
      {toast ? (
        <div role="status" aria-live="polite" className={u.liveToast}>
          {toast}
        </div>
      ) : null}
      <div className={`${u.card} ${u.cardPadComfort}`} style={{ marginBottom: '1rem' }}>
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
              placeholder="Buscar por número, nome ou CPF"
              aria-label="Buscar faturas"
              value={q}
              onChange={(e) => setQ(e.target.value)}
            />
          </div>
          <select className={u.selectLike} aria-label="Situação" value={st} onChange={(e) => setSt(e.target.value as typeof st)}>
            <option value="all">Todas</option>
            <option value="paga">Pagas</option>
            <option value="emitida">Emitidas</option>
            <option value="vencida">Vencidas</option>
          </select>
        </div>
      </div>

      <div className={`${u.card} ${u.cardPadComfort}`}>
        <h2 className={u.cardTitle}>Faturas</h2>
        <p className={u.cardSubtitle}>Gerenciar faturas e documentos fiscais</p>
        <div className={u.tableWrap}>
          <table className={u.table}>
            <thead>
              <tr>
                <th>Nº da Fatura</th>
                <th>Data de Emissão</th>
                <th>Estudante</th>
                <th>Descrição</th>
                <th>Valor</th>
                <th>Vencimento</th>
                <th>Status</th>
                <th>Documento</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {filtradas.map((row) => (
                <tr key={row.num}>
                  <td className={`${u.cellStrong} ${u.faturaNum}`}>{row.num}</td>
                  <td>{row.emissao}</td>
                  <td>
                    <span className={u.cellStrong}>{row.estudante}</span>
                    <span className={u.cellMuted}>{row.estudanteCpf}</span>
                  </td>
                  <td>{row.descricao}</td>
                  <td className={u.cellStrong}>{money.format(row.valor)}</td>
                  <td>{row.vencimento}</td>
                  <td>
                    <span className={faturaPill(row.status)}>{faturaLabel(row.status)}</span>
                  </td>
                  <td>
                    <button type="button" className={u.linkDoc} style={{ border: 'none', cursor: 'pointer' }} onClick={() => baixarPdf(row)}>
                      <FiDownload aria-hidden />
                      Baixar PDF
                    </button>
                  </td>
                  <td>
                    <RowActionsMenu
                      items={[
                        {
                          label: 'Marcar como paga',
                          onClick: () => {
                            setRows((prev) =>
                              prev.map((r) => (r.num === row.num ? { ...r, status: 'paga' as const } : r)),
                            )
                            setToast(`Fatura ${row.num} marcada como paga.`)
                          },
                        },
                        {
                          label: 'Remover (demo)',
                          danger: true,
                          onClick: () => {
                            setRows((prev) => prev.filter((r) => r.num !== row.num))
                            setToast('Fatura removida da lista.')
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
