'use client'

import styles from './SummaryCards.module.scss'
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
    <div className={styles.grid}>
      <SummaryCard
        title={{ line1: 'Cursos em', line2: 'Andamento' }}
        actionLabel="Continue estudando!"
        actionIcon={<FiBookOpen style={{ width: '1rem', height: '1rem', color: '#1976d2' }} />}
        icon={<FiBookOpen style={{ width: '1.75rem', height: '1.75rem', color: '#0d47a1' }} />}
        badge={{
          content: '3',
          color: 'green',
        }}
        decorativeColor="blue"
        background={gradients.summaryInProgress}
        iconBg="blue"
        titleColor="#0d47a1"
        actionColor="#1976d2"
        actionOpacity={0.7}
      />

      <SummaryCard
        title="Cursos Concluídos"
        value="8"
        message="Parabéns, campeão!"
        messageIcon={<FiGift style={{ width: '1rem', height: '1rem', color: '#00823e' }} />}
        icon={<FiAward style={{ width: '1.75rem', height: '1.75rem', color: '#00823e' }} />}
        badge={{
          content: <FiStar style={{ width: '0.75rem', height: '0.75rem' }} />,
          color: 'orange',
        }}
        decorativeColor="green"
        background={gradients.summaryCompleted}
        iconBg="green"
        titleColor="#00823e"
        messageColor="#00a63e"
        messageOpacity={0.7}
        valueGradientCss="linear-gradient(to bottom right, #00a63e, #009966)"
      />

      <SummaryCard
        title="Horas de Estudo"
        value="45h"
        message="Tempo bem investido!"
        icon={<FiClock style={{ width: '1.75rem', height: '1.75rem', color: '#ca3500' }} />}
        badge={{
          content: <FiUser style={{ width: '0.75rem', height: '0.75rem' }} />,
          color: 'pink',
        }}
        decorativeColor="orange"
        background={gradients.summaryStudyHours}
        iconBg="orange"
        titleColor="#ca3500"
        messageColor="#f54900"
        messageOpacity={0.7}
        valueGradientCss="linear-gradient(to bottom right, #f54900, #e17100)"
      />

      <SummaryCard
        title="Conquistas"
        value="12"
        message="Você é incrível!"
        icon={<FiTarget style={{ width: '1.75rem', height: '1.75rem', color: '#8200db' }} />}
        badge={{
          content: <FiStar style={{ width: '0.75rem', height: '0.75rem' }} />,
          color: 'pink',
        }}
        decorativeColor="purple"
        background={gradients.summaryAchievements}
        iconBg="purple"
        titleColor="#8200db"
        messageColor="#9810fa"
        messageOpacity={0.7}
        valueGradientCss="linear-gradient(to bottom right, #9810fa, #4f39f7)"
        showTitleDot={true}
      />
    </div>
  )
}
