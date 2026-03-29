import styles from './Footer.module.scss'

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <span>Edénicos Academy v1.0</span>
        <span className={styles.sep}>|</span>
        <a href="/privacidade" className={styles.link}>
          Política de Privacidade
        </a>
      </div>
    </footer>
  )
}
