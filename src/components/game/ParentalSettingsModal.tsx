'use client'

import { useEffect } from 'react'
import { createPortal } from 'react-dom'
import { FiChevronDown, FiClock, FiX } from 'react-icons/fi'
import { IoShieldOutline } from 'react-icons/io5'
import styles from './ParentalSettingsModal.module.scss'

interface ParentalSettingsModalProps {
  open: boolean
  onClose: () => void
}

export function ParentalSettingsModal({ open, onClose }: ParentalSettingsModalProps) {
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
      <div className={styles.modal} role="dialog" aria-modal="true" aria-labelledby="parental-set-title">
        <button type="button" className={styles.close} onClick={onClose} aria-label="Fechar">
          <FiX style={{ width: '1.25rem', height: '1.25rem' }} />
        </button>

        <div className={styles.head}>
          <IoShieldOutline className={styles.shield} style={{ width: '1.75rem', height: '1.75rem' }} aria-hidden />
          <div>
            <h2 id="parental-set-title" className={styles.title}>
              Controles Parentais
            </h2>
            <p className={styles.subtitle}>Configurações de segurança e limites para o jogo</p>
          </div>
        </div>

        <div className={styles.group}>
          <label className={styles.label} htmlFor="limit-day">
            Tempo Limite de Jogo (por dia)
          </label>
          <div className={styles.selectWrap}>
            <select id="limit-day" className={styles.select} defaultValue="2">
              <option value="1">1 hora</option>
              <option value="2">2 horas</option>
              <option value="3">3 horas</option>
            </select>
            <FiChevronDown className={styles.chevron} aria-hidden />
          </div>
        </div>

        <div className={styles.group}>
          <label className={styles.label} htmlFor="shop">
            Compras na Loja
          </label>
          <div className={styles.selectWrap}>
            <select id="shop" className={styles.select} defaultValue="auth">
              <option value="auth">Requer autorização</option>
              <option value="block">Bloqueado</option>
              <option value="allow">Permitido</option>
            </select>
            <FiChevronDown className={styles.chevron} aria-hidden />
          </div>
        </div>

        <div className={styles.group}>
          <span className={styles.label}>Horário Permitido</span>
          <div className={styles.row2}>
            <div className={styles.timeField}>
              <input className={styles.timeInput} type="text" defaultValue="08:00" readOnly aria-label="Início" />
              <FiClock className={styles.clock} aria-hidden />
            </div>
            <div className={styles.timeField}>
              <input className={styles.timeInput} type="text" defaultValue="20:00" readOnly aria-label="Fim" />
              <FiClock className={styles.clock} aria-hidden />
            </div>
          </div>
        </div>

        <div className={styles.actions}>
          <button type="button" className={styles.btnGhost} onClick={onClose}>
            Cancelar
          </button>
          <button type="button" className={styles.btnPrimary} onClick={onClose}>
            Salvar Configurações
          </button>
        </div>
      </div>
    </div>,
    document.body
  )
}
