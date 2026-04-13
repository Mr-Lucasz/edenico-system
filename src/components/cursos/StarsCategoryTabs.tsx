'use client'

import type { CourseCategory } from '@src/types/course.types'
import { getActiveColorForCourseCategory } from '@src/constants/starsCategoryColors'
import { cn } from '@src/utils/cn'
import { STARS_TABS } from './cursosConstants'
import styles from './StarsCategoryTabs.module.scss'

interface StarsCategoryTabsProps {
  active: CourseCategory
  onChange: (id: CourseCategory) => void
}

export function StarsCategoryTabs({ active, onChange }: StarsCategoryTabsProps) {
  return (
    <div className={styles.wrap} role="tablist" aria-label="Categorias STARS">
      {STARS_TABS.map((tab) => {
        const isActive = active === tab.id
        const activeBg = getActiveColorForCourseCategory(tab.id)
        return (
          <button
            key={tab.id}
            type="button"
            role="tab"
            aria-selected={isActive}
            className={cn(styles.tab, isActive && styles.tabActive)}
            style={
              isActive
                ? { backgroundColor: activeBg, color: '#fff' }
                : undefined
            }
            onClick={() => onChange(tab.id)}
          >
            <span className={styles.letter}>{tab.letter}</span>
            <span className={styles.label}>{tab.label}</span>
          </button>
        )
      })}
    </div>
  )
}
