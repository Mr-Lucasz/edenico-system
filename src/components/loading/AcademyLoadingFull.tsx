'use client'

import { StarsLogoMark } from '@src/components/stars/StarsLogoMark'
import styles from './academyLoading.module.scss'

export interface AcademyLoadingFullProps {
  /** Progresso 0–100. */
  progress: number
}

export function AcademyLoadingFull({ progress }: Readonly<AcademyLoadingFullProps>) {
  const clamped = Math.min(100, Math.max(0, progress))
  const rounded = Math.round(clamped)

  return (
    <div className={`${styles.shell} ${styles.montserrat}`}>
      <div className={`${styles.orb1} ${styles.orbMotion}`} aria-hidden />
      <div className={`${styles.orb2} ${styles.orbMotion} ${styles.orb2Motion}`} aria-hidden />
      <div className={`${styles.orb3} ${styles.orbMotion} ${styles.orb3Motion}`} aria-hidden />

      <div className={styles.watermarkWrap} aria-hidden>
        <StarsLogoMark size={72} scale={2.8} variant="watermark" />
      </div>

      <div className={styles.content}>
        <p className={styles.greeting}>Bem-vindo à</p>
        <div className={styles.logoBlock}>
          <span className={styles.logoEdenicos}>Edênicos</span>
          <span className={styles.logoAcademy}>Academy</span>
        </div>

        <p
          className={styles.percent}
          aria-live="polite"
          aria-atomic="true"
        >
          {rounded} %
        </p>

        <div
          className={styles.trackWrap}
          role="progressbar"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={rounded}
          aria-label="Progresso de carregamento"
        >
          <div className={styles.trackGlow} />
          <div className={styles.track}>
            <div className={styles.fill} style={{ width: `${clamped}%` }} />
          </div>
        </div>

        <div className={styles.starsBelow}>
          <StarsLogoMark size={48} scale={1} />
        </div>
      </div>
    </div>
  )
}
