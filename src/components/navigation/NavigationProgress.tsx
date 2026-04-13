'use client'

import { useEffect, useState, useCallback } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'
import { registerNavigationProgressSetter, startNavigationProgress } from '@src/lib/navigationProgress'
import styles from './NavigationProgress.module.scss'

/**
 * Barra superior + spinner discreto durante transições do App Router.
 * - Cliques em links internos (<a href="/...">)
 * - Chamadas a startNavigationProgress() antes de router.push
 */
export function NavigationProgress() {
  const [pending, setPending] = useState(false)
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const clear = useCallback(() => setPending(false), [])

  useEffect(() => {
    clear()
  }, [pathname, searchParams, clear])

  useEffect(() => {
    registerNavigationProgressSetter(setPending)
    return () => registerNavigationProgressSetter(null)
  }, [])

  useEffect(() => {
    const onClickCapture = (e: MouseEvent) => {
      const anchor = (e.target as HTMLElement)?.closest?.('a[href]') as HTMLAnchorElement | null
      if (!anchor) return
      if (anchor.target === '_blank' || anchor.hasAttribute('download')) return
      const href = anchor.getAttribute('href')
      if (!href || href.startsWith('mailto:') || href.startsWith('tel:') || href.startsWith('#')) return

      let url: URL
      try {
        url = new URL(href, window.location.origin)
      } catch {
        return
      }
      if (url.origin !== window.location.origin) return

      const next = url.pathname + url.search
      const cur = `${pathname}${typeof window !== 'undefined' ? window.location.search : ''}`
      if (next === cur) return

      startNavigationProgress()
    }

    document.addEventListener('click', onClickCapture, true)
    return () => document.removeEventListener('click', onClickCapture, true)
  }, [pathname])

  if (!pending) return null

  return (
    <>
      <div className={styles.bar} role="progressbar" aria-hidden>
        <div className={styles.barInner} />
      </div>
      <div className={styles.spinnerWrap} aria-hidden>
        <div className={styles.spinner} />
      </div>
      <span className={styles.srOnly} role="status" aria-live="polite">
        A navegar…
      </span>
    </>
  )
}
