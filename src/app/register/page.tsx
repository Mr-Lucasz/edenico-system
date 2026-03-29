import Link from 'next/link'
import styles from '../authPage.module.scss'

export default function RegisterPage() {
  return (
    <div className={styles.page}>
      <h1 className={styles.title}>Inscreva-se</h1>
      <p className={styles.sub}>Fluxo de cadastro / onboarding (a implementar).</p>
      <Link href="/" className={styles.link}>
        Voltar à home
      </Link>
    </div>
  )
}
