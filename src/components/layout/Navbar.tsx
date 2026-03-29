'use client'

import { useState } from 'react'
import { FiBarChart2, FiBook, FiAward, FiUsers, FiUser, FiBell, FiMessageCircle } from 'react-icons/fi'
import { Avatar } from '@src/components/ui'
import { cn } from '@src/utils/cn'
import styles from './Navbar.module.scss'

interface NavLink {
  label: string
  icon: React.ReactNode
  href: string
  id: string
}

export function Navbar() {
  const [activeLink, setActiveLink] = useState('dashboard')

  const navLinks: NavLink[] = [
    { label: 'Dashboard', icon: <FiBarChart2 />, href: '/dashboard', id: 'dashboard' },
    { label: 'Meus Cursos', icon: <FiBook />, href: '/cursos', id: 'cursos' },
    { label: 'Conquistas', icon: <FiAward />, href: '/conquistas', id: 'conquistas' },
    { label: 'Comunidade', icon: <FiUsers />, href: '/comunidade', id: 'comunidade' },
    { label: 'Perfil', icon: <FiUser />, href: '/perfil', id: 'perfil' },
  ]

  return (
    <nav className={styles.nav}>
      <div className={styles.inner}>
        <div className={styles.row}>
          <div className={styles.logoRow}>
            <div className={styles.logoMark}>E</div>
            <span className={styles.logoText}>Edénicos Academy</span>
          </div>

          <div className={styles.links}>
            {navLinks.map((link) => {
              const isActive = activeLink === link.id
              return (
                <a
                  key={link.id}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault()
                    setActiveLink(link.id)
                  }}
                  className={cn(isActive ? styles.linkActive : styles.link)}
                >
                  {link.icon}
                  {link.label}
                </a>
              )
            })}
          </div>

          <div className={styles.right}>
            <button type="button" className={styles.iconBtn} aria-label="Notificações">
              <FiBell style={{ width: '1.25rem', height: '1.25rem' }} />
              <span className={cn(styles.notifyDot, styles.dotRed)} aria-hidden />
            </button>
            <button type="button" className={styles.iconBtn} aria-label="Mensagens">
              <FiMessageCircle style={{ width: '1.25rem', height: '1.25rem' }} />
              <span className={cn(styles.notifyDot, styles.dotGreen)} aria-hidden />
            </button>
            <div className={styles.userRow}>
              <Avatar name="Sofia" size="sm" />
              <span className={styles.userName}>Sofia</span>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}
