'use client'

import Link from 'next/link'
import { useMemo, useState } from 'react'
import {
  FiDownload,
  FiEye,
  FiMessageCircle,
  FiPlus,
} from 'react-icons/fi'
import {
  labelCategoria,
  labelPrioridade,
  labelStatus,
  snippetFrom,
  type SupportTicket,
  type TicketCategory,
  type TicketPriority,
  type TicketStatus,
} from '@src/infrastructure/data/mockAtendimento'
import { useAtendimentoMock } from './AtendimentoMockContext'
import styles from './atendimento.module.scss'

type TabKey = 'todos' | 'meus' | 'nao_atrib' | 'relatorios'

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

function computeStats(tickets: SupportTicket[]) {
  const total = tickets.length
  const abertos = tickets.filter((t) => t.status === 'aberto').length
  const andamento = tickets.filter((t) => t.status === 'em_andamento').length
  const aguardando = tickets.filter((t) => t.status === 'aguardando').length
  const resolvidos = tickets.filter((t) => t.status === 'resolvido').length
  const fechados = tickets.filter((t) => t.status === 'fechado').length
  const urgentes = tickets.filter((t) => t.prioridade === 'urgente').length
  return {
    total,
    abertos,
    andamento,
    aguardando,
    resolvidos,
    fechados,
    urgentes,
    tempoMedio: '2h 30min',
  }
}

function ticketsToCsv(rows: SupportTicket[]): string {
  const header = ['id', 'titulo', 'status', 'prioridade', 'categoria', 'usuario', 'atribuido', 'criado_em']
  const lines = rows.map((t) =>
    [
      t.numero,
      `"${t.titulo.replace(/"/g, '""')}"`,
      t.status,
      t.prioridade,
      t.categoria,
      `"${t.usuario.nome.replace(/"/g, '""')}"`,
      t.atribuidoA ? `"${t.atribuidoA.nome}"` : '',
      t.criadoEmIso,
    ].join(','),
  )
  return [header.join(','), ...lines].join('\n')
}

