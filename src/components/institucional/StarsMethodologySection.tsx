'use client'

import { useState, useEffect } from 'react'
import { institutionalCopy } from '@src/constants/institutionalCopy'
import { starsCategories, type StarsCategoryId } from '@src/data/starsContent'
import { cn } from '@src/utils/cn'

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

  const activeCategory = starsCategories.find((c) => c.id === activeId) ?? starsCategories[0]

  return (
    <section id="metodologia-stars" className="border-t border-gray-200 bg-white px-4 py-16 sm:px-6 lg:px-8" aria-labelledby="stars-heading">
      <div className="mx-auto max-w-7xl">
        <div className="text-center">
          <h2 id="stars-heading" className="text-3xl font-bold text-gray-900">
            {copy.sectionTitle}
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-gray-600">{copy.sectionDescription}</p>
        </div>

        <div className="mt-12 flex flex-col gap-8 lg:flex-row">
          {isMobile ? (
            <div className="w-full space-y-2" role="tablist" aria-label="Metodologia STARS">
              {starsCategories.map((cat) => (
                <div
                  key={cat.id}
                  className="rounded-xl border border-gray-200 bg-gray-50 overflow-hidden"
                  role="tab"
                  aria-expanded={accordionOpen === cat.id}
                  aria-controls={`stars-panel-${cat.id}`}
                  id={`stars-tab-${cat.id}`}
                >
                  <button
                    type="button"
                    onClick={() => setAccordionOpen(accordionOpen === cat.id ? null : cat.id)}
                    className="flex w-full items-center gap-3 px-4 py-4 text-left font-medium text-gray-900"
                  >
                    <span className={cn('rounded-lg p-2', accordionOpen === cat.id ? 'bg-white shadow ' + cat.color : 'bg-white/50 text-gray-500')}>
                      <cat.icon className="h-5 w-5" />
                    </span>
                    <span>{cat.letter} – {cat.title}</span>
                    <svg
                      className={cn('ml-auto h-5 w-5 transition-transform', accordionOpen === cat.id && 'rotate-180')}
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
                    hidden={accordionOpen !== cat.id}
                    className="border-t border-gray-200 bg-white px-4 py-6"
                  >
                    <StarsCategoryContent category={cat} />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <>
              <div className="flex-1 rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
                {starsCategories.map((cat) => (
                  <div
                    key={cat.id}
                    id={`stars-panel-${cat.id}`}
                    role="tabpanel"
                    aria-labelledby={`stars-tab-${cat.id}`}
                    hidden={activeId !== cat.id}
                    className={activeId === cat.id ? 'block' : 'hidden'}
                  >
                    <StarsCategoryContent category={cat} />
                  </div>
                ))}
              </div>
              <aside className="w-full lg:w-80 shrink-0">
                <nav
                  className="rounded-2xl bg-edenicos-navy p-6"
                  aria-label={copy.navTitle}
                  role="tablist"
                >
                  <h3 className="text-white font-semibold">{copy.navTitle}</h3>
                  <p className="mt-1 text-sm text-white/80">{copy.navSubtitle}</p>
                  <ul className="mt-4 space-y-1">
                    {starsCategories.map((cat) => (
                      <li key={cat.id}>
                        <button
                          type="button"
                          role="tab"
                          id={`stars-tab-${cat.id}`}
                          aria-selected={activeId === cat.id}
                          aria-controls={`stars-panel-${cat.id}`}
                          onClick={() => setActiveId(cat.id)}
                          className={cn(
                            'flex w-full items-center gap-3 rounded-lg px-4 py-3 text-left text-sm font-medium transition-colors',
                            activeId === cat.id
                              ? 'bg-sky-500/20 text-white border-l-4 border-sky-400'
                              : 'text-white/70 hover:bg-white/10'
                          )}
                        >
                          <cat.icon className={cn('h-5 w-5 shrink-0', activeId === cat.id ? cat.color : 'text-gray-400')} />
                          {cat.letter} – {cat.title}
                        </button>
                      </li>
                    ))}
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
  return (
    <>
      <div className="flex items-start gap-4">
        <div className={cn('rounded-xl bg-gray-100 p-3', category.color)}>
          <category.icon className="h-8 w-8" aria-hidden />
        </div>
        <div className="min-w-0 flex-1">
          <h3 className="text-2xl font-bold text-gray-900">{category.title}</h3>
          <p className="mt-1 text-gray-600">{category.subtitle}</p>
        </div>
      </div>
      <div className="mt-8 grid gap-8 md:grid-cols-2">
        <div>
          <h4 className="mb-4 font-semibold text-gray-900">{category.leftColumnTitle}</h4>
          <div className="space-y-3">
            {category.leftCards.map((card) => (
              <div
                key={card.title}
                className="rounded-xl border border-gray-100 bg-gray-50 p-4"
              >
                <h5 className="font-medium text-gray-900">{card.title}</h5>
                <p className="mt-1 text-sm text-gray-600">{card.description}</p>
              </div>
            ))}
          </div>
        </div>
        <div>
          <h4 className="mb-4 font-semibold text-gray-900">{category.rightColumnTitle}</h4>
          <div className="space-y-3">
            {category.rightCards.map((card) => (
              <div
                key={card.title}
                className="rounded-xl border border-gray-100 bg-gray-50 p-4"
              >
                <h5 className="font-medium text-gray-900">{card.title}</h5>
                <p className="mt-1 text-sm text-gray-600">{card.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
