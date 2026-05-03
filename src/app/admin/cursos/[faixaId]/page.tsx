import { redirect, notFound } from 'next/navigation'
import { getDefaultCategoriaId, isFaixaId } from '@src/infrastructure/data/mockAdminCursos'

type Props = {
  params: Promise<{ faixaId: string }>
}

export default async function AdminCursosFaixaRedirectPage({ params }: Props) {
  const { faixaId } = await params
  if (!isFaixaId(faixaId)) notFound()
  redirect(`/admin/cursos/${faixaId}/${getDefaultCategoriaId(faixaId)}`)
}
