'use client'

import { useRef, useState, useEffect, type CSSProperties } from 'react'
import { institutionalCopy } from '@src/constants/institutionalCopy'
import { institutionalStats } from '@src/constants/institutionalStats'
import { FiZap, FiBook, FiTool } from 'react-icons/fi'
import { HiOutlineRocketLaunch } from 'react-icons/hi2'
import { MdOutlineSportsEsports } from 'react-icons/md'
import { BiNetworkChart } from 'react-icons/bi'
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

const SERVICE_ICONS = [HiOutlineRocketLaunch, MdOutlineSportsEsports, FiTool] as const

export function DifferentiatorsImpactSection() {
  const { differentiators, services } = institutionalCopy
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
      valueColor: '#ec4899',
      barColor: '#ec4899',
    },
  ]

  const serviceAccent = [
    { topClass: styles.serviceTopGreen, barClass: styles.serviceBarGreen, iconColor: '#15803d' },
    { topClass: styles.serviceTopOrange, barClass: styles.serviceBarOrange, iconColor: '#c2410c' },
    { topClass: styles.serviceTopPurple, barClass: styles.serviceBarPurple, iconColor: '#7e22ce' },
  ] as const

  return (
    <section className={styles.section} aria-labelledby="differentiators-heading">
      <div className={styles.container}>
        <header className={styles.sectionHead}>
          <h2 id="differentiators-heading" className={styles.titleBlock}>
            <span className={styles.titleLine}>{differentiators.titleLine1}</span>
            <span className={styles.titleLineAccent}>{differentiators.titleLine2}</span>
            <span className={styles.titleLineMuted}>{differentiators.titleLine3}</span>
          </h2>
          <span className={styles.titleRule} aria-hidden />
          <p className={styles.intro}>{differentiators.intro}</p>
        </header>

        <div className={styles.topGrid}>
          <div className={styles.mainCol}>
            <div className={styles.cards2}>
              <article className={styles.approachCard}>
                <div className={styles.cardRow}>
                  <div className={styles.iconSolidGreen}>
                    <FiZap className={styles.iconSm} aria-hidden />
                  </div>
                  <div className={styles.cardBody}>
                    <h3 className={styles.artHead}>{differentiators.approach.title}</h3>
                    <p className={styles.artBody}>{differentiators.approach.description}</p>
                  </div>
                </div>
              </article>
              <article className={styles.approachCard}>
                <div className={styles.cardRow}>
                  <div className={styles.iconSolidOrange}>
                    <FiBook className={styles.iconSm} aria-hidden />
                  </div>
                  <div className={styles.cardBody}>
                    <h3 className={styles.artHead}>{differentiators.methodology.title}</h3>
                    <p className={styles.artBody}>{differentiators.methodology.description}</p>
                  </div>
                </div>
              </article>
            </div>

            <div id="ecossistema" className={styles.servicesEmbed}>
              <h3 className={styles.servicesHeading}>{differentiators.embeddedServicesHeading}</h3>
              <div className={styles.servicesGrid}>
                {services.items.map((item, i) => {
                  const Icon = SERVICE_ICONS[i]
                  const acc = serviceAccent[i]
                  return (
                    <article key={item.title} className={styles.serviceCard}>
                      <div className={acc.topClass}>
                        <Icon className={styles.serviceIcon} style={{ color: acc.iconColor }} aria-hidden />
                      </div>
                      <div className={styles.serviceBody}>
                        <h4 className={styles.serviceTitle}>{item.title}</h4>
                        <p className={styles.serviceDesc}>{item.description}</p>
                      </div>
                      <div className={acc.barClass} aria-hidden />
                    </article>
                  )
                })}
              </div>
            </div>
          </div>

          <div ref={statsRef} className={styles.statsCol}>
            <div className={styles.impactHeroWrap}>
              <article className={styles.impactHero} aria-labelledby="impact-heading">
                <div className={styles.impactHeroVisual} aria-hidden>
                  <div className={styles.impactHeroVisualInner}>Mapa / placeholder</div>
                </div>
                <div className={styles.impactHeroText}>
                  <h3 id="impact-heading" className={styles.impactHeroTitle}>
                    {differentiators.impactTitle}
                  </h3>
                  <p className={styles.impactHeroSub}>{differentiators.impactSubtitle}</p>
                </div>
              </article>
            </div>

            <div className={styles.kpiBlock}>
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

            <article className={styles.presence} aria-labelledby="presence-heading">
              <div className={styles.presenceInner}>
                <div className={styles.presenceRow}>
                  <div className={styles.networkWrap}>
                    <BiNetworkChart className={styles.networkIcon} aria-hidden />
                  </div>
                  <div className={styles.presenceContent}>
                    <h3 id="presence-heading" className={styles.presenceTitle}>
                      {differentiators.presence.title}
                    </h3>
                    <p className={styles.presenceSub}>{differentiators.presence.subtitle}</p>
                    <p className={styles.presenceDesc}>{differentiators.presence.description}</p>
                    <p className={styles.badgeRow}>
                      <span className={styles.badgeCircles} aria-hidden>
                        <span className={styles.badgeCircleYellow} />
                        <span className={styles.badgeCircleGreen} />
                        <span className={styles.badgeCirclePurple} />
                      </span>
                      <span className={styles.badgeText}>{differentiators.presence.badge}</span>
                    </p>
                  </div>
                </div>
              </div>
            </article>
          </div>
        </div>
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
}: Readonly<{
  value: string
  label: string
  valueColor: string
  barColor: string
  inView: boolean
}>) {
  const shouldAnimate = /[\d.,+]/.test(value) && !value.includes('/')
  const animated = useCountUp(value, shouldAnimate && inView)
  let displayValue = '—'
  if (inView) {
    displayValue = shouldAnimate ? animated : value
  }
  const valStyle: CSSProperties = { color: valueColor }
  const barStyle: CSSProperties = { backgroundColor: barColor }
  return (
    <div className={styles.statCard}>
      <span className={styles.statValue} style={valStyle}>
        {displayValue}
      </span>
      <p className={styles.statLabel}>{label}</p>
      <div className={styles.statBar} style={barStyle} />
    </div>
  )
}
