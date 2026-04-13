'use client'

import { useCallback, useMemo } from 'react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import type { CoursePlayerMeta, LessonItem, VideoLessonDetail } from '@src/types/courseContent.types'
import { CoursePlayerLayout } from './CoursePlayerLayout'
import { CoursePlayerHeader } from './CoursePlayerHeader'
import { CourseContentSidebar } from './CourseContentSidebar'
import { EmptySelectionPanel } from './EmptySelectionPanel'
import { DiscussionsPanel } from './DiscussionsPanel'
import { QuizResultsPanel } from './QuizResultsPanel'
import { VideoLessonPanel, type LessonPanelTab } from './VideoLessonPanel'
import layoutStyles from './coursePlayerLayout.module.scss'

function findLesson(
  meta: CoursePlayerMeta,
  itemId: string,
): { item: LessonItem; unitId: string } | null {
  for (const u of meta.units) {
    const it = u.items.find((i) => i.id === itemId)
    if (it) return { item: it, unitId: u.id }
  }
  if (meta.finalQuizUnit?.item.id === itemId) {
    return { item: meta.finalQuizUnit.item, unitId: meta.finalQuizUnit.id }
  }
  return null
}

function buildVideoDetail(meta: CoursePlayerMeta, item: LessonItem): VideoLessonDetail {
  const fromMock = meta.videoDetails[item.id]
  if (fromMock) return fromMock

  const kind = item.type === 'material' ? 'Material' : 'Vídeo'
  return {
    headline: item.title,
    subtitle: `${kind} • ${item.durationMin} min`,
    description: 'Descrição deste conteúdo será carregada aqui.',
    ratingValue: 4.5,
    ratingCount: 120,
    filledStars: 4,
  }
}

interface CoursePlayerClientProps {
  meta: CoursePlayerMeta
}

export function CoursePlayerClient({ meta }: CoursePlayerClientProps) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const itemId = searchParams.get('item')
  const painelRaw = searchParams.get('painel')
  const painel: LessonPanelTab = painelRaw === 'discussoes' ? 'discussoes' : 'aula'

  const setQuery = useCallback(
    (next: { item?: string | null; painel?: LessonPanelTab | null }) => {
      const p = new URLSearchParams(searchParams.toString())
      if (next.item !== undefined) {
        if (next.item === null || next.item === '') p.delete('item')
        else p.set('item', next.item)
      }
      if (next.painel !== undefined) {
        if (next.painel === null || next.painel === 'aula') p.delete('painel')
        else p.set('painel', next.painel)
      }
      const qs = p.toString()
      router.push(qs ? `${pathname}?${qs}` : pathname)
    },
    [pathname, router, searchParams],
  )

  const selection = useMemo(() => (itemId ? findLesson(meta, itemId) : null), [meta, itemId])

  const handleSelectItem = useCallback(
    (item: LessonItem) => {
      if (item.type === 'quiz') {
        setQuery({ item: item.id, painel: null })
      } else {
        setQuery({ item: item.id, painel: 'aula' })
      }
    },
    [setQuery],
  )

  const handleTabChange = useCallback(
    (tab: LessonPanelTab) => {
      if (!itemId) return
      setQuery({ item: itemId, painel: tab === 'aula' ? null : 'discussoes' })
    },
    [itemId, setQuery],
  )

  const handleBackFromQuiz = useCallback(() => {
    router.push(pathname)
  }, [pathname, router])

  const mainContent = (() => {
    if (!selection) {
      return <EmptySelectionPanel />
    }

    const { item } = selection

    if (item.type === 'quiz') {
      const result = meta.quizResults[item.id]
      if (!result) {
        return (
          <p style={{ textAlign: 'center', color: '#6b7280', padding: '2rem' }}>
            Resultado do quiz indisponível neste mock.
          </p>
        )
      }
      return <QuizResultsPanel result={result} onBackToCourse={handleBackFromQuiz} />
    }

    const detail = buildVideoDetail(meta, item)

    if (painel === 'discussoes') {
      return (
        <div className={layoutStyles.discussionStack}>
          <VideoLessonPanel detail={detail} activeTab={painel} onTabChange={handleTabChange} />
          <DiscussionsPanel posts={meta.discussions} />
        </div>
      )
    }

    return <VideoLessonPanel detail={detail} activeTab={painel} onTabChange={handleTabChange} />
  })()

  return (
    <CoursePlayerLayout
      header={
        <CoursePlayerHeader
          title={meta.headerTitle}
          instructor={meta.instructor}
          globalProgress={meta.globalProgress}
        />
      }
      main={mainContent}
      sidebar={
        <CourseContentSidebar
          meta={meta}
          selectedItemId={itemId}
          onSelectItem={(lessonItem) => handleSelectItem(lessonItem)}
        />
      }
    />
  )
}
