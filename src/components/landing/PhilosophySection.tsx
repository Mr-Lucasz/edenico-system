import Link from 'next/link'
import { FiUser, FiZap, FiBook, FiHeart, FiAward } from 'react-icons/fi'

const PILLARS = [
  { icon: FiUser, title: 'Físico', description: 'Saúde e disposição para o dia a dia.', color: 'bg-blue-600', id: 'fisico' },
  { icon: FiZap, title: 'Mental', description: 'Raciocínio, foco e bem-estar emocional.', color: 'bg-green-600', id: 'mental' },
  { icon: FiBook, title: 'Espiritual', description: 'Valores e conexão com o que importa.', color: 'bg-edenicos-yellow text-gray-900', id: 'espiritual' },
  { icon: FiHeart, title: 'Social', description: 'Relacionamentos e trabalho em equipe.', color: 'bg-red-500', id: 'social' },
  { icon: FiAward, title: 'Profissional', description: 'Carreira e competências para o mercado.', color: 'bg-edenicos-purple', id: 'profissional' },
]

export function PhilosophySection() {
  return (
    <section
      className="relative overflow-hidden bg-gradient-to-b from-edenicos-purple to-edenicos-purple-light py-20"
      aria-labelledby="philosophy-heading"
    >
      {/* Rasgo de papel (borda superior) */}
      <div
        className="absolute left-0 right-0 top-0 h-12 bg-white"
        style={{
          clipPath: 'polygon(0 100%, 2% 0, 5% 100%, 10% 0, 15% 100%, 20% 0, 25% 100%, 30% 0, 35% 100%, 40% 0, 45% 100%, 50% 0, 55% 100%, 60% 0, 65% 100%, 70% 0, 75% 100%, 80% 0, 85% 100%, 90% 0, 95% 100%, 98% 0, 100% 100%)',
        }}
        aria-hidden
      />

      {/* Estrelas decorativas (posições fixas para evitar hydration mismatch) */}
      <div className="absolute inset-0 overflow-hidden opacity-30" aria-hidden>
        {[
          [10, 15], [25, 8], [40, 22], [55, 12], [70, 18], [85, 10],
          [15, 75], [35, 82], [60, 78], [80, 85], [5, 45], [95, 50],
        ].map(([left, top], i) => (
          <span
            key={i}
            className="absolute text-edenicos-yellow"
            style={{ left: `${left}%`, top: `${top}%`, fontSize: '0.5rem' }}
          >
            ★
          </span>
        ))}
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div className="grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-2">
            {PILLARS.map((pillar) => (
              <article
                key={pillar.id}
                className={`rounded-xl ${pillar.color} p-6 text-white shadow-lg transition-transform hover:-translate-y-1 focus-within:ring-2 focus-within:ring-edenicos-yellow focus-within:ring-offset-2 focus-within:ring-offset-edenicos-purple`}
              >
                <pillar.icon className="h-8 w-8" aria-hidden />
                <h3 className="mt-3 text-sm font-bold uppercase tracking-wider">{pillar.title}</h3>
                <p className="mt-2 text-sm opacity-95">{pillar.description}</p>
              </article>
            ))}
          </div>

          <div className="flex flex-col items-center lg:items-end">
            <div
              className="h-48 w-48 shrink-0 rounded-lg bg-edenicos-yellow/30 shadow-2xl sm:h-56 sm:w-56"
              style={{
                clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
              }}
              aria-hidden
            />
            <Link
              href="#cursos"
              className="mt-6 rounded-lg bg-blue-600 px-6 py-3 font-medium text-white transition-colors hover:bg-blue-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-edenicos-yellow focus-visible:ring-offset-2 focus-visible:ring-offset-edenicos-purple"
            >
              Conhecer Metodologia
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
