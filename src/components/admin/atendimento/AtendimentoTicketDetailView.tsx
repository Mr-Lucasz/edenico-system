'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect, useMemo, useRef, useState } from 'react'
import {
  FiArrowLeft,
  FiCheckCircle,
  FiEdit3,
  FiMoreVertical,
  FiPaperclip,
  FiSend,
  FiTrash2,
  FiUser,
  FiXCircle,
} from 'react-icons/fi'
import {
  AGENTES_DISPONIVEIS,
  labelCategoria,
  labelPrioridade,
  labelStatus,
  type TicketCategory,
  type TicketPriority,
  type TicketStatus,
} from '@src/infrastructure/data/mockAtendimento'
import { useAtendimentoMock } from './AtendimentoMockContext'
import styles from './atendimento.module.scss'

const fmtLong = new Intl.DateTimeFormat('pt-BR', {
  day: 'numeric',
  month: 'long',
  year: 'numeric',
  hour: '2-digit',
  minute: '2-digit',
})

const fmtShort = new Intl.DateTimeFormat('pt-BR', {
  day: 'numeric',
  month: 'short',
  hour: '2-digit',
  minute: '2-digit',
})

function avatarClass(init: string): string {
  const map: Record<string, string> = {
    MS: styles.avatarMs,
    PC: styles.avatarPc,
    LO: styles.avatarLo,
    SL: styles.avatarSl,
    RA: styles.avatarRa,
    JS: styles.avatarPc,
  }
  return map[init] ?? styles.avatarDefault
}

function pillStatus(t: TicketStatus): string {
  const map: Record<TicketStatus, string> = {
    aberto: styles.pillAberto,
    em_andamento: styles.pillAndamento,
    aguardando: styles.pillAguardando,
    resolvido: styles.pillResolvido,
    fechado: styles.pillFechado,
    cancelado: styles.pillCancelado,
  }
  return map[t]
}

function pillPrior(p: TicketPriority): string {
  const map: Record<TicketPriority, string> = {
    baixa: styles.pillPriorBaixa,
    media: styles.pillPriorMedia,
    alta: styles.pillPriorAlta,
    urgente: styles.pillPriorUrgente,
  }
  return map[p]
}

type Props = { ticketId: string }

