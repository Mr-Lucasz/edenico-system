'use client'

import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { FiCheck, FiChevronDown, FiCreditCard, FiUser, FiX } from 'react-icons/fi'
import styles from './LojaCheckoutModal.module.scss'

export interface LojaCheckoutItem {
  title: string
  description: string
  price: string
}

interface LojaCheckoutModalProps {
  open: boolean
  onClose: () => void
  item: LojaCheckoutItem | null
  onSuccess?: () => void
}

type CheckoutView = 'payment' | 'newCard'

const SAVED_CARDS = [
  { id: '1', name: 'Cartão Principal', meta: 'Visa **** 1234', isDefault: true },
  { id: '2', name: 'Cartão Secundário', meta: 'Mastercard **** 5678', isDefault: false },
] as const

const MONTHS = Array.from({ length: 12 }, (_, i) => String(i + 1).padStart(2, '0'))
const YEARS = Array.from({ length: 12 }, (_, i) => String(2026 + i))

export function LojaCheckoutModal({ open, onClose, item, onSuccess }: LojaCheckoutModalProps) {
  const panelRef = useRef<HTMLDivElement>(null)
  const [view, setView] = useState<CheckoutView>('payment')
  const [selectedCardId, setSelectedCardId] = useState<string>('1')
  const [legalAgreed, setLegalAgreed] = useState(false)

  useEffect(() => {
    if (!open) {
      setView('payment')
      setLegalAgreed(false)
      setSelectedCardId('1')
    }
  }, [open])

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

  if (!open || typeof document === 'undefined' || !item) return null

  const handleConfirmPurchase = () => {
    if (!legalAgreed) return
    onSuccess?.()
    onClose()
  }

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
        aria-labelledby="loja-checkout-title"
      >
        <button type="button" className={styles.close} onClick={onClose} aria-label="Fechar">
          <FiX style={{ width: '1.25rem', height: '1.25rem' }} />
        </button>

        <div className={styles.head}>
          <FiCreditCard className={styles.headIcon} style={{ width: '1.75rem', height: '1.75rem' }} aria-hidden />
          <h2 id="loja-checkout-title" className={styles.title}>
            Finalizar Compra
          </h2>
        </div>

        <p className={styles.desc}>Complete os dados abaixo para finalizar sua compra</p>

        <div className={styles.summary}>
          <div className={styles.summaryText}>
            <p className={styles.summaryTitle}>{item.title}</p>
            <p className={styles.summarySub}>{item.description}</p>
          </div>
          <span className={styles.summaryPrice}>{item.price}</span>
        </div>

        <div className={styles.columns}>
          <div>
            {view === 'payment' ? (
              <>
                <h3 className={styles.columnTitle}>
                  <FiCreditCard className={styles.columnTitleIcon} style={{ width: '1rem', height: '1rem' }} aria-hidden />
                  Método de Pagamento
                </h3>
                <div className={styles.cardList}>
                  {SAVED_CARDS.map((c) => (
                    <button
                      key={c.id}
                      type="button"
                      className={`${styles.savedCard} ${selectedCardId === c.id ? styles.savedCardSelected : ''}`}
                      onClick={() => setSelectedCardId(c.id)}
                      aria-pressed={selectedCardId === c.id}
                    >
                      <FiCreditCard className={styles.savedCardIcon} style={{ width: '1.25rem', height: '1.25rem' }} aria-hidden />
                      <span className={styles.savedCardBody}>
                        <span className={styles.savedCardName}>{c.name}</span>
                        <span className={styles.savedCardMeta}>{c.meta}</span>
                        {c.isDefault ? <span className={styles.badgePadrao}>Padrão</span> : null}
                      </span>
                    </button>
                  ))}
                </div>
                <button type="button" className={styles.btnAddCard} onClick={() => setView('newCard')}>
                  + Adicionar Novo Cartão
                </button>
              </>
            ) : (
              <>
                <div className={styles.newCardHeader}>
                  <h3 className={styles.newCardTitle}>Novo Cartão</h3>
                  <button
                    type="button"
                    className={styles.btnIconClose}
                    onClick={() => setView('payment')}
                    aria-label="Voltar aos cartões guardados"
                  >
                    <FiX style={{ width: '1.25rem', height: '1.25rem' }} />
                  </button>
                </div>
                <div className={styles.formStack}>
                  <div>
                    <label className={styles.label} htmlFor="loja-cc-num">
                      Número do Cartão
                    </label>
                    <input id="loja-cc-num" className={styles.input} type="text" inputMode="numeric" placeholder="0000 0000 0000 0000" autoComplete="cc-number" />
                  </div>
                  <div className={styles.row3}>
                    <div className={styles.row3Cell}>
                      <label className={styles.label} htmlFor="loja-cc-mes">
                        Mês
                      </label>
                      <div className={styles.selectWrap}>
                        <select id="loja-cc-mes" className={`${styles.input} ${styles.selectField}`} defaultValue="">
                          <option value="">Mês</option>
                          {MONTHS.map((m) => (
                            <option key={m} value={m}>
                              {m}
                            </option>
                          ))}
                        </select>
                        <FiChevronDown className={styles.chevron} aria-hidden />
                      </div>
                    </div>
                    <div className={styles.row3Cell}>
                      <label className={styles.label} htmlFor="loja-cc-ano">
                        Ano
                      </label>
                      <div className={styles.selectWrap}>
                        <select id="loja-cc-ano" className={`${styles.input} ${styles.selectField}`} defaultValue="">
                          <option value="">Ano</option>
                          {YEARS.map((y) => (
                            <option key={y} value={y}>
                              {y}
                            </option>
                          ))}
                        </select>
                        <FiChevronDown className={styles.chevron} aria-hidden />
                      </div>
                    </div>
                    <div className={styles.row3Cell}>
                      <label className={styles.label} htmlFor="loja-cc-cvv">
                        CVV
                      </label>
                      <input id="loja-cc-cvv" className={styles.input} type="password" inputMode="numeric" placeholder="•••" maxLength={4} autoComplete="cc-csc" />
                    </div>
                  </div>
                  <div>
                    <label className={styles.label} htmlFor="loja-cc-name">
                      Nome no cartão
                    </label>
                    <input id="loja-cc-name" className={styles.input} type="text" placeholder="Como impresso no cartão" autoComplete="cc-name" />
                  </div>
                  <button
                    type="button"
                    className={styles.btnSaveCard}
                    onClick={() => {
                      setView('payment')
                    }}
                  >
                    <FiCheck style={{ width: '1rem', height: '1rem' }} aria-hidden />
                    Salvar
                  </button>
                </div>
              </>
            )}
          </div>

          <div>
            <h3 className={styles.columnTitle}>
              <FiUser className={styles.columnTitleIcon} style={{ width: '1rem', height: '1rem' }} aria-hidden />
              Dados do Responsável
            </h3>
            <div className={styles.formStack}>
              <div>
                <label className={styles.label} htmlFor="loja-r-nome">
                  Nome Completo
                </label>
                <input id="loja-r-nome" className={styles.input} type="text" autoComplete="name" placeholder="Nome completo" />
              </div>
              <div>
                <label className={styles.label} htmlFor="loja-r-cpf">
                  CPF
                </label>
                <input id="loja-r-cpf" className={styles.input} type="text" inputMode="numeric" placeholder="000.000.000-00" autoComplete="off" />
              </div>
              <div>
                <label className={styles.label} htmlFor="loja-r-email">
                  E-mail
                </label>
                <input id="loja-r-email" className={styles.input} type="email" autoComplete="email" placeholder="email@exemplo.com" />
              </div>
              <div>
                <label className={styles.label} htmlFor="loja-r-tel">
                  Telefone
                </label>
                <input id="loja-r-tel" className={styles.input} type="tel" autoComplete="tel" placeholder="(00) 00000-0000" />
              </div>
            </div>
          </div>
        </div>

        <div className={styles.legalBox}>
          <input
            id="loja-legal"
            className={styles.checkbox}
            type="checkbox"
            checked={legalAgreed}
            onChange={(e) => setLegalAgreed(e.target.checked)}
          />
          <label htmlFor="loja-legal" className={styles.legalText}>
            Ao prosseguir, confirmo que sou o responsável legal e autorizo esta compra.
          </label>
        </div>

        <div className={styles.actions}>
          <button type="button" className={styles.btnGhost} onClick={onClose}>
            Cancelar
          </button>
          <button type="button" className={styles.btnPrimary} disabled={!legalAgreed} onClick={handleConfirmPurchase}>
            <FiCheck style={{ width: '1rem', height: '1rem' }} aria-hidden />
            Confirmar Compra
          </button>
        </div>
      </div>
    </div>,
    document.body
  )
}
