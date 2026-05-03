'use client'

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import {
  AGENT_PADRAO_ATENDIMENTO,
  MOCK_TICKETS_SEED,
  type SupportTicket,
  type TicketAgent,
  type TicketCategory,
  type TicketMessage,
  type TicketPriority,
  type TicketStatus,
  type TicketUser,
} from '@src/infrastructure/data/mockAtendimento'

type NovoTicketInput = {
  titulo: string
  descricao: string
  prioridade: TicketPriority
  categoria: TicketCategory
  usuario: TicketUser
  atribuidoA: TicketAgent | null
}

type AtendimentoCtx = {
  tickets: SupportTicket[]
  agenteAtual: TicketAgent
  addTicket: (input: NovoTicketInput) => SupportTicket
  updateTicket: (id: string, patch: Partial<Pick<SupportTicket, 'status' | 'prioridade' | 'categoria' | 'atribuidoA' | 'titulo'>>) => void
  addMensagem: (ticketId: string, body: string) => void
  removeTicket: (id: string) => void
  toast: string | null
  setToast: (msg: string | null) => void
}

const Ctx = createContext<AtendimentoCtx | null>(null)

function nowIso() {
  return new Date().toISOString()
}

function nextNumero(tickets: SupportTicket[]): number {
  return tickets.reduce((m, t) => Math.max(m, t.numero), 0) + 1
}

export function AtendimentoMockProvider({ children }: { children: ReactNode }) {
  const [tickets, setTickets] = useState<SupportTicket[]>(() =>
    MOCK_TICKETS_SEED.map((t) => ({ ...t, mensagens: [...t.mensagens], tags: [...t.tags] })),
  )
  const [toast, setToast] = useState<string | null>(null)

  const addTicket = useCallback((input: NovoTicketInput): SupportTicket => {
    const iso = nowIso()
    let novo!: SupportTicket
    setTickets((prev) => {
      const numero = nextNumero(prev)
      const id = String(numero)
      novo = {
        id,
        numero,
        titulo: input.titulo.trim(),
        descricao: input.descricao.trim(),
        status: 'aberto',
        prioridade: input.prioridade,
        categoria: input.categoria,
        usuario: { ...input.usuario },
        atribuidoA: input.atribuidoA,
        criadoEmIso: iso,
        atualizadoEmIso: iso,
        mensagens: [
          {
            id: `m-${id}-u1`,
            role: 'usuario',
            authorName: input.usuario.nome,
            authorInitials: input.usuario.initials,
            body: input.descricao.trim(),
            atIso: iso,
          },
        ],
        tags: [],
      }
      return [novo, ...prev]
    })
    return novo
  }, [])

  const updateTicket = useCallback(
    (id: string, patch: Partial<Pick<SupportTicket, 'status' | 'prioridade' | 'categoria' | 'atribuidoA' | 'titulo'>>) => {
      setTickets((prev) =>
        prev.map((t) =>
          t.id === id
            ? {
                ...t,
                ...patch,
                atualizadoEmIso: nowIso(),
              }
            : t,
        ),
      )
    },
    [],
  )

  const addMensagem = useCallback((ticketId: string, body: string) => {
    const text = body.trim()
    if (!text) return
    const msg: TicketMessage = {
      id: `m-${ticketId}-${Date.now()}`,
      role: 'agente',
      authorName: AGENT_PADRAO_ATENDIMENTO.nome,
      authorInitials: AGENT_PADRAO_ATENDIMENTO.initials,
      body: text,
      atIso: nowIso(),
    }
    setTickets((prev) =>
      prev.map((t) =>
        t.id === ticketId
          ? {
              ...t,
              mensagens: [...t.mensagens, msg],
              atualizadoEmIso: msg.atIso,
            }
          : t,
      ),
    )
  }, [])

  const removeTicket = useCallback((id: string) => {
    setTickets((prev) => prev.filter((t) => t.id !== id))
  }, [])

  const value = useMemo<AtendimentoCtx>(
    () => ({
      tickets,
      agenteAtual: AGENT_PADRAO_ATENDIMENTO,
      addTicket,
      updateTicket,
      addMensagem,
      removeTicket,
      toast,
      setToast,
    }),
    [tickets, addTicket, updateTicket, addMensagem, removeTicket, toast],
  )

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>
}

export function useAtendimentoMock() {
  const v = useContext(Ctx)
  if (!v) throw new Error('useAtendimentoMock deve ser usado dentro de AtendimentoMockProvider')
  return v
}
