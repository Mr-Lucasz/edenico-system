'use client'

import { useEffect, useId, useMemo, useState } from 'react'
import { createPortal } from 'react-dom'
import { FiSearch, FiX } from 'react-icons/fi'
import styles from './BuscarTimeModal.module.scss'

export type BuscarTimeEntry = {
  readonly id: string
  readonly name: string
  readonly rank: string
  readonly description: string
  readonly members: string
  readonly copas: string
  readonly tipo: string
}

const TEAMS: BuscarTimeEntry[] = [
  {
    id: 'e1',
    name: 'Exploradores',
    rank: '#8°',
    description: 'Desbravando novos conhecimentos juntos!',
    members: '0/15',
    copas: '4.250',
    tipo: 'Público',
  },
  {
    id: 'e2',
    name: 'Cientistas Mirins',
    rank: '#5°',
    description: 'Curiosidade e experimentação em primeiro lugar.',
    members: '0/25',
    copas: '5.120',
    tipo: 'Público',
  },
]

type BuscarTimeModalProps = {
  readonly open: boolean
  readonly onClose: () => void
}

export function BuscarTimeModal({ open, onClose }: BuscarTimeModalProps) {
  const titleId = useId()
  const [query, setQuery] = useState('')

  useEffect(() => {
    if (!open) return
    setQuery('')
  }, [open])

  useEffect(() => {
    if (!open) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = prev
    }
  }, [open])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, onClose])

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return TEAMS
    return TEAMS.filter((t) => `${t.name} ${t.id}`.toLowerCase().includes(q))
  }, [query])

  if (!open || typeof document === 'undefined') return null

  return createPortal(
    <div
      className={styles.backdrop}
      role="presentation"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose()
      }}
    >
      <div className={styles.panel} role="dialog" aria-modal="true" aria-labelledby={titleId}>
        <header className={styles.header}>
          <button type="button" className={styles.close} onClick={onClose} aria-label="Fechar">
            <FiX style={{ width: '1.25rem', height: '1.25rem' }} aria-hidden />
          </button>
          <div className={styles.titleRow}>
            <FiSearch className={styles.titleIcon} style={{ width: '1.25rem', height: '1.25rem' }} aria-hidden />
            <div>
              <h2 id={titleId} className={styles.title}>
                Buscar Time
              </h2>
              <p className={styles.subtitle}>Encontre o time perfeito para você</p>
            </div>
          </div>
        </header>

        <div className={styles.searchRow}>
          <input
            className={styles.searchInput}
            type="search"
            placeholder="Buscar por nome ou ID do time..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            aria-label="Buscar time"
          />
          <button type="button" className={styles.searchBtn} aria-label="Pesquisar">
            <FiSearch style={{ width: '1rem', height: '1rem' }} aria-hidden />
          </button>
        </div>

        <div className={styles.list}>
          {filtered.length === 0 ? (
            <p className={styles.empty}>Nenhum time encontrado.</p>
          ) : (
            filtered.map((t) => (
              <article key={t.id} className={styles.card}>
                <div className={styles.cardTop}>
                  <div className={styles.nameRow}>
                    <h3 className={styles.teamName}>{t.name}</h3>
                    <span className={styles.rankBadge}>{t.rank}</span>
                  </div>
                  <button type="button" className={styles.btnJoin}>
                    Entrar
                  </button>
                </div>
                <p className={styles.desc}>{t.description}</p>
                <div className={styles.stats}>
                  <div>
                    <p className={styles.statLabel}>Membros</p>
                    <p className={styles.statValue}>{t.members}</p>
                  </div>
                  <div>
                    <p className={styles.statLabel}>Copas</p>
                    <p className={styles.statValue}>{t.copas}</p>
                  </div>
                  <div>
                    <p className={styles.statLabel}>Tipo</p>
                    <p className={styles.statValue}>{t.tipo}</p>
                  </div>
                </div>
              </article>
            ))
          )}
        </div>
      </div>
    </div>,
    document.body,
  )
}
