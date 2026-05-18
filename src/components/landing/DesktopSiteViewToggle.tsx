'use client'

import { useCallback, useLayoutEffect, useState } from 'react'
import { DESKTOP_SITE_VIEW_STORAGE_KEY } from '@src/constants/landingPreferences'
import { cn } from '@src/utils/cn'
import styles from './DesktopSiteViewToggle.module.scss'

const VIEWPORT_MOBILE = 'width=device-width, initial-scale=1'
/** Largura mínima de layout para ativar breakpoints “desktop” em telas estreitas */
const VIEWPORT_DESKTOP = 'width=1280, initial-scale=1, viewport-fit=cover'

function readStoredDesktop(): boolean {
  if (typeof window === 'undefined') return false
  return window.localStorage.getItem(DESKTOP_SITE_VIEW_STORAGE_KEY) === '1'
}

function applyViewportMeta(desktop: boolean) {
  let meta = document.querySelector('meta[name="viewport"]') as HTMLMetaElement | null
  if (!meta) {
    meta = document.createElement('meta')
    meta.setAttribute('name', 'viewport')
    document.head.prepend(meta)
  }
  meta.setAttribute('content', desktop ? VIEWPORT_DESKTOP : VIEWPORT_MOBILE)
  if (desktop) {
    document.documentElement.dataset.desktopSiteView = 'true'
  } else {
    delete document.documentElement.dataset.desktopSiteView
  }
}

export type DesktopSiteViewToggleProps = {
  className?: string
}

export function DesktopSiteViewToggle({ className }: DesktopSiteViewToggleProps) {
  const [desktop, setDesktop] = useState(false)
  const [mounted, setMounted] = useState(false)

  useLayoutEffect(() => {
    const on = readStoredDesktop()
    setDesktop(on)
    applyViewportMeta(on)
    setMounted(true)
  }, [])

  const toggle = useCallback(() => {
    const next = !desktop
    setDesktop(next)
    if (next) {
      window.localStorage.setItem(DESKTOP_SITE_VIEW_STORAGE_KEY, '1')
    } else {
      window.localStorage.removeItem(DESKTOP_SITE_VIEW_STORAGE_KEY)
    }
    applyViewportMeta(next)
  }, [desktop])

  if (!mounted) {
    return (
      <div className={cn(styles.wrap, className)} aria-hidden>
        <span className={styles.placeholder} />
      </div>
    )
  }

  return (
    <div className={cn(styles.wrap, className)}>
      <button type="button" className={styles.btn} onClick={toggle}>
        {desktop ? 'Voltar à versão para celular' : 'Ver site no modo desktop'}
      </button>
      <p className={styles.hint}>
        {desktop
          ? 'A tela pode exibir rolagem horizontal, como em um computador.'
          : 'Útil para ver a mesma disposição do site em telas grandes.'}
      </p>
    </div>
  )
}
