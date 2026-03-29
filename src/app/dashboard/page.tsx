import { Navbar } from '@src/components/layout/Navbar'
import { Footer } from '@src/components/layout/Footer'
import { Banner } from '@src/components/dashboard/Banner'
import { SummaryCards } from '@src/components/dashboard/SummaryCards'
import { RecentAdventures } from '@src/components/dashboard/RecentAdventures'
import { WelcomeCard } from '@src/components/dashboard/WelcomeCard'
import { Events } from '@src/components/dashboard/Events'
import { Ranking } from '@src/components/dashboard/Ranking'
import styles from './dashboardPage.module.scss'

export default function DashboardPage() {
  return (
    <div className={styles.page}>
      <Navbar />
      <main className={styles.main}>
        <div className={styles.mb8}>
          <Banner />
        </div>
        <div className={styles.mb8}>
          <SummaryCards />
        </div>
        <div className={styles.grid2}>
          <div>
            <RecentAdventures />
          </div>
          <div className={styles.stack}>
            <WelcomeCard />
            <Events />
          </div>
        </div>
        <div className={styles.mt8}>
          <Ranking />
        </div>
      </main>
      <Footer />
    </div>
  )
}
