import { type HTMLAttributes, forwardRef } from 'react'
import { cn } from '@src/utils/cn'
import styles from './ProgressBar.module.scss'

export interface ProgressBarProps extends HTMLAttributes<HTMLDivElement> {
  value: number
  max?: number
  showLabel?: boolean
  color?: 'blue' | 'green' | 'purple' | 'orange'
}

const fillClass = {
  blue: styles.fillBlue,
  green: styles.fillGreen,
  purple: styles.fillPurple,
  orange: styles.fillOrange,
} as const

export const ProgressBar = forwardRef<HTMLDivElement, ProgressBarProps>(
  ({ className, value, max = 100, showLabel = false, color = 'blue', ...props }, ref) => {
    const percentage = Math.min(Math.max((value / max) * 100, 0), 100)

    return (
      <div ref={ref} className={cn(styles.root, className)} {...props}>
        {showLabel && (
          <div className={styles.labelRow}>
            <span>Progresso</span>
            <span>{Math.round(percentage)}%</span>
          </div>
        )}
        <div className={styles.track}>
          <div
            className={cn(styles.fill, fillClass[color])}
            style={{ width: `${percentage}%` }}
          />
        </div>
      </div>
    )
  }
)

ProgressBar.displayName = 'ProgressBar'
