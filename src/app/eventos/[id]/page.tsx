import Link from 'next/link'
import { AcademyStubShell } from '@src/components/layout/AcademyStubShell'
import styles from './eventoDetail.module.scss'

interface PageProps {
  params: Promise<{ id: string }>
  searchParams: Promise<{ demo?: string }>
}

export default async function EventoDetailPage({ params, searchParams }: PageProps) {
  const { id } = await params
  const { demo } = await searchParams
  const inscricaoDemo = demo === 'inscricao'

  return (
    <AcademyStubShell
      title="Evento"
      subtitle={`Página de teste (id: ${id}). Inscrição e detalhes virão aqui.`}
    >
      {inscricaoDemo ? (
        <p className={styles.hint} role="status">
          Inscrição registrada (fluxo de teste).
        </p>
      ) : null}
      <p className={styles.back}>
        <Link href="/dashboard">Voltar ao dashboard</Link>
      </p>
    </AcademyStubShell>
  )
}
