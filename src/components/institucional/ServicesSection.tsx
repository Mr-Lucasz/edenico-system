import { institutionalCopy } from '@src/constants/institutionalCopy'
import { FiMonitor, FiPackage, FiTool } from 'react-icons/fi'

const ICONS = [FiMonitor, FiPackage, FiTool]
const COLORS = ['bg-blue-100 text-blue-600', 'bg-orange-100 text-orange-600', 'bg-purple-100 text-purple-600']

export function ServicesSection() {
  const { services } = institutionalCopy
  return (
    <section className="bg-gray-50 px-4 py-16 sm:px-6 lg:px-8" aria-labelledby="services-heading">
      <div className="mx-auto max-w-7xl">
        <h2 id="services-heading" className="text-center text-3xl font-bold text-gray-900">
          {services.title}
        </h2>
        <div className="mt-12 grid gap-8 md:grid-cols-3">
          {services.items.map((item, i) => {
            const Icon = ICONS[i]
            return (
            <article
              key={item.title}
              className="rounded-2xl border border-gray-100 bg-white p-8 shadow-sm transition-shadow hover:shadow-md"
            >
              <div className={`inline-flex rounded-xl p-4 ${COLORS[i]}`}>
                <Icon className="h-8 w-8" aria-hidden />
              </div>
              <h3 className="mt-4 text-xl font-bold text-gray-900">{item.title}</h3>
              <p className="mt-3 text-gray-600">{item.description}</p>
            </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
