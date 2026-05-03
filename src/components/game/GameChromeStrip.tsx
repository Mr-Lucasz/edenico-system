'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { FiGrid, FiShoppingBag, FiAward, FiShield } from 'react-icons/fi'
import { cn } from '@src/utils/cn'
import styles from './GameChromeStrip.module.scss'

interface GameChromeStripProps {
  onParentalOpen: () => void
}

export function GameChromeStrip({ onParentalOpen }: GameChromeStripProps) {
  const pathname = usePathname() || ''

  const dashActive =
    pathname === '/comunidade' ||
    pathname === '/comunidade/' ||
    pathname.startsWith('/comunidade/niveis') ||
    pathname.startsWith('/comunidade/personagens') ||
    pathname.startsWith('/comunidade/social')
  const lojaActive = pathname.startsWith('/comunidade/loja')
  const rankActive = pathname.startsWith('/comunidade/classificacoes')

  return (
    <div className={styles.stripWrap}>
      <div className={styles.stripInner}>
        <div className={styles.row}>
          <div className={styles.brand}>
            <div className={styles.iconBadge} aria-hidden>
              <span className={styles.iconBadgeInner} />
            </div>
            <div className={styles.brandText}>
              <p className={styles.title}>Edênicos Game</p>
              <p className={styles.tagline}>O jogo da vida!</p>
            </div>
          </div>

          <nav className={styles.tabs} aria-label="Secções do jogo">
            <Link
              href="/comunidade"
              className={cn(styles.tab, dashActive && styles.tabActive)}
            >
              <FiGrid style={{ width: '0.875rem', height: '0.875rem' }} aria-hidden />
              Dashboard
            </Link>
            <Link href="/comunidade/loja" className={cn(styles.tab, lojaActive && styles.tabActive)}>
              <FiShoppingBag style={{ width: '0.875rem', height: '0.875rem' }} aria-hidden />
              Loja
            </Link>
            <Link
              href="/comunidade/classificacoes"
              className={cn(styles.tab, rankActive && styles.tabRankActive)}
            >
              <FiAward style={{ width: '0.875rem', height: '0.875rem' }} aria-hidden />
              Classificações
            </Link>
            <button type="button" className={cn(styles.tab, styles.tabPlain)} onClick={onParentalOpen}>
              <FiShield style={{ width: '0.875rem', height: '0.875rem' }} aria-hidden />
              Controles Parentais
            </button>
          </nav>
        </div>
      </div>
    </div>
  )
}
