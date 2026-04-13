import Image from 'next/image'

import styles from './EdenicosTitleBridgeSection.module.scss'


import { institutionalStats } from '@src/constants/institutionalStats'

const TITLE_SRC = '/Title.svg'
const GOOGLE_PLAY_URL = 'https://play.google.com/store/apps/details?id=com.edenicos.academy'
const APP_STORE_URL = 'https://apps.apple.com/app/edenicos-academy/id123456789'
const UTM_PARAMS = 'utm_source=landing&utm_medium=web&utm_campaign=home'

export function EdenicosTitleBridgeSection() {
  const { app } = institutionalStats

  return (
    <section
      className={styles.section}
      aria-label="Edênicos"
    >
      <div className={styles.inner}>
        <div className={styles.titleWrap}>
          <Image
            src={TITLE_SRC}
            alt="Edênicos"
            width={394}
            height={183}
            className={styles.titleImg}
            sizes="(max-width: 480px) 90vw, 394px"
            priority={false}
            unoptimized
          />
        </div>
      </div>
      <div className={styles.contentStack}>
        <p className={styles.sub}>Baixe o app e estude onde estiver</p>

        <div className={styles.statsCard}>
          <div className={styles.statsRow}>
            <div className={styles.stat}>
              <span className={`${styles.statValue} ${styles.statIndigo}`}>{app.students}</span>
              <span className={styles.statLabel}>{app.studentsLabel}</span>
            </div>
            <div className={styles.stat}>
              <span className={`${styles.statValue} ${styles.statViolet}`}>{app.missions}</span>
              <span className={styles.statLabel}>{app.missionsLabel}</span>
            </div>
            <div className={styles.stat}>
              <span className={styles.ratingWrap}>
                <span className={`${styles.statValue} ${styles.statPink}`}>{app.rating}</span>
                <span className={styles.statStar} aria-hidden>
                  ★
                </span>
              </span>
              <span className={styles.statLabel}>{app.ratingLabel}</span>
            </div>
          </div>
        </div>

        <div className={styles.badgesRow}>
          <a
            href={`${GOOGLE_PLAY_URL}?${UTM_PARAMS}`}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.badge}
            aria-label="Disponível no Google Play"
          >
            <span className={styles.badgeIconWrap}>
              <Image
                src="/badges/playstore.png"
                alt=""
                width={40}
                height={40}
                className={styles.badgeIconPlay}
                unoptimized
              />
            </span>
            <span className={styles.badgeCopy}>
              <span className={styles.badgeKicker}>GET IT ON</span>
              <span className={styles.badgeTitle}>Google Play</span>
            </span>
          </a>
          <a
            href={`${APP_STORE_URL}?${UTM_PARAMS}`}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.badge}
            aria-label="Baixar na App Store"
          >
            <span className={styles.badgeIconWrap}>
              <Image
                src="/badges/logotipo-da-apple.png"
                alt=""
                width={36}
                height={44}
                className={styles.badgeIconApple}
                unoptimized
              />
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
