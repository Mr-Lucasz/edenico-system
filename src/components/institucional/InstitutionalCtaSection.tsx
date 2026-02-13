'use client'

import { institutionalCopy } from '@src/constants/institutionalCopy'
import { useCallback } from 'react'

export function InstitutionalCtaSection() {
  const { cta } = institutionalCopy

  const scrollToContact = useCallback(() => {
    const url = new URL(window.location.href)
    url.searchParams.set('assunto', 'parceria')
    window.history.replaceState({}, '', url.toString())
    const el = document.getElementById('contato')
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }, [])

  return (
    <section className="bg-white px-4 py-16 sm:px-6 lg:px-8" aria-labelledby="cta-heading">
      <div className="mx-auto max-w-4xl">
        <div className="rounded-2xl border border-gray-100 bg-white p-8 shadow-lg sm:p-12">
          <h2 id="cta-heading" className="text-center text-3xl font-bold text-gray-900 sm:text-4xl">
            {cta.title}
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-center text-gray-600">{cta.subtitle}</p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <a
              href="/#cursos"
              className="inline-flex items-center gap-2 rounded-lg bg-green-600 px-6 py-3 font-medium text-white transition-colors hover:bg-green-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2"
            >
              {cta.primary}
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
            <button
              type="button"
              onClick={scrollToContact}
              className="inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-6 py-3 font-medium text-gray-700 transition-colors hover:bg-gray-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-edenicos-yellow focus-visible:ring-offset-2"
            >
              {cta.secondary}
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
