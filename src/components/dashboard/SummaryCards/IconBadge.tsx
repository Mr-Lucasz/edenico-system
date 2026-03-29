import { type ReactNode } from 'react'
import { cn } from '@src/utils/cn'
import styles from './IconBadge.module.scss'

export interface IconBadgeProps {
  children: ReactNode
  color: 'green' | 'orange' | 'pink'
  className?: string
  size?: 'sm' | 'md'
}

const colorClass = {
  green: styles.green,
  orange: styles.orange,
  pink: styles.pink,
} as const

const sizeClass = {
  sm: styles.sm,
  md: styles.md,
} as const

export function IconBadge({ children, color, className, size = 'sm' }: IconBadgeProps) {
  const isString = typeof children === 'string'

  return (
    <div
      className={cn(styles.root, colorClass[color], sizeClass[size], className)}
    >
      {isString ? (
        <span className={styles.textXs}>{children}</span>
      ) : (
        <span className={styles.text10}>{children}</span>
      )}
    </div>
  )
}
