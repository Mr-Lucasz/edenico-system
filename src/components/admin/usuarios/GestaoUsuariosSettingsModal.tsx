'use client'

import { useEffect, useId, useState } from 'react'
import { FiX } from 'react-icons/fi'
import u from './gestaoUsuarios.module.scss'

type Props = {
  open: boolean
  onClose: () => void
  onSaved: (msg: string) => void
}

export function GestaoUsuariosSettingsModal({ open, onClose, onSaved }: Props) {
  const titleId = useId()
  const [emailNovoUser, setEmailNovoUser] = useState(true)
  const [forcarMfa, setForcarMfa] = useState(false)

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open, onClose])

  if (!open) return null

  return (
    <div
      className={u.modalOverlay}
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose()
      }}
    >
      <div className={u.modalCard}>
        <div className={u.modalHead}>
          <h2 id={titleId} className={u.modalTitle}>
            Configurações — Usuários
          </h2>
          <button type="button" className={u.modalClose} aria-label="Fechar" onClick={onClose}>
            <FiX aria-hidden />
          </button>
        </div>
        <div className={u.modalBody}>
          <label className={u.chip} style={{ cursor: 'default' }}>
            <input type="checkbox" checked={emailNovoUser} onChange={() => setEmailNovoUser((v) => !v)} />
            Enviar e-mail ao criar usuário
          </label>
          <label className={u.chip} style={{ cursor: 'default' }}>
            <input type="checkbox" checked={forcarMfa} onChange={() => setForcarMfa((v) => !v)} />
            Exigir verificação em duas etapas (docentes)
          </label>
        </div>
        <div className={u.modalFoot}>
          <button type="button" className={u.btnGhost} onClick={onClose}>
            Fechar
          </button>
          <button
            type="button"
            className={u.btnPrimaryGreen}
            onClick={() => {
              onSaved('Preferências salvas (demo).')
              onClose()
            }}
          >
            Salvar
          </button>
        </div>
      </div>
    </div>
  )
}
