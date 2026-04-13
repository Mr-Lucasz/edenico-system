import Link from 'next/link'
import { FiArrowRight, FiCheck, FiHeadphones, FiPhone, FiUsers } from 'react-icons/fi'
import { PLANOS_CONSULTING } from '@src/constants/planosPageCopy'
import styles from './PlanosConsultingBanner.module.scss'

const ICONS = [FiCheck, FiUsers, FiPhone] as const
const ICON_WRAP = [
  styles.benefitIconGreen,
  styles.benefitIconBlue,
  styles.benefitIconPurple,
] as const

export function PlanosConsultingBanner() {
  return (
    <section className={styles.section} id="contato" aria-labelledby="planos-consulting-heading">
      <div className={styles.bg} aria-hidden />
      <div className={styles.inner}>
        <div className={styles.tag}>
          <FiHeadphones className={styles.tagIcon} aria-hidden />
          {PLANOS_CONSULTING.tag}
        </div>
        <h2 id="planos-consulting-heading" className={styles.title}>
          {PLANOS_CONSULTING.title}
        </h2>
        <p className={styles.subtitle}>{PLANOS_CONSULTING.subtitle}</p>

        <div className={styles.benefits}>
          {PLANOS_CONSULTING.benefits.map((b, i) => {
            const Icon = ICONS[i]
            return (
              <div key={b.title} className={styles.benefit}>
                <span className={`${styles.benefitIcon} ${ICON_WRAP[i]}`}>
                  <Icon aria-hidden />
                </span>
                <span className={styles.benefitTitle}>{b.title}</span>
                <span className={styles.benefitText}>{b.text}</span>
              </div>
            )
          })}
        </div>

        <Link href="#contato" className={styles.cta}>
          {PLANOS_CONSULTING.cta}
          <FiArrowRight className={styles.ctaArrow} aria-hidden />
        </Link>
        <p className={styles.hint}>{PLANOS_CONSULTING.ctaHint}</p>
      </div>
    </section>
  )
}
