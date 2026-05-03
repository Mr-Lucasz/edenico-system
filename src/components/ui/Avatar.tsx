import { type HTMLAttributes, forwardRef } from 'react'
import { cn } from '@src/utils/cn'
import styles from './Avatar.module.scss'

export interface AvatarProps extends HTMLAttributes<HTMLDivElement> {
  name: string
  size?: 'sm' | 'md' | 'lg'
  imageUrl?: string
  /** Azul sólido (#0047ff) — alinhado ao protótipo Academy (logo / avatar) */
  tone?: 'gradient' | 'brandBlue'
}

const sizeClass = {
  sm: styles.sizeSm,
  md: styles.sizeMd,
  lg: styles.sizeLg,
} as const

const toneClass = {
  gradient: styles.toneGradient,
  brandBlue: styles.toneBrandBlue,
} as const

export const Avatar = forwardRef<HTMLDivElement, AvatarProps>(
  ({ className, name, size = 'md', imageUrl, tone = 'gradient', ...props }, ref) => {
    const getInitials = (n: string): string => {
      return n
        .split(' ')
        .map((x) => x[0])
        .join('')
        .toUpperCase()
        .slice(0, 2)
    }

    return (
      <div
        ref={ref}
        className={cn(styles.root, sizeClass[size], imageUrl ? undefined : toneClass[tone], className)}
        {...props}
      >
        {imageUrl ? (
          <img src={imageUrl} alt={name} className={styles.img} />
        ) : (
          <span>{getInitials(name)}</span>
        )}
      </div>
    )
  }
)

Avatar.displayName = 'Avatar'
