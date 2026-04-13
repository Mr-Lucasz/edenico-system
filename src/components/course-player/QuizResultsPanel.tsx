'use client'

import { FiCheck, FiZap, FiX } from 'react-icons/fi'
import type { QuizResultDetail } from '@src/types/courseContent.types'
import styles from './QuizResultsPanel.module.scss'

interface QuizResultsPanelProps {
  result: QuizResultDetail
  onBackToCourse: () => void
  onRetry?: () => void
}

export function QuizResultsPanel({ result, onBackToCourse, onRetry }: QuizResultsPanelProps) {
  return (
    <div>
      <div className={styles.hero}>
        <div className={styles.iconCircle} aria-hidden>
          <FiCheck style={{ width: '1.75rem', height: '1.75rem' }} strokeWidth={2.5} />
        </div>
        <h2 className={styles.heroTitle}>Quiz Concluído!</h2>
        <p className={styles.heroSub}>{result.quizTitle}</p>
        <div className={styles.score}>{result.scorePercent}%</div>
        <span className={styles.badge}>
          {result.correctCount} de {result.totalCount} corretas
        </span>
      </div>

      <h3 className={styles.reviewTitle}>Revisão por questão</h3>

      {result.questions.map((q) => (
        <div key={q.id} className={styles.qBlock}>
          <div className={styles.qHead}>
            {q.correct ? (
              <FiCheck className={styles.okIcon} style={{ width: '1.1rem', height: '1.1rem' }} aria-hidden />
            ) : (
              <FiX className={styles.badIcon} style={{ width: '1.1rem', height: '1.1rem' }} aria-hidden />
            )}
            <span className={styles.qNum}>Questão {q.id}</span>
          </div>
          <p className={styles.line}>
            <span className={styles.userAns}>Sua resposta: </span>
            <span className={q.correct ? styles.userOk : styles.userBad}>{q.userAnswerLabel}</span>
          </p>
          {!q.correct && q.correctAnswerLabel ? (
            <p className={styles.line}>
              <span className={styles.userAns}>Resposta correta: </span>
              <span className={styles.correctLabel}>{q.correctAnswerLabel}</span>
            </p>
          ) : null}
          <div className={styles.explain}>
            <FiZap style={{ width: '1.1rem', height: '1.1rem', flexShrink: 0, color: '#ca8a04' }} aria-hidden />
            <span>{q.explanation}</span>
          </div>
        </div>
      ))}

      <div className={styles.footer}>
        {onRetry ? (
          <button type="button" className={styles.btnOutline} onClick={onRetry}>
            Refazer Quiz
          </button>
        ) : null}
        <button type="button" className={styles.btnPrimary} onClick={onBackToCourse}>
          Voltar ao Curso
        </button>
      </div>
    </div>
  )
}
