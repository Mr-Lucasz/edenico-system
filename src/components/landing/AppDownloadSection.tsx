'use client'

import { institutionalStats } from '@src/constants/institutionalStats'

const GOOGLE_PLAY_URL = 'https://play.google.com/store/apps/details?id=com.edenicos.academy'
const APP_STORE_URL = 'https://apps.apple.com/app/edenicos-academy/id123456789'
const UTM_PARAMS = 'utm_source=landing&utm_medium=web&utm_campaign=home'

export function AppDownloadSection() {
  return (
    <section className="bg-edenicos-navy px-4 py-16 sm:px-6 sm:py-20 lg:px-8" aria-labelledby="app-heading">
      {/* Nuvens decorativas no topo */}
      <div className="absolute left-0 right-0 h-16 bg-gradient-to-b from-slate-800 to-edenicos-navy" aria-hidden />

      <div className="relative mx-auto max-w-7xl">
        <h2 id="app-heading" className="text-center font-mono text-3xl font-bold tracking-tight text-edenicos-yellow sm:text-4xl" style={{ textShadow: '2px 2px 0 #0f172a' }}>
          Edênicos
        </h2>
        <p className="mt-2 text-center text-sm text-white/80">Baixe o app e estude onde estiver</p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-6">
          <a
            href={`${GOOGLE_PLAY_URL}?${UTM_PARAMS}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-lg bg-white/10 px-5 py-3 text-white transition-colors hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-edenicos-yellow focus-visible:ring-offset-2 focus-visible:ring-offset-edenicos-navy"
          >
            <span className="text-2xl" aria-hidden>▶</span>
            Disponível no Google Play
          </a>
          <a
            href={`${APP_STORE_URL}?${UTM_PARAMS}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-lg bg-white/10 px-5 py-3 text-white transition-colors hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-edenicos-yellow focus-visible:ring-offset-2 focus-visible:ring-offset-edenicos-navy"
          >
            <span className="text-2xl" aria-hidden>⬇</span>
            Baixar na App Store
          </a>
        </div>

        {/* Contadores (RF06: fonte única institutionalStats) */}
        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-3">
          <div className="flex flex-col items-center rounded-lg bg-white/5 py-6 text-center">
            <span className="text-3xl font-bold text-white">{institutionalStats.app.students}</span>
            <span className="mt-1 text-sm text-white/80">Alunos</span>
          </div>
          <div className="flex flex-col items-center rounded-lg bg-white/5 py-6 text-center">
            <span className="text-3xl font-bold text-white">{institutionalStats.app.classes}</span>
            <span className="mt-1 text-sm text-white/80">Aulas</span>
          </div>
          <div className="flex flex-col items-center rounded-lg bg-white/5 py-6 text-center">
            <span className="text-3xl font-bold text-white">{institutionalStats.app.rating}</span>
            <span className="mt-1 text-sm text-white/80">Avaliação</span>
          </div>
        </div>
      </div>
    </section>
  )
}
