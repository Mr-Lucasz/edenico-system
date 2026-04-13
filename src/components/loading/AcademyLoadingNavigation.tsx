import { StarsLogoMark } from '@src/components/stars/StarsLogoMark'
import styles from './academyLoading.module.scss'

/**
 * Fallback de rota leve (sem JS de progresso): gradiente + barra pill com shimmer CSS.
 */
export function AcademyLoadingNavigation() {
  return (
    <div className={`${styles.shell} ${styles.navCompact} ${styles.montserrat}`}>
      <div className={`${styles.orb1} ${styles.orbMotion}`} aria-hidden />
      <div className={`${styles.orb2} ${styles.orbMotion} ${styles.orb2Motion}`} aria-hidden />
      <div className={`${styles.orb3} ${styles.orbMotion} ${styles.orb3Motion}`} aria-hidden />

      <div className={styles.content}>
        <p className={styles.greeting}>Bem-vindo à</p>
        <div className={styles.logoBlock}>
          <span className={styles.logoEdenicos}>Edênicos</span>
          <span className={styles.logoAcademy}>Academy</span>
        </div>

        <div className={styles.trackWrap}>
          <div className={styles.navTrack} role="status" aria-live="polite" aria-label="A carregar">
            <div className={styles.navShimmer} />
          </div>
        </div>

        <p className={styles.navHint}>A carregar…</p>

        <div className={styles.navLogoMini}>
          <StarsLogoMark size={40} scale={1} />
        </div>
      </div>
    </div>
  )
}
