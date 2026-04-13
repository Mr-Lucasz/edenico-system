import Link from 'next/link'
import {
  FiChevronDown,
  FiFacebook,
  FiHeart,
  FiInstagram,
  FiMail,
  FiTwitter,
  FiYoutube,
} from 'react-icons/fi'
import { FooterCountryFlag } from './FooterCountryFlag'
import styles from './LandingFooter.module.scss'

const ABOUT_LINKS = [
  { label: 'Institucional', href: '/institucional' },
  { label: 'Jogo', href: '#sobre' },
  { label: 'Doações', href: '#contato' },
  { label: 'Entrar', href: '/login' },
  { label: 'Registrar', href: '/register' },
  { label: 'Nossa equipe', href: '#contato' },
  { label: 'Nossos estagiários', href: '#contato' },
  { label: 'Carreiras', href: '#contato' },
] as const

const INSTIT_ABOUT_LINKS = [
  { label: 'Institucional', href: '/institucional#inicio' },
  { label: 'Jogo', href: '/institucional#ecossistema' },
  { label: 'Doações', href: '/institucional#contato' },
  { label: 'Entrar', href: '/login' },
  { label: 'Registrar', href: '/register' },
  { label: 'Nossa equipe', href: '/institucional#contato' },
  { label: 'Nossos estagiários', href: '/institucional#contato' },
  { label: 'Carreiras', href: '/institucional#contato' },
] as const

const CONTACT_LINKS = [
  { label: 'Central de ajuda', href: '#contato' },
  { label: 'Comunidade de apoio', href: '#contato' },
  { label: 'Compartilhe sua história', href: '#contato' },
  { label: 'Imprensa', href: '#contato' },
] as const

const INSTIT_CONTACT_LINKS = [
  { label: 'Central de ajuda', href: '/institucional#contato' },
  { label: 'Comunidade de apoio', href: '/institucional#contato' },
  { label: 'Compartilhe sua história', href: '/institucional#contato' },
  { label: 'Imprensa', href: '/institucional#contato' },
] as const

const COURSE_LINKS = [
  { label: 'Matemática Ensino Fundamental', href: '#cursos' },
  { label: 'Matemática Ensino Médio', href: '#cursos' },
  { label: 'Ciências Ensino Fundamental', href: '#cursos' },
  { label: 'Ciências Ensino Médio', href: '#cursos' },
  { label: 'Biblioteca de Matemática', href: '#cursos' },
  { label: 'Ciências Humanas', href: '#cursos' },
  { label: 'Habilidades para a vida', href: '#cursos' },
  { label: 'Ciências e Engenharia', href: '#cursos' },
] as const

const SOCIAL = [
  { icon: FiFacebook, label: 'Facebook', href: 'https://facebook.com' },
  { icon: FiInstagram, label: 'Instagram', href: 'https://instagram.com' },
  { icon: FiTwitter, label: 'Twitter', href: 'https://twitter.com' },
  { icon: FiYoutube, label: 'YouTube', href: 'https://youtube.com' },
  { icon: FiMail, label: 'E-mail', href: 'mailto:contato@edenicos.com' },
] as const

const COUNTRIES = [
  { code: 'BR' as const, label: 'Brasil' },
  { code: 'US' as const, label: 'USA' },
  { code: 'ES' as const, label: 'Espanha' },
] as const

export type LandingFooterProps = {
  variant?: 'default' | 'institucional'
}