export function AtendimentoTicketDetailView({ ticketId }: Props) {
  const router = useRouter()
  const { tickets, updateTicket, addMensagem, removeTicket, setToast } = useAtendimentoMock()
  const ticket = useMemo(() => tickets.find((t) => t.id === ticketId), [tickets, ticketId])

  const [reply, setReply] = useState('')
  const [menuOpen, setMenuOpen] = useState(false)
  const [editOpen, setEditOpen] = useState(false)
  const [editTitulo, setEditTitulo] = useState('')
  const [tpl, setTpl] = useState('')
  const menuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!ticket) return
    setEditTitulo(ticket.titulo)
  }, [ticket])

  useEffect(() => {
    if (!menuOpen) return
    const onDoc = (e: MouseEvent) => {
      if (!menuRef.current?.contains(e.target as Node)) setMenuOpen(false)
    }
    document.addEventListener('mousedown', onDoc)
    return () => document.removeEventListener('mousedown', onDoc)
  }, [menuOpen])

  if (!ticket) {
    return (
      <div className={styles.page}>
        <p className={styles.pageSubtitle}>Ticket não encontrado.</p>
        <Link href="/admin/atendimento" className={styles.btnGhost}>
          Voltar à lista
        </Link>
      </div>
    )
  }

  /** Referência estável para callbacks (evita TS18048 em closures). */
  const tkt = ticket

  const primeiraUsuario = tkt.mensagens.find((m) => m.role === 'usuario')
  const historico = tkt.mensagens.filter((m) => m.id !== primeiraUsuario?.id)

  function enviarResposta() {
    addMensagem(tkt.id, reply)
    setReply('')
    setToast('Resposta enviada.')
  }

  function marcarResolvido() {
    updateTicket(tkt.id, { status: 'resolvido' })
    setToast('Status atualizado para Resolvido.')
  }

  function fecharTicket() {
    updateTicket(tkt.id, { status: 'fechado' })
    setToast('Ticket fechado.')
  }

  function salvarEdicao() {
    const t = editTitulo.trim()
    if (!t) {
      setToast('Título não pode ficar vazio.')
      return
    }
    updateTicket(tkt.id, { titulo: t })
    setEditOpen(false)
    setToast('Detalhes atualizados.')
  }

  function excluir() {
    if (!window.confirm('Excluir este ticket permanentemente (demo)?')) return
    removeTicket(tkt.id)
    setToast('Ticket excluído.')
    router.push('/admin/atendimento')
  }

  function elapsedLabel(): string {
    const a = new Date(tkt.criadoEmIso).getTime()
    const b = Date.now()
    let seg = Math.floor((b - a) / 1000)
    const d = Math.floor(seg / 86400)
    seg -= d * 86400
    const h = Math.floor(seg / 3600)
    return `${d}d ${h}h`
  }

  return (
    <div className={styles.page}>
      <div className={styles.backRow}>
        <Link href="/admin/atendimento" className={styles.btnGhost}>
          <FiArrowLeft aria-hidden />
          Voltar
        </Link>
        <span className={styles.ticketNum}>#{tkt.numero}</span>
      </div>

      <div className={styles.detailLayout}>
        <div>
          <div className={styles.detailHeader}>
            <div className={styles.detailTitleRow}>
              <div>
                <div className={styles.cardMeta}>
                  <span className={`${styles.pill} ${pillStatus(tkt.status)}`}>{labelStatus(tkt.status)}</span>
                  <span className={`${styles.pill} ${pillPrior(tkt.prioridade)}`}>
                    {labelPrioridade(tkt.prioridade)}
                  </span>
                  <span className={`${styles.pill} ${styles.pillCat}`}>{labelCategoria(tkt.categoria)}</span>
                </div>
                <h1 className={styles.detailTitle}>{tkt.titulo}</h1>
              </div>
              <div style={{ position: 'relative' }} ref={menuRef}>
                <button
                  type="button"
                  className={styles.menuBtn}
                  aria-label="Mais opções"
                  onClick={() => setMenuOpen((v) => !v)}
                >
                  <FiMoreVertical aria-hidden />
                </button>
                {menuOpen ? (
                  <div
                    style={{
                      position: 'absolute',
                      right: 0,
                      top: '100%',
                      marginTop: 4,
                      background: '#fff',
                      border: '1px solid #e5e7eb',
                      borderRadius: 8,
                      minWidth: 200,
                      boxShadow: '0 8px 24px rgb(0 0 0 / 0.1)',
                      zIndex: 50,
                    }}
                  >
                    <button
                      type="button"
                      className={styles.actionLink}
                      style={{ padding: '10px 12px' }}
                      onClick={() => {
                        setMenuOpen(false)
                        marcarResolvido()
                      }}
                    >
                      <FiCheckCircle aria-hidden />
                      Marcar resolvido
                    </button>
                    <button
                      type="button"
                      className={styles.actionLink}
                      style={{ padding: '10px 12px' }}
                      onClick={() => {
                        setMenuOpen(false)
                        fecharTicket()
                      }}
                    >
                      <FiXCircle aria-hidden />
                      Fechar ticket
                    </button>
                    <button
                      type="button"
                      className={styles.actionLink}
                      style={{ padding: '10px 12px' }}
                      onClick={() => {
                        setMenuOpen(false)
                        setEditOpen(true)
                      }}
                    >
                      <FiEdit3 aria-hidden />
                      Editar título
                    </button>
                  </div>
                ) : null}
              </div>
            </div>
          </div>

          <div className={styles.threadCard}>
            <div className={styles.threadOrigHeader}>
              <div className={`${styles.avatar} ${avatarClass(tkt.usuario.initials)}`} aria-hidden>
                {tkt.usuario.initials}
              </div>
              <div>
                <div className={styles.threadName}>{tkt.usuario.nome}</div>
                <div className={styles.threadDate}>
                  {fmtLong.format(new Date(tkt.criadoEmIso))}
                </div>
              </div>
            </div>
            <p className={styles.threadBody}>{primeiraUsuario?.body ?? tkt.descricao}</p>
          </div>

          <h2 className={styles.sectionTitle}>
            Histórico de mensagens ({tkt.mensagens.length} no total)
          </h2>
          <div className={styles.msgList}>
            {historico.map((m) => {
              if (m.role === 'sistema') {
                return (
                  <div key={m.id} className={styles.msgSistema}>
                    {m.body}
                  </div>
                )
              }
              const isAgente = m.role === 'agente'
              return (
                <div
                  key={m.id}
                  className={`${styles.msgBubble} ${isAgente ? styles.msgAgente : styles.msgUsuario}`}
                >
                  <div className={styles.msgHead}>
                    <span>{m.authorName}</span>
                    <span>{fmtShort.format(new Date(m.atIso))}</span>
                  </div>
                  <div className={styles.threadBody}>{m.body}</div>
                </div>
              )
            })}
          </div>

          <div className={styles.replyCard}>
            <label htmlFor="reply-box" className={styles.label}>
              Responder ticket
            </label>
            <textarea
              id="reply-box"
              className={styles.textarea}
              placeholder="Digite sua resposta..."
              value={reply}
              onChange={(e) => setReply(e.target.value)}
            />
            <div className={styles.replyToolbar}>
              <button type="button" className={styles.btnGhost} onClick={() => setToast('Anexo simulado (demo).')}>
                <FiPaperclip aria-hidden />
                Anexar arquivo
              </button>
              <select
                className={styles.select}
                value={tpl}
                onChange={(e) => {
                  const v = e.target.value
                  setTpl(v)
                  if (v) {
                    setReply((prev) => (prev ? `${prev}\n\n${v}` : v))
                    setToast('Modelo aplicado ao campo de resposta.')
                  }
                }}
                aria-label="Modelo de resposta"
              >
                <option value="">Modelo de resposta</option>
                <option value="Olá! Obrigado pelo contato. Estamos analisando seu caso e retornamos em breve.">
                  Aguardando análise
                </option>
                <option value="Olá! Conseguimos reproduzir o problema. Segue orientação passo a passo: ...">
                  Orientação técnica
                </option>
              </select>
              <button
                type="button"
                className={styles.btnPrimary}
                style={{ marginLeft: 'auto' }}
                onClick={enviarResposta}
                disabled={!reply.trim()}
              >
                <FiSend aria-hidden />
                Enviar resposta
              </button>
            </div>
          </div>
        </div>

        <aside>
          <div className={styles.sideCard}>
            <h3 className={styles.sideTitle}>Informações do ticket</h3>
            <div className={styles.field}>
              <span className={styles.fieldLabel}>Status</span>
              <select
                className={styles.select}
                style={{ width: '100%' }}
                value={tkt.status}
                onChange={(e) => {
                  updateTicket(tkt.id, { status: e.target.value as TicketStatus })
                  setToast('Status atualizado.')
                }}
              >
                <option value="aberto">Aberto</option>
                <option value="em_andamento">Em Andamento</option>
                <option value="aguardando">Aguardando</option>
                <option value="resolvido">Resolvido</option>
                <option value="fechado">Fechado</option>
                <option value="cancelado">Cancelado</option>
              </select>
            </div>
            <div className={styles.field}>
              <span className={styles.fieldLabel}>Prioridade</span>
              <select
                className={styles.select}
                style={{ width: '100%' }}
                value={tkt.prioridade}
                onChange={(e) => {
                  updateTicket(tkt.id, { prioridade: e.target.value as TicketPriority })
                  setToast('Prioridade atualizada.')
                }}
              >
                <option value="baixa">Baixa</option>
                <option value="media">Média</option>
                <option value="alta">Alta</option>
                <option value="urgente">Urgente</option>
              </select>
            </div>
            <div className={styles.field}>
              <span className={styles.fieldLabel}>Categoria</span>
              <select
                className={styles.select}
                style={{ width: '100%' }}
                value={tkt.categoria}
                onChange={(e) => {
                  updateTicket(tkt.id, { categoria: e.target.value as TicketCategory })
                  setToast('Categoria atualizada.')
                }}
              >
                <option value="tecnico">Técnico</option>
                <option value="financeiro">Financeiro</option>
                <option value="academico">Acadêmico</option>
                <option value="geral">Geral</option>
              </select>
            </div>
            <div className={styles.field}>
              <span className={styles.fieldLabel}>Atribuído a</span>
              <select
                className={styles.select}
                style={{ width: '100%' }}
                value={tkt.atribuidoA?.nome ?? ''}
                onChange={(e) => {
                  const nome = e.target.value
                  const ag = AGENTES_DISPONIVEIS.find((a) => a.nome === nome) ?? null
                  updateTicket(tkt.id, { atribuidoA: nome && ag ? ag : null })
                  setToast(ag ? `Atribuído a ${ag.nome}.` : 'Atribuição removida.')
                }}
              >
                <option value="">— Não atribuído —</option>
                {AGENTES_DISPONIVEIS.map((a) => (
                  <option key={a.nome} value={a.nome}>
                    {a.nome}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className={styles.sideCard}>
            <h3 className={styles.sideTitle}>Estatísticas</h3>
            <p className={styles.sideStat}>Tempo decorrido: {elapsedLabel()}</p>
            <p className={styles.sideStat}>Mensagens: {tkt.mensagens.length}</p>
            <p className={styles.sideStat}>Criado em: {fmtShort.format(new Date(tkt.criadoEmIso))}</p>
            <p className={styles.sideStat}>Última atualização: {fmtShort.format(new Date(tkt.atualizadoEmIso))}</p>
          </div>

          <div className={styles.sideCard}>
            <h3 className={styles.sideTitle}>Usuário</h3>
            <p className={styles.sideStat}>
              <strong>{tkt.usuario.nome}</strong> — {tkt.usuario.tipo}
            </p>
            <p className={styles.sideStat}>{tkt.usuario.email}</p>
            {tkt.usuario.telefone ? (
              <p className={styles.sideStat}>{tkt.usuario.telefone}</p>
            ) : null}
            <button type="button" className={`${styles.btnGhost} ${styles.profileBtn}`} onClick={() => setToast('Perfil completo (demo).')}>
              <FiUser aria-hidden />
              Ver perfil completo
            </button>
          </div>

          <div className={styles.sideCard}>
            <h3 className={styles.sideTitle}>Ações</h3>
            <button type="button" className={styles.actionLink} onClick={marcarResolvido}>
              <FiCheckCircle aria-hidden />
              Marcar como resolvido
            </button>
            <div className={styles.divider} />
            <button type="button" className={styles.actionLink} onClick={fecharTicket}>
              <FiXCircle aria-hidden />
              Fechar ticket
            </button>
            <div className={styles.divider} />
            <button type="button" className={styles.actionLink} onClick={() => setEditOpen(true)}>
              <FiEdit3 aria-hidden />
              Editar detalhes
            </button>
            <div className={styles.divider} />
            <button type="button" className={`${styles.actionLink} ${styles.actionDanger}`} onClick={excluir}>
              <FiTrash2 aria-hidden />
              Excluir ticket
            </button>
          </div>
        </aside>
      </div>

      {editOpen ? (
        <div
          className={styles.modalOverlay}
          role="dialog"
          aria-modal="true"
          aria-labelledby="edit-title"
          onClick={(e) => {
            if (e.target === e.currentTarget) setEditOpen(false)
          }}
        >
          <div className={styles.modal}>
            <h2 id="edit-title">Editar título</h2>
            <label htmlFor="edit-titulo" className={styles.label}>
              Título do ticket
            </label>
            <input
              id="edit-titulo"
              className={styles.input}
              value={editTitulo}
              onChange={(e) => setEditTitulo(e.target.value)}
            />
            <div className={styles.modalActions}>
              <button type="button" className={styles.btnGhost} onClick={() => setEditOpen(false)}>
                Cancelar
              </button>
              <button type="button" className={styles.btnPrimary} onClick={salvarEdicao}>
                Salvar
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  )
}
