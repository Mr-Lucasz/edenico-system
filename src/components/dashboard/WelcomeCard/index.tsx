'use client'

import type { CSSProperties } from 'react'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { startNavigationProgress } from '@src/lib/navigationProgress'
import { FiAlertTriangle, FiInfo, FiCheck, FiAward } from 'react-icons/fi'
import { NotificationItem } from './NotificationItem'
import { AchievementCard } from './AchievementCard'
import { AchievementService } from '@src/domain/services/AchievementService'
import { AchievementRepository } from '@src/infrastructure/repositories/AchievementRepository'
import type { Notification } from '@src/types/notification.types'
import type { Achievement } from '@src/types/achievement.types'

const NOTIFICATION_BASE: Omit<Notification, 'onAction'>[] = [
  {
    id: '1',
    icon: <FiInfo className="h-3 w-3" />,
    message:
      'Nova atividade disponível! Agora você pode gravar vídeos curtos para mostrar seus experimentos científicos!',
    actionLabel: 'Ver Detalhes',
    variant: 'info',
  },
  {
    id: '2',
    icon: <FiCheck className="h-3 w-3" />,
    message:
      'Parabéns, pequeno cientista! Você ganhou a medalha "Explorador da Natureza" ao completar 5 experimentos!',
    actionLabel: 'Ver Detalhes',
    variant: 'success',
  },
  {
    id: '3',
    icon: <FiAlertTriangle className="h-3 w-3" />,
    message:
      'Horário especial Lembrete: Nossa plataforma terá uma pausa rápida no domingo de manhã para melhorias.',
    actionLabel: 'Ver Detalhes',
    variant: 'warning',
  },
]

const NOTIFICATION_ACTION_HREF: Record<string, string> = {
  '1': '/cursos',
  '2': '/conquistas',
  '3': '/notificacoes',
}

function tabButtonStyle(
  tab: 'recent' | 'explore' | 'new',
  active: boolean,
): CSSProperties {
  if (active) {
    return {
      display: 'flex',
      alignItems: 'center',
      gap: '7px',
      padding: '8px 16px',
      borderRadius: tab === 'new' ? '9999px' : '8px',
      backgroundColor: 'rgb(21, 93, 251)',
      border: 'none',
      cursor: 'pointer',
      color: 'rgb(255, 255, 255)',
      fontSize: '14px',
      fontWeight: 500,
      lineHeight: '21px',
    }
  }
  if (tab === 'new') {
    return {
      padding: '8px 16px',
      borderRadius: '9999px',
      backgroundColor: 'transparent',
      border: '1px solid rgb(190, 219, 255)',
      cursor: 'pointer',
      color: 'rgb(21, 93, 251)',
      fontSize: '14px',
      fontWeight: 500,
      lineHeight: '21px',
    }
  }
  return {
    padding: '8px 16px',
    borderRadius: '9999px',
    backgroundColor: 'rgb(255, 255, 255)',
    border: 'none',
    cursor: 'pointer',
    color: 'rgb(113, 113, 130)',
    fontSize: '14px',
    fontWeight: 500,
    lineHeight: '21px',
  }
}

