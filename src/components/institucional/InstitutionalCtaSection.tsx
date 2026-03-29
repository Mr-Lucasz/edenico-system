'use client'

import { institutionalCopy } from '@src/constants/institutionalCopy'
import { useCallback } from 'react'
import styles from './InstitutionalCtaSection.module.scss'

export function InstitutionalCtaSection() {
  const { cta } = institutionalCopy

  const scrollToContact = useCallback(() => {
    const url = new URL(window.location.href)
    url.searchParams.set('assunto', 'parceria')
    window.history.replaceState({}, '', url.toString())
    const el = document.getElementById('contato')
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }, [])

  return (
    <section className={styles.section} aria-labelledby="cta-heading">
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
            <button type="button" onClick={scrollToContact} className={styles.btnSecondary}>
              {cta.secondary}
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
