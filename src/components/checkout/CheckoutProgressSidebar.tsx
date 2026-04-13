import { FiCheck, FiCreditCard, FiUser } from 'react-icons/fi'
import type { CheckoutCopy } from '@src/constants/checkoutCopy'
import styles from './CheckoutProgressSidebar.module.scss'
import layoutStyles from './CheckoutLayout.module.scss'

const STEP_ICONS = [
  FiUser,
  FiCreditCard,
  FiCheck,
  FiCheck,
] as const

type Props = {
  copy: CheckoutCopy
  currentStep: number
}

export function CheckoutProgressSidebar({ copy, currentStep }: Props) {
  const labels = [
    copy.labels.step1,
    copy.labels.step2,
    copy.labels.step3,
    copy.labels.step4,
  ]

  return (
    <aside className={layoutStyles.card} aria-label="Progresso do checkout">
      <h2 className={styles.sidebarTitle}>{copy.progressTitle}</h2>
      <ol className={styles.list}>
        {[1, 2, 3, 4].map((step) => {
          const done = currentStep > step
          const active = currentStep === step
          const Icon = STEP_ICONS[step - 1]

          let bubbleClass = styles.bubblePending
          let textClass = styles.textPending
          if (done) {
            bubbleClass = styles.bubbleDone
            textClass = styles.textDone
          } else if (active) {
            bubbleClass = styles.bubbleActive
            textClass = styles.textActive
          }

          return (
            <li key={step} className={styles.item}>
              <span className={styles.connector} aria-hidden />
              <span className={`${styles.bubble} ${bubbleClass}`}>
                {done ? <FiCheck aria-hidden /> : <Icon aria-hidden />}
              </span>
              <span className={`${styles.text} ${textClass}`}>{labels[step - 1]}</span>
            </li>
          )
        })}
      </ol>
    </aside>
  )
}
