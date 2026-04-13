import type { Metadata } from 'next'
import { LandingHeader } from '@src/components/landing/LandingHeader'
import { LandingFooter } from '@src/components/landing/LandingFooter'
import {
  GameHero,
  GameHowToPlaySection,
  GameSaveWorldSection,
  GameAdventureCtaSection,
} from '@src/components/game'
import styles from './gamePage.module.scss'

export const metadata: Metadata = {
  title: 'Game | Edênicos Academy',
  description:
    'Jogue Edênicos: personagens, missões e diversão com propósito. Baixe o app e comece a aventura.',
}

export default function GamePage() {
  return (
    <div className={styles.page}>
      <LandingHeader />
      <main className={styles.main}>
        <GameHero />
        <GameHowToPlaySection />
        <GameSaveWorldSection />
        <GameAdventureCtaSection />
      </main>
      <LandingFooter />
    </div>
  )
}
