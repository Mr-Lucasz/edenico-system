import { cn } from '@src/utils/cn'
import styles from './DecorativeBackground.module.scss'

export interface DecorativeBackgroundProps {
  color: 'blue' | 'green' | 'orange' | 'purple'
  className?: string
}

export function DecorativeBackground({ color, className }: DecorativeBackgroundProps) {
  const isBlue = color === 'blue'

  return (
    <div className={cn(styles.root, className)}>
      <div
        className={cn(
          styles.blob,
          styles.large,
          styles[color],
          isBlue ? styles.opBlueLarge : styles.opOtherLarge
        )}
      />
      <div
        className={cn(
          styles.blob,
          styles.medium,
          styles[color],
          isBlue ? styles.opBlueMed : styles.opOtherMed
        )}
      />
      <div
        className={cn(
          styles.blob,
          styles.small,
          styles[color],
          isBlue ? styles.opBlueSmall : styles.opOtherSmall
        )}
      />
    </div>
  )
}
