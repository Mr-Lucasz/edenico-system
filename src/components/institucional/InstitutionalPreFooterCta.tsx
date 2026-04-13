import Link from 'next/link'
import { FiCheck } from 'react-icons/fi'

import { AppDownloadCloudDivider } from '@src/components/landing/AppDownloadCloudDivider'
import { institutionalCopy } from '@src/constants/institutionalCopy'
import styles from './InstitutionalPreFooterCta.module.scss'

const TORN_DIVIDER_SRC = '/stars-section-divider-wave.svg'

export function InstitutionalPreFooterCta() {
  const { preFooterCta: copy } = institutionalCopy

  return (
    <section
      id="contato"
      className={styles.wrap}
      aria-labelledby="institucional-prefooter-cta-heading"
    >
      <div className={styles.tornTop} aria-hidden>
        <img
          src={TORN_DIVIDER_SRC}
          alt=""
          width={1585}
          height={447}
          className={styles.tornTopImg}
          decoding="async"
        />
      </div>

      <div className={styles.bgDecor} aria-hidden>
        <span className={styles.decorCircle} data-pos="tr" />
        <span className={styles.decorCircle} data-pos="bl" />
      </div>

      <div className={styles.inner}>
        {copy.badge ? <span className={styles.badgeNovo}>{copy.badge}</span> : null}
        <h2 id="institucional-prefooter-cta-heading" className={styles.title}>
          {copy.title}
        </h2>
        <p className={styles.subtitle}>{copy.subtitle}</p>

        <div className={styles.actions}>
          <Link href={copy.primaryHref} className={styles.btnPrimary}>
            {copy.primary}
          </Link>
          <Link href={copy.secondaryHref} className={styles.btnSecondary}>
            {copy.secondary}
          </Link>
        </div>

        <ul className={styles.features}>
          {copy.features.map((text) => (
            <li key={text} className={styles.featureItem}>
              <FiCheck className={styles.featureIcon} aria-hidden />
              <span>{text}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className={styles.cloudSection}>
        <AppDownloadCloudDivider />
      </div>
    </section>
  )
}
