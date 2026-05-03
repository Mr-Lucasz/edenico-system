'use client'

import { useEffect, useId, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { FiMessageCircle, FiSend, FiX } from 'react-icons/fi'
import styles from './SocialChatModal.module.scss'

export type SocialChatMessage = {
  readonly id: string
  readonly variant: 'incoming' | 'outgoing'
  readonly meta: string
  readonly body: string
  readonly avatarEmoji?: string
}

type SocialChatModalProps = {
  readonly open: boolean
  readonly onClose: () => void
  readonly title: string
  readonly messages: readonly SocialChatMessage[]
}

export function SocialChatModal({ open, onClose, title, messages: seedMessages }: SocialChatModalProps) {
  const titleId = useId()
  const [list, setList] = useState<SocialChatMessage[]>([])
  const [draft, setDraft] = useState('')
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return
    setList(seedMessages.map((m) => ({ ...m })))
    setDraft('')
  }, [open, seedMessages])

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

  useEffect(() => {
    if (!open) return
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' })
  }, [open, list])

  const send = () => {
    const t = draft.trim()
    if (!t) return
    const now = new Date()
    const time = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`
    setList((prev) => [
      ...prev,
      {
        id: `local-${Date.now()}`,
        variant: 'outgoing',
        meta: `Você • ${time}`,
        body: t,
      },
    ])
    setDraft('')
  }

  if (!open || typeof document === 'undefined') return null

  return createPortal(
    <div
      className={styles.backdrop}
      role="presentation"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose()
      }}
    >
      <div className={styles.panel} role="dialog" aria-modal="true" aria-labelledby={titleId}>
        <header className={styles.header}>
          <h2 id={titleId} className={styles.headerTitle}>
            <FiMessageCircle style={{ width: '1.125rem', height: '1.125rem', color: '#3b82f6', flexShrink: 0 }} aria-hidden />
            {title}
          </h2>
          <button type="button" className={styles.close} onClick={onClose} aria-label="Fechar">
            <FiX style={{ width: '1.25rem', height: '1.25rem' }} aria-hidden />
          </button>
        </header>

        <div ref={scrollRef} className={styles.scroll}>
          {list.map((m) =>
            m.variant === 'incoming' ? (
              <div key={m.id} className={`${styles.msgRow} ${styles.msgRowIn}`}>
                <div className={`${styles.avatar} ${styles.avatarIn}`} aria-hidden>
                  {m.avatarEmoji ?? '👤'}
                </div>
                <div className={styles.msgCol}>
                  <p className={styles.meta}>{m.meta}</p>
                  <p className={`${styles.bubble} ${styles.bubbleIn}`}>{m.body}</p>
                </div>
              </div>
            ) : (
              <div key={m.id} className={`${styles.msgRow} ${styles.msgRowOut}`}>
                <div className={`${styles.avatar} ${styles.avatarOut}`} aria-hidden>
                  {m.avatarEmoji ?? '⭐'}
                </div>
                <div className={`${styles.msgCol} ${styles.msgColOut}`}>
                  <p className={styles.meta}>{m.meta}</p>
                  <p className={`${styles.bubble} ${styles.bubbleOut}`}>{m.body}</p>
                </div>
              </div>
            ),
          )}
        </div>

        <footer className={styles.footer}>
          <input
            className={styles.input}
            type="text"
            placeholder="Digite sua mensagem..."
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault()
                send()
              }
            }}
            aria-label="Mensagem"
          />
          <button type="button" className={styles.send} onClick={send} aria-label="Enviar mensagem">
            <FiSend style={{ width: '1rem', height: '1rem' }} aria-hidden />
          </button>
        </footer>
      </div>
    </div>,
    document.body,
  )
}

export const TEAM_CHAT_MESSAGES: SocialChatMessage[] = [
  {
    id: 't1',
    variant: 'incoming',
    meta: 'Pedro L. • 10:35',
    body: 'Acabei de completar a missão de Ciências! 🧪',
    avatarEmoji: '👦',
  },
  {
    id: 't2',
    variant: 'incoming',
    meta: 'Ana C. • 10:38',
    body: 'Parabéns Pedro! Eu ainda estou na de Artes 🎨',
    avatarEmoji: '👩',
  },
  {
    id: 't3',
    variant: 'outgoing',
    meta: 'Você • 10:40',
    body: 'Que legal! Alguém quer fazer a missão em equipe?',
    avatarEmoji: '⭐',
  },
]

export function friendChatMessages(friendName: string): SocialChatMessage[] {
  return [
    {
      id: 'f1',
      variant: 'incoming',
      meta: `${friendName} • Ontem`,
      body: 'E aí! Consegue ajudar na missão de hoje?',
      avatarEmoji: '👋',
    },
    {
      id: 'f2',
      variant: 'outgoing',
      meta: 'Você • Ontem',
      body: 'Claro! Te chamo mais tarde. 🎯',
      avatarEmoji: '⭐',
    },
  ]
}
