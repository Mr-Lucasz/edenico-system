'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { useState, useEffect, useCallback, type CSSProperties } from 'react'
import { institutionalCopy } from '@src/constants/institutionalCopy'
import {
  PHILOSOPHY_50_SELECT_EVENT,
  PHILOSOPHY_50_SHORT_LABEL,
  type Philosophy50SelectDetail,
} from '@src/constants/philosophy50Nav'
import { starsCategories, type StarsCategoryId } from '@src/data/starsContent'
import { getLeftIcon, getRightActivityAccent, getRightIcon } from '@src/data/starsMethodologyIcons'
import { philosophy50Dimensions } from '@src/data/philosophy50Content'
import { FiChevronDown, FiGlobe, FiHeart } from 'react-icons/fi'
import { HiOutlineLightBulb } from 'react-icons/hi2'
import { cn } from '@src/utils/cn'
import { useMetodologiaHub } from '@src/components/institucional/metodologiaHubContext'
import styles from './StarsMethodologySection.module.scss'

/** Fundos e bordas extraídos de Section.svg (gradientes + stroke por bloco) */
const STAR_CARD_GRADIENT: Record<StarsCategoryId, string> = {
  science: 'linear-gradient(135deg, #fff9f0 0%, #fffbeb 100%)',
  technology: 'linear-gradient(135deg, #faf5ff 0%, #f3e8ff 100%)',
  arts: 'linear-gradient(135deg, #fff9f2 0%, #fff7ed 100%)',
  relationship: 'linear-gradient(135deg, #f0fff4 0%, #ecfdf5 100%)',
  service: 'linear-gradient(135deg, #fff9f9 0%, #fef2f2 100%)',
}

const STAR_CARD_BORDER: Record<StarsCategoryId, string> = {
  science: '#f5e6d3',
  technology: '#e9d4ff',
  arts: '#fed7aa',
  relationship: '#c6f6d5',
  service: '#ffc9c9',
}

type NavAccordionKey = 'stars' | 'philosophy' | 'identity'

const ACC_PANEL_STARS = 'stars-methodology-acc-panel-stars'
const ACC_PANEL_PHILOSOPHY = 'stars-methodology-acc-panel-philosophy'
const ACC_PANEL_IDENTITY = 'stars-methodology-acc-panel-identity'

