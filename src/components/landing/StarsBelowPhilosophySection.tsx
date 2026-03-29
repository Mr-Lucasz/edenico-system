import Image from 'next/image'
import Link from 'next/link'

import styles from './StarsBelowPhilosophySection.module.scss'

const STAR_SRC = '/StarsSectionBelowFilosofia.svg'
const TORN_SRC = '/stars-section-divider-wave.svg'

const STAR_ROW: ReadonlyArray<{ key: string; sizeClass: string }> = [
  { key: 'outer-left', sizeClass: styles.starSm },
  { key: 'mid-left', sizeClass: styles.starMd },
  { key: 'center', sizeClass: styles.starLg },
  { key: 'mid-right', sizeClass: styles.starMd },
  { key: 'outer-right', sizeClass: styles.starSm },
]

export function StarsBelowPhilosophySection() {
  return (
    <section
      className={styles.section}
      aria-labelledby="stars-below-philosophy-heading"
    >
      <div className={styles.band}>
        <div className={styles.surface}>
          <div className={styles.content}>
            <div className={styles.inner}>
              <h2 id="stars-below-philosophy-heading" className={styles.srOnly}>
                Jornada STARS com os mascotes
              </h2>
              <div className={styles.stars} aria-hidden>
                {STAR_ROW.map(({ key, sizeClass }) => (
                  <div
                    key={key}
                    className={`${styles.starWrap} ${sizeClass}`}
                  >
                    <Image
                      src={STAR_SRC}
                      alt=""
                      width={234}
                      height={224}
                      className={styles.starImg}
                      unoptimized
                    />
                  </div>
                ))}
              </div>
              <p className={styles.text}>
                Junte-se aos nossos mascotes animais em uma jornada de descoberta através dos
                cinco pilares da filosofia STARS. Cada nível oferece desafios únicos que combinam
                diversão com aprendizado significativo.
              </p>
              <Link href="#sobre" className={styles.cta}>
                Salvar o Mundo!
              </Link>
            </div>
          </div>
        </div>
        <div className={styles.torn} aria-hidden>
          <div
            className={`stars-below-philosophy__divider ${styles.tornImageWrap}`}
          >
            <Image
              src={TORN_SRC}
              alt=""
              fill
              role="presentation"
              className={styles.tornImg}
              sizes="135vw"
              unoptimized
            />
          </div>
        </div>
      </div>
    </section>
  )
}
