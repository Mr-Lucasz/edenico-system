import { notFound } from 'next/navigation'
import { Suspense } from 'react'
import { CursosPageLayout } from '@src/components/cursos/CursosPageLayout'
import { CursosCatalogClient } from '@src/components/cursos/CursosCatalogClient'
import { isLevelSlug, parseLevelSlug } from '@src/components/cursos/levelSlug'
import type { LevelSlug } from '@src/components/cursos/levelSlug'

interface PageProps {
  params: Promise<{ level: string }>
}

export default async function CursosNivelPage({ params }: PageProps) {
  const { level } = await params
  if (!isLevelSlug(level) || !parseLevelSlug(level)) {
    notFound()
  }

  return (
    <CursosPageLayout>
      <Suspense fallback={<p style={{ padding: '2rem', textAlign: 'center' }}>Carregando…</p>}>
        <CursosCatalogClient levelSlug={level as LevelSlug} />
      </Suspense>
    </CursosPageLayout>
  )
}
