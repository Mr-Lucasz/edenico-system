import { notFound } from 'next/navigation'
import { AdminCursosFaixaCategoria } from '@src/components/admin/cursos/AdminCursosFaixaCategoria'
import {
  getFaixaEtaria,
  isCategoriaId,
  isFaixaId,
  type CategoriaId,
} from '@src/infrastructure/data/mockAdminCursos'

type Props = {
  params: Promise<{ faixaId: string; categoriaId: string }>
}

export default async function AdminCursosFaixaCategoriaPage({ params }: Props) {
  const { faixaId, categoriaId } = await params
  if (!isFaixaId(faixaId) || !isCategoriaId(categoriaId)) notFound()
  const faixa = getFaixaEtaria(faixaId)
  if (!faixa) notFound()

  return <AdminCursosFaixaCategoria faixa={faixa} categoriaAtiva={categoriaId as CategoriaId} />
}
