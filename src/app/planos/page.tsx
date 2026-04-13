import type { Metadata } from 'next'
import { LandingHeader } from '@src/components/landing/LandingHeader'
import { LandingFooter } from '@src/components/landing/LandingFooter'
import {
  PlanosConsultingBanner,
  PlanosDonationSection,
  PlanosPricingSection,
} from '@src/components/planos'
import styles from './planosPage.module.scss'

export const metadata: Metadata = {
  title: 'Planos | Edênicos Academy',
  description:
    'Apoie a educação, conheça consultoria personalizada e escolha o plano ideal na Edênicos Academy.',
}

export default function PlanosPage() {
  return (
    <div className={styles.page}>
      <LandingHeader />
      <main className={styles.main}>
        <PlanosDonationSection />
        <PlanosConsultingBanner />
        <PlanosPricingSection />
      </main>
      <LandingFooter />
    </div>
  )
}
