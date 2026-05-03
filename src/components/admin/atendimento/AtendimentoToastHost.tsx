'use client'

import { useEffect } from 'react'
import { useAtendimentoMock } from './AtendimentoMockContext'
import styles from './atendimento.module.scss'

export function AtendimentoToastHost() {
  const { toast, setToast } = useAtendimentoMock()

  useEffect(() => {
    if (!toast) return
    const t = window.setTimeout(() => setToast(null), 3400)
    return () => window.clearTimeout(t)
  }, [toast, setToast])

  if (!toast) return null
  return (
    <div className={styles.toast} role="status" aria-live="polite">
      {toast}
    </div>
  )
}
