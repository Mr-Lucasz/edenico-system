'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { FiHeadphones, FiMessageCircle, FiGlobe, FiChevronDown } from 'react-icons/fi'
import { cn } from '@src/utils/cn'

export function LandingHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [langOpen, setLangOpen] = useState(false)
  const [logoError, setLogoError] = useState(false)
  const pathname = usePathname()
  const isInstitucional = pathname === '/institucional'

  return (
    <>
      {/* Top Bar - Barra de Utilidades (fixed para flutuar em todo o scroll) */}
      <div className="fixed left-0 right-0 top-0 z-[60] flex h-9 w-full items-center justify-between border-b border-gray-100 bg-white px-4 text-sm text-gray-600 sm:px-6 lg:px-8">
        <div className="flex items-center gap-6">
          <Link href="#contato" className="flex items-center gap-1.5 transition-colors duration-200 ease-out hover:text-gray-900">
            <FiHeadphones className="h-4 w-4" aria-hidden />
            Suporte
          </Link>
          <Link href="#contato" className="flex items-center gap-1.5 transition-colors duration-200 ease-out hover:text-gray-900">
            <FiMessageCircle className="h-4 w-4" aria-hidden />
            Contactos
          </Link>
        </div>
        <div className="relative">
          <button
            type="button"
            onClick={() => setLangOpen(!langOpen)}
            className="flex items-center gap-1.5 transition-colors duration-200 ease-out hover:text-gray-900"
            aria-expanded={langOpen}
            aria-haspopup="listbox"
            aria-label="Selecionar idioma"
          >
            <FiGlobe className="h-4 w-4" aria-hidden />
            Português
            <FiChevronDown className={cn('h-4 w-4 transition-transform', langOpen && 'rotate-180')} aria-hidden />
          </button>
          {langOpen && (
            <>
              <div className="fixed inset-0 z-10" aria-hidden onClick={() => setLangOpen(false)} />
              <ul
                role="listbox"
                className="absolute right-0 top-full z-20 mt-1 min-w-[140px] rounded-lg border border-gray-200 bg-white py-1 shadow-lg"
              >
                <li role="option" aria-selected>
                  <span className="block px-4 py-2 text-gray-900">Português</span>
                </li>
                <li role="option">
                  <button type="button" className="block w-full px-4 py-2 text-left text-gray-600 transition-colors duration-200 ease-out hover:bg-gray-50">
                    Español
                  </button>
                </li>
              </ul>
            </>
          )}
        </div>
      </div>

      {/* Header Flutuante: fixed, container transparente; pill com fundo escuro (azul/preta) */}
      <header className="fixed left-0 right-0 top-9 z-50 bg-transparent px-4 pt-3 pb-3 sm:px-6 lg:px-8">
        <div
          className={cn(
            'mx-auto flex max-w-6xl items-center justify-between gap-4 rounded-2xl px-4 py-2.5 shadow-lg',
            'bg-edenicos-header-float border border-white/10'
          )}
        >
          {/* Esquerda: Explorar + links */}
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className={cn(
                'rounded-full px-4 py-2 text-sm font-medium text-white transition-all duration-200 ease-out hover:opacity-95 active:scale-[0.98]',
                pathname === '/' ? 'bg-[#2F80ED]' : 'bg-edenicos-royal-blue hover:bg-[#2563eb]'
              )}
            >
              Explorar
            </Link>
            <nav className="hidden items-center gap-1 md:flex" aria-label="Navegação">
              <Link
                href="/institucional"
                className={cn(
                  'rounded-lg px-3 py-2 text-sm font-medium text-white/90 transition-colors duration-200 ease-out hover:bg-white/10 hover:text-white',
                  isInstitucional && 'text-white'
                )}
              >
                Institucional
              </Link>
              <Link
                href="/#cursos"
                className="rounded-lg px-3 py-2 text-sm font-medium text-white/90 transition-colors duration-200 ease-out hover:bg-white/10 hover:text-white"
              >
                Game
              </Link>
            </nav>
          </div>

          {/* Centro: Logo Edênicos ACADEMY */}
          <Link href="/" className="absolute left-1/2 flex -translate-x-1/2 items-center transition-opacity duration-200 ease-out hover:opacity-90">
            {logoError ? (
              <span className="text-center font-bold text-white">
                <span className="block text-lg tracking-tight">edênicos</span>
                <span className="block text-xs font-normal tracking-widest text-white/80">ACADEMY</span>
              </span>
            ) : (
              <Image
                src="/LogoEdenicos.png"
                alt="Edênicos Academy"
                width={160}
                height={48}
                className="h-10 w-auto object-contain sm:h-12"
                priority
                onError={() => setLogoError(true)}
              />
            )}
          </Link>

          {/* Direita: Planos, Conecte-se, Cadastre-se */}
          <div className="flex items-center gap-2">
            <Link
              href="/#cursos"
              className="hidden rounded-lg px-3 py-2 text-sm font-medium text-white/90 transition-colors duration-200 ease-out hover:bg-white/10 hover:text-white sm:inline-block"
            >
              Planos
            </Link>
            <Link
              href="/login"
              className="hidden rounded-lg px-3 py-2 text-sm font-medium text-white/90 transition-colors duration-200 ease-out hover:bg-white/10 hover:text-white sm:inline-block"
            >
              Conecte-se
            </Link>
            <Link
              href="/register"
              className="rounded-full bg-edenicos-cta-magenta px-5 py-2 text-sm font-medium text-white transition-all duration-200 ease-out hover:bg-[#d81b60] hover:opacity-95 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-edenicos-yellow focus-visible:ring-offset-2 focus-visible:ring-offset-edenicos-header-float"
            >
              Cadastre-se
            </Link>

            {/* Mobile menu button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="flex h-10 w-10 items-center justify-center rounded-lg text-white transition-colors duration-200 ease-out hover:bg-white/10 active:scale-95 md:hidden"
              aria-expanded={mobileMenuOpen}
              aria-label={mobileMenuOpen ? 'Fechar menu' : 'Abrir menu'}
            >
              {mobileMenuOpen ? (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div
            className="mt-2 rounded-2xl border border-white/10 bg-edenicos-header-float p-4 shadow-lg md:hidden"
            role="dialog"
            aria-label="Menu de navegação"
          >
            <nav className="flex flex-col gap-1" aria-label="Menu principal (mobile)">
              <Link href="/" onClick={() => setMobileMenuOpen(false)} className="rounded-lg px-4 py-3 text-white transition-colors duration-200 ease-out hover:bg-white/10 active:bg-white/15">
                Explorar
              </Link>
              <Link href="/institucional" onClick={() => setMobileMenuOpen(false)} className="rounded-lg px-4 py-3 text-white transition-colors duration-200 ease-out hover:bg-white/10 active:bg-white/15">
                Institucional
              </Link>
              <Link href="/#cursos" onClick={() => setMobileMenuOpen(false)} className="rounded-lg px-4 py-3 text-white transition-colors duration-200 ease-out hover:bg-white/10 active:bg-white/15">
                Game
              </Link>
              <Link href="/#cursos" onClick={() => setMobileMenuOpen(false)} className="rounded-lg px-4 py-3 text-white transition-colors duration-200 ease-out hover:bg-white/10 active:bg-white/15">
                Planos
              </Link>
              <Link href="/login" onClick={() => setMobileMenuOpen(false)} className="rounded-lg px-4 py-3 text-white/80 transition-colors duration-200 ease-out hover:bg-white/10 hover:text-white active:bg-white/15">
                Conecte-se
              </Link>
              <Link
                href="/register"
                onClick={() => setMobileMenuOpen(false)}
                className="mt-2 rounded-full bg-edenicos-cta-magenta px-4 py-3 text-center font-medium text-white transition-all duration-200 ease-out hover:opacity-95 active:scale-[0.98]"
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
