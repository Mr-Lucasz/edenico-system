'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { FiHeadphones, FiMessageCircle, FiGlobe, FiChevronDown } from 'react-icons/fi'
import { cn } from '@src/utils/cn'
import styles from './LandingHeader.module.scss'

export type LandingHeaderProps = {
  variant?: 'default' | 'institucional'
}

const INSTIT_NAV = [
  { label: 'Início', href: '#inicio' },
  { label: 'Ecossistema', href: '#ecossistema' },
  { label: 'STARS', href: '#metodologia-stars' },
  { label: 'Planos', href: '#planos' },
  { label: 'FAQ', href: '#faq' },
] as const

export function LandingHeader({ variant = 'default' }: LandingHeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [langOpen, setLangOpen] = useState(false)
  const [logoError, setLogoError] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    if (variant !== 'institucional') return
    const onScroll = () => setScrolled(window.scrollY > 16)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [variant])

  if (variant === 'institucional') {
    return (
      <header
        className={cn(styles.headerInst, scrolled && styles.headerInstScrolled)}
        role="banner"
      >
        <div className={styles.barInst}>
          <Link href="/" className={styles.logoLeft} aria-label="Edênicos Academy — início">
            {logoError ? (
              <span className={styles.logoTextInst}>
                <span className={styles.logoLine1}>edênicos</span>
                <span className={styles.logoLine2}>ACADEMY</span>
              </span>
            ) : (
              <Image
                src="/LogoEdenicos.png"
                alt="Edênicos Academy"
                width={140}
                height={42}
                className={styles.logoImgInst}
                priority
                onError={() => setLogoError(true)}
              />
            )}
          </Link>

          <nav className={styles.navInst} aria-label="Navegação principal">
            {INSTIT_NAV.map((item) => (
              <a key={item.href} href={item.href} className={styles.navInstLink}>
                {item.label}
              </a>
            ))}
          </nav>

          <div className={styles.actionsInst}>
            <Link href="/login" className={styles.linkEntrar}>
              Entrar
            </Link>
            <Link href="/register" className={styles.btnComecar}>
              Começar Agora
            </Link>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={styles.menuBtnInst}
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
          <div className={styles.mobileMenuInst} role="dialog" aria-label="Menu de navegação">
            <nav className={styles.mobileNavInst} aria-label="Menu principal (mobile)">
              {INSTIT_NAV.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={styles.mobileLinkInst}
                >
                  {item.label}
                </a>
              ))}
              <Link href="/login" onClick={() => setMobileMenuOpen(false)} className={styles.mobileLinkSoftInst}>
                Entrar
              </Link>
              <Link href="/register" onClick={() => setMobileMenuOpen(false)} className={styles.mobileCtaInst}>
                Começar Agora
              </Link>
            </nav>
          </div>
        )}
      </header>
    )
  }

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
                className={cn(styles.navLink, pathname === '/institucional' && styles.navLinkActive)}
              >
                Institucional
              </Link>
              <Link
                href="/game"
                className={cn(styles.navLink, pathname === '/game' && styles.navLinkActive)}
              >
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
            <Link
              href="/planos"
              className={cn(styles.linkMuted, pathname === '/planos' && styles.navLinkActive)}
            >
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
              <Link
                href="/institucional"
                onClick={() => setMobileMenuOpen(false)}
                className={cn(styles.mobileLink, pathname === '/institucional' && styles.mobileLinkActive)}
              >
                Institucional
              </Link>
              <Link
                href="/game"
                onClick={() => setMobileMenuOpen(false)}
                className={cn(styles.mobileLink, pathname === '/game' && styles.mobileLinkActive)}
              >
                Game
              </Link>
              <Link
                href="/planos"
                onClick={() => setMobileMenuOpen(false)}
                className={cn(styles.mobileLink, pathname === '/planos' && styles.mobileLinkActive)}
              >
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
