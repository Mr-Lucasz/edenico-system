import { FiCompass, FiSettings, FiImage } from 'react-icons/fi'
import { Button, Badge } from '@src/components/ui'
import type { Achievement } from '@src/types/achievement.types'

export interface AchievementCardProps {
  achievement: Achievement
}

const iconMap: Record<string, React.ReactNode> = {
  compass: <FiCompass className="h-6 w-6" />,
  gear: <FiSettings className="h-6 w-6" />,
  palette: <FiImage className="h-6 w-6" />,
}

export function AchievementCard({ achievement }: AchievementCardProps) {
  const icon = iconMap[achievement.icon] || <FiCompass className="h-6 w-6" />

  return (
    <div className="rounded-lg border border-purple-200 bg-white p-4">
      <div className="mb-3 flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div className="rounded-lg bg-purple-100 p-2 text-purple-600">{icon}</div>
          <div>
            <h3 className="font-semibold text-gray-900">{achievement.name}</h3>
            <p className="text-sm text-gray-600">{achievement.description}</p>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-between">
        <Button
          variant="secondary"
          size="sm"
          className="bg-purple-600 text-white hover:bg-purple-700"
        >
          Conquistado!
        </Button>
        <Badge variant="success">+{achievement.xp} XP</Badge>
      </div>
    </div>
  )
}
