'use client'

import { AnimatePresence, motion } from 'framer-motion'
import {
  useEffect,
  useLayoutEffect,
  useState,
  type CSSProperties,
  type ReactNode,
} from 'react'
import { institutionalCopy } from '@src/constants/institutionalCopy'
import { useMetodologiaHub } from '@src/components/institucional/metodologiaHubContext'
import {
  PHILOSOPHY_50_SELECT_EVENT,
  PHILOSOPHY_50_SHORT_LABEL,
  type Philosophy50SelectDetail,
} from '@src/constants/philosophy50Nav'
import {
  philosophy50Dimensions,
  type Philosophy50Dimension,
} from '@src/data/philosophy50Content'
import {
  getPhilosophyActivityIcon,
  getPhilosophyHowCareIcon,
  philosophy50HeaderIcons,
} from '@src/data/philosophy50Icons'
import { cn } from '@src/utils/cn'
import { FiChevronDown } from 'react-icons/fi'
import styles from './Philosophy50Section.module.scss'

const DEFAULT_HOW = 'Como Cuidamos'
const DEFAULT_ACTIVITIES = 'Atividades e Práticas'

function PhilosophyDimensionBody({
  dim,
  headingLevel,
  omitSummary,
}: {
  readonly dim: Philosophy50Dimension
  readonly headingLevel: 'h3' | 'h4'
  readonly omitSummary?: boolean
}) {
  const HeaderIcon = philosophy50HeaderIcons[dim.id] ?? philosophy50HeaderIcons.fisica
  const howTitle = dim.howWeCareColumnTitle ?? DEFAULT_HOW
  const actTitle = dim.activitiesColumnTitle ?? DEFAULT_ACTIVITIES
  const TitleTag = headingLevel

  return (
    <>
      {!omitSummary && (
        <div className={styles.headRow}>
          <div
            className={styles.iconBox}
            style={
              dim.headerIconGradient
                ? {
                    background: dim.headerIconGradient,
                    borderColor: 'rgb(255 255 255 / 0.35)',
                  }
                : { backgroundColor: dim.iconColor }
            }
          >
            <HeaderIcon className={styles.headerIcon} aria-hidden />
          </div>
          <div>
            <TitleTag className={styles.dimTitle}>{dim.title}</TitleTag>
            <p className={styles.dimSub}>{dim.subtitle}</p>
          </div>
        </div>
      )}
      <div className={styles.grid2}>
        <div>
          <h4 className={styles.colHead}>{howTitle}</h4>
          <ul className={styles.ul}>
            {dim.howWeCare.map((item, i) => {
              const ItemIcon = getPhilosophyHowCareIcon(dim.id, i)
              return (
                <li key={item.title} className={styles.li}>
                  <div className={styles.itemIconWrap}>
                    <ItemIcon className={styles.itemIcon} aria-hidden />
                  </div>
                  <div className={styles.itemText}>
                    <h5 className={styles.liTitle}>{item.title}</h5>
                    <p className={styles.liDesc}>{item.description}</p>
                  </div>
                </li>
              )
            })}
          </ul>
        </div>
        <div>
          <h4 className={styles.colHead}>{actTitle}</h4>
          <ul className={styles.ul}>
            {dim.activities.map((item, i) => {
              const ItemIcon = getPhilosophyActivityIcon(dim.id, i)
              let leading: ReactNode
              if (item.hideIcon) {
                leading = <div className={styles.itemIconSpacer} aria-hidden />
              } else if (item.emoji) {
                leading = (
                  <div
                    className={cn(
                      styles.itemEmojiWrap,
                      dim.id === 'espiritual' && styles.itemEmojiDimEspiritual,
                      dim.id === 'relacional' && styles.itemEmojiDimRelacional,
                      dim.id === 'profissional' && styles.itemEmojiDimProfissional
                    )}
                  >
                    <span className={styles.itemEmoji} aria-hidden>
                      {item.emoji}
                    </span>
                  </div>
                )
              } else {
                leading = (
                  <div className={styles.itemIconWrap}>
                    <ItemIcon className={styles.itemIcon} aria-hidden />
                  </div>
                )
              }
              return (
                <li key={item.title} className={styles.li}>
                  {leading}
                  <div className={styles.itemText}>
                    <h5 className={styles.liTitle}>{item.title}</h5>
                    <p className={styles.liDesc}>{item.description}</p>
                  </div>
                </li>
              )
            })}
          </ul>
        </div>
      </div>
    </>
  )
}

