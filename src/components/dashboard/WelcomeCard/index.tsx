'use client'

import { useState, useEffect } from 'react'
import { FiAlertTriangle, FiInfo, FiCheck, FiAward } from 'react-icons/fi'
import { NotificationItem } from './NotificationItem'
import { AchievementCard } from './AchievementCard'
import { AchievementService } from '@src/domain/services/AchievementService'
import { AchievementRepository } from '@src/infrastructure/repositories/AchievementRepository'
import type { Notification } from '@src/types/notification.types'
import type { Achievement } from '@src/types/achievement.types'

const mockNotifications: Notification[] = [
  {
    id: '1',
    icon: <FiInfo className="h-3 w-3" />,
    message: 'Nova atividade disponível! Agora você pode gravar vídeos curtos para mostrar seus experimentos científicos!',
    actionLabel: 'Ver Detalhes',
    variant: 'info',
  },
  {
    id: '2',
    icon: <FiCheck className="h-3 w-3" />,
    message: 'Parabéns, pequeno cientista! Você ganhou a medalha "Explorador da Natureza" ao completar 5 experimentos!',
    actionLabel: 'Ver Detalhes',
    variant: 'success',
  },
  {
    id: '3',
    icon: <FiAlertTriangle className="h-3 w-3" />,
    message: 'Horário especial Lembrete: Nossa plataforma terá uma pausa rápida no domingo de manhã para melhorias.',
    actionLabel: 'Ver Detalhes',
    variant: 'warning',
  },
]

export function WelcomeCard() {
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications)
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
      {/* Header Section - Azul Forte */}
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

      {/* Notifications */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '11px' }}>
        {notifications.map((notification) => (
          <NotificationItem
            key={notification.id}
            notification={notification}
            onClose={handleCloseNotification}
          />
        ))}
      </div>

      {/* Achievements Navigation */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '7px',
          marginTop: '11px',
        }}
      >
        {/* Conquistas Recentes - Active */}
        <button
          onClick={() => setActiveTab('recent')}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '7px',
            padding: '8px 16px',
            borderRadius: '8px',
            backgroundColor: 'rgb(21, 93, 251)',
            border: 'none',
            cursor: 'pointer',
            color: 'rgb(255, 255, 255)',
            fontSize: '14px',
            fontWeight: 500,
            lineHeight: '21px',
          }}
        >
          <FiAward style={{ width: '16px', height: '16px' }} />
          <span>Conquistas Recentes</span>
        </button>

        {/* Explorar Agora - Inactive */}
        <button
          onClick={() => setActiveTab('explore')}
          style={{
            padding: '8px 16px',
            borderRadius: '9999px',
            backgroundColor: 'rgb(255, 255, 255)',
            border: 'none',
            cursor: 'pointer',
            color: 'rgb(113, 113, 130)',
            fontSize: '14px',
            fontWeight: 500,
            lineHeight: '21px',
          }}
        >
          Explorar Agora
        </button>

        {/* Novidade - Inactive */}
        <button
          onClick={() => setActiveTab('new')}
          style={{
            padding: '8px 16px',
            borderRadius: '9999px',
            backgroundColor: 'transparent',
            border: '1px solid rgb(190, 219, 255)',
            cursor: 'pointer',
            color: 'rgb(21, 93, 251)',
            fontSize: '14px',
            fontWeight: 500,
            lineHeight: '21px',
          }}
        >
          Novidade
        </button>
      </div>

      {/* Achievements List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '11px' }}>
        {isLoadingAchievements ? (
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
          achievements.map((achievement) => (
            <AchievementCard key={achievement.id} achievement={achievement} />
          ))
        )}
      </div>
    </div>
  )
}
