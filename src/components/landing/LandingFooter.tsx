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

export function LandingFooter() {
  const year = new Date().getFullYear()

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
            <h2 className={styles.brandTitle}>Edênicos</h2>
            <p className={styles.brandText}>
              Plataforma de educação com a metodologia STARS — Ciência, Tecnologia, Artes, Relações
              Humanas e Serviço — para uma formação integral, colaborativa e com propósito.
            </p>
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
              <span className={styles.bottomTaglineMobile}>
                Feito por pessoas para a educação de pessoas!
              </span>
              <span className={styles.bottomTaglineDesktop}>
                Feito com <FiHeart className={styles.heartIcon} aria-hidden /> para educação
              </span>
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
