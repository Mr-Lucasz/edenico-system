'use client'

import { useEffect, useState } from 'react'
import {
  FiAlertCircle,
  FiBarChart2,
  FiCalendar,
  FiDownload,
  FiFileText,
  FiSettings,
  FiTable,
  FiTag,
  FiTarget,
  FiUsers,
} from 'react-icons/fi'
import { downloadTextFile } from '@src/lib/downloadFile'
import u from './financeiroUi.module.scss'

const MESES_RECEITA: string[] = Array.from({ length: 12 }, (_, i) => {
  const mes = new Intl.DateTimeFormat('pt-BR', { month: 'long' }).format(new Date(2025, i, 1))
  const cap = mes.charAt(0).toUpperCase() + mes.slice(1)
  return `${cap} 2025`
})

const ANOS = ['2023', '2024', '2025', '2026'] as const
const INADIMPLENCIA = ['Últimos 7 dias', 'Últimos 30 dias', 'Últimos 90 dias'] as const
const PROMO_PERIODO = ['Esta Semana', 'Este Mês', 'Este Trimestre', 'Este Ano'] as const

export function FinanceiroRelatoriosTab() {
  const [toast, setToast] = useState<string | null>(null)
  const [mesReceita, setMesReceita] = useState<string>(() => MESES_RECEITA[10])
  const [anoReceita, setAnoReceita] = useState<string>('2025')
  const [inadimplencia, setInadimplencia] = useState<string>('Últimos 30 dias')
  const [promoPeriodo, setPromoPeriodo] = useState<string>('Este Mês')

  useEffect(() => {
    if (!toast) return
    const t = window.setTimeout(() => setToast(null), 2800)
    return () => window.clearTimeout(t)
  }, [toast])

  function demoArquivo(base: string, formato: 'pdf' | 'excel' | 'csv') {
    const ext = formato === 'pdf' ? 'txt' : formato === 'excel' ? 'csv' : 'csv'
    const label = formato === 'pdf' ? 'PDF (texto demo)' : formato === 'excel' ? 'Planilha CSV (demo)' : 'CSV (demo)'
    const body = [
      `Edênicos — ${base}`,
      `Gerado em ${new Date().toLocaleString('pt-BR')}`,
      '',
      'Arquivo de demonstração. Substitua pela exportação real quando a API estiver disponível.',
    ].join('\n')
    downloadTextFile(body, `${base.replace(/\s+/g, '-').toLowerCase()}-demo.${ext}`, 'text/plain;charset=utf-8')
    setToast(`${label} baixado.`)
  }

  return (
    <>
      {toast ? (
        <div role="status" aria-live="polite" className={u.liveToast}>
          {toast}
        </div>
      ) : null}

      <div className={u.relGrid}>
        <div className={u.relCard}>
          <div className={u.relCardHead}>
            <div className={`${u.relIcon} ${u.relIconBlue}`} aria-hidden>
              <FiBarChart2 />
            </div>
            <div>
              <h3 className={u.relCardTitle}>Relatório de Receita Mensal</h3>
              <p className={u.relCardDesc}>Receita total, novos assinantes e cancelamentos</p>
            </div>
          </div>
          <select className={u.relSelect} value={mesReceita} onChange={(e) => setMesReceita(e.target.value)} aria-label="Mês do relatório">
            {MESES_RECEITA.map((m) => (
              <option key={m} value={m}>
                {m}
              </option>
            ))}
          </select>
          <div className={u.relBtnRow}>
            <button type="button" className={u.relDocBtn} onClick={() => demoArquivo(`Receita mensal ${mesReceita}`, 'pdf')}>
              <FiFileText aria-hidden />
              PDF
            </button>
            <button type="button" className={u.relDocBtn} onClick={() => demoArquivo(`Receita mensal ${mesReceita}`, 'excel')}>
              <FiTable aria-hidden />
              Excel
            </button>
          </div>
        </div>

        <div className={u.relCard}>
          <div className={u.relCardHead}>
            <div className={`${u.relIcon} ${u.relIconGreen}`} aria-hidden>
              <FiCalendar />
            </div>
            <div>
              <h3 className={u.relCardTitle}>Relatório de Receita Anual</h3>
              <p className={u.relCardDesc}>Consolidado anual com comparativo mês a mês</p>
            </div>
          </div>
          <select className={u.relSelect} value={anoReceita} onChange={(e) => setAnoReceita(e.target.value)} aria-label="Ano do relatório">
            {ANOS.map((a) => (
              <option key={a} value={a}>
                {a}
              </option>
            ))}
          </select>
          <div className={u.relBtnRow}>
            <button type="button" className={u.relDocBtn} onClick={() => demoArquivo(`Receita anual ${anoReceita}`, 'pdf')}>
              <FiFileText aria-hidden />
              PDF
            </button>
            <button type="button" className={u.relDocBtn} onClick={() => demoArquivo(`Receita anual ${anoReceita}`, 'excel')}>
              <FiTable aria-hidden />
              Excel
            </button>
          </div>
        </div>

        <div className={u.relCard}>
          <div className={u.relCardHead}>
            <div className={`${u.relIcon} ${u.relIconPurple}`} aria-hidden>
              <FiUsers />
            </div>
            <div>
              <h3 className={u.relCardTitle}>Relatório de Assinaturas Ativas</h3>
              <p className={u.relCardDesc}>Lista completa de assinantes ativos</p>
            </div>
          </div>
          <div className={u.relBtnRow3}>
            <button type="button" className={u.relDocBtn} onClick={() => demoArquivo('Assinaturas ativas', 'pdf')}>
              <FiFileText aria-hidden />
              PDF
            </button>
            <button type="button" className={u.relDocBtn} onClick={() => demoArquivo('Assinaturas ativas', 'excel')}>
              <FiTable aria-hidden />
              Excel
            </button>
            <button type="button" className={u.relDocBtn} onClick={() => demoArquivo('Assinaturas ativas', 'csv')}>
              <FiDownload aria-hidden />
              CSV
            </button>
          </div>
        </div>

        <div className={u.relCard}>
          <div className={u.relCardHead}>
            <div className={`${u.relIcon} ${u.relIconRed}`} aria-hidden>
              <FiAlertCircle />
            </div>
            <div>
              <h3 className={u.relCardTitle}>Relatório de Inadimplência</h3>
              <p className={u.relCardDesc}>Pagamentos atrasados e em risco</p>
            </div>
          </div>
          <select
            className={u.relSelect}
            value={inadimplencia}
            onChange={(e) => setInadimplencia(e.target.value)}
            aria-label="Período de inadimplência"
          >
            {INADIMPLENCIA.map((p) => (
              <option key={p} value={p}>
                {p}
              </option>
            ))}
          </select>
          <div className={u.relBtnRow}>
            <button type="button" className={u.relDocBtn} onClick={() => demoArquivo(`Inadimplência ${inadimplencia}`, 'pdf')}>
              <FiFileText aria-hidden />
              PDF
            </button>
            <button type="button" className={u.relDocBtn} onClick={() => demoArquivo(`Inadimplência ${inadimplencia}`, 'excel')}>
              <FiTable aria-hidden />
              Excel
            </button>
          </div>
        </div>

        <div className={u.relCard}>
          <div className={u.relCardHead}>
            <div className={`${u.relIcon} ${u.relIconOrange}`} aria-hidden>
              <FiTag />
            </div>
            <div>
              <h3 className={u.relCardTitle}>Relatório de Promoções</h3>
              <p className={u.relCardDesc}>Efetividade e ROI de cupons</p>
            </div>
          </div>
          <select
            className={u.relSelect}
            value={promoPeriodo}
            onChange={(e) => setPromoPeriodo(e.target.value)}
            aria-label="Período do relatório de promoções"
          >
            {PROMO_PERIODO.map((p) => (
              <option key={p} value={p}>
                {p}
              </option>
            ))}
          </select>
          <div className={u.relBtnRow}>
            <button type="button" className={u.relDocBtn} onClick={() => demoArquivo(`Promoções ${promoPeriodo}`, 'pdf')}>
              <FiFileText aria-hidden />
              PDF
            </button>
            <button type="button" className={u.relDocBtn} onClick={() => demoArquivo(`Promoções ${promoPeriodo}`, 'excel')}>
              <FiTable aria-hidden />
              Excel
            </button>
          </div>
        </div>

        <div className={u.relCard}>
          <div className={u.relCardHead}>
            <div className={`${u.relIcon} ${u.relIconIndigo}`} aria-hidden>
              <FiTarget />
            </div>
            <div>
              <h3 className={u.relCardTitle}>Relatório Personalizado</h3>
              <p className={u.relCardDesc}>Crie relatórios com métricas customizadas</p>
            </div>
          </div>
          <button
            type="button"
            className={u.relWideBtn}
            onClick={() => setToast('Construtor de relatórios personalizados em desenvolvimento.')}
          >
            <FiSettings aria-hidden />
            Configurar Relatório
          </button>
        </div>
      </div>
    </>
  )
}
