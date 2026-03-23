import Image from 'next/image'

import { cn } from '@src/utils/cn'

export const STARS_SECTION_DIVIDER_WAVE = '/stars-section-divider-wave.svg'

type SectionTransitionShapeProps = Readonly<{
  /** SVG da transição entre secções (default: onda branca com estrelas) */
  src?: string
  /** Classes no wrapper (ex.: `absolute bottom-0 left-0 right-0 z-0`) */
  className?: string
  imageClassName?: string
}>

/**
 * Forma de transição entre secções (full width), tipicamente colada ao fundo da secção anterior.
 */
export function SectionTransitionShape({
  src = STARS_SECTION_DIVIDER_WAVE,
  className,
  imageClassName,
}: SectionTransitionShapeProps) {
  return (
    <div
      className={cn('section-transition-shape pointer-events-none select-none', className)}
      aria-hidden
    >
      <div className="section-transition-shape__graphic leading-[0]">
        <Image
          src={src}
          alt=""
          width={1585}
          height={447}
          role="presentation"
          className={cn(
            'section-transition-shape__wave block h-auto w-full max-w-none',
            imageClassName,
          )}
          sizes="100vw"
          unoptimized
        />
      </div>
    </div>
  )
}
