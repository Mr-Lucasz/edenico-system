import { Suspense } from 'react'
import { AdminAvaliacoesUsuarioView } from '@src/components/admin/avaliacoes/AdminAvaliacoesUsuarioView'

export default function Page() {
  return (
    <Suspense fallback={null}>
      <AdminAvaliacoesUsuarioView />
    </Suspense>
  )
}
