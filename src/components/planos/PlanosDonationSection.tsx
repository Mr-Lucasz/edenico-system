'use client'

import { useState } from 'react'
import { FiCheck, FiHeart, FiRefreshCw, FiUsers } from 'react-icons/fi'
import { StarsPuzzleTabs } from '@src/components/landing/StarsPuzzleTabs'
import { PLANOS_DONATION } from '@src/constants/planosPageCopy'
import styles from './PlanosDonationSection.module.scss'

export function PlanosDonationSection() {
  const [mode, setMode] = useState<'unique' | 'recurring'>('unique')
  const [amountIx, setAmountIx] = useState(1)
  const [starsTabIndex, setStarsTabIndex] = useState(0)

  return (
    <section className={styles.section} aria-labelledby="planos-donation-heading">
      <div className={styles.bgBlur} aria-hidden />
      <div className={styles.inner}>
        <div className={styles.grid}>
          <div>
            <div className={styles.titleBlock}>
              <h1 id="planos-donation-heading" className={styles.title}>
                {PLANOS_DONATION.titleLine1}
                <br />
                <span className={styles.highlight}>{PLANOS_DONATION.titleHighlight}</span>
              </h1>
              <p className={styles.subtitle}>{PLANOS_DONATION.subtitle}</p>
            </div>

            <div className={styles.card}>
              <div className={styles.typeRow}>
                <button
                  type="button"
                  className={`${styles.typeBtn} ${mode === 'unique' ? styles.typeBtnActive : ''}`}
                  onClick={() => setMode('unique')}
                >
                  <FiHeart className={styles.typeIcon} aria-hidden />
                  {PLANOS_DONATION.donationUnique}
                </button>
                <button
                  type="button"
                  className={`${styles.typeBtn} ${mode === 'recurring' ? styles.typeBtnActive : ''}`}
                  onClick={() => setMode('recurring')}
                >
                  <FiRefreshCw className={styles.typeIcon} aria-hidden />
                  {PLANOS_DONATION.donationRecurring}
                </button>
              </div>

              <div className={styles.amountGrid}>
                {PLANOS_DONATION.amounts.map((label, i) => (
                  <button
                    key={label}
                    type="button"
                    className={`${styles.amountBtn} ${amountIx === i ? styles.amountBtnActive : ''}`}
                    onClick={() => setAmountIx(i)}
                  >
                    {label}
                  </button>
                ))}
              </div>

              <label className={styles.fieldLabel} htmlFor="planos-currency">
                {PLANOS_DONATION.currencyLabel}
              </label>
              <select id="planos-currency" className={styles.select} defaultValue="brl">
                <option value="brl">{PLANOS_DONATION.currencyOption}</option>
              </select>

              <label className={styles.fieldLabel} htmlFor="planos-other">
                {PLANOS_DONATION.otherLabel}
              </label>
              <input
                id="planos-other"
                type="text"
                className={styles.input}
                placeholder={PLANOS_DONATION.otherPlaceholder}
                autoComplete="off"
              />

              <button type="button" className={styles.cta}>
                {mode === 'recurring' ? PLANOS_DONATION.ctaRecurring : PLANOS_DONATION.ctaOnce}
              </button>
            </div>
          </div>

          <div className={styles.right}>
            <div className={styles.starsWrap}>
              <StarsPuzzleTabs
                id="planos-stars-puzzle"
                activeIndex={starsTabIndex}
                onSelectLetter={setStarsTabIndex}
                variant="planos"
              />
            </div>
            <h2 className={styles.rightTitle}>{PLANOS_DONATION.rightTitle}</h2>
            <p className={styles.quote}>{PLANOS_DONATION.quote}</p>
            <p className={styles.author}>{PLANOS_DONATION.quoteAuthor}</p>
            <div className={styles.statsRow}>
              <div className={styles.stat}>
                <span className={`${styles.statIcon} ${styles.iconBlue}`}>
                  <FiUsers aria-hidden />
                </span>
                <span className={styles.statValue}>{PLANOS_DONATION.stats[0].value}</span>
                <span className={styles.statLabel}>{PLANOS_DONATION.stats[0].label}</span>
              </div>
              <div className={styles.stat}>
                <span className={`${styles.statIcon} ${styles.iconPink}`}>
                  <FiCheck aria-hidden />
                </span>
                <span className={styles.statValue}>{PLANOS_DONATION.stats[1].value}</span>
                <span className={styles.statLabel}>{PLANOS_DONATION.stats[1].label}</span>
              </div>
              <div className={styles.stat}>
                <span className={`${styles.statIcon} ${styles.iconPink}`}>
                  <FiHeart aria-hidden />
                </span>
                <span className={styles.statValue}>{PLANOS_DONATION.stats[2].value}</span>
                <span className={styles.statLabel}>{PLANOS_DONATION.stats[2].label}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
