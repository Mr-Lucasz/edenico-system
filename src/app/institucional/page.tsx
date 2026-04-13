import type { Metadata } from 'next'
import { LandingHeader } from '@src/components/landing/LandingHeader'
import { LandingFooter } from '@src/components/landing/LandingFooter'
import { InstitucionalHero } from '@src/components/institucional/InstitucionalHero'
import { AboutSection } from '@src/components/institucional/AboutSection'
import { PrinciplesSection } from '@src/components/institucional/PrinciplesSection'
import { DifferentiatorsImpactSection } from '@src/components/institucional/DifferentiatorsImpactSection'
import { InstitutionalCtaSection } from '@src/components/institucional/InstitutionalCtaSection'
import { StarsMethodologySection } from '@src/components/institucional/StarsMethodologySection'
import { Philosophy50Section } from '@src/components/institucional/Philosophy50Section'
import { IdentityAcademySection } from '@src/components/institucional/IdentityAcademySection'
import { InstitutionalPreFooterCta } from '@src/components/institucional/InstitutionalPreFooterCta'
import styles from './institucionalPage.module.scss'

export const metadata: Metadata = {
  title: 'Institucional | Edênicos Academy - Educação do Futuro',
  description:
    'Conheça a metodologia STARS e a Filosofia Educação 5.0. Transforme sua instituição com tecnologia educacional e impacto comprovado.',
}

const structuredData = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'EducationalOrganization',
      '@id': 'https://edenicos.academy/#organization',
      name: 'Edênicos Academy',
      description:
        'Empresa de tecnologia educacional dedicada à transformação da educação através da metodologia STARS e Filosofia Educação 5.0.',
      url: 'https://edenicos.academy',
    },
    {
      '@type': 'Service',
      name: 'Plataformas Educacionais',
      description: 'Desenvolvimento de sistemas completos de gestão educacional com foco na experiência do usuário.',
      provider: { '@id': 'https://edenicos.academy/#organization' },
    },
    {
      '@type': 'Service',
      name: 'Jogos Interativos',
      description:
        'Criação de jogos educativos que tornam o aprendizado divertido e envolvente para todas as idades.',
      provider: { '@id': 'https://edenicos.academy/#organization' },
    },
    {
      '@type': 'Service',
      name: 'Ferramentas Pedagógicas',
      description:
        'Desenvolvimento de recursos digitais avançados para apoiar educadores em suas práticas pedagógicas.',
      provider: { '@id': 'https://edenicos.academy/#organization' },
    },
  ],
}

export default function InstitucionalPage() {
  return (
    <div className={styles.page}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <LandingHeader />
      <main className={styles.main}>
        <InstitucionalHero />
        <AboutSection />
        <PrinciplesSection />
        <DifferentiatorsImpactSection />
        <InstitutionalCtaSection />
        <StarsMethodologySection />
        <Philosophy50Section />
        <IdentityAcademySection />
        <InstitutionalPreFooterCta />
        <LandingFooter variant="institucional" />
      </main>
    </div>
  )
}
