import Image from 'next/image'
import Link from 'next/link'
import { FiPlay } from 'react-icons/fi'
import { FaApple } from 'react-icons/fa'
import { SiGoogleplay } from 'react-icons/si'

import { AppDownloadCloudDivider } from '@src/components/landing/AppDownloadCloudDivider'
import styles from './GameHero.module.scss'

const TITLE_SRC = '/Title.svg'

const GOOGLE_PLAY_URL = 'https://play.google.com/store/apps/details?id=com.edenicos.academy'
const APP_STORE_URL = 'https://apps.apple.com/app/edenicos-academy/id123456789'
const UTM_PARAMS = 'utm_source=site&utm_medium=web&utm_campaign=game-hero'

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

export function GameHero() {
  return (
    <section className={styles.wrap} aria-labelledby="game-hero-heading">
      <div className={styles.upper}>
        <div className={styles.inner}>
          <div className={styles.titleBlock}>
            <h1 id="game-hero-heading" className={styles.srOnly}>
              Edênicos — o jogo da vida
            </h1>
            <Image
              src={TITLE_SRC}
              alt="Edênicos"
              width={394}
              height={183}
              className={styles.titleImg}
              priority
            />
            <p className={styles.tagline}>O jogo da vida!</p>
          </div>

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
        </div>
      </div>

      <div className={styles.cloudDividerContainer}>
        <AppDownloadCloudDivider />
      </div>

      <div className={styles.ctaBand}>
        <div className={styles.inner}>
          <div className={styles.ctas}>
            <a
              href={`${GOOGLE_PLAY_URL}?${UTM_PARAMS}`}
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
              href={`${GOOGLE_PLAY_URL}?${UTM_PARAMS}`}
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
              href={`${APP_STORE_URL}?${UTM_PARAMS}`}
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
      </div>
    </section>
  )
}
