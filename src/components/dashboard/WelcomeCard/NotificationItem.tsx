import { FiX } from 'react-icons/fi'
import type { Notification } from '@src/types/notification.types'

export interface NotificationItemProps {
  notification: Notification
  onClose: (id: string) => void
}

// Cores exatas do Figma convertidas de RGB
const variantStyles = {
  info: {
    bg: 'rgb(239, 246, 255)', // #eff6ff
    border: 'rgb(190, 219, 255)', // #bedbff
    iconBg: 'rgb(25, 60, 184)', // #193cb8
    text: 'rgb(113, 113, 130)', // #717182
    button: 'rgb(10, 10, 10)', // #0a0a0a
    closeIcon: 'rgb(25, 60, 184)', // #193cb8
  },
  warning: {
    bg: 'rgb(254, 252, 232)', // #fefce8
    border: 'rgb(255, 240, 133)', // #fff085
    iconBg: 'rgb(249, 115, 22)', // #f97316 - laranja vibrante
    text: 'rgb(113, 113, 130)', // #717182
    button: 'rgb(10, 10, 10)', // #0a0a0a
    closeIcon: 'rgb(137, 75, 0)', // #894b00
  },
  success: {
    bg: 'rgb(240, 253, 244)', // #f0fdf4
    border: 'rgb(185, 248, 207)', // #b9f8cf
    iconBg: 'rgb(1, 102, 48)', // #016630
    text: 'rgb(113, 113, 130)', // #717182
    button: 'rgb(10, 10, 10)', // #0a0a0a
    closeIcon: 'rgb(1, 102, 48)', // #016630
  },
}

export function NotificationItem({ notification, onClose }: NotificationItemProps) {
  const variant = notification.variant || 'info'
  const styles = variantStyles[variant]

  // Dividir a mensagem em título e descrição baseado no primeiro ponto de exclamação
  const firstExclamation = notification.message.indexOf('!')
  const title = firstExclamation >= 0 ? notification.message.substring(0, firstExclamation + 1) : notification.message
  const description = firstExclamation >= 0 ? notification.message.substring(firstExclamation + 1).trim() : ''

  return (
    <div
      style={{
        position: 'relative',
        borderRadius: '8.75px',
        border: `1px solid ${styles.border}`,
        padding: '12px',
        backgroundColor: styles.bg,
        minHeight: '71px',
        width: '100%',
        display: 'flex',
        alignItems: 'flex-start',
        gap: '12px',
      }}
    >
      {/* Icon - posicionado conforme Figma: x: 14.8px, y: 13.05px */}
      <div
        style={{
          marginTop: '1.05px', // 13.05 - 12 = 1.05px
          marginLeft: '2.8px', // 14.8 - 12 = 2.8px
          width: '14px',
          height: '14px',
          borderRadius: '50%',
          backgroundColor: styles.iconBg,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'rgb(255, 255, 255)',
          flexShrink: 0,
        }}
      >
        {notification.icon}
      </div>

      {/* Text Content - flex grow para ocupar espaço disponível */}
      <div
        style={{
          flex: 1,
          minWidth: 0,
          marginTop: '-0.7px', // 11.3 - 12 = -0.7px (ajuste fino)
          display: 'flex',
          flexDirection: 'column',
          gap: '7.7px', // 36 - 11.3 - 17.5 = 7.2px, ajustado para 7.7px
        }}
      >
        {/* Title */}
        <p
          style={{
            fontSize: '14px',
            fontWeight: 400,
            color: styles.text,
            lineHeight: '17.5px',
            margin: 0,
            width: '100%',
          }}
        >
          {title}
        </p>
        {/* Description */}
        {description && (
          <p
            style={{
              fontSize: '14px',
              fontWeight: 400,
              color: styles.text,
              lineHeight: '17px',
              margin: 0,
              width: '100%',
            }}
          >
            {description}
          </p>
        )}
      </div>

      {/* Action Button "Ver Detalhes" - alinhado à direita */}
      {notification.actionLabel && (
        <button
          onClick={notification.onAction}
          style={{
            marginTop: '3.3px', // 15.3 - 12 = 3.3px
            width: '82.34px',
            height: '28px',
            borderRadius: '6.75px',
            backgroundColor: 'rgb(255, 255, 255)',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 0,
            flexShrink: 0,
          }}
        >
          <span
            style={{
              fontSize: '12px',
              fontWeight: 400,
              lineHeight: '13.6px',
              color: styles.button,
              textAlign: 'center',
            }}
          >
            {notification.actionLabel}
          </span>
        </button>
      )}

      {/* Close Button - alinhado à direita */}
      <button
        onClick={() => onClose(notification.id)}
        style={{
          marginTop: '2px', // 14 - 12 = 2px
          padding: 0,
          border: 'none',
          background: 'transparent',
          cursor: 'pointer',
          color: styles.closeIcon,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '14px',
          height: '14px',
          flexShrink: 0,
        }}
        aria-label="Fechar notificação"
      >
        <FiX style={{ width: '14px', height: '14px' }} />
      </button>
    </div>
  )
}
