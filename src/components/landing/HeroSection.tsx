'use client'

import { useState } from 'react'
import Image from 'next/image'
import { FiBook, FiUsers } from 'react-icons/fi'
import styles from './HeroSection.module.scss'

type PersonaId = 'estudantes' | 'professores' | 'pais'

const PERSONAS: Record<PersonaId, { title: string; description: string }> = {
  estudantes: {
    title: 'Science',
    description:
      'Os alunos exploram os mistérios da criação por meio da observação, experimentação e pensamento crítico. Aprendem a investigar, questionar e compreender o mundo físico com curiosidade e propósito.',
  },
  professores: {
    title: 'Ferramentas Pedagógicas',
    description:
      'Recursos digitais avançados para apoiar educadores em suas práticas. Planos de aula, acompanhamento de progresso e conteúdos alinhados à metodologia STARS e à Filosofia Educação 5.0.',
  },
  pais: {
    title: 'Acompanhamento e Resultados',
    description:
      'Acompanhe a evolução do seu filho com relatórios claros e indicadores de desenvolvimento. Transparência sobre conquistas, atividades realizadas e sugestões para apoiar o aprendizado em casa.',
  },
}

export function HeroSection() {
  const [persona, setPersona] = useState<PersonaId>('estudantes')
  const content = PERSONAS[persona]

  return (
    <section
      id="inicio"
      className={styles.section}
      style={{
        backgroundImage: 'url(/HeroBackground.svg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
      aria-labelledby="hero-heading"
    >
      <div className={styles.hexWrap} aria-hidden>
        <Image
          src="/HexagonoDouradoHeroSection.png"
          alt=""
          width={520}
          height={520}
          className={styles.hexImg}
          priority
        />
      </div>

      <div className={styles.grid}>
        <div className={styles.spacer} aria-hidden />

        <div className={styles.content}>
          <h1 id="hero-heading" className={styles.headline}>
            <span className={styles.accent}>Descobrir</span> é aprender a ver com novos olhos.
          </h1>

          <div
            id="persona-panel"
            role="tabpanel"
            aria-labelledby={`tab-${persona}`}
            className={styles.panel}
          >
            <h2 className={styles.panelTitle}>{content.title}</h2>
            <p className={styles.panelText}>{content.description}</p>
          </div>

          <div className={styles.tabs} role="tablist" aria-label="Segmentar por público">
            <button
              type="button"
              role="tab"
              aria-selected={persona === 'estudantes'}
              aria-controls="persona-panel"
              id="tab-estudantes"
              onClick={() => setPersona('estudantes')}
              className={`${styles.tab} ${styles.tabBlue}`}
            >
              <svg className={styles.tabIcon} fill="currentColor" viewBox="0 0 20 20" aria-hidden>
                <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
              </svg>
              Estudantes
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={persona === 'professores'}
              aria-controls="persona-panel"
              id="tab-professores"
              onClick={() => setPersona('professores')}
              className={`${styles.tab} ${styles.tabPurple}`}
            >
              <FiBook className={styles.tabIcon} aria-hidden />
              Professores
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={persona === 'pais'}
              aria-controls="persona-panel"
              id="tab-pais"
              onClick={() => setPersona('pais')}
              className={`${styles.tab} ${styles.tabMagenta}`}
            >
              <FiUsers className={styles.tabIcon} aria-hidden />
              Pais
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
