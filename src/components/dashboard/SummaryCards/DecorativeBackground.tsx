import { type ReactNode } from 'react'
import { cn } from '@src/utils/cn'

export interface DecorativeBackgroundProps {
  color: 'blue' | 'green' | 'orange' | 'purple'
  className?: string
}

export function DecorativeBackground({ color, className }: DecorativeBackgroundProps) {
  const colorClasses = {
    blue: 'bg-blue-200',
    green: 'bg-green-200',
    orange: 'bg-orange-200',
    purple: 'bg-purple-200',
  }

  // Opacidades mais sutis para o fundo azul claro
  const opacityClasses = {
    blue: {
      large: 'opacity-10',
      medium: 'opacity-15',
      small: 'opacity-12',
    },
    green: {
      large: 'opacity-20',
      medium: 'opacity-30',
      small: 'opacity-25',
    },
    orange: {
      large: 'opacity-20',
      medium: 'opacity-30',
      small: 'opacity-25',
    },
    purple: {
      large: 'opacity-20',
      medium: 'opacity-30',
      small: 'opacity-25',
    },
  }

  return (
    <div className={cn('absolute inset-0 overflow-hidden rounded-2xl', className)}>
      {/* Círculo grande no canto inferior direito */}
      <div
        className={cn(
          'absolute -bottom-8 -right-8 h-32 w-32 rounded-full blur-2xl',
          colorClasses[color],
          opacityClasses[color].large
        )}
      />
      {/* Círculo médio no canto superior esquerdo */}
      <div
        className={cn(
          'absolute -top-4 -left-4 h-16 w-16 rounded-full blur-xl',
          colorClasses[color],
          opacityClasses[color].medium
        )}
      />
      {/* Círculo pequeno no canto inferior esquerdo */}
      <div
        className={cn(
          'absolute bottom-0 left-0 h-12 w-12 rounded-full blur-lg',
          colorClasses[color],
          opacityClasses[color].small
        )}
      />
    </div>
  )
}
