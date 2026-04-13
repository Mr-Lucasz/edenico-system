import type { ReactNode } from 'react'
import { Navbar } from '@src/components/layout/Navbar'
import { Footer } from '@src/components/layout/Footer'
import styles from './AcademyStubShell.module.scss'

interface AcademyStubShellProps {
  title: string
  subtitle?: string
  children?: ReactNode
}

export function AcademyStubShell({ title, subtitle, children }: AcademyStubShellProps) {
  return (
    <div className={styles.page}>
      <Navbar />
      <main className={styles.main}>
        <h1 className={styles.title}>{title}</h1>
        {subtitle ? <p className={styles.subtitle}>{subtitle}</p> : null}
        {children}
      </main>
      <Footer />
    </div>
  )
}
