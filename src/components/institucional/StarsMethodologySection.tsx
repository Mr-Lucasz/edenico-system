'use client'

import { useState, useEffect, useCallback, type CSSProperties } from 'react'
import { institutionalCopy } from '@src/constants/institutionalCopy'
import { starsCategories, type StarsCategoryId } from '@src/data/starsContent'
import { getLeftIcon, getRightActivityAccent, getRightIcon } from '@src/data/starsMethodologyIcons'
import { philosophy50Dimensions } from '@src/data/philosophy50Content'
import { FiChevronDown, FiGlobe, FiHeart } from 'react-icons/fi'
import { HiOutlineLightBulb } from 'react-icons/hi2'
import { cn } from '@src/utils/cn'
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

const PHIL_SHORT_LABEL: Record<string, string> = {
  fisica: 'Física',
  mental: 'Mental',
  espiritual: 'Espiritual',
  relacional: 'Relacional',
  profissional: 'Profissional',
}

export function StarsMethodologySection() {
  const { stars: copy } = institutionalCopy
  const [activeId, setActiveId] = useState<StarsCategoryId>('science')
  const [isMobile, setIsMobile] = useState(false)
  const [openStars, setOpenStars] = useState(true)
  const [openPhilosophy, setOpenPhilosophy] = useState(true)
  const [openIdentity, setOpenIdentity] = useState(false)

  useEffect(() => {
    const mq = globalThis.matchMedia('(max-width: 1023px)')
    setIsMobile(mq.matches)
    const fn = () => setIsMobile(mq.matches)
    mq.addEventListener('change', fn)
    return () => mq.removeEventListener('change', fn)
  }, [])

  useEffect(() => {
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
  }, [])

  const scrollToBlock = useCallback((id: StarsCategoryId) => {
    document.getElementById(`stars-block-${id}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }, [])

  const scrollToHash = useCallback((hash: string) => {
    const el = document.getElementById(hash.replace(/^#/, ''))
    el?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }, [])

  const blocks = starsCategories.map((cat) => (
    <section
      key={cat.id}
      id={`stars-block-${cat.id}`}
      data-star-id={cat.id}
      className={styles.starBlock}
      style={
        {
          background: STAR_CARD_GRADIENT[cat.id],
          '--star-inner-border': STAR_CARD_BORDER[cat.id],
        } as CSSProperties
      }
      aria-labelledby={`stars-cat-${cat.id}`}
    >
      <StarsCategoryContent category={cat} headingId={`stars-cat-${cat.id}`} />
    </section>
  ))

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
              onClick={() => setOpenStars((o) => !o)}
            >
              <FiHeart className={styles.accTriggerIcon} aria-hidden />
              <span className={styles.accTriggerLabel}>{copy.navGroupStars}</span>
              <FiChevronDown className={cn(styles.accChevron, openStars && styles.accChevronOpen)} aria-hidden />
            </button>
            {openStars && (
              <ul className={styles.accList}>
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
            )}
          </div>

          <div className={styles.accItem}>
            <button
              type="button"
              className={cn(styles.accTrigger, styles.accTriggerPhilosophy)}
              aria-expanded={openPhilosophy}
              onClick={() => setOpenPhilosophy((o) => !o)}
            >
              <FiGlobe className={styles.accTriggerIcon} aria-hidden />
              <span className={styles.accTriggerLabel}>{copy.navGroupPhilosophy}</span>
              <FiChevronDown
                className={cn(styles.accChevron, openPhilosophy && styles.accChevronOpen)}
                aria-hidden
              />
            </button>
            {openPhilosophy && (
              <ul className={styles.accList}>
                {philosophy50Dimensions.map((dim) => (
                  <li key={dim.id}>
                    <button
                      type="button"
                      className={styles.accLink}
                      onClick={() => scrollToHash(`filosofia-dim-${dim.id}`)}
                    >
                      {PHIL_SHORT_LABEL[dim.id] ?? dim.title}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className={styles.accItem}>
            <button
              type="button"
              className={styles.accTrigger}
              aria-expanded={openIdentity}
              onClick={() => setOpenIdentity((o) => !o)}
            >
              <HiOutlineLightBulb className={styles.accTriggerIcon} aria-hidden />
              <span className={styles.accTriggerLabel}>{copy.navGroupIdentity}</span>
              <FiChevronDown
                className={cn(styles.accChevron, openIdentity && styles.accChevronOpen)}
                aria-hidden
              />
            </button>
            {openIdentity && (
              <ul className={styles.accList}>
                {copy.identityNav.map((item) => (
                  <li key={item.anchor}>
                    <button type="button" className={styles.accLink} onClick={() => scrollToHash(item.anchor)}>
                      {item.label}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </nav>
    </aside>
  )

  return (
    <section id="metodologia-stars" className={styles.section} aria-labelledby="stars-heading">
      <div className={styles.container}>
        <header className={styles.header}>
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
          <>
            <div className={styles.mobileRail} role="tablist" aria-label={copy.navTitle}>
              {starsCategories.map((cat) => {
                const active = activeId === cat.id
                const hex = cat.colorHex ?? '#64748b'
                return (
                  <button
                    key={cat.id}
                    type="button"
                    role="tab"
                    aria-selected={active}
                    className={cn(styles.mobileTab, active && styles.mobileTabActive)}
                    style={{ '--accent': hex } as CSSProperties}
                    onClick={() => scrollToBlock(cat.id)}
                  >
                    <span className={styles.mobileLetter}>{cat.letter}</span>
                    <span className={styles.mobileShort}>{cat.title}</span>
                  </button>
                )
              })}
            </div>
            <div className={styles.mobileStack}>{blocks}</div>
          </>
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

function StarsCategoryContent({
  category,
  headingId,
}: {
  category: (typeof starsCategories)[0]
  headingId: string
}) {
  const hex = category.colorHex ?? '#A66B46'
  const leftUseRows = category.leftColumnLayout === 'rows'
  const scienceSolidTiles = category.id === 'science' && !leftUseRows
  const technologySolidRows = category.id === 'technology' && leftUseRows

  return (
    <>
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
      <div className={styles.grid2}>
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
