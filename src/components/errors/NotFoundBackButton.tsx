'use client'

import { useRouter } from 'next/navigation'
import { startNavigationProgress } from '@src/lib/navigationProgress'
import { FiArrowLeft } from 'react-icons/fi'
import styles from './NotFoundAcademy.module.scss'

export function NotFoundBackButton() {
  const router = useRouter()

  return (
    <button
      type="button"
      className={styles.btnSecondary}
      onClick={() => {
        startNavigationProgress()
        if (typeof globalThis !== 'undefined' && globalThis.history.length <= 1) {
          router.push('/')
          return
        }
        router.back()
      }}
    >
      <FiArrowLeft className={styles.btnIcon} aria-hidden />
      Página Anterior
    </button>
  )
}
