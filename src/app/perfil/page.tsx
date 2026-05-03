'use client'

import { Footer } from '@src/components/layout/Footer'
import { Navbar } from '@src/components/layout/Navbar'
import { MeuPerfilClient } from '@src/components/profile/MeuPerfilClient'
import styles from './perfilPage.module.scss'

export default function PerfilPage() {
  return (
    <div className={styles.page}>
      <Navbar />
      <main className={styles.main}>
        <MeuPerfilClient />
      </main>
      <Footer />
    </div>
  )
}
