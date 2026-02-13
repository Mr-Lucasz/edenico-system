'use client'

import { useRef, useState, useEffect } from 'react'
import { institutionalCopy } from '@src/constants/institutionalCopy'
import { institutionalStats } from '@src/constants/institutionalStats'
import { FiZap, FiBook, FiMapPin } from 'react-icons/fi'

const STAT_KEYS = ['studentsImpacted', 'schoolsPartner', 'satisfactionPercent', 'supportLabel'] as const

function useCountUp(end: string, enabled: boolean, duration = 1500): string {
  const [value, setValue] = useState('0')
  const hasRun = useRef(false)

  useEffect(() => {
    if (!enabled || hasRun.current) return
    hasRun.current = true
    const numericStr = end.replace(/[^\d.,]/g, '').replace(/\./g, '')
    const suffix = end.replace(/[\d.,]/g, '') || ''
    const target = numericStr ? parseInt(numericStr, 10) : 0
    if (target === 0 && end !== '0') {
      setValue(end)
      return
    }
    const startTime = performance.now()

    const tick = (now: number) => {
      const elapsed = now - startTime
      const progress = Math.min(elapsed / duration, 1)
      const easeOut = 1 - (1 - progress) ** 2
      const current = Math.floor(easeOut * target)
      const formatted = target >= 1000 ? current.toLocaleString('pt-BR') : String(current)
      setValue(formatted + suffix)
      if (progress < 1) requestAnimationFrame(tick)
      else setValue(end)
    }
    requestAnimationFrame(tick)
  }, [end, enabled, duration])

  return value
}

function useInView(threshold = 0.2): [React.RefObject<HTMLDivElement | null>, boolean] {
  const ref = useRef<HTMLDivElement>(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setInView(true)
      },
      { threshold }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return [ref, inView]
}

export function DifferentiatorsImpactSection() {
  const { differentiators } = institutionalCopy
  const { impact } = institutionalStats
  const [statsRef, statsInView] = useInView(0.2)

  const statsDisplay = [
    { key: 'studentsImpacted' as const, value: impact.studentsImpacted, label: differentiators.stats.students, color: 'text-green-600' },
    { key: 'schoolsPartner' as const, value: impact.schoolsPartner, label: differentiators.stats.schools, color: 'text-orange-600' },
    { key: 'satisfactionPercent' as const, value: impact.satisfactionPercent, label: differentiators.stats.satisfaction, color: 'text-purple-600' },
    { key: 'supportLabel' as const, value: impact.supportLabel, label: differentiators.stats.support, color: 'text-red-600' },
  ]

  return (
    <section className="bg-white px-4 py-16 sm:px-6 lg:px-8" aria-labelledby="differentiators-heading">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-12 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-8">
            <div>
              <h2 id="differentiators-heading" className="text-3xl font-bold text-gray-900">
                {differentiators.title} <span className="text-edenicos-yellow">{differentiators.subtitle}</span>
              </h2>
            </div>
            <div className="grid gap-6 sm:grid-cols-2">
              <article className="rounded-2xl border border-gray-100 bg-green-50/50 p-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-100 text-green-600">
                  <FiZap className="h-6 w-6" aria-hidden />
                </div>
                <h3 className="mt-4 font-bold text-gray-900">{differentiators.approach.title}</h3>
                <p className="mt-2 text-sm text-gray-700">{differentiators.approach.description}</p>
              </article>
              <article className="rounded-2xl border border-gray-100 bg-orange-50/50 p-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange-100 text-orange-600">
                  <FiBook className="h-6 w-6" aria-hidden />
                </div>
                <h3 className="mt-4 font-bold text-gray-900">{differentiators.methodology.title}</h3>
                <p className="mt-2 text-sm text-gray-700">{differentiators.methodology.description}</p>
              </article>
            </div>
          </div>

          <div ref={statsRef} className="space-y-6">
            <div>
              <h3 className="text-xl font-bold text-gray-900">{differentiators.impactTitle}</h3>
              <p className="mt-1 text-sm text-gray-600">{differentiators.impactSubtitle}</p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {statsDisplay.map(({ key, value, label, color }) => (
                <StatBlock key={key} value={value} label={label} color={color} inView={statsInView} />
              ))}
            </div>
          </div>
        </div>

        <article className="mt-12 rounded-2xl bg-edenicos-navy p-8 text-white">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div className="flex items-start gap-4">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-white/10">
                <FiMapPin className="h-7 w-7 text-edenicos-yellow" aria-hidden />
              </div>
              <div>
                <h3 className="text-xl font-bold">{differentiators.presence.title}</h3>
                <p className="mt-1 text-white/80">{differentiators.presence.subtitle}</p>
                <p className="mt-4 text-white/90">{differentiators.presence.description}</p>
                <p className="mt-4 flex items-center gap-2 text-edenicos-yellow">
                  <span className="flex h-2 w-2 rounded-full bg-edenicos-yellow" />
                  {differentiators.presence.badge}
                </p>
              </div>
            </div>
            <div className="h-40 w-full shrink-0 overflow-hidden rounded-xl bg-white/5 md:w-64" aria-hidden>
              <div className="flex h-full items-center justify-center text-white/40">Mapa / placeholder</div>
            </div>
          </div>
        </article>
      </div>
    </section>
  )
}

function StatBlock({
  value,
  label,
  color,
  inView,
}: {
  value: string
  label: string
  color: string
  inView: boolean
}) {
  const shouldAnimate = /[\d.,+]/.test(value) && !value.includes('/')
  const displayValue = shouldAnimate ? useCountUp(value, inView) : inView ? value : '—'
  return (
    <div className="rounded-xl border border-gray-100 bg-gray-50 p-4">
      <span className={`text-2xl font-bold ${color}`}>{displayValue}</span>
      <div className={`mt-1 h-0.5 w-12 rounded ${color.replace('text-', 'bg-')}`} />
      <p className="mt-2 text-sm font-medium text-gray-700">{label}</p>
    </div>
  )
}
