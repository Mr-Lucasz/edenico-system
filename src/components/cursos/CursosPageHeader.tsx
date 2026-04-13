import { FiBook } from 'react-icons/fi'
import styles from './CursosPageHeader.module.scss'

interface CursosPageHeaderProps {
  courseCount: number
}

export function CursosPageHeader({ courseCount }: CursosPageHeaderProps) {
  return (
    <header className={styles.header}>
      <p className={styles.tagline}>
        Escolha sua aventura de aprendizado e torne-se um pequeno gênio!
      </p>
      <div className={styles.count}>
        <FiBook className={styles.bookIcon} aria-hidden />
        <span>
          {courseCount} cursos disponíveis
        </span>
      </div>
    </header>
  )
}
