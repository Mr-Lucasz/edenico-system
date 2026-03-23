import Image from 'next/image'

import { PhilosophyCards } from './PhilosophyCards'
import { PhilosophyCta } from './PhilosophyCta'
import { SectionTransitionShape } from './SectionTransitionShape'

const STAR_LARGE = '/star-large.svg'
const STAR_SMALL = '/star-small.svg'
const STAR_MINI = '/star-mini.svg'

export function PhilosophySection() {
  return (
    <section
      className="filosofia-section pb-24 pt-16 sm:pt-20"
      aria-labelledby="philosophy-heading"
    >
      {/* Estrelas: hierarquia fixa (Figma) */}
      <div
        className="filosofia-stars pointer-events-none absolute inset-0 z-[1] overflow-hidden"
        aria-hidden
      >
        {/* Dominante — parcialmente cortada */}
        <Image
          src={STAR_LARGE}
          alt=""
          width={202}
          height={224}
          className="star filosofia-star--large absolute -left-7 -top-7 h-auto w-[70px] opacity-90 md:-left-10 md:-top-10 md:w-[100px]"
          unoptimized
        />
        {/* Média — direita superior */}
        <Image
          src={STAR_SMALL}
          alt=""
          width={69}
          height={69}
          className="star star--delay-1 filosofia-star--medium absolute right-8 top-20 h-auto w-3 opacity-85 md:right-[200px] md:top-[140px] md:w-[18px]"
          unoptimized
        />
        {/* Pequena — direita inferior */}
        <Image
          src={STAR_MINI}
          alt=""
          width={41}
          height={41}
          className="star star--delay-2 filosofia-star--small absolute bottom-24 right-12 h-auto w-[10px] opacity-70 md:bottom-[120px] md:right-[240px] md:w-[14px]"
          unoptimized
        />
        {/* Glow decorativo — esquerda */}
        <Image
          src={STAR_MINI}
          alt=""
          width={41}
          height={41}
          className="star star--delay-3 filosofia-star--glow absolute bottom-32 left-8 h-auto w-[14px] opacity-95 md:bottom-[160px] md:left-[140px] md:w-5"
          unoptimized
        />
      </div>

      <div className="relative z-[2] mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative w-full">
          <div className="w-full min-w-0 max-md:mx-auto md:max-w-[min(42rem,calc(100%-31rem))] md:[&_.filosofia-cards]:mx-0 lg:max-w-[min(42rem,calc(100%-33rem))]">
            <div className="mb-8 text-center">
              <h2
                id="philosophy-heading"
                className="text-4xl font-bold uppercase tracking-tight text-white sm:text-5xl"
              >
                FILOSOFIA
              </h2>
              <p className="mt-1 text-xl text-white/95">Educação 5.0</p>
            </div>
            <PhilosophyCards />
          </div>
          <PhilosophyCta />
        </div>
      </div>

      {/* Transição de secção: onda inferior (SVG dedicado) */}
      <SectionTransitionShape className="absolute bottom-0 left-0 right-0 z-0" />
    </section>
  )
}
