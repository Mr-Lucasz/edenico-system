'use client'

import { useState, useEffect } from 'react'
import { institutionalCopy } from '@src/constants/institutionalCopy'
import { FiEye, FiHeart } from 'react-icons/fi'
import { cn } from '@src/utils/cn'

function renderHighlight(text: string) {
  const parts = text.split(/\*\*(.*?)\*\*/g)
  return parts.map((p, i) => (i % 2 === 1 ? <strong key={i} className="text-orange-500">{p}</strong> : p))
}

export function PrinciplesSection() {
  const { principles } = institutionalCopy
  const [activeIndex, setActiveIndex] = useState(0)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 768px)')
    setIsMobile(mq.matches)
    const fn = () => setIsMobile(mq.matches)
    mq.addEventListener('change', fn)
    return () => mq.removeEventListener('change', fn)
  }, [])

  const cards = [
    {
      title: principles.vision.title,
      description: principles.vision.description,
      icon: FiEye,
      color: 'text-orange-500',
      bg: 'bg-orange-500/10',
    },
    {
      title: principles.mission.title,
      description: principles.mission.description,
      icon: FiHeart,
      color: 'text-purple-500',
      bg: 'bg-purple-500/10',
    },
  ]

  return (
    <section className="bg-gradient-to-b from-edenicos-navy to-edenicos-navy-light px-4 py-16 sm:px-6 lg:px-8" aria-labelledby="principles-heading">
      <div className="mx-auto max-w-7xl text-center">
        <span className="inline-block rounded-lg bg-white/10 px-4 py-1.5 text-sm text-white/80">
          {principles.tag}
        </span>
        <h2 id="principles-heading" className="mt-4 text-3xl font-bold text-white sm:text-4xl">
          {principles.title} <span className="text-orange-400">{principles.title2}</span>
        </h2>
        <p className="mx-auto mt-2 max-w-2xl text-white/80">{principles.subtitle}</p>

        {isMobile ? (
          <div className="mt-10">
            <div className="overflow-hidden rounded-2xl bg-white shadow-xl">
              {cards.map((card, i) => (
                <div
                  key={card.title}
                  role="tabpanel"
                  id={`principles-panel-${i}`}
                  aria-labelledby={`principles-tab-${i}`}
                  hidden={activeIndex !== i}
                  className="p-8"
                >
                  <div className={`inline-flex rounded-full p-4 ${card.bg} ${card.color}`}>
                    <card.icon className="h-8 w-8" aria-hidden />
                  </div>
                  <h3 className="mt-4 text-xl font-bold text-gray-900">{card.title}</h3>
                  <p className="mt-3 text-gray-700">{renderHighlight(card.description)}</p>
                </div>
              ))}
            </div>
            <div role="tablist" className="mt-4 flex justify-center gap-2" aria-label="Visão e Missão">
              {cards.map((_, i) => (
                <button
                  key={i}
                  id={`principles-tab-${i}`}
                  role="tab"
                  aria-selected={activeIndex === i}
                  aria-controls={`principles-panel-${i}`}
                  onClick={() => setActiveIndex(i)}
                  className={cn(
                    'h-2.5 w-2.5 rounded-full transition-colors',
                    activeIndex === i ? 'bg-orange-500' : 'bg-white/40'
                  )}
                />
              ))}
            </div>
          </div>
        ) : (
          <div className="mt-10 grid gap-8 md:grid-cols-2">
            {cards.map((card) => (
              <article
                key={card.title}
                className="rounded-2xl border border-white/10 bg-white p-8 shadow-xl"
              >
                <div className={`inline-flex rounded-full p-4 ${card.bg} ${card.color}`}>
                  <card.icon className="h-8 w-8" aria-hidden />
                </div>
                <h3 className="mt-4 text-xl font-bold text-gray-900">{card.title}</h3>
                <p className="mt-3 text-gray-700">{renderHighlight(card.description)}</p>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
