import Link from 'next/link'
import { FiCloud, FiHeart, FiStar, FiShield } from 'react-icons/fi'
import { institutionalStats } from '@src/constants/institutionalStats'

const FEATURES = [
  {
    icon: FiCloud,
    title: 'Conteúdo na nuvem',
    description: 'Acesse suas aulas e materiais de qualquer lugar, quando quiser.',
    color: 'text-blue-600',
  },
  {
    icon: FiHeart,
    title: 'Feito com propósito',
    description: 'Educação que valoriza o ser humano em todas as dimensões.',
    color: 'text-purple-600',
  },
  {
    icon: FiStar,
    title: 'Gamificação',
    description: 'Aprenda jogando: conquistas, níveis e recompensas pelo progresso.',
    color: 'text-pink-500',
  },
  {
    icon: FiShield,
    title: 'Ambiente seguro',
    description: 'Plataforma pensada para você aprender com tranquilidade.',
    color: 'text-green-600',
  },
]

export function WhyChooseSection() {
  return (
    <section id="cursos" className="bg-white py-16 sm:py-20" aria-labelledby="why-heading">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 id="why-heading" className="text-center text-3xl font-bold text-gray-900 sm:text-4xl">
          Por que escolher Edênicos Academy?
        </h2>

        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {FEATURES.map((feature) => (
            <article
              key={feature.title}
              className="flex flex-col items-center rounded-xl border border-gray-100 bg-gray-50/50 p-6 text-center shadow-sm transition-shadow hover:shadow-md"
            >
              <div className={`rounded-full bg-gray-100 p-4 ${feature.color}`}>
                <feature.icon className="h-6 w-6" aria-hidden />
              </div>
              <h3 className="mt-4 text-lg font-semibold text-gray-900">{feature.title}</h3>
              <p className="mt-2 text-sm text-gray-600">{feature.description}</p>
            </article>
          ))}
        </div>

        {/* Social proof */}
        <div className="mt-14 flex flex-col items-center gap-6 sm:flex-row sm:justify-center">
          <div className="flex -space-x-3" aria-hidden>
            {[1, 2, 3, 4, 5].map((i) => (
              <div
                key={i}
                className="h-10 w-10 rounded-full border-2 border-white bg-gradient-to-br from-edenicos-purple to-edenicos-pink text-center text-xs font-medium leading-10 text-white shadow"
              >
                {i}
              </div>
            ))}
          </div>
          <p className="text-center text-gray-700 sm:text-left">
            Junte-se à nossa comunidade de <strong className="text-gray-900">{institutionalStats.impact.studentsImpacted}</strong> alunos!
          </p>
          <Link
            href="/register"
            className="rounded-lg bg-blue-600 px-5 py-3 font-medium text-white transition-colors hover:bg-blue-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
          >
            Junte-se a nós aqui
          </Link>
        </div>
      </div>
    </section>
  )
}
