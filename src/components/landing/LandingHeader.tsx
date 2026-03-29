'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { FiHeadphones, FiMessageCircle, FiGlobe, FiChevronDown } from 'react-icons/fi'
import { cn } from '@src/utils/cn'
import styles from './LandingHeader.module.scss'

export function LandingHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [langOpen, setLangOpen] = useState(false)
  const [logoError, setLogoError] = useState(false)
  const pathname = usePathname()

  return (
    <>
      <div className={styles.topBar}>
        <div className={styles.topLinks}>
          <Link href="#contato" className={styles.topLink}>
            <FiHeadphones className={styles.topIcon} aria-hidden />
            Suporte
          </Link>
          <Link href="#contato" className={styles.topLink}>
            <FiMessageCircle className={styles.topIcon} aria-hidden />
            Contactos
          </Link>
        </div>
        <div className={styles.langWrap}>
          <button
            type="button"
            onClick={() => setLangOpen(!langOpen)}
            className={styles.langBtn}
            aria-expanded={langOpen}
            aria-haspopup="listbox"
            aria-label="Selecionar idioma"
          >
            <FiGlobe className={styles.topIcon} aria-hidden />
            Português
            <FiChevronDown
              className={cn(styles.chevron, langOpen && styles.chevronOpen)}
              aria-hidden
            />
          </button>
          {langOpen && (
            <>
              <div className={styles.backdrop} aria-hidden onClick={() => setLangOpen(false)} />
              <ul role="listbox" className={styles.dropdown}>
                <li role="option" aria-selected>
                  <span className={styles.dropdownItem}>Português</span>
                </li>
                <li role="option">
                  <button type="button" className={styles.dropdownBtn}>
                    Español
                  </button>
                </li>
              </ul>
            </>
          )}
        </div>
      </div>

      <header className={styles.header}>
        <div className={styles.pill}>
          <div className={styles.left}>
            <Link
              href="/"
              className={cn(
                styles.explore,
                pathname === '/' ? styles.exploreActive : styles.exploreInactive
              )}
            >
              Explorar
            </Link>
            <nav className={styles.nav} aria-label="Navegação">
              <Link
                href="/institucional"
                className={styles.navLink}
              >
                Institucional
              </Link>
              <Link href="/#cursos" className={styles.navLink}>
                Game
              </Link>
            </nav>
          </div>

          <Link href="/" className={styles.logoCenter}>
            {logoError ? (
              <span className={styles.logoText}>
                <span className={styles.logoLine1}>edênicos</span>
                <span className={styles.logoLine2}>ACADEMY</span>
              </span>
            ) : (
              <Image
                src="/LogoEdenicos.png"
                alt="Edênicos Academy"
                width={160}
                height={48}
                className={styles.logoImg}
                priority
                onError={() => setLogoError(true)}
              />
            )}
          </Link>

          <div className={styles.right}>
            <Link href="/#cursos" className={styles.linkMuted}>
              Planos
            </Link>
            <Link href="/login" className={styles.linkMuted}>
              Conecte-se
            </Link>
            <Link href="/register" className={styles.cta}>
              Cadastre-se
            </Link>

            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={styles.menuBtn}
              aria-expanded={mobileMenuOpen}
              aria-label={mobileMenuOpen ? 'Fechar menu' : 'Abrir menu'}
            >
              {mobileMenuOpen ? (
                <svg className={styles.menuIcon} fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className={styles.menuIcon} fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className={styles.mobileMenu} role="dialog" aria-label="Menu de navegação">
            <nav className={styles.mobileNav} aria-label="Menu principal (mobile)">
              <Link href="/" onClick={() => setMobileMenuOpen(false)} className={styles.mobileLink}>
                Explorar
              </Link>
              <Link href="/institucional" onClick={() => setMobileMenuOpen(false)} className={styles.mobileLink}>
                Institucional
              </Link>
              <Link href="/#cursos" onClick={() => setMobileMenuOpen(false)} className={styles.mobileLink}>
                Game
              </Link>
              <Link href="/#cursos" onClick={() => setMobileMenuOpen(false)} className={styles.mobileLink}>
                Planos
              </Link>
              <Link href="/login" onClick={() => setMobileMenuOpen(false)} className={styles.mobileLinkSoft}>
                Conecte-se
              </Link>
              <Link
                href="/register"
                onClick={() => setMobileMenuOpen(false)}
                className={styles.mobileCta}
              >
                Cadastre-se
              </Link>
            </nav>
          </div>
        )}
      </header>
    </>
  )
}
