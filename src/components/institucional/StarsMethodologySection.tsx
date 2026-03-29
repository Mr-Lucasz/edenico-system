'use client'

import { useState, useEffect, type CSSProperties } from 'react'
import { institutionalCopy } from '@src/constants/institutionalCopy'
import { starsCategories, type StarsCategoryId } from '@src/data/starsContent'
import { cn } from '@src/utils/cn'
import styles from './StarsMethodologySection.module.scss'

export function StarsMethodologySection() {
  const { stars: copy } = institutionalCopy
  const [activeId, setActiveId] = useState<StarsCategoryId>('science')
  const [isMobile, setIsMobile] = useState(false)
  const [accordionOpen, setAccordionOpen] = useState<StarsCategoryId | null>('science')

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 768px)')
    setIsMobile(mq.matches)
    const fn = () => setIsMobile(mq.matches)
    mq.addEventListener('change', fn)
    return () => mq.removeEventListener('change', fn)
  }, [])

  return (
    <section id="metodologia-stars" className={styles.section} aria-labelledby="stars-heading">
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 id="stars-heading" className={styles.title}>
            {copy.sectionTitle}
          </h2>
          <p className={styles.desc}>{copy.sectionDescription}</p>
        </div>

        <div className={styles.layout}>
          {isMobile ? (
            <div className={styles.accordionList} role="tablist" aria-label="Metodologia STARS">
              {starsCategories.map((cat) => {
                const open = accordionOpen === cat.id
                const hex = cat.colorHex ?? '#64748b'
                return (
                  <div
                    key={cat.id}
                    className={styles.accordionItem}
                    role="tab"
                    aria-expanded={open}
                    aria-controls={`stars-panel-${cat.id}`}
                    id={`stars-tab-${cat.id}`}
                  >
                    <button
                      type="button"
                      onClick={() => setAccordionOpen(open ? null : cat.id)}
                      className={styles.accordionBtn}
                    >
                      <span
                        className={styles.accordionIconWrap}
                        style={{
                          background: open ? '#fff' : 'rgb(255 255 255 / 0.5)',
                          color: open ? hex : '#6b7280',
                          boxShadow: open ? '0 1px 3px rgb(0 0 0 / 0.1)' : undefined,
                        }}
                      >
                        <cat.icon style={{ width: '1.25rem', height: '1.25rem' }} />
                      </span>
                      <span>
                        {cat.letter} – {cat.title}
                      </span>
                      <svg
                        className={cn(styles.chevron, open && styles.chevronOpen)}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        aria-hidden
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                    <div
                      id={`stars-panel-${cat.id}`}
                      role="tabpanel"
                      aria-labelledby={`stars-tab-${cat.id}`}
                      hidden={!open}
                      className={styles.panelMobile}
                    >
                      <StarsCategoryContent category={cat} />
                    </div>
                  </div>
                )
              })}
            </div>
          ) : (
            <>
              <div className={styles.desktopMain}>
                {starsCategories.map((cat) => (
                  <div
                    key={cat.id}
                    id={`stars-panel-${cat.id}`}
                    role="tabpanel"
                    aria-labelledby={`stars-tab-${cat.id}`}
                    className={activeId === cat.id ? styles.tabPanelVisible : styles.tabPanelHidden}
                  >
                    <StarsCategoryContent category={cat} />
                  </div>
                ))}
              </div>
              <aside className={styles.aside}>
                <nav className={styles.navBox} aria-label={copy.navTitle} role="tablist">
                  <h3 className={styles.navTitle}>{copy.navTitle}</h3>
                  <p className={styles.navDesc}>{copy.navSubtitle}</p>
                  <ul className={styles.navList}>
                    {starsCategories.map((cat) => {
                      const active = activeId === cat.id
                      const hex = cat.colorHex ?? '#94a3b8'
                      return (
                        <li key={cat.id}>
                          <button
                            type="button"
                            role="tab"
                            id={`stars-tab-${cat.id}`}
                            aria-selected={active}
                            aria-controls={`stars-panel-${cat.id}`}
                            onClick={() => setActiveId(cat.id)}
                            className={cn(styles.navBtn, active && styles.navBtnActive)}
                          >
                            <cat.icon
                              className={styles.navIcon}
                              style={{ color: active ? hex : '#9ca3af' }}
                            />
                            {cat.letter} – {cat.title}
                          </button>
                        </li>
                      )
                    })}
                  </ul>
                </nav>
              </aside>
            </>
          )}
        </div>
      </div>
    </section>
  )
}

function StarsCategoryContent({ category }: { category: (typeof starsCategories)[0] }) {
  const hex = category.colorHex ?? '#0f172a'
  const iconStyle: CSSProperties = { color: hex, width: '2rem', height: '2rem' }

  return (
    <>
      <div className={styles.catHeader}>
        <div className={styles.catIconBox}>
          <category.icon className={styles.catIcon} style={iconStyle} aria-hidden />
        </div>
        <div className={styles.catBody}>
          <h3 className={styles.catTitle}>{category.title}</h3>
          <p className={styles.catSubtitle}>{category.subtitle}</p>
        </div>
      </div>
      <div className={styles.grid2}>
        <div>
          <h4 className={styles.colTitle}>{category.leftColumnTitle}</h4>
          <div className={styles.cardList}>
            {category.leftCards.map((card) => (
              <div key={card.title} className={styles.smallCard}>
                <h5 className={styles.smallCardTitle}>{card.title}</h5>
                <p className={styles.smallCardDesc}>{card.description}</p>
              </div>
            ))}
          </div>
        </div>
        <div>
          <h4 className={styles.colTitle}>{category.rightColumnTitle}</h4>
          <div className={styles.cardList}>
            {category.rightCards.map((card) => (
              <div key={card.title} className={styles.smallCard}>
                <h5 className={styles.smallCardTitle}>{card.title}</h5>
                <p className={styles.smallCardDesc}>{card.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
