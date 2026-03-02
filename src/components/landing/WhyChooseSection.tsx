import Image from 'next/image'
import Link from 'next/link'

const FEATURES = [
  {
    icon: '/icon-core.png',
    title: 'Filosofia STARS Holística',
    description:
      'Desenvolvimento completo através de Ciência, Tecnologia, Artes, Relações e Sustentabilidade.',
    bgClass: 'bg-purple-500',
  },
  {
    icon: '/icon-star.png',
    title: 'Universo Exclusivo de Personagens',
    description:
      'Mascotes animais únicos que criam conexão emocional e tornam o aprendizado memorável.',
    bgClass: 'bg-pink-500',
  },
  {
    icon: '/icon-perfil.png',
    title: 'Conteúdo Personalizado por Perfil',
    description:
      'Experiências adaptadas para estudantes, professores e pais, atendendo necessidades específicas.',
    bgClass: 'bg-green-500',
  },
]

export function WhyChooseSection() {
  return (
    <section id="cursos" className="bg-white py-16 sm:py-20" aria-labelledby="why-heading">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 id="why-heading" className="text-center text-3xl font-bold text-gray-900 sm:text-4xl">
          Por que escolher <span style={{ color: '#3980F5' }}>Edênicos Academy</span>?
        </h2>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((feature) => (
            <article
              key={feature.title}
              className="flex flex-col rounded-xl border border-gray-100 bg-white p-6 text-left shadow-sm transition-shadow hover:shadow-md"
            >
              <div
                className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-lg ${feature.bgClass}`}
              >
                <Image
                  src={feature.icon}
                  alt=""
                  width={28}
                  height={28}
                  className="h-7 w-7 object-contain"
                />
              </div>
              <h3 className="mt-4 text-base font-bold text-gray-900 sm:text-lg">
                {feature.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-gray-600">{feature.description}</p>
            </article>
          ))}
        </div>

        {/* Faixa: mascotes + texto — centralizada, largura menor */}
        <div className="mt-10 flex justify-center">
          <div className="flex w-full max-w-md flex-col items-center gap-3 rounded-full bg-gray-100 px-4 py-3 sm:flex-row sm:items-center sm:justify-center sm:gap-4 sm:px-5 sm:py-3">
            <div className="relative h-7 w-auto min-w-[120px] shrink-0 sm:h-8">
              <Image
                src="/container-imagem-mascotes.svg"
                alt=""
                width={145}
                height={35}
                className="h-full w-auto object-contain object-left"
                unoptimized
              />
            </div>
            <p className="text-center text-base" style={{ color: '#374151' }}>
              Junte-se à nossa comunidade de aprendizado!
            </p>
          </div>
        </div>

        {/* Botão CTA abaixo da faixa */}
        <div className="mt-8 flex justify-center">
          <Link
            href="/register"
            className="rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 px-8 py-4 text-lg font-bold text-white shadow-lg transition-all hover:from-blue-700 hover:to-blue-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
          >
            Comece sua jornada hoje!
          </Link>
        </div>
      </div>
    </section>
  )
}
