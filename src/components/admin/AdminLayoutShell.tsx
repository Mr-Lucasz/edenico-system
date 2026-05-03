'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import {
  FiBarChart2,
  FiBell,
  FiBookOpen,
  FiDollarSign,
  FiHeadphones,
  FiLogOut,
  FiMessageSquare,
  FiSearch,
  FiSettings,
  FiStar,
  FiUsers,
} from 'react-icons/fi'
import { AUTH_MOCK_ADMIN } from '@src/constants/authMockUser'
import styles from './AdminLayoutShell.module.scss'

type NavEntry =
  | { id: string; label: string; icon: React.ReactNode; href: string }
  | { id: string; label: string; icon: React.ReactNode; href?: undefined }

const NAV: NavEntry[] = [
  { id: 'dash', label: 'Dashboard', icon: <FiBarChart2 aria-hidden />, href: '/admin' },
  { id: 'fin', label: 'Financeiro', icon: <FiDollarSign aria-hidden />, href: '/admin/financeiro/dashboard' },
  { id: 'users', label: 'Gestão de Usuários', icon: <FiUsers aria-hidden />, href: '/admin/usuarios/dashboard' },
  { id: 'courses', label: 'Cursos', icon: <FiBookOpen aria-hidden />, href: '/admin/cursos' },
  { id: 'comms', label: 'Comunicações', icon: <FiMessageSquare aria-hidden /> },
  { id: 'support', label: 'Atendimento', icon: <FiHeadphones aria-hidden />, href: '/admin/atendimento' },
  { id: 'reviews', label: 'Avaliações', icon: <FiStar aria-hidden /> },
  { id: 'settings', label: 'Configurações', icon: <FiSettings aria-hidden /> },
]

type Notif = { id: string; tempo: string; texto: string; lida: boolean }

type Props = {
  children: React.ReactNode
}

function isNavActive(item: NavEntry, pathname: string): boolean {
  if (!item.href) return false
  if (item.id === 'dash') return pathname === '/admin'
  if (item.id === 'fin') return pathname.startsWith('/admin/financeiro')
  if (item.id === 'users') return pathname.startsWith('/admin/usuarios')
  if (item.id === 'courses') return pathname.startsWith('/admin/cursos')
  if (item.id === 'support') return pathname.startsWith('/admin/atendimento')
  return pathname === item.href
}

