'use client'

import { useRef, useState, useEffect, type CSSProperties } from 'react'
import { institutionalCopy } from '@src/constants/institutionalCopy'
import { institutionalStats } from '@src/constants/institutionalStats'
import { FiZap, FiBook, FiMapPin } from 'react-icons/fi'
import styles from './DifferentiatorsImpactSection.module.scss'

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
    {
      key: 'studentsImpacted' as const,
      value: impact.studentsImpacted,
      label: differentiators.stats.students,
      valueColor: '#16a34a',
      barColor: '#16a34a',
    },
    {
      key: 'schoolsPartner' as const,
      value: impact.schoolsPartner,
      label: differentiators.stats.schools,
      valueColor: '#ea580c',
      barColor: '#ea580c',
    },
    {
      key: 'satisfactionPercent' as const,
      value: impact.satisfactionPercent,
      label: differentiators.stats.satisfaction,
      valueColor: '#9333ea',
      barColor: '#9333ea',
    },
    {
      key: 'supportLabel' as const,
      value: impact.supportLabel,
      label: differentiators.stats.support,
      valueColor: '#dc2626',
      barColor: '#dc2626',
    },
  ]

  return (
    <section className={styles.section} aria-labelledby="differentiators-heading">
      <div className={styles.container}>
        <div className={styles.topGrid}>
          <div className={styles.mainCol}>
            <div>
              <h2 id="differentiators-heading" className={styles.title}>
                {differentiators.title} <span className={styles.accent}>{differentiators.subtitle}</span>
              </h2>
            </div>
            <div className={styles.cards2}>
              <article className={styles.artGreen}>
                <div className={styles.iconGreen}>
                  <FiZap className={styles.iconSm} aria-hidden />
                </div>
                <h3 className={styles.artHead}>{differentiators.approach.title}</h3>
                <p className={styles.artBody}>{differentiators.approach.description}</p>
              </article>
              <article className={styles.artOrange}>
                <div className={styles.iconOrange}>
                  <FiBook className={styles.iconSm} aria-hidden />
                </div>
                <h3 className={styles.artHead}>{differentiators.methodology.title}</h3>
                <p className={styles.artBody}>{differentiators.methodology.description}</p>
              </article>
            </div>
          </div>

          <div ref={statsRef} className={styles.statsCol}>
            <div>
              <h3 className={styles.statsTitle}>{differentiators.impactTitle}</h3>
              <p className={styles.statsSub}>{differentiators.impactSubtitle}</p>
            </div>
            <div className={styles.statsGrid}>
              {statsDisplay.map(({ key, value, label, valueColor, barColor }) => (
                <StatBlock
                  key={key}
                  value={value}
                  label={label}
                  valueColor={valueColor}
                  barColor={barColor}
                  inView={statsInView}
                />
              ))}
            </div>
          </div>
        </div>

        <article className={styles.presence}>
          <div className={styles.presenceInner}>
            <div className={styles.presenceRow}>
              <div className={styles.pinWrap}>
                <FiMapPin className={styles.pinIcon} aria-hidden />
              </div>
              <div>
                <h3 className={styles.presenceTitle}>{differentiators.presence.title}</h3>
                <p className={styles.presenceSub}>{differentiators.presence.subtitle}</p>
                <p className={styles.presenceDesc}>{differentiators.presence.description}</p>
                <p className={styles.badgeRow}>
                  <span className={styles.badgeDot} />
                  {differentiators.presence.badge}
                </p>
              </div>
            </div>
            <div className={styles.mapPlaceholder} aria-hidden>
              <div className={styles.mapInner}>Mapa / placeholder</div>
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
  valueColor,
  barColor,
  inView,
}: {
  value: string
  label: string
  valueColor: string
  barColor: string
  inView: boolean
}) {
  const shouldAnimate = /[\d.,+]/.test(value) && !value.includes('/')
  const displayValue = shouldAnimate ? useCountUp(value, inView) : inView ? value : '—'
  const valStyle: CSSProperties = { color: valueColor }
  const barStyle: CSSProperties = { backgroundColor: barColor }
  return (
    <div className={styles.statCard}>
      <span className={styles.statValue} style={valStyle}>
        {displayValue}
      </span>
      <div className={styles.statBar} style={barStyle} />
      <p className={styles.statLabel}>{label}</p>
    </div>
  )
}
