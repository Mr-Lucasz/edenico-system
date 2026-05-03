import { AdminCursosCriarView } from '@src/components/admin/cursos/AdminCursosCriarView'
import { isCategoriaId, isNivelId } from '@src/infrastructure/data/mockAdminCursos'

type Search = {
  returnTo?: string | string[]
  categoria?: string | string[]
  nivel?: string | string[]
}

function one(v: string | string[] | undefined): string | undefined {
  if (v === undefined) return undefined
  return Array.isArray(v) ? v[0] : v
}

export default async function AdminCursosCriarPage({ searchParams }: { searchParams: Promise<Search> }) {
  const sp = await searchParams
  const rawCat = one(sp.categoria)
  const rawNivel = one(sp.nivel)
  return (
    <AdminCursosCriarView
      returnTo={one(sp.returnTo)}
      initialCategoria={rawCat && isCategoriaId(rawCat) ? rawCat : undefined}
      initialNivel={rawNivel && isNivelId(rawNivel) ? rawNivel : undefined}
    />
  )
}
