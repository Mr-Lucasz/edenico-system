'use client'

import { AnimatePresence, motion } from 'framer-motion'
import Image from 'next/image'
import { Nunito } from 'next/font/google'
import { useEffect, useState } from 'react'
import { FiAward, FiBook, FiChevronDown, FiEye, FiHeart, FiStar, FiTarget } from 'react-icons/fi'
import { HiOutlineLightBulb, HiSparkles } from 'react-icons/hi2'
import { MdPalette } from 'react-icons/md'
import { institutionalCopy } from '@src/constants/institutionalCopy'
import { IdentityAnchorsNav } from '@src/components/institucional/IdentityAnchorsNav'
import { cn } from '@src/utils/cn'
import styles from './IdentityAcademySection.module.scss'

const nunito = Nunito({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
})

const PHIL_DOT = ['green', 'blue', 'orange'] as const

const IDENTITY_MOBILE_ACC = ['filosofia', 'missao', 'valores'] as const
type IdentityMobileAccId = (typeof IDENTITY_MOBILE_ACC)[number]

const VALUE_ICONS = [HiSparkles, FiAward, FiHeart] as const
const VALUE_HEX = ['#10b981', '#2563eb', '#f97316'] as const

type LogoStyle = (typeof institutionalCopy)['identity']['logos']['cards'][number]['style']

const LOGO_BADGE_VARIANT: Record<LogoStyle, 'lavender' | 'sky' | 'pink' | 'slate'> = {
  primary: 'lavender',
  secondary: 'sky',
  symbol: 'pink',
  dark: 'slate',
  mono: 'slate',
}

function LogoCardHeaderIcon({ style }: { readonly style: LogoStyle }) {
  switch (style) {
    case 'primary':
      return (
        <div className={styles.logoCardIconPurple} aria-hidden>
          <HiOutlineLightBulb className={styles.logoCardIconSvg} />
        </div>
      )
    case 'secondary':
      return (
        <div className={styles.logoCardIconBlue} aria-hidden>
          <FiStar className={styles.logoCardIconSvg} />
        </div>
      )
    case 'symbol':
      return (
        <div className={styles.logoCardIconMagenta} aria-hidden>
          <HiSparkles className={styles.logoCardIconSvg} />
        </div>
      )
    case 'dark':
      return (
        <div className={styles.logoCardIconNavy} aria-hidden>
          <FiEye className={styles.logoCardIconSvg} />
        </div>
      )
    case 'mono':
      return (
        <div className={styles.logoCardIconSlate} aria-hidden>
          <FiTarget className={styles.logoCardIconSvg} />
        </div>
      )
    default:
      return null
  }
}

