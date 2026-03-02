import { PhilosophyCards } from './PhilosophyCards'
import { PhilosophyCta } from './PhilosophyCta'

export function PhilosophySection() {
  return (
    <section
      className="relative overflow-hidden bg-gradient-to-b from-[#5B21B6] to-[#6D28D9] pb-24 pt-16 sm:pt-20"
      aria-labelledby="philosophy-heading"
    >
      {/* Borda inferior ondulada */}
      <div
        className="absolute bottom-0 left-0 right-0 h-16 bg-white"
        style={{
          clipPath:
            'polygon(0 100%, 0 30%, 5% 50%, 10% 25%, 15% 55%, 20% 20%, 25% 50%, 30% 30%, 35% 55%, 40% 25%, 45% 50%, 50% 30%, 55% 55%, 60% 20%, 65% 50%, 70% 35%, 75% 55%, 80% 25%, 85% 50%, 90% 30%, 95% 55%, 100% 25%, 100% 100%)',
        }}
        aria-hidden
      />

      {/* Estrelas decorativas amarelas */}
      <div className="absolute inset-0 overflow-hidden opacity-40" aria-hidden>
        <span className="absolute left-[8%] top-[12%] text-2xl text-yellow-400">★</span>
        <span className="absolute left-[15%] top-[45%] text-sm text-yellow-400">✦</span>
        <span className="absolute right-[28%] top-[25%] text-sm text-yellow-400">✦</span>
        <span className="absolute right-[22%] top-[55%] text-sm text-yellow-400">✦</span>
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-start gap-4 lg:grid-cols-[1fr_auto] lg:gap-8">
          {/* Coluna dos cards: título centralizado acima da div dos cards */}
          <div>
            <div className="mb-8 text-center">
              <h2
                id="philosophy-heading"
                className="text-4xl font-bold uppercase tracking-tight text-white sm:text-5xl"
              >
                FILOSOFIA
              </h2>
              <p className="mt-1 text-xl text-white/95">Educação 5.0</p>
            </div>
            <PhilosophyCards />
          </div>
          <PhilosophyCta />
        </div>
      </div>
    </section>
  )
}
