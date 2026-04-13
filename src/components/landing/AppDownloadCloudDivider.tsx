import styles from './AppDownloadCloudDivider.module.scss'

const CLOUDS_FOOTER_SRC = '/clouds-footer.svg'

/**
 * Secção só com o divisor de nuvens (SVG), antes da AppDownloadSection.
 */
export function AppDownloadCloudDivider() {
  return (
    <section className={styles.section} aria-hidden>
      <img
        src={CLOUDS_FOOTER_SRC}
        alt=""
        width={1585}
        height={992}
        decoding="async"
        className={styles.img}
      />
    </section>
  )
}
