import type { ReactNode } from 'react'
import { Navbar } from '@src/components/layout/Navbar'
import { Footer } from '@src/components/layout/Footer'
import styles from './CursosPageLayout.module.scss'

interface CursosPageLayoutProps {
  children: ReactNode
}

export function CursosPageLayout({ children }: CursosPageLayoutProps) {
  return (
    <div className={styles.page}>
      <Navbar />
      <div className={styles.inner}>{children}</div>
      <Footer />
    </div>
  )
}