export function IdentityAcademySection() {
  const { identity: copy } = institutionalCopy
  const [isMobile, setIsMobile] = useState(false)
  const [expandedMobileAcc, setExpandedMobileAcc] = useState<IdentityMobileAccId | null>('filosofia')

  useEffect(() => {
    const mq = globalThis.matchMedia('(max-width: 1023px)')
    setIsMobile(mq.matches)
    const fn = () => setIsMobile(mq.matches)
    mq.addEventListener('change', fn)
    return () => mq.removeEventListener('change', fn)
  }, [])

  const valuesSubtitle =
    copy.valuesItems.length > 0
      ? copy.valuesItems.map((v) => v.title).join(' · ')
      : copy.valuesTitle

  return (
    <section id="identidade-edenicos" className={styles.section} aria-labelledby="identity-academy-heading">
      <div className={styles.container}>
        <h2 id="identity-academy-heading" className={styles.title}>
          {copy.title}
        </h2>
        <span className={styles.titleRuleBlue} aria-hidden />
        <p className={styles.intro}>{copy.intro}</p>

        {isMobile ? (
          <div className={styles.mobileIdentityAccRoot}>
            <div
              id="identidade-acc-filosofia"
              className={cn(styles.mobileIdentityAccCard, styles.mobileIdentityAccCardPhil)}
            >
              <button
                type="button"
                className={cn(
                  styles.mobileIdentityAccTrigger,
                  expandedMobileAcc === 'filosofia' && styles.mobileIdentityAccTriggerOpen
                )}
                aria-expanded={expandedMobileAcc === 'filosofia'}
                aria-controls="identity-acc-panel-filosofia"
                id="identity-acc-trigger-filosofia"
                onClick={() =>
                  setExpandedMobileAcc((p) => (p === 'filosofia' ? null : 'filosofia'))
                }
              >
                <div className={styles.mobileIdentityAccIconBlue} aria-hidden>
                  <HiOutlineLightBulb className={styles.mobileIdentityAccIconSvg} />
                </div>
                <div className={styles.mobileIdentityAccText}>
                  <span className={styles.mobileIdentityAccTitle}>{copy.philosophyTitle}</span>
                  <span className={styles.mobileIdentityAccSub}>
                    {copy.philosophyPoints[0]?.title ?? ''}
                    {copy.philosophyPoints[0] ? ' · ' : ''}
                    {copy.philosophyPoints[1]?.title ?? ''}
                  </span>
                </div>
                <FiChevronDown
                  className={cn(
                    styles.mobileIdentityAccChevron,
                    expandedMobileAcc === 'filosofia' && styles.mobileIdentityAccChevronOpen
                  )}
                  aria-hidden
                />
              </button>
              <AnimatePresence initial={false}>
                {expandedMobileAcc === 'filosofia' && (
                  <motion.div
                    key="filosofia"
                    id="identity-acc-panel-filosofia"
                    role="region"
                    aria-labelledby="identity-acc-trigger-filosofia"
                    className={styles.mobileIdentityAccPanel}
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <div className={styles.mobileIdentityAccPanelInner}>
                      <ul className={styles.philosophyList}>
                        {copy.philosophyPoints.map((point, i) => (
                          <li key={point.title} className={styles.philosophyItem}>
                            <span
                              className={styles.philosophyDot}
                              data-variant={PHIL_DOT[i]}
                              aria-hidden
                            />
                            <div>
                              <p className={styles.philosophyItemTitle}>{point.title}</p>
                              <p className={styles.philosophyItemText}>{point.text}</p>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div
              id="identidade-acc-missao"
              className={cn(styles.mobileIdentityAccCard, styles.mobileIdentityAccCardMission)}
            >
              <button
                type="button"
                className={cn(
                  styles.mobileIdentityAccTrigger,
                  expandedMobileAcc === 'missao' && styles.mobileIdentityAccTriggerOpen
                )}
                aria-expanded={expandedMobileAcc === 'missao'}
                aria-controls="identity-acc-panel-missao"
                id="identity-acc-trigger-missao"
                onClick={() => setExpandedMobileAcc((p) => (p === 'missao' ? null : 'missao'))}
              >
                <div className={styles.mobileIdentityAccIconPurple} aria-hidden>
                  <FiTarget className={styles.mobileIdentityAccIconSvg} />
                </div>
                <div className={styles.mobileIdentityAccText}>
                  <span className={styles.mobileIdentityAccTitle}>{copy.missionTitle}</span>
                  <span className={styles.mobileIdentityAccSub}>{copy.missionIntro}</span>
                </div>
                <FiChevronDown
                  className={cn(
                    styles.mobileIdentityAccChevron,
                    expandedMobileAcc === 'missao' && styles.mobileIdentityAccChevronOpen
                  )}
                  aria-hidden
                />
              </button>
              <AnimatePresence initial={false}>
                {expandedMobileAcc === 'missao' && (
                  <motion.div
                    key="missao"
                    id="identity-acc-panel-missao"
                    role="region"
                    aria-labelledby="identity-acc-trigger-missao"
                    className={styles.mobileIdentityAccPanel}
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <div className={styles.mobileIdentityAccPanelInner}>
                      <figure className={styles.missionQuoteBox}>
                        <blockquote className={styles.missionQuote}>
                          &ldquo;{copy.missionQuote}&rdquo;
                        </blockquote>
                        <figcaption className={styles.missionAttr}>{copy.missionAttribution}</figcaption>
                      </figure>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div
              id="identidade-acc-valores"
              className={cn(styles.mobileIdentityAccCard, styles.mobileIdentityAccCardValues)}
            >
              <button
                type="button"
                className={cn(
                  styles.mobileIdentityAccTrigger,
                  expandedMobileAcc === 'valores' && styles.mobileIdentityAccTriggerOpen
                )}
                aria-expanded={expandedMobileAcc === 'valores'}
                aria-controls="identity-acc-panel-valores"
                id="identity-acc-trigger-valores"
                onClick={() => setExpandedMobileAcc((p) => (p === 'valores' ? null : 'valores'))}
              >
                <div className={styles.mobileIdentityAccIconEmerald} aria-hidden>
                  <HiSparkles className={styles.mobileIdentityAccIconSvg} />
                </div>
                <div className={styles.mobileIdentityAccText}>
                  <span className={styles.mobileIdentityAccTitle}>{copy.valuesTitle}</span>
                  <span className={styles.mobileIdentityAccSub}>{valuesSubtitle}</span>
                </div>
                <FiChevronDown
                  className={cn(
                    styles.mobileIdentityAccChevron,
                    expandedMobileAcc === 'valores' && styles.mobileIdentityAccChevronOpen
                  )}
                  aria-hidden
                />
              </button>
              <AnimatePresence initial={false}>
                {expandedMobileAcc === 'valores' && (
                  <motion.div
                    key="valores"
                    id="identity-acc-panel-valores"
                    role="region"
                    aria-labelledby="identity-acc-trigger-valores"
                    className={styles.mobileIdentityAccPanel}
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <div className={styles.mobileIdentityAccPanelInner}>
                      <div className={cn(styles.valuesGrid, styles.mobileIdentityValuesGrid)}>
                        {copy.valuesItems.map((item, i) => {
                          const Icon = VALUE_ICONS[i]
                          const hex = VALUE_HEX[i]
                          return (
                            <div key={item.title} className={styles.valueCol}>
                              <div
                                className={styles.valueIconCircle}
                                style={{ backgroundColor: hex }}
                                aria-hidden
                              >
                                <Icon className={styles.valueIconSvg} />
                              </div>
                              <h4 className={styles.valueItemTitle}>{item.title}</h4>
                              <p className={styles.valueItemDesc}>{item.description}</p>
                            </div>
                          )
                        })}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        ) : (
          <>
            <div className={styles.topGrid}>
              <article className={styles.cardPhilosophy} aria-labelledby="identity-philosophy-heading">
                <header className={styles.cardHead}>
                  <div className={styles.iconCircleBlue} aria-hidden>
                    <HiOutlineLightBulb className={styles.cardHeadIcon} />
                  </div>
                  <h3 id="identity-philosophy-heading" className={styles.cardTitle}>
                    {copy.philosophyTitle}
                  </h3>
                </header>
                <ul className={styles.philosophyList}>
                  {copy.philosophyPoints.map((point, i) => (
                    <li key={point.title} className={styles.philosophyItem}>
                      <span
                        className={styles.philosophyDot}
                        data-variant={PHIL_DOT[i]}
                        aria-hidden
                      />
                      <div>
                        <p className={styles.philosophyItemTitle}>{point.title}</p>
                        <p className={styles.philosophyItemText}>{point.text}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </article>

              <article className={styles.cardMission} aria-labelledby="identity-mission-heading">
                <header className={styles.cardHead}>
                  <div className={styles.iconCirclePurple} aria-hidden>
                    <FiTarget className={styles.cardHeadIcon} />
                  </div>
                  <h3 id="identity-mission-heading" className={styles.cardTitle}>
                    {copy.missionTitle}
                  </h3>
                </header>
                <p className={styles.missionIntro}>{copy.missionIntro}</p>
                <figure className={styles.missionQuoteBox}>
                  <blockquote className={styles.missionQuote}>&ldquo;{copy.missionQuote}&rdquo;</blockquote>
                  <figcaption className={styles.missionAttr}>{copy.missionAttribution}</figcaption>
                </figure>
              </article>
            </div>

            <div className={styles.valuesBlock}>
              <h3 className={styles.valuesTitle}>{copy.valuesTitle}</h3>
              <div className={styles.valuesGrid}>
                {copy.valuesItems.map((item, i) => {
                  const Icon = VALUE_ICONS[i]
                  const hex = VALUE_HEX[i]
                  return (
                    <div key={item.title} className={styles.valueCol}>
                      <div
                        className={styles.valueIconCircle}
                        style={{ backgroundColor: hex }}
                        aria-hidden
                      >
                        <Icon className={styles.valueIconSvg} />
                      </div>
                      <h4 className={styles.valueItemTitle}>{item.title}</h4>
                      <p className={styles.valueItemDesc}>{item.description}</p>
                    </div>
                  )
                })}
              </div>
            </div>
          </>
        )}

        {!isMobile && (
          <>
            <IdentityAnchorsNav
              items={institutionalCopy.stars.identityNav}
              ariaLabel={copy.localNavAriaLabel}
            />

            <div id="identidade-logos" className={styles.logosBlock}>
          <header className={styles.logosSectionHead}>
            <div className={styles.logosIconSquare} aria-hidden>
              <HiOutlineLightBulb className={styles.logosIconSquareSvg} />
            </div>
            <div className={styles.logosSectionHeadText}>
              <h3 className={styles.logosSectionTitle}>{copy.logos.sectionTitle}</h3>
              <p className={styles.logosSectionSubtitle}>{copy.logos.sectionSubtitle}</p>
            </div>
          </header>

          <div className={styles.logosIntro}>
            <h4 className={styles.logosVersionsTitle}>{copy.logos.versionsTitle}</h4>
            <p className={styles.logosVersionsDesc}>{copy.logos.versionsDescription}</p>
          </div>

          <div className={styles.logosGrid}>
            {copy.logos.cards.map((card) => {
              const badgeVariant = LOGO_BADGE_VARIANT[card.style]
              const headingId = `logo-card-${card.style}`
              const isFull = 'fullWidth' in card && card.fullWidth
              const caption = 'caption' in card ? card.caption : undefined

              return (
                <article
                  key={card.title}
                  className={styles.logoCard}
                  data-full={isFull ? 'true' : undefined}
                  aria-labelledby={headingId}
                >
                  <div className={styles.logoCardTop}>
                    <div className={styles.logoCardHeadLeft}>
                      <LogoCardHeaderIcon style={card.style} />
                      <div>
                        <h4 id={headingId} className={styles.logoCardTitle}>
                          {card.title}
                        </h4>
                        <p className={styles.logoCardSubtitle}>{card.subtitle}</p>
                      </div>
                    </div>
                    <span className={styles.logoBadge} data-variant={badgeVariant}>
                      {card.badge}
                    </span>
                  </div>
                  <div className={styles.logoPreview}>
                    <div className={styles.logoPreviewMedia}>
                      <Image
                        src={card.imageSrc}
                        alt={card.imageAlt}
                        unoptimized
                        /* Dimensões só para layout; SVG não passa pelo optimizer do Next */
                        width={isFull ? 1920 : 1200}
                        height={isFull ? 640 : 600}
                        className={styles.logoPreviewImg}
                        sizes={
                          isFull
                            ? '(max-width: 768px) 96vw, min(90rem, 96vw)'
                            : '(max-width: 768px) 92vw, min(42rem, 46vw)'
                        }
                        style={
                          isFull
                            ? {
                                width: '100%',
                                height: 'auto',
                                maxWidth: 'min(98%, 100%)',
                                maxHeight: 'min(24rem, 52vh)',
                              }
                            : {
                                width: '100%',
                                height: 'auto',
                                maxWidth: '96%',
                                maxHeight: 'min(28rem, 78vh)',
                              }
                        }
                      />
                    </div>
                    {caption ? <p className={styles.logoMonoCaption}>{caption}</p> : null}
                  </div>
                </article>
              )
            })}
          </div>
        </div>

        <div id="identidade-cores" className={styles.brandColorsWrap}>
          <header className={styles.brandColorsHead}>
            <div className={styles.brandColorsHeadIcon} aria-hidden>
              <MdPalette className={styles.brandColorsHeadIconSvg} />
            </div>
            <div className={styles.brandColorsHeadText}>
              <h3 className={styles.brandColorsTitle}>{copy.brandColors.sectionTitle}</h3>
              <p className={styles.brandColorsSubtitle}>{copy.brandColors.sectionSubtitle}</p>
            </div>
          </header>

          <div className={styles.brandColorsLayout}>
            <div className={styles.brandColorsGrid}>
              {copy.brandColors.cards.map((card, i) => (
                <article key={card.name} className={styles.colorSpecCard}>
                  <div
                    className={styles.colorSpecSwatch}
                    style={{ backgroundColor: card.swatch }}
                    data-light={'lightSwatch' in card && card.lightSwatch ? 'true' : undefined}
                  >
                    <span className={styles.colorSpecIndex}>{i + 1}</span>
                  </div>
                  <div className={styles.colorSpecBody}>
                    <h4 className={styles.colorSpecName}>{card.name}</h4>
                    <dl className={styles.colorSpecDl}>
                      <div className={styles.colorSpecRow}>
                        <dt>Hex</dt>
                        <dd>{card.hex}</dd>
                      </div>
                      <div className={styles.colorSpecRow}>
                        <dt>RGB</dt>
                        <dd>{card.rgb}</dd>
                      </div>
                      <div className={styles.colorSpecRow}>
                        <dt>CMYK</dt>
                        <dd>{card.cmyk}</dd>
                      </div>
                      <div className={styles.colorSpecRow}>
                        <dt>PMS</dt>
                        <dd>{card.pms}</dd>
                      </div>
                    </dl>
                  </div>
                </article>
              ))}
            </div>

            <aside className={styles.brandColorsSidebar} aria-labelledby="brand-colors-sidebar-title">
              <h4 id="brand-colors-sidebar-title" className={styles.sidebarInnerTitle}>
                {copy.brandColors.sidebarTitle}
              </h4>
              <p className={styles.sidebarIntro}>{copy.brandColors.sidebarIntro}</p>
              <ol className={styles.sidebarSteps}>
                {copy.brandColors.sidebarItems.map((item) => (
                  <li key={item.order} className={styles.sidebarStep}>
                    <span
                      className={styles.sidebarStepPill}
                      style={{ backgroundColor: item.swatch }}
                      data-light={item.swatch === '#FFFFFF' ? 'true' : undefined}
                      aria-hidden
                    />
                    <div>
                      <strong className={styles.sidebarStepName}>{item.name}</strong>
                      <p className={styles.sidebarStepText}>{item.description}</p>
                    </div>
                  </li>
                ))}
              </ol>
              <div className={styles.sidebarStars}>
                <h4 className={styles.sidebarStarsTitle}>{copy.brandColors.starsBlurbTitle}</h4>
                <p className={styles.sidebarStarsText}>{copy.brandColors.starsBlurb}</p>
              </div>
            </aside>
          </div>

          <h3 className={styles.starsPaletteSectionTitle}>{copy.starsPalette.title}</h3>
          <div className={styles.starsPaletteGrid}>
            {copy.starsPalette.cards.map((card, i) => (
              <article key={card.pillar} className={styles.colorSpecCard}>
                <div className={styles.colorSpecSwatch} style={{ backgroundColor: card.swatch }}>
                  <span className={styles.colorSpecIndex}>{i + 1}</span>
                </div>
                <div className={styles.colorSpecBody}>
                  <h4 className={styles.colorSpecName}>{card.pillar}</h4>
                  <dl className={styles.colorSpecDl}>
                    <div className={styles.colorSpecRow}>
                      <dt>Hex</dt>
                      <dd>{card.hex}</dd>
                    </div>
                    <div className={styles.colorSpecRow}>
                      <dt>RGB</dt>
                      <dd>{card.rgb}</dd>
                    </div>
                    <div className={styles.colorSpecRow}>
                      <dt>CMYK</dt>
                      <dd>{card.cmyk}</dd>
                    </div>
                    <div className={styles.colorSpecRow}>
                      <dt>PMS</dt>
                      <dd>{card.pms}</dd>
                    </div>
                  </dl>
                </div>
              </article>
            ))}
          </div>
        </div>

        <div id="identidade-tipografia" className={`${styles.typographyWrap} ${nunito.className}`}>
          <header className={styles.typographyHead}>
            <div className={styles.typographyHeadIcon} aria-hidden>
              <FiBook className={styles.typographyHeadIconSvg} />
            </div>
            <div>
              <h3 className={styles.typographyTitle}>{copy.typography.sectionTitle}</h3>
              <p className={styles.typographySubtitle}>{copy.typography.sectionSubtitle}</p>
            </div>
          </header>

          <div className={styles.typographyGrid}>
            <article className={styles.typographyCard}>
              <h4 className={styles.typographyCardTitle}>{copy.typography.mainFontLabel}</h4>
              <p className={styles.typographyFontName}>{copy.typography.fontName}</p>
              <div className={styles.typeBlock}>
                <p className={styles.typeBlockLabel}>Nunito — Regular</p>
                <p className={styles.typeSampleRegular}>{copy.typography.charsetUpper}</p>
                <p className={styles.typeSampleRegular}>{copy.typography.charsetLower}</p>
                <p className={styles.typeSampleRegular}>{copy.typography.charsetNums}</p>
              </div>
              <div className={styles.typeBlock}>
                <p className={styles.typeBlockLabel}>Nunito — Bold</p>
                <p className={styles.typeSampleBold}>{copy.typography.charsetBoldUpper}</p>
                <p className={styles.typeSampleBold}>{copy.typography.charsetBoldLower}</p>
              </div>
            </article>

            <article className={styles.typographyCard}>
              <h4 className={styles.typographyCardTitle}>{copy.typography.hierarchyTitle}</h4>
              <ul className={styles.hierarchyList}>
                {copy.typography.hierarchy.map((row) => (
                  <li key={row.name} className={styles.hierarchyItem}>
                    <span className={styles.hierarchyName}>{row.name}</span>
                    <span className={styles.hierarchyMeta}>
                      {row.size} — {row.weight}
                    </span>
                  </li>
                ))}
              </ul>
            </article>
          </div>

          <div className={styles.usageExamplesWrap}>
            <h4 className={styles.usageExamplesTitle}>{copy.typography.usageExamplesTitle}</h4>
            <div className={styles.usageExamplesGrid}>
              <div className={styles.usageExampleColumn}>
                <div className={styles.usageDemoCard}>
                  <h5 className={styles.usageDemoCardHeading}>{copy.typography.usageContentCardTitle}</h5>
                  <p className={styles.usageDemoCardBody}>{copy.typography.usageContentCardBody}</p>
                  <button type="button" className={styles.usageDemoCta}>
                    {copy.typography.usageContentCardCta}
                  </button>
                </div>
                <p className={styles.usageDemoCaption}>{copy.typography.usageContentCardCaption}</p>
              </div>
              <div className={styles.usageExampleColumn}>
                <div className={styles.usageDemoHeader}>
                  <span className={styles.usageDemoWordmark}>{copy.typography.usageHeaderWordmark}</span>
                  <span className={styles.usageDemoAcademy}>{copy.typography.usageHeaderAcademy}</span>
                  <p className={styles.usageDemoSlogan}>{copy.typography.usageHeaderSlogan}</p>
                </div>
                <p className={styles.usageDemoCaption}>{copy.typography.usageHeaderCaption}</p>
              </div>
            </div>
          </div>
        </div>
          </>
        )}
      </div>
    </section>
  )
}
