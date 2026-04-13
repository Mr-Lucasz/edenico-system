import { LandingFooter } from '@src/components/landing/LandingFooter'
import { LandingHeader } from '@src/components/landing/LandingHeader'
import { AuthSplitBranding } from './AuthSplitBranding'
import styles from './AuthSplitLayout.module.scss'

type Props = {
  children: React.ReactNode
}

export function AuthRouteShell({ children }: Props) {
  return (
    <div className={styles.page}>
      <LandingHeader />
      <main className={styles.main}>
        <div className={styles.split}>
          <AuthSplitBranding />
          <div className={styles.right}>
            <div className={styles.formMax}>{children}</div>
          </div>
        </div>
      </main>
      <LandingFooter />
    </div>
  )
}
