import { type HTMLAttributes, forwardRef } from 'react'
import { cn } from '@src/utils/cn'
import styles from './Avatar.module.scss'

export interface AvatarProps extends HTMLAttributes<HTMLDivElement> {
  name: string
  size?: 'sm' | 'md' | 'lg'
  imageUrl?: string
}

const sizeClass = {
  sm: styles.sizeSm,
  md: styles.sizeMd,
  lg: styles.sizeLg,
} as const

export const Avatar = forwardRef<HTMLDivElement, AvatarProps>(
  ({ className, name, size = 'md', imageUrl, ...props }, ref) => {
    const getInitials = (n: string): string => {
      return n
        .split(' ')
        .map((x) => x[0])
        .join('')
        .toUpperCase()
        .slice(0, 2)
    }

    return (
      <div ref={ref} className={cn(styles.root, sizeClass[size], className)} {...props}>
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