export function WelcomeCard() {
  const router = useRouter()
  const [notifications, setNotifications] = useState<Omit<Notification, 'onAction'>[]>(NOTIFICATION_BASE)
  const [achievements, setAchievements] = useState<Achievement[]>([])
  const [isLoadingAchievements, setIsLoadingAchievements] = useState(true)
  const [activeTab, setActiveTab] = useState<'recent' | 'explore' | 'new'>('recent')

  const handleCloseNotification = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id))
  }

  useEffect(() => {
    const loadAchievements = async () => {
      setIsLoadingAchievements(true)
      const repository = new AchievementRepository()
      const service = new AchievementService(repository)
      const recentAchievements = await service.getRecentAchievements(3)
      setAchievements(recentAchievements)
      setIsLoadingAchievements(false)
    }

    loadAchievements()
  }, [])

  return (
    <div
      style={{
        boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
        borderRadius: '8.75px',
        padding: '21px',
        background: 'linear-gradient(to bottom right, rgb(235, 245, 255), rgb(215, 235, 255))',
        display: 'flex',
        flexDirection: 'column',
        gap: '11px',
      }}
    >
      <div
        style={{
          borderRadius: '8.75px',
          padding: '21px',
          background: 'linear-gradient(to bottom right, rgb(21, 93, 251), rgb(20, 71, 230))',
        }}
      >
        <h2
          style={{
            marginTop: 0,
            marginBottom: '13px',
            marginLeft: 0,
            marginRight: 0,
            fontSize: '28px',
            fontWeight: 700,
            color: 'rgb(255, 255, 255)',
            lineHeight: '28px',
          }}
        >
          Olá, Sofia! 👋
        </h2>
        <p
          style={{
            margin: 0,
            fontSize: '14px',
            fontWeight: 400,
            color: 'rgb(255, 255, 255)',
            lineHeight: '21px',
            letterSpacing: '0px',
          }}
        >
          Bem-vindo de volta à Edênicos Academy. Vamos continuar aprendendo coisas incríveis!
        </p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '11px' }}>
        {notifications.map((notification) => {
          const href = NOTIFICATION_ACTION_HREF[notification.id]
          return (
            <NotificationItem
              key={notification.id}
              notification={{
                ...notification,
                onAction: href
                  ? () => {
                      startNavigationProgress()
                      router.push(href)
                    }
                  : undefined,
              }}
              onClose={handleCloseNotification}
            />
          )
        })}
      </div>

      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '7px',
          marginTop: '11px',
          flexWrap: 'wrap',
        }}
      >
        <button
          type="button"
          onClick={() => setActiveTab('recent')}
          style={tabButtonStyle('recent', activeTab === 'recent')}
        >
          <FiAward style={{ width: '16px', height: '16px' }} />
          <span>Conquistas Recentes</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('explore')}
          style={tabButtonStyle('explore', activeTab === 'explore')}
        >
          Explorar Agora
        </button>

        <button type="button" onClick={() => setActiveTab('new')} style={tabButtonStyle('new', activeTab === 'new')}>
          Novidade
        </button>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '11px' }}>
        {activeTab === 'recent' &&
          (isLoadingAchievements ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  style={{
                    height: '102.8px',
                    borderRadius: '12.75px',
                    backgroundColor: 'rgba(255, 255, 255, 0.2)',
                  }}
                />
              ))}
            </div>
          ) : (
            achievements.map((achievement) => <AchievementCard key={achievement.id} achievement={achievement} />)
          ))}

        {activeTab === 'explore' && (
          <div
            style={{
              borderRadius: '12.75px',
              border: '1px solid rgb(190, 219, 255)',
              padding: '16px',
              backgroundColor: 'rgba(255, 255, 255, 0.6)',
            }}
          >
            <p style={{ margin: '0 0 12px', fontSize: '14px', color: 'rgb(55, 65, 81)', lineHeight: '1.5' }}>
              Explore trilhas, desafios e cursos para avançar na sua jornada.
            </p>
            <button
              type="button"
              onClick={() => {
                startNavigationProgress()
                router.push('/cursos')
              }}
              style={{
                padding: '8px 16px',
                borderRadius: '8px',
                backgroundColor: 'rgb(21, 93, 251)',
                border: 'none',
                cursor: 'pointer',
                color: 'rgb(255, 255, 255)',
                fontSize: '14px',
                fontWeight: 500,
              }}
            >
              Ver cursos
            </button>
          </div>
        )}

        {activeTab === 'new' && (
          <div
            style={{
              borderRadius: '12.75px',
              border: '1px dashed rgb(190, 219, 255)',
              padding: '16px',
              backgroundColor: 'rgba(255, 255, 255, 0.35)',
            }}
          >
            <p style={{ margin: 0, fontSize: '14px', color: 'rgb(107, 114, 128)', lineHeight: '1.5' }}>
              Novidades da plataforma em breve. Fique de olho nas notificações!
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
