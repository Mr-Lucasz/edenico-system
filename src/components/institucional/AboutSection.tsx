import { institutionalCopy } from '@src/constants/institutionalCopy'
import { FiClock, FiUsers } from 'react-icons/fi'

export function AboutSection() {
  const { about } = institutionalCopy
  return (
    <section id="quem-somos" className="bg-white px-4 py-16 sm:px-6 lg:px-8" aria-labelledby="about-heading">
      <span id="sobre" className="absolute -top-20" aria-hidden />
      <div className="mx-auto max-w-7xl">
        <span className="mx-auto block w-fit rounded-full bg-blue-100 px-4 py-1.5 text-sm font-medium text-blue-700">
          {about.tag}
        </span>
        <h2 id="about-heading" className="mt-4 text-center text-3xl font-bold text-gray-900 sm:text-4xl">
          {about.title}
        </h2>
        <div className="mt-12 grid gap-8 md:grid-cols-2">
          <article className="rounded-2xl border border-gray-100 bg-white p-8 shadow-sm">
            <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-blue-100 text-blue-600">
              <FiClock className="h-7 w-7" aria-hidden />
            </div>
            <h3 className="mt-4 text-xl font-bold text-gray-900">{about.history.title}</h3>
            <p className="mt-3 text-gray-600">{about.history.description}</p>
          </article>
          <article className="rounded-2xl border border-gray-100 bg-white p-8 shadow-sm">
            <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-purple-100 text-purple-600">
              <FiUsers className="h-7 w-7" aria-hidden />
            </div>
            <h3 className="mt-4 text-xl font-bold text-gray-900">{about.team.title}</h3>
            <p className="mt-3 text-gray-600">{about.team.description}</p>
          </article>
        </div>
      </div>
    </section>
  )
}
