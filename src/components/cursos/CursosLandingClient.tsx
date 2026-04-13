'use client'

import { useEffect, useState } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { CourseService } from '@src/domain/services/CourseService'
import { CourseRepository } from '@src/infrastructure/repositories/CourseRepository'
import { startNavigationProgress } from '@src/lib/navigationProgress'
import type { CourseCategory } from '@src/types/course.types'
import { CursosPageHeader } from './CursosPageHeader'
import { StarsCategoryTabs } from './StarsCategoryTabs'
import { LevelCardsSection } from './LevelCardsSection'
import { CATEGORY_QUERY_KEY, isCourseCategory } from './cursosConstants'
import styles from './CursosLandingClient.module.scss'

export function CursosLandingClient() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [courseCount, setCourseCount] = useState(0)

  const raw = searchParams.get(CATEGORY_QUERY_KEY)
  const category: CourseCategory = isCourseCategory(raw) ? raw : 'sciences'

  useEffect(() => {
    const load = async () => {
      const svc = new CourseService(new CourseRepository())
      const all = await svc.getAllCourses()
      setCourseCount(all.length)
    }
    load()
  }, [])

  const setCategory = (id: CourseCategory) => {
    startNavigationProgress()
    router.push(`/cursos?${CATEGORY_QUERY_KEY}=${id}`)
  }

  return (
    <div className={styles.root}>
      <CursosPageHeader courseCount={courseCount} />
      <StarsCategoryTabs active={category} onChange={setCategory} />
      <LevelCardsSection category={category} />
    </div>
  )
}
