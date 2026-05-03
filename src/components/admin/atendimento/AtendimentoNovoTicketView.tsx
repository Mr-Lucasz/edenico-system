'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useMemo, useState } from 'react'
import { FiArrowLeft, FiClipboard, FiPaperclip, FiTarget, FiUser } from 'react-icons/fi'
import {
  AGENTES_DISPONIVEIS,
  labelCategoria,
  labelPrioridade,
  snippetFrom,
  type TicketAgent,
  type TicketCategory,
  type TicketPriority,
} from '@src/infrastructure/data/mockAtendimento'
import { useAtendimentoMock } from './AtendimentoMockContext'
import styles from './atendimento.module.scss'

const MOCK_USUARIOS_BUSCA = [
  { nome: 'Maria Santos', email: 'maria.santos@email.com', tipo: 'Estudante' },
  { nome: 'Pedro Costa', email: 'pedro.costa@email.com', tipo: 'Estudante' },
  { nome: 'Lucas Oliveira', email: 'lucas.oliveira@email.com', tipo: 'Estudante' },
]

function initialsFrom(nome: string): string {
  const parts = nome.trim().split(/\s+/).filter(Boolean)
  if (parts.length === 0) return '?'
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase()
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
}

const PRIORITIES: { key: TicketPriority; title: string; hint: string }[] = [
  { key: 'baixa', title: 'Baixa', hint: 'Pode aguardar' },
  { key: 'media', title: 'Média', hint: 'Resolver em breve' },
  { key: 'alta', title: 'Alta', hint: 'Precisa atenção' },
  { key: 'urgente', title: 'Urgente', hint: 'Resolver agora' },
]

function pillPriorClass(p: TicketPriority): string {
  const map: Record<TicketPriority, string> = {
    baixa: styles.pillPriorBaixa,
    media: styles.pillPriorMedia,
    alta: styles.pillPriorAlta,
    urgente: styles.pillPriorUrgente,
  }
  return map[p]
}

