import { type HTMLAttributes, forwardRef } from 'react'
import { cn } from '@src/utils/cn'
import styles from './Badge.module.scss'

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'success' | 'warning' | 'info' | 'new'
}

const variantClass = {
  default: styles.default,
  success: styles.success,
  warning: styles.warning,
  info: styles.info,
  new: styles.new,
} as const

export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant = 'default', children, ...props }, ref) => {
    return (
      <span ref={ref} className={cn(styles.base, variantClass[variant], className)} {...props}>
        {children}
      </span>
    )
  }
)

Badge.displayName = 'Badge'
