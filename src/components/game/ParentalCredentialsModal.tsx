'use client'

import { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import { FiX } from 'react-icons/fi'
import { IoShieldOutline } from 'react-icons/io5'
import styles from './ParentalCredentialsModal.module.scss'

interface ParentalCredentialsModalProps {
  open: boolean
  onClose: () => void
  onConfirm: () => void
  /** Quando definido, substitui o texto de apoio padrão (ex.: fluxo da Loja). */
  description?: string
}

const DEFAULT_DESCRIPTION =
  'Introduza as credenciais do responsável para alterar as definições de segurança e limites do jogo.'

export function ParentalCredentialsModal({
  open,
  onClose,
  onConfirm,
  description,
}: ParentalCredentialsModalProps) {
  const panelRef = useRef<HTMLDivElement>(null)

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

  if (!open || typeof document === 'undefined') return null

  return createPortal(
    <div
      className={styles.backdrop}
      role="presentation"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose()
      }}
    >
      <div
        ref={panelRef}
        className={styles.modal}
        role="dialog"
        aria-modal="true"
        aria-labelledby="parental-cred-title"
      >
        <button type="button" className={styles.close} onClick={onClose} aria-label="Fechar">
          <FiX style={{ width: '1.25rem', height: '1.25rem' }} />
        </button>

        <div className={styles.head}>
          <IoShieldOutline className={styles.shield} style={{ width: '1.75rem', height: '1.75rem' }} aria-hidden />
          <h2 id="parental-cred-title" className={styles.title}>
            Controles Parentais
          </h2>
        </div>

        <p className={styles.desc}>{description ?? DEFAULT_DESCRIPTION}</p>

        <div className={styles.field}>
          <label className={styles.label} htmlFor="parent-user">
            Usuário do Responsável
          </label>
          <input
            id="parent-user"
            className={styles.input}
            type="text"
            placeholder="pai"
            autoComplete="username"
          />
        </div>

        <div className={styles.field}>
          <label className={styles.label} htmlFor="parent-pass">
            Senha
          </label>
          <input
            id="parent-pass"
            className={styles.input}
            type="password"
            placeholder="••••••••"
            autoComplete="current-password"
          />
        </div>

        <div className={styles.actions}>
          <button type="button" className={styles.btnGhost} onClick={onClose}>
            Cancelar
          </button>
          <button type="button" className={styles.btnPrimary} onClick={onConfirm}>
            <IoShieldOutline style={{ width: '1rem', height: '1rem' }} aria-hidden />
            Confirmar
          </button>
        </div>
      </div>
    </div>,
    document.body
  )
}
