'use client'

import { getPuzzlePieceMeta } from '@src/components/stars/starsPuzzlePaths'
import { starsCategories } from '@src/data/starsContent'
import { cn } from '@src/utils/cn'
import styles from './StarsPuzzleTabs.module.scss'

const TAB_LABELS = ['Science', 'Technology', 'Arts', 'Relations', 'Service']

export interface StarsPuzzleTabsProps {
  activeIndex: number
  onSelectLetter: (index: number) => void
  id?: string
  className?: string
  /** `planos`: peças inativas e foco harmonizam com fundo claro (#f8f9fa) e azul da página Planos */
  variant?: 'default' | 'planos'
}

function letterClassName(isActive: boolean, isPlanos: boolean) {
  if (isActive) return styles.letterActive
  return isPlanos ? styles.letterInactivePlanos : styles.letterInactive
}

export function StarsPuzzleTabs({
  activeIndex,
  onSelectLetter,
  id = 'stars-heading',
  className = '',
  variant = 'default',
}: Readonly<StarsPuzzleTabsProps>) {
  const isPlanos = variant === 'planos'
  const inactiveFill = isPlanos ? '#ffffff' : '#f9fafb'
  const inactiveStroke = isPlanos ? '#cbd5e1' : '#e5e7eb'

  return (
    <div
      role="tablist"
      aria-label="STARS"
      id={id}
      className={cn(styles.root, isPlanos && styles.rootPlanos, className)}
    >
      {starsCategories.map((tab, index) => {
        const isActive = index === activeIndex
        const colorHex = tab.colorHex ?? '#A66B46'
        const fillColor = isActive ? colorHex : inactiveFill
        const { path, viewBox } = getPuzzlePieceMeta(index)

        return (
          <button
            key={tab.id}
            type="button"
            role="tab"
            aria-selected={isActive}
            aria-label={`Pilar ${TAB_LABELS[index]}`}
            tabIndex={isActive ? 0 : -1}
            onClick={() => onSelectLetter(index)}
            onKeyDown={(e) => {
              const goPrev = e.key === 'ArrowLeft' || e.key === 'Home'
              const goNext = e.key === 'ArrowRight' || e.key === 'End'
              if (goPrev) {
                e.preventDefault()
                onSelectLetter(e.key === 'Home' ? 0 : Math.max(0, activeIndex - 1))
              } else if (goNext) {
                e.preventDefault()
                onSelectLetter(
                  e.key === 'End' ? starsCategories.length - 1 : Math.min(starsCategories.length - 1, activeIndex + 1)
                )
              }
            }}
            className={cn(styles.tab, isPlanos && styles.tabPlanos, index > 0 && styles.overlap)}
            style={{
              transform: isActive ? 'scale(1.05)' : undefined,
              zIndex: isActive ? 50 + index : 10 + index,
            }}
          >
            <svg viewBox={viewBox} className={styles.svg} aria-hidden>
              <path
                d={path}
                fill={fillColor}
                stroke={isActive ? colorHex : inactiveStroke}
                strokeWidth="1.5"
              />
            </svg>
            <span className={cn(styles.letter, letterClassName(isActive, isPlanos))}>
              {tab.letter}
            </span>
          </button>
        )
      })}
    </div>
  )
}
