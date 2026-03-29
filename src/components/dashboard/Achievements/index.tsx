'use client'

import { useState, useEffect } from 'react'
import { FiAward } from 'react-icons/fi'
import { Card, Badge, Button } from '@src/components/ui'
import { gradients } from '@src/constants/gradients'
import { AchievementService } from '@src/domain/services/AchievementService'
import { AchievementRepository } from '@src/infrastructure/repositories/AchievementRepository'
import { AchievementCard } from './AchievementCard'
import type { Achievement } from '@src/types/achievement.types'
import styles from './Achievements.module.scss'

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
    <Card variant="gradient" gradient={gradients.achievements} className={styles.cardContent}>
      <div className={styles.header}>
        <div className={styles.titleRow}>
          <FiAward className={styles.iconPurple} aria-hidden />
          <h2 className={styles.title}>Conquistas Recentes</h2>
        </div>
        <div className={styles.actions}>
          <Badge variant="new">Novidade</Badge>
          <Button variant="ghost" size="sm" className={styles.ghostMedium}>
            Explorar Agora
          </Button>
        </div>
      </div>

      {isLoading ? (
        <div className={styles.list}>
          {[1, 2, 3].map((i) => (
            <div key={i} className={styles.skeleton} />
          ))}
        </div>
      ) : (
        <div className={styles.list}>
          {achievements.map((achievement) => (
            <AchievementCard key={achievement.id} achievement={achievement} />
          ))}
        </div>
      )}
    </Card>
  )
}
