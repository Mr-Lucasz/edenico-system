import { type HTMLAttributes, forwardRef } from 'react'
import { cn } from '@src/utils/cn'

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'gradient'
  gradient?: string
}

export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant = 'default', gradient, children, ...props }, ref) => {
    const baseStyles = 'rounded-2xl p-6 shadow-md'

    if (variant === 'gradient' && gradient) {
      // Se o gradiente contém cores hexadecimais, usar style inline
      const isHexGradient = gradient.includes('#')
      let gradientStyle: React.CSSProperties | undefined

      if (isHexGradient) {
        // Extrair cores hexadecimais do formato from-[#xxx] to-[#yyy]
        const fromMatch = gradient.match(/from-\[#([a-fA-F0-9]+)\]/)
        const toMatch = gradient.match(/to-\[#([a-fA-F0-9]+)\]/)
        
        if (fromMatch && toMatch) {
          gradientStyle = {
            background: `linear-gradient(to bottom right, #${fromMatch[1]}, #${toMatch[1]})`,
          }
        }
      }

      return (
        <div
          ref={ref}
          className={cn(baseStyles, !isHexGradient && `bg-gradient-to-br ${gradient}`, className)}
          style={gradientStyle}
          {...props}
        >
          {children}
        </div>
      )
    }

    return (
      <div ref={ref} className={cn(baseStyles, 'bg-white', className)} {...props}>
        {children}
      </div>
    )
  }
)

Card.displayName = 'Card'
