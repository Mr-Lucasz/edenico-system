import { notFound } from 'next/navigation'
import { NovoUsuarioWizard } from '@src/components/admin/usuarios/NovoUsuarioWizard'

const VALID = new Set(['estudante', 'docente', 'responsavel', 'prestador', 'administrador'])

type PageProps = { params: Promise<{ tipo: string }> }

export default async function NovoUsuarioPage({ params }: PageProps) {
  const { tipo } = await params
  if (!VALID.has(tipo)) notFound()
  return <NovoUsuarioWizard tipoParam={tipo} />
}
