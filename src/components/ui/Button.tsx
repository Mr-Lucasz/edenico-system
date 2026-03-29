import { type ButtonHTMLAttributes, forwardRef } from 'react'
import { cn } from '@src/utils/cn'
import styles from './Button.module.scss'

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
}

const variantClass = {
  primary: styles.variantPrimary,
  secondary: styles.variantSecondary,
  outline: styles.variantOutline,
  ghost: styles.variantGhost,
} as const

const sizeClass = {
  sm: styles.sizeSm,
  md: styles.sizeMd,
  lg: styles.sizeLg,
} as const

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', ...props }, ref) => {
    return (
      <button
        className={cn(styles.base, variantClass[variant], sizeClass[size], className)}
        ref={ref}
        {...props}
      />
    )
  }
)

Button.displayName = 'Button'
