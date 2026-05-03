import type { ReactNode } from 'react'
import { cn } from '@src/utils/cn'
import { Navbar } from '@src/components/layout/Navbar'
import { Footer } from '@src/components/layout/Footer'
import styles from './AcademyStubShell.module.scss'

interface AcademyStubShellProps {
  title?: string
  subtitle?: string
  children?: ReactNode
  /** Superfície da página: protótipo Academy usa branco (#fff) na área principal */
  surface?: 'muted' | 'white'
}

export function AcademyStubShell({ title, subtitle, children, surface = 'muted' }: AcademyStubShellProps) {
  return (
    <div className={cn(styles.page, surface === 'white' && styles.pageWhite)}>
      <Navbar />
      <main className={styles.main}>
        {title ? <h1 className={styles.title}>{title}</h1> : null}
        {subtitle ? <p className={styles.subtitle}>{subtitle}</p> : null}
        {children}
      </main>
      <Footer />
    </div>
  )
}
