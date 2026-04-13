import { Suspense } from 'react'
import { CursosPageLayout } from '@src/components/cursos/CursosPageLayout'
import { CursosLandingClient } from '@src/components/cursos/CursosLandingClient'

export default function CursosPage() {
  return (
    <CursosPageLayout>
      <Suspense fallback={<p style={{ padding: '2rem', textAlign: 'center' }}>Carregando…</p>}>
        <CursosLandingClient />
      </Suspense>
    </CursosPageLayout>
  )
}
