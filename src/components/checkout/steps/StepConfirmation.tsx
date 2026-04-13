'use client'

import { FiLock } from 'react-icons/fi'
import type { CheckoutCopy } from '@src/constants/checkoutCopy'
import layoutStyles from '../CheckoutLayout.module.scss'
import styles from './StepConfirmation.module.scss'

type Props = {
  copy: CheckoutCopy
  onBack: () => void
  onFinalize: () => void
}

export function StepConfirmation({ copy, onBack, onFinalize }: Props) {
  return (
    <div className={layoutStyles.card}>
      <h2 className={layoutStyles.cardTitle}>{copy.step3Title}</h2>
      <div className={styles.summaryBox}>
        <h3 className={styles.summaryTitle}>{copy.summary.title}</h3>
        {copy.summary.lines.map((row) => (
          <p key={row.key} className={styles.summaryRow}>
            <span className={styles.key}>{row.key}</span>{' '}
            <span>{row.value}</span>
          </p>
        ))}
      </div>
      <div className={layoutStyles.footerActions}>
        <button type="button" className={`${layoutStyles.btn} ${layoutStyles.btnMuted}`} onClick={onBack}>
          {copy.actions.back}
        </button>
        <button type="button" className={`${layoutStyles.btn} ${layoutStyles.btnSuccess}`} onClick={onFinalize}>
          <FiLock className={layoutStyles.btnIcon} aria-hidden />
          {copy.actions.finalize}
        </button>
      </div>
    </div>
  )
}
