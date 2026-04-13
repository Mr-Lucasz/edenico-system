import { FiCheck } from 'react-icons/fi'
import { AUTH_BRANDING } from '@src/constants/authCopy'
import styles from './AuthSplitLayout.module.scss'

const LETTERS = ['S', 'T', 'A', 'R', 'S'] as const
const PIECE = [styles.s1, styles.s2, styles.s3, styles.s4, styles.s5] as const

export function AuthSplitBranding() {
  return (
    <div className={styles.left}>
      <div className={styles.starsRow} aria-hidden>
        {LETTERS.map((ch, i) => (
          <span key={`${ch}-${i}`} className={`${styles.starPiece} ${PIECE[i]}`}>
            {ch}
          </span>
        ))}
      </div>
      <h1 className={styles.heroTitle}>
        {AUTH_BRANDING.titleLine1}
        <br />
        {AUTH_BRANDING.titleLine2}
      </h1>
      <p className={styles.heroSub}>{AUTH_BRANDING.subtitle}</p>
      <p className={styles.benefitsTitle}>{AUTH_BRANDING.benefitsTitle}</p>
      <ul className={styles.benefitsList}>
        {AUTH_BRANDING.benefits.map((text) => (
          <li key={text} className={styles.benefitItem}>
            <FiCheck className={styles.check} aria-hidden strokeWidth={2.5} />
            <span>{text}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}
