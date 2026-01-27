'use client'

import { useState, useEffect } from 'react'
import { FiAward } from 'react-icons/fi'
import { Card, Badge, Button } from '@src/components/ui'
import { gradients } from '@src/constants/gradients'
import { AchievementService } from '@src/domain/services/AchievementService'
import { AchievementRepository } from '@src/infrastructure/repositories/AchievementRepository'
import { AchievementCard } from './AchievementCard'
import type { Achievement } from '@src/types/achievement.types'

export function Achievements() {
  const [achievements, setAchievements] = useState<Achievement[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const loadAchievements = async () => {
      setIsLoading(true)
      const repository = new AchievementRepository()
      const service = new AchievementService(repository)
      const recentAchievements = await service.getRecentAchievements(3)
      setAchievements(recentAchievements)
      setIsLoading(false)
    }

    loadAchievements()
  }, [])

  return (
    <Card variant="gradient" gradient={gradients.achievements} className="space-y-4 shadow-md">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <FiAward className="h-5 w-5 text-purple-600" />
          <h2 className="text-xl font-bold text-gray-900">Conquistas Recentes</h2>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="new">Novidade</Badge>
          <Button variant="ghost" size="sm" className="font-medium">
            Explorar Agora
          </Button>
        </div>
      </div>

      {isLoading ? (
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-24 animate-pulse rounded-lg bg-white/50" />
          ))}
        </div>
      ) : (
        <div className="space-y-3">
          {achievements.map((achievement) => (
            <AchievementCard key={achievement.id} achievement={achievement} />
          ))}
        </div>
      )}
    </Card>
  )
}
