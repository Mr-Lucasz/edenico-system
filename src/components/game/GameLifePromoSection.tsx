import Image from 'next/image'
import Link from 'next/link'
import { FiPlay } from 'react-icons/fi'
import { FaApple } from 'react-icons/fa'
import { SiGoogleplay } from 'react-icons/si'

import { GAME_APP_STORE_URL, GAME_GOOGLE_PLAY_URL, gamePromoUtm } from '@src/components/game/gamePromoUrls'
import styles from './GameLifePromoSection.module.scss'

const TITLE_SRC = '/Title.svg'

const STATS = [
  { value: '50K+', label: 'Estudantes Ativos', valueClass: styles.statIndigo },
  { value: '100+', label: 'Missões Disponíveis', valueClass: styles.statViolet },
  {
    value: '4.9',
    label: 'Avaliação',
    valueClass: styles.statPink,
    showStar: true as const,
  },
] as const

/** Promo Game: `Title.svg` (logo + barra no asset), stats e CTAs como na landing. */
export function GameLifePromoSection() {
  const utm = gamePromoUtm('comunidade-dashboard')

  return (
    <section className={styles.section} aria-labelledby="game-life-promo-heading">
      <div className={styles.inner}>
        <h2 id="game-life-promo-heading" className={styles.srOnly}>
          Edênicos — o jogo da vida
        </h2>
        <Image
          src={TITLE_SRC}
          alt="Edênicos — progresso 70 por cento"
          width={394}
          height={183}
          className={styles.titleImg}
          priority={false}
        />

        <p className={styles.tagline}>o jogo da vida!</p>

        <div className={styles.statsCard}>
          <div className={styles.statsRow}>
            {STATS.map((item) => (
              <div key={item.label} className={styles.stat}>
                <div className={styles.statValueRow}>
                  <span className={`${styles.statValue} ${item.valueClass}`}>{item.value}</span>
                  {'showStar' in item && item.showStar ? (
                    <span className={styles.statStar} aria-hidden>
                      ★
                    </span>
                  ) : null}
                </div>
                <span className={styles.statLabel}>{item.label}</span>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.ctas}>
          <a
            href={`${GAME_GOOGLE_PLAY_URL}?${utm}`}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.badge}
            aria-label="Disponível no Google Play"
          >
            <span className={styles.badgeIconWrap}>
              <SiGoogleplay className={styles.badgeSvgIcon} aria-hidden />
            </span>
            <span className={styles.badgeCopy}>
              <span className={styles.badgeKicker}>GET IT ON</span>
              <span className={styles.badgeTitle}>Google Play</span>
            </span>
          </a>

          <Link
            href={`${GAME_GOOGLE_PLAY_URL}?${utm}`}
            className={styles.playCta}
            target="_blank"
            rel="noopener noreferrer"
          >
            <FiPlay className={styles.playIcon} aria-hidden />
            Jogar Agora
            <span className={styles.sparkle} aria-hidden>
              ✦
            </span>
            <span className={styles.sparkle} aria-hidden>
              ✦
            </span>
          </Link>

          <a
            href={`${GAME_APP_STORE_URL}?${utm}`}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.badge}
            aria-label="Baixar na App Store"
          >
            <span className={styles.badgeIconWrap}>
              <FaApple className={styles.badgeSvgIcon} aria-hidden />
            </span>
            <span className={styles.badgeCopy}>
              <span className={styles.badgeKicker}>Download on the</span>
              <span className={styles.badgeTitle}>App Store</span>
            </span>
          </a>
        </div>
      </div>
    </section>
  )
}
