'use client'

import Link from 'next/link'
import { useParams } from 'next/navigation'
import { useMemo, useState } from 'react'
import { FiArrowLeft, FiBell, FiBook, FiChevronDown, FiSearch, FiUser } from 'react-icons/fi'
import {
  DIMENSOES_META,
  type NotaFinalValor,
  type NotaOuPendente,
  type UsuarioDimensaoCard,
  getUsuariosDimensao,
} from './avaliacoesMock'
import styles from './AdminAvaliacoesDimensaoView.module.scss'

function fmtNota(n: NotaOuPendente) {
  if (n === 'pendente') {
    return <span className={styles.pendenteTxt}>Pendente</span>
  }
  return (
    <>
      <span className={styles.starSm} aria-hidden>
        ★
      </span>
      {n.toFixed(1).replace('.', ',')}
    </>
  )
}

function fmtFinal(n: NotaFinalValor) {
  if (n === 'nao') {
    return <span className={styles.naoTxt}>Não Avaliado</span>
  }
  return (
    <span className={styles.finalGreen}>
      <span className={styles.starSm} aria-hidden>
        ★
      </span>
      {n.toFixed(1).replace('.', ',')}
    </span>
  )
}

function StatusPill({ status }: { status: UsuarioDimensaoCard['status'] }) {
  if (status === 'avaliado') {
    return (
      <div className={styles.statusAvaliado}>
        <span className={styles.dot} style={{ background: '#059669' }} aria-hidden />
        Avaliado
      </div>
    )
  }
  if (status === 'parcial') {
    return (
      <div className={styles.statusParcial}>
        <span className={styles.dot} style={{ background: '#eab308' }} aria-hidden />
        Parcial
      </div>
    )
  }
  return (
    <div className={styles.statusNao}>
      <span className={styles.dot} style={{ background: '#9ca3af' }} aria-hidden />
      Não Avaliado
    </div>
  )
}

export function AdminAvaliacoesDimensaoView() {
  const params = useParams()
  const dimensaoId = typeof params.dimensaoId === 'string' ? params.dimensaoId : ''
  const meta = DIMENSOES_META[dimensaoId]
  const usuarios = useMemo(() => getUsuariosDimensao(dimensaoId), [dimensaoId])
  const [q, setQ] = useState('')

  const filtrados = useMemo(() => {
    const t = q.trim().toLowerCase()
    if (!t) return usuarios
    return usuarios.filter((u) => u.nome.toLowerCase().includes(t) || u.email.toLowerCase().includes(t))
  }, [q, usuarios])

  if (!meta) {
    return (
      <div className={styles.root}>
        <p className={styles.notFound}>Dimensão não encontrada.</p>
        <Link href="/admin/avaliacoes" className={styles.backLink}>
          <FiArrowLeft aria-hidden />
          Voltar às Dimensões
        </Link>
      </div>
    )
  }

  return (
    <div className={styles.root}>
      <div className={styles.topRow}>
        <Link href="/admin/avaliacoes" className={styles.backLink}>
          <FiArrowLeft aria-hidden />
          Voltar às Dimensões
        </Link>
        <button type="button" className={styles.bellBtn} aria-label="Notificações">
          <FiBell aria-hidden />
          <span className={styles.bellDot} aria-hidden />
        </button>
      </div>

      <div className={styles.titleRow}>
        <span className={styles.emoji} aria-hidden>
          {meta.emoji}
        </span>
        <div className={styles.titleBlock}>
          <h1 className={styles.pageTitle}>{meta.titulo}</h1>
          <p className={styles.pageSubtitle}>{meta.descricao}</p>
        </div>
      </div>

      <div className={styles.filterCard}>
        <div className={styles.filterRow}>
          <div className={styles.searchWrap}>
            <FiSearch className={styles.searchIcon} aria-hidden />
            <input
              type="search"
              className={styles.searchInput}
              placeholder="Buscar por nome ou email"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              aria-label="Buscar por nome ou email"
            />
          </div>
          <button type="button" className={styles.selectBtn}>
            Todos
            <FiChevronDown aria-hidden />
          </button>
          <button type="button" className={styles.selectBtn}>
            Todos
            <FiChevronDown aria-hidden />
          </button>
        </div>
        <div className={styles.filterMeta}>
          <span className={styles.pillMuted}>
            Exibindo {filtrados.length} de {usuarios.length} usuários
          </span>
          <span className={styles.pillSemester}>Semestre Atual: 2/2025</span>
        </div>
      </div>

      <div className={styles.gridUsers}>
        {filtrados.map((u) => (
          <article key={u.id} className={styles.userCard}>
            <div className={styles.avatar} aria-hidden>
              {u.iniciais}
            </div>
            <h2 className={styles.userName}>{u.nome}</h2>
            <p className={styles.userEmail}>{u.email}</p>
            <span className={u.papel === 'estudante' ? styles.badgeEstudante : styles.badgeDocente}>
              {u.papel === 'estudante' ? <FiUser aria-hidden /> : <FiBook aria-hidden />}
              {u.papel === 'estudante' ? 'Estudante' : 'Docente'}
            </span>

            <div className={styles.metrics}>
              <div className={styles.metricRow}>
                <span className={styles.metricLabel}>Autoavaliação</span>
                <span className={styles.metricVal}>{fmtNota(u.auto)}</span>
              </div>
              <div className={styles.metricRow}>
                <span className={styles.metricLabel}>Avaliação ADM</span>
                <span className={styles.metricVal}>{fmtNota(u.adm)}</span>
              </div>
              <div className={styles.metricRow}>
                <span className={styles.metricLabel}>Nota Final</span>
                <span className={styles.metricVal}>{fmtFinal(u.final)}</span>
              </div>
            </div>

            <StatusPill status={u.status} />

            {u.acao === 'ver' ? (
              <Link
                href={`/admin/avaliacoes/${dimensaoId}/usuario/${u.id}`}
                className={`${styles.btnCard} ${styles.btnOutline}`}
              >
                Ver Avaliação
              </Link>
            ) : (
              <Link
                href={`/admin/avaliacoes/${dimensaoId}/usuario/${u.id}?aba=adm`}
                className={`${styles.btnCard} ${styles.btnSolid}`}
              >
                Avaliar
              </Link>
            )}
          </article>
        ))}
      </div>
    </div>
  )
}
