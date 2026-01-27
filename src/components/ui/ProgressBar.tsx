import { type HTMLAttributes, forwardRef } from 'react'
import { cn } from '@src/utils/cn'

export interface ProgressBarProps extends HTMLAttributes<HTMLDivElement> {
  value: number
  max?: number
  showLabel?: boolean
  color?: 'blue' | 'green' | 'purple' | 'orange'
}

export const ProgressBar = forwardRef<HTMLDivElement, ProgressBarProps>(
  ({ className, value, max = 100, showLabel = false, color = 'blue', ...props }, ref) => {
    const percentage = Math.min(Math.max((value / max) * 100, 0), 100)

    const colors = {
      blue: 'bg-blue-500',
      green: 'bg-green-500',
      purple: 'bg-purple-500',
      orange: 'bg-orange-500',
    }

    return (
      <div ref={ref} className={cn('w-full', className)} {...props}>
        {showLabel && (
          <div className="mb-1 flex justify-between text-xs text-gray-600">
            <span>Progresso</span>
            <span>{Math.round(percentage)}%</span>
          </div>
        )}
        <div className="h-2 w-full overflow-hidden rounded-full bg-gray-200">
          <div
            className={cn('h-full transition-all duration-300', colors[color])}
            style={{ width: `${percentage}%` }}
          />
        </div>
      </div>
    )
  }
)

ProgressBar.displayName = 'ProgressBar'
