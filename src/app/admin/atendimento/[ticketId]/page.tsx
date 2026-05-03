'use client'

import { useParams } from 'next/navigation'
import { AtendimentoTicketDetailView } from '@src/components/admin/atendimento/AtendimentoTicketDetailView'

export default function Page() {
  const params = useParams()
  const ticketId = typeof params.ticketId === 'string' ? params.ticketId : ''
  return <AtendimentoTicketDetailView ticketId={ticketId} />
}