export function Philosophy50Section() {
  const { philosophy50: copy } = institutionalCopy
  const hub = useMetodologiaHub()
  const [activeDimId, setActiveDimId] = useState<string>(philosophy50Dimensions[0]?.id ?? 'fisica')
  const [isMobile, setIsMobile] = useState(false)
  const [expandedPhilDim, setExpandedPhilDim] = useState<string | null>(null)

  useEffect(() => {
    const mq = globalThis.matchMedia('(max-width: 1023px)')
    setIsMobile(mq.matches)
    const fn = () => setIsMobile(mq.matches)
    mq.addEventListener('change', fn)
    return () => mq.removeEventListener('change', fn)
  }, [])

  useLayoutEffect(() => {
    if (hub?.active !== 'philosophy') return
    const id = hub.peekPendingPhilosophyDim()
    if (!id || !philosophy50Dimensions.some((d) => d.id === id)) return
    setActiveDimId(id)
    if (isMobile) {
      setExpandedPhilDim(id)
    }
    requestAnimationFrame(() => {
      document.getElementById(`filosofia-dim-${id}`)?.scrollIntoView({ behavior: 'smooth', block: 'center' })
    })
  }, [hub, hub?.active, isMobile])

  useEffect(() => {
    const onSelect = (e: Event) => {
      const ce = e as CustomEvent<Philosophy50SelectDetail>
      const id = ce.detail?.id
      if (id && philosophy50Dimensions.some((d) => d.id === id)) {
        setActiveDimId(id)
        if (isMobile) setExpandedPhilDim(id)
        document.getElementById(`filosofia-dim-${id}`)?.scrollIntoView({ behavior: 'smooth', block: 'center' })
      }
    }
    globalThis.addEventListener(PHILOSOPHY_50_SELECT_EVENT, onSelect)
    return () => globalThis.removeEventListener(PHILOSOPHY_50_SELECT_EVENT, onSelect)
  }, [isMobile])

  useEffect(() => {
    if (isMobile) return
    const nodes = philosophy50Dimensions
      .map((d) => document.getElementById(`filosofia-dim-${d.id}`))
      .filter((n): n is HTMLElement => Boolean(n))
    if (nodes.length === 0) return

    const obs = new IntersectionObserver(
      (entries) => {
        const vis = entries.filter((e) => e.isIntersecting && e.intersectionRatio > 0.12)
        if (vis.length === 0) return
        const first = vis[0]
        if (!first) return
        const best = vis.slice(1).reduce(
          (a, b) => (a.intersectionRatio >= b.intersectionRatio ? a : b),
          first
        )
        const el = best.target
        const raw = el.id.replace(/^filosofia-dim-/, '')
        if (philosophy50Dimensions.some((d) => d.id === raw)) setActiveDimId(raw)
      },
      { root: null, rootMargin: '-22% 0px -40% 0px', threshold: [0, 0.1, 0.2, 0.35, 0.5, 1] }
    )

    nodes.forEach((el) => obs.observe(el))
    return () => obs.disconnect()
  }, [isMobile])

  const scrollToDim = (id: string) => {
    setActiveDimId(id)
    if (isMobile) setExpandedPhilDim(id)
    document.getElementById(`filosofia-dim-${id}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <section id="filosofia-5" className={styles.section} aria-labelledby="philosophy50-heading">
      <div className={styles.container}>
        <h2 id="philosophy50-heading" className={styles.title}>
          {copy.title}
        </h2>
        <span
          className={cn(styles.titleRulePurple, isMobile && styles.titleRuleBlueMobile)}
          aria-hidden
        />
        <p className={styles.intro}>{copy.intro}</p>

        {!isMobile && (
          <div className={styles.localNavStickyWrap}>
            <nav className={styles.localNavBar} aria-label={copy.localNavAriaLabel}>
              {philosophy50Dimensions.map((dim) => (
                <button
                  key={dim.id}
                  type="button"
                  className={cn(styles.localNavBtn, activeDimId === dim.id && styles.localNavBtnActive)}
                  aria-current={activeDimId === dim.id ? 'true' : undefined}
                  onClick={() => scrollToDim(dim.id)}
                >
                  {PHILOSOPHY_50_SHORT_LABEL[dim.id] ?? dim.title}
                </button>
              ))}
            </nav>
          </div>
        )}

        {isMobile ? (
          <div className={styles.mobilePhilAccordionRoot} role="list" aria-label={copy.localNavAriaLabel}>
            {philosophy50Dimensions.map((dim) => {
              const HeaderIcon = philosophy50HeaderIcons[dim.id] ?? philosophy50HeaderIcons.fisica
              const open = expandedPhilDim === dim.id
              return (
                <div
                  key={dim.id}
                  id={`filosofia-dim-${dim.id}`}
                  className={styles.mobilePhilAccCard}
                  role="listitem"
                  style={
                    {
                      backgroundColor: dim.cardSurface,
                      '--phil-card-border': dim.cardBorderColor,
                      '--phil-item-border': dim.itemBorderColor,
                    } as CSSProperties
                  }
                >
                  <button
                    type="button"
                    className={cn(styles.mobilePhilAccTrigger, open && styles.mobilePhilAccTriggerOpen)}
                    aria-expanded={open}
                    aria-controls={`filosofia-acc-panel-${dim.id}`}
                    id={`filosofia-acc-trigger-${dim.id}`}
                    onClick={() => setExpandedPhilDim((p) => (p === dim.id ? null : dim.id))}
                  >
                    <div
                      className={styles.mobilePhilAccIconWrap}
                      style={
                        dim.headerIconGradient
                          ? {
                              background: dim.headerIconGradient,
                              borderColor: 'rgb(255 255 255 / 0.35)',
                            }
                          : { backgroundColor: dim.iconColor }
                      }
                    >
                      <HeaderIcon className={styles.mobilePhilAccIconSvg} aria-hidden />
                    </div>
                    <div className={styles.mobilePhilAccText}>
                      <span className={styles.mobilePhilAccTitle}>{dim.title}</span>
                      <span className={styles.mobilePhilAccSub}>{dim.subtitle}</span>
                    </div>
                    <FiChevronDown
                      className={cn(styles.mobilePhilAccChevron, open && styles.mobilePhilAccChevronOpen)}
                      aria-hidden
                    />
                  </button>
                  <AnimatePresence initial={false}>
                    {open && (
                      <motion.div
                        key={dim.id}
                        id={`filosofia-acc-panel-${dim.id}`}
                        role="region"
                        aria-labelledby={`filosofia-acc-trigger-${dim.id}`}
                        className={styles.mobilePhilAccPanel}
                        initial={{ opacity: 0, y: -6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -6 }}
                        transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
                      >
                        <div className={styles.mobilePhilAccPanelInner}>
                          <PhilosophyDimensionBody dim={dim} headingLevel="h4" omitSummary />
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )
            })}
          </div>
        ) : (
          <div className={styles.list}>
            {philosophy50Dimensions.map((dim, stackIndex) => {
              const isLast = stackIndex === philosophy50Dimensions.length - 1
              return (
                <article
                  key={dim.id}
                  id={`filosofia-dim-${dim.id}`}
                  className={cn(styles.article, styles.articleStackItem)}
                  data-stack-last={isLast ? 'true' : undefined}
                  style={
                    {
                      backgroundColor: dim.cardSurface,
                      '--phil-card-border': dim.cardBorderColor,
                      '--phil-item-border': dim.itemBorderColor,
                      '--stack-index': stackIndex,
                    } as CSSProperties
                  }
                >
                  <PhilosophyDimensionBody dim={dim} headingLevel="h3" />
                </article>
              )
            })}
            <div className={styles.stackScrollTail} aria-hidden />
          </div>
        )}
      </div>
    </section>
  )
}
