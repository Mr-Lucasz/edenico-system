'use client'

import { FiArrowRight } from 'react-icons/fi'
import type { CheckoutCopy } from '@src/constants/checkoutCopy'
import layoutStyles from '../CheckoutLayout.module.scss'

type Props = {
  copy: CheckoutCopy
  onBack: () => void
  onContinue: () => void
}

export function StepPayment({ copy, onBack, onContinue }: Props) {
  return (
    <div className={layoutStyles.card}>
      <h2 className={layoutStyles.cardTitle}>{copy.step2Title}</h2>
      <div className={layoutStyles.field}>
        <label className={layoutStyles.label} htmlFor="checkout-card">
          {copy.form.cardNumber}
        </label>
        <input
          id="checkout-card"
          className={layoutStyles.input}
          type="text"
          inputMode="numeric"
          placeholder={copy.form.cardNumberPh}
          autoComplete="cc-number"
        />
      </div>
      <div className={layoutStyles.fieldRow}>
        <div className={layoutStyles.field}>
          <label className={layoutStyles.label} htmlFor="checkout-exp">
            {copy.form.expiry}
          </label>
          <input
            id="checkout-exp"
            className={layoutStyles.input}
            type="text"
            placeholder={copy.form.expiryPh}
            autoComplete="cc-exp"
          />
        </div>
        <div className={layoutStyles.field}>
          <label className={layoutStyles.label} htmlFor="checkout-cvv">
            {copy.form.cvv}
          </label>
          <input
            id="checkout-cvv"
            className={layoutStyles.input}
            type="text"
            inputMode="numeric"
            placeholder={copy.form.cvvPh}
            autoComplete="cc-csc"
          />
        </div>
      </div>
      <div className={layoutStyles.field}>
        <label className={layoutStyles.label} htmlFor="checkout-name-card">
          {copy.form.nameOnCard}
        </label>
        <input
          id="checkout-name-card"
          className={layoutStyles.input}
          type="text"
          placeholder={copy.form.nameOnCardPh}
          autoComplete="cc-name"
        />
      </div>
      <div className={layoutStyles.footerActions}>
        <button type="button" className={`${layoutStyles.btn} ${layoutStyles.btnMuted}`} onClick={onBack}>
          {copy.actions.back}
        </button>
        <button type="button" className={`${layoutStyles.btn} ${layoutStyles.btnPrimary}`} onClick={onContinue}>
          {copy.actions.continue}
          <FiArrowRight className={layoutStyles.btnIcon} aria-hidden />
        </button>
      </div>
    </div>
  )
}
