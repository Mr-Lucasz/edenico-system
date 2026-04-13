import Image from 'next/image'
import Link from 'next/link'
import { FiHome } from 'react-icons/fi'
import { StarsLogoMark } from '@src/components/stars/StarsLogoMark'
import { STARS_BRAND_COLORS } from '@src/components/stars/starsPuzzlePaths'
import { NotFoundBackButton } from './NotFoundBackButton'
import styles from './NotFoundAcademy.module.scss'

const PILL_LABELS = ['Science', 'Technology', 'Arts', 'Relations', 'Service'] as const

export function NotFoundAcademy() {
  return (
    <main className={styles.page}>
      <div className={styles.headerLogo}>
        <Link href="/" className={styles.logoLink} aria-label="Edênicos Academy — início">
          <Image
            src="/LogoEdenicos.png"
            alt=""
            width={140}
            height={42}
            className={styles.logoImg}
            priority
          />
        </Link>
      </div>

      <p className={styles.code} aria-hidden="true">
        404
      </p>
      <h1 className={styles.title}>Conteúdo Não Encontrado</h1>
      <div className={styles.divider} aria-hidden />

      <section className={styles.card} aria-labelledby="not-found-method-heading">
        <p id="not-found-method-heading" className={styles.label}>
          METODOLOGIA
        </p>
        <div className={styles.starsIcon}>
          <StarsLogoMark size={44} scale={1} />
        </div>
        <p className={styles.lead}>
          Sua jornada educacional foi interrompida momentaneamente.
        </p>
        <p className={styles.support}>
          Na metodologia STARS, cada obstáculo é um convite a explorar outro caminho — como num
          quebra-cabeça, a peça certa está sempre a conectar-se à seguinte.
        </p>
      </section>

      <ul className={styles.pills} aria-label="Pilares STARS">
        {PILL_LABELS.map((label, i) => (
          <li key={label} className={styles.pill} style={{ borderColor: STARS_BRAND_COLORS[i], color: STARS_BRAND_COLORS[i] }}>
            {label}
          </li>
        ))}
      </ul>

      <div className={styles.actions}>
        <Link href="/" className={styles.btnPrimary}>
          <FiHome className={styles.btnIcon} aria-hidden />
          Voltar ao Início
        </Link>
        <NotFoundBackButton />
      </div>
    </main>
  )
}
