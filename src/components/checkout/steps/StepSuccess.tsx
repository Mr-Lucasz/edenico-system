'use client'

import Link from 'next/link'
import { FiCheck } from 'react-icons/fi'
import type { CheckoutCopy } from '@src/constants/checkoutCopy'
import layoutStyles from '../CheckoutLayout.module.scss'
import styles from './StepSuccess.module.scss'

type Props = {
  copy: CheckoutCopy
}

export function StepSuccess({ copy }: Props) {
  return (
    <div className={layoutStyles.card}>
      <div className={styles.successInner}>
        <div className={styles.iconWrap} aria-hidden>
          <FiCheck strokeWidth={2.5} />
        </div>
        <h2 className={styles.title}>{copy.successTitle}</h2>
        <p className={styles.subtitle}>{copy.successSubtitle}</p>
        <Link href="/" className={`${layoutStyles.btn} ${layoutStyles.btnPrimary}`}>
          {copy.backToHome}
        </Link>
      </div>
    </div>
  )
}