export function StarsMethodologySection() {
  const hub = useMetodologiaHub()
  const { stars: copy } = institutionalCopy
  const [activeId, setActiveId] = useState<StarsCategoryId>('science')
  const [isMobile, setIsMobile] = useState(false)
  /** Acordeão exclusivo no desktop: um grupo aberto (ou nenhum, se o utilizador fechar o activo). Inicial: só STARS. */
  const [openSection, setOpenSection] = useState<NavAccordionKey | null>('stars')
  /** Mobile: um pilar STARS expandido em acordeão (mockup) */
  const [expandedMobileStar, setExpandedMobileStar] = useState<StarsCategoryId | null>(null)

  useEffect(() => {
    const mq = globalThis.matchMedia('(max-width: 1023px)')
    setIsMobile(mq.matches)
    const fn = () => setIsMobile(mq.matches)
    mq.addEventListener('change', fn)
    return () => mq.removeEventListener('change', fn)
  }, [])

  useEffect(() => {
    if (isMobile) return

    const nodes = starsCategories
      .map((c) => document.getElementById(`stars-block-${c.id}`))
      .filter((n): n is HTMLElement => Boolean(n))

    if (nodes.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting && e.intersectionRatio > 0.12)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)
        const top = visible[0]
        if (top?.target instanceof HTMLElement) {
          const id = top.target.dataset.starId as StarsCategoryId | undefined
          if (id) setActiveId(id)
        }
      },
      { root: null, rootMargin: '-32% 0px -38% 0px', threshold: [0, 0.1, 0.2, 0.35, 0.5, 1] }
    )

    nodes.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [isMobile])

  const toggleAccordion = useCallback((key: NavAccordionKey) => {
    setOpenSection((prev) => (prev === key ? null : key))
  }, [])

  const scrollToBlock = useCallback((id: StarsCategoryId) => {
    document.getElementById(`stars-block-${id}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }, [])

  const scrollToHash = useCallback((hash: string) => {
    const el = document.getElementById(hash.replace(/^#/, ''))
    el?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }, [])

  const blocks = starsCategories.map((cat) => <StarMethodologyBlock key={cat.id} cat={cat} />)

  const openStars = openSection === 'stars'
  const openPhilosophy = openSection === 'philosophy'
  const openIdentity = openSection === 'identity'

  const desktopNav = (
    <aside className={styles.asideSticky} aria-label={copy.navTitle}>
      <nav className={styles.sideNav}>
        <div className={styles.sideNavHeader}>
          <p className={styles.navHeading}>{copy.navTitle}</p>
          <p className={styles.navSub}>{copy.navSubtitle}</p>
        </div>

        <div className={styles.accordion}>
          <div className={styles.accItem}>
            <button
              type="button"
              className={styles.accTrigger}
              aria-expanded={openStars}
              aria-controls={ACC_PANEL_STARS}
              id="stars-methodology-acc-trigger-stars"
              onClick={() => toggleAccordion('stars')}
            >
              <FiHeart className={styles.accTriggerIcon} aria-hidden />
              <span className={styles.accTriggerLabel}>{copy.navGroupStars}</span>
              <FiChevronDown className={cn(styles.accChevron, openStars && styles.accChevronOpen)} aria-hidden />
            </button>
            <ul
              id={ACC_PANEL_STARS}
              className={styles.accList}
              hidden={!openStars}
              aria-labelledby="stars-methodology-acc-trigger-stars"
            >
              {starsCategories.map((cat) => {
                const active = activeId === cat.id
                const hex = cat.colorHex ?? '#64748b'
                return (
                  <li key={cat.id}>
                    <button
                      type="button"
                      className={cn(styles.accLink, active && styles.accLinkActive)}
                      style={{ '--acc': hex } as CSSProperties}
                      aria-current={active ? 'true' : undefined}
                      onClick={() => scrollToBlock(cat.id)}
                    >
                      <cat.icon className={styles.accLinkIcon} aria-hidden />
                      <span>{cat.title}</span>
                    </button>
                  </li>
                )
              })}
            </ul>
          </div>

          <div className={styles.accItem}>
            <button
              type="button"
              className={cn(styles.accTrigger, styles.accTriggerPhilosophy)}
              aria-expanded={openPhilosophy}
              aria-controls={ACC_PANEL_PHILOSOPHY}
              id="stars-methodology-acc-trigger-philosophy"
              onClick={() => toggleAccordion('philosophy')}
            >
              <FiGlobe className={styles.accTriggerIcon} aria-hidden />
              <span className={styles.accTriggerLabel}>{copy.navGroupPhilosophy}</span>
              <FiChevronDown
                className={cn(styles.accChevron, openPhilosophy && styles.accChevronOpen)}
                aria-hidden
              />
            </button>
            <ul
              id={ACC_PANEL_PHILOSOPHY}
              className={styles.accList}
              hidden={!openPhilosophy}
              aria-labelledby="stars-methodology-acc-trigger-philosophy"
            >
              {philosophy50Dimensions.map((dim) => (
                <li key={dim.id}>
                  <button
                    type="button"
                    className={styles.accLink}
                    onClick={() => {
                      if (hub) {
                        hub.setActive('philosophy', { philosophyDim: dim.id })
                      } else {
                        globalThis.dispatchEvent(
                          new CustomEvent<Philosophy50SelectDetail>(PHILOSOPHY_50_SELECT_EVENT, {
                            detail: { id: dim.id },
                          })
                        )
                        scrollToHash('filosofia-5')
                      }
                    }}
                  >
                    {PHILOSOPHY_50_SHORT_LABEL[dim.id] ?? dim.title}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className={styles.accItem}>
            <button
              type="button"
              className={styles.accTrigger}
              aria-expanded={openIdentity}
              aria-controls={ACC_PANEL_IDENTITY}
              id="stars-methodology-acc-trigger-identity"
              onClick={() => toggleAccordion('identity')}
            >
              <HiOutlineLightBulb className={styles.accTriggerIcon} aria-hidden />
              <span className={styles.accTriggerLabel}>{copy.navGroupIdentity}</span>
              <FiChevronDown
                className={cn(styles.accChevron, openIdentity && styles.accChevronOpen)}
                aria-hidden
              />
            </button>
            <ul
              id={ACC_PANEL_IDENTITY}
              className={styles.accList}
              hidden={!openIdentity}
              aria-labelledby="stars-methodology-acc-trigger-identity"
            >
              {copy.identityNav.map((item) => (
                <li key={item.anchor}>
                  <button
                    type="button"
                    className={styles.accLink}
                    onClick={() => {
                      if (hub) {
                        hub.setActive('identity')
                        requestAnimationFrame(() => {
                          requestAnimationFrame(() => scrollToHash(item.anchor))
                        })
                      } else {
                        scrollToHash(item.anchor)
                      }
                    }}
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </nav>
    </aside>
  )

  return (
    <section id="metodologia-stars" className={styles.section} aria-labelledby="stars-heading">
      <div className={styles.container}>
        <header className={cn(styles.header, isMobile && styles.headerMobileAcc)}>
          <span className={styles.sectionBadge}>{copy.sectionBadge}</span>
          <h2 id="stars-heading" className={styles.sectionHeading}>
            {copy.sectionHeading}
          </h2>
          <span className={styles.titleRuleBlue} aria-hidden />
          <h3 className={styles.starsSubtitle}>{copy.sectionTitle}</h3>
          <span className={styles.titleRulePurple} aria-hidden />
          <p className={styles.desc}>{copy.sectionDescription}</p>
        </header>

        {isMobile ? (
          <div className={styles.mobileAccordionRoot} role="list" aria-label={copy.navGroupStars}>
            {starsCategories.map((cat) => {
              const hex = cat.colorHex ?? '#64748b'
              const open = expandedMobileStar === cat.id
              return (
                <div key={cat.id} className={styles.mobileAccCard} role="listitem">
                  <button
                    type="button"
                    className={cn(styles.mobileAccTrigger, open && styles.mobileAccTriggerOpen)}
                    aria-expanded={open}
                    aria-controls={`stars-mobile-acc-panel-${cat.id}`}
                    id={`stars-mobile-acc-trigger-${cat.id}`}
                    onClick={() =>
                      setExpandedMobileStar((prev) => (prev === cat.id ? null : cat.id))
                    }
                  >
                    <div
                      className={styles.mobileAccIconWrap}
                      style={
                        cat.headerIconGradient
                          ? ({
                              background: cat.headerIconGradient,
                              borderColor: 'rgb(255 255 255 / 0.35)',
                            } as CSSProperties)
                          : ({ backgroundColor: hex, borderColor: `${hex}e6` } as CSSProperties)
                      }
                    >
                      <cat.icon className={styles.mobileAccIconSvg} style={{ color: '#fff' }} aria-hidden />
                    </div>
                    <div className={styles.mobileAccText}>
                      <span className={styles.mobileAccTitle}>{cat.title}</span>
                      <span className={styles.mobileAccSub}>{cat.subtitle}</span>
                    </div>
                    <FiChevronDown
                      className={cn(styles.mobileAccChevron, open && styles.mobileAccChevronOpen)}
                      aria-hidden
                    />
                  </button>
                  <AnimatePresence initial={false}>
                    {open && (
                      <motion.div
                        key={cat.id}
                        id={`stars-mobile-acc-panel-${cat.id}`}
                        role="region"
                        aria-labelledby={`stars-mobile-acc-trigger-${cat.id}`}
                        className={styles.mobileAccPanel}
                        initial={{ opacity: 0, y: -6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -6 }}
                        transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
                      >
                        <StarMethodologyBlock cat={cat} omitCategoryHeader />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )
            })}
          </div>
        ) : (
          <div className={styles.layoutDesktop}>
            <div className={styles.mainColumn}>{blocks}</div>
            {desktopNav}
          </div>
        )}
      </div>
    </section>
  )
}

function StarMethodologyBlock({
  cat,
  omitCategoryHeader,
}: {
  readonly cat: (typeof starsCategories)[number]
  readonly omitCategoryHeader?: boolean
}) {
  return (
    <section
      id={`stars-block-${cat.id}`}
      data-star-id={cat.id}
      className={cn(styles.starBlock, omitCategoryHeader && styles.starBlockInAccordion)}
      style={
        {
          background: STAR_CARD_GRADIENT[cat.id],
          '--star-inner-border': STAR_CARD_BORDER[cat.id],
        } as CSSProperties
      }
      aria-labelledby={`stars-cat-${cat.id}`}
    >
      <StarsCategoryContent
        category={cat}
        headingId={`stars-cat-${cat.id}`}
        omitHeader={omitCategoryHeader}
      />
    </section>
  )
}

function StarsCategoryContent({
  category,
  headingId,
  omitHeader,
}: {
  category: (typeof starsCategories)[0]
  headingId: string
  omitHeader?: boolean
}) {
  const hex = category.colorHex ?? '#A66B46'
  const leftUseRows = category.leftColumnLayout === 'rows'
  const scienceSolidTiles = category.id === 'science' && !leftUseRows
  const technologySolidRows = category.id === 'technology' && leftUseRows

  return (
    <>
      {!omitHeader && (
        <div className={styles.catHeader}>
          <div
            className={styles.catIconBox}
            style={
              category.headerIconGradient
                ? {
                    background: category.headerIconGradient,
                    borderColor: 'rgb(255 255 255 / 0.35)',
                  }
                : { backgroundColor: hex, borderColor: `${hex}e6` }
            }
          >
            <category.icon className={styles.catIcon} style={{ color: '#fff' }} aria-hidden />
          </div>
          <div className={styles.catBody}>
            <h3 id={headingId} className={styles.catTitle}>
              {category.title}
            </h3>
            <p className={styles.catSubtitle}>{category.subtitle}</p>
          </div>
        </div>
      )}
      <div className={cn(styles.grid2, omitHeader && styles.grid2AccordionAttached)}>
        <div>
          <h4 className={styles.colTitle}>{category.leftColumnTitle}</h4>
          <div
            className={cn(
              styles.leftGrid,
              !leftUseRows && category.leftCards.length === 4 ? styles.leftGridCols2 : !leftUseRows ? styles.leftGridCols1 : null,
              leftUseRows && styles.leftRowsStack
            )}
          >
            {category.leftCards.map((card, i) => {
              const Icon = getLeftIcon(category.id, i)
              if (leftUseRows) {
                return (
                  <div key={card.title} className={styles.activityRow}>
                    <div
                      className={cn(
                        styles.areaRowIconWrap,
                        technologySolidRows && styles.areaRowIconWrapSolid
                      )}
                      style={
                        technologySolidRows
                          ? { backgroundColor: hex, color: '#fff' }
                          : undefined
                      }
                    >
                      <Icon className={styles.areaRowIconSvg} aria-hidden />
                    </div>
                    <div className={styles.activityBody}>
                      <h5 className={styles.activityTitle}>{card.title}</h5>
                      <p className={styles.activityDesc}>{card.description}</p>
                    </div>
                  </div>
                )
              }
              return (
                <div key={card.title} className={styles.areaCard}>
                  <div
                    className={cn(styles.areaIconCircle, scienceSolidTiles && styles.areaIconCircleSolid)}
                    style={
                      scienceSolidTiles
                        ? { backgroundColor: hex, color: '#fff' }
                        : { backgroundColor: `${hex}22`, color: hex }
                    }
                  >
                    <Icon className={styles.areaIconSvg} aria-hidden />
                  </div>
                  <h5 className={styles.areaCardTitle}>{card.title}</h5>
                  <p className={styles.areaCardDesc}>{card.description}</p>
                </div>
              )
            })}
          </div>
        </div>
        <div>
          <h4 className={styles.colTitle}>{category.rightColumnTitle}</h4>
          <div className={styles.activityList}>
            {category.rightCards.map((card, i) => {
              const accent = getRightActivityAccent(category.id, i)
              const emoji = card.emoji
              const Icon = getRightIcon(category.id, i)
              return (
                <div key={card.title} className={styles.activityRow}>
                  <div
                    className={cn(
                      styles.activityIconWrap,
                      emoji && styles.activityIconWrapEmoji,
                      emoji && category.id === 'service' && styles.activityIconWrapEmojiService,
                      emoji && category.id === 'arts' && styles.activityIconWrapEmojiArts,
                      emoji && category.id === 'relationship' && styles.activityIconWrapEmojiRelationship,
                      emoji && category.id === 'science' && styles.activityIconWrapEmojiScience,
                      emoji && category.id === 'technology' && styles.activityIconWrapEmojiTechnology
                    )}
                    style={
                      emoji
                        ? undefined
                        : { backgroundColor: accent.bg, color: accent.fg }
                    }
                  >
                    {emoji ? (
                      <span className={styles.activityEmoji} aria-hidden>
                        {emoji}
                      </span>
                    ) : (
                      <Icon className={styles.activityIconSvg} aria-hidden />
                    )}
                  </div>
                  <div className={styles.activityBody}>
                    <h5 className={styles.activityTitle}>{card.title}</h5>
                    <p className={styles.activityDesc}>{card.description}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </>
  )
}
