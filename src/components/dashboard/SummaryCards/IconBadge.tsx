import { type ReactNode } from 'react'
import { cn } from '@src/utils/cn'

export interface IconBadgeProps {
  children: ReactNode
  color: 'green' | 'orange' | 'pink'
  className?: string
  size?: 'sm' | 'md'
}

export function IconBadge({ children, color, className, size = 'sm' }: IconBadgeProps) {
  const colorClasses = {
    green: 'bg-green-500',
    orange: 'bg-orange-500',
    pink: 'bg-pink-500',
  }

  const sizeClasses = {
    sm: 'h-5 w-5',
    md: 'h-6 w-6',
  }

  const isString = typeof children === 'string'

  return (
    <div
      className={cn(
        'absolute -top-1 -right-1 z-10 flex items-center justify-center rounded-full text-white shadow-md',
        colorClasses[color],
        sizeClasses[size],
        className
      )}
    >
      {isString ? (
        <span className="text-xs font-bold">{children}</span>
      ) : (
        <span className="text-[10px]">{children}</span>
      )}
    </div>
  )
}
