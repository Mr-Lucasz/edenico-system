'use client'

import { useEffect, useRef, useState } from 'react'
import { FiMoreVertical } from 'react-icons/fi'
import u from './financeiroUi.module.scss'

export type RowMenuItem = {
  label: string
  onClick: () => void
  danger?: boolean
}

type Props = {
  ariaLabel?: string
  items: RowMenuItem[]
}

export function RowActionsMenu({ items, ariaLabel = 'Abrir menu de ações' }: Props) {
  const [open, setOpen] = useState(false)
  const wrapRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return
    const onDoc = (e: MouseEvent) => {
      if (!wrapRef.current?.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', onDoc)
    return () => document.removeEventListener('mousedown', onDoc)
  }, [open])

  return (
    <div className={u.menuWrap} ref={wrapRef}>
      <button
        type="button"
        className={u.kebab}
        aria-label={ariaLabel}
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
      >
        <FiMoreVertical />
      </button>
      {open ? (
        <ul className={u.menuDropdown} role="menu">
          {items.map((item) => (
            <li key={item.label} role="none">
              <button
                type="button"
                role="menuitem"
                className={`${u.menuItemBtn} ${item.danger ? u.menuItemDanger : ''}`}
                onClick={() => {
                  item.onClick()
                  setOpen(false)
                }}
              >
                {item.label}
              </button>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  )
}
