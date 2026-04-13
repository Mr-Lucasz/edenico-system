import { Suspense } from 'react'
import { notFound } from 'next/navigation'
import { CursosPageLayout } from '@src/components/cursos/CursosPageLayout'
import { CoursePlayerClient } from '@src/components/course-player/CoursePlayerClient'
import { getCoursePlayerMeta } from '@src/infrastructure/data/mockCourseContent'

interface PageProps {
  params: Promise<{ id: string }>
}

export default async function CursoDetailPage({ params }: PageProps) {
  const { id } = await params
  const meta = getCoursePlayerMeta(id)
  if (!meta) notFound()

  return (
    <CursosPageLayout>
      <Suspense fallback={<p style={{ padding: '2rem', textAlign: 'center' }}>Carregando…</p>}>
        <CoursePlayerClient meta={meta} />
      </Suspense>
    </CursosPageLayout>
  )
}
