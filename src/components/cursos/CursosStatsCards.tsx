import { FiBook, FiPlay, FiCheckCircle } from 'react-icons/fi'
import styles from './CursosStatsCards.module.scss'

interface CursosStatsCardsProps {
  available: number
  exploring: number
  completed: number
}

export function CursosStatsCards({ available, exploring, completed }: CursosStatsCardsProps) {
  return (
    <div className={styles.row}>
      <div className={styles.card}>
        <div className={`${styles.iconWrap} ${styles.iconOrange}`}>
          <FiBook className={styles.icon} aria-hidden />
        </div>
        <div className={styles.num}>{available}</div>
        <div className={styles.lbl}>Aventuras Disponíveis</div>
      </div>
      <div className={styles.card}>
        <div className={`${styles.iconWrap} ${styles.iconBlue}`}>
          <FiPlay className={styles.icon} aria-hidden />
        </div>
        <div className={styles.num}>{exploring}</div>
        <div className={styles.lbl}>Explorando Agora</div>
      </div>
      <div className={styles.card}>
        <div className={`${styles.iconWrap} ${styles.iconGreen}`}>
          <FiCheckCircle className={styles.icon} aria-hidden />
        </div>
        <div className={styles.num}>{completed}</div>
        <div className={styles.lbl}>Missões Concluídas</div>
      </div>
    </div>
  )
}
