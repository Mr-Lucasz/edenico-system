'use client'

import { useEffect, useState, useMemo } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { CourseService } from '@src/domain/services/CourseService'
import { CourseRepository } from '@src/infrastructure/repositories/CourseRepository'
import type { Course, CourseCategory } from '@src/types/course.types'
import { CursosPageHeader } from './CursosPageHeader'
import { StarsCategoryTabs } from './StarsCategoryTabs'
import { CursosStatsCards } from './CursosStatsCards'
import { CursosCatalogToolbar } from './CursosCatalogToolbar'
import { CursosCatalogGrid } from './CursosCatalogGrid'
import { startNavigationProgress } from '@src/lib/navigationProgress'
import { CATEGORY_QUERY_KEY, isCourseCategory } from './cursosConstants'
import { levelDisplayLabel, parseLevelSlug, type LevelSlug } from './levelSlug'
import styles from './CursosCatalogClient.module.scss'

interface CursosCatalogClientProps {
  levelSlug: LevelSlug
}

export function CursosCatalogClient({ levelSlug }: CursosCatalogClientProps) {
  const level = parseLevelSlug(levelSlug)
  const searchParams = useSearchParams()
  const router = useRouter()

  const [totalCount, setTotalCount] = useState(0)
  const [courses, setCourses] = useState<Course[]>([])
  const [loading, setLoading] = useState(true)

  const raw = searchParams.get(CATEGORY_QUERY_KEY)
  const category: CourseCategory = isCourseCategory(raw) ? raw : 'sciences'

  useEffect(() => {
    const loadTotal = async () => {
      const svc = new CourseService(new CourseRepository())
      const all = await svc.getAllCourses()
      setTotalCount(all.length)
    }
    loadTotal()
  }, [])

  useEffect(() => {
    if (!level) return
    let cancelled = false
    const load = async () => {
      setLoading(true)
      const svc = new CourseService(new CourseRepository())
      const list = await svc.getCoursesByCategoryAndLevel(category, level)
      if (!cancelled) {
        setCourses(list)
        setLoading(false)
      }
    }
    load()
    return () => {
      cancelled = true
    }
  }, [category, level])

  const stats = useMemo(() => {
    const available = courses.length
    const exploring = courses.filter((c) => c.progress > 0 && c.progress < 100).length
    const completed = courses.filter((c) => c.progress === 100).length
    return { available, exploring, completed }
  }, [courses])

  const setCategory = (id: CourseCategory) => {
    startNavigationProgress()
    router.push(`/cursos/nivel/${levelSlug}?${CATEGORY_QUERY_KEY}=${id}`)
  }

  if (!level) {
    return null
  }

  const levelLabel = levelDisplayLabel(level)

  return (
    <div className={styles.root}>
      <CursosPageHeader courseCount={totalCount} />
      <StarsCategoryTabs active={category} onChange={setCategory} />
      <CursosStatsCards
        available={stats.available}
        exploring={stats.exploring}
        completed={stats.completed}
      />
      <CursosCatalogToolbar levelLabel={levelLabel} category={category} />
      {loading ? (
        <p className={styles.loading} role="status">
          Carregando cursos…
        </p>
      ) : (
        <CursosCatalogGrid courses={courses} />
      )}
    </div>
  )
}
