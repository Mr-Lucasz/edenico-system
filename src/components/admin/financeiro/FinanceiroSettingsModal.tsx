'use client'

import { useEffect, useState } from 'react'
import u from './financeiroUi.module.scss'

const STORAGE_KEY = 'edenicos_fin_settings_v1'

export type FinanceiroSettings = {
  notifyEmail: boolean
  defaultExportFormat: 'csv'
}

const defaultSettings: FinanceiroSettings = {
  notifyEmail: true,
  defaultExportFormat: 'csv',
}

function load(): FinanceiroSettings {
  if (typeof window === 'undefined') return defaultSettings
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY)
    if (!raw) return defaultSettings
    const parsed = JSON.parse(raw) as Partial<FinanceiroSettings>
    return { ...defaultSettings, ...parsed }
  } catch {
    return defaultSettings
  }
}

function save(s: FinanceiroSettings) {
  sessionStorage.setItem(STORAGE_KEY, JSON.stringify(s))
}

type Props = {
  open: boolean
  onClose: () => void
  onSaved?: (msg: string) => void
}

export function FinanceiroSettingsModal({ open, onClose, onSaved }: Props) {
  const [notifyEmail, setNotifyEmail] = useState(defaultSettings.notifyEmail)

  useEffect(() => {
    if (open) {
      const s = load()
      setNotifyEmail(s.notifyEmail)
    }
  }, [open])

  if (!open) return null

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const next: FinanceiroSettings = {
      notifyEmail,
      defaultExportFormat: 'csv',
    }
    save(next)
    onSaved?.('Preferências salvas neste navegador.')
    onClose()
  }

  return (
    <div
      className={u.modalOverlay}
      role="presentation"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose()
      }}
    >
      <div className={u.modalPanel} role="dialog" aria-modal="true" aria-labelledby="fin-settings-title">
        <div className={u.modalHeader}>
          <h2 id="fin-settings-title" className={u.modalTitle}>
            Configurações do financeiro
          </h2>
          <button type="button" className={u.modalClose} onClick={onClose} aria-label="Fechar">
            ×
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className={u.modalBody}>
            <div className={u.field}>
              <label className={u.fieldRow}>
                <input
                  type="checkbox"
                  className={u.check}
                  checked={notifyEmail}
                  onChange={(e) => setNotifyEmail(e.target.checked)}
                />
                <span className={u.fieldLabel} style={{ margin: 0 }}>
                  Enviar resumo financeiro por e-mail (demo)
                </span>
              </label>
              <p style={{ margin: 0, fontSize: '0.75rem', color: '#6b7280' }}>
                As opções são guardadas apenas no navegador (sessionStorage), sem servidor.
              </p>
            </div>
          </div>
          <div className={u.modalFooter}>
            <button type="button" className={u.btnOutline} onClick={onClose}>
              Cancelar
            </button>
            <button type="submit" className={u.btnPrimaryBlue}>
              Salvar
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
