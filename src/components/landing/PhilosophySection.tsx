import Image from 'next/image'

import { PhilosophyCards } from './PhilosophyCards'
import { PhilosophyCta } from './PhilosophyCta'
import styles from './PhilosophySection.module.scss'

const BG_FILOSOFIA_WAVE = '/bg-filosofia-wave.svg'
const STAR_LARGE = '/star-large.svg'
const STAR_SMALL = '/star-small.svg'
const STAR_MINI = '/star-mini.svg'

export function PhilosophySection() {
  return (
    <section className={`filosofia-section ${styles.pb}`} aria-labelledby="philosophy-heading">
      <div className={`filosofia-section__bg ${styles.bg}`} aria-hidden>
        <div className={styles.bgImageWrap}>
          <Image
            src={BG_FILOSOFIA_WAVE}
            alt=""
            fill
            role="presentation"
            className={styles.bgImage}
            sizes="100vw"
            priority={false}
            unoptimized
          />
        </div>
      </div>
      <div className={`filosofia-stars ${styles.starsLayer}`} aria-hidden>
        <Image
          src={STAR_LARGE}
          alt=""
          width={202}
          height={224}
          className={`star filosofia-star--large ${styles.starLarge}`}
          unoptimized
        />
        <Image
          src={STAR_SMALL}
          alt=""
          width={69}
          height={69}
          className={`star star--delay-1 filosofia-star--medium ${styles.starMed}`}
          unoptimized
        />
        <Image
          src={STAR_MINI}
          alt=""
          width={41}
          height={41}
          className={`star star--delay-2 filosofia-star--small ${styles.starSmall}`}
          unoptimized
        />
        <Image
          src={STAR_MINI}
          alt=""
          width={41}
          height={41}
          className={`star star--delay-3 filosofia-star--glow ${styles.starGlow}`}
          unoptimized
        />
      </div>

      <div className={styles.content}>
        <div className={styles.row}>
          <div className={styles.col}>
            <div className={styles.headingBlock}>
              <h2 id="philosophy-heading" className={styles.heading}>
                FILOSOFIA
              </h2>
              <p className={styles.sub}>Educação 5.0</p>
            </div>
            <PhilosophyCards />
          </div>
          <PhilosophyCta />
        </div>
      </div>
    </section>
  )
}
