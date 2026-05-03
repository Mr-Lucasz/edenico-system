'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { FiBook, FiAward, FiUsers, FiUser, FiBell, FiHome, FiMessageCircle, FiSettings, FiSearch, FiLogOut } from 'react-icons/fi'
import { Avatar } from '@src/components/ui'
import { cn } from '@src/utils/cn'
import { startNavigationProgress } from '@src/lib/navigationProgress'
import styles from './Navbar.module.scss'

interface NavLink {
  label: string
  icon: React.ReactNode
  href: string
  id: string
}

function isCoursePlayerPath(pathname: string): boolean {
  const parts = pathname.split('/').filter(Boolean)
  return parts[0] === 'cursos' && parts.length === 2 && parts[1] !== 'nivel'
}

function navIdFromPath(pathname: string): string {
  if (pathname.startsWith('/cursos')) return 'cursos'
  if (pathname.startsWith('/conquistas')) return 'conquistas'
  if (pathname.startsWith('/comunidade')) return 'comunidade'
  if (pathname.startsWith('/perfil')) return 'perfil'
  if (pathname.startsWith('/dashboard')) return 'dashboard'
  if (
    pathname.startsWith('/notificacoes') ||
    pathname.startsWith('/mensagens') ||
    pathname.startsWith('/eventos')
  ) {
    return ''
  }
  return 'dashboard'
}

