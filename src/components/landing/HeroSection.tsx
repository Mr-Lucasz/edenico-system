'use client'

import { useLayoutEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { FiBook, FiUsers } from 'react-icons/fi'
import gsap from 'gsap'
import { heroStarsSlides } from '@src/data/heroStarsSlides'
import styles from './HeroSection.module.scss'

type PersonaId = 'estudantes' | 'professores' | 'pais'

const SLIDE_INTERVAL_SEC = 5.5

function panelDescriptionForPersona(title: string, fullDescription: string, persona: PersonaId): string {
  if (persona === 'estudantes') return fullDescription
  if (persona === 'professores') {
    return `Recursos e trilhas em ${title} para planejar aulas envolventes, alinhadas à metodologia STARS e à Filosofia Educação 5.0.`
  }
  return `Acompanhe como seu filho vivencia ${title} na prática, com relatórios claros e conquistas visíveis na plataforma.`
}

export function HeroSection() {
  const [persona, setPersona] = useState<PersonaId>('estudantes')
  const [slideIndex, setSlideIndex] = useState(0)
  const panelRef = useRef<HTMLDivElement>(null)
  const heptImgWrapRef = useRef<HTMLDivElement>(null)

  const slide = heroStarsSlides[slideIndex]
  const panelText = panelDescriptionForPersona(slide.title, slide.description, persona)
  const skipIntroAnim = useRef(true)

  useLayoutEffect(() => {
    const panel = panelRef.current
    const hept = heptImgWrapRef.current
    if (!panel || !hept) return

    if (skipIntroAnim.current) {
      skipIntroAnim.current = false
      return
    }

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) {
      gsap.set([panel, hept], { clearProps: 'all' })
      return
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        panel,
        { autoAlpha: 0.75, y: 10 },
        { autoAlpha: 1, y: 0, duration: 0.45, ease: 'power2.out' }
      )
      gsap.fromTo(hept, { autoAlpha: 0.35, scale: 0.98 }, { autoAlpha: 1, scale: 1, duration: 0.5, ease: 'power2.out' })
    })

    return () => ctx.revert()
  }, [slideIndex])

  useLayoutEffect(() => {
    let tween: gsap.core.Tween | null = null

    const schedule = () => {
      tween?.kill()
      const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      const sec = reduce ? 12 : SLIDE_INTERVAL_SEC
      tween = gsap.delayedCall(sec, () => {
        setSlideIndex((i) => (i + 1) % heroStarsSlides.length)
        schedule()
      })
    }

    schedule()
    return () => {
      tween?.kill()
    }
  }, [])

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
      <div className={styles.grid}>
        <div className={styles.heptColumn}>
          <div className={styles.heptFrame} aria-label={`Imagem da metodologia: ${slide.title}`}>
            <div className={styles.heptClip}>
              <div ref={heptImgWrapRef} className={styles.heptImgWrap}>
                <Image
                  key={slide.heroImage}
                  src={slide.heroImage}
                  alt=""
                  fill
                  className={styles.heptImg}
                  sizes="(max-width: 1023px) 90vw, 50vw"
                  priority={slideIndex === 0}
                  unoptimized
                />
              </div>
            </div>
          </div>
        </div>

        <div className={styles.content}>
          <h1 id="hero-heading" className={styles.headline}>
            <span className={styles.accent}>Descobrir</span> é aprender a ver com novos olhos.
          </h1>

          <div
            id="persona-panel"
            ref={panelRef}
            role="tabpanel"
            aria-labelledby={`tab-${persona}`}
            aria-live="polite"
            className={styles.panel}
          >
            <p className={styles.starsLetter}>
              <span className={styles.starsLetterMuted}>S.T.A.R.S</span>
              <span className={styles.starsLetterSep}> · </span>
              <span className={styles.starsLetterAccent}>{slide.letter}</span>
            </p>
            <h2 className={styles.panelTitle}>{slide.title}</h2>
            <p className={styles.panelText}>{panelText}</p>
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
