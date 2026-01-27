'use client'

import {
  FiBookOpen,
  FiAward,
  FiClock,
  FiTarget,
  FiGift,
  FiStar,
  FiUser,
} from 'react-icons/fi'
import { SummaryCard } from './SummaryCard'
import { gradients } from '@src/constants/gradients'

export function SummaryCards() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {/* Card 1: Cursos em Andamento */}
      <SummaryCard
        type="inProgress"
        title={{ line1: 'Cursos em', line2: 'Andamento' }}
        actionLabel="Continue estudando!"
        actionIcon={<FiBookOpen className="h-4 w-4" style={{ color: '#1976d2' }} />}
        icon={<FiBookOpen className="h-7 w-7" style={{ color: '#0d47a1' }} />}
        badge={{
          content: '3',
          color: 'green',
        }}
        decorativeColor="blue"
        gradient={gradients.summaryInProgress}
        iconBgColor="bg-blue-100"
        textColor="text-[#0d47a1]"
        actionColor="text-[#1976d2]"
        actionOpacity={0.7}
      />

      {/* Card 2: Cursos Concluídos */}
      <SummaryCard
        type="completed"
        title="Cursos Concluídos"
        value="8"
        message="Parabéns, campeão!"
        messageIcon={<FiGift className="h-4 w-4" style={{ color: '#00823e' }} />}
        icon={<FiAward className="h-7 w-7" style={{ color: '#00823e' }} />}
        badge={{
          content: <FiStar className="h-3 w-3" />,
          color: 'orange',
        }}
        decorativeColor="green"
        gradient={gradients.summaryCompleted}
        iconBgColor="bg-green-100"
        textColor="text-[#00823e]"
        messageColor="text-[#00a63e]"
        messageOpacity={0.7}
        valueGradient="bg-gradient-to-br from-[#00a63e] to-[#009966] bg-clip-text text-transparent"
      />

      {/* Card 3: Horas de Estudo */}
      <SummaryCard
        type="studyHours"
        title="Horas de Estudo"
        value="45h"
        message="Tempo bem investido!"
        icon={<FiClock className="h-7 w-7" style={{ color: '#ca3500' }} />}
        badge={{
          content: <FiUser className="h-3 w-3" />,
          color: 'pink',
        }}
        decorativeColor="orange"
        gradient={gradients.summaryStudyHours}
        iconBgColor="bg-orange-100"
        textColor="text-[#ca3500]"
        messageColor="text-[#f54900]"
        messageOpacity={0.7}
        valueGradient="bg-gradient-to-br from-[#f54900] to-[#e17100] bg-clip-text text-transparent"
      />

      {/* Card 4: Conquistas */}
      <SummaryCard
        type="achievements"
        title="Conquistas"
        value="12"
        message="Você é incrível!"
        icon={<FiTarget className="h-7 w-7" style={{ color: '#8200db' }} />}
        badge={{
          content: <FiStar className="h-3 w-3" />,
          color: 'pink',
        }}
        decorativeColor="purple"
        gradient={gradients.summaryAchievements}
        iconBgColor="bg-purple-100"
        textColor="text-[#8200db]"
        messageColor="text-[#9810fa]"
        messageOpacity={0.7}
        valueGradient="bg-gradient-to-br from-[#9810fa] to-[#4f39f7] bg-clip-text text-transparent"
        showTitleDot={true}
      />
    </div>
  )
}
