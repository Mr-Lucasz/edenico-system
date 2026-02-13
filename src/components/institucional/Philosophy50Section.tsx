import { institutionalCopy } from '@src/constants/institutionalCopy'
import { philosophy50Dimensions } from '@src/data/philosophy50Content'
import { FiActivity, FiZap, FiBook, FiHeart, FiAward } from 'react-icons/fi'

const DIMENSION_ICONS = [FiActivity, FiZap, FiBook, FiHeart, FiAward]

export function Philosophy50Section() {
  const { philosophy50: copy } = institutionalCopy
  return (
    <section id="filosofia-5" className="bg-gray-50 px-4 py-16 sm:px-6 lg:px-8" aria-labelledby="philosophy50-heading">
      <div className="mx-auto max-w-7xl">
        <span className="mx-auto block w-fit rounded-full bg-blue-100 px-4 py-1.5 text-sm font-medium text-blue-700">
          {copy.tag}
        </span>
        <h2 id="philosophy50-heading" className="mt-4 text-center text-3xl font-bold text-gray-900">
          {copy.title}
        </h2>
        <p className="mx-auto mt-4 max-w-3xl text-center text-gray-700">{copy.intro}</p>

        <div className="mt-12 space-y-12">
          {philosophy50Dimensions.map((dim, i) => {
            const Icon = DIMENSION_ICONS[i]
            return (
            <article
              key={dim.id}
              className={`rounded-2xl border border-gray-200 ${dim.bgLight} p-6 shadow-sm sm:p-8`}
            >
              <div className="flex flex-wrap items-start gap-4">
                <div className={`rounded-xl bg-white p-3 shadow-sm ${dim.color}`}>
                  <Icon className="h-8 w-8" aria-hidden />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">{dim.title}</h3>
                  <p className="mt-1 text-gray-700">{dim.subtitle}</p>
                </div>
              </div>
              <div className="mt-8 grid gap-8 md:grid-cols-2">
                <div>
                  <h4 className="mb-4 font-semibold text-gray-900">Como Cuidamos</h4>
                  <ul className="space-y-3">
                    {dim.howWeCare.map((item) => (
                      <li
                        key={item.title}
                        className="rounded-xl border border-gray-200/80 bg-white p-4 text-gray-800 shadow-sm"
                      >
                        <h5 className="font-medium text-gray-900">{item.title}</h5>
                        <p className="mt-1 text-sm text-gray-700">{item.description}</p>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="mb-4 font-semibold text-gray-900">Atividades e Práticas</h4>
                  <ul className="space-y-3">
                    {dim.activities.map((item) => (
                      <li
                        key={item.title}
                        className="rounded-xl border border-gray-200/80 bg-white p-4 text-gray-800 shadow-sm"
                      >
                        <h5 className="font-medium text-gray-900">{item.title}</h5>
                        <p className="mt-1 text-sm text-gray-700">{item.description}</p>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