export function AtendimentoNovoTicketView() {
  const router = useRouter()
  const { addTicket, setToast } = useAtendimentoMock()

  const [titulo, setTitulo] = useState('')
  const [descricao, setDescricao] = useState('')
  const [prioridade, setPrioridade] = useState<TicketPriority>('media')
  const [categoria, setCategoria] = useState<TicketCategory>('geral')
  const [nome, setNome] = useState('')
  const [email, setEmail] = useState('')
  const [tipoUsuario, setTipoUsuario] = useState('Estudante')
  const [agente, setAgente] = useState<string>('')
  const [busca, setBusca] = useState('')
  const [touched, setTouched] = useState(false)

  const erros = useMemo(() => {
    const e: Record<string, boolean> = {}
    if (touched || titulo.trim()) e.titulo = !titulo.trim()
    if (touched || descricao.trim()) e.descricao = !descricao.trim()
    if (touched || nome.trim()) e.nome = !nome.trim()
    if (touched || email.trim()) {
      const ok = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())
      e.email = !email.trim() || !ok
    }
    return e
  }, [titulo, descricao, nome, email, touched])

  const valido =
    titulo.trim().length > 0 &&
    descricao.trim().length > 0 &&
    nome.trim().length > 0 &&
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())

  function buscarUsuario() {
    const q = busca.trim().toLowerCase()
    if (!q) {
      setToast('Digite nome ou e-mail para buscar.')
      return
    }
    const hit = MOCK_USUARIOS_BUSCA.find(
      (u) => u.nome.toLowerCase().includes(q) || u.email.toLowerCase().includes(q),
    )
    if (!hit) {
      setToast('Nenhum usuário encontrado (demo). Preencha manualmente.')
      return
    }
    setNome(hit.nome)
    setEmail(hit.email)
    setTipoUsuario(hit.tipo)
    setToast(`Usuário vinculado: ${hit.nome}`)
  }

  function criar() {
    setTouched(true)
    if (!valido) {
      setToast('Preencha os campos obrigatórios.')
      return
    }
    const ag: TicketAgent | null = agente ? AGENTES_DISPONIVEIS.find((a) => a.nome === agente) ?? null : null
    const novo = addTicket({
      titulo,
      descricao,
      prioridade,
      categoria,
      usuario: {
        nome: nome.trim(),
        email: email.trim(),
        tipo: tipoUsuario,
        initials: initialsFrom(nome),
      },
      atribuidoA: ag,
    })
    setToast('Ticket criado com sucesso.')
    router.push(`/admin/atendimento/${novo.id}`)
  }

  const previewSnippet = snippetFrom(descricao || 'Descrição aparecerá aqui…', 140)

  return (
    <div className={styles.page}>
      <div className={styles.backRow}>
        <Link href="/admin/atendimento" className={styles.btnGhost}>
          <FiArrowLeft aria-hidden />
          Voltar
        </Link>
      </div>

      <header className={styles.pageHeader}>
        <div>
          <h1 className={styles.pageTitle}>Criar novo ticket</h1>
          <p className={styles.pageSubtitle}>Registre uma nova solicitação de suporte</p>
        </div>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          <Link href="/admin/atendimento" className={styles.btnGhost}>
            Cancelar
          </Link>
          <button type="button" className={styles.btnPrimary} disabled={!valido} onClick={criar}>
            Criar ticket
          </button>
        </div>
      </header>

      <div className={styles.banner}>
        Preencha os campos obrigatórios. Título, descrição e dados do usuário são obrigatórios.
      </div>

      <div className={styles.twoCol}>
        <div>
          <section className={styles.formCard}>
            <h2 className={styles.formCardTitle}>
              <FiClipboard aria-hidden />
              Informações do ticket
            </h2>
            <div className={styles.field}>
              <label htmlFor="nt-titulo" className={styles.label}>
                Título do ticket *
              </label>
              <input
                id="nt-titulo"
                className={`${styles.input} ${erros.titulo ? styles.inputError : ''}`}
                placeholder="Ex: Não consigo acessar o curso de Robótica"
                value={titulo}
                onChange={(e) => setTitulo(e.target.value)}
                onBlur={() => setTouched(true)}
              />
              {erros.titulo ? <p className={styles.errorText}>Campo obrigatório</p> : null}
            </div>
            <div className={styles.field}>
              <label htmlFor="nt-desc" className={styles.label}>
                Descrição detalhada *
              </label>
              <textarea
                id="nt-desc"
                className={`${styles.textarea} ${erros.descricao ? styles.inputError : ''}`}
                placeholder="Descreva o problema ou solicitação em detalhes..."
                value={descricao}
                onChange={(e) => setDescricao(e.target.value)}
                onBlur={() => setTouched(true)}
              />
              {erros.descricao ? <p className={styles.errorText}>Campo obrigatório</p> : null}
              <p className={styles.charCount}>{descricao.length} caracteres</p>
            </div>
            <div className={styles.field}>
              <span className={styles.label}>Anexos (opcional)</span>
              <button
                type="button"
                className={styles.attachZone}
                onClick={() => setToast('Upload simulado — em produção use storage seguro (demo).')}
              >
                <div>
                  <FiPaperclip aria-hidden />
                  <div>Clique para adicionar arquivos</div>
                  <div>Imagens, PDFs ou documentos (máx. 10MB)</div>
                </div>
              </button>
            </div>
          </section>

          <section className={styles.formCard}>
            <h2 className={styles.formCardTitle}>
              <FiTarget aria-hidden />
              Classificação
            </h2>
            <span className={styles.label}>Prioridade *</span>
            <div className={styles.priorityGrid}>
              {PRIORITIES.map((p) => (
                <button
                  key={p.key}
                  type="button"
                  className={`${styles.priorityCard} ${prioridade === p.key ? styles.priorityCardActive : ''}`}
                  onClick={() => setPrioridade(p.key)}
                >
                  <div className={styles.priorityTitle}>{p.title}</div>
                  <div className={styles.priorityHint}>{p.hint}</div>
                </button>
              ))}
            </div>
            <div className={styles.field} style={{ marginTop: '1rem' }}>
              <label htmlFor="nt-cat" className={styles.label}>
                Categoria *
              </label>
              <select
                id="nt-cat"
                className={styles.select}
                style={{ width: '100%', height: '2.75rem' }}
                value={categoria}
                onChange={(e) => setCategoria(e.target.value as TicketCategory)}
              >
                <option value="geral">Geral</option>
                <option value="tecnico">Técnico</option>
                <option value="financeiro">Financeiro</option>
                <option value="academico">Acadêmico</option>
              </select>
            </div>
          </section>

          <section className={styles.formCard}>
            <h2 className={styles.formCardTitle}>
              <FiUser aria-hidden />
              Dados do usuário
            </h2>
            <div className={styles.field}>
              <span className={styles.label}>Buscar usuário existente</span>
              <div className={styles.searchUserRow}>
                <input
                  type="search"
                  className={styles.searchInput}
                  style={{ minWidth: 0 }}
                  placeholder="Digite nome ou e-mail para buscar..."
                  value={busca}
                  onChange={(e) => setBusca(e.target.value)}
                />
                <button type="button" className={styles.btnPrimary} onClick={buscarUsuario}>
                  Buscar
                </button>
              </div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              <div className={styles.field}>
                <label htmlFor="nt-nome" className={styles.label}>
                  Nome completo *
                </label>
                <input
                  id="nt-nome"
                  className={`${styles.input} ${erros.nome ? styles.inputError : ''}`}
                  placeholder="Ex: Maria Santos"
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                  onBlur={() => setTouched(true)}
                />
                {erros.nome ? <p className={styles.errorText}>Campo obrigatório</p> : null}
              </div>
              <div className={styles.field}>
                <label htmlFor="nt-email" className={styles.label}>
                  E-mail *
                </label>
                <input
                  id="nt-email"
                  type="email"
                  className={`${styles.input} ${erros.email ? styles.inputError : ''}`}
                  placeholder="maria@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onBlur={() => setTouched(true)}
                />
                {erros.email ? <p className={styles.errorText}>E-mail inválido ou vazio</p> : null}
              </div>
            </div>
            <div className={styles.field}>
              <label htmlFor="nt-tipo" className={styles.label}>
                Tipo de usuário
              </label>
              <select
                id="nt-tipo"
                className={styles.select}
                style={{ width: '100%', height: '2.75rem' }}
                value={tipoUsuario}
                onChange={(e) => setTipoUsuario(e.target.value)}
              >
                <option value="Estudante">Estudante</option>
                <option value="Responsável">Responsável</option>
                <option value="Instituição">Instituição</option>
              </select>
            </div>
          </section>
        </div>

        <aside>
          <div className={styles.sideCard}>
            <h3 className={styles.sideTitle}>Preview do ticket</h3>
            <div className={styles.previewCard}>
              <div className={styles.cardMeta}>
                <span className={`${styles.pill} ${styles.pillAberto}`}>Aberto</span>
                <span className={`${styles.pill} ${pillPriorClass(prioridade)}`}>{labelPrioridade(prioridade)}</span>
              </div>
              <p className={styles.previewTitle}>{titulo.trim() || 'Título do ticket'}</p>
              <p className={styles.previewSnippet}>{previewSnippet}</p>
              <div className={styles.previewMeta}>
                Categoria: {labelCategoria(categoria)}
                <br />
                Usuário: {nome.trim() || 'Não informado'}
                <br />
                Tipo: {tipoUsuario}
              </div>
            </div>
          </div>

          <div className={styles.sideCard}>
            <h3 className={styles.sideTitle}>Atribuir agente</h3>
            <label htmlFor="nt-agent" className={styles.fieldLabel}>
              Selecionar um agente
            </label>
            <select
              id="nt-agent"
              className={styles.select}
              style={{ width: '100%', marginTop: 6 }}
              value={agente}
              onChange={(e) => setAgente(e.target.value)}
            >
              <option value="">— Deixar na fila —</option>
              {AGENTES_DISPONIVEIS.map((a) => (
                <option key={a.nome} value={a.nome}>
                  {a.nome}
                </option>
              ))}
            </select>
            <p className={styles.previewMeta} style={{ marginTop: 10 }}>
              Se não atribuir, o ticket ficará disponível para qualquer agente.
            </p>
          </div>

          <div className={styles.tipsBox}>
            <strong>Dicas</strong>
            <ul>
              <li>Seja específico no título e na descrição</li>
              <li>Anexe evidências quando possível</li>
              <li>Escolha prioridade e categoria condizentes</li>
              <li>Vincule o usuário correto para respostas rápidas</li>
            </ul>
          </div>
        </aside>
      </div>
    </div>
  )
}
