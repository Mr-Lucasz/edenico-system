import {
  LandingHeader,
  HeroSection,
  StarsSection,
  WhyChooseSection,
  PhilosophySection,
  StarsBelowPhilosophySection,
  EdenicosTitleBridgeSection,
  AppDownloadSection,
  ContactForm,
  LandingFooter,
} from '@src/components/landing'
import styles from './homePage.module.scss'

export default function HomePage() {
  return (
    <div className={styles.page}>
      <LandingHeader />
      <main className={styles.main}>
        <HeroSection />
        <StarsSection />
        <WhyChooseSection />
        <PhilosophySection />
        <StarsBelowPhilosophySection />
        <EdenicosTitleBridgeSection />
        <AppDownloadSection />
        <section className={styles.contactSection} aria-labelledby="contato">
          <div className={styles.contactInner}>
            <ContactForm variant="help" />
          </div>
        </section>
        <LandingFooter />
      </main>
    </div>
  )
}
