'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { FiDownload, FiSettings } from 'react-icons/fi'
import { downloadCsv } from '@src/lib/downloadFile'
import { USUARIOS_MOCK_ROWS } from '@src/infrastructure/data/mockGestaoUsuarios'
import { GestaoUsuariosSettingsModal } from './GestaoUsuariosSettingsModal'
import u from './gestaoUsuarios.module.scss'

const TABS = [
  { href: '/admin/usuarios/dashboard', label: 'Dashboard' },
  { href: '/admin/usuarios/lista', label: 'Lista Geral' },
  { href: '/admin/usuarios/estudantes', label: 'Estudantes' },
  { href: '/admin/usuarios/docentes', label: 'Docentes' },
  { href: '/admin/usuarios/responsaveis', label: 'Responsáveis' },
  { href: '/admin/usuarios/prestadores', label: 'Prestadores' },
  { href: '/admin/usuarios/relatorios', label: 'Relatórios' },
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

export function AdminUsuariosLayout({ children }: Props) {
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

  function handleExport() {
    const stamp = new Date().toISOString().slice(0, 10)
    downloadCsv(
      `edenicos-usuarios-${stamp}.csv`,
      [
        { key: 'id', header: 'ID' },
        { key: 'nome', header: 'Nome' },
        { key: 'email', header: 'E-mail' },
        { key: 'perfil', header: 'Perfil' },
        { key: 'cpf', header: 'CPF' },
        { key: 'telefone', header: 'Telefone' },
        { key: 'status', header: 'Status' },
        { key: 'ultimoAcesso', header: 'Último acesso' },
        { key: 'unidade', header: 'Unidade' },
      ],
      USUARIOS_MOCK_ROWS.map((r) => ({
        id: r.id,
        nome: r.nome,
        email: r.email,
        perfil: r.perfil,
        cpf: r.cpf,
        telefone: r.telefone,
        status: r.status,
        ultimoAcesso: r.ultimoAcesso,
        unidade: r.unidade,
      })),
    )
    showToast('Exportação CSV iniciada.')
  }

  return (
    <>
      <div className={u.pageHead}>
        <div>
          <h1 className={u.pageTitle}>Gestão de Usuários</h1>
          <p className={u.pageSubtitle}>Gerencie estudantes, docentes, responsáveis e permissões.</p>
        </div>
        <div className={u.headActions}>
          <button type="button" className={u.btnOutline} onClick={handleExport}>
            <FiDownload aria-hidden />
            Exportar
          </button>
          <button type="button" className={u.btnOutline} onClick={() => setSettingsOpen(true)}>
            <FiSettings aria-hidden />
            Configurações
          </button>
        </div>
      </div>

      <div className={u.tabBar} role="tablist" aria-label="Seções de usuários">
        {TABS.map(({ href, label }) => {
          const active = pathname === href
          return (
            <Link
              key={href}
              href={href}
              className={`${u.tab} ${active ? u.tabActive : ''}`}
              role="tab"
              aria-selected={active}
            >
              {label}
            </Link>
          )
        })}
      </div>

      {children}

      <GestaoUsuariosSettingsModal
        open={settingsOpen}
        onClose={() => setSettingsOpen(false)}
        onSaved={showToast}
      />
      <LiveToast message={toast} />
    </>
  )
}
