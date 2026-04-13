'use client'

import { FiArrowRight } from 'react-icons/fi'
import Link from 'next/link'
import type { CheckoutCopy } from '@src/constants/checkoutCopy'
import layoutStyles from '../CheckoutLayout.module.scss'

type Props = {
  copy: CheckoutCopy
  onContinue: () => void
}

export function StepPersonalData({ copy, onContinue }: Props) {
  return (
    <div className={layoutStyles.card}>
      <h2 className={layoutStyles.cardTitle}>{copy.step1Title}</h2>
      <div className={layoutStyles.fieldRow}>
        <div className={layoutStyles.field}>
          <label className={layoutStyles.label} htmlFor="checkout-name">
            {copy.form.fullName}
          </label>
          <input
            id="checkout-name"
            className={layoutStyles.input}
            type="text"
            placeholder={copy.form.fullNamePh}
            autoComplete="name"
          />
        </div>
        <div className={layoutStyles.field}>
          <label className={layoutStyles.label} htmlFor="checkout-email">
            {copy.form.email}
          </label>
          <input
            id="checkout-email"
            className={layoutStyles.input}
            type="email"
            placeholder={copy.form.emailPh}
            autoComplete="email"
          />
        </div>
      </div>
      <div className={layoutStyles.field}>
        <label className={layoutStyles.label} htmlFor="checkout-phone">
          {copy.form.phone}
        </label>
        <input
          id="checkout-phone"
          className={layoutStyles.input}
          type="tel"
          placeholder={copy.form.phonePh}
          autoComplete="tel"
        />
      </div>
      <div className={layoutStyles.footerActions}>
        <Link href="/planos" className={`${layoutStyles.btn} ${layoutStyles.btnMuted}`}>
          {copy.actions.cancel}
        </Link>
        <button type="button" className={`${layoutStyles.btn} ${layoutStyles.btnPrimary}`} onClick={onContinue}>
          {copy.actions.continue}
          <FiArrowRight className={layoutStyles.btnIcon} aria-hidden />
        </button>
      </div>
    </div>
  )
}
