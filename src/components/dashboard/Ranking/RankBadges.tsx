import { FiAward, FiStar } from 'react-icons/fi'

interface TierCard {
  level: 'bronze' | 'silver' | 'gold' | 'diamond'
  label: string
  description: string
  minPoints: number
  maxPoints: number | null
  icon: React.ReactNode
  gradientStart: string
  gradientEnd: string
  borderColor: string
  textColor: string
  iconBg: string
  pillBg: string
}

const tierCards: TierCard[] = [
  {
    level: 'bronze',
    label: 'BRONZE',
    description: 'Iniciante',
    minPoints: 0,
    maxPoints: 2000,
    icon: <FiAward style={{ width: '24px', height: '24px', color: 'rgb(255, 255, 255)' }} />,
    gradientStart: 'rgb(255, 237, 213)', // Peachy light
    gradientEnd: 'rgb(255, 200, 150)', // Soft orange
    borderColor: 'rgb(255, 200, 150)',
    textColor: 'rgb(194, 65, 12)', // Deep orange para texto
    iconBg: 'rgb(249, 115, 22)', // Laranja vibrante para container do ícone
    pillBg: 'rgb(255, 200, 150)',
  },
  {
    level: 'silver',
    label: 'PRATA',
    description: 'Promissor',
    minPoints: 2000,
    maxPoints: 5000,
    icon: <FiStar style={{ width: '24px', height: '24px', color: 'rgb(255, 255, 255)' }} />,
    gradientStart: 'rgb(243, 244, 246)', // Very light grey
    gradientEnd: 'rgb(209, 213, 219)', // Medium grey
    borderColor: 'rgb(209, 213, 219)',
    textColor: 'rgb(75, 85, 99)', // Dark grey para texto
    iconBg: 'rgb(75, 85, 99)', // Cinza escuro para container do ícone
    pillBg: 'rgb(209, 213, 219)',
  },
  {
    level: 'gold',
    label: 'OURO',
    description: 'Experiente',
    minPoints: 5000,
    maxPoints: 8000,
    icon: (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="rgb(255, 255, 255)"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{ width: '24px', height: '24px' }}
      >
        <path d="M5 16L3 5L8.5 7L12 4L15.5 7L21 5L19 16L12 19L5 16Z" />
        <path d="M12 4V19" />
        <path d="M8.5 7L12 4L15.5 7" />
        <path d="M3 5L8.5 7L12 4L15.5 7L21 5" />
      </svg>
    ),
    gradientStart: 'rgb(254, 240, 138)', // Pale yellow
    gradientEnd: 'rgb(250, 204, 21)', // Bright gold
    borderColor: 'rgb(250, 204, 21)',
    textColor: 'rgb(133, 77, 14)', // Golden brown para texto
    iconBg: 'rgb(250, 204, 21)', // Dourado para container do ícone
    pillBg: 'rgb(250, 204, 21)',
  },
  {
    level: 'diamond',
    label: 'DIAMANTE',
    description: 'Lendário',
    minPoints: 8000,
    maxPoints: null,
    icon: (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="rgb(255, 255, 255)"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{ width: '24px', height: '24px' }}
      >
        <path d="M6 3h12l4 6-10 12L2 9l4-6z" />
        <path d="M11 3L8 9l4 12 4-12-3-6" />
        <path d="M2 9h20" />
      </svg>
    ),
    gradientStart: 'rgb(207, 250, 254)', // Light cyan
    gradientEnd: 'rgb(103, 232, 249)', // Bright cyan
    borderColor: 'rgb(103, 232, 249)',
    textColor: 'rgb(14, 116, 144)', // Dark cyan para texto
    iconBg: 'rgb(59, 130, 246)', // Azul médio para container do ícone
    pillBg: 'rgb(103, 232, 249)',
  },
]

