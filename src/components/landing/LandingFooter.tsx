import Link from 'next/link'
import { FiInstagram, FiFacebook, FiTwitter, FiYoutube } from 'react-icons/fi'

const INSTITUTIONAL = [
  { label: 'Sobre nós', href: '#sobre' },
  { label: 'Contato', href: '#contato' },
  { label: 'Política de Privacidade', href: '/privacidade' },
]
const HELP = [
  { label: 'FAQ', href: '/faq' },
  { label: 'Suporte', href: '#contato' },
]
const COURSES = [
  { label: 'Cursos', href: '#cursos' },
  { label: 'Planos', href: '/planos' },
]
const SOCIAL = [
  { icon: FiInstagram, label: 'Instagram', href: 'https://instagram.com' },
  { icon: FiFacebook, label: 'Facebook', href: 'https://facebook.com' },
  { icon: FiTwitter, label: 'Twitter', href: 'https://twitter.com' },
  { icon: FiYoutube, label: 'YouTube', href: 'https://youtube.com' },
]

export function LandingFooter() {
  return (
    <footer className="bg-edenicos-navy text-white">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white/80">Institucional</h3>
            <ul className="mt-4 space-y-2">
              {INSTITUTIONAL.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-white/70 hover:text-white hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-edenicos-yellow focus-visible:ring-offset-2 focus-visible:ring-offset-edenicos-navy">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white/80">Ajuda</h3>
            <ul className="mt-4 space-y-2">
              {HELP.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-white/70 hover:text-white hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-edenicos-yellow focus-visible:ring-offset-2 focus-visible:ring-offset-edenicos-navy">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white/80">Cursos</h3>
            <ul className="mt-4 space-y-2">
              {COURSES.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-white/70 hover:text-white hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-edenicos-yellow focus-visible:ring-offset-2 focus-visible:ring-offset-edenicos-navy">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="flex flex-col items-start sm:items-end">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white/80">Redes Sociais</h3>
            <div className="mt-4 flex gap-4">
              {SOCIAL.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/70 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-edenicos-yellow focus-visible:ring-offset-2 focus-visible:ring-offset-edenicos-navy"
                  aria-label={item.label}
                >
                  <item.icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>
        </div>
        <div className="mt-12 border-t border-white/10 pt-8 text-center text-sm text-white/60">
          © {new Date().getFullYear()} Edênicos Academy. Todos os direitos reservados.
        </div>
      </div>
    </footer>
  )
}