export function LandingFooter({ variant = 'default' }: LandingFooterProps) {
  const year = new Date().getFullYear()
  const aboutLinks = variant === 'institucional' ? INSTIT_ABOUT_LINKS : ABOUT_LINKS
  const contactLinks = variant === 'institucional' ? INSTIT_CONTACT_LINKS : CONTACT_LINKS

  return (
    <footer className={styles.footer} role="contentinfo">
      <div className={styles.decor} aria-hidden>
        <span className={styles.decorSun}>☼</span>
        <span className={styles.decorStarSm}>✧</span>
        <span className={styles.decorCluster}>✦</span>
        <span className={styles.decorFlower}>❋</span>
      </div>

      <div className={styles.inner}>
        <div className={styles.topRule} aria-hidden />

        <div className={styles.topGrid}>
          <div className={styles.brandCol}>
            <h2 className={styles.brandTitle}>Edênicos Academy</h2>
            <p className={styles.brandText}>
              Transformando a educação através da filosofia STARS com nossos adoráveis mascotes
              animais. Uma plataforma onde aprender é uma aventura divertida e significativa.
            </p>
          </div>

          <div>
            <h3 className={styles.colHeading}>Acerca de</h3>
            <ul className={styles.linkList}>
              {aboutLinks.map((item) => (
                <li key={item.href + item.label}>
                  <Link href={item.href} className={styles.link}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className={styles.colHeading}>Contato</h3>
            <ul className={styles.linkList}>
              {contactLinks.map((item) => (
                <li key={item.href + item.label}>
                  <Link href={item.href} className={styles.link}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className={styles.colHeading}>Cursos</h3>
            <ul className={styles.linkList}>
              {COURSE_LINKS.map((item) => (
                <li key={item.href + item.label}>
                  <Link href={item.href} className={styles.link}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className={styles.midRow}>
          <div className={styles.localeBlock}>
            <div className={styles.localeRow}>
              <label htmlFor="footer-lang" className={styles.localeLabel}>
                Idioma:
              </label>
              <div className={styles.selectWrap}>
                <select
                  id="footer-lang"
                  className={styles.select}
                  defaultValue="pt"
                  aria-label="Idioma do site"
                >
                  <option value="pt">Português</option>
                  <option value="en">English</option>
                  <option value="es">Español</option>
                </select>
                <FiChevronDown className={styles.selectChevron} aria-hidden />
              </div>
            </div>

            <fieldset className={styles.countryField}>
              <legend className={styles.countryLegend}>País:</legend>
              <div className={styles.countryBtns}>
                {COUNTRIES.map((c) => (
                  <button
                    key={c.code}
                    type="button"
                    className={styles.countryBtn}
                    aria-pressed={c.code === 'BR'}
                  >
                    <span className={styles.countryFlag} aria-hidden>
                      <FooterCountryFlag
                        code={c.code}
                        className={styles.countryFlagSvg}
                      />
                    </span>
                    <span className={styles.countryLabel}>{c.label}</span>
                  </button>
                ))}
              </div>
            </fieldset>
            <span className={styles.decorHeadphones} aria-hidden>
              🎧
            </span>
          </div>

          <div className={styles.socialBlock}>
            <h3 className={styles.socialHeading}>Conecte-se Conosco</h3>
            <div className={styles.socialRow}>
              {SOCIAL.map((item) => {
                const isMail = item.href.startsWith('mailto:')
                return (
                  <a
                    key={item.label}
                    href={item.href}
                    {...(isMail
                      ? {}
                      : { target: '_blank', rel: 'noopener noreferrer' })}
                    className={styles.socialBtn}
                    aria-label={item.label}
                  >
                    <item.icon className={styles.socialIcon} />
                  </a>
                )
              })}
            </div>
          </div>
        </div>

        <div className={styles.bottomRow}>
          <p className={styles.bottomLeft}>
            <span className={styles.bottomLeftInner}>
              Feito com <FiHeart className={styles.heartIcon} aria-hidden /> para educação
            </span>
          </p>
          <p className={styles.bottomCenter}>
            © {year} Edênicos Academy. Todos os direitos reservados.
          </p>
          <nav className={styles.bottomNav} aria-label="Legal">
            <Link href="/privacidade" className={styles.legalLink}>
              Privacidade
            </Link>
            <Link href="/termos" className={styles.legalLink}>
              Termos
            </Link>
            <Link href="/cookies" className={styles.legalLink}>
              Cookies
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  )
}
