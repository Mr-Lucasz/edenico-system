import { gradients } from '@src/constants/gradients'
import styles from './Banner.module.scss'

export function Banner() {
  return (
    <div className={styles.banner} style={{ background: gradients.banner }}>
      <div className={styles.inner}>
        <h1 className={styles.title}>Super Amigos</h1>
        <p className={styles.subtitle}>
          Faça novos amigos e aprenda a ser gentil, carinhoso e um bom colega!
        </p>
      </div>
      <div className={styles.decor} aria-hidden>
        <div className={styles.decorInner}>
          <div className={styles.circles}>
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className={styles.circle} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
