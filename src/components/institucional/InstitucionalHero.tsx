import { institutionalCopy } from '@src/constants/institutionalCopy'
import { FiAward, FiZap, FiUsers, FiCheckCircle, FiGrid, FiFolder } from 'react-icons/fi'

const DIFF_ICONS = [FiAward, FiZap, FiUsers, FiCheckCircle, FiGrid, FiFolder]

export function InstitucionalHero() {
  const { hero } = institutionalCopy
  return (
    <section
      id="inicio"
      className="relative -mt-20 bg-gradient-to-br from-edenicos-navy via-edenicos-navy-light to-edenicos-navy px-4 pt-24 pb-16 sm:px-6 lg:px-8"
      aria-labelledby="institucional-hero-heading"
    >
      <div className="mx-auto grid max-w-7xl gap-12 pt-8 lg:grid-cols-2 lg:items-center lg:pt-12">
        <div>
          <span className="inline-block rounded-full bg-blue-500/20 px-4 py-1.5 text-sm font-medium text-sky-300">
            {hero.badge}
          </span>
          <h1 id="institucional-hero-heading" className="mt-4 text-4xl font-bold leading-tight text-white sm:text-5xl">
            {hero.titleLine1}{' '}
            <span className="text-edenicos-yellow">{hero.titleLine2}</span>{' '}
            {hero.titleLine3}
          </h1>
          <p className="mt-4 text-lg text-white/90">{hero.subtitle}</p>
          <a
            href="#quem-somos"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-orange-500 px-6 py-3 font-medium text-white transition-colors hover:bg-orange-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-edenicos-yellow focus-visible:ring-offset-2 focus-visible:ring-offset-edenicos-navy"
          >
            {hero.cta}
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </a>
        </div>
        <div className="grid grid-cols-2 gap-4 sm:gap-6">
          {hero.differentials.map((label, i) => {
            const Icon = DIFF_ICONS[i]
            return (
              <div
                key={label}
                className="flex flex-col items-center rounded-xl border border-white/10 bg-white/5 p-6 text-center backdrop-blur sm:p-8"
              >
                <div className="rounded-full bg-white/10 p-4 text-edenicos-yellow">
                  <Icon className="h-6 w-6 sm:h-8 sm:w-8" aria-hidden />
                </div>
                <span className="mt-3 text-sm font-medium text-white sm:text-base">{label}</span>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
