import {
  LandingHeader,
  HeroSection,
  StarsSection,
  WhyChooseSection,
  PhilosophySection,
  TestimonialsSection,
  AppDownloadSection,
  ContactForm,
  LandingFooter,
} from '@src/components/landing'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      <LandingHeader />
      <main className="pt-[100px]">
        <HeroSection />
        <StarsSection />
        <WhyChooseSection />
        <PhilosophySection />
        <TestimonialsSection />
        <AppDownloadSection />
        <section className="bg-edenicos-navy px-4 py-16 sm:px-6 lg:px-8" aria-labelledby="contato">
          <div className="mx-auto max-w-4xl">
            <ContactForm />
          </div>
        </section>
        <LandingFooter />
      </main>
    </div>
  )
}
