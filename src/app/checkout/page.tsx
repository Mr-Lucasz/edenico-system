import type { Metadata } from 'next'
import { LandingHeader } from '@src/components/landing/LandingHeader'
import { LandingFooter } from '@src/components/landing/LandingFooter'
import { CheckoutFlow } from '@src/components/checkout'
import styles from './checkoutPage.module.scss'

export const metadata: Metadata = {
  title: 'Checkout | Edênicos Academy',
  description: 'Finalize a compra do seu plano com segurança.',
}

export default function CheckoutPage() {
  return (
    <div className={styles.page}>
      <LandingHeader />
      <main className={styles.main}>
        <div className={styles.container}>
          <CheckoutFlow />
        </div>
      </main>
      <LandingFooter />
    </div>
  )
}
