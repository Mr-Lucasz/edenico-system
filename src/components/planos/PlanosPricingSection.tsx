'use client'

import Link from 'next/link'
import { useId, useState } from 'react'
import { FiCheck, FiStar, FiZap } from 'react-icons/fi'
import { PLANOS_PRICING } from '@src/constants/planosPageCopy'
import styles from './PlanosPricingSection.module.scss'

function formatBRL(n: number) {
  return n.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
}

const ICON_BY_PLAN = {
  blue: FiCheck,
  purple: FiStar,
  rose: FiZap,
} as const

export function PlanosPricingSection() {
  const [annual, setAnnual] = useState(false)
  const switchId = useId()

  const iconWrapByPlan = {
    blue: styles.iconBlue,
    purple: styles.iconPurple,
    rose: styles.iconRose,
  } as const

  return (
    <section className={styles.section} aria-labelledby="planos-pricing-heading">
      <div className={styles.inner}>
        <header className={styles.header}>
          <h2 id="planos-pricing-heading" className={styles.title}>
            {PLANOS_PRICING.title}
          </h2>
          <p className={styles.subtitle}>{PLANOS_PRICING.subtitle}</p>
        </header>

        <div className={styles.toggleRow}>
          <button
            type="button"
            className={`${styles.toggleLabel} ${annual ? styles.toggleLabelMuted : ''}`}
            onClick={() => setAnnual(false)}
          >
            {PLANOS_PRICING.monthly}
          </button>
          <button
            id={switchId}
            type="button"
            role="switch"
            aria-checked={annual}
            aria-label={`Faturamento ${annual ? 'anual' : 'mensal'}`}
            data-on={annual}
            className={styles.switch}
            onClick={() => setAnnual((v) => !v)}
          >
            <span className={styles.switchKnob} />
          </button>
          <button
            type="button"
            className={`${styles.toggleLabel} ${annual ? '' : styles.toggleLabelMuted}`}
            onClick={() => setAnnual(true)}
          >
            {PLANOS_PRICING.annual}
          </button>
        </div>
        {annual ? <p className={styles.annualHint}>{PLANOS_PRICING.annualHint}</p> : null}

        <div className={styles.grid}>
          {PLANOS_PRICING.plans.map((plan) => {
            const price = annual ? plan.priceAnnual : plan.priceMonthly
            const Icon = ICON_BY_PLAN[plan.icon]
            const iconClass = iconWrapByPlan[plan.icon]

            return (
              <article
                key={plan.id}
                className={`${styles.card} ${plan.featured ? styles.cardFeatured : ''}`}
              >
                {plan.featured ? (
                  <span className={styles.badge}>{PLANOS_PRICING.popular}</span>
                ) : null}
                <div className={`${styles.cardIcon} ${iconClass}`}>
                  <Icon aria-hidden />
                </div>
                <h3 className={styles.name}>{plan.name}</h3>
                <p className={styles.desc}>{plan.description}</p>
                <div className={styles.priceRow}>
                  <span className={styles.currency}>R$</span>
                  <span className={styles.price}>{formatBRL(price)}</span>
                  <span className={styles.per}>/mês</span>
                </div>
                {annual ? (
                  <p className={styles.annualNote}>Cobrança anual equivalente</p>
                ) : null}
                <ul className={styles.list}>
                  {plan.features.map((f) => (
                    <li key={f} className={styles.item}>
                      <FiCheck className={styles.check} aria-hidden />
                      {f}
                    </li>
                  ))}
                </ul>
                <Link
                  href={`/checkout?plan=${plan.id}`}
                  className={`${styles.btn} ${plan.featured ? styles.btnFeatured : styles.btnMuted}`}
                >
                  {PLANOS_PRICING.acquire}
                </Link>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
