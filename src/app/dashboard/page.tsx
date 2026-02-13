import { Navbar } from '@src/components/layout/Navbar'
import { Footer } from '@src/components/layout/Footer'
import { Banner } from '@src/components/dashboard/Banner'
import { SummaryCards } from '@src/components/dashboard/SummaryCards'
import { RecentAdventures } from '@src/components/dashboard/RecentAdventures'
import { WelcomeCard } from '@src/components/dashboard/WelcomeCard'
import { Events } from '@src/components/dashboard/Events'
import { Ranking } from '@src/components/dashboard/Ranking'

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="mx-auto max-w-7xl px-4 pb-8 pt-24 sm:px-6 lg:px-8">
        <div className="mb-8">
          <Banner />
        </div>
        <div className="mb-8">
          <SummaryCards />
        </div>
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          <div>
            <RecentAdventures />
          </div>
          <div className="space-y-6">
            <WelcomeCard />
            <Events />
          </div>
        </div>
        <div className="mt-8">
          <Ranking />
        </div>
      </main>
      <Footer />
    </div>
  )
}
