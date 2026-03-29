import Image from 'next/image'
import Link from 'next/link'

import { SectionTransitionShape } from './SectionTransitionShape'
import styles from './WhyChooseSection.module.scss'

const FEATURES = [
  {
    icon: '/icon-core.png',
    title: 'Filosofia STARS Holística',
    description:
      'Desenvolvimento completo através de Ciência, Tecnologia, Artes, Relações e Sustentabilidade.',
    iconTone: 'purple' as const,
  },
  {
    icon: '/icon-star.png',
    title: 'Universo Exclusivo de Personagens',
    description:
      'Mascotes animais únicos que criam conexão emocional e tornam o aprendizado memorável.',
    iconTone: 'pink' as const,
  },
  {
    icon: '/icon-perfil.png',
    title: 'Conteúdo Personalizado por Perfil',
    description:
      'Experiências adaptadas para estudantes, professores e pais, atendendo necessidades específicas.',
    iconTone: 'green' as const,
  },
]

const iconToneClass = {
  purple: styles.iconPurple,
  pink: styles.iconPink,
  green: styles.iconGreen,
} as const

export function WhyChooseSection() {
  return (
    <section id="cursos" className={styles.section} aria-labelledby="why-heading">
      <div className={styles.inner}>
        <h2 id="why-heading" className={styles.title}>
          Por que escolher <span style={{ color: '#3980F5' }}>Edênicos Academy</span>?
        </h2>

        <div className={styles.grid}>
          {FEATURES.map((feature) => (
            <article key={feature.title} className={styles.card}>
              <div className={`${styles.iconWrap} ${iconToneClass[feature.iconTone]}`}>
                <Image
                  src={feature.icon}
                  alt=""
                  width={28}
                  height={28}
                  className={styles.iconImg}
                />
              </div>
              <h3 className={styles.cardTitle}>{feature.title}</h3>
              <p className={styles.cardDesc}>{feature.description}</p>
            </article>
          ))}
        </div>

        <div className={styles.mascotRow}>
          <div className={styles.mascotPill}>
            <div className={styles.mascotImgWrap}>
              <Image
                src="/container-imagem-mascotes.svg"
                alt=""
                width={145}
                height={35}
                className={styles.mascotImg}
                unoptimized
              />
            </div>
            <p className={styles.mascotText}>Junte-se à nossa comunidade de aprendizado!</p>
          </div>
        </div>

        <div className={styles.ctaRow}>
          <Link href="/register" className={styles.cta}>
            Comece sua jornada hoje!
          </Link>
        </div>
      </div>

      <SectionTransitionShape
        className={styles.transition}
        imageClassName={styles.transitionImg}
      />
    </section>
  )
}
