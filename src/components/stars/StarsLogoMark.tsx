import { cn } from '@src/utils/cn'
import { getPuzzlePieceMeta, STARS_BRAND_COLORS } from './starsPuzzlePaths'
import styles from './StarsLogoMark.module.scss'

export interface StarsLogoMarkProps {
  /** Tamanho de cada célula da peça (px), antes de `scale`. */
  size?: number
  /** Escala aplicada ao conjunto (marca d'água, ícones maiores). Default 1. */
  scale?: number
  className?: string
  variant?: 'default' | 'watermark'
  'aria-hidden'?: boolean | 'true' | 'false'
}

const DEFAULT_PIECE = 56

export function StarsLogoMark({
  size = DEFAULT_PIECE,
  scale = 1,
  className,
  variant = 'default',
  'aria-hidden': ariaHidden = true,
}: Readonly<StarsLogoMarkProps>) {
  const dim = size

  return (
    <div
      className={cn(styles.mark, variant === 'watermark' && styles.watermark, className)}
      style={{
        transform: scale !== 1 ? `scale(${scale})` : undefined,
        transformOrigin: 'center center',
      }}
      aria-hidden={ariaHidden === true || ariaHidden === 'true' ? true : undefined}
    >
      {STARS_BRAND_COLORS.map((color, index) => {
        const { path, viewBox } = getPuzzlePieceMeta(index)
        return (
          <div
            key={index}
            className={styles.piece}
            style={{
              width: dim,
              height: dim,
              zIndex: 10 + index,
            }}
          >
            <svg viewBox={viewBox} className={styles.svg} aria-hidden>
              <path d={path} fill={color} />
            </svg>
          </div>
        )
      })}
    </div>
  )
}
