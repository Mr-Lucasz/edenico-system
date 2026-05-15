'use client'

import Link from 'next/link'
import { FiBarChart2, FiPlus } from 'react-icons/fi'
import styles from './AdminAvaliacoesDesenvolvimentoView.module.scss'

type Dimensao = {
  id: string
  emoji: string
  titulo: string
  descricao: string
  avaliados: number
  total: number
  media: string
  pendentes: number
  btnClass: 'fisica' | 'mental' | 'espiritual' | 'social' | 'profissional'
}

const DIMENSOES: Dimensao[] = [
  {
    id: 'fisica',
    emoji: '💪',
    titulo: 'Física',
    descricao: 'Saúde, atividade física e bem-estar corporal',
    avaliados: 45,
    total: 60,
    media: '4,2',
    pendentes: 5,
    btnClass: 'fisica',
  },
  {
    id: 'mental',
    emoji: '🧠',
    titulo: 'Mental',
    descricao: 'Desenvolvimento cognitivo e equilíbrio emocional',
    avaliados: 38,
    total: 60,
    media: '4,5',
    pendentes: 3,
    btnClass: 'mental',
  },
  {
    id: 'espiritual',
    emoji: '✨',
    titulo: 'Espiritual',
    descricao: 'Propósito, valores e conexão interior',
    avaliados: 42,
    total: 60,
    media: '4,1',
    pendentes: 7,
    btnClass: 'espiritual',
  },
  {
    id: 'social',
    emoji: '👥',
    titulo: 'Social',
    descricao: 'Relacionamentos, empatia e convivência',
    avaliados: 51,
    total: 60,
    media: '4,6',
    pendentes: 2,
    btnClass: 'social',
  },
  {
    id: 'profissional',
    emoji: '💼',
    titulo: 'Profissional',
    descricao: 'Competências, carreira e autonomia',
    avaliados: 33,
    total: 60,
    media: '4,0',
    pendentes: 8,
    btnClass: 'profissional',
  },
]

const btnAccessClass: Record<Dimensao['btnClass'], string> = {
  fisica: styles.btnFisica,
  mental: styles.btnMental,
  espiritual: styles.btnEspiritual,
  social: styles.btnSocial,
  profissional: styles.btnProfissional,
}

export function AdminAvaliacoesDesenvolvimentoView() {
  return (
    <div className={styles.root}>
      <header className={styles.pageHeader}>
        <div className={styles.titleBlock}>
          <h1 className={styles.pageTitle}>Avaliações de Desenvolvimento</h1>
          <p className={styles.pageSubtitle}>
            Acompanhe o desenvolvimento integral dos usuários em diferentes dimensões
          </p>
        </div>
        <button type="button" className={styles.btnCreate}>
          <FiPlus aria-hidden strokeWidth={2.5} />
          Criar Nova Dimensão
        </button>
      </header>

      <div className={styles.grid}>
        {DIMENSOES.map((d) => {
          const pct = Math.round((d.avaliados / d.total) * 100)
          return (
            <article key={d.id} className={styles.dimCard}>
              <div className={styles.cardTop}>
                <span className={styles.emoji} aria-hidden>
                  {d.emoji}
                </span>
                <div className={styles.cardHeadText}>
                  <h2 className={styles.dimTitle}>{d.titulo}</h2>
                  <p className={styles.dimDesc}>{d.descricao}</p>
                </div>
              </div>

              <div className={styles.divider} />

              <div className={styles.statRow}>
                <span className={styles.statLabel}>Usuários avaliados</span>
                <span className={styles.statValue}>
                  {d.avaliados} de {d.total} ({pct}%)
                </span>
              </div>
              <div className={styles.progressTrack} aria-hidden>
                <div className={styles.progressFill} style={{ width: `${pct}%` }} />
              </div>

              <div className={styles.statRow}>
                <span className={styles.statLabel}>Média geral</span>
                <span className={styles.ratingValue}>
                  <span className={styles.starIcon} aria-hidden>
                    ★
                  </span>
                  {d.media}
                </span>
              </div>

              <span className={styles.badgePending}>Avaliações pendentes: {d.pendentes}</span>

              <Link href={`/admin/avaliacoes/${d.id}`} className={`${styles.btnAccess} ${btnAccessClass[d.btnClass]}`}>
                Acessar Avaliações
              </Link>
            </article>
          )
        })}
      </div>

      <section className={styles.reportBanner} aria-labelledby="aval-banner-title">
        <div className={styles.bannerLeft}>
          <div className={styles.bannerIcon} aria-hidden>
            <FiBarChart2 />
          </div>
          <div>
            <h3 className={styles.bannerTitle} id="aval-banner-title">
              Relatórios e Estatísticas
            </h3>
            <p className={styles.bannerDesc}>Visualize dados consolidados e análises gráficas</p>
          </div>
        </div>
        <button type="button" className={styles.btnGhostBanner}>
          Ver Relatórios
        </button>
      </section>
    </div>
  )
}
