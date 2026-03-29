import Image from 'next/image'
import Link from 'next/link'

import styles from './PhilosophyCta.module.scss'

const OCTO_SRC = '/octogono-irregular-section-filosofia.svg'

export function PhilosophyCta() {
  return (
    <div className={`filosofia-octogono ${styles.wrap}`}>
      <div className={`filosofia-octogono__figure filosofia-octogono--float ${styles.figure}`}>
        <Image
          src={OCTO_SRC}
          alt=""
          fill
          role="presentation"
          className={`filosofia-octogono__img ${styles.img}`}
          sizes="(max-width: 767px) 320px, (max-width: 1023px) 560px, 600px"
          unoptimized
        />
        <Link href="#cursos" className={`filosofia-octogono__link ${styles.link}`}>
          Conheça mais
        </Link>
      </div>
    </div>
  )
}
