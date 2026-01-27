import { type ReactNode } from 'react'
import { cn } from '@src/utils/cn'
import { DecorativeBackground } from './DecorativeBackground'
import { IconBadge } from './IconBadge'

export type CardType = 'inProgress' | 'completed' | 'studyHours' | 'achievements'

export interface SummaryCardProps {
  type: CardType
  title: string | { line1: string; line2: string }
  value?: string
  message?: string
  messageIcon?: ReactNode
  icon: ReactNode
  badge?: {
    content: ReactNode
    color: 'green' | 'orange' | 'pink'
  }
  actionLabel?: string
  actionIcon?: ReactNode
  onAction?: () => void
  decorativeColor: 'blue' | 'green' | 'orange' | 'purple'
  gradient: string
  iconBgColor: string
  textColor: string
  messageColor?: string
  messageOpacity?: number
  valueGradient?: string
  actionColor?: string
  actionOpacity?: number
  showTitleDot?: boolean
}

export function SummaryCard({
  type,
  title,
  value,
  message,
  messageIcon,
  icon,
  badge,
  actionLabel,
  actionIcon,
  onAction,
  decorativeColor,
  gradient,
  iconBgColor,
  textColor,
  messageColor,
  messageOpacity = 1,
  valueGradient,
  actionColor,
  actionOpacity = 1,
  showTitleDot = false,
}: SummaryCardProps) {
  const isTitleObject = typeof title === 'object'
  const finalMessageColor = messageColor || textColor

  return (
    <div
      className={cn(
        'relative h-40 overflow-hidden rounded-2xl bg-gradient-to-br p-6 shadow-lg transition-shadow hover:shadow-xl',
        gradient
      )}
    >
      {/* Elementos decorativos de fundo */}
      <DecorativeBackground color={decorativeColor} />

      {/* Conteúdo principal */}
      <div className="relative z-10 flex h-full">
        {/* Lado esquerdo - Texto */}
        <div className="flex flex-1 flex-col justify-between">
          <div>
            {/* Título */}
            {isTitleObject ? (
              <div className="mb-2.5">
                <div className="flex items-center gap-1.5">
                  <h3 className={cn('text-base font-semibold', textColor)}>{title.line1}</h3>
                  <div className={cn('h-1 w-1 rounded-full', textColor)} />
                </div>
                <h3 className={cn('text-xl font-bold leading-tight', textColor)}>{title.line2}</h3>
              </div>
            ) : (
              <div className="mb-2.5">
                <h3 className={cn('text-lg font-semibold', textColor)}>{title}</h3>
                {showTitleDot && (
                  <div className={cn('mt-1 h-1 w-1 rounded-full', textColor)} />
                )}
              </div>
            )}

            {/* Valor (quando presente) */}
            {value && (
              <div className="mb-2 flex items-baseline gap-1">
                {valueGradient ? (
                  <span
                    className={cn('text-4xl font-bold leading-none bg-clip-text text-transparent', valueGradient)}
                  >
                    {value}
                  </span>
                ) : (
                  <span className={cn('text-4xl font-bold leading-none', textColor)}>{value}</span>
                )}
              </div>
            )}

            {/* Mensagem */}
            {message && (
              <div className="mb-1 flex items-center gap-1.5">
                {messageIcon && <span>{messageIcon}</span>}
                <p
                  className={cn('text-sm font-medium', finalMessageColor)}
                  style={{ opacity: messageOpacity }}
                >
                  {message}
                </p>
              </div>
            )}
          </div>

          {/* Ação */}
          {actionLabel && (
            <button
              onClick={onAction}
              className={cn(
                'mt-auto flex w-fit items-center gap-1.5 text-sm font-medium transition-opacity hover:opacity-80',
                actionColor ? '' : 'text-white'
              )}
              style={actionColor ? { color: actionColor, opacity: actionOpacity } : { opacity: actionOpacity }}
            >
              {actionLabel}
              {actionIcon && <span className="text-sm">{actionIcon}</span>}
            </button>
          )}
        </div>

        {/* Lado direito - Ícone grande */}
        <div className="absolute right-4 top-4">
          <div className={cn('relative rounded-xl p-3 shadow-sm', iconBgColor)}>
            <div className="flex items-center justify-center">{icon}</div>
            {badge && (
              <IconBadge color={badge.color}>
                {badge.content}
              </IconBadge>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
