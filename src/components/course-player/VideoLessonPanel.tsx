'use client'

import { FiChevronDown, FiEdit3, FiMessageCircle, FiMessageSquare, FiPlay } from 'react-icons/fi'
import type { VideoLessonDetail } from '@src/types/courseContent.types'
import { cn } from '@src/utils/cn'
import styles from './VideoLessonPanel.module.scss'

export type LessonPanelTab = 'aula' | 'discussoes'

interface VideoLessonPanelProps {
  detail: VideoLessonDetail
  activeTab: LessonPanelTab
  onTabChange: (tab: LessonPanelTab) => void
}

export function VideoLessonPanel({ detail, activeTab, onTabChange }: VideoLessonPanelProps) {
  const { filledStars } = detail

  return (
    <div>
      <div className={styles.top}>
        <h2 className={styles.lessonTitle}>{detail.headline}</h2>
        <p className={styles.sub}>{detail.subtitle}</p>
      </div>

      <div className={styles.player}>
        <button type="button" className={styles.playBtn} aria-label="Reproduzir vídeo">
          <FiPlay style={{ width: '2.25rem', height: '2.25rem' }} />
        </button>
      </div>

      <div className={styles.footerRow}>
        <p className={styles.desc}>{detail.description}</p>
        <div className={styles.ratingBlock}>
          <span className={styles.ratingLine}>
            {detail.ratingValue.toFixed(1)} ({detail.ratingCount.toLocaleString('pt-BR')} avaliações)
          </span>
          <div className={styles.stars} aria-hidden>
            {Array.from({ length: 5 }).map((_, i) => (
              <span key={i} className={i < filledStars ? styles.starOn : styles.starOff}>
                ★
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className={styles.actions}>
        <button type="button" className={styles.tabBtn} onClick={() => onTabChange('aula')}>
          <FiEdit3 style={{ width: '1rem', height: '1rem' }} />
          Bloco de Notas
          <FiChevronDown className={styles.chev} style={{ width: '0.9rem', height: '0.9rem' }} />
        </button>
        <button type="button" className={styles.tabBtn} onClick={() => onTabChange('aula')}>
          <FiMessageCircle style={{ width: '1rem', height: '1rem' }} />
          Chat com Docente
          <FiChevronDown className={styles.chev} style={{ width: '0.9rem', height: '0.9rem' }} />
        </button>
        <button
          type="button"
          className={cn(styles.tabBtn, activeTab === 'discussoes' && styles.tabBtnActive)}
          onClick={() => onTabChange('discussoes')}
        >
          {activeTab === 'discussoes' ? <span className={styles.tabCaret} aria-hidden /> : null}
          <FiMessageSquare style={{ width: '1rem', height: '1rem' }} />
          Discussões
          <FiChevronDown className={styles.chev} style={{ width: '0.9rem', height: '0.9rem' }} />
        </button>
      </div>
    </div>
  )
}
