import { institutionalCopy } from '@src/constants/institutionalCopy'
import { FiMessageCircle } from 'react-icons/fi'
import styles from './InstitutionalCtaSection.module.scss'

export function InstitutionalCtaSection() {
  const { cta } = institutionalCopy

  return (
    <section id="planos" className={styles.section} aria-labelledby="cta-heading">
      <div className={styles.container}>
        <div className={styles.card}>
          <h2 id="cta-heading" className={styles.title}>
            {cta.title}
          </h2>
          <p className={styles.subtitle}>{cta.subtitle}</p>
          <div className={styles.actions}>
            <a href="/#cursos" className={styles.btnPrimary}>
              {cta.primary}
              <svg className={styles.icon} fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
            <a href="#contato" className={styles.btnSecondary}>
              {cta.secondary}
              <FiMessageCircle className={styles.btnIcon} aria-hidden />
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
