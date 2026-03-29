import { type CSSProperties, type ReactNode } from 'react'
import { DecorativeBackground } from './DecorativeBackground'
import { IconBadge } from './IconBadge'
import styles from './SummaryCard.module.scss'

export type IconBgKey = 'blue' | 'green' | 'orange' | 'purple'

export interface SummaryCardProps {
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
  /** Valor CSS para `background` do card */
  background: string
  iconBg: IconBgKey
  titleColor: string
  messageColor?: string
  messageOpacity?: number
  /** Gradiente CSS para texto do valor */
  valueGradientCss?: string
  actionColor?: string
  actionOpacity?: number
  showTitleDot?: boolean
}

const iconBgClass: Record<IconBgKey, string> = {
  blue: styles.iconBgBlue,
  green: styles.iconBgGreen,
  orange: styles.iconBgOrange,
  purple: styles.iconBgPurple,
}

export function SummaryCard({
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
  background,
  iconBg,
  titleColor,
  messageColor,
  messageOpacity = 1,
  valueGradientCss,
  actionColor,
  actionOpacity = 1,
  showTitleDot = false,
}: SummaryCardProps) {
  const isTitleObject = typeof title === 'object'
  const finalMessageColor = messageColor || titleColor

  const rootStyle: CSSProperties = { background }

  const valueGradientStyle: CSSProperties | undefined = valueGradientCss
    ? {
        background: valueGradientCss,
        WebkitBackgroundClip: 'text',
        backgroundClip: 'text',
        color: 'transparent',
      }
    : undefined

  const actionStyle: CSSProperties = {
    ...(actionColor ? { color: actionColor } : { color: '#fff' }),
    opacity: actionOpacity,
  }

  return (
    <div className={styles.root} style={rootStyle}>
      <DecorativeBackground color={decorativeColor} />

      <div className={styles.inner}>
        <div className={styles.left}>
          <div>
            {isTitleObject ? (
              <div className={styles.titleBlock}>
                <div className={styles.titleRow}>
                  <h3 className={styles.titleSm} style={{ color: titleColor }}>
                    {title.line1}
                  </h3>
                  <div className={styles.dot} style={{ backgroundColor: titleColor }} />
                </div>
                <h3 className={styles.titleLg} style={{ color: titleColor }}>
                  {title.line2}
                </h3>
              </div>
            ) : (
              <div className={styles.titleBlock}>
                <h3 className={styles.titleXl} style={{ color: titleColor }}>
                  {title}
                </h3>
                {showTitleDot && (
                  <div
                    className={styles.dot}
                    style={{ marginTop: '0.25rem', backgroundColor: titleColor }}
                  />
                )}
              </div>
            )}

            {value && (
              <div className={styles.valueRow}>
                {valueGradientCss ? (
                  <span className={styles.valueGradient} style={valueGradientStyle}>
                    {value}
                  </span>
                ) : (
                  <span className={styles.value} style={{ color: titleColor }}>
                    {value}
                  </span>
                )}
              </div>
            )}

            {message && (
              <div className={styles.messageRow}>
                {messageIcon && <span>{messageIcon}</span>}
                <p className={styles.message} style={{ color: finalMessageColor, opacity: messageOpacity }}>
                  {message}
                </p>
              </div>
            )}
          </div>

          {actionLabel && (
            <button type="button" onClick={onAction} className={styles.action} style={actionStyle}>
              {actionLabel}
              {actionIcon && <span className={styles.actionIcon}>{actionIcon}</span>}
            </button>
          )}
        </div>

        <div className={styles.iconWrap}>
          <div className={`${styles.iconBox} ${iconBgClass[iconBg]}`}>
            <div className={styles.iconCenter}>{icon}</div>
            {badge && <IconBadge color={badge.color}>{badge.content}</IconBadge>}
          </div>
        </div>
      </div>
    </div>
  )
}
