import { type CSSProperties, type HTMLAttributes, forwardRef } from 'react'
import { cn } from '@src/utils/cn'
import styles from './Card.module.scss'

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'gradient'
  /** Valor CSS para `background` (ex.: linear-gradient(...)) */
  gradient?: string
}

export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant = 'default', gradient, children, style, ...props }, ref) => {
    if (variant === 'gradient' && gradient) {
      const mergedStyle: CSSProperties = { ...style, background: gradient }
      return (
        <div ref={ref} className={cn(styles.base, className)} style={mergedStyle} {...props}>
          {children}
        </div>
      )
    }

    return (
      <div ref={ref} className={cn(styles.base, styles.white, className)} style={style} {...props}>
        {children}
      </div>
    )
  }
)

Card.displayName = 'Card'