export function RankBadges() {
  return (
    <div style={{ display: 'flex', gap: '12px', flex: 1, justifyContent: 'flex-end' }}>
      {tierCards.map((tier) => (
        <div
          key={tier.level}
          style={{
            position: 'relative',
            borderRadius: '12px',
            border: `1px solid ${tier.borderColor}`,
            padding: '16px 12px',
            background: `linear-gradient(to bottom right, ${tier.gradientStart}, ${tier.gradientEnd})`,
            boxShadow: '0px 1px 2px rgba(0, 0, 0, 0.05)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '6px',
            width: '120px',
            minWidth: '120px',
            maxWidth: '120px',
            overflow: 'hidden',
          }}
        >
          {/* Decorative Shapes */}
          <div
            style={{
              position: 'absolute',
              top: '-10px',
              right: '-10px',
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              backgroundColor: tier.pillBg,
              opacity: 0.3,
            }}
          />
          <div
            style={{
              position: 'absolute',
              bottom: '-5px',
              left: '-5px',
              width: '20px',
              height: '20px',
              borderRadius: '4px',
              backgroundColor: tier.pillBg,
              opacity: 0.2,
            }}
          />

          {/* Icon Container - 3D Effect (Square with rounded corners) */}
          <div
            style={{
              width: '48px',
              height: '48px',
              borderRadius: '10px', // Cantos muito arredondados, mas quadrado
              backgroundColor: tier.iconBg,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '2px',
              zIndex: 1,
              position: 'relative',
              // Efeito 3D com sombras internas - sombra escura embaixo/direita, highlight claro em cima/esquerda
              boxShadow: `
                inset 0 3px 6px rgba(0, 0, 0, 0.4),
                inset 0 -2px 3px rgba(255, 255, 255, 0.3),
                0 1px 2px rgba(0, 0, 0, 0.1)
              `,
            }}
          >
            {/* Highlight no topo-esquerda para efeito 3D embossed */}
            <div
              style={{
                position: 'absolute',
                top: '2px',
                left: '2px',
                width: '20px',
                height: '20px',
                borderRadius: '8px 0 0 0',
                background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.5), transparent)',
                pointerEvents: 'none',
              }}
            />
            {/* Shadow no fundo-direita para efeito 3D côncavo */}
            <div
              style={{
                position: 'absolute',
                bottom: '2px',
                right: '2px',
                width: '20px',
                height: '20px',
                borderRadius: '0 0 8px 0',
                background: 'linear-gradient(315deg, rgba(0, 0, 0, 0.5), transparent)',
                pointerEvents: 'none',
              }}
            />
            {tier.icon}
          </div>

          {/* Tier Label */}
          <h3
            style={{
              fontSize: '13px',
              fontWeight: 700,
              color: tier.textColor,
              margin: 0,
              zIndex: 1,
              lineHeight: '16px',
              letterSpacing: '0.2px',
            }}
          >
            {tier.label}
          </h3>

          {/* Description */}
          <p
            style={{
              fontSize: '11px',
              fontWeight: 400,
              color: tier.textColor,
              margin: 0,
              opacity: 0.85,
              zIndex: 1,
              lineHeight: '14px',
            }}
          >
            {tier.description}
          </p>

          {/* Points Range Pill */}
          <div
            style={{
              marginTop: '2px',
              padding: '3px 10px',
              borderRadius: '9999px',
              backgroundColor: tier.pillBg,
              zIndex: 1,
            }}
          >
            <span
              style={{
                fontSize: '10px',
                fontWeight: 500,
                color: 'rgb(255, 255, 255)',
                lineHeight: '12px',
                whiteSpace: 'nowrap',
              }}
            >
              {tier.minPoints === 0
                ? '0'
                : tier.minPoints.toLocaleString('pt-BR', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
              {tier.maxPoints
                ? ` - ${tier.maxPoints.toLocaleString('pt-BR', { minimumFractionDigits: 0, maximumFractionDigits: 0 })} pts`
                : '+ pts'}
            </span>
          </div>
        </div>
      ))}
    </div>
  )
}
