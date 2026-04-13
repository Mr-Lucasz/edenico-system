import type { ReactNode } from 'react'
import styles from './coursePlayerLayout.module.scss'

interface CoursePlayerLayoutProps {
  header: ReactNode
  main: ReactNode
  sidebar: ReactNode
}

export function CoursePlayerLayout({ header, main, sidebar }: CoursePlayerLayoutProps) {
  return (
    <div className={styles.page}>
      <div className={styles.shell}>
        {header}
        <div className={styles.card}>
          <div className={styles.grid}>
            <div className={styles.main}>{main}</div>
            <aside className={styles.sidebar}>{sidebar}</aside>
          </div>
        </div>
      </div>
    </div>
  )
}