export function AtendimentoListView() {
  const { tickets, agenteAtual, setToast } = useAtendimentoMock()
  const [q, setQ] = useState('')
  const [filtroStatus, setFiltroStatus] = useState<string>('todos')
  const [filtroCat, setFiltroCat] = useState<string>('todos')
  const [filtroPrior, setFiltroPrior] = useState<string>('todos')
  const [tab, setTab] = useState<TabKey>('todos')

  const stats = useMemo(() => computeStats(tickets), [tickets])

  const filtrados = useMemo(() => {
    let list = [...tickets]
    const term = q.trim().toLowerCase()
    if (term) {
      list = list.filter(
        (t) =>
          String(t.numero).includes(term) ||
          t.titulo.toLowerCase().includes(term) ||
          t.usuario.nome.toLowerCase().includes(term) ||
          t.usuario.email.toLowerCase().includes(term),
      )
    }
    if (filtroStatus !== 'todos') {
      list = list.filter((t) => t.status === filtroStatus)
    }
    if (filtroCat !== 'todos') {
      list = list.filter((t) => t.categoria === filtroCat)
    }
    if (filtroPrior !== 'todos') {
      list = list.filter((t) => t.prioridade === filtroPrior)
    }
    if (tab === 'meus') {
      list = list.filter((t) => t.atribuidoA?.nome === agenteAtual.nome)
    }
    if (tab === 'nao_atrib') {
      list = list.filter((t) => !t.atribuidoA)
    }
    if (tab === 'relatorios') {
      return []
    }
    return list.sort((a, b) => new Date(b.atualizadoEmIso).getTime() - new Date(a.atualizadoEmIso).getTime())
  }, [tickets, q, filtroStatus, filtroCat, filtroPrior, tab, agenteAtual.nome])

  function exportar() {
    const base =
      tab === 'meus'
        ? tickets.filter((t) => t.atribuidoA?.nome === agenteAtual.nome)
        : tab === 'nao_atrib'
          ? tickets.filter((t) => !t.atribuidoA)
          : tickets
    const csv = ticketsToCsv(base)
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `atendimento-edenicos-${new Date().toISOString().slice(0, 10)}.csv`
    a.click()
    URL.revokeObjectURL(url)
    setToast('Exportação CSV concluída (demo).')
  }

  const tabCountTodos = tickets.length

  return (
    <div className={styles.page}>
      <header className={styles.pageHeader}>
        <div>
          <h1 className={styles.pageTitle}>Atendimento ao Cliente</h1>
          <p className={styles.pageSubtitle}>
            Gerencie tickets e solicitações de suporte dos usuários
          </p>
        </div>
        <Link href="/admin/atendimento/novo" className={styles.btnPrimary}>
          <FiPlus aria-hidden />
          Novo Ticket
        </Link>
      </header>

      <div className={styles.statsRow}>
        <div className={`${styles.statCard} ${styles.statThemeTotal}`}>
          <div className={styles.statValue}>{stats.total}</div>
          <div className={styles.statLabel}>Total</div>
        </div>
        <div className={`${styles.statCard} ${styles.statThemeAberto}`}>
          <div className={styles.statValue}>{stats.abertos}</div>
          <div className={styles.statLabel}>Abertos</div>
        </div>
        <div className={`${styles.statCard} ${styles.statThemeAndamento}`}>
          <div className={styles.statValue}>{stats.andamento}</div>
          <div className={styles.statLabel}>Em Andamento</div>
        </div>
        <div className={`${styles.statCard} ${styles.statThemeAguardando}`}>
          <div className={styles.statValue}>{stats.aguardando}</div>
          <div className={styles.statLabel}>Aguardando</div>
        </div>
        <div className={`${styles.statCard} ${styles.statThemeResolvido}`}>
          <div className={styles.statValue}>{stats.resolvidos}</div>
          <div className={styles.statLabel}>Resolvidos</div>
        </div>
        <div className={`${styles.statCard} ${styles.statThemeFechado}`}>
          <div className={styles.statValue}>{stats.fechados}</div>
          <div className={styles.statLabel}>Fechados</div>
        </div>
        <div className={`${styles.statCard} ${styles.statThemeUrgente}`}>
          <div className={styles.statValue}>{stats.urgentes}</div>
          <div className={styles.statLabel}>Urgentes</div>
        </div>
        <div className={`${styles.statCard} ${styles.statThemeTempo}`}>
          <div className={styles.statValue}>{stats.tempoMedio}</div>
          <div className={styles.statLabel}>Tempo médio</div>
        </div>
      </div>

      <div className={styles.filtersBar}>
        <input
          type="search"
          className={styles.searchInput}
          placeholder="Buscar por número, título ou usuário..."
          value={q}
          onChange={(e) => setQ(e.target.value)}
          aria-label="Buscar tickets"
        />
        <select
          className={styles.select}
          value={filtroStatus}
          onChange={(e) => setFiltroStatus(e.target.value)}
          aria-label="Filtrar por status"
        >
          <option value="todos">Todos status</option>
          <option value="aberto">Aberto</option>
          <option value="em_andamento">Em Andamento</option>
          <option value="aguardando">Aguardando</option>
          <option value="resolvido">Resolvido</option>
          <option value="fechado">Fechado</option>
          <option value="cancelado">Cancelado</option>
        </select>
        <select
          className={styles.select}
          value={filtroCat}
          onChange={(e) => setFiltroCat(e.target.value)}
          aria-label="Filtrar por categoria"
        >
          <option value="todos">Todas categorias</option>
          <option value="tecnico">Técnico</option>
          <option value="financeiro">Financeiro</option>
          <option value="academico">Acadêmico</option>
          <option value="geral">Geral</option>
        </select>
        <select
          className={styles.select}
          value={filtroPrior}
          onChange={(e) => setFiltroPrior(e.target.value)}
          aria-label="Filtrar por prioridade"
        >
          <option value="todos">Todas prioridades</option>
          <option value="baixa">Baixa</option>
          <option value="media">Média</option>
          <option value="alta">Alta</option>
          <option value="urgente">Urgente</option>
        </select>
        <button type="button" className={styles.btnIcon} aria-label="Exportar lista" onClick={exportar}>
          <FiDownload aria-hidden />
        </button>
      </div>

      <div className={styles.tabs} role="tablist">
        <button
          type="button"
          role="tab"
          aria-selected={tab === 'todos'}
          className={`${styles.tab} ${tab === 'todos' ? styles.tabActive : ''}`}
          onClick={() => setTab('todos')}
        >
          Todos ({tabCountTodos})
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={tab === 'meus'}
          className={`${styles.tab} ${tab === 'meus' ? styles.tabActive : ''}`}
          onClick={() => setTab('meus')}
        >
          Meus Tickets
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={tab === 'nao_atrib'}
          className={`${styles.tab} ${tab === 'nao_atrib' ? styles.tabActive : ''}`}
          onClick={() => setTab('nao_atrib')}
        >
          Não Atribuídos
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={tab === 'relatorios'}
          className={`${styles.tab} ${tab === 'relatorios' ? styles.tabActive : ''}`}
          onClick={() => setTab('relatorios')}
        >
          Relatórios
        </button>
      </div>

      {tab === 'relatorios' ? (
        <div className={styles.reportGrid}>
          <div className={styles.reportCard}>
            <h3>Volume por status</h3>
            <p>
              Abertos: {stats.abertos} · Em andamento: {stats.andamento} · Aguardando: {stats.aguardando} ·
              Resolvidos: {stats.resolvidos} · Fechados: {stats.fechados}
            </p>
            <button type="button" className={`${styles.btnPrimary} ${styles.profileBtn}`} onClick={exportar}>
              <FiDownload aria-hidden />
              Exportar CSV completo
            </button>
          </div>
          <div className={styles.reportCard}>
            <h3>SLA médio (demo)</h3>
            <p>
              Tempo médio de primeira resposta: <strong>{stats.tempoMedio}</strong>. Urgentes abertos no período:{' '}
              <strong>{stats.urgentes}</strong>.
            </p>
          </div>
          <div className={styles.reportCard}>
            <h3>Fila</h3>
            <p>
              Tickets sem agente:{' '}
              <strong>{tickets.filter((t) => !t.atribuidoA).length}</strong>. Atribuídos a você:{' '}
              <strong>{tickets.filter((t) => t.atribuidoA?.nome === agenteAtual.nome).length}</strong>.
            </p>
          </div>
        </div>
      ) : filtrados.length === 0 ? (
        <div className={styles.emptyState}>Nenhum ticket encontrado com os filtros atuais.</div>
      ) : (
        <ul className={styles.ticketList}>
          {filtrados.map((t) => (
            <li key={t.id} className={styles.ticketCard}>
              <div className={`${styles.avatar} ${avatarClass(t.usuario.initials)}`} aria-hidden>
                {t.usuario.initials}
              </div>
              <div className={styles.cardMain}>
                <div className={styles.cardMeta}>
                  <span className={styles.ticketNum}>#{t.numero}</span>
                  <span className={`${styles.pill} ${pillStatus(t.status)}`}>{labelStatus(t.status)}</span>
                  <span className={`${styles.pill} ${pillPrior(t.prioridade)}`}>
                    {labelPrioridade(t.prioridade)}
                  </span>
                  <span className={`${styles.pill} ${styles.pillCat}`}>{labelCategoria(t.categoria)}</span>
                </div>
                <h2 className={styles.cardTitle}>{t.titulo}</h2>
                <p className={styles.cardSnippet}>{snippetFrom(t.descricao, 120)}</p>
                <div className={styles.cardFooter}>
                  <span>
                    {t.usuario.nome} — {t.usuario.tipo}
                  </span>
                  <span>{t.atribuidoA ? `Atribuído a ${t.atribuidoA.nome}` : 'Sem agente atribuído'}</span>
                </div>
              </div>
              <div className={styles.cardActions}>
                <div className={styles.metaRow}>
                  <FiMessageCircle aria-hidden />
                  <span>{t.mensagens.length}</span>
                </div>
                <div className={styles.metaRow}>{fmtShort.format(new Date(t.criadoEmIso))}</div>
                <Link href={`/admin/atendimento/${t.id}`} className={styles.btnDetail}>
                  <FiEye aria-hidden />
                  Ver detalhes
                </Link>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
