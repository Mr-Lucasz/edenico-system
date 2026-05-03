import { notFound } from 'next/navigation'
import { AdminCursosNivelDetalhe } from '@src/components/admin/cursos/AdminCursosNivelDetalhe'
import {
  getFaixaEtaria,
  getNivelDetalhe,
  isCategoriaId,
  isFaixaId,
  isNivelId,
  type CategoriaId,
  type NivelId,
} from '@src/infrastructure/data/mockAdminCursos'

type Props = {
  params: Promise<{ faixaId: string; categoriaId: string; nivelId: string }>
}

export default async function AdminCursosNivelPage({ params }: Props) {
  const { faixaId, categoriaId, nivelId } = await params
  if (!isFaixaId(faixaId) || !isCategoriaId(categoriaId) || !isNivelId(nivelId)) notFound()
  const faixa = getFaixaEtaria(faixaId)
  if (!faixa) notFound()
  const detalhe = getNivelDetalhe(faixaId, categoriaId as CategoriaId, nivelId as NivelId)
  if (!detalhe) notFound()

  return (
    <AdminCursosNivelDetalhe
      faixa={faixa}
      categoriaId={categoriaId as CategoriaId}
      nivelId={nivelId as NivelId}
      detalhe={detalhe}
    />
  )
}
