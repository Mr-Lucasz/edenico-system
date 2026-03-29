import Image from 'next/image'

import styles from './EdenicosTitleBridgeSection.module.scss'

const TITLE_SRC = '/Title.svg'

export function EdenicosTitleBridgeSection() {
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
    </section>
  )
}
