import { type HTMLAttributes, forwardRef } from 'react'
import { cn } from '@src/utils/cn'

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'success' | 'warning' | 'info' | 'new'
}

export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant = 'default', children, ...props }, ref) => {
    const baseStyles = 'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold'

    const variants = {
      default: 'bg-gray-100 text-gray-800',
      success: 'bg-green-100 text-green-800',
      warning: 'bg-yellow-100 text-yellow-800',
      info: 'bg-blue-100 text-blue-800',
      new: 'bg-purple-100 text-purple-800',
    }

    return (
      <span ref={ref} className={cn(baseStyles, variants[variant], className)} {...props}>
        {children}
      </span>
    )
  }
)

Badge.displayName = 'Badge'
