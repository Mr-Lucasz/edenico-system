'use client'

import { useCallback, useEffect, useState } from 'react'
import { cn } from '@src/utils/cn'
import styles from './IdentityAnchorsNav.module.scss'

export type IdentityAnchorsNavItem = { readonly label: string; readonly anchor: string }

const DEFAULT_OBS_IDS = ['identidade-logos', 'identidade-cores', 'identidade-tipografia'] as const

export function IdentityAnchorsNav({
  items,
  ariaLabel,
  observeIds = DEFAULT_OBS_IDS,
}: {
  readonly items: readonly IdentityAnchorsNavItem[]
  readonly ariaLabel: string
  readonly observeIds?: readonly string[]
}) {
  const [activeAnchor, setActiveAnchor] = useState<string>(items[0]?.anchor ?? 'identidade-logos')

  const scrollTo = useCallback((anchor: string) => {
    setActiveAnchor(anchor)
    document.getElementById(anchor)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }, [])

  useEffect(() => {
    const allow = new Set<string>(observeIds)
    const nodes = observeIds.map((id) => document.getElementById(id)).filter((n): n is HTMLElement => Boolean(n))
    if (nodes.length === 0) return

    const obs = new IntersectionObserver(
      (entries) => {
        const vis = entries.filter((e) => e.isIntersecting && e.intersectionRatio > 0.07)
        if (vis.length === 0) return
        const first = vis[0]
        if (!first) return
        const best = vis.slice(1).reduce(
          (a, b) => (a.intersectionRatio >= b.intersectionRatio ? a : b),
          first
        )
        const id = best.target.id
        if (allow.has(id)) setActiveAnchor(id)
      },
      { root: null, rootMargin: '-12% 0px -38% 0px', threshold: [0, 0.08, 0.15, 0.25, 0.4, 0.6, 1] }
    )

    nodes.forEach((el) => obs.observe(el))
    return () => obs.disconnect()
  }, [observeIds])

  return (
    <div className={styles.stickyWrap}>
      <nav className={styles.bar} aria-label={ariaLabel}>
        {items.map((item) => (
          <button
            key={item.anchor}
            type="button"
            className={cn(styles.btn, activeAnchor === item.anchor && styles.btnActive)}
            aria-current={activeAnchor === item.anchor ? 'true' : undefined}
            onClick={() => scrollTo(item.anchor)}
          >
            {item.label}
          </button>
        ))}
      </nav>
    </div>
  )
}
