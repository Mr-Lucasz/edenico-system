import { FiCompass, FiSettings, FiImage } from 'react-icons/fi'
import { Button, Badge } from '@src/components/ui'
import type { Achievement } from '@src/types/achievement.types'
import styles from './AchievementCard.module.scss'

export interface AchievementCardProps {
  achievement: Achievement
}

const iconMap: Record<string, React.ReactNode> = {
  compass: <FiCompass style={{ width: '1.5rem', height: '1.5rem' }} />,
  gear: <FiSettings style={{ width: '1.5rem', height: '1.5rem' }} />,
  palette: <FiImage style={{ width: '1.5rem', height: '1.5rem' }} />,
}

export function AchievementCard({ achievement }: AchievementCardProps) {
  const icon = iconMap[achievement.icon] || (
    <FiCompass style={{ width: '1.5rem', height: '1.5rem' }} />
  )

  return (
    <div className={styles.root}>
      <div className={styles.top}>
        <div className={styles.left}>
          <div className={styles.iconBox}>{icon}</div>
          <div>
            <h3 className={styles.cardTitle}>{achievement.name}</h3>
            <p className={styles.cardDesc}>{achievement.description}</p>
          </div>
        </div>
      </div>
      <div className={styles.bottom}>
        <Button variant="secondary" size="sm" className={styles.cta}>
          Conquistado!
        </Button>
        <Badge variant="success">+{achievement.xp} XP</Badge>
      </div>
    </div>
  )
}
