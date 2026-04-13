'use client'

import { useCallback, useMemo, useState } from 'react'
import { FiChevronDown, FiLock, FiPlay } from 'react-icons/fi'
import type { CoursePlayerMeta, LessonItem } from '@src/types/courseContent.types'
import { cn } from '@src/utils/cn'
import styles from './CourseContentSidebar.module.scss'

function tagClass(type: LessonItem['type']): string {
  if (type === 'video') return styles.tagVideo
  if (type === 'material') return styles.tagMaterial
  return styles.tagQuiz
}

function tagLabel(type: LessonItem['type']): string {
  if (type === 'video') return 'Vídeo'
  if (type === 'material') return 'Material'
  return 'Quiz'
}

interface CourseContentSidebarProps {
  meta: CoursePlayerMeta
  selectedItemId: string | null
  onSelectItem: (item: LessonItem) => void
}

export function CourseContentSidebar({ meta, selectedItemId, onSelectItem }: CourseContentSidebarProps) {
  const initialOpen = useMemo(() => {
    const m: Record<string, boolean> = {}
    for (const u of meta.units) {
      m[u.id] = u.defaultExpanded
    }
    if (meta.finalQuizUnit) m[`final-${meta.finalQuizUnit.id}`] = true
    return m
  }, [meta.units, meta.finalQuizUnit])

  const [open, setOpen] = useState<Record<string, boolean>>(initialOpen)

  const toggle = useCallback((id: string) => {
    setOpen((prev) => ({ ...prev, [id]: !prev[id] }))
  }, [])

  const renderItem = (item: LessonItem, unitLocked: boolean) => {
    const disabled = unitLocked || item.locked
    const active = !disabled && selectedItemId === item.id
    const dur = `${item.durationMin} min`

    return (
      <li key={item.id}>
        <button
          type="button"
          className={cn(styles.itemBtn, active && styles.itemActive)}
          disabled={disabled}
          onClick={() => onSelectItem(item)}
        >
          <span className={styles.iconCol} aria-hidden>
            {item.locked || unitLocked ? (
              <FiLock style={{ width: '0.95rem', height: '0.95rem' }} />
            ) : (
              <FiPlay style={{ width: '0.95rem', height: '0.95rem' }} />
            )}
          </span>
          <div className={styles.mid}>
            <div className={styles.row1}>
              <span className={styles.itemTitle}>{item.title}</span>
              <span className={cn(styles.tag, tagClass(item.type))}>{tagLabel(item.type)}</span>
            </div>
            <div className={styles.metaRow}>
              <span>{dur}</span>
              {item.status === 'completed' ? <span className={styles.done}>Concluído</span> : null}
            </div>
          </div>
          <span className={styles.rightCol} aria-hidden>
            <FiPlay style={{ width: '1rem', height: '1rem' }} />
          </span>
        </button>
      </li>
    )
  }

  return (
    <div className={styles.root}>
      <div className={styles.head}>
        <h2 className={styles.headTitle}>Conteúdo do Curso</h2>
        <p className={styles.headSub}>{meta.sidebarSubtitle}</p>
      </div>

      {meta.units.map((unit) => {
        const isOpen = open[unit.id] ?? false
        const pct = Math.min(100, Math.max(0, unit.progress))

        return (
          <div key={unit.id} className={cn(styles.unit, unit.locked && styles.unitLocked)}>
            <button type="button" className={styles.unitHead} onClick={() => toggle(unit.id)}>
              <span className={styles.unitHeadTitle}>{unit.title}</span>
              <FiChevronDown
                className={cn(styles.chevron, isOpen && styles.chevronOpen)}
                aria-hidden
                style={{ width: '1.1rem', height: '1.1rem' }}
              />
            </button>
            <div className={styles.unitBar} aria-hidden>
              <div className={styles.unitBarFill} style={{ width: `${pct}%` }} />
            </div>
            {isOpen ? (
              <ul className={styles.list}>{unit.items.map((it) => renderItem(it, unit.locked))}</ul>
            ) : null}
          </div>
        )
      })}

      {meta.finalQuizUnit ? (
        <div className={cn(styles.unit, styles.finalBlock)}>
          <button
            type="button"
            className={styles.unitHead}
            onClick={() => toggle(`final-${meta.finalQuizUnit!.id}`)}
          >
            <span className={styles.unitHeadTitle}>{meta.finalQuizUnit.title}</span>
            <FiChevronDown
              className={cn(
                styles.chevron,
                open[`final-${meta.finalQuizUnit.id}`] && styles.chevronOpen,
              )}
              aria-hidden
              style={{ width: '1.1rem', height: '1.1rem' }}
            />
          </button>
          <div className={styles.unitBar} aria-hidden>
            <div
              className={styles.unitBarFill}
              style={{ width: `${Math.min(100, Math.max(0, meta.finalQuizUnit.progress))}%` }}
            />
          </div>
          {open[`final-${meta.finalQuizUnit.id}`] ? (
            <ul className={styles.list}>
              {renderItem(meta.finalQuizUnit.item, meta.finalQuizUnit.locked)}
            </ul>
          ) : null}
        </div>
      ) : null}
    </div>
  )
}
