import Image from 'next/image'

import { cn } from '@src/utils/cn'
import styles from './SectionTransitionShape.module.scss'

export const STARS_SECTION_DIVIDER_WAVE = '/stars-section-divider-wave.svg'

type SectionTransitionShapeProps = Readonly<{
  src?: string
  className?: string
  imageClassName?: string
}>

export function SectionTransitionShape({
  src = STARS_SECTION_DIVIDER_WAVE,
  className,
  imageClassName,
}: SectionTransitionShapeProps) {
  return (
    <div className={cn(styles.root, className)} aria-hidden>
      <div className={styles.graphic}>
        <Image
          src={src}
          alt=""
          width={1585}
          height={447}
          role="presentation"
          className={cn(styles.wave, imageClassName)}
          sizes="100vw"
          unoptimized
        />
      </div>
    </div>
  )
}