export function Navbar() {
  const pathname = usePathname()
  const router = useRouter()
  const activeNavId = navIdFromPath(pathname || '/')
  const isCursosArea = pathname.startsWith('/cursos')
  const isConquistasPage = pathname.startsWith('/conquistas')
  const isComunidadePage = pathname.startsWith('/comunidade')
  const isPerfilPage = pathname.startsWith('/perfil')
  /** Badges + Conectado: Cursos, Conquistas e Comunidade (Game) */
  const showRichHeader = isCursosArea || isConquistasPage || isComunidadePage
  const showCourseSettings = isCoursePlayerPath(pathname || '')

  const navLinks: NavLink[] = [
    {
      label: 'Dashboard',
      icon: <FiHome style={{ width: '1rem', height: '1rem' }} />,
      href: '/dashboard',
      id: 'dashboard',
    },
    { label: 'Meus Cursos', icon: <FiBook style={{ width: '1rem', height: '1rem' }} />, href: '/cursos', id: 'cursos' },
    { label: 'Conquistas', icon: <FiAward style={{ width: '1rem', height: '1rem' }} />, href: '/conquistas', id: 'conquistas' },
    { label: 'Comunidade', icon: <FiUsers style={{ width: '1rem', height: '1rem' }} />, href: '/comunidade', id: 'comunidade' },
    { label: 'Perfil', icon: <FiUser style={{ width: '1rem', height: '1rem' }} />, href: '/perfil', id: 'perfil' },
  ]

  const linkClass = (linkId: string, isActive: boolean) => {
    if (!isActive) return styles.link
    if (linkId === 'cursos' && isCursosArea) return styles.linkActiveGreen
    if (linkId === 'conquistas' && isConquistasPage) return styles.linkActiveConquistas
    if (linkId === 'comunidade' && isComunidadePage) return styles.linkActiveComunidade
    if (linkId === 'perfil' && isPerfilPage) return styles.linkActivePerfil
    return styles.linkActive
  }

  return (
    <nav className={styles.nav}>
      <div className={styles.inner}>
        <div className={cn(styles.row, (showRichHeader || isPerfilPage) && styles.rowCursos)}>
          <Link href="/dashboard" className={styles.logoRow}>
            <div className={styles.logoMark}>E</div>
            <span className={styles.logoText}>Edênicos Academy</span>
          </Link>

          <div className={styles.links}>
            {navLinks.map((link) => {
              const isActive = activeNavId !== '' && activeNavId === link.id
              return (
                <Link key={link.id} href={link.href} className={linkClass(link.id, isActive)}>
                  {link.icon}
                  {link.label}
                </Link>
              )
            })}
          </div>

          <div className={cn(styles.right, (showRichHeader || isPerfilPage) && styles.rightCursos)}>
            {showRichHeader || isPerfilPage ? (
              <>
                {isPerfilPage ? (
                  <button type="button" className={styles.iconBtn} aria-label="Pesquisar">
                    <FiSearch style={{ width: '1.25rem', height: '1.25rem' }} />
                  </button>
                ) : null}
                <Link
                  href="/comunidade/social"
                  className={styles.iconBtn}
                  aria-label="Social e amigos, 2 pendentes"
                  onClick={() => startNavigationProgress()}
                >
                  <FiUsers style={{ width: '1.25rem', height: '1.25rem' }} aria-hidden />
                  <span className={cn(styles.notifyBadge, styles.badgeGreen)} aria-hidden>
                    2
                  </span>
                </Link>
                <Link
                  href="/notificacoes"
                  className={styles.iconBtn}
                  aria-label="Notificações, 3 novas"
                  onClick={() => startNavigationProgress()}
                >
                  <FiBell style={{ width: '1.25rem', height: '1.25rem' }} aria-hidden />
                  <span className={cn(styles.notifyBadge, styles.badgeRed)} aria-hidden>
                    3
                  </span>
                </Link>
                {showCourseSettings ? (
                  <button
                    type="button"
                    className={styles.settingsBtn}
                    aria-label="Definições do curso"
                    onClick={() => {
                      startNavigationProgress()
                      router.push('/perfil')
                    }}
                  >
                    <FiSettings style={{ width: '1.1rem', height: '1.1rem' }} />
                  </button>
                ) : null}
                <Link
                  href="/perfil"
                  className={isPerfilPage ? styles.userRow : styles.userCol}
                  onClick={() => startNavigationProgress()}
                >
                  <Avatar name="Sofia" size="sm" tone={showRichHeader || isPerfilPage ? 'brandBlue' : undefined} />
                  {isPerfilPage ? (
                    <span className={styles.userName}>Sofia</span>
                  ) : (
                    <div className={styles.userTexts}>
                      <span className={styles.userNameCursos}>Sofia</span>
                      <span className={styles.connected}>
                        <span className={styles.connectedDot} aria-hidden />
                        Conectado
                      </span>
                    </div>
                  )}
                </Link>
                <Link
                  href="/login"
                  className={cn(styles.iconBtn, styles.logoutBtn)}
                  aria-label="Sair da conta"
                  title="Sair"
                  onClick={() => startNavigationProgress()}
                >
                  <FiLogOut style={{ width: '1.25rem', height: '1.25rem' }} aria-hidden />
                </Link>
              </>
            ) : (
              <>
                <button
                  type="button"
                  className={styles.iconBtn}
                  aria-label="Notificações"
                  onClick={() => {
                    startNavigationProgress()
                    router.push('/notificacoes')
                  }}
                >
                  <FiBell style={{ width: '1.25rem', height: '1.25rem' }} />
                  <span className={cn(styles.notifyDot, styles.dotRed)} aria-hidden />
                </button>
                <button
                  type="button"
                  className={styles.iconBtn}
                  aria-label="Mensagens"
                  onClick={() => {
                    startNavigationProgress()
                    router.push('/mensagens')
                  }}
                >
                  <FiMessageCircle style={{ width: '1.25rem', height: '1.25rem' }} />
                  <span className={cn(styles.notifyDot, styles.dotGreen)} aria-hidden />
                </button>
                <Link href="/perfil" className={styles.userRow} onClick={() => startNavigationProgress()}>
                  <Avatar name="Sofia" size="sm" />
                  <span className={styles.userName}>Sofia</span>
                </Link>
                <Link
                  href="/login"
                  className={cn(styles.iconBtn, styles.logoutBtn)}
                  aria-label="Sair da conta"
                  title="Sair"
                  onClick={() => startNavigationProgress()}
                >
                  <FiLogOut style={{ width: '1.25rem', height: '1.25rem' }} aria-hidden />
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}
