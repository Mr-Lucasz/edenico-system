'use client'

import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Nunito } from 'next/font/google'
import type { CSSProperties } from 'react'
import { useLayoutEffect, useRef } from 'react'
import { philosophy50Dimensions } from '@src/data/philosophy50Content'
import { cn } from '@src/utils/cn'
import styles from './PhilosophyCards.module.scss'

gsap.registerPlugin(ScrollTrigger)

const nunitoPhilosophy = Nunito({
  subsets: ['latin'],
  weight: ['400'],
  display: 'swap',
})

const ICON_BY_DIMENSION: Record<string, string> = {
  fisica: '/icon-fisico-sectionfilosofia.svg',
  mental: '/icon-mental-sectionfilosofia.svg',
  espiritual: '/icon-espiritual-sectionfilosofia.svg',
  relacional: '/icon-relacional-sectionfilosofia.svg',
  profissional: '/icon-profissional-sectionfilosofia.svg',
}

/** Cores e textos da landing — protótipo Filosofia (cards cheios + branco) */
const LANDING_CARD: Record<
  string,
  { bg: string; border: string; label: string; body: string; tone: 'light' | 'warm' }
> = {
  fisica: {
    bg: '#5283FC',
    border: 'rgb(255 255 255 / 0.22)',
    label: 'FÍSICO',
    body: 'Promovemos o cuidado do corpo como instrumento para o serviço.',
    tone: 'light',
  },
  mental: {
    bg: '#029139',
    border: 'rgb(255 255 255 / 0.2)',
    label: 'MENTAL',
    body: 'Estimulamos o pensamento crítico e o aprendizado contínuo.',
    tone: 'light',
  },
  espiritual: {
    bg: '#FAB512',
    border: 'rgb(255 255 255 / 0.28)',
    label: 'ESPIRITUAL',
    body: 'Cultivamos valores eternos e uma conexão viva com Deus.',
    tone: 'warm',
  },
  relacional: {
    bg: '#FE5651',
    border: 'rgb(255 255 255 / 0.24)',
    label: 'RELACIONAL',
    body: 'Ensinamos a construir vínculos saudáveis, empáticos e cooperativos.',
    tone: 'light',
  },
  profissional: {
    bg: '#B45FFB',
    border: 'rgb(255 255 255 / 0.24)',
    label: 'PROFISSIONAL',
    body: 'Desenvolvemos habilidades para o trabalho e o propósito com excelência.',
    tone: 'light',
  },
}

const STACK_SHRINK_SELECTOR = `.${styles.stackShrinkTarget}`

export function PhilosophyCards() {
  const stackRef = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    const stack = stackRef.current
    if (!stack) return

    const refreshSoon = () => {
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          ScrollTrigger.refresh()
        })
      })
    }

    const mm = gsap.matchMedia()

    /* Mobile: só <div> nativo no sticky — Framer aplicava transform no mesmo nó e quebrava o deck */
    mm.add('(max-width: 639.98px) and (prefers-reduced-motion: no-preference)', () => {
      const ctx = gsap.context(() => {
        const items = gsap.utils.toArray<HTMLElement>(stack.querySelectorAll(`.${styles.stackItem}`))
        if (items.length < 2) return

        items.forEach((item, index) => {
          if (index === items.length - 1) return
          const shrink = item.querySelector<HTMLElement>(STACK_SHRINK_SELECTOR)
          if (!shrink) return

          gsap.fromTo(
            shrink,
            { scale: 1, y: 0, opacity: 1, rotation: 0 },
            {
              scale: 0.94,
              y: -28,
              opacity: 0.9,
              rotation: -1.5,
              ease: 'none',
              scrollTrigger: {
                trigger: items[index + 1],
                start: 'top 90%',
                end: 'top 22%',
                scrub: 0.45,
                invalidateOnRefresh: true,
              },
            }
          )
        })
      }, stack)

      refreshSoon()

      const onLoad = () => {
        ScrollTrigger.refresh()
      }
      if (document.readyState !== 'complete') {
        window.addEventListener('load', onLoad)
      }

      const imgs = stack.querySelectorAll('img')
      const onImgLoad = () => {
        refreshSoon()
      }
      imgs.forEach((img) => {
        if (!img.complete) img.addEventListener('load', onImgLoad)
      })

      return () => {
        window.removeEventListener('load', onLoad)
        imgs.forEach((img) => img.removeEventListener('load', onImgLoad))
        ctx.revert()
      }
    })

    /* Desktop (grid): entrada leve — from() + immediateRender aplicava opacity:0 até o trigger; se o ST não disparava, os cards sumiam */
    mm.add('(min-width: 640px) and (prefers-reduced-motion: no-preference)', () => {
      const ctx = gsap.context(() => {
        const items = gsap.utils.toArray<HTMLElement>(stack.querySelectorAll(`.${styles.stackItem}`))
        if (items.length === 0) return

        gsap.fromTo(
          items,
          { opacity: 0, y: 14 },
          {
            opacity: 1,
            y: 0,
            duration: 0.45,
            stagger: 0.06,
            ease: 'power2.out',
            immediateRender: false,
            scrollTrigger: {
              trigger: stack,
              start: 'top 92%',
              once: true,
              invalidateOnRefresh: true,
            },
          }
        )
      }, stack)

      refreshSoon()

      return () => {
        ctx.revert()
      }
    })

    return () => {
      mm.revert()
    }
  }, [])

  return (
    <div className={cn('filosofia-cards', styles.root, nunitoPhilosophy.className)}>
      <div ref={stackRef} className={styles.stack}>
        {philosophy50Dimensions.map((dim, index) => {
          const iconSrc = ICON_BY_DIMENSION[dim.id]
          const landing = LANDING_CARD[dim.id]
          if (!iconSrc || !landing) return null

          return (
            <div
              key={dim.id}
              className={cn(styles.stackItem, index === philosophy50Dimensions.length - 1 && styles.stackItemLast)}
            >
              <div className={styles.stackShrinkTarget}>
                <article
                  className={cn(styles.card, landing.tone === 'warm' && styles.cardWarm)}
                  style={
                    {
                      '--card-surface': landing.bg,
                      '--card-border': landing.border,
                    } as CSSProperties
                  }
                >
                  <div className={styles.cardIconWrap} aria-hidden>
                    <img
                      src={iconSrc}
                      alt=""
                      width={80}
                      height={94}
                      className={styles.cardIcon}
                      decoding="async"
                    />
                  </div>
                  <div className={styles.cardBody}>
                    <h3 className={styles.cardLabel}>{landing.label}</h3>
                    <p className={styles.cardDesc}>{landing.body}</p>
                  </div>
                  <div className={styles.cardStar} aria-hidden>
                    <img src="/star-mini.svg" alt="" width={22} height={22} decoding="async" />
                  </div>
                </article>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