export function AdminLayoutShell({ children }: Props) {
  const pathname = usePathname()
  const [q, setQ] = useState('')
  const [searchHint, setSearchHint] = useState<string | null>(null)
  const [notifOpen, setNotifOpen] = useState(false)
  const [notifs, setNotifs] = useState<Notif[]>([
    { id: '1', tempo: 'Há 2 h', texto: 'Nova assinatura — Plano Mensal', lida: false },
    { id: '2', tempo: 'Ontem', texto: 'Fatura FT-2025-001 marcada como paga', lida: false },
  ])
  const notifWrapRef = useRef<HTMLDivElement>(null)

  const temNaoLida = notifs.some((n) => !n.lida)

  useEffect(() => {
    if (!searchHint) return
    const t = window.setTimeout(() => setSearchHint(null), 4000)
    return () => window.clearTimeout(t)
  }, [searchHint])

  useEffect(() => {
    if (!notifOpen) return
    const onDoc = (e: MouseEvent) => {
      if (!notifWrapRef.current?.contains(e.target as Node)) setNotifOpen(false)
    }
    document.addEventListener('mousedown', onDoc)
    return () => document.removeEventListener('mousedown', onDoc)
  }, [notifOpen])

  function onSearch(e: React.FormEvent) {
    e.preventDefault()
    const term = q.trim()
    if (!term) {
      setSearchHint('Digite um termo para buscar.')
      return
    }
    if (pathname.startsWith('/admin/financeiro')) {
      setSearchHint(`“${term}”: use os campos de busca nas abas do financeiro para filtrar tabelas (demo).`)
    } else if (pathname.startsWith('/admin/cursos')) {
      setSearchHint(`“${term}”: busca global de cursos e turmas será integrada à API (demo do painel).`)
    } else if (pathname.startsWith('/admin/atendimento')) {
      setSearchHint(`“${term}”: use a busca na lista de tickets para filtrar por número, título ou usuário (demo).`)
    } else if (pathname.startsWith('/admin/usuarios')) {
      setSearchHint(`“${term}”: use o campo de busca na Lista Geral para filtrar por nome, e-mail, CPF ou ID (demo).`)
    } else {
      setSearchHint(`Busca por “${term}” — módulos específicos terão busca integrada à API (demo).`)
    }
  }

  function abrirNotif(n: Notif) {
    setNotifs((prev) => prev.map((x) => (x.id === n.id ? { ...x, lida: true } : x)))
    setNotifOpen(false)
  }

  return (
    <div className={styles.shell}>
      <aside className={styles.sidebar}>
        <div className={styles.brand}>
          <div className={styles.brandIcon} aria-hidden>
            E
          </div>
          <div className={styles.brandText}>
            <span className={styles.brandTitle}>Edênicos</span>
            <span className={styles.brandSubtitle}>Painel Admin</span>
          </div>
        </div>

        <nav className={styles.nav} aria-label="Principal">
          {NAV.map((item) => {
            const active = isNavActive(item, pathname)
            const activeClass =
              active && item.id === 'courses' ? styles.navItemActiveCursos : active ? styles.navItemActive : ''
            const className = [styles.navItem, activeClass, item.href ? '' : styles.navItemMuted]
              .filter(Boolean)
              .join(' ')

            if (item.href) {
              return (
                <Link key={item.id} href={item.href} className={className}>
                  {item.icon}
                  {item.label}
                </Link>
              )
            }

            return (
              <span key={item.id} className={className} title="Em breve">
                {item.icon}
                {item.label}
              </span>
            )
          })}
        </nav>

        <div className={styles.footer}>
          <div className={styles.profile}>
            <div className={styles.avatar} aria-hidden>
              AD
            </div>
            <div className={styles.profileText}>
              <div className={styles.profileName}>{AUTH_MOCK_ADMIN.nome}</div>
              <div className={styles.profileEmail}>{AUTH_MOCK_ADMIN.email}</div>
            </div>
          </div>
          <Link href="/login" className={styles.logout}>
            <FiLogOut aria-hidden />
            Sair
          </Link>
        </div>
      </aside>

      <div className={styles.mainCol}>
        <header className={styles.topbar}>
          <div className={styles.searchCol}>
            <form className={styles.searchForm} onSubmit={onSearch} role="search">
              <FiSearch className={styles.searchIcon} aria-hidden />
              <input
                type="search"
                className={styles.searchInput}
                placeholder="Buscar..."
                aria-label="Buscar no painel"
                value={q}
                onChange={(e) => setQ(e.target.value)}
              />
            </form>
            {searchHint ? (
              <p className={styles.searchHint} role="status">
                {searchHint}
              </p>
            ) : null}
          </div>

          <div className={styles.topbarRight} ref={notifWrapRef}>
            <button
              type="button"
              className={styles.notifyBtn}
              aria-label="Notificações"
              aria-expanded={notifOpen}
              onClick={() => setNotifOpen((v) => !v)}
            >
              <FiBell aria-hidden />
              <span className={`${styles.notifyDot} ${!temNaoLida ? styles.notifyDotHidden : ''}`} aria-hidden />
            </button>
            {notifOpen ? (
              <div className={styles.notifPanel} role="menu">
                <div className={styles.notifPanelTitle}>Notificações</div>
                {notifs.map((n) => (
                  <button
                    key={n.id}
                    type="button"
                    role="menuitem"
                    className={`${styles.notifItem} ${!n.lida ? styles.notifItemUnread : ''}`}
                    onClick={() => abrirNotif(n)}
                  >
                    {n.texto}
                    <span className={styles.notifMeta}>{n.tempo}</span>
                  </button>
                ))}
              </div>
            ) : null}
          </div>
        </header>
        <div className={styles.content}>{children}</div>
      </div>
    </div>
  )
}
