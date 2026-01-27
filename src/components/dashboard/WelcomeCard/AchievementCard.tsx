import { FiCheck } from 'react-icons/fi'
import type { Achievement } from '@src/types/achievement.types'

export interface AchievementCardProps {
  achievement: Achievement
}

// Mapeamento de ícones baseado no nome da conquista
const getAchievementIcon = (name: string) => {
  if (name.includes('Natureza') || name.includes('Explorador')) {
    return '👑' // Coroa para Explorador da Natureza
  }
  if (name.includes('Inventor')) {
    return '⭐' // Estrela para Jovem Inventor
  }
  if (name.includes('Artista')) {
    return '🎨' // Paleta para Pequeno Artista
  }
  return '🏆' // Troféu padrão
}

export function AchievementCard({ achievement }: AchievementCardProps) {
  // Cores exatas do Figma convertidas de RGB
  // Gradiente: rgb(254, 252, 232) -> rgb(254, 243, 199) -> rgb(255, 237, 212)
  const gradientStart = 'rgb(254, 252, 232)'
  const gradientMid = 'rgb(254, 243, 199)'
  const gradientEnd = 'rgb(255, 237, 212)'
  const borderColor = 'rgb(255, 224, 32)' // Amarelo da borda
  const iconBg = 'rgb(243, 244, 246)' // Cinza claro
  const iconBorder = 'rgb(229, 231, 235)' // Cinza da borda do ícone
  const iconColor = 'rgb(156, 163, 175)' // Cinza médio do ícone
  const badgeGreen = 'rgb(0, 130, 53)' // Verde do badge (rgb(0, 0.5099976658821106*255, 0.20980960130691528*255))
  const titleColor = 'rgb(137, 75, 0)' // Marrom/laranja escuro do título
  const descColor = 'rgb(73, 85, 101)' // Cinza escuro da descrição
  const conqueredBg = 'rgb(220, 252, 231)' // Verde claro do "Conquistado!"
  const conqueredText = 'rgb(0, 130, 53)' // Verde escuro do texto
  const xpBg = 'rgb(254, 243, 199)' // Amarelo claro do "+500 XP"
  const xpText = 'rgb(120, 53, 15)' // Marrom do texto

  return (
    <div
      style={{
        position: 'relative',
        borderRadius: '12.75px',
        border: `1px solid ${borderColor}`,
        padding: '16px',
        background: `linear-gradient(to bottom right, ${gradientStart}, ${gradientMid}, ${gradientEnd})`,
        boxShadow:
          '0px 4px 6px rgba(255, 240, 133, 0.5), 0px 10px 15px rgba(255, 240, 133, 0.5)',
      }}
    >
      <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
        {/* Icon Circle */}
        <div
          style={{
            position: 'relative',
            width: '50px',
            height: '50px',
            borderRadius: '50%',
            backgroundColor: iconBg,
            border: `1px solid ${iconBorder}`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
          }}
        >
          <span style={{ fontSize: '24px', color: iconColor }}>{getAchievementIcon(achievement.name)}</span>
          
          {/* Green Badge - sobreposto ao top-right do círculo */}
          <div
            style={{
              position: 'absolute',
              right: '-5px', // Sobrepor ao top-right
              top: '-5px',
              width: '14px',
              height: '14px',
              borderRadius: '50%',
              backgroundColor: 'rgb(0, 201, 80)', // rgb(0, 0.7871556282043457*255, 0.3156217634677887*255)
              border: '1px solid rgb(255, 255, 255)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 10,
            }}
          >
            <FiCheck style={{ width: '8px', height: '8px', color: 'rgb(255, 255, 255)' }} />
          </div>
        </div>

        {/* Content */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <h3
            style={{
              fontSize: '16px',
              fontWeight: 600,
              color: titleColor,
              lineHeight: '20px',
              margin: 0,
              marginBottom: '4px',
            }}
          >
            {achievement.name}
          </h3>
          <p
            style={{
              fontSize: '14px',
              fontWeight: 400,
              color: descColor,
              lineHeight: '20px',
              margin: 0,
              marginBottom: '8px',
            }}
          >
            {achievement.description}
          </p>

          {/* Tags */}
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
            {/* Conquistado! */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                padding: '4px 8px',
                borderRadius: '9999px',
                backgroundColor: conqueredBg,
                border: 'none',
              }}
            >
              <span style={{ fontSize: '12px' }}>✨</span>
              <span
                style={{
                  fontSize: '12px',
                  fontWeight: 500,
                  color: conqueredText,
                  lineHeight: '16px',
                }}
              >
                Conquistado!
              </span>
            </div>

            {/* +500 XP */}
            <div
              style={{
                padding: '4px 8px',
                borderRadius: '9999px',
                backgroundColor: xpBg,
                border: 'none',
              }}
            >
              <span
                style={{
                  fontSize: '12px',
                  fontWeight: 500,
                  color: xpText,
                  lineHeight: '16px',
                }}
              >
                +{achievement.xp} XP
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
