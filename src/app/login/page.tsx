import Link from 'next/link'
import styles from '../authPage.module.scss'

export default function LoginPage() {
  return (
    <div className={styles.page}>
      <h1 className={styles.title}>Entrar</h1>
      <p className={styles.sub}>Página de login (a implementar).</p>
      <Link href="/" className={styles.link}>
        Voltar à home
      </Link>
    </div>
  )
}
