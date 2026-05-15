import { Suspense } from 'react'
import { AdminAvaliacoesDimensaoView } from '@src/components/admin/avaliacoes/AdminAvaliacoesDimensaoView'

export default function Page() {
  return (
    <Suspense fallback={null}>
      <AdminAvaliacoesDimensaoView />
    </Suspense>
  )
}
