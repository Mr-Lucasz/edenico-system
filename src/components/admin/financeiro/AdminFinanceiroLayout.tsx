'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import {
  FiActivity,
  FiBarChart2,
  FiCreditCard,
  FiDownload,
  FiFileText,
  FiSettings,
  FiTag,
  FiUsers,
} from 'react-icons/fi'
import { exportFinanceiroCsvForPath } from '@src/lib/financeiroExportByRoute'
import { FinanceiroSettingsModal } from './FinanceiroSettingsModal'
import u from './financeiroUi.module.scss'

const TABS = [
  { href: '/admin/financeiro/dashboard', label: 'Dashboard', icon: FiActivity },
  { href: '/admin/financeiro/assinaturas', label: 'Assinaturas', icon: FiUsers },
  { href: '/admin/financeiro/transacoes', label: 'Transações', icon: FiCreditCard },
  { href: '/admin/financeiro/faturas', label: 'Faturas', icon: FiFileText },
  { href: '/admin/financeiro/promocoes', label: 'Promoções', icon: FiTag },
  { href: '/admin/financeiro/relatorios', label: 'Relatórios', icon: FiBarChart2 },
] as const

function LiveToast({ message }: { message: string | null }) {
  if (!message) return null
  return (
    <div role="status" aria-live="polite" className={u.liveToast}>
      {message}
    </div>
  )
}

type Props = { children: React.ReactNode }

export function AdminFinanceiroLayout({ children }: Props) {
  const pathname = usePathname()
  const [settingsOpen, setSettingsOpen] = useState(false)
  const [toast, setToast] = useState<string | null>(null)

  useEffect(() => {
    if (!toast) return
    const t = window.setTimeout(() => setToast(null), 3200)
    return () => window.clearTimeout(t)
  }, [toast])

  function showToast(msg: string) {
    setToast(msg)
  }

  function handleExportHeader() {
    try {
      exportFinanceiroCsvForPath(pathname)
      showToast('Download do CSV iniciado.')
    } catch {
      showToast('Não foi possível exportar. Tente novamente.')
    }
  }

  return (
    <>
      <div className={u.pageHead}>
        <div>
          <h1 className={u.pageTitle}>Módulo Financeiro</h1>
          <p className={u.pageSubtitle}>Gestão completa de receitas, assinaturas e pagamentos</p>
        </div>
        <div className={u.headActions}>
          <button type="button" className={u.btnOutline} onClick={handleExportHeader}>
            <FiDownload aria-hidden />
            Exportar
          </button>
          <button type="button" className={u.btnOutline} onClick={() => setSettingsOpen(true)}>
            <FiSettings aria-hidden />
            Configurações
          </button>
        </div>
      </div>

      <div className={u.tabBar} role="tablist" aria-label="Seções financeiras">
        {TABS.map(({ href, label, icon: Icon }) => {
          const active = pathname === href
          return (
            <Link
              key={href}
              href={href}
              className={`${u.tab} ${active ? u.tabActive : ''}`}
              role="tab"
              aria-selected={active}
            >
              <Icon aria-hidden />
              {label}
            </Link>
          )
        })}
      </div>

      {children}

      <FinanceiroSettingsModal
        open={settingsOpen}
        onClose={() => setSettingsOpen(false)}
        onSaved={showToast}
      />
      <LiveToast message={toast} />
    </>
  )
}
